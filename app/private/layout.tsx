import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Varejo Investidor | Gestão Patrimonial Global",
  description:
    "Estrutura Private para clientes acima de US$ 1 milhão, com alocação global, controle patrimonial, relatórios mensais e acompanhamento estratégico.",
  alternates: {
    canonical: "/private",
  },
  openGraph: {
    title: "Private Varejo Investidor",
    description:
      "Gestão patrimonial global, controle patrimonial e acompanhamento estratégico para clientes acima de US$ 1 milhão.",
    url: "/private",
    siteName: "Varejo Investidor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Varejo Investidor",
    description:
      "Alocação global, relatórios mensais e acompanhamento patrimonial para clientes Private.",
  },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
