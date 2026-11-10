import type { EliteOperationRow } from "../types";
import { tradeResultFromRow, tradeResultLabel } from "./tradeResult";

export function EliteOperationsMobileList({
  rows,
  editingId,
  onEdit,
  onDelete,
}: {
  rows: EliteOperationRow[];
  editingId: string | null;
  onEdit: (row: EliteOperationRow) => void;
  onDelete: (row: EliteOperationRow) => void;
}) {
  if (!rows.length) {
    return (
      <p className="rounded-lg border border-dashed border-line/20 px-4 py-8 text-center text-sm text-paper/45 md:hidden">
        Nenhum sinal nesta busca.
      </p>
    );
  }

  return (
    <ul className="grid gap-3 md:hidden">
      {rows.map((row) => (
        <li
          key={row.id}
          className={`rounded-lg border p-4 ${editingId === row.id ? "border-gold/40 bg-gold/10" : "border-line/15 bg-[#0a0a0a]"}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-bold text-gold">#{row.signal_number ?? "—"}</p>
              <p className="mt-1 font-mono text-lg font-bold text-paper">{row.asset}</p>
            </div>
            <span
              className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${
                row.signal_tier === "free" ? "border-rise/35 text-rise" : "border-gold/40 text-gold"
              }`}
            >
              {row.signal_tier === "free" ? "Free" : "Elite"}
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <DetailItem label="Direção" value={row.direction} />
            <DetailItem label="Pips" value={row.result_label} />
            <DetailItem label="Entrada" value={row.entry_price != null ? String(row.entry_price) : "—"} mono />
            <DetailItem label="Mês" value={row.report_month} />
          </dl>
          <p className="mt-2 text-[10px] uppercase tracking-wider text-paper/45">{tradeResultLabel(tradeResultFromRow(row))}</p>
          <div className="mt-4 flex gap-4">
            <button type="button" className="min-h-[44px] text-sm font-bold text-gold" onClick={() => onEdit(row)}>
              Editar
            </button>
            <button type="button" className="min-h-[44px] text-sm font-bold text-fall" onClick={() => onDelete(row)}>
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function DetailItem({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-paper/45">{label}</dt>
      <dd className={`font-semibold text-paper/85 ${mono ? "font-mono text-[11px]" : ""}`}>{value}</dd>
    </div>
  );
}
