"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { getPublisherSession } from "../publisher/supabase/server";
import { computeSignalPips } from "./pips";
import { syncEliteMonthlyForReportMonth } from "./syncMonthly";
import type { EliteMonthlyInput, EliteOperationInput } from "./types";

async function requireEditor() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { error: "Sessão inválida." as const };
  if (profile.role !== "admin" && profile.role !== "editor") {
    return { error: "Sem permissão." as const };
  }
  return { supabase };
}

function numOrNull(value: number | null | undefined): number | null {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  return value;
}

function buildOperationRow(input: EliteOperationInput) {
  const entry = numOrNull(input.entry_price);
  const take = numOrNull(input.take_price);
  const stop = numOrNull(input.stop_price);

  const { resultPips, resultLabel } = computeSignalPips({
    asset: input.asset,
    direction: input.direction,
    status: input.status,
    entry,
    take,
    stop,
    closeOutcome: input.close_outcome ?? (input.status === "closed" ? "take" : null),
    manualPips: input.result_pips,
  });

  const useManual =
    input.status === "closed" &&
    input.close_outcome === "manual" &&
    input.result_pips !== undefined &&
    !Number.isNaN(input.result_pips);

  return {
    asset: input.asset.trim(),
    direction: input.direction,
    status: input.status,
    signal_number: input.signal_number ?? null,
    entry_price: entry,
    take_price: take,
    stop_price: stop,
    close_outcome: input.status === "closed" ? input.close_outcome ?? "take" : null,
    result_pips: useManual ? input.result_pips : resultPips,
    result_label: input.result_label.trim() || (useManual ? `${input.result_pips >= 0 ? "+" : ""}${input.result_pips} pips` : resultLabel),
    report_month: input.report_month.trim(),
    traded_on: input.traded_on,
    updated_label: input.updated_label.trim(),
    sort_order: input.sort_order,
    show_public: input.show_public,
    updated_at: new Date().toISOString(),
  };
}

async function afterOperationMutation(supabase: SupabaseClient, reportMonth: string) {
  await syncEliteMonthlyForReportMonth(supabase, reportMonth);
  revalidatePath("/relatorio-elite");
  revalidatePath("/elite-report");
  revalidatePath("/admin/relatorio-elite");
}

export async function upsertEliteOperation(input: EliteOperationInput) {
  const ctx = await requireEditor();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const row = buildOperationRow(input);

  if (input.id) {
    const { error } = await ctx.supabase.from("elite_operations").update(row).eq("id", input.id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await ctx.supabase.from("elite_operations").insert(row);
    if (error) return { ok: false as const, error: error.message };
  }

  await afterOperationMutation(ctx.supabase, row.report_month);
  return { ok: true as const };
}

export async function deleteEliteOperation(id: string) {
  const ctx = await requireEditor();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const { data: existing } = await ctx.supabase.from("elite_operations").select("report_month").eq("id", id).maybeSingle();
  const { error } = await ctx.supabase.from("elite_operations").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };

  if (existing?.report_month) await afterOperationMutation(ctx.supabase, existing.report_month);
  else {
    revalidatePath("/relatorio-elite");
    revalidatePath("/admin/relatorio-elite");
  }
  return { ok: true as const };
}

export async function upsertEliteMonthly(input: EliteMonthlyInput) {
  const ctx = await requireEditor();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const row = {
    year: input.year,
    month_index: input.month_index,
    month_label: input.month_label,
    signals: input.signals,
    pips: input.pips,
    result_label: input.result_label,
    status_label: input.status_label,
    assets: input.assets,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { error } = await ctx.supabase.from("elite_monthly_reports").update(row).eq("id", input.id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await ctx.supabase.from("elite_monthly_reports").upsert(row, { onConflict: "year,month_index" });
    if (error) return { ok: false as const, error: error.message };
  }

  revalidatePath("/relatorio-elite");
  revalidatePath("/admin/relatorio-elite");
  return { ok: true as const };
}
