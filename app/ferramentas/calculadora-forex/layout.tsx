import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Calculadora Forex: risco, lote, pips e metas | Varejo Investidor",
  description:
    "Calcule risco, lote, valor por pip, stop loss, metas diarias, pips mensais e conversao de moeda para operacoes Forex.",
};

export default function ForexCalculatorLayout({ children }: { children: ReactNode }) {
  return children;
}
