import { createPublisherServiceClient } from "../../publisher/supabase/service";
import type { AnalyticsPeriodKey, AnalyticsSummary, AnalyticsTimeseriesRow, AnalyticsTopClick, AnalyticsTopPath } from "../types";
import { resolveAnalyticsRange } from "../periods";

export type AnalyticsSchemaState = "ok" | "missing" | "unconfigured";

export async function probeAnalyticsSchema(): Promise<AnalyticsSchemaState> {
  const admin = createPublisherServiceClient();
  if (!admin) return "unconfigured";
  const { error } = await admin.from("site_analytics_events").select("id", { head: true }).limit(0);
  if (!error) return "ok";
  const msg = error.message ?? "";
  if (error.code === "PGRST205" || /could not find the table/i.test(msg)) return "missing";
  return "missing";
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

export async function loadAnalyticsDashboard(periodKey: AnalyticsPeriodKey | string | undefined) {
  const range = resolveAnalyticsRange(periodKey);
  const [summary, topPaths, topClicks, series] = await Promise.all([
    fetchAnalyticsSummary(range.from, range.to),
    fetchTopPaths(range.from, range.to, 12),
    fetchTopClicks(range.from, range.to, 12),
    fetchAnalyticsTimeseries(range.from, range.to, range.grain),
  ]);
  return { range, summary, topPaths, topClicks, series };
}
