"use client";

import { useState } from "react";
import { installArticleBannersSchemaFromAdmin } from "../articles/actions";

function needsBannersSchema(message: string) {
  return (
    message.includes("articles.banners") ||
    /could not find the ['"]banners['"] column/i.test(message) ||
    (/banners/i.test(message) && /column|schema cache|PGRST/i.test(message))
  );
}

export function ArticleBannersSchemaAlert({ message }: { message: string }) {
  const [text, setText] = useState(message);
  const [busy, setBusy] = useState(false);
  const showInstall = needsBannersSchema(message);

  async function onInstall() {
    setBusy(true);
    const result = await installArticleBannersSchemaFromAdmin();
    setBusy(false);
    if (result.ok) window.location.reload();
    else setText(result.error ?? "Falha ao instalar coluna de banners.");
  }

  return (
    <div className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-fall" role="alert">
      <p>{text}</p>
      {showInstall ? (
        <div className="mt-3 space-y-2 text-xs text-paper/70">
          <p>
            Sem a coluna <code className="text-gold">articles.banners</code>, o artigo publica sem banners no site.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void onInstall()}
            className="rounded bg-gold px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink disabled:opacity-50"
          >
            {busy ? "Instalando…" : "Instalar coluna de banners (admin)"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
