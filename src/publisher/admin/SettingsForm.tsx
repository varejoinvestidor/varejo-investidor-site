"use client";

import { FormEvent, useState } from "react";
import { updateSiteSetting } from "../settings/actions";
import { getSiteTimezone } from "../env";

export function SettingsForm({ settings }: { settings: Record<string, unknown> }) {
  const [timezone, setTimezone] = useState(
    String(settings.timezone ?? getSiteTimezone()).replace(/^"|"$/g, ""),
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    const result = await updateSiteSetting("timezone", timezone);
    if (!result.ok) setMessage(result.error);
    else setMessage("Configurações salvas.");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-4 rounded-xl border border-line/12 p-6">
      <div>
        <label className="text-xs uppercase tracking-wider text-paper/45">Fuso horário</label>
        <input
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm"
        />
      </div>
      <p className="text-xs text-paper/45">
        Idiomas MVP: pt, en (site_settings.publisher_mvp_languages)
      </p>
      <button type="submit" className="rounded bg-gold px-4 py-2 text-xs font-bold uppercase text-ink">
        Salvar
      </button>
      {message ? <p className="text-sm text-paper/70">{message}</p> : null}
    </form>
  );
}
