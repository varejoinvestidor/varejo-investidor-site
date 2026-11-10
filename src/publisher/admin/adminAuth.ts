"use server";

import { getPublisherSession } from "../supabase/server";
import type { ActionResult } from "../articles/actions";

export async function verifyAdminPassword(password: string): Promise<ActionResult> {
  const { supabase, user, profile } = await getPublisherSession();
  if (!supabase || !user?.email || !profile) {
    return { ok: false, error: "Sessão inválida." };
  }
  if (profile.role !== "admin") {
    return { ok: false, error: "Apenas administradores." };
  }

  const trimmed = password.trim();
  if (trimmed.length < 8) {
    return { ok: false, error: "Informe sua senha de administrador." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: trimmed,
  });

  if (error) {
    return { ok: false, error: "Senha de administrador incorreta." };
  }

  return { ok: true };
}

export async function requireAdminPassword(password: string | undefined): Promise<ActionResult> {
  if (!password?.trim()) {
    return { ok: false, error: "Confirme sua senha de administrador para continuar." };
  }
  return verifyAdminPassword(password);
}
