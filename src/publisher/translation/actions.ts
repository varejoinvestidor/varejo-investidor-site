"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { getArticle, type ActionResult } from "../articles/actions";
import { emptyTipTapDocument, slugifyTitle } from "../articles/slug";
import { getPublisherSession } from "../supabase/server";
import { canEditArticle } from "../permissions";
import { translateText, langPairForTarget } from "./mymemory";
import { translateTipTapDocument } from "./tiptapTranslate";

export async function listLinkedTranslations(articleId: string) {
  const ctx = await getPublisherSession();
  if (!ctx.supabase || !ctx.profile) return { ok: false as const, error: "Sessão inválida." };

  const { data: base, error } = await ctx.supabase
    .from("articles")
    .select("translation_group_id")
    .eq("id", articleId)
    .maybeSingle();

  if (error || !base) return { ok: false as const, error: "Artigo não encontrado." };

  const { data: siblings } = await ctx.supabase
    .from("articles")
    .select("id, language, title, slug, status")
    .eq("translation_group_id", base.translation_group_id);

  return { ok: true as const, data: siblings ?? [] };
}

export async function createTranslationDraft(
  articleId: string,
  targetLanguage: string,
): Promise<ActionResult<{ id: string }>> {
  const ctx = await getPublisherSession();
  if (!ctx.supabase || !ctx.user || !ctx.profile) return { ok: false, error: "Sessão inválida." };

  const source = await getArticle(articleId);
  if (!source.ok || !source.data) return { ok: false, error: "Artigo não encontrado." };

  if (targetLanguage === source.data.language) {
    return { ok: false, error: "O idioma de destino deve ser diferente do artigo atual." };
  }

  const { data: existing } = await ctx.supabase
    .from("articles")
    .select("id")
    .eq("translation_group_id", source.data.translation_group_id)
    .eq("language", targetLanguage)
    .maybeSingle();

  if (existing) return { ok: true, data: { id: existing.id } };

  const slugBase = slugifyTitle(source.data.title) || source.data.slug;
  const slug = `${slugBase}-${targetLanguage}`;

  const { data, error } = await ctx.supabase
    .from("articles")
    .insert({
      translation_group_id: source.data.translation_group_id,
      title: source.data.title,
      slug,
      subtitle: source.data.subtitle,
      excerpt: source.data.excerpt,
      content: source.data.content,
      cover_image: source.data.cover_image,
      author_id: ctx.user.id,
      category_id: source.data.category_id,
      language: targetLanguage,
      status: "draft",
      sources: source.data.sources,
      references_text: source.data.references_text,
    })
    .select("id")
    .single();

  if (error || !data) return { ok: false, error: error?.message ?? "Falha ao criar tradução." };

  await ctx.supabase.from("article_translations").upsert({
    translation_group_id: source.data.translation_group_id,
    article_id: data.id,
    language: targetLanguage,
  });

  revalidatePath("/admin/artigos");
  return { ok: true, data: { id: data.id } };
}

export async function autoTranslateArticle(
  articleId: string,
  targetLanguage: string,
): Promise<
  ActionResult<{
    title: string;
    subtitle: string;
    excerpt: string;
    content: Record<string, unknown>;
    seo_title: string | null;
    seo_description: string | null;
  }>
> {
  const ctx = await getPublisherSession();
  if (!ctx.supabase || !ctx.user || !ctx.profile) return { ok: false, error: "Sessão inválida." };

  const { data: row, error } = await ctx.supabase.from("articles").select("*").eq("id", articleId).maybeSingle();
  if (error || !row) return { ok: false, error: "Artigo não encontrado." };

  if (!canEditArticle(ctx.profile.role, row.author_id, ctx.user.id)) {
    return { ok: false, error: "Sem permissão." };
  }

  const sourceLang = String(row.language);
  const lang = targetLanguage || sourceLang;
  if (sourceLang === lang) {
    return { ok: false, error: "Escolha um idioma diferente na lista ou altere o idioma do artigo." };
  }

  const langpair = langPairForTarget(lang, sourceLang);

  try {
    const [title, subtitle, excerpt, seoTitle, seoDescription, content] = await Promise.all([
      translateText(row.title, langpair),
      translateText(row.subtitle ?? "", langpair),
      translateText(row.excerpt ?? "", langpair),
      row.seo_title ? translateText(row.seo_title, langpair) : Promise.resolve(null),
      row.seo_description ? translateText(row.seo_description, langpair) : Promise.resolve(null),
      translateTipTapDocument((row.content as Record<string, unknown>) ?? emptyTipTapDocument(), sourceLang, lang),
    ]);

    return {
      ok: true,
      data: {
        title,
        subtitle,
        excerpt,
        content,
        seo_title: seoTitle,
        seo_description: seoDescription,
      },
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Tradução falhou." };
  }
}

export async function applyAutoTranslateToArticle(
  articleId: string,
  sourceLanguage: string,
  targetLanguage: string,
): Promise<ActionResult> {
  const ctx = await getPublisherSession();
  if (!ctx.supabase || !ctx.user || !ctx.profile) return { ok: false, error: "Sessão inválida." };

  const { data: row, error: readError } = await ctx.supabase.from("articles").select("*").eq("id", articleId).maybeSingle();
  if (readError || !row) return { ok: false, error: "Artigo não encontrado." };

  if (!canEditArticle(ctx.profile.role, row.author_id, ctx.user.id)) {
    return { ok: false, error: "Sem permissão." };
  }

  const langpair = langPairForTarget(targetLanguage, sourceLanguage);

  try {
    const [title, subtitle, excerpt, seoTitle, seoDescription, content] = await Promise.all([
      translateText(row.title, langpair),
      translateText(row.subtitle ?? "", langpair),
      translateText(row.excerpt ?? "", langpair),
      row.seo_title ? translateText(row.seo_title, langpair) : Promise.resolve(null),
      row.seo_description ? translateText(row.seo_description, langpair) : Promise.resolve(null),
      translateTipTapDocument((row.content as Record<string, unknown>) ?? emptyTipTapDocument(), sourceLanguage, targetLanguage),
    ]);

    const slug = slugifyTitle(title) || `${row.slug}-${targetLanguage}`;

    const { error } = await ctx.supabase
      .from("articles")
      .update({
        title,
        subtitle,
        excerpt,
        content,
        seo_title: seoTitle,
        seo_description: seoDescription,
        language: targetLanguage,
        slug,
      })
      .eq("id", articleId);

    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/artigos");
    revalidatePath(`/admin/artigos/${articleId}`);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Tradução falhou." };
  }
}
