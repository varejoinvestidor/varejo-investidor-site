import type { SupabaseClient } from "@supabase/supabase-js";
import { createPublisherPublicClient } from "../publisher/supabase/public";
import { getPublisherSession } from "../publisher/supabase/server";
import type { EliteMonthlyReportRow, EliteOperationRow } from "./types";

const ELITE_OPS_PAGE = 1000;

async function fetchAllPublicEliteOperations(
  supabase: SupabaseClient,
): Promise<{ rows: EliteOperationRow[]; error: { code?: string; message?: string } | null }> {
  const rows: EliteOperationRow[] = [];
  for (let from = 0; ; from += ELITE_OPS_PAGE) {
    const to = from + ELITE_OPS_PAGE - 1;
    const { data, error } = await supabase
      .from("elite_operations")
      .select("*")
      .eq("show_public", true)
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (error) return { rows, error };
    const page = (data ?? []) as EliteOperationRow[];
    rows.push(...page);
    if (page.length < ELITE_OPS_PAGE) break;
  }
  return { rows, error: null };
}

async function fetchAllEliteOperationsStaff(
  supabase: SupabaseClient,
): Promise<{ rows: EliteOperationRow[]; error: { code?: string; message?: string } | null }> {
  const rows: EliteOperationRow[] = [];
  for (let from = 0; ; from += ELITE_OPS_PAGE) {
    const to = from + ELITE_OPS_PAGE - 1;
    const { data, error } = await supabase
      .from("elite_operations")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false })
      .range(from, to);

    if (error) return { rows, error };
    const page = (data ?? []) as EliteOperationRow[];
    rows.push(...page);
    if (page.length < ELITE_OPS_PAGE) break;
  }
  return { rows, error: null };
}

export async function fetchPublicEliteData(): Promise<{
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
} | null> {
  const supabase = createPublisherPublicClient();
  if (!supabase) return null;

  const [{ rows: operations, error: opError }, { data: monthly, error: monthError }] = await Promise.all([
    fetchAllPublicEliteOperations(supabase),
    supabase.from("elite_monthly_reports").select("*").order("year").order("month_index"),
  ]);

  if (opError?.code === "PGRST205" || monthError?.code === "PGRST205") return null;
  if (opError || monthError) return null;

  return {
    operations,
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

  const [{ rows: operations, error: opError }, { data: monthly, error: monthError }, { count: totalOperations }] =
    await Promise.all([
      fetchAllEliteOperationsStaff(supabase),
      supabase.from("elite_monthly_reports").select("*").order("year").order("month_index"),
      supabase.from("elite_operations").select("*", { count: "exact", head: true }),
    ]);

  const raw = opError?.message ?? monthError?.message ?? null;
  const error =
    raw && (opError?.code === "PGRST205" || /could not find the table/i.test(raw))
      ? `${raw} — execute o SQL do Relatório Elite no Supabase (botão Copiar SQL) e recarregue.`
      : raw;

  return {
    operations,
    monthly: (monthly ?? []) as EliteMonthlyReportRow[],
    totalOperations: totalOperations ?? operations.length,
    error,
  };
}
