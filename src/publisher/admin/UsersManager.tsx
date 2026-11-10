"use client";

import { FormEvent, useState } from "react";
import { ROLE_LABELS } from "../permissions";
import { invitePublisherUser, updateUserRole } from "../settings/actions";
import type { PublisherRole } from "../types";
import { AdminPasswordDialog } from "./AdminPasswordDialog";

type Row = {
  id: string;
  email: string;
  full_name: string | null;
  role: PublisherRole;
  created_at: string;
};

export function UsersManager({ rows }: { rows: Row[] }) {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [pending, setPending] = useState<
    | { kind: "role"; userId: string; role: string }
    | { kind: "invite"; payload: Parameters<typeof invitePublisherUser>[0] }
    | null
  >(null);
  const [busy, setBusy] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);

  function onRoleChange(userId: string, role: string) {
    setPending({ kind: "role", userId, role });
    setPasswordOpen(true);
  }

  async function onInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInviteError(null);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const role = String(form.get("role") ?? "author") as PublisherRole;
    const fullName = String(form.get("fullName") ?? "").trim();
    const temporaryPassword = String(form.get("temporaryPassword") ?? "").trim();
    const mode = String(form.get("mode") ?? "invite");

    if (!email) {
      setInviteError("Informe o e-mail.");
      return;
    }

    setPending({
      kind: "invite",
      payload: {
        email,
        role,
        fullName: fullName || undefined,
        temporaryPassword: mode === "create" ? temporaryPassword : undefined,
      },
    });
    setPasswordOpen(true);
  }

  async function onPasswordConfirm(password: string) {
    if (!pending) return;
    setBusy(true);
    if (pending.kind === "role") {
      const result = await updateUserRole(pending.userId, pending.role, password);
      if (!result.ok) alert(result.error);
      else window.location.reload();
    } else {
      const result = await invitePublisherUser({ ...pending.payload, adminPassword: password });
      if (!result.ok) setInviteError(result.error);
      else window.location.reload();
    }
    setBusy(false);
    setPasswordOpen(false);
    setPending(null);
  }

  return (
    <div className="space-y-8">
      <form onSubmit={(e) => void onInvite(e)} className="space-y-4 rounded-xl border border-line/12 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Convidar ou criar usuário</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs text-paper/50">E-mail</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-paper/50">Nome</label>
            <input name="fullName" className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-paper/50">Perfil</label>
            <select name="role" defaultValue="author" className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm">
              {(Object.keys(ROLE_LABELS) as PublisherRole[]).map((role) => (
                <option key={role} value={role}>
                  {ROLE_LABELS[role]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-paper/50">Modo</label>
            <select name="mode" defaultValue="invite" className="mt-1 w-full rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm">
              <option value="invite">Convite por e-mail (Supabase)</option>
              <option value="create">Criar com senha provisória</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-paper/50">Senha provisória (só no modo criar, mín. 8)</label>
            <input
              name="temporaryPassword"
              type="password"
              minLength={8}
              className="mt-1 w-full max-w-md rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm"
            />
          </div>
        </div>
        {inviteError ? <p className="text-sm text-fall">{inviteError}</p> : null}
        <button
          type="submit"
          className="rounded bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink"
        >
          Continuar
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-line/12">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">E-mail</th>
              <th className="px-4 py-3 text-left">Perfil</th>
              <th className="px-4 py-3 text-left">Desde</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-line/5">
                <td className="px-4 py-3">{row.full_name ?? "—"}</td>
                <td className="px-4 py-3 text-paper/70">{row.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.role}
                    onChange={(e) => onRoleChange(row.id, e.target.value)}
                    className="rounded border border-line/15 bg-[#0a0a0a] px-2 py-1 text-sm"
                  >
                    {(Object.keys(ROLE_LABELS) as PublisherRole[]).map((role) => (
                      <option key={role} value={role}>
                        {ROLE_LABELS[role]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-paper/50">{new Date(row.created_at).toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminPasswordDialog
        open={passwordOpen}
        busy={busy}
        title="Confirmar como administrador"
        description="Alterações de usuários exigem sua senha."
        onClose={() => {
          setPasswordOpen(false);
          setPending(null);
        }}
        onConfirm={onPasswordConfirm}
      />
    </div>
  );
}
