"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import type { EliteSignalTier } from "../../elite/signalTier";
import { fadeUp } from "../SiteSections";
import { SignalLevelRows, signalCardShellClass } from "./SignalLevelRows";

export type EliteOperationCardModel = {
  asset: string;
  direction: "Compra" | "Venda";
  result: string;
  pips?: number;
  date: string;
  updatedAt: string;
  reportMonth: string;
  signalNumber?: number | null;
  entryPrice?: number | null;
  takePrice?: number | null;
  stopPrice?: number | null;
  takePips?: number;
  stopPips?: number;
  signalTier?: EliteSignalTier;
};

type CardCopy = {
  asset: string;
  direction: string;
  status: string;
  partialResult: string;
  date: string;
  update: string;
  live: string;
  finished: string;
  protectedFields: string;
  levelsPublic: string;
  entry: string;
  target: string;
  stop: string;
  table: { signal: string };
  viewReport: string;
  buy: string;
  sell: string;
};

function formatNumber(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale).format(value);
}

function formatPips(value: number, locale: Locale) {
  const sign = value >= 0 ? "+" : "";
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs)
    ? formatNumber(abs, locale)
    : new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(abs);
  return `${sign}${formatted} pips`;
}

function formatLevel(value: number | null | undefined, locale: Locale) {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : locale, { maximumFractionDigits: 5 }).format(value);
}

function localizeDirection(direction: "Compra" | "Venda", copy: CardCopy) {
  return direction === "Compra" ? copy.buy : copy.sell;
}

function InfoRow({ label, value, positive, negative }: { label: string; value: string; positive?: boolean; negative?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] py-2.5 first:border-t-0 first:pt-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/42">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${positive ? "text-rise" : negative ? "text-fall" : "text-paper/88"}`}>
        {value}
      </span>
    </div>
  );
}

export function EliteOperationCard({
  operation,
  copy,
  locale,
  mode,
  reportHref,
  index,
}: {
  operation: EliteOperationCardModel;
  copy: CardCopy;
  locale: Locale;
  mode: "active" | "closed";
  reportHref?: string;
  index: number;
}) {
  const tier = operation.signalTier ?? "elite";
  const isElite = tier === "elite";
  const statusLabel = mode === "active" ? copy.live : copy.finished;
  const isLivePips = mode === "active" && /pips/i.test(operation.result);
  const resultPositive = operation.result.startsWith("+") || (operation.pips ?? 0) > 0;
  const resultNegative = operation.result.startsWith("-") || (operation.pips ?? 0) < 0;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      transition={{ delay: Math.min(index * 0.04, 0.2) }}
      className={`relative overflow-hidden rounded-sm p-5 md:p-6 ${signalCardShellClass(tier)}`}
    >
      {isElite ? <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/[0.12] blur-2xl" /> : null}
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`text-[10px] font-black uppercase tracking-[0.22em] ${isElite ? "text-gold" : "text-rise/90"}`}>
            {copy.asset}
          </p>
          <h3 className={`mt-2 truncate font-mono text-2xl font-black tracking-tight md:text-3xl ${isElite ? "text-gold" : "text-paper"}`}>
            {operation.asset}
          </h3>
        </div>
        <span
          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
            mode === "active"
              ? isElite
                ? "bg-gold shadow-[0_0_14px_rgba(198,153,74,0.75)]"
                : "bg-rise shadow-[0_0_12px_rgba(15,143,86,0.5)]"
              : "bg-paper/35"
          }`}
        />
      </div>
      <div className="relative mt-5 grid gap-0">
        {[
          operation.signalNumber ? [copy.table.signal, `#${formatNumber(operation.signalNumber, locale)}`] : null,
          [copy.direction, localizeDirection(operation.direction, copy)],
          [copy.status, statusLabel],
          [
            copy.partialResult,
            isLivePips
              ? locale === "en"
                ? `${operation.result} · live`
                : locale === "es"
                  ? `${operation.result} · en vivo`
                  : `${operation.result} · ao vivo`
              : operation.result,
          ],
          [copy.date, operation.date],
          [copy.update, operation.updatedAt],
        ]
          .filter(Boolean)
          .map((row) => {
            const [label, value] = row as [string, string];
            return (
              <InfoRow
                key={label}
                label={label}
                value={value}
                positive={label === copy.partialResult && resultPositive}
                negative={label === copy.partialResult && resultNegative}
              />
            );
          })}
        {tier === "free" && operation.takePips !== undefined && operation.takePips !== 0 ? (
          <p className="mt-2 text-[11px] text-paper/50">
            {copy.target}: {formatPips(operation.takePips, locale)} · {copy.stop}: {formatPips(operation.stopPips ?? 0, locale)}
          </p>
        ) : null}
        <SignalLevelRows
          tier={tier}
          labels={{
            sectionTitle: copy.protectedFields,
            sectionTitleFree: copy.levelsPublic,
            entry: copy.entry,
            target: copy.target,
            stop: copy.stop,
          }}
          entryPrice={operation.entryPrice}
          takePrice={operation.takePrice}
          stopPrice={operation.stopPrice}
          formatLevel={(value) => formatLevel(value, locale)}
        />
        {mode === "closed" && reportHref ? (
          <a
            href={reportHref}
            className="mt-4 inline-flex w-full items-center justify-center border border-gold/28 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:bg-gold hover:text-ink"
          >
            {copy.viewReport}
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export function EliteOperationsPager({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPage,
  locale,
}: {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPage: (page: number) => void;
  locale: Locale;
}) {
  if (totalItems <= pageSize) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const labels =
    locale === "en"
      ? { prev: "Previous", next: "Next", showing: "Showing" }
      : locale === "es"
        ? { prev: "Anterior", next: "Siguiente", showing: "Mostrando" }
        : { prev: "Anterior", next: "Próxima", showing: "Exibindo" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-between gap-4 border border-white/[0.08] bg-black/30 px-4 py-4 sm:flex-row"
    >
      <p className="text-center text-xs text-paper/55 sm:text-left">
        {labels.showing}{" "}
        <span className="font-mono font-bold text-gold">
          {from}–{to}
        </span>{" "}
        {locale === "en" ? "of" : locale === "es" ? "de" : "de"}{" "}
        <span className="font-mono font-bold text-paper">{totalItems}</span>{" "}
        {locale === "en" ? "operations" : locale === "es" ? "operaciones" : "operações"} ·{" "}
        <span className="text-paper/45">
          {locale === "en" ? "Page" : locale === "es" ? "Página" : "Página"} {page}/{totalPages}
        </span>
      </p>
      <div className="flex w-full gap-2 sm:w-auto">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="min-h-[44px] flex-1 rounded border border-gold/25 px-4 text-xs font-bold uppercase tracking-wider text-paper transition enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-35 sm:flex-none"
        >
          {labels.prev}
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="min-h-[44px] flex-1 rounded border border-gold/25 px-4 text-xs font-bold uppercase tracking-wider text-paper transition enabled:hover:border-gold enabled:hover:text-gold disabled:opacity-35 sm:flex-none"
        >
          {labels.next}
        </button>
      </div>
    </motion.div>
  );
}

export function paginateList<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    slice: items.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    total: items.length,
  };
}
