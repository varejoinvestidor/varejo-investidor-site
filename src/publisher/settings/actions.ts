"use server";

import { revalidatePath } from "next/cache";
import { getPublisherSession } from "../supabase/server";

export async function getSiteSettings() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };

  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) return { ok: false as const, error: error.message };

  const map: Record<string, unknown> = {};
  for (const row of data ?? []) {
    map[row.key] = row.value;
  }
  return { ok: true as const, data: map };
}

export async function updateSiteSetting(key: string, value: unknown) {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };
  if (profile.role !== "admin") return { ok: false as const, error: "Apenas administradores." };

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/admin/configuracoes");
  return { ok: true as const };
}

export async function listProfiles() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };
  if (profile.role !== "admin") return { ok: false as const, error: "Apenas administradores." };

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, data: data ?? [] };
}

export async function updateUserRole(userId: string, role: string) {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };
  if (profile.role !== "admin") return { ok: false as const, error: "Apenas administradores." };

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/admin/usuarios");
  return { ok: true as const };
}
