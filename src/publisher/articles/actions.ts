"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { requireAdminPassword } from "../admin/adminAuth";
import { canEditArticle, canPublish } from "../permissions";
import { sanitizeTipTapForSave } from "../editor/youtubeEmbed";
import {
  embedBannersInContent,
  resolveArticleBannersList,
  serializeArticleBannersForSave,
  type ArticleBanner,
} from "../types/banner";
import { ARTICLE_BANNERS_MIGRATION_FILES, runSqlMigrationFiles } from "../schema/runSqlMigrations";
import { getPublisherSession } from "../supabase/server";
import { getPublisherArticlePath, getPublisherHubPath } from "../public/paths";
import type { ArticleStatus } from "../types";
import { emptyTipTapDocument, slugifyTitle } from "./slug";

export type ArticleListItem = {
  id: string;
  title: string;
  slug: string;
  language: string;
  status: ArticleStatus;
  updated_at: string;
  published_at: string | null;
  scheduled_at: string | null;
  category_name: string | null;
  author_name: string | null;
  view_count: number;
};

export type ArticleRecord = {
  id: string;
  translation_group_id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: Record<string, unknown>;
  cover_image: string | null;
  author_id: string | null;
  category_id: string | null;
  language: string;
  status: ArticleStatus;
  seo_title: string | null;
  seo_description: string | null;
  references_text: string | null;
  sources: { label: string; url: string }[];
  published_at: string | null;
  scheduled_at: string | null;
  updated_at: string;
  view_count: number;
  tag_ids: string[];
  banners: ArticleBanner[];
};

export type SaveArticleInput = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: Record<string, unknown>;
  cover_image: string | null;
  category_id: string | null;
  language: string;
  seo_title: string | null;
  seo_description: string | null;
  references_text: string | null;
  sources: { label: string; url: string }[];
  tag_ids: string[];
  banners: ArticleBanner[];
};

export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

function revalidateArticlePaths(slug?: string, language?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/artigos");
  revalidatePath("/admin/agendamentos");
  if (language) {
    revalidatePath(getPublisherHubPath(language));
    if (slug) revalidatePath(getPublisherArticlePath(language, slug));
  } else {
    revalidatePath("/artigos");
    revalidatePath("/en/artigos");
    if (slug) {
      revalidatePath(`/artigos/${slug}`);
      revalidatePath(`/en/artigos/${slug}`);
    }
  }
}

const ARTICLE_BANNERS_SCHEMA_ERROR =
  "A coluna `articles.banners` não existe no Supabase. Instale a coluna (botão abaixo, admin) ou rode POST /api/publisher/bootstrap-schema.";

function isArticleBannersSchemaError(message: string | undefined): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return m.includes("banners") || (m.includes("column") && m.includes("articles"));
}

async function updateArticlePersistingBanners(
  supabase: NonNullable<Awaited<ReturnType<typeof requireStaff>>["supabase"]>,
  articleId: string,
  patch: Record<string, unknown>,
  banners: ArticleBanner[],
) {
  const serialized = serializeArticleBannersForSave(banners);
  const withBanners = { ...patch, banners: serialized };

  let result = await supabase.from("articles").update(withBanners).eq("id", articleId).select("updated_at, slug").single();

  if (!result.error) return result;

  if (!isArticleBannersSchemaError(result.error.message)) return result;

  if (serialized.length > 0) {
    const { banners: _b, ...withoutBanners } = withBanners;
    const fallback = await supabase
      .from("articles")
      .update(withoutBanners)
      .eq("id", articleId)
      .select("updated_at, slug")
      .single();
    if (!fallback.error) return fallback;
    return { data: null, error: { message: ARTICLE_BANNERS_SCHEMA_ERROR } };
  }

  const { banners: _b, ...withoutBanners } = withBanners;
  return supabase.from("articles").update(withoutBanners).eq("id", articleId).select("updated_at, slug").single();
}

/** Cria coluna `articles.banners` (admin). */
export async function installArticleBannersSchemaFromAdmin() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };
  if (profile.role !== "admin") {
    return { ok: false as const, error: "Somente administradores podem instalar a coluna de banners." };
  }

  const migrated = await runSqlMigrationFiles(ARTICLE_BANNERS_MIGRATION_FILES);
  if (!migrated.ok) return { ok: false as const, error: migrated.error };

  const check = await supabase.from("articles").select("banners").limit(1);
  if (check.error) {
    return {
      ok: false as const,
      error: `Migration aplicada, mas a API ainda retorna: ${check.error.message}. Aguarde ~1 min e salve de novo.`,
    };
  }

  revalidatePath("/admin/artigos");
  return { ok: true as const };
}

