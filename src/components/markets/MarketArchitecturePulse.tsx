"use client";

import { motion } from "framer-motion";
import type { MarketExperienceSlug } from "./marketExperienceTypes";
import { CryptoEcosystemHero3D } from "../cripto/CryptoEcosystemHero3D";
import type { Locale } from "../../i18n";

const FOREX_NODES = ["Sydney", "Tóquio", "Londres", "NY", "Liquidez"];

function ForexSessions3D() {
  return (
    <div className="relative mx-auto flex h-48 max-w-3xl items-center justify-center overflow-hidden border border-gold/[0.2] bg-ink [perspective:900px]">
      <motion.div
        className="absolute h-36 w-36 rounded-full border border-gold/25"
        style={{ transformStyle: "preserve-3d", rotateX: 62 }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      {FOREX_NODES.map((label, i) => {
        const angle = (i / FOREX_NODES.length) * Math.PI * 2;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 36;
        return (
          <motion.span
            key={label}
            className="absolute rounded border border-rise/35 bg-rise/10 px-2 py-1 text-[10px] font-bold uppercase text-rise"
            animate={{ x: [x, x * 1.05, x], y: [y, y - 3, y], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4 + i * 0.2, repeat: Infinity }}
          >
            {label}
          </motion.span>
        );
      })}
      <span className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-gold">FX 24h</span>
    </div>
  );
}

function GenericMarketPulse({ slug }: { slug: MarketExperienceSlug }) {
  const labels =
    slug === "acoes"
      ? ["Lucros", "Juros", "Setores", "Flows", "Índices"]
      : slug === "etfs"
        ? ["NAV", "Tracking", "TER", "Flows", "Cesta"]
        : slug === "ouro"
          ? ["Juros reais", "USD", "Reservas", "ETF", "Físico"]
          : slug === "petroleo"
            ? ["OPEC+", "Brent", "WTI", "Estoques", "Crack"]
            : slug === "commodities"
              ? ["Clima", "USD", "China", "Inventário", "Frete"]
              : ["Yield", "Vacância", "IFIX", "Crédito", "Setor"];

  return (
    <div className="relative mx-auto flex h-40 max-w-xl items-center justify-center [perspective:800px]">
      {labels.map((label, i) => {
        const angle = (i / labels.length) * Math.PI * 2;
        const x = Math.cos(angle) * 110;
        const y = Math.sin(angle) * 32;
        return (
          <motion.span
            key={label}
            className="absolute rounded border border-gold/30 bg-paper/[0.06] px-2 py-1 text-[10px] font-bold uppercase text-gold"
            animate={{ x: [x, x * 1.08, x], y: [y, y - 4, y], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
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
  );
}

/** Faixa 3D de arquitetura por mercado (substitui órbita vazia de keywords). */
export function MarketArchitecturePulse({
  slug,
  locale = "pt",
}: {
  slug: MarketExperienceSlug | "forex" | "cripto";
  locale?: Locale;
}) {
  if (slug === "cripto") {
    return <CryptoEcosystemHero3D locale={locale} />;
  }

  return (
    <div className="border-t border-gold/[0.12] bg-ink px-5 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {slug === "forex" ? <ForexSessions3D /> : <GenericMarketPulse slug={slug as MarketExperienceSlug} />}
      </div>
    </div>
  );
}
