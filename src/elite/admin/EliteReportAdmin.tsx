"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ELITE_ADMIN_OPS_INITIAL,
  ELITE_ADMIN_OPS_LOAD_MORE,
} from "../constants";
import { EliteMonthlyConsolidatedPanel } from "./EliteMonthlyConsolidatedPanel";
import { deleteEliteOperation, upsertEliteMonthly, upsertEliteOperation } from "../actions";
import { computeSignalPips, formatPipsLabel } from "../pips";
import { ElitePipsQuickEdit } from "./ElitePipsQuickEdit";
import type { EliteMonthlyReportRow, EliteOperationRow } from "../types";
import { ELITE_ASSET_SUGGESTIONS } from "../assets";
import { parseWhatsAppSignal } from "../whatsappParse";
import { EliteOperationsMobileList } from "./EliteOperationsMobileList";
import { EliteSchemaAlert } from "./EliteSchemaAlert";
import { EliteAdminSubnav } from "./EliteAdminSubnav";
import {
  defaultReportMonth,
  defaultTradedOnIso,
  draftFromRow,
  emptyOperationDraft,
  type OperationDraft,
} from "./operationFormState";
import { sortAdminOperations } from "./sortOperations";
import {
  rowFromTradeResult,
  tradeResultFromRow,
  tradeResultLabel,
  TRADE_RESULT_OPTIONS,
  type TradeResultKey,
} from "./tradeResult";

type Props = {
  operations: EliteOperationRow[];
  monthly: EliteMonthlyReportRow[];
  totalOperations?: number;
  loadError?: string | null;
};

