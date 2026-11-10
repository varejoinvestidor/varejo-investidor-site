"use client";

import { useState } from "react";
import { installViAnalyticsSchemaFromAdmin } from "../actions";

export function ViAnalyticsSchemaAlert({ state }: { state: "missing" | "unconfigured" | "partial" }) {
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
      : state === "partial"
        ? "Telemetria base ativa, mas a migration de regiões (país/macro-região) ainda não foi aplicada. Views e cliques funcionam; aba Regiões fica incompleta."
        : "Tabela site_analytics_events não encontrada. Instale a migration VI Analytics.";

  return (
    <div
      className={`rounded-lg border p-4 text-sm text-paper/85 ${
        state === "partial" ? "border-gold/35 bg-gold/10" : "border-fall/35 bg-fall/10"
      }`}
    >
      <p>{message ?? text}</p>
      {state === "missing" || state === "partial" ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void onInstall()}
            className="rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
          >
            {busy ? "Instalando…" : "Instalar agora (manual)"}
          </button>
          <p className="text-xs text-paper/55">
            Ou execute{" "}
            <code className="text-gold">20260318120000_vi_analytics.sql</code> e{" "}
            <code className="text-gold">20260319120000_vi_analytics_regions.sql</code> no SQL Editor.
          </p>
          <p className="w-full text-xs text-paper/45">
            Instalação automática: ao abrir este painel como admin (com POSTGRES na Vercel) e via cron{" "}
            <code className="text-gold">/api/cron/vi-analytics-maintain</code>.
          </p>
        </div>
      ) : null}
    </div>
  );
}
