"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPublisherServerClient } from "../supabase/server";
import { ensurePublisherProfile } from "./ensurePublisherProfile";

export type LoginState = { error?: string } | null;

export async function publisherLoginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin").trim() || "/admin";

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const supabase = createPublisherServerClient();
  if (!supabase) {
    return { error: "Supabase não configurado no servidor." };
  }

  const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Credenciais inválidas ou usuário sem acesso ao Publisher." };
  }

  const user = signInData.user;
  if (user?.id && user.email) {
    await ensurePublisherProfile(user.id, user.email);
  }

  revalidatePath("/admin", "layout");
  redirect(returnTo.startsWith("/admin") ? returnTo : "/admin");
}