async function requireStaff() {
  const { supabase, user, profile } = await getPublisherSession();
  if (!supabase || !user || !profile) {
    return { error: "Sessão inválida." as const };
  }
  return { supabase, user, profile };
}

async function logActivity(
  supabase: NonNullable<Awaited<ReturnType<typeof requireStaff>>["supabase"]>,
  actorId: string,
  action: string,
  entityId: string,
  metadata: Record<string, unknown> = {},
) {
  await supabase.from("activity_logs").insert({
    actor_id: actorId,
    action,
    entity_type: "article",
    entity_id: entityId,
    metadata,
  });
}

export async function createDraftArticle(language = "pt"): Promise<ActionResult<{ id: string }>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  const title = "Sem título";
  const slug = `rascunho-${Date.now()}`;

  const translationGroupId = randomUUID();

  const { data, error } = await supabase
    .from("articles")
    .insert({
      translation_group_id: translationGroupId,
      title,
      slug,
      language,
      status: "draft",
      author_id: user.id,
      content: emptyTipTapDocument(),
      excerpt: "",
      subtitle: "",
    })
    .select("id")
    .single();

  if (error || !data) return { ok: false, error: error?.message ?? "Não foi possível criar o artigo." };

  await supabase.from("article_translations").insert({
    translation_group_id: translationGroupId,
    article_id: data.id,
    language,
  });

  await logActivity(supabase, user.id, "article.created", data.id, { language });
  revalidateArticlePaths();

  return { ok: true, data: { id: data.id } };
}

export async function listArticles(filters?: {
  status?: ArticleStatus;
  q?: string;
  language?: string;
  category_id?: string;
  author_id?: string;
  sort?: "updated" | "views" | "published";
}): Promise<ActionResult<ArticleListItem[]>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase } = ctx;
  const sort = filters?.sort ?? "updated";
  let query = supabase
    .from("articles")
    .select(
      "id, title, slug, language, status, updated_at, published_at, scheduled_at, category_id, author_id, view_count",
    );

  if (sort === "views") query = query.order("view_count", { ascending: false });
  else if (sort === "published") query = query.order("published_at", { ascending: false, nullsFirst: false });
  else query = query.order("updated_at", { ascending: false });

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.language) query = query.eq("language", filters.language);
  if (filters?.category_id) query = query.eq("category_id", filters.category_id);
  if (filters?.author_id) query = query.eq("author_id", filters.author_id);
  if (filters?.q?.trim()) {
    const safe = filters.q.trim().replace(/[%,()]/g, " ").slice(0, 80);
    if (safe) {
      const term = `%${safe}%`;
      query = query.or(`title.ilike.${term},slug.ilike.${term}`);
    }
  }

  const { data, error } = await query;

  if (error) return { ok: false, error: error.message };

  const categoryIds = Array.from(
    new Set((data ?? []).map((r) => r.category_id).filter((id): id is string => Boolean(id))),
  );
  const authorIds = Array.from(
    new Set((data ?? []).map((r) => r.author_id).filter((id): id is string => Boolean(id))),
  );

  const [{ data: categories }, { data: authors }] = await Promise.all([
    categoryIds.length
      ? supabase.from("categories").select("id, name_pt").in("id", categoryIds)
      : Promise.resolve({ data: [] as { id: string; name_pt: string }[] }),
    authorIds.length
      ? supabase.from("profiles").select("id, full_name").in("id", authorIds)
      : Promise.resolve({ data: [] as { id: string; full_name: string | null }[] }),
  ]);

  const categoryMap = new Map((categories ?? []).map((c) => [c.id, c.name_pt]));
  const authorMap = new Map((authors ?? []).map((a) => [a.id, a.full_name]));

  const items: ArticleListItem[] = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    language: row.language,
    status: row.status as ArticleStatus,
    updated_at: row.updated_at,
    published_at: row.published_at,
    scheduled_at: row.scheduled_at,
    category_name: row.category_id ? (categoryMap.get(row.category_id) ?? null) : null,
    author_name: row.author_id ? (authorMap.get(row.author_id) ?? null) : null,
    view_count: row.view_count ?? 0,
  }));

  return { ok: true, data: items };
}

