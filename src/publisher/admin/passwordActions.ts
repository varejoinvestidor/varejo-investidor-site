"use server";

import { redirect } from "next/navigation";
import { absoluteSiteUrl } from "../../config/site";
import { createPublisherServerClient } from "../supabase/server";

export type SimpleFormState = { error?: string; success?: string } | null;

export async function requestPasswordResetAction(
  _prev: SimpleFormState,
  formData: FormData,
): Promise<SimpleFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Informe o e-mail da conta." };

  const supabase = createPublisherServerClient();
  if (!supabase) return { error: "Supabase não configurado." };

  const redirectTo = absoluteSiteUrl("/auth/callback?next=/admin/atualizar-senha");
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  if (error) {
    return { error: "Não foi possível enviar o e-mail. Verifique o endereço ou tente mais tarde." };
  }

  return {
    success: "Enviamos um link para redefinir sua senha. Confira a caixa de entrada e o spam.",
  };
}

export async function updatePasswordAction(
  _prev: SimpleFormState,
  formData: FormData,
): Promise<SimpleFormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: "A senha deve ter no mínimo 8 caracteres." };
  }
  if (password !== confirm) {
    return { error: "As senhas não coincidem." };
  }

  const supabase = createPublisherServerClient();
  if (!supabase) return { error: "Sessão inválida. Solicite um novo link." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Link expirado ou sessão inválida. Peça um novo e-mail em /admin/recuperar-senha." };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: "Não foi possível atualizar a senha. Tente novamente." };
  }

  redirect("/admin");
}
