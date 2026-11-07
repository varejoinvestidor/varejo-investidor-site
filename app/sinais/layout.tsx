import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Research | Varejo Investidor",
  description:
    "Acesse o Research Elite da Varejo Investidor: análises, estrutura operacional e assinatura via Lastlink ou Stripe.",
  alternates: {
    canonical: "/sinais",
  },
};

export default function SinaisLayout({ children }: { children: ReactNode }) {
  return children;
}
