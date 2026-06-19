import type { Metadata } from "next";
import EconomicCalendarClient from "./EconomicCalendarClient";

export const metadata: Metadata = {
  title: "Calendário Econômico | Varejo Investidor",
  description: "Acompanhe decisões de juros, inflação, emprego e indicadores que movimentam os mercados globais.",
  alternates: { canonical: "/ferramentas/calendario-economico" },
};

export default function EconomicCalendarPage() {
  return <EconomicCalendarClient />;
}
