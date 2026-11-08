"use client";

import { useState } from "react";
import { updateCategory, type CategoryRow } from "../taxonomy/actions";

export function CategoriesManager({ initial }: { initial: CategoryRow[] }) {
  const [rows, setRows] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);

  async function save(row: CategoryRow) {
    setMessage(null);
    const result = await updateCategory(row.id, {
      name_pt: row.name_pt,
      name_en: row.name_en,
      sort_order: row.sort_order,
    });
    if (!result.ok) setMessage(result.error ?? "Erro ao salvar.");
    else setMessage("Categoria atualizada.");
  }

  return (
    <div className="space-y-4">
      {message ? <p className="text-sm text-paper/70">{message}</p> : null}
      <div className="overflow-x-auto rounded-xl border border-line/12">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-4 py-3 text-left">Ordem</th>
              <th className="px-4 py-3 text-left">Slug</th>
              <th className="px-4 py-3 text-left">PT</th>
              <th className="px-4 py-3 text-left">EN</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-t border-line/5">
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.sort_order}
                    onChange={(e) => {
                      const next = [...rows];
                      next[index] = { ...row, sort_order: Number(e.target.value) };
                      setRows(next);
                    }}
                    className="w-16 rounded border border-line/15 bg-[#0a0a0a] px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2 text-paper/50">{row.slug}</td>
                <td className="px-4 py-2">
                  <input
                    value={row.name_pt}
                    onChange={(e) => {
                      const next = [...rows];
                      next[index] = { ...row, name_pt: e.target.value };
                      setRows(next);
                    }}
                    className="w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    value={row.name_en}
                    onChange={(e) => {
                      const next = [...rows];
                      next[index] = { ...row, name_en: e.target.value };
                      setRows(next);
                    }}
                    className="w-full rounded border border-line/15 bg-[#0a0a0a] px-2 py-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <button type="button" onClick={() => void save(rows[index])} className="text-xs text-gold">
                    Salvar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
