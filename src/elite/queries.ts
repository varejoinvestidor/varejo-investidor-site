import { createPublisherPublicClient } from "../publisher/supabase/public";
import { getPublisherSession } from "../publisher/supabase/server";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

export async function fetchPublicEliteData(): Promise<{
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
} | null> {
  const supabase = createPublisherPublicClient();
  if (!supabase) return null;

  const [{ data: operations, error: opError }, { data: monthly, error: monthError }] = await Promise.all([
    supabase
      .from("elite_operations")
      .select("*")
      .eq("show_public", true)
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false }),
    supabase.from("elite_monthly_reports").select("*").order("year").order("month_index"),
  ]);

  if (opError?.code === "PGRST205" || monthError?.code === "PGRST205") return null;
  if (opError || monthError) return null;

  return {
    operations: (operations ?? []) as EliteOperationRow[],
    monthly: (monthly ?? []) as EliteMonthlyReportRow[],
  };
}

export async function fetchStaffEliteData() {
  const { supabase } = await getPublisherSession();
  if (!supabase) {
    return {
      operations: [] as EliteOperationRow[],
      monthly: [] as EliteMonthlyReportRow[],
      error: "Supabase não configurado.",
    };
  }

  const [{ data: operations, error: opError }, { data: monthly, error: monthError }] = await Promise.all([
    supabase.from("elite_operations").select("*").order("sort_order").order("updated_at", { ascending: false }),
    supabase.from("elite_monthly_reports").select("*").order("year").order("month_index"),
  ]);

  const raw = opError?.message ?? monthError?.message ?? null;
  const error =
    raw && (opError?.code === "PGRST205" || /could not find the table/i.test(raw))
      ? `${raw} — execute o SQL do Relatório Elite no Supabase (botão Copiar SQL) e recarregue.`
      : raw;

  return {
    operations: (operations ?? []) as EliteOperationRow[],
    monthly: (monthly ?? []) as EliteMonthlyReportRow[],
    error,
  };
}
