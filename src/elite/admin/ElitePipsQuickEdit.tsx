"use client";

import { useState, useTransition } from "react";
import { quickSetEliteOperationPips } from "../actions";
import { resolveOperationPips } from "../resolveOperationPips";
import type { EliteOperationRow } from "../types";

export function ElitePipsQuickEdit({
  row,
  onSaved,
}: {
  row: EliteOperationRow;
  onSaved?: () => void;
}) {
  const resolved = resolveOperationPips(row);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(resolved.pips));
  const [pending, startTransition] = useTransition();

  function save() {
    const pips = Number(value.replace(",", "."));
    if (!Number.isFinite(pips)) return;
    startTransition(async () => {
      const result = await quickSetEliteOperationPips(row.id, pips);
      if (result.ok) {
        setOpen(false);
        onSaved?.();
        window.location.reload();
      } else {
        alert(result.error ?? "Não foi possível salvar os pips.");
      }
    });
  }

  if (!open) {
    return (
      <span className="inline-flex items-center gap-1.5 tabular-nums">
        <span>{resolved.label}</span>
        <button
          type="button"
          title="Editar pips manualmente"
          aria-label="Editar pips"
          onClick={() => {
            setValue(String(resolved.pips));
            setOpen(true);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gold/25 text-gold transition hover:border-gold hover:bg-gold/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0 0-3L16.5 4.5a2.1 2.1 0 0 0-3 0L4 14v6z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </span>
    );
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-24 rounded border border-gold/30 bg-ink px-2 py-1 font-mono text-xs text-paper"
        autoFocus
      />
      <button
        type="button"
        disabled={pending}
        onClick={save}
        className="rounded bg-gold px-2 py-1 text-[10px] font-bold uppercase text-ink disabled:opacity-50"
      >
        OK
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => setOpen(false)}
        className="text-[10px] font-bold uppercase text-paper/45"
      >
        Cancelar
      </button>
    </span>
  );
}
