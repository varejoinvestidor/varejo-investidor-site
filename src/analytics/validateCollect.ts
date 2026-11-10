import type { AnalyticsCollectPayload, AnalyticsEventKind } from "./types";

const BLOCKED_PATH_PREFIXES = ["/admin", "/api/", "/_next", "/auth/"];

export function normalizeAnalyticsPath(path: string): string | null {
  if (!path || typeof path !== "string") return null;
  const trimmed = path.trim();
  if (!trimmed.startsWith("/")) return null;
  if (BLOCKED_PATH_PREFIXES.some((prefix) => trimmed.startsWith(prefix))) return null;
  if (trimmed.length > 500) return trimmed.slice(0, 500);
  return trimmed;
}

export function parseAnalyticsPayload(body: unknown): AnalyticsCollectPayload | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const kind = raw.kind;
  if (kind !== "page_view" && kind !== "click") return null;

  const path = normalizeAnalyticsPath(String(raw.path ?? ""));
  if (!path) return null;

  const elementKey = optionalString(raw.elementKey, 200);
  const elementLabel = optionalString(raw.elementLabel, 200);
  if (kind === "click" && !elementKey && !elementLabel) return null;

  return {
    kind: kind as AnalyticsEventKind,
    path,
    pageTitle: optionalString(raw.pageTitle, 300),
    elementKey,
    elementLabel,
    locale: optionalString(raw.locale, 12),
    referrer: optionalString(raw.referrer, 500),
    sessionId: optionalString(raw.sessionId, 64),
  };
}

function optionalString(value: unknown, max: number): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}
