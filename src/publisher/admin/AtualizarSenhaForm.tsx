"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updatePasswordAction, type SimpleFormState } from "./passwordActions";
import { PasswordField } from "./PasswordField";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-[#c89a3a] disabled:opacity-60"
    >
      {pending ? "Salvando…" : "Salvar e entrar"}
    </button>
  );
}

export function AtualizarSenhaForm() {
  const [state, formAction] = useFormState(updatePasswordAction, null as SimpleFormState);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error ? (
        <p className="rounded border border-fall/40 bg-fall/10 px-4 py-3 text-sm text-paper/90" role="alert">
          {state.error}
        </p>
      ) : null}
      <PasswordField id="password" name="password" label="Nova senha" autoComplete="new-password" required />
      <PasswordField id="confirm" name="confirm" label="Confirmar senha" autoComplete="new-password" required />
      <SubmitButton />
    </form>
  );
}
