"use client";

type HeatmapCell = {
  year: number;
  monthIndex: number;
  signals: number;
  pips: number;
  monthLabel: string;
};

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function EliteMonthlyHeatmap({
  years,
  getCell,
  onSelect,
  footnote,
}: {
  years: number[];
  getCell: (year: number, monthIndex: number) => HeatmapCell | null;
  onSelect?: (cell: HeatmapCell) => void;
  footnote?: string;
}) {
  if (!years.length) {
    return <p className="text-sm text-paper/45">Sem meses consolidados.</p>;
  }

  const CellTag = onSelect ? "button" : "span";

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[720px] grid-cols-[56px_repeat(12,1fr)] gap-1.5">
        <span />
        {MONTHS.map((m) => (
          <span key={m} className="text-center text-[9px] font-bold uppercase tracking-wider text-paper/45">
            {m}
          </span>
        ))}
        {years.map((year) => (
          <div key={year} className="contents">
            <span className="font-mono text-xs font-black text-gold">{year}</span>
            {MONTHS.map((_, monthIndex) => {
              const row = getCell(year, monthIndex);
              if (!row) {
                return (
                  <CellTag
                    key={`${year}-${monthIndex}`}
                    type={onSelect ? "button" : undefined}
                    className="flex h-8 items-center justify-center rounded border border-white/5 bg-white/[0.02] text-[10px] text-paper/12"
                  />
                );
              }
              const positive = row.pips > 0;
              const negative = row.pips < 0;
              const tone = positive
                ? "border-rise/35 bg-rise/14 text-rise"
                : negative
                  ? "border-fall/35 bg-fall/12 text-fall"
                  : "border-gold/22 bg-gold/10 text-gold";
              return (
                <CellTag
                  key={`${year}-${monthIndex}`}
                  type={onSelect ? "button" : undefined}
                  title={`${row.monthLabel}/${row.year}: ${row.signals} sinais`}
                  onClick={onSelect ? () => onSelect(row) : undefined}
                  className={`flex h-8 items-center justify-center rounded border text-[10px] font-black tabular-nums transition hover:brightness-110 ${tone}`}
                >
                  {row.signals}
                </CellTag>
              );
            })}
          </div>
        ))}
      </div>
      {footnote ? <p className="mt-3 text-[11px] text-paper/45">{footnote}</p> : null}
    </div>
  );
}
