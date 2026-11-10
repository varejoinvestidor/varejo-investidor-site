import type { SupabaseClient } from "@supabase/supabase-js";
import { formatPipsLabel } from "./pips";
import { parseReportMonth } from "./reportMonth";

export async function syncEliteMonthlyForReportMonth(
  supabase: SupabaseClient,
  reportMonth: string,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = parseReportMonth(reportMonth);
  if (!parsed) return { ok: false, error: "Formato de mês inválido (use Maio/2026 ou 11/2026)." };

  const { data: ops, error: opError } = await supabase
    .from("elite_operations")
    .select("asset, status, result_pips, show_public")
    .eq("report_month", reportMonth)
    .eq("show_public", true);

  if (opError) return { ok: false, error: opError.message };

  const list = ops ?? [];
  const signals = list.length;
  const closed = list.filter((o) => o.status === "closed");
  const pips = closed.reduce((sum, o) => sum + (o.result_pips ?? 0), 0);
  const assets = Array.from(new Set(list.map((o) => o.asset).filter(Boolean)));
  const hasActive = list.some((o) => o.status === "active");
  const status_label = closed.length === list.length && list.length > 0 ? "Finalizado" : hasActive ? "Em andamento" : "Disponível";

  const row = {
    year: parsed.year,
    month_index: parsed.month_index,
    month_label: parsed.month_label,
    signals,
    pips,
    result_label: formatPipsLabel(pips),
    status_label,
    assets,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("elite_monthly_reports").upsert(row, { onConflict: "year,month_index" });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
