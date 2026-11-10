"use client";

import { useState } from "react";
import { installViAnalyticsSchemaFromAdmin } from "../actions";

export function ViAnalyticsSchemaAlert({ state }: { state: "missing" | "unconfigured" }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onInstall() {
    setBusy(true);
    const result = await installViAnalyticsSchemaFromAdmin();
    setBusy(false);
    if (result.ok) window.location.reload();
    else setMessage(result.error ?? "Falha ao instalar.");
  }

  const text =
    state === "unconfigured"
      ? "Supabase não configurado neste ambiente — métricas locais desativadas."
      : "Tabela site_analytics_events não encontrada. Instale a migration VI Analytics.";

  return (
    <div className="rounded-lg border border-fall/35 bg-fall/10 p-4 text-sm text-paper/85">
      <p>{message ?? text}</p>
      {state === "missing" ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void onInstall()}
            className="rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
          >
            {busy ? "Instalando…" : "Instalar VI Analytics (admin)"}
          </button>
          <p className="text-xs text-paper/55">
            Ou execute <code className="text-gold">supabase/migrations/20260318120000_vi_analytics.sql</code> no SQL Editor.
          </p>
        </div>
      ) : null}
    </div>
  );
}
