"use client";

import { FormEvent, useState } from "react";
import { deleteEliteOperation, upsertEliteMonthly, upsertEliteOperation } from "../actions";
import type { EliteMonthlyReportRow, EliteOperationRow } from "../types";

type Props = {
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
};

export function EliteReportAdmin({ operations, monthly }: Props) {
  const [message, setMessage] = useState<string | null>(null);

  async function onNewOperation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const result = await upsertEliteOperation({
      asset: String(form.get("asset") ?? ""),
      direction: (String(form.get("direction") ?? "Compra") as "Compra" | "Venda"),
      status: (String(form.get("status") ?? "closed") as "active" | "closed"),
      result_pips: Number(form.get("result_pips") ?? 0),
      result_label: String(form.get("result_label") ?? ""),
      report_month: String(form.get("report_month") ?? ""),
      traded_on: String(form.get("traded_on") ?? "") || null,
      updated_label: String(form.get("updated_label") ?? "Atualizado"),
      sort_order: Number(form.get("sort_order") ?? 0),
      show_public: form.get("show_public") === "on",
    });
    if (!result.ok) setMessage(result.error ?? "Erro ao salvar.");
    else window.location.reload();
  }

  async function onNewMonthly(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const assetsRaw = String(form.get("assets") ?? "");
    const result = await upsertEliteMonthly({
      year: Number(form.get("year")),
      month_index: Number(form.get("month_index")),
      month_label: String(form.get("month_label") ?? ""),
      signals: Number(form.get("signals") ?? 0),
      pips: Number(form.get("pips") ?? 0),
      result_label: String(form.get("result_label") ?? ""),
      status_label: String(form.get("status_label") ?? "Disponível"),
      assets: assetsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    if (!result.ok) setMessage(result.error ?? "Erro ao salvar.");
    else window.location.reload();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <p className="text-sm text-paper/60">
        Atualize operações e consolidados exibidos em{" "}
        <a href="/relatorio-elite" className="text-gold hover:underline" target="_blank" rel="noreferrer">
          /relatorio-elite
        </a>
        .
      </p>
      {message ? <p className="text-sm text-fall">{message}</p> : null}

      <section className="space-y-4 rounded-xl border border-line/12 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Nova operação</h3>
        <form onSubmit={(e) => void onNewOperation(e)} className="grid gap-3 sm:grid-cols-2">
          <input name="asset" required placeholder="Ativo (XAU/USD)" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="report_month" required placeholder="Mês/Ano (Maio/2026)" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <select name="direction" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm">
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
          </select>
          <select name="status" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm">
            <option value="closed">Finalizado</option>
            <option value="active">Ao vivo</option>
          </select>
          <input name="result_pips" type="number" placeholder="Pips (+187)" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="result_label" placeholder="Rótulo (+187 pips)" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="traded_on" type="date" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="updated_label" placeholder="Atualização" defaultValue="Atualizado hoje" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="sort_order" type="number" defaultValue={0} className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <label className="flex items-center gap-2 text-sm text-paper/70">
            <input type="checkbox" name="show_public" defaultChecked /> Público
          </label>
          <button type="submit" className="sm:col-span-2 rounded bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink">
            Salvar operação
          </button>
        </form>
      </section>

      <section className="overflow-x-auto rounded-xl border border-line/12">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-3 py-2 text-left">Ativo</th>
              <th className="px-3 py-2">Mês</th>
              <th className="px-3 py-2">Dir.</th>
              <th className="px-3 py-2">Pips</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((row) => (
              <tr key={row.id} className="border-t border-line/5">
                <td className="px-3 py-2">{row.asset}</td>
                <td className="px-3 py-2 text-paper/60">{row.report_month}</td>
                <td className="px-3 py-2">{row.direction}</td>
                <td className="px-3 py-2 tabular-nums">{row.result_pips}</td>
                <td className="px-3 py-2">{row.status}</td>
                <td className="px-3 py-2 text-right">
                  <button type="button" className="text-xs text-fall hover:underline" onClick={() => void deleteEliteOperation(row.id).then(() => window.location.reload())}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-4 rounded-xl border border-line/12 p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Consolidado mensal</h3>
        <form onSubmit={(e) => void onNewMonthly(e)} className="grid gap-3 sm:grid-cols-2">
          <input name="year" type="number" required placeholder="Ano" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="month_index" type="number" min={0} max={11} required placeholder="Mês index (0-11)" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="month_label" required placeholder="Nome mês" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="signals" type="number" placeholder="Qtd sinais" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="pips" type="number" placeholder="Pips" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="result_label" placeholder="Resultado (+805 pips)" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="status_label" defaultValue="Finalizado" className="rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <input name="assets" placeholder="Ativos, separados por vírgula" className="sm:col-span-2 rounded border border-line/15 bg-[#0a0a0a] px-3 py-2 text-sm" />
          <button type="submit" className="sm:col-span-2 rounded border border-gold/35 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold">
            Salvar mês
          </button>
        </form>
        <ul className="space-y-2 text-xs text-paper/55">
          {monthly.map((m) => (
            <li key={m.id}>
              {m.month_label}/{m.year}: {m.signals} sinais · {m.result_label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
