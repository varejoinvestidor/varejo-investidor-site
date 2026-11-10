"use client";

import { useFormState, useFormStatus } from "react-dom";
import { publisherLoginAction, type LoginState } from "./loginAction";
import { isSupabaseConfigured } from "../env";

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

export function AdminLoginForm({ returnTo = "/admin" }: { returnTo?: string }) {
  const [state, formAction] = useFormState(publisherLoginAction, null as LoginState);
  const configured = isSupabaseConfigured();

  if (!configured) {
    return (
      <div className="rounded-lg border border-gold/30 bg-paper/[0.03] p-6 text-sm leading-relaxed text-paper/80">
        <p className="font-medium text-paper">Configuração pendente</p>
        <p className="mt-2 text-paper/60">
          Variáveis Supabase ausentes neste build. Verifique a Vercel (projeto{" "}
          <code className="text-gold">varejo-investidor-site-m9uy</code>) e faça redeploy.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="returnTo" value={returnTo} />
      {state?.error ? (
        <p className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-paper/90" role="alert">
          {state.error}
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
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/60">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded border border-line/20 bg-[#0a0a0a] px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
        />
      </div>
      <SubmitButton />
      <p className="text-center text-xs text-paper/45">Acesso somente por convite do administrador.</p>
    </form>
  );
}
