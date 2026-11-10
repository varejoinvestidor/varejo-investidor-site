import { createPublisherServiceClient } from "../supabase/service";
import type { ArticleStatus } from "../types";

export type RecentArticleRow = {
  id: string;
  title: string;
  slug: string;
  status: ArticleStatus;
  language: string;
  updated_at: string;
  published_at: string | null;
};

export async function fetchRecentArticles(limit = 6): Promise<RecentArticleRow[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from("articles")
    .select("id, title, slug, status, language, updated_at, published_at")
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as RecentArticleRow[];
}
