import { createPublisherServiceClient } from "../../publisher/supabase/service";
import {
  fetchPublisherArticlePathViews,
  mergeTopPathsWithPublisherFallback,
  type EnrichedTopPath,
} from "./publisherFallback";
import type {
  AnalyticsCountryRow,
  AnalyticsLocaleRow,
  AnalyticsPeriodKey,
  AnalyticsRegionRow,
  AnalyticsSummary,
  AnalyticsTimeseriesRow,
  AnalyticsTopClick,
  AnalyticsTopPath,
} from "../types";
import { resolveAnalyticsRange } from "../periods";

export type AnalyticsSchemaState = "ok" | "missing" | "unconfigured" | "partial";

export async function probeAnalyticsSchema(): Promise<AnalyticsSchemaState> {
  const admin = createPublisherServiceClient();
  if (!admin) return "unconfigured";
  const { error } = await admin.from("site_analytics_events").select("id", { head: true }).limit(0);
  if (error) {
    const msg = error.message ?? "";
    if (error.code === "PGRST205" || /could not find the table/i.test(msg)) return "missing";
    return "missing";
  }
  const from = new Date(0).toISOString();
  const to = new Date().toISOString();
  const { error: regionRpcError } = await admin.rpc("analytics_by_region", {
    p_from: from,
    p_to: to,
    p_limit: 1,
  });
  if (regionRpcError && /analytics_by_region|Could not find the function|PGRST202/i.test(regionRpcError.message)) {
    return "partial";
  }
  const { error: clicksRpcError } = await admin.rpc("analytics_top_clicks", {
    p_from: from,
    p_to: to,
    p_limit: 1,
  });
  if (clicksRpcError && /ungrouped column|analytics_top_clicks/i.test(clicksRpcError.message)) {
    return "partial";
  }
  return "ok";
}

function toIso(d: Date) {
  return d.toISOString();
}

export async function fetchAnalyticsSummary(from: Date, to: Date): Promise<AnalyticsSummary | null> {
  const admin = createPublisherServiceClient();
  if (!admin) return null;
  const { data, error } = await admin.rpc("analytics_summary", {
    p_from: toIso(from),
    p_to: toIso(to),
  });
  if (error || !data) return null;
  const row = data as Record<string, unknown>;
  return {
    page_views: Number(row.page_views ?? 0),
    clicks: Number(row.clicks ?? 0),
    unique_sessions: Number(row.unique_sessions ?? 0),
  };
}

export async function fetchTopPaths(from: Date, to: Date, limit = 25): Promise<AnalyticsTopPath[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];
  const { data, error } = await admin.rpc("analytics_top_paths", {
    p_from: toIso(from),
    p_to: toIso(to),
    p_limit: limit,
  });
  if (error || !data) return [];
  return (data as AnalyticsTopPath[]).map((row) => ({
    path: row.path,
    views: Number(row.views),
  }));
}

export async function fetchTopClicks(from: Date, to: Date, limit = 25): Promise<AnalyticsTopClick[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];
  const { data, error } = await admin.rpc("analytics_top_clicks", {
    p_from: toIso(from),
    p_to: toIso(to),
    p_limit: limit,
  });
  if (error || !data) return [];
  return (data as AnalyticsTopClick[]).map((row) => ({
    element_key: row.element_key,
    element_label: row.element_label,
    clicks: Number(row.clicks),
    sample_path: row.sample_path,
  }));
}

export async function fetchAnalyticsTimeseries(
  from: Date,
  to: Date,
  grain: "day" | "week" | "month",
): Promise<AnalyticsTimeseriesRow[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];
  const { data, error } = await admin.rpc("analytics_timeseries", {
    p_from: toIso(from),
    p_to: toIso(to),
    p_grain: grain,
  });
  if (error || !data) return [];
  return (data as AnalyticsTimeseriesRow[]).map((row) => ({
    bucket: String(row.bucket),
    page_views: Number(row.page_views),
    clicks: Number(row.clicks),
    unique_sessions: Number(row.unique_sessions),
  }));
}

export async function fetchAnalyticsByRegion(from: Date, to: Date, limit = 12): Promise<AnalyticsRegionRow[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];
  const { data, error } = await admin.rpc("analytics_by_region", {
    p_from: toIso(from),
    p_to: toIso(to),
    p_limit: limit,
  });
  if (error || !data) return [];
  return (data as AnalyticsRegionRow[]).map((row) => ({
    region_id: row.region_id,
    region_label: row.region_label,
    page_views: Number(row.page_views),
    clicks: Number(row.clicks),
    unique_sessions: Number(row.unique_sessions),
  }));
}

export async function fetchAnalyticsByCountry(from: Date, to: Date, limit = 25): Promise<AnalyticsCountryRow[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];
  const { data, error } = await admin.rpc("analytics_by_country", {
    p_from: toIso(from),
    p_to: toIso(to),
    p_limit: limit,
  });
  if (error || !data) return [];
  return (data as AnalyticsCountryRow[]).map((row) => ({
    country_code: String(row.country_code ?? "").trim(),
    region_id: row.region_id,
    page_views: Number(row.page_views),
    clicks: Number(row.clicks),
    unique_sessions: Number(row.unique_sessions),
  }));
}

export async function fetchAnalyticsByLocale(from: Date, to: Date, limit = 25): Promise<AnalyticsLocaleRow[]> {
  const admin = createPublisherServiceClient();
  if (!admin) return [];
  const { data, error } = await admin.rpc("analytics_by_locale", {
    p_from: toIso(from),
    p_to: toIso(to),
    p_limit: limit,
  });
  if (error || !data) return [];
  return (data as AnalyticsLocaleRow[]).map((row) => ({
    locale: row.locale,
    page_views: Number(row.page_views),
    clicks: Number(row.clicks),
    unique_sessions: Number(row.unique_sessions),
  }));
}

export async function loadAnalyticsDashboard(periodKey: AnalyticsPeriodKey | string | undefined) {
  const range = resolveAnalyticsRange(periodKey);
  const [summary, topPathsRaw, topClicks, series, byRegion, publisherPaths] = await Promise.all([
    fetchAnalyticsSummary(range.from, range.to),
    fetchTopPaths(range.from, range.to, 12),
    fetchTopClicks(range.from, range.to, 12),
    fetchAnalyticsTimeseries(range.from, range.to, range.grain),
    fetchAnalyticsByRegion(range.from, range.to, 9),
    fetchPublisherArticlePathViews(12),
  ]);
  const topPaths: EnrichedTopPath[] = mergeTopPathsWithPublisherFallback(topPathsRaw, publisherPaths, 12);
  const usingPublisherPaths = topPaths.length > 0 && topPaths[0]?.source === "publisher";
  return { range, summary, topPaths, topClicks, series, byRegion, usingPublisherPaths };
}

export async function loadAnalyticsGeoReport(periodKey: AnalyticsPeriodKey | string | undefined) {
  const range = resolveAnalyticsRange(periodKey);
  const [byRegion, byCountry, byLocale, summary] = await Promise.all([
    fetchAnalyticsByRegion(range.from, range.to, 20),
    fetchAnalyticsByCountry(range.from, range.to, 40),
    fetchAnalyticsByLocale(range.from, range.to, 25),
    fetchAnalyticsSummary(range.from, range.to),
  ]);
  return { range, summary, byRegion, byCountry, byLocale };
}
