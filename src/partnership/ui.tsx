"use client";

import { useState } from "react";

type Result = { ok: true } | { ok: false; error: string };

export function ActionForm({
  action,
  children,
  submit = "Salvar",
}: {
  action: (form: FormData) => Promise<Result>;
  children: React.ReactNode;
  submit?: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="grid gap-3"
      action={async (form) => {
        setSaved(false);
        const result = await action(form);
        setError(result.ok ? null : result.error);
        setSaved(result.ok);
      }}
    >
      {children}
      {error ? <p className="text-sm text-fall">{error}</p> : null}
      {saved ? <p className="text-sm text-rise">Registro salvo.</p> : null}
      <button type="submit" className="w-fit rounded border border-gold/40 bg-gold/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-paper">
        {submit}
      </button>
    </form>
  );
}

export function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="grid gap-1 text-xs text-paper/70">
      {label}
      <input name={name} type={type} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm text-paper" />
    </label>
  );
}

export function Area({ name, label }: { name: string; label: string }) {
  return (
    <label className="grid gap-1 text-xs text-paper/70">
      {label}
      <textarea name={name} rows={3} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm text-paper" />
    </label>
  );
}

export function SelectField({ name, label, options }: { name: string; label: string; options: { value: string; label: string }[] }) {
  return (
    <label className="grid gap-1 text-xs text-paper/70">
      {label}
      <select name={name} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm text-paper">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DataTable({ columns, rows }: { columns: { key: string; label: string }[]; rows: Record<string, unknown>[] }) {
  if (!rows.length) return <p className="text-sm text-paper/55">Nenhum registro persistido.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line/15 text-xs uppercase tracking-wider text-paper/50">
            {columns.map((column) => (
              <th key={column.key} className="px-2 py-2 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)} className="border-b border-line/10">
              {columns.map((column) => (
                <td key={column.key} className="px-2 py-2 text-paper/85">
                  {formatCell(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCell(value: unknown) {
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "sim" : "não";
  return String(value);
}

export function ExportButton({ filename, rows }: { filename: string; rows: Record<string, unknown>[] }) {
  return (
    <button
      type="button"
      onClick={() => exportRows(filename, rows)}
      className="rounded border border-line/25 px-3 py-2 text-xs font-bold uppercase tracking-wider text-paper/80"
    >
      Exportar
    </button>
  );
}

function exportRows(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map((row) => keys.map((key) => JSON.stringify(row[key] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
