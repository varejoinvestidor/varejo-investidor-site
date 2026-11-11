"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import type { MarketSlug } from "../../data/marketContent";
import { CryptoSectionScenario3D } from "../cripto/CryptoSectionScenario3D";
import { MarketScenarioShell } from "./MarketScenarioShell";

type SceneKey =
  | "panorama"
  | "how"
  | "participants"
  | "instruments"
  | "drivers"
  | "indicators"
  | "opportunity"
  | "risk"
  | "sectors"
  | "sessions"
  | "layers"
  | "logistics"
  | "agri"
  | "energy"
  | "metals";

function resolveKey(slug: MarketSlug, title: string): SceneKey {
  const t = title.toLowerCase();
  if (slug === "forex") {
    if (t.includes("câmbio") && t.includes("infraestrutura")) return "panorama";
    if (t.includes("como funciona") || t.includes("how") || t.includes("negocia")) return "sessions";
    if (t.includes("banco") || t.includes("participante") || t.includes("liquidez")) return "participants";
    if (t.includes("par") || t.includes("pair") || t.includes("instrumento")) return "instruments";
    if (t.includes("move") || t.includes("preço") || t.includes("price")) return "drivers";
    if (t.includes("indicador") || t.includes("macro")) return "indicators";
    if (t.includes("risco") || t.includes("risk")) return "risk";
    return "panorama";
  }
  if (slug === "acoes") {
    if (t.includes("infraestrutura") || t.includes("panorama") || t.includes("overview")) return "panorama";
    if (t.includes("como funciona") || t.includes("negocia")) return "how";
    if (t.includes("bolsa") || t.includes("participante") || t.includes("exchange")) return "participants";
    if (t.includes("instrumento") || t.includes("tipo")) return "instruments";
    if (t.includes("move") || t.includes("preço")) return "drivers";
    if (t.includes("indicador")) return "indicators";
    if (t.includes("oportunidade")) return "opportunity";
    if (t.includes("risco")) return "risk";
    if (t.includes("setor")) return "sectors";
    return "panorama";
  }
  if (slug === "etfs") {
    if (t.includes("panorama") || t.includes("overview") || t.includes("etf")) return "panorama";
    if (t.includes("como") || t.includes("funciona") || t.includes("tracking")) return "how";
    if (t.includes("participante") || t.includes("emissor")) return "participants";
    if (t.includes("custo") || t.includes("taxa") || t.includes("fee")) return "instruments";
    if (t.includes("move") || t.includes("preço") || t.includes("fluxo")) return "drivers";
    if (t.includes("indicador") || t.includes("macro")) return "indicators";
    if (t.includes("risco")) return "risk";
    if (t.includes("setor") || t.includes("cesta")) return "sectors";
    return "layers";
  }
  if (slug === "ouro") {
    if (t.includes("panorama") || t.includes("reserva") || t.includes("overview")) return "panorama";
    if (t.includes("como") || t.includes("funciona") || t.includes("mercado")) return "how";
    if (t.includes("participante")) return "participants";
    if (t.includes("preço") || t.includes("fator") || t.includes("move")) return "drivers";
    if (t.includes("indicador")) return "indicators";
    if (t.includes("acesso") || t.includes("exposição") || t.includes("forma")) return "instruments";
    if (t.includes("risco")) return "risk";
    return "panorama";
  }
  if (slug === "petroleo") {
    if (t.includes("panorama") || t.includes("estratég")) return "panorama";
    if (t.includes("como") || t.includes("funciona") || t.includes("internacional")) return "logistics";
    if (t.includes("participante") || t.includes("opec")) return "participants";
    if (t.includes("preço") || t.includes("fator")) return "drivers";
    if (t.includes("indicador")) return "indicators";
    if (t.includes("instrumento") || t.includes("exposição")) return "instruments";
    if (t.includes("risco") || t.includes("transição")) return "risk";
    if (t.includes("cadeia") || t.includes("extração")) return "energy";
    return "energy";
  }
  if (slug === "commodities") {
    if (t.includes("panorama") || t.includes("base") || t.includes("matéri")) return "panorama";
    if (t.includes("como") || t.includes("funciona")) return "how";
    if (t.includes("agrícol") || t.includes("agric")) return "agri";
    if (t.includes("energia") || t.includes("petróleo")) return "energy";
    if (t.includes("metal")) return "metals";
    if (t.includes("logística") || t.includes("cadeia")) return "logistics";
    if (t.includes("preço") || t.includes("fator")) return "drivers";
    if (t.includes("indicador")) return "indicators";
    if (t.includes("risco")) return "risk";
    return "logistics";
  }
  return "panorama";
}

