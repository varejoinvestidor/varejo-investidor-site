"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import type { MarketSlug } from "../../data/marketContent";
import { MarketSectionScenario3D } from "./MarketSectionScenario3D";

type DiagramKind =
  | "layers"
  | "flow"
  | "participants"
  | "price"
  | "risk"
  | "access"
  | "macro"
  | "chain"
  | "liquidity"
  | "default";

function resolveKind(slug: MarketSlug, sectionIndex: number, title: string): DiagramKind {
  const t = title.toLowerCase();
  if (slug === "cripto") {
    if (t.includes("blockchain") || t.includes("como funciona")) return "chain";
    if (t.includes("camada") || t.includes("ecossistema")) return "layers";
    if (t.includes("exchange") || t.includes("cex") || t.includes("dex")) return "liquidity";
  }
  if (t.includes("como funciona") || t.includes("como o mercado")) return "flow";
  if (t.includes("participante")) return "participants";
  if (t.includes("preço") || t.includes("fator")) return "price";
  if (t.includes("risco")) return "risk";
  if (t.includes("acesso") || t.includes("forma") || t.includes("via")) return "access";
  if (t.includes("macro") || t.includes("indicador") || t.includes("research")) return "macro";
  const kinds: DiagramKind[] = ["flow", "participants", "price", "risk", "layers", "macro", "access", "chain"];
  return kinds[sectionIndex % kinds.length] ?? "default";
}

function DiagramNodes({ kind }: { kind: DiagramKind }) {
  const configs: Record<DiagramKind, { nodes: string[]; center: string }> = {
    layers: { center: "L1", nodes: ["L2", "Apps", "DeFi", "Custódia", "Fiat"] },
    chain: { center: "Bloco", nodes: ["Hash", "Mempool", "Nó", "Taxa", "Fork"] },
    liquidity: { center: "Pool", nodes: ["CEX", "DEX", "MM", "Spread", "Volume"] },
    flow: { center: "Oferta", nodes: ["Demanda", "Leilão", "Clearing", "Settlement", "Câmbio"] },
    participants: { center: "Bancos", nodes: ["Fundos", "Varejo", "Market makers", "Regulador", "Hedge"] },
    price: { center: "Preço", nodes: ["Juros", "Oferta", "Dólar", "Estoque", "Expectativa"] },
    risk: { center: "Risco", nodes: ["Vol", "Liquidez", "Alav.", "Evento", "Gap"] },
    access: { center: "ETF", nodes: ["Físico", "Futuros", "Ações", "Cripto", "Conta"] },
    macro: { center: "Macro", nodes: ["CPI", "BC", "Geopol.", "Fluxo", "Correlação"] },
    default: { center: "Mercado", nodes: ["Sessão", "Spread", "Notícia", "Tese", "Stop"] },
  };
  const { center, nodes } = configs[kind];

  return (
    <div className="relative flex h-44 w-full items-center justify-center [perspective:800px] md:h-52">
      {nodes.map((label, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 118;
        const y = Math.sin(angle) * 44;
        return (
          <motion.span
            key={label}
            className="absolute rounded border border-gold/35 bg-ink px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold"
            animate={{ x: [x, x * 1.06, x], y: [y, y - 3, y], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.6 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          >
            {label}
          </motion.span>
        );
      })}
      <motion.div
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-rise/40 bg-rise/10 text-[10px] font-black uppercase text-rise"
        animate={{ rotateY: [0, 180, 360], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {center}
      </motion.div>
    </div>
  );
}

export function InstitutionalSectionArchitecture3D({
  slug,
  sectionIndex,
  title,
  locale,
}: {
  slug: MarketSlug;
  sectionIndex: number;
  title: string;
  locale: Locale;
}) {
  const institutionalSlugs: MarketSlug[] = ["forex", "acoes", "etfs", "ouro", "petroleo", "cripto", "commodities"];
  if (institutionalSlugs.includes(slug)) {
    return <MarketSectionScenario3D slug={slug} title={title} locale={locale} />;
  }

  const kind = resolveKind(slug, sectionIndex, title);
  const caption =
    locale === "pt"
      ? "Diagrama 3D · arquitetura e fluxo desta seção"
      : locale === "es"
        ? "Diagrama 3D · arquitectura y flujo de esta sección"
        : "3D diagram · architecture and flow for this section";

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 10 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="mt-6 overflow-hidden border border-gold/[0.22] bg-ink p-4 md:p-5 md:min-h-[120px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-paper/45">{caption}</p>
      <DiagramNodes kind={kind} />
    </motion.div>
  );
}
