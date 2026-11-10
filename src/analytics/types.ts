export type AnalyticsEventKind = "page_view" | "click";

export type AnalyticsCollectPayload = {
  kind: AnalyticsEventKind;
  path: string;
  pageTitle?: string | null;
  elementKey?: string | null;
  elementLabel?: string | null;
  locale?: string | null;
  referrer?: string | null;
  sessionId?: string | null;
  timezone?: string | null;
};

export type AnalyticsSummary = {
  page_views: number;
  clicks: number;
  unique_sessions: number;
};

export type AnalyticsTopPath = { path: string; views: number };
export type AnalyticsTopClick = {
  element_key: string;
  element_label: string | null;
  clicks: number;
  sample_path: string | null;
};

export type AnalyticsTimeseriesRow = {
  bucket: string;
  page_views: number;
  clicks: number;
  unique_sessions: number;
};

export type AnalyticsPeriodKey = "today" | "7d" | "30d" | "90d";

export type AnalyticsRegionRow = {
  region_id: string;
  region_label: string;
  page_views: number;
  clicks: number;
  unique_sessions: number;
};

export type AnalyticsCountryRow = {
  country_code: string;
  region_id: string;
  page_views: number;
  clicks: number;
  unique_sessions: number;
};

export type AnalyticsLocaleRow = {
  locale: string;
  page_views: number;
  clicks: number;
  unique_sessions: number;
};
