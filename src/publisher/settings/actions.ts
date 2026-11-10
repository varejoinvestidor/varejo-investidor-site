"use server";

import { revalidatePath } from "next/cache";
import { requireAdminPassword } from "../admin/adminAuth";
import { createPublisherServiceClient } from "../supabase/service";
import { getPublisherSession } from "../supabase/server";
import type { PublisherRole } from "../types";

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

export async function updateUserRole(userId: string, role: string, adminPassword?: string) {
  const { supabase, profile, user } = await getPublisherSession();
  if (!supabase || !profile) return { ok: false as const, error: "Sessão inválida." };
  if (profile.role !== "admin") return { ok: false as const, error: "Apenas administradores." };

  const auth = await requireAdminPassword(adminPassword);
  if (!auth.ok) return auth;

  if (user?.id === userId && role !== "admin") {
    return { ok: false as const, error: "Você não pode remover seu próprio perfil de administrador." };
  }

  const { error } = await supabase.from("profiles").update({ role }).eq("id", userId);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/admin/usuarios");
  return { ok: true as const };
}

export async function invitePublisherUser(input: {
  email: string;
  role: PublisherRole;
  fullName?: string;
  temporaryPassword?: string;
  adminPassword?: string;
}) {
  const { profile, user } = await getPublisherSession();
  if (!profile || profile.role !== "admin") {
    return { ok: false as const, error: "Apenas administradores." };
  }

  const auth = await requireAdminPassword(input.adminPassword);
  if (!auth.ok) return auth;

  const service = createPublisherServiceClient();
  if (!service) return { ok: false as const, error: "Supabase não configurado." };

  const email = input.email.trim().toLowerCase();
  if (!email.includes("@")) return { ok: false as const, error: "E-mail inválido." };

  const role = input.role;
  if (!["admin", "editor", "author", "reviewer"].includes(role)) {
    return { ok: false as const, error: "Perfil inválido." };
  }

  const fullName = input.fullName?.trim() || email.split("@")[0] || "Editor";

  const { data: list } = await service.auth.admin.listUsers({ page: 1, perPage: 200 });
  const exists = list?.users?.find((u) => u.email?.toLowerCase() === email);

  let userId = exists?.id;

  if (!userId) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.varejoinvestidor.com";
    const password = input.temporaryPassword?.trim();

    if (password && password.length >= 8) {
      const { data, error } = await service.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { role, full_name: fullName },
      });
      if (error) return { ok: false as const, error: error.message };
      userId = data.user.id;
    } else {
      const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${siteUrl}/auth/callback?next=/admin`,
        data: { role, full_name: fullName },
      });
      if (error) return { ok: false as const, error: error.message };
      userId = data.user?.id;
    }
  }

  if (userId) {
    await service.from("profiles").upsert({
      id: userId,
      email,
      full_name: fullName,
      role,
      invited_by: user?.id ?? null,
    });
  } else if (exists?.id) {
    await service.from("profiles").upsert({
      id: exists.id,
      email,
      full_name: fullName,
      role,
      invited_by: user?.id ?? null,
    });
  }

  revalidatePath("/admin/usuarios");
  return { ok: true as const, email };
}
