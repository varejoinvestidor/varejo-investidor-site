import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Varejo Investidor Private | Estrutura Patrimonial Global",
  description:
    "Camada patrimonial global para investidores acima de US$ 1.000.000, com acompanhamento patrimonial contínuo, alocação estratégica e organização internacional de patrimônio.",
  alternates: {
    canonical: "/private",
  },
  openGraph: {
    title: "Varejo Investidor Private",
    description:
      "Estrutura patrimonial global para investidores com patrimônio acima de US$ 1.000.000.",
    url: "/private",
    siteName: "Varejo Investidor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Varejo Investidor Private",
    description:
      "Acompanhamento patrimonial contínuo, alocação global e estrutura de wealth management para investidores de alta escala.",
  },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
