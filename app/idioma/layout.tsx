import type { Metadata } from "next";
import { SITE_URL } from "../../src/config/site";
import { getIdiomaPageMetaDescription } from "../../src/data/languageCountCopy";
import "../language-gate.css";

export const metadata: Metadata = {
  title: "Selecione o idioma | Varejo Investidor",
  description: getIdiomaPageMetaDescription(),
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${SITE_URL}/idioma`,
  },
};

export default function IdiomaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
