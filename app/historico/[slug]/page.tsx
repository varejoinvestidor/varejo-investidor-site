import { notFound } from "next/navigation";
import HistoricalReportClient from "./HistoricalReportClient";
import MonthlyReportClient from "./MonthlyReportClient";
import { getEliteReport, normalizedEliteReports } from "../../../src/data/eliteReports";
import { isAnnualHistoricoSlug, listHistoricoStaticSlugs, loadMonthReportPage } from "../../../src/elite/loadMonthReportPage";

export const revalidate = 120;

export async function generateStaticParams() {
  try {
    const slugs = await listHistoricoStaticSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return normalizedEliteReports.map((report) => ({ slug: report.year }));
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (isAnnualHistoricoSlug(params.slug)) {
    const report = getEliteReport(params.slug);
    return {
      title: `${report.period} | Relatório Elite | Varejo Investidor`,
      description: `Relatório anual Elite ${report.period} com histórico de sinais Ichimoku.`,
    };
  }
  const data = await loadMonthReportPage(params.slug);
  if (!data) return { title: "Relatório mensal Elite | Varejo Investidor" };
  return {
    title: `${data.monthLabel}/${data.year} | Relatório mensal Elite | Varejo Investidor`,
    description: `Resultado consolidado e operações do Canal Elite em ${data.monthLabel}/${data.year}.`,
  };
}

export default async function HistoricoSlugPage({ params }: { params: { slug: string } }) {
  if (isAnnualHistoricoSlug(params.slug)) {
    if (!normalizedEliteReports.some((report) => report.year === params.slug)) notFound();
    return <HistoricalReportClient year={params.slug} />;
  }

  const monthly = await loadMonthReportPage(params.slug);
  if (!monthly) notFound();

  return <MonthlyReportClient payload={monthly} />;
}
