"use client";

import { useState } from "react";
import { backfillAllArticleBannerEmbeds } from "../articles/actions";

export function ArticleBannersBackfillButton() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onBackfill() {
    setBusy(true);
    setMessage(null);
    const result = await backfillAllArticleBannerEmbeds();
    setBusy(false);
    if (result.ok && result.data) {
      setMessage(`Atualizados: ${result.data.updated}. Ignorados (sem banner): ${result.data.skipped}.`);
    } else if (!result.ok) {
      setMessage(result.error ?? "Falha no backfill.");
    }
  }

  return (
    <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 text-sm">
      <p className="text-paper/75">
        Artigos publicados antes do embed de banners no conteúdo podem não exibir banners no site até sincronizar.
      </p>
      <button
        type="button"
        disabled={busy}
        onClick={() => void onBackfill()}
        className="mt-3 rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
      >
        {busy ? "Sincronizando…" : "Sincronizar banners em todos os artigos"}
      </button>
      {message ? <p className="mt-2 text-xs text-paper/60">{message}</p> : null}
    </div>
  );
}
