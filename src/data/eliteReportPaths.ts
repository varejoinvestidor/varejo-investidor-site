import type { Locale } from "../i18n";

/** Rotas canônicas do relatório Elite por idioma (evita importar o hub inteiro). */
export const eliteReportPaths: Record<Locale, string> = {
  pt: "/relatorio-elite",
  en: "/elite-report",
  es: "/reporte-elite",
  fr: "/fr/elite-report",
  it: "/it/elite-report",
  de: "/de/elite-report",
  hi: "/elite-report-hi",
  ar: "/ar/elite-report",
  tr: "/tr/elite-report",
  id: "/id/elite-report",
  vi: "/vi/elite-report",
  th: "/th/elite-report",
  ru: "/ru/elite-report",
  ur: "/ur/elite-report",
  bn: "/bn/elite-report",
  ja: "/ja/elite-report",
  ko: "/ko/elite-report",
  zh: "/zh/elite-report",
  pl: "/pl/elite-report",
  tl: "/tl/elite-report",
  fa: "/fa/elite-report",
  he: "/he/elite-report",
};
