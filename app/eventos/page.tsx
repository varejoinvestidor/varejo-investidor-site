import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Eventos Presenciais Varejo Investidor | Mercado Global, Forex e Patrimônio",
  description:
    "Participe dos eventos presenciais do Varejo Investidor e aprenda sobre economia global, Forex, criptomoedas, patrimônio, dólar e a metodologia Formiga, Lobo e Harpia.",
  keywords: [
    "eventos financeiros",
    "evento mercado financeiro",
    "evento forex",
    "educação financeira presencial",
    "mercado global",
    "patrimônio em dólar",
    "varejo investidor",
    "formiga lobo harpia",
  ],
  openGraph: {
    title: "Eventos Presenciais Varejo Investidor",
    description:
      "Mercado global, Forex, patrimônio, criptomoedas e metodologia Formiga, Lobo e Harpia em encontros presenciais.",
    url: "/eventos",
    type: "website",
  },
};

export default function EventsPage() {
  return <EventsClient />;
}
