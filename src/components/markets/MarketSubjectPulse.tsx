"use client";

import { motion } from "framer-motion";
import type { MarketExperienceSlug } from "./marketExperienceTypes";

const PULSE_BY_SLUG: Record<MarketExperienceSlug, string[]> = {
  acoes: ["Lucros", "Juros", "Volume", "Setores", "Flows"],
  etfs: ["NAV", "Tracking", "Spread", "Rebalance", "Flows"],
  ouro: ["Juros reais", "Dólar", "Reservas", "Volatilidade", "Macro"],
  petroleo: ["OPEC+", "Estoques", "Brent", "WTI", "Frete"],
  commodities: ["Clima", "Dólar", "China", "Inventário", "Logística"],
  "fundos-imobiliarios": ["Vacância", "Yield", "Crédito", "IFIX", "Índices"],
};

const PULSE_FOREX = ["Liquidez", "Spread", "Sessões", "Carry", "Macro"];
const PULSE_CRIPTO = ["On-chain", "Stablecoins", "Hashrate", "Adoção", "Regulação"];

/** Faixa orbital de “drivers” por mercado (reforço 3D após a experiência principal). */
export function MarketSubjectPulse({ slug }: { slug: MarketExperienceSlug | "forex" | "cripto" }) {
  const nodes =
    slug === "forex" ? PULSE_FOREX : slug === "cripto" ? PULSE_CRIPTO : PULSE_BY_SLUG[slug as MarketExperienceSlug];

  return (
    <div className="border-t border-gold/[0.12] bg-ink px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 [perspective:800px]">
        <div className="relative flex h-28 w-full max-w-xl items-center justify-center">
          {nodes.map((label, i) => {
            const angle = (i / nodes.length) * Math.PI * 2;
            const x = Math.cos(angle) * 120;
            const y = Math.sin(angle) * 36;
            return (
              <motion.span
                key={label}
                className="absolute rounded border border-gold/30 bg-paper/[0.06] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gold"
                animate={{ x: [x, x * 1.08, x], y: [y, y - 4, y], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {label}
              </motion.span>
            );
          })}
          <motion.span
            className="h-14 w-14 rounded-full border border-rise/40 bg-rise/10"
            animate={{ scale: [1, 1.08, 1], rotateY: [0, 180, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
