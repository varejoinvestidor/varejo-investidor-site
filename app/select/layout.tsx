import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Varejo Investidor Select | Estratégia Patrimonial Global",
  description:
    "Estrutura operacional via copytrade para investidores qualificados que desejam exposição aos mercados globais sem acompanhar operações diariamente.",
  alternates: {
    canonical: "/select",
  },
  openGraph: {
    title: "Varejo Investidor Select",
    description:
      "Estrutura operacional premium para exposição global com acompanhamento profissional.",
    url: "/select",
    type: "website",
  },
};

export default function SelectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
