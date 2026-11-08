"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPublisherBrowserClient } from "../supabase/browser";
import { isSupabaseConfigured } from "../env";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const configured = isSupabaseConfigured();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const client = createPublisherBrowserClient();
    if (!client) {
      setError("Supabase não configurado. Defina as variáveis em .env.local.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await client.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError("Credenciais inválidas ou usuário sem acesso ao Publisher.");
      return;
    }

    const returnTo = searchParams?.get("returnTo") ?? "/admin";
    router.push(returnTo);
    router.refresh();
  }

  if (!configured) {
    return (
      <div className="rounded-lg border border-gold/30 bg-paper/[0.03] p-6 text-sm leading-relaxed text-paper/80">
        <p className="font-medium text-paper">Configuração pendente</p>
        <p className="mt-2">
          Copie <code className="text-gold">.env.example</code> para <code className="text-gold">.env.local</code>,
          crie o projeto Supabase, execute a migration em <code className="text-gold">supabase/migrations/</code> e
          reinicie o servidor de desenvolvimento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error ? (
        <p className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-paper/90" role="alert">
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/60">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-line/20 bg-[#0a0a0a] px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/60">
          Senha
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-line/20 bg-[#0a0a0a] px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-[#c89a3a] disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
      <p className="text-center text-xs text-paper/45">Acesso somente por convite do administrador.</p>
    </form>
  );
}
