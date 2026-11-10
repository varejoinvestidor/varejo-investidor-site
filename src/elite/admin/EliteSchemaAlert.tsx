"use client";

import { useState } from "react";
import { installEliteSchemaFromAdmin } from "../actions";

function needsEliteSchema(message: string) {
  return (
    /elite_operations|elite_monthly|schema cache|PGRST205/i.test(message) ||
    message.toLowerCase().includes("could not find the table")
  );
}

export function EliteSchemaAlert({ message }: { message: string }) {
  const [text, setText] = useState(message);
  const [busy, setBusy] = useState(false);
  const showInstall = needsEliteSchema(message);

  async function onInstall() {
    setBusy(true);
    const result = await installEliteSchemaFromAdmin();
    setBusy(false);
    if (result.ok) window.location.reload();
    else setText(result.error ?? "Falha ao instalar schema.");
  }

  if (!message) return null;

  return (
    <div className="rounded-lg border border-fall/40 bg-fall/10 p-4 text-sm text-fall">
      <p>{text}</p>
      {showInstall ? (
        <div className="mt-3 space-y-2 text-xs text-paper/70">
          <p>
            As tabelas <code className="text-gold">elite_operations</code> e{" "}
            <code className="text-gold">elite_monthly_reports</code> ainda não existem neste projeto Supabase.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void onInstall()}
            className="rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
          >
            {busy ? "Instalando…" : "Instalar tabelas Elite (admin)"}
          </button>
          <p className="text-paper/45">
            Alternativa técnica: <code className="text-gold">POST /api/publisher/bootstrap-schema</code> com Bearer{" "}
            <code>CRON_SECRET</code>.
          </p>
        </div>
      ) : null}
    </div>
  );
}
