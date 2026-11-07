import type { Metadata } from "next";
import { SITE_URL } from "../../src/config/site";
import "../language-gate.css";

export const metadata: Metadata = {
  title: "Selecione o idioma | Varejo Investidor",
  description: "Escolha como deseja acessar a plataforma global Varejo Investidor em um dos 21 idiomas disponíveis.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_URL}/idioma`,
  },
};

export default function IdiomaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