export async function getArticle(id: string): Promise<ActionResult<ArticleRecord>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, profile, user } = ctx;
  const { data, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();

  if (error) return { ok: false, error: error.message };
  if (!data) return { ok: false, error: "Artigo não encontrado." };

  if (!canEditArticle(profile.role, data.author_id, user.id)) {
    return { ok: false, error: "Sem permissão para editar este artigo." };
  }

  const { data: tagRows } = await supabase.from("article_tags").select("tag_id").eq("article_id", id);

  return {
    ok: true,
    data: {
      id: data.id,
      translation_group_id: data.translation_group_id,
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle ?? "",
      excerpt: data.excerpt ?? "",
      content: (data.content as Record<string, unknown>) ?? emptyTipTapDocument(),
      cover_image: data.cover_image,
      author_id: data.author_id,
      category_id: data.category_id,
      language: data.language,
      status: data.status as ArticleStatus,
      seo_title: data.seo_title,
      seo_description: data.seo_description,
      references_text: data.references_text,
      sources: Array.isArray(data.sources)
        ? (data.sources as { label: string; url: string }[]).filter((s) => s?.label && s?.url)
        : [],
      published_at: data.published_at,
      scheduled_at: data.scheduled_at,
      updated_at: data.updated_at,
      view_count: data.view_count ?? 0,
      banners: resolveArticleBannersList(data.banners, data.content),
      tag_ids: (tagRows ?? []).map((t) => t.tag_id),
    },
  };
}

function validatePublishableTitleSlug(title: string, slug: string) {
  if (title.trim() === "Sem título" || !title.trim()) {
    return "Defina o título antes de publicar.";
  }
  if (slug.startsWith("rascunho-")) {
    return "Gere o slug (ou salve o título) antes de publicar.";
  }
  return null;
}

async function syncArticleTags(
  supabase: NonNullable<Awaited<ReturnType<typeof requireStaff>>["supabase"]>,
  articleId: string,
  tagIds: string[],
) {
  if (!tagIds.length) {
    await supabase.from("article_tags").delete().eq("article_id", articleId);
    return;
  }
  const { data: existing } = await supabase.from("article_tags").select("tag_id").eq("article_id", articleId);
  const current = new Set((existing ?? []).map((t) => t.tag_id));
  const next = new Set(tagIds);
  const same = current.size === next.size && tagIds.every((id) => current.has(id));
  if (same) return;

  await supabase.from("article_tags").delete().eq("article_id", articleId);
  await supabase.from("article_tags").insert(tagIds.map((tag_id) => ({ article_id: articleId, tag_id })));
}

async function uniqueSlugForArticle(
  supabase: NonNullable<Awaited<ReturnType<typeof requireStaff>>["supabase"]>,
  language: string,
  baseSlug: string,
  articleId: string,
) {
  let candidate = baseSlug;
  for (let attempt = 0; attempt < 8; attempt++) {
    const { data: clash } = await supabase
      .from("articles")
      .select("id")
      .eq("language", language)
      .eq("slug", candidate)
      .neq("id", articleId)
      .maybeSingle();
    if (!clash) return candidate;
    candidate = `${baseSlug}-${attempt + 2}`;
  }
  return `${baseSlug}-${Date.now()}`;
}