function toNum(value: string | FormDataEntryValue | null): number | null {
  const n = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function WhatsappPreview({
  draft,
}: {
  draft: OperationDraft;
}) {
  const entry = toNum(draft.entry);
  const take = toNum(draft.take);
  const stop = toNum(draft.stop);
  const { status: draftStatus, closeOutcome: draftClose } = rowFromTradeResult(draft.tradeResult);

  const calc = useMemo(
    () =>
      computeSignalPips({
        asset: draft.asset || "EUR/USD",
        direction: draft.direction,
        status: draftStatus,
        entry,
        take,
        stop,
        closeOutcome: draftClose,
        manualPips: draft.tradeResult === "manual" ? toNum(draft.manualPips) ?? undefined : undefined,
      }),
    [draft.asset, draft.direction, draft.tradeResult, draft.manualPips, draftStatus, draftClose, entry, take, stop],
  );

  if (!draft.asset || entry === null) return null;

  return (
    <div className="sm:col-span-2 space-y-3">
      <pre className="admin-control whitespace-pre-wrap rounded-lg border border-line/15 p-4 font-mono text-xs leading-relaxed text-paper/80">
        {`Sinal: ${draft.signalNumber || "—"}\n🔔 ${draft.asset} ${draft.direction.toUpperCase()}  ${draft.entry}\n🎯 Take Profit: ${draft.take || "—"}\n🚫 Stop Loss: ${draft.stop || "—"}`}
      </pre>
      <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 text-sm text-paper/85">
        <p className="text-xs font-bold uppercase tracking-wider text-gold">Pips calculados</p>
        <dl className="mt-2 grid gap-1 sm:grid-cols-3">
          <div>
            <dt className="text-paper/50">Até o take</dt>
            <dd className="font-mono tabular-nums text-rise">{formatPipsLabel(calc.takePips)}</dd>
          </div>
          <div>
            <dt className="text-paper/50">Até o stop</dt>
            <dd className="font-mono tabular-nums text-fall">{formatPipsLabel(calc.stopPips)}</dd>
          </div>
          <div>
            <dt className="text-paper/50">Resultado</dt>
            <dd className="font-mono tabular-nums font-bold">
              {draft.tradeResult === "in_progress" ? "Em andamento" : calc.resultLabel}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function eliteSchemaMissing(error: string | null | undefined): boolean {
  if (!error) return false;
  return /elite_operations|elite_monthly|schema cache|PGRST205|could not find the table/i.test(error);
}

export function EliteReportAdmin({ operations, monthly, totalOperations, loadError }: Props) {
  const [message, setMessage] = useState<string | null>(loadError ?? null);
  const schemaBlocked = eliteSchemaMissing(loadError) || eliteSchemaMissing(message);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [opsVisibleCount, setOpsVisibleCount] = useState(ELITE_ADMIN_OPS_INITIAL);
  const [pasteText, setPasteText] = useState("");
  const formSectionRef = useRef<HTMLElement>(null);
  const [draft, setDraft] = useState<OperationDraft>(emptyOperationDraft());

  const filteredOps = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = !q
      ? operations
      : operations.filter((row) => {
          const num = row.signal_number != null ? String(row.signal_number) : "";
          const asset = row.asset.toLowerCase();
          if (num && (num.includes(q) || num === q.replace(/\./g, ""))) return true;
          return asset.includes(q) || q.split("/").every((p) => asset.includes(p));
        });
    return sortAdminOperations(base);
  }, [operations, search]);

  const visibleOps = useMemo(() => filteredOps.slice(0, opsVisibleCount), [filteredOps, opsVisibleCount]);
  const hasMoreOps = opsVisibleCount < filteredOps.length;

  useEffect(() => {
    setOpsVisibleCount(ELITE_ADMIN_OPS_INITIAL);
  }, [search]);

  const totalInDb = totalOperations ?? operations.length;

  function applyPaste() {
    const parsed = parseWhatsAppSignal(pasteText);
    if ("error" in parsed) {
      setMessage(parsed.error);
      return;
    }
    setMessage(null);
    setDraft((prev) => ({
      ...prev,
      signalNumber: parsed.signalNumber != null ? String(parsed.signalNumber) : prev.signalNumber,
      asset: parsed.asset,
      direction: parsed.direction,
      entry: String(parsed.entry),
      take: String(parsed.take),
      stop: String(parsed.stop),
      reportMonth: prev.reportMonth.trim() || defaultReportMonth(),
      tradedOn: prev.tradedOn.trim() || defaultTradedOnIso(),
    }));
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function startEdit(row: EliteOperationRow) {
    setEditingId(row.id);
    setDraft(draftFromRow(row));
    setMessage(null);
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(emptyOperationDraft());
    setPasteText("");
  }

  async function onSubmitOperation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const entry = toNum(form.get("entry_price"));
    const take = toNum(form.get("take_price"));
    const stop = toNum(form.get("stop_price"));
    const tradeResult = String(form.get("trade_result") ?? "take") as TradeResultKey;
    const { status, closeOutcome } = rowFromTradeResult(tradeResult);
    const manualPips = tradeResult === "manual" ? toNum(form.get("manual_pips")) : null;

    const calc = computeSignalPips({
      asset: String(form.get("asset") ?? ""),
      direction: (String(form.get("direction") ?? "Compra") as "Compra" | "Venda"),
      status,
      entry,
      take,
      stop,
      closeOutcome,
      manualPips: manualPips ?? undefined,
    });

    const result = await upsertEliteOperation({
      id: editingId ?? undefined,
      asset: String(form.get("asset") ?? ""),
      direction: (String(form.get("direction") ?? "Compra") as "Compra" | "Venda"),
      status,
      signal_number: form.get("signal_number") ? Number(form.get("signal_number")) : null,
      entry_price: entry,
      take_price: take,
      stop_price: stop,
      close_outcome: closeOutcome,
      result_pips: tradeResult === "manual" && manualPips != null ? manualPips : calc.resultPips,
      result_label:
        status === "active"
          ? "Em andamento"
          : tradeResult === "manual" && manualPips != null
            ? calc.resultLabel
            : calc.resultLabel,
      report_month: String(form.get("report_month") ?? ""),
      traded_on: String(form.get("traded_on") ?? "") || null,
      updated_label: String(form.get("updated_label") ?? "Atualizado"),
      sort_order: Number(form.get("sort_order") ?? 0),
      show_public: form.get("show_public") === "on",
      signal_tier: (String(form.get("signal_tier") ?? "elite") === "free" ? "free" : "elite") as "free" | "elite",
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

  const fieldClass =
    "admin-control w-full min-h-[44px] rounded border border-line/15 px-3 py-2.5 text-base sm:text-sm";

  return (
    <div className="admin-elite-report mx-auto max-w-6xl space-y-8 md:space-y-10">
      <EliteAdminSubnav />
      <p className="text-sm text-paper/60">
        Cadastre no mesmo formato do WhatsApp. Ao salvar, o consolidado do mês e{" "}
        <a href="/relatorio-elite" className="text-gold hover:underline" target="_blank" rel="noreferrer">
          /relatorio-elite
        </a>{" "}
        são atualizados.
      </p>
      {message ? <EliteSchemaAlert message={message} /> : null}

      <section className="space-y-4 rounded-xl border border-line/12 p-4 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Colar do WhatsApp</h3>
        <textarea
          rows={5}
          value={pasteText}
          onChange={(e) => setPasteText(e.target.value)}
          placeholder={`Sinal: 4.419\n🔔 USPX500 COMPRA 5842.5\n🔔 BTC/USD VENDA 95000\n🎯 Take Profit: …\n🚫 Stop Loss: …`}
          className={`${fieldClass} font-mono text-xs`}
        />
        <button
          type="button"
          onClick={applyPaste}
          className="rounded border border-gold/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold"
        >
          Preencher formulário
        </button>
      </section>

      <section ref={formSectionRef} className="space-y-4 rounded-xl border border-line/12 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
            {editingId ? "Editar operação" : "Nova operação"}
          </h3>
          {editingId ? (
            <button type="button" onClick={cancelEdit} className="text-xs text-paper/50 hover:text-paper">
              Cancelar edição
            </button>
          ) : null}
        </div>

        <form id="elite-operation-form" onSubmit={(e) => void onSubmitOperation(e)} className="grid gap-4 sm:grid-cols-2">
          <fieldset className="sm:col-span-2 grid grid-cols-1 gap-3 rounded-lg border border-gold/15 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <legend className="px-1 text-xs font-bold uppercase tracking-wider text-gold">Identificação</legend>
            <label className="block text-xs text-paper/50">
              Nº do sinal
              <input
                name="signal_number"
                type="number"
                min={1}
                required
                value={draft.signalNumber}
                onChange={(e) => setDraft((p) => ({ ...p, signalNumber: e.target.value }))}
                placeholder="4419"
                className={`${fieldClass} mt-1`}
              />
            </label>
            <label className="block text-xs text-paper/50 sm:col-span-2 lg:col-span-1">
              Ativo
              <input
                name="asset"
                list="elite-asset-suggestions"
                required
                value={draft.asset}
                onChange={(e) => setDraft((p) => ({ ...p, asset: e.target.value.toUpperCase() }))}
                placeholder="USPX500 · BTC/USD · SPY"
                className={`${fieldClass} mt-1 font-mono`}
              />
              <datalist id="elite-asset-suggestions">
                {ELITE_ASSET_SUGGESTIONS.map((symbol) => (
                  <option key={symbol} value={symbol} />
                ))}
              </datalist>
              <p className="mt-1 text-[10px] leading-4 text-paper/40">
                Forex, índices, cripto, ações e ETFs (ex.: USPX500, AAPL).
              </p>
            </label>
            <label className="block text-xs text-paper/50">
              Direção
              <select
                name="direction"
                value={draft.direction}
                onChange={(e) => setDraft((p) => ({ ...p, direction: e.target.value as "Compra" | "Venda" }))}
                className={`${fieldClass} mt-1`}
              >
                <option value="Compra">Compra</option>
                <option value="Venda">Venda</option>
              </select>
            </label>
            <label className="block text-xs text-paper/50">
              Canal
              <select
                name="signal_tier"
                value={draft.signalTier}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, signalTier: e.target.value === "free" ? "free" : "elite" }))
                }
                className={`${fieldClass} mt-1`}
              >
                <option value="elite">Elite</option>
                <option value="free">Free</option>
              </select>
            </label>
          </fieldset>

          <fieldset className="sm:col-span-2 grid grid-cols-1 gap-3 rounded-lg border border-rise/20 p-4 sm:grid-cols-3">
            <legend className="px-1 text-xs font-bold uppercase tracking-wider text-rise">Preços (como no WhatsApp)</legend>
            <label className="block text-xs text-paper/50">
              Entrada
              <input
                name="entry_price"
                type="number"
                step="any"
                required
                value={draft.entry}
                onChange={(e) => setDraft((p) => ({ ...p, entry: e.target.value }))}
                placeholder="109.397"
                className={`${fieldClass} mt-1 font-mono`}
              />
            </label>
            <label className="block text-xs text-paper/50">
              Take profit
              <input
                name="take_price"
                type="number"
                step="any"
                required
                value={draft.take}
                onChange={(e) => setDraft((p) => ({ ...p, take: e.target.value }))}
                placeholder="109.761"
                className={`${fieldClass} mt-1 font-mono`}
              />
            </label>
            <label className="block text-xs text-paper/50">
              Stop loss
              <input
                name="stop_price"
                type="number"
                step="any"
                required
                value={draft.stop}
                onChange={(e) => setDraft((p) => ({ ...p, stop: e.target.value }))}
                placeholder="108.901"
                className={`${fieldClass} mt-1 font-mono`}
              />
            </label>
          </fieldset>

          <label className="block text-xs text-paper/50 sm:col-span-2">
            Resultado do trade
            <select
              name="trade_result"
              value={draft.tradeResult}
              onChange={(e) => setDraft((p) => ({ ...p, tradeResult: e.target.value as TradeResultKey }))}
              className={`${fieldClass} mt-1`}
            >
              {TRADE_RESULT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          {draft.tradeResult === "manual" ? (
            <label className="block text-xs text-paper/50 sm:col-span-2">
              Pips manuais
              <input
                name="manual_pips"
                type="number"
                step={1}
                required
                value={draft.manualPips}
                onChange={(e) => setDraft((p) => ({ ...p, manualPips: e.target.value }))}
                placeholder="Ex: -120"
                className={`${fieldClass} mt-1 font-mono`}
              />
            </label>
          ) : null}

          <WhatsappPreview draft={draft} />

          <label className="block text-xs text-paper/50">
            Mês/ano do relatório
            <input
              name="report_month"
              required
              value={draft.reportMonth}
              onChange={(e) => setDraft((p) => ({ ...p, reportMonth: e.target.value }))}
              placeholder="Maio/2026"
              className={`${fieldClass} mt-1`}
            />
          </label>
          <label className="block text-xs text-paper/50">
            Data da operação
            <input
              name="traded_on"
              type="date"
              value={draft.tradedOn}
              onChange={(e) => setDraft((p) => ({ ...p, tradedOn: e.target.value }))}
              className={`${fieldClass} mt-1`}
            />
          </label>
          <label className="block text-xs text-paper/50">
            Texto de atualização
            <input
              name="updated_label"
              value={draft.updatedLabel}
              onChange={(e) => setDraft((p) => ({ ...p, updatedLabel: e.target.value }))}
              className={`${fieldClass} mt-1`}
            />
          </label>
          <label className="block text-xs text-paper/50">
            Ordem na lista
            <input
              name="sort_order"
              type="number"
              value={draft.sortOrder}
              onChange={(e) => setDraft((p) => ({ ...p, sortOrder: e.target.value }))}
              className={`${fieldClass} mt-1`}
            />
          </label>
          <p className="text-[11px] leading-5 text-paper/45 sm:col-span-2">
            <strong className="text-paper/65">Canal Free</strong> libera entrada, alvo e stop no site.{" "}
            <strong className="text-paper/65">Elite</strong> oculta alvo e stop (badge ELITE).
          </p>
          <label className="flex items-center gap-2 text-sm text-paper/70 sm:col-span-2">
            <input
              type="checkbox"
              name="show_public"
              checked={draft.showPublic}
              onChange={(e) => setDraft((p) => ({ ...p, showPublic: e.target.checked }))}
            />
            Exibir no relatório público
          </label>
          <button
            type="submit"
            disabled={schemaBlocked}
            title={
              schemaBlocked
                ? "Instale as tabelas Elite no Supabase (alerta acima) antes de salvar."
                : undefined
            }
            className="max-sm:hidden sm:col-span-2 min-h-[48px] rounded bg-gold px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink disabled:cursor-not-allowed disabled:opacity-45"
          >
            {editingId ? "Salvar alterações" : "Salvar operação"}
          </button>
        </form>
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-[#070707]/95 p-3 backdrop-blur-md sm:hidden">
          <button
            type="button"
            disabled={schemaBlocked}
            onClick={() =>
              (document.getElementById("elite-operation-form") as HTMLFormElement | null)?.requestSubmit()
            }
            className="flex w-full min-h-[48px] items-center justify-center rounded bg-gold text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-45"
          >
            {editingId ? "Salvar alterações" : "Salvar operação"}
          </button>
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-line/12 p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/55">Sinais salvos</h3>
          <p className="text-xs text-paper/45">
            {visibleOps.length} de {filteredOps.length} exibidos · {operations.length} carregados
            {totalInDb > operations.length ? (
              <span className="text-fall"> · banco: {totalInDb} (atualize o deploy)</span>
            ) : (
              <span> · banco: {totalInDb}</span>
            )}
          </p>
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nº do sinal (ex: 4419) ou ativo (ex: AUD/JPY)"
          className={fieldClass}
        />
        <EliteOperationsMobileList
          rows={visibleOps}
          editingId={editingId}
          onEdit={startEdit}
          onDelete={(row) => {
            if (confirm(`Excluir sinal ${row.signal_number ?? row.asset}?`)) {
              void deleteEliteOperation(row.id).then(() => window.location.reload());
            }
          }}
        />
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[960px] text-sm">
            <thead className="text-xs uppercase tracking-wider text-paper/45">
              <tr>
                <th className="px-3 py-2 text-left">Sinal</th>
                <th className="px-3 py-2 text-left">Ativo</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Dir.</th>
                <th className="px-3 py-2">Entrada</th>
                <th className="px-3 py-2">Take</th>
                <th className="px-3 py-2">Stop</th>
                <th className="px-3 py-2">Pips</th>
                <th className="px-3 py-2">Mês</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOps.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-3 py-8 text-center text-paper/40">
                    {operations.length === 0
                      ? "Nenhum sinal cadastrado ainda."
                      : "Nenhum resultado para esta busca."}
                  </td>
                </tr>
              ) : (
                visibleOps.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t border-line/5 ${
                      editingId === row.id ? "bg-gold/10" : row.status === "active" ? "bg-rise/10" : ""
                    }`}
                  >
                    <td className="px-3 py-2 font-mono tabular-nums text-gold">{row.signal_number ?? "—"}</td>
                    <td className="px-3 py-2 font-mono font-semibold">{row.asset}</td>
                    <td className="px-3 py-2 text-xs uppercase text-paper/55">{row.signal_tier === "free" ? "Free" : "Elite"}</td>
                    <td className="px-3 py-2">{row.direction}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.entry_price ?? "—"}</td>
                    <td className="px-3 py-2 font-mono text-xs text-rise/90">{row.take_price ?? "—"}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fall/90">{row.stop_price ?? "—"}</td>
                    <td className="px-3 py-2">
                      <ElitePipsQuickEdit row={row} />
                    </td>
                    <td className="px-3 py-2 text-paper/55">{row.report_month}</td>
                    <td className="px-3 py-2 text-xs">
                      {tradeResultLabel(tradeResultFromRow(row))}
                    </td>
                    <td className="px-3 py-2 text-right space-x-3">
                      <button type="button" className="text-xs text-gold hover:underline" onClick={() => startEdit(row)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="text-xs text-fall hover:underline"
                        onClick={() => {
                          if (confirm(`Excluir sinal ${row.signal_number ?? row.asset}?`)) {
                            void deleteEliteOperation(row.id).then(() => window.location.reload());
                          }
                        }}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {hasMoreOps ? (
          <button
            type="button"
            onClick={() => setOpsVisibleCount((n) => n + ELITE_ADMIN_OPS_LOAD_MORE)}
            className="w-full rounded-lg border border-gold/25 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-gold transition hover:border-gold hover:bg-gold/10"
          >
            Ver mais sinais (+{Math.min(ELITE_ADMIN_OPS_LOAD_MORE, filteredOps.length - opsVisibleCount)} ·{" "}
            {filteredOps.length - opsVisibleCount} restantes)
          </button>
        ) : filteredOps.length > ELITE_ADMIN_OPS_INITIAL ? (
          <p className="text-center text-[11px] text-paper/40">Todos os {filteredOps.length} sinais listados.</p>
        ) : null}
      </section>

      <section className="space-y-4 rounded-xl border border-line/12 p-4 sm:p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold">Consolidado mensal (ajuste manual)</h3>
        <p className="text-xs text-paper/50">Recalculado automaticamente ao salvar sinais. Use só para correções.</p>
        <form onSubmit={(e) => void onNewMonthly(e)} className="grid gap-3 sm:grid-cols-2">
          <input name="year" type="number" required placeholder="Ano" className={fieldClass} />
          <input name="month_index" type="number" min={0} max={11} required placeholder="Mês index (0-11)" className={fieldClass} />
          <input name="month_label" required placeholder="Nome mês" className={fieldClass} />
          <input name="signals" type="number" placeholder="Qtd sinais" className={fieldClass} />
          <input name="pips" type="number" placeholder="Pips" className={fieldClass} />
          <input name="result_label" placeholder="Resultado (+805 pips)" className={fieldClass} />
          <input name="status_label" defaultValue="Finalizado" className={fieldClass} />
          <input name="assets" placeholder="Ativos, separados por vírgula" className={`${fieldClass} sm:col-span-2`} />
          <button type="submit" className="sm:col-span-2 rounded border border-gold/35 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold">
            Salvar mês
          </button>
        </form>
        <EliteMonthlyConsolidatedPanel
          monthly={monthly}
          title="Meses cadastrados"
          subtitle="Visão agrupada por ano. Use o formulário acima só para correções pontuais."
        />
      </section>
    </div>
  );
}

