"use client";

import { FormEvent, useState } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  busy?: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void | Promise<void>;
};

export function AdminPasswordDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  busy = false,
  onClose,
  onConfirm,
}: Props) {
  const [password, setPassword] = useState("");

  if (!open) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await onConfirm(password);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={(e) => void onSubmit(e)}
        className="w-full max-w-md space-y-4 rounded-xl border border-line/20 bg-ink p-6 shadow-xl"
      >
        <h3 className="font-serif text-xl text-paper">{title}</h3>
        {description ? <p className="text-sm text-paper/60">{description}</p> : null}
        <label htmlFor="admin-password-confirm" className="block text-xs uppercase tracking-wider text-paper/55">
          Senha do administrador
        </label>
        <input
          id="admin-password-confirm"
          type="password"
          autoComplete="current-password"
          disabled={busy}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border border-line/20 bg-[#0a0a0a] px-3 py-2 text-sm text-paper"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setPassword("");
              onClose();
            }}
            disabled={busy}
            className="rounded border border-line/25 px-3 py-1.5 text-xs uppercase tracking-wider text-paper/70"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={busy || password.length < 8}
            className="rounded bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-50"
          >
            {busy ? "Aguarde…" : confirmLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
