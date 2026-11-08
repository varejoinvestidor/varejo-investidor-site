"use client";

import { ROLE_LABELS } from "../permissions";
import { updateUserRole } from "../settings/actions";
import type { PublisherRole } from "../types";

type Row = {
  id: string;
  email: string;
  full_name: string | null;
  role: PublisherRole;
  created_at: string;
};

export function UsersManager({ rows }: { rows: Row[] }) {
  async function onRoleChange(userId: string, role: string) {
    const result = await updateUserRole(userId, role);
    if (!result.ok) alert(result.error);
    else window.location.reload();
  }

  return (
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
                  onChange={(e) => void onRoleChange(row.id, e.target.value)}
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
  );
}
