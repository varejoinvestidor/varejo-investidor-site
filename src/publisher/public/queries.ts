import { absoluteSiteUrl } from "../../config/site";
import { getPublisherArticlePath } from "./paths";
import { createPublisherPublicClient } from "../supabase/public";
import type { PublicArticleDetail, PublicArticleSummary } from "./types";

const PUBLIC_ARTICLE_PATH = "/artigos";

type ArticleRow = {
  id: string;
  language?: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  cover_image: string | null;
  published_at: string;
  updated_at: string;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  content?: Record<string, unknown>;
  references_text: string | null;
  sources: unknown;
  author_id: string | null;
  category_id: string | null;
};

async function hydrateSummaries(rows: ArticleRow[]): Promise<PublicArticleSummary[]> {
  const supabase = createPublisherPublicClient();
  if (!supabase || !rows.length) {
    return rows.map((row) => mapSummary(row, null, null));
  }

  const categoryIds = Array.from(new Set(rows.map((r) => r.category_id).filter(Boolean))) as string[];
  const authorIds = Array.from(new Set(rows.map((r) => r.author_id).filter(Boolean))) as string[];

  const [{ data: categories }, { data: authors }] = await Promise.all([
    categoryIds.length
      ? supabase.from("categories").select("id, slug, name_pt").in("id", categoryIds)
      : Promise.resolve({ data: [] as { id: string; slug: string; name_pt: string }[] }),
    authorIds.length
      ? supabase.from("profiles").select("id, full_name").in("id", authorIds)
      : Promise.resolve({ data: [] as { id: string; full_name: string | null }[] }),
  ]);

  const categoryMap = new Map((categories ?? []).map((c) => [c.id, c]));
  const authorMap = new Map((authors ?? []).map((a) => [a.id, a.full_name]));

  return rows.map((row) =>
    mapSummary(row, row.category_id ? categoryMap.get(row.category_id) : null, row.author_id ? authorMap.get(row.author_id) : null),
  );
}

function mapSummary(
  row: ArticleRow,
  category: { slug: string; name_pt: string } | null | undefined,
  authorName: string | null | undefined,
): PublicArticleSummary {
  return {
    id: row.id,
    language: row.language ?? "pt",
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? "",
    excerpt: row.excerpt ?? "",
    cover_image: row.cover_image,
    published_at: row.published_at,
    updated_at: row.updated_at,
    featured: row.featured,
    category_id: row.category_id,
    category_slug: category?.slug ?? null,
    category_name: category?.name_pt ?? null,
    author_name: authorName ?? "Varejo Investidor",
    seo_title: row.seo_title,
    seo_description: row.seo_description,
  };
}

function mapDetail(row: ArticleRow, summary: PublicArticleSummary): PublicArticleDetail {
  const sources = Array.isArray(row.sources)
    ? (row.sources as { label: string; url: string }[]).filter((s) => s?.label && s?.url)
    : [];

  return {
    ...summary,
    content: (row.content as Record<string, unknown>) ?? { type: "doc", content: [] },
    references_text: row.references_text,
    sources,
  };
}

const listColumns =
  "id, slug, language, title, subtitle, excerpt, cover_image, published_at, updated_at, featured, seo_title, seo_description, author_id, category_id";

const detailColumns = `${listColumns}, content, references_text, sources`;

export async function getPublishedArticles(language = "pt", limit = 48): Promise<PublicArticleSummary[]> {
  const supabase = createPublisherPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select(listColumns)
    .eq("language", language)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return hydrateSummaries(data as ArticleRow[]);
}

export async function getPublishedArticleBySlug(slug: string, language = "pt"): Promise<PublicArticleDetail | null> {
  const supabase = createPublisherPublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select(detailColumns)
    .eq("language", language)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) return null;
  const [summary] = await hydrateSummaries([data as ArticleRow]);
  return mapDetail(data as ArticleRow, summary);
}

export async function getRelatedPublishedArticles(article: PublicArticleDetail, limit = 3): Promise<PublicArticleSummary[]> {
  const supabase = createPublisherPublicClient();
  if (!supabase) return [];

  let query = supabase
    .from("articles")
    .select(listColumns)
    .eq("language", article.language)
    .eq("status", "published")
    .neq("id", article.id)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(limit);

  if (article.category_id) {
    query = query.eq("category_id", article.category_id);
  }

  const { data } = await query;
  return hydrateSummaries((data as ArticleRow[]) ?? []);
}

export function publisherArticleUrl(slug: string, language = "pt") {
  return absoluteSiteUrl(getPublisherArticlePath(language, slug));
}

export async function getPublisherSitemapEntries(): Promise<{ url: string; lastModified: Date }[]> {
  const [ptArticles, enArticles] = await Promise.all([
    getPublishedArticles("pt", 500),
    getPublishedArticles("en", 500),
  ]);

  return [
    { url: absoluteSiteUrl(PUBLIC_ARTICLE_PATH), lastModified: new Date() },
    ...ptArticles.map((a) => ({
      url: publisherArticleUrl(a.slug),
      lastModified: new Date(a.updated_at || a.published_at),
    })),
    { url: absoluteSiteUrl("/en/artigos"), lastModified: new Date() },
    ...enArticles.map((a) => ({
      url: absoluteSiteUrl(`/en/artigos/${a.slug}`),
      lastModified: new Date(a.updated_at || a.published_at),
    })),
  ];
}

export async function incrementArticleViews(id: string) {
  const supabase = createPublisherPublicClient();
  if (!supabase) return;
  await supabase.rpc("increment_article_views", { article_id: id });
}