export async function saveArticle(
  input: SaveArticleInput,
  options?: { snapshot?: boolean; revalidate?: boolean },
): Promise<ActionResult<{ updated_at: string; slug: string }>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  const { data: row, error: readError } = await supabase
    .from("articles")
    .select("id, author_id, slug, language, status, title")
    .eq("id", input.id)
    .maybeSingle();

  if (readError) return { ok: false, error: readError.message };
  if (!row) return { ok: false, error: "Artigo não encontrado." };

  if (!canEditArticle(profile.role, row.author_id, user.id)) {
    return { ok: false, error: "Sem permissão." };
  }

  const title = input.title.trim() || "Sem título";
  let slug = input.slug.trim() || slugifyTitle(title) || row.slug;
  if (slug.startsWith("rascunho-") && title !== "Sem título") {
    slug = slugifyTitle(title) || slug;
  }
  if (slug !== row.slug) {
    slug = await uniqueSlugForArticle(supabase, input.language, slug, input.id);
  }

  const safeContent = embedBannersInContent(sanitizeTipTapForSave(input.content), input.banners);
  const basePatch = {
    title,
    slug,
    subtitle: input.subtitle,
    excerpt: input.excerpt,
    content: safeContent,
    cover_image: input.cover_image,
    category_id: input.category_id,
    language: input.language,
    seo_title: input.seo_title,
    seo_description: input.seo_description,
    references_text: input.references_text,
    sources: input.sources,
  };

  const { data, error } = await updateArticlePersistingBanners(supabase, input.id, basePatch, input.banners);

  if (error || !data) return { ok: false, error: error?.message ?? "Falha ao salvar." };

  await syncArticleTags(supabase, input.id, input.tag_ids);

  if (options?.snapshot === true) {
    const { data: revRows } = await supabase
      .from("article_revisions")
      .select("revision_number")
      .eq("article_id", input.id)
      .order("revision_number", { ascending: false })
      .limit(1);

    const nextNumber = (revRows?.[0]?.revision_number ?? 0) + 1;

    await supabase.from("article_revisions").insert({
      article_id: input.id,
      revision_number: nextNumber,
      title: input.title,
      content: safeContent,
      excerpt: input.excerpt,
      created_by: user.id,
    });
  }

  void logActivity(supabase, user.id, "article.saved", input.id);
  if (options?.revalidate !== false) {
    revalidateArticlePaths(data.slug, input.language);
  }

  return { ok: true, data: { updated_at: data.updated_at, slug: data.slug } };
}

/** Salva conteúdo + publica em uma única gravação (evita falha entre save e status). */
export async function saveAndPublishArticle(
  input: SaveArticleInput,
): Promise<ActionResult<{ updated_at: string; slug: string }>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  if (!canPublish(profile.role)) {
    return { ok: false, error: "Seu perfil não pode publicar." };
  }

  const { data: row, error: readError } = await supabase
    .from("articles")
    .select("id, author_id, slug, language, status")
    .eq("id", input.id)
    .maybeSingle();

  if (readError) return { ok: false, error: readError.message };
  if (!row) return { ok: false, error: "Artigo não encontrado." };
  if (!canEditArticle(profile.role, row.author_id, user.id)) {
    return { ok: false, error: "Sem permissão." };
  }

  const title = input.title.trim() || "Sem título";
  let slug = input.slug.trim() || slugifyTitle(title) || row.slug;
  if (slug.startsWith("rascunho-") && title !== "Sem título") {
    slug = slugifyTitle(title) || slug;
  }
  if (slug !== row.slug) {
    slug = await uniqueSlugForArticle(supabase, input.language, slug, input.id);
  }

  const validation = validatePublishableTitleSlug(title, slug);
  if (validation) return { ok: false, error: validation };

  const safeContent = embedBannersInContent(sanitizeTipTapForSave(input.content), input.banners);
  const basePatch = {
    title,
    slug,
    subtitle: input.subtitle,
    excerpt: input.excerpt,
    content: safeContent,
    cover_image: input.cover_image,
    category_id: input.category_id,
    language: input.language,
    seo_title: input.seo_title,
    seo_description: input.seo_description,
    references_text: input.references_text,
    sources: input.sources,
    status: "published" as const,
    published_at: new Date().toISOString(),
    scheduled_at: null,
  };

  const { data, error } = await updateArticlePersistingBanners(supabase, input.id, basePatch, input.banners);

  if (error || !data) return { ok: false, error: error?.message ?? "Falha ao publicar." };

  await syncArticleTags(supabase, input.id, input.tag_ids);
  void logActivity(supabase, user.id, "article.published", input.id);
  revalidateArticlePaths(data.slug, input.language);

  return { ok: true, data: { updated_at: data.updated_at, slug: data.slug } };
}

