import type { SupabaseClient } from "@supabase/supabase-js";
import { formatPipsLabel } from "./pips";
import { parseReportMonth } from "./reportMonth";
import { resolveOperationPips } from "./resolveOperationPips";
import type { EliteOperationRow } from "./types";

export async function syncEliteMonthlyForReportMonth(
  supabase: SupabaseClient,
  reportMonth: string,
): Promise<{ ok: boolean; error?: string }> {
  const parsed = parseReportMonth(reportMonth);
  if (!parsed) return { ok: false, error: "Formato de mês inválido (use Maio/2026 ou 11/2026)." };

  const { data: ops, error: opError } = await supabase.from("elite_operations").select("*").eq("report_month", reportMonth);

  if (opError) return { ok: false, error: opError.message };

  const list = (ops ?? []) as EliteOperationRow[];
  const publicList = list.filter((o) => o.show_public);
  const signals = publicList.length;
  const closed = publicList.filter((o) => o.status === "closed");
  const pips = closed.reduce((sum, o) => sum + resolveOperationPips(o).pips, 0);
  const assets = Array.from(new Set(publicList.map((o) => o.asset).filter(Boolean)));
  const hasActive = publicList.some((o) => o.status === "active");
  const status_label =
    closed.length === publicList.length && publicList.length > 0 ? "Finalizado" : hasActive ? "Em andamento" : "Disponível";

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
