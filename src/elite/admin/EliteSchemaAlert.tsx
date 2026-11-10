"use client";

import { useState } from "react";
import { installEliteSchemaFromAdmin } from "../actions";
import { ELITE_SCHEMA_SQL } from "../schemaInstallSql";

function needsEliteSchema(message: string) {
  return (
    /elite_operations|elite_monthly|schema cache|PGRST205|PGRST204/i.test(message) ||
    /could not find the table/i.test(message)
  );
}

export function EliteSchemaAlert({ message }: { message: string }) {
  const [text, setText] = useState(message);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const showInstall = needsEliteSchema(message);
  const showSqlFallback = showInstall || /POSTGRES_URL/i.test(text);

  async function onInstall() {
    setBusy(true);
    const result = await installEliteSchemaFromAdmin();
    setBusy(false);
    if (result.ok) window.location.reload();
    else setText(result.error ?? "Falha ao instalar schema.");
  }

  async function onCopySql() {
    try {
      await navigator.clipboard.writeText(ELITE_SCHEMA_SQL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setText("Não foi possível copiar. Abra supabase/migrations/20260310130000_elite_report.sql no repositório.");
    }
  }

  if (!message) return null;

  return (
    <div className="rounded-lg border border-fall/40 bg-fall/10 p-4 text-sm text-fall">
      <p>{text}</p>
      {showInstall ? (
        <div className="mt-3 space-y-2 text-xs text-paper/70">
          <p>
            As tabelas <code className="text-gold">elite_operations</code> e{" "}
            <code className="text-gold">elite_monthly_reports</code> ainda não existem neste projeto Supabase (ou o cache
            da API não atualizou).
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void onInstall()}
              className="rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
            >
              {busy ? "Instalando…" : "Instalar tabelas Elite (admin)"}
            </button>
            <button
              type="button"
              onClick={() => void onCopySql()}
              className="rounded border border-gold/40 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gold"
            >
              {copied ? "SQL copiado!" : "Copiar SQL para Supabase"}
            </button>
          </div>
          {showSqlFallback ? (
            <p className="text-paper/45">
              Se o botão de instalar falhar por falta de <code className="text-gold">POSTGRES_URL</code> na Vercel: abra{" "}
              <strong className="text-paper/65">Supabase → SQL Editor</strong>, cole o SQL copiado e execute. Depois aguarde
              ~1 minuto e recarregue esta página.
            </p>
          ) : null}
          <p className="text-paper/45">
            Alternativa: <code className="text-gold">POST /api/publisher/bootstrap-schema</code> com Bearer{" "}
            <code>CRON_SECRET</code> (inclui Publisher + Elite).
          </p>
        </div>
      ) : null}
    </div>
  );
}
