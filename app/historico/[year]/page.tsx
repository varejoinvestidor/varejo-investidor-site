import HistoricalReportClient from "./HistoricalReportClient";
import { normalizedEliteReports } from "../../../src/data/eliteReports";

export function generateStaticParams() {
  return normalizedEliteReports.map((report) => ({
    year: report.year,
  }));
}

export default function HistoricalReportPage({ params }: { params: { year: string } }) {
  return <HistoricalReportClient year={params.year} />;
}
