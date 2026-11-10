const MONTH_PT: Record<string, number> = {
  JANEIRO: 0,
  FEVEREIRO: 1,
  MARCO: 2,
  MARÇO: 2,
  ABRIL: 3,
  MAIO: 4,
  JUNHO: 5,
  JULHO: 6,
  AGOSTO: 7,
  SETEMBRO: 8,
  OUTUBRO: 9,
  NOVEMBRO: 10,
  DEZEMBRO: 11,
};

const MONTH_LABELS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export type SheetMonthMeta = {
  sheetName: string;
  year: number;
  monthIndex: number;
  monthLabel: string;
  reportMonth: string;
};

export function parseEliteSheetTabName(name: string): SheetMonthMeta | null {
  const stripped = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const upper = stripped.toUpperCase();

  let year: number | null = null;
  const y4 = upper.match(/(20\d{2})/);
  if (y4) year = Number(y4[1]);
  else {
    const y2 = upper.match(/(?:^|[^0-9])(\d{2})$/);
    if (y2) {
      const n = Number(y2[1]);
      year = n >= 18 && n <= 30 ? 2000 + n : null;
    }
  }
  if (year == null) return null;

  let monthIndex: number | null = null;
  let monthKey = "";
  for (const [key, idx] of Object.entries(MONTH_PT)) {
    if (upper.includes(key)) {
      monthIndex = idx;
      monthKey = key;
      break;
    }
  }
  if (monthIndex == null) return null;

  const monthLabel = MONTH_LABELS[monthIndex] ?? monthKey;
  return {
    sheetName: name,
    year,
    monthIndex,
    monthLabel,
    reportMonth: `${monthLabel}/${year}`,
  };
}
