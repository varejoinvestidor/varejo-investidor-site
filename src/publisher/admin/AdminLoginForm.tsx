"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { publisherLoginAction, type LoginState } from "./loginAction";
import { isSupabaseConfigured } from "../env";
import { PasswordField } from "./PasswordField";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-[#c89a3a] disabled:opacity-60"
    >
      {pending ? "Entrando…" : "Entrar"}
    </button>
  );
}

const PROFILE_ERROR =
  "Sua conta entrou, mas o perfil editorial não foi encontrado. Tente entrar de novo — corrigimos isso automaticamente.";

export function AdminLoginForm({
  returnTo = "/admin",
  urlError,
}: {
  returnTo?: string;
  urlError?: string;
}) {
  const [state, formAction] = useFormState(publisherLoginAction, null as LoginState);
  const configured = isSupabaseConfigured();
  const urlHint = urlError === "profile" ? PROFILE_ERROR : null;

  if (!configured) {
    return (
      <div className="rounded-lg border border-gold/30 bg-paper/[0.03] p-6 text-sm leading-relaxed text-paper/80">
        <p className="font-medium text-paper">Configuração pendente</p>
        <p className="mt-2 text-paper/60">
          Variáveis Supabase ausentes neste build. Verifique a Vercel e faça redeploy.
        </p>
      </div>
    );
  }

  const displayError = state?.error ?? urlHint;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="returnTo" value={returnTo} />
      {displayError ? (
        <p className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-paper/90" role="alert">
          {displayError}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/60">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded border border-line/20 bg-[#0a0a0a] px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
        />
      </div>
      <PasswordField id="password" name="password" label="Senha" required />
      <SubmitButton />
      <p className="text-center text-sm">
        <Link href="/admin/recuperar-senha" className="text-gold hover:underline">
          Esqueci minha senha
        </Link>
      </p>
      <p className="text-center text-xs text-paper/45">Acesso somente por convite do administrador.</p>
    </form>
  );
}
