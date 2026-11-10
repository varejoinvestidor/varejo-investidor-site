import { getPublisherArticlePath } from "../../publisher/public/paths";
import { createPublisherServiceClient } from "../../publisher/supabase/service";
import type { AnalyticsTopPath } from "../types";

/** Ranking editorial quando a telemetria do site ainda não tem page views. */
export type PublisherPathView = AnalyticsTopPath & { source: "publisher" };

export async function fetchPublisherArticlePathViews(limit = 15): Promise<PublisherPathView[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from("articles")
    .select("slug, language, view_count, status")
    .eq("status", "published")
    .order("view_count", { ascending: false })
    .limit(Math.min(limit, 50));

  if (error || !data?.length) return [];

  return data
    .filter((row) => (row.view_count ?? 0) > 0)
    .map(
      (row): PublisherPathView => ({
        path: getPublisherArticlePath(row.language ?? "pt", row.slug),
        views: Number(row.view_count ?? 0),
        source: "publisher",
      }),
    );
}

export type EnrichedTopPath = AnalyticsTopPath & { source?: "telemetry" | "publisher" };

export function mergeTopPathsWithPublisherFallback(
  telemetry: AnalyticsTopPath[],
  publisher: AnalyticsTopPath[],
  limit = 12,
): EnrichedTopPath[] {
  if (telemetry.length) return telemetry.map((r) => ({ ...r, source: "telemetry" as const }));
  return publisher.slice(0, limit).map((r) => ({ ...r, source: "publisher" as const }));
}
