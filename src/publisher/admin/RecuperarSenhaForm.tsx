"use client";

import { useFormState, useFormStatus } from "react-dom";
import { requestPasswordResetAction, type SimpleFormState } from "./passwordActions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-[#c89a3a] disabled:opacity-60"
    >
      {pending ? "Enviando…" : "Enviar link"}
    </button>
  );
}

export function RecuperarSenhaForm() {
  const [state, formAction] = useFormState(requestPasswordResetAction, null as SimpleFormState);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <p className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-paper/90" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="rounded border border-rise/40 bg-rise/10 px-4 py-3 text-sm text-paper/90" role="status">
          {state.success}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/60">
          E-mail da conta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded border border-line/20 bg-[#0a0a0a] px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