const HINTS: Record<MarketSlug, Partial<Record<SceneKey, { pt: string; en: string }>>> = {
  forex: {
    panorama: {
      pt: "Moedas giram em torno do dólar e do euro: é o maior mercado do mundo, 24 horas por dia.",
      en: "Currencies orbit around major hubs — the FX market trades 24 hours a day.",
    },
    sessions: {
      pt: "Sydney abre, depois Londres e Nova York: a liquidez “acende” conforme o sol passa pelo planeta.",
      en: "Sydney, then London, then New York — liquidity lights up as the sun moves.",
    },
    participants: {
      pt: "Bancos, empresas e fundos trocam moedas; corretoras conectam o varejo a esse fluxo.",
      en: "Banks, companies and funds exchange currencies; brokers connect retail to the flow.",
    },
    instruments: {
      pt: "Cada par (EUR/USD, GBP/JPY…) é uma relação de preço entre duas economias.",
      en: "Each pair (EUR/USD, GBP/JPY…) prices one economy against another.",
    },
    drivers: {
      pt: "Juros, inflação e notícias empurram o câmbio — como vento mudando a direção de barcos.",
      en: "Rates, inflation and news push FX — like wind shifting boats.",
    },
    indicators: {
      pt: "Relatórios de emprego, CPI e discursos de bancos centrais movem sessões inteiras.",
      en: "Jobs data, CPI and central-bank speeches can move entire sessions.",
    },
    risk: {
      pt: "Alavancagem amplifica ganhos e perdas; spread e slippage importam no intraday.",
      en: "Leverage amplifies wins and losses; spread and slippage matter intraday.",
    },
  },
  acoes: {
    panorama: {
      pt: "Empresas captam capital; investidores compram pedaços do negócio — isso é o mercado de ações.",
      en: "Companies raise capital; investors buy slices of the business — that is the stock market.",
    },
    how: {
      pt: "Ordens de compra e venda se encontram no livro; o preço nasce do equilíbrio entre as duas.",
      en: "Buy and sell orders meet in the book; price is the balance point.",
    },
    participants: {
      pt: "Bolsas, gestoras e varejo dividem o mesmo pregão, com regras e horários distintos.",
      en: "Exchanges, asset managers and retail share the tape under distinct rules.",
    },
    instruments: {
      pt: "ON dá voto; PN pode priorizar dividendo — o tipo de ação muda seus direitos.",
      en: "Common shares vote; preferred may prioritize dividends — type defines rights.",
    },
    drivers: {
      pt: "Lucros esperados + juros globais redesenham o valuation a cada trimestre.",
      en: "Expected earnings plus global rates reshape valuation each quarter.",
    },
    indicators: {
      pt: "EPS, margens e PMI ajudam a ler se a empresa e a economia estão aquecidas.",
      en: "EPS, margins and PMIs show whether company and economy are heating up.",
    },
    opportunity: {
      pt: "Estratégias misturam valor, crescimento e dividendos — com tamanho de posição disciplinado.",
      en: "Strategies blend value, growth and dividends — with disciplined sizing.",
    },
    risk: {
      pt: "Drawdowns coletivos derrubam até bons negócios; diversificar reduz choque idiossincrático.",
      en: "Broad drawdowns hit good names too; diversification dampens idiosyncratic shock.",
    },
    sectors: {
      pt: "Setores sobem e descem em ondas — tecnologia, energia, bancos não movem juntos para sempre.",
      en: "Sectors rise in waves — tech, energy and banks do not move in lockstep forever.",
    },
  },
  etfs: {
    panorama: {
      pt: "Um ETF é uma cesta negociada em bolsa: com uma cota você acessa dezenas de ativos.",
      en: "An ETF is an exchange-traded basket: one share accesses many underlying assets.",
    },
    how: {
      pt: "O preço da cota segue o índice ou cesta; market makers ajudam a manter o alinhamento.",
      en: "The share price tracks the index or basket; market makers help keep alignment.",
    },
    layers: {
      pt: "Camadas: índice amplo → setor → país → tema. Você escolhe o nível de diversificação.",
      en: "Layers: broad index → sector → country → theme. You choose diversification depth.",
    },
    drivers: {
      pt: "Fluxos institucionais entram e saem de ETFs de índice e movimentam mercados inteiros.",
      en: "Institutional flows into index ETFs can move entire markets.",
    },
    risk: {
      pt: "Tracking error, custo (TER) e concentração em megacaps são riscos silenciosos.",
      en: "Tracking error, TER and megacap concentration are quiet risks.",
    },
  },
  ouro: {
    panorama: {
      pt: "Ouro é metal + reserva histórica: brilha quando juros reais caem ou o risco geopolítico sobe.",
      en: "Gold is metal plus historical reserve: it shines when real rates fall or geopolitics spike.",
    },
    how: {
      pt: "Spot, futuros e ETFs são vias diferentes do mesmo lastro — cada uma com custo e custódia.",
      en: "Spot, futures and ETFs are different rails to the same exposure — each with cost and custody.",
    },
    drivers: {
      pt: "Dólar forte pressiona o metal; juros reais altos aumentam o custo de oportunidade.",
      en: "A strong dollar weighs on gold; high real rates raise opportunity cost.",
    },
    instruments: {
      pt: "Barra física, ETF lastreado, ação de mineradora: três perfis de risco distintos.",
      en: "Physical bar, backed ETF, miner equity: three distinct risk profiles.",
    },
    risk: {
      pt: "Ouro também lateraliza por anos — não é garantia automática de proteção.",
      en: "Gold can drift for years — not an automatic hedge.",
    },
  },
  petroleo: {
    panorama: {
      pt: "Barril é energia global: transporte, indústria e inflação sentem cada choque de oferta.",
      en: "A barrel is global energy: transport, industry and inflation feel supply shocks.",
    },
    logistics: {
      pt: "Poço → navio-tanque → refinaria → bomba: a cadeia explica atrasos e spikes de preço.",
      en: "Well → tanker → refinery → pump: the chain explains delays and price spikes.",
    },
    energy: {
      pt: "Brent e WTI referenciam mercados diferentes; o spread mostra logística e qualidade.",
      en: "Brent and WTI anchor different markets; the spread reflects logistics and quality.",
    },
    drivers: {
      pt: "OPEP+, estoques e demanda chinesa são os três pistões que mais mexem no barril.",
      en: "OPEC+, inventories and China demand are three pistons on oil price.",
    },
    risk: {
      pt: "Geopolítica pode duplicar o preço em semanas; derivativos amplificam margens.",
      en: "Geopolitics can double price in weeks; derivatives amplify margin calls.",
    },
  },
  commodities: {
    panorama: {
      pt: "Soja, cobre, gás e milho alimentam a economia real — antes do lucro da empresa existe a matéria-prima.",
      en: "Soy, copper, gas and corn feed the real economy — raw materials come before corporate profits.",
    },
    how: {
      pt: "Preço = oferta (clima, mina, refinaria) encontrando demanda (China, EUA, Europa).",
      en: "Price = supply (weather, mines, refineries) meeting demand (China, US, Europe).",
    },
    agri: {
      pt: "Safra e clima pintam de verde ou vermelho os preços agrícolas a cada estação.",
      en: "Harvests and weather paint ag prices green or red each season.",
    },
    energy: {
      pt: "Energia é o elo entre petróleo, gás e eletricidade na matriz global.",
      en: "Energy links oil, gas and power in the global mix.",
    },
    metals: {
      pt: "Cobre e minério de ferro antecipam construção e industrial — são termômetro da China.",
      en: "Copper and iron ore anticipate construction — a China activity gauge.",
    },
    logistics: {
      pt: "Porto, frete marítimo e dólar decidem se a commodity chega cara ou barata no importador.",
      en: "Ports, freight and the dollar decide import cost.",
    },
    drivers: {
      pt: "Superciclo sobe com crescimento; recessão global comprime demanda e derruba preços.",
      en: "Supercycles rise with growth; global recessions compress demand.",
    },
    risk: {
      pt: "Contango em futuros pode corroer retorno do investidor mesmo com preço estável.",
      en: "Futures contango can erode returns even when spot looks stable.",
    },
  },
  cripto: {},
  "fundos-imobiliarios": {},
};

