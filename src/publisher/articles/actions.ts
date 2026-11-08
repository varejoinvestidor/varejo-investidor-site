"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { canEditArticle, canPublish } from "../permissions";
import { getPublisherSession } from "../supabase/server";
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
  tag_ids: string[];
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
};

export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

function revalidateArticlePaths(slug?: string, language?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/artigos");
  revalidatePath("/admin/agendamentos");
  revalidatePath("/artigos");
  if (language === "en") revalidatePath("/en/artigos");
  if (slug) {
    revalidatePath(`/artigos/${slug}`);
    if (language === "en") revalidatePath(`/en/artigos/${slug}`);
  }
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
}): Promise<ActionResult<ArticleListItem[]>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase } = ctx;
  let query = supabase
    .from("articles")
    .select("id, title, slug, language, status, updated_at, published_at, scheduled_at, category_id, author_id")
    .order("updated_at", { ascending: false });

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.language) query = query.eq("language", filters.language);
  if (filters?.q?.trim()) {
    const term = `%${filters.q.trim()}%`;
    query = query.or(`title.ilike.${term},slug.ilike.${term}`);
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
      tag_ids: (tagRows ?? []).map((t) => t.tag_id),
    },
  };
}

export async function saveArticle(input: SaveArticleInput, options?: { snapshot?: boolean }): Promise<ActionResult<{ updated_at: string }>> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  const existing = await getArticle(input.id);
  if (!existing.ok || !existing.data) {
    return { ok: false, error: existing.ok ? "Artigo não encontrado." : existing.error };
  }

  const article = existing.data;
  if (!canEditArticle(profile.role, article.author_id, user.id)) {
    return { ok: false, error: "Sem permissão." };
  }

  const slug = input.slug.trim() || slugifyTitle(input.title) || article.slug;

  const { data, error } = await supabase
    .from("articles")
    .update({
      title: input.title.trim() || "Sem título",
      slug,
      subtitle: input.subtitle,
      excerpt: input.excerpt,
      content: input.content,
      cover_image: input.cover_image,
      category_id: input.category_id,
      language: input.language,
      seo_title: input.seo_title,
      seo_description: input.seo_description,
      references_text: input.references_text,
      sources: input.sources,
    })
    .eq("id", input.id)
    .select("updated_at")
    .single();

  if (error) return { ok: false, error: error.message };

  await supabase.from("article_tags").delete().eq("article_id", input.id);
  if (input.tag_ids.length) {
    await supabase.from("article_tags").insert(
      input.tag_ids.map((tag_id) => ({ article_id: input.id, tag_id })),
    );
  }

  if (options?.snapshot !== false) {
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
      content: input.content,
      excerpt: input.excerpt,
      created_by: user.id,
    });
  }

  await logActivity(supabase, user.id, "article.saved", input.id);
  revalidateArticlePaths(input.slug, input.language);

  return { ok: true, data: { updated_at: data.updated_at } };
}

export async function changeArticleStatus(
  id: string,
  status: ArticleStatus,
  scheduledAt?: string | null,
): Promise<ActionResult> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  const existing = await getArticle(id);
  if (!existing.ok || !existing.data) return { ok: false, error: "Artigo não encontrado." };

  const article = existing.data;

  if (status === "published" || status === "scheduled") {
    if (!canPublish(profile.role)) {
      return { ok: false, error: "Seu perfil não pode publicar." };
    }
  }

  if (status === "review" && profile.role === "author" && article.author_id !== user.id) {
    return { ok: false, error: "Sem permissão." };
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

  await logActivity(supabase, user.id, "article.status", id, { status, scheduledAt });
  revalidateArticlePaths(article.slug, article.language);

  return { ok: true };
}

export async function deleteArticle(id: string): Promise<ActionResult> {
  const ctx = await requireStaff();
  if ("error" in ctx) return { ok: false, error: ctx.error ?? "Sessão inválida." };

  const { supabase, user, profile } = ctx;
  if (profile.role !== "admin") {
    return { ok: false, error: "Apenas administradores podem excluir." };
  }

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
    },
    { snapshot: true },
  );
}
