const PT_MONTHS: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  março: 2,
  marco: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
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

export function monthLabelFromIndex(index: number): string {
  return MONTH_LABELS[index] ?? String(index + 1);
}

export function formatReportMonth(monthLabel: string, year: number): string {
  return `${monthLabel}/${year}`;
}

export function monthSlug(monthLabel: string, year: number): string {
  const key = monthLabel
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return `${key}-${year}`;
}

export function parseMonthSlug(slug: string): { year: number; month_index: number; month_label: string } | null {
  const trimmed = slug.trim().toLowerCase();
  const match = trimmed.match(/^([a-zç]+)-(\d{4})$/);
  if (!match) return null;
  const key = match[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const year = Number(match[2]);
  const month_index = PT_MONTHS[key];
  if (month_index === undefined || !Number.isFinite(year)) return null;
  return { year, month_index, month_label: monthLabelFromIndex(month_index) };
}

export function parseReportMonth(raw: string): { year: number; month_index: number; month_label: string } | null {
  const parts = raw.trim().split("/");
  if (parts.length !== 2) return null;

  const year = Number(parts[1]?.trim());
  if (!Number.isFinite(year) || year < 2000) return null;

  const left = parts[0].trim();
  const asNumber = Number(left);
  if (Number.isFinite(asNumber) && asNumber >= 1 && asNumber <= 12) {
    const month_index = asNumber - 1;
    return { year, month_index, month_label: monthLabelFromIndex(month_index) };
  }

  const key = left
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const month_index = PT_MONTHS[key];
  if (month_index === undefined) return null;

  const month_label = MONTH_LABELS[month_index] ?? left;
  return { year, month_index, month_label };
}
