import type { Metadata } from "next";
import WhatsAppChannelsLanding from "./WhatsappChannelsLanding";

export const metadata: Metadata = {
  title: "Canais Oficiais no WhatsApp | Varejo Investidor",
  description: "Página direta para acesso aos canais oficiais Formiga e Lobo do Varejo Investidor no WhatsApp.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function CanaisWhatsAppPage() {
  return <WhatsAppChannelsLanding />;
}
