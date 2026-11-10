import type { AnalyticsPeriodKey } from "./types";

const TZ = "America/Sao_Paulo";

export type AnalyticsRange = {
  key: AnalyticsPeriodKey;
  label: string;
  from: Date;
  to: Date;
  grain: "day" | "week" | "month";
};

function zonedParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [y, m, d] = fmt.format(date).split("-").map(Number);
  return { y, m, d };
}

/** Início do dia (00:00) em America/Sao_Paulo, como Date UTC equivalente ao offset local. */
function startOfDayInTz(base: Date): Date {
  const { y, m, d } = zonedParts(base);
  return new Date(Date.UTC(y, m - 1, d, 3, 0, 0, 0));
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export const ANALYTICS_PERIOD_OPTIONS: Array<{ key: AnalyticsPeriodKey; label: string }> = [
  { key: "today", label: "Hoje" },
  { key: "7d", label: "7 dias" },
  { key: "30d", label: "30 dias" },
  { key: "90d", label: "90 dias" },
];

export function resolveAnalyticsRange(key: AnalyticsPeriodKey | string | undefined, now = new Date()): AnalyticsRange {
  const period = (ANALYTICS_PERIOD_OPTIONS.some((o) => o.key === key) ? key : "30d") as AnalyticsPeriodKey;
  const to = addDays(startOfDayInTz(now), 1);
  let from: Date;
  let grain: AnalyticsRange["grain"] = "day";

  if (period === "today") {
    from = startOfDayInTz(now);
  } else if (period === "7d") {
    from = addDays(to, -7);
  } else if (period === "90d") {
    from = addDays(to, -90);
    grain = "week";
  } else {
    from = addDays(to, -30);
  }

  const label = ANALYTICS_PERIOD_OPTIONS.find((o) => o.key === period)?.label ?? "30 dias";
  return { key: period, label, from, to, grain };
}