function hintFor(slug: MarketSlug, key: SceneKey, locale: Locale): string {
  const pack = HINTS[slug]?.[key];
  if (!pack) return locale === "pt" ? "Observe o fluxo da animação e relacione com o texto abaixo." : "Watch the motion and link it to the section below.";
  return locale === "pt" || locale === "es" ? pack.pt : pack.en;
}

function ForexSessionsScene() {
  const nodes = ["Sydney", "Tóquio", "Londres", "NY"];
  return (
    <div className="relative flex h-full items-center">
      <div className="flex w-full justify-between gap-2 px-2">
        {nodes.map((city, i) => (
          <motion.div
            key={city}
            className="flex flex-col items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >
            <span className="h-3 w-3 rounded-full bg-rise shadow-[0_0_12px_rgba(15,143,86,0.8)]" />
            <span className="text-[9px] font-bold uppercase text-gold">{city}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="absolute bottom-6 left-4 right-4 h-px bg-gold/30" animate={{ scaleX: [0.7, 1, 0.7] }} transition={{ duration: 4, repeat: Infinity }} />
    </div>
  );
}

function OrbitScene({ center, nodes, centerColor = "rise" }: { center: string; nodes: string[]; centerColor?: "rise" | "gold" }) {
  return (
    <div className="relative flex h-full items-center justify-center [perspective:900px]">
      <motion.svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="-160 -80 320 160"
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <ellipse cx="0" cy="0" rx="118" ry="44" fill="none" stroke="rgba(198,153,74,0.22)" strokeWidth="1" strokeDasharray="4 6" />
      </motion.svg>
      {nodes.map((label, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 115;
        const y = Math.sin(angle) * 42;
        const z = Math.sin(angle) * 18;
        return (
          <motion.span
            key={label}
            className="absolute rounded border border-gold/35 bg-ink/90 px-2 py-1 text-[9px] font-bold uppercase text-gold shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
            animate={{
              x: [x, x * 1.05, x],
              y: [y, y - 3, y],
              opacity: [0.55, 1, 0.55],
              scale: [1, 1 + z * 0.004, 1],
            }}
            transition={{ duration: 2.6 + i * 0.15, repeat: Infinity }}
            style={{ transform: `translateZ(${z}px)` }}
          >
            {label}
          </motion.span>
        );
      })}
      <motion.div
        className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border text-[10px] font-black uppercase shadow-[0_0_28px_rgba(15,143,86,0.25)] ${
          centerColor === "rise" ? "border-rise/40 bg-rise/10 text-rise" : "border-gold/40 bg-gold/10 text-gold"
        }`}
        animate={{ rotateY: [0, 180, 360], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {center}
      </motion.div>
    </div>
  );
}

function LayerStackScene({ labels }: { labels: string[] }) {
  return (
    <motion.div className="relative mx-auto h-full max-w-md pt-2" style={{ transformStyle: "preserve-3d", rotateX: 52, rotateZ: -8 }}>
      {labels.map((label, index) => (
        <motion.div
          key={label}
          className="absolute left-0 right-0 border border-gold/25 bg-gradient-to-r from-ink to-[#101828] px-4 py-2"
          style={{ top: index * 30, marginLeft: index * 5, zIndex: 10 - index }}
          animate={{ y: [index * 30, index * 30 - 3, index * 30] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.08 }}
        >
          <span className="text-[10px] font-bold uppercase text-gold">{label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function PipelineScene({ steps }: { steps: string[] }) {
  return (
    <ol className="flex h-full flex-wrap items-center justify-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1">
          <motion.span
            className="rounded border border-gold/30 bg-paper/[0.06] px-2 py-2 text-[9px] font-bold uppercase text-paper/80"
            animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
          >
            {step}
          </motion.span>
          {i < steps.length - 1 ? <span className="text-rise">→</span> : null}
        </li>
      ))}
    </ol>
  );
}

function BarChartScene({ labels }: { labels: string[] }) {
  return (
    <div className="grid h-full grid-cols-4 gap-2 items-end px-2">
      {labels.map((m, i) => (
        <motion.div key={m} className="flex flex-col items-center">
          <motion.div className="w-full rounded-sm bg-rise/35" animate={{ height: [28, 56 + i * 6, 28] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12 }} />
          <p className="mt-1 text-[8px] font-bold uppercase text-paper/60">{m}</p>
        </motion.div>
      ))}
    </div>
  );
}

function OrderBookScene() {
  return (
    <div className="grid h-full grid-cols-2 gap-3 px-2">
      <motion.div className="border border-rise/30 bg-rise/5 p-2" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
        <p className="text-[9px] font-black uppercase text-rise">Compra</p>
        {[1, 2, 3].map((n) => (
          <motion.div key={n} className="mt-1 h-2 bg-rise/30" animate={{ scaleX: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: n * 0.1 }} />
        ))}
      </motion.div>
      <motion.div className="border border-bear/30 bg-bear/5 p-2" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity }}>
        <p className="text-[9px] font-black uppercase text-bear">Venda</p>
        {[1, 2, 3].map((n) => (
          <motion.div key={n} className="mt-1 h-2 bg-bear/30" animate={{ scaleX: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: n * 0.1 }} />
        ))}
      </motion.div>
    </div>
  );
}

function SceneBody({ slug, keyId }: { slug: MarketSlug; keyId: SceneKey }) {
  if (keyId === "sessions") return <ForexSessionsScene />;
  if (keyId === "how" && slug === "acoes") return <OrderBookScene />;
  if (keyId === "how") return <PipelineScene steps={["Oferta", "Pregão", "Preço", "Liquidação"]} />;
  if (keyId === "logistics") return <PipelineScene steps={["Extração", "Navio", "Refino", "Consumo"]} />;
  if (keyId === "energy") return <OrbitScene center="Brent" nodes={["WTI", "OPEP+", "Estoque", "Refino", "Gasolina"]} />;
  if (keyId === "agri") return <OrbitScene center="Safra" nodes={["Clima", "Soja", "Milho", "China", "Frete"]} centerColor="gold" />;
  if (keyId === "metals") return <OrbitScene center="Cobre" nodes={["Ferro", "Alumínio", "Níquel", "Construção", "USD"]} />;
  if (keyId === "layers") return <LayerStackScene labels={["Tema", "Setor", "País", "Índice", "Amplo"]} />;
  if (keyId === "sectors") return <LayerStackScene labels={["Tech", "Saúde", "Bancos", "Energia", "Consumo"]} />;
  if (keyId === "indicators") return <BarChartScene labels={["CPI", "PMI", "Juros", "EPS"]} />;
  if (keyId === "instruments") return <OrbitScene center="Via" nodes={["Spot", "Futuro", "ETF", "Físico", "Ações"]} centerColor="gold" />;
  if (keyId === "participants") return <OrbitScene center="Fluxo" nodes={["Bancos", "Fundos", "Varejo", "Regulador", "MM"]} />;
  if (keyId === "drivers") return <OrbitScene center="Preço" nodes={["Oferta", "Demanda", "USD", "China", "Clima"]} />;
  if (keyId === "opportunity") return <PipelineScene steps={["Estudo", "Tese", "Tamanho", "Revisão"]} />;
  if (keyId === "risk") return <OrbitScene center="Risco" nodes={["Vol", "Gap", "Alav.", "Liquidez", "Evento"]} centerColor="gold" />;
  if (slug === "forex") return <OrbitScene center="FX" nodes={["EUR", "USD", "JPY", "GBP", "Spread"]} />;
  if (slug === "ouro") return <OrbitScene center="XAU" nodes={["Juros reais", "USD", "ETF", "B.C.", "Geopol."]} centerColor="gold" />;
  if (slug === "etfs") return <LayerStackScene labels={["Cesta", "NAV", "Bolsa", "Emissor", "Investidor"]} />;
  return <OrbitScene center="Mercado" nodes={["Oferta", "Demanda", "Dólar", "Clima", "Estoque"]} />;
}

export function MarketSectionScenario3D({ slug, title, locale }: { slug: MarketSlug; title: string; locale: Locale }) {
  if (slug === "cripto") {
    return <CryptoSectionScenario3D title={title} locale={locale} />;
  }

  const key = resolveKey(slug, title);
  const hint = hintFor(slug, key, locale);

  return (
    <MarketScenarioShell locale={locale} hint={hint}>
      <SceneBody slug={slug} keyId={key} />
    </MarketScenarioShell>
  );
}
