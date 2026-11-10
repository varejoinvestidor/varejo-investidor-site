"use server";

import { revalidatePath } from "next/cache";
import { getPublisherSession } from "../publisher/supabase/server";
import type { EliteMonthlyInput, EliteOperationInput } from "./types";

async function requireEditor() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { error: "Sessão inválida." as const };
  if (profile.role !== "admin" && profile.role !== "editor") {
    return { error: "Sem permissão." as const };
  }
  return { supabase };
}

export async function upsertEliteOperation(input: EliteOperationInput) {
  const ctx = await requireEditor();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const row = {
    asset: input.asset.trim(),
    direction: input.direction,
    status: input.status,
    result_pips: input.result_pips,
    result_label: input.result_label.trim() || `${input.result_pips >= 0 ? "+" : ""}${input.result_pips} pips`,
    report_month: input.report_month.trim(),
    traded_on: input.traded_on,
    updated_label: input.updated_label.trim(),
    sort_order: input.sort_order,
    show_public: input.show_public,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    const { error } = await ctx.supabase.from("elite_operations").update(row).eq("id", input.id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await ctx.supabase.from("elite_operations").insert(row);
    if (error) return { ok: false as const, error: error.message };
  }

  revalidatePath("/relatorio-elite");
  revalidatePath("/admin/relatorio-elite");
  return { ok: true as const };
}

export async function deleteEliteOperation(id: string) {
  const ctx = await requireEditor();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };
  const { error } = await ctx.supabase.from("elite_operations").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/relatorio-elite");
  revalidatePath("/admin/relatorio-elite");
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