export async function changeArticleStatus(
  id: string,
  status: ArticleStatus,
  scheduledAt?: string | null,
): Promise<ActionResult> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  const { data: article, error: readError } = await supabase
    .from("articles")
    .select("id, title, slug, language, status, author_id")
    .eq("id", id)
    .maybeSingle();

  if (readError) return { ok: false, error: readError.message };
  if (!article) return { ok: false, error: "Artigo não encontrado." };

  if (!canEditArticle(profile.role, article.author_id, user.id)) {
    return { ok: false, error: "Sem permissão." };
  }

  if (status === "published" || status === "scheduled") {
    if (!canPublish(profile.role)) {
      return { ok: false, error: "Seu perfil não pode publicar." };
    }
    const validation = validatePublishableTitleSlug(article.title, article.slug);
    if (validation) return { ok: false, error: validation };
  }

  const patch: Record<string, unknown> = { status };

  if (status === "published") {
    patch.published_at = new Date().toISOString();
    patch.scheduled_at = null;
  } else if (status === "scheduled") {
    if (!scheduledAt) return { ok: false, error: "Informe data e hora do agendamento." };
    patch.scheduled_at = scheduledAt;
    patch.published_at = null;
  } else if (status === "draft" || status === "review") {
    patch.scheduled_at = null;
  }

  const { error } = await supabase.from("articles").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };

  void logActivity(supabase, user.id, "article.status", id, { status, scheduledAt });
  revalidateArticlePaths(article.slug, article.language);

  return { ok: true };
}

export async function deleteArticle(id: string, adminPassword?: string): Promise<ActionResult> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  if (profile.role !== "admin") {
    return { ok: false, error: "Apenas administradores podem excluir." };
  }

  const auth = await requireAdminPassword(adminPassword);
  if (!auth.ok) return auth;

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  await logActivity(supabase, user.id, "article.deleted", id);
  revalidateArticlePaths();

  return { ok: true };
}

export async function listArticleRevisions(articleId: string) {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const { data, error } = await ctx.supabase
    .from("article_revisions")
    .select("id, revision_number, title, created_at, created_by, profiles(full_name)")
    .eq("article_id", articleId)
    .order("revision_number", { ascending: false });

  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, data: data ?? [] };
}

export async function restoreRevision(
  articleId: string,
  revisionId: string,
): Promise<ActionResult<{ updated_at: string }>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { data: rev, error } = await ctx.supabase
    .from("article_revisions")
    .select("title, content, excerpt")
    .eq("id", revisionId)
    .eq("article_id", articleId)
    .maybeSingle();

  if (error || !rev) return { ok: false, error: "Revisão não encontrada." };

  const article = await getArticle(articleId);
  if (!article.ok || !article.data) return { ok: false, error: "Artigo não encontrado." };

  return saveArticle(
    {
      id: articleId,
      title: rev.title,
      slug: article.data.slug,
      subtitle: article.data.subtitle,
      excerpt: rev.excerpt,
      content: rev.content as Record<string, unknown>,
      cover_image: article.data.cover_image,
      category_id: article.data.category_id,
      language: article.data.language,
      seo_title: article.data.seo_title,
      seo_description: article.data.seo_description,
      references_text: article.data.references_text,
      sources: article.data.sources,
      tag_ids: article.data.tag_ids,
      banners: article.data.banners,
    },
    { snapshot: true },
  );
}

/** Recoloca banners na coluna e em `content.publisher_banners` (admin, em massa). */
export async function backfillAllArticleBannerEmbeds(): Promise<
  ActionResult<{ updated: number; skipped: number }>
> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };
  const { supabase, user, profile } = ctx;
  if (profile.role !== "admin") {
    return { ok: false, error: "Somente administradores podem executar o backfill de banners." };
  }

  const { data: rows, error: listError } = await supabase
    .from("articles")
    .select("id, slug, language, content, banners, status");

  if (listError) return { ok: false, error: listError.message };

  let updated = 0;
  let skipped = 0;

  for (const row of rows ?? []) {
    const banners = resolveArticleBannersList(row.banners, row.content);
    if (!banners.length) {
      skipped += 1;
      continue;
    }

    const base = (row.content as Record<string, unknown>) ?? emptyTipTapDocument();
    const content = embedBannersInContent(base, banners);
    const { error: patchError } = await updateArticlePersistingBanners(supabase, row.id, { content }, banners);

    if (patchError) {
      const { error: contentOnlyError } = await supabase.from("articles").update({ content }).eq("id", row.id);
      if (contentOnlyError) {
        return { ok: false, error: `${row.slug}: ${contentOnlyError.message}` };
      }
    }

    updated += 1;
    if (row.status === "published") {
      revalidateArticlePaths(row.slug, row.language);
    }
  }

  void logActivity(supabase, user.id, "article.banners_backfill", "bulk", { updated, skipped });
  revalidatePath("/admin/artigos");
  revalidatePath("/artigos");

  return { ok: true, data: { updated, skipped } };
}
