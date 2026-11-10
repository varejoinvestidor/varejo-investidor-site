"use server";

import { revalidatePath } from "next/cache";
import { getPublisherSession } from "../publisher/supabase/server";
import { canViewSiteAnalytics } from "../publisher/permissions";
import { ensureViAnalyticsSchema } from "./ensureSchema";

export async function installViAnalyticsSchemaFromAdmin(): Promise<{ ok: true } | { ok: false; error?: string }> {
  const { profile } = await getPublisherSession();
  if (profile?.role !== "admin") {
    return { ok: false, error: "Apenas administradores podem instalar o schema." };
  }

  const result = await ensureViAnalyticsSchema();
  if (!result.ok) return { ok: false, error: result.error };
  revalidatePath("/admin/vi-administrador", "layout");
  return { ok: true };
}

/** Chamado no layout do VI Administrador — auto-instala schema para admin quando possível. */
export async function autoEnsureViAnalyticsForSession(): Promise<{ attempted: boolean; state: string }> {
  const { profile } = await getPublisherSession();
  if (!profile || !canViewSiteAnalytics(profile.role)) {
    return { attempted: false, state: "unauthorized" };
  }
  if (profile.role !== "admin") {
    return { attempted: false, state: "not-admin" };
  }

  const result = await ensureViAnalyticsSchema();
  if (result.ok && result.installed) {
    revalidatePath("/admin/vi-administrador", "layout");
  }
  return { attempted: true, state: result.state };
}
