"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { fxproButtonLabels, fxproLinks } from "../../src/data/fxproLinks";

const SELECT_CONTACT_URL =
  "https://wa.me/5519983393147?text=Ol%C3%A1%2C%20quero%20solicitar%20uma%20apresenta%C3%A7%C3%A3o%20do%20Varejo%20Investidor%20Select.";
const BINANCE_URL = "https://accounts.binance.com/register?ref=453580362";
const SELECT_MANAGEMENT_FEE = 0.7;
const SELECT_REFERENCE_RATE = 14;
const SELECT_PERFORMANCE_RATE = 30;

type Copy = {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    text: string;
    primary: string;
    secondary: string;
    cards: [string, string, string][];
  };
  comparison: {
    title: string;
    text: string[];
    eliteTitle: string;
    eliteSubtitle: string;
    eliteMessage: string;
    selectTitle: string;
    selectSubtitle: string;
    selectMessage: string;
    eliteSteps: string[];
    selectSteps: string[];
  };
  operations: {
    title: string;
    subtitle: string;
    steps: [string, string, string][];
  };
  architecture: {
    title: string;
    subtitle: string;
    layers: { layer: string; title: string; items: string[]; tone: string; border: string; glow: string }[];
  };
  global: {
    title: string;
    text: string;
    regions: { label: string; focus: string[]; position: string; labelPosition: string }[];
  };
  markets: {
    title: string;
    cards: [string, string[]][];
  };
  profile: {
    title: string;
    subtitle: string;
    cards: string[];
  };
  simulator: {
    title: string;
    invested: string;
    returnLabel: string;
    years: string;
    managementFee: string;
    referenceRate: string;
    performanceRate: string;
    initial: string;
    grossResult: string;
    reference: string;
    excess: string;
    management: string;
    performance: string;
    netResult: string;
    final: string;
    netReturn: string;
    chartTitle: string;
    grossBar: string;
    netBar: string;
    minimumAlert: string;
    disclaimer: string;
  };
  automatic: {
    title: string;
    cards: string[];
  };
  cta: {
    title: string;
    text: string;
    disclaimer: string;
  };
};

const ptCopy: Copy = {
  hero: {
    tag: "Estratégia patrimonial global",
    title: "Varejo Investidor Select",
    subtitle:
      "Estrutura operacional para investidores que desejam exposição aos mercados globais sem acompanhar operações diariamente.",
    text:
      "Enquanto o Canal Elite foi criado para quem prefere executar operações manualmente, o Varejo Investidor Select foi desenvolvido para investidores que desejam uma estrutura operacional automatizada, com acompanhamento profissional e acesso aos mercados globais.",
    primary: "Solicitar apresentação",
    secondary: "Agendar conversa",
    cards: [
      ["Aplicação mínima", "R$ 250.000", "Cliente Brasil"],
      ["Investidor internacional", "US$ 50.000", "Valor arredondado"],
      ["Taxa de gestão", "0,70% ao ano", "Acompanhamento contínuo"],
      ["Participação sobre lucro excedente", "30%", "Apenas acima de 14% ao ano"],
    ],
  },
  comparison: {
    title: "Você não precisa copiar sinais",
    text: [
      "No Canal Elite o investidor recebe sinais e executa as operações manualmente.",
      "No Select a estrutura é diferente. O cliente mantém a conta em seu nome enquanto a execução das operações acontece automaticamente através da conexão operacional da conta.",
      "Ideal para investidores que desejam participar dos mercados globais sem transformar o mercado financeiro em uma segunda profissão.",
    ],
    eliteTitle: "Canal Elite",
    eliteSubtitle: "Você executa as operações",
    eliteMessage: "Controle total da execução. Exige acompanhamento diário.",
    selectTitle: "Varejo Investidor Select",
    selectSubtitle: "A operação acontece automaticamente",
    selectMessage: "Ideal para quem não possui tempo operacional.",
    eliteSteps: ["Recebe sinal", "Analisa", "Executa", "Monitora", "Encerra", "Acompanha resultado"],
    selectSteps: ["Capital aplicado", "Conta vinculada", "Cópia automática", "Equipe acompanha", "Relatórios periódicos", "Acompanhamento patrimonial"],
  },
  operations: {
    title: "Como funciona a estrutura operacional",
    subtitle:
      "Sua conta permanece em seu nome. Você acompanha os resultados sem precisar executar operações manualmente.",
    steps: [
      ["Etapa 1", "Abertura de conta", "Conta criada na corretora parceira."],
      ["Etapa 2", "Depósito", "Transferência dos recursos."],
      ["Etapa 3", "Vinculação", "Conta conectada à estrutura operacional."],
      ["Etapa 4", "Cópia automática", "As operações passam a ser replicadas automaticamente."],
      ["Etapa 5", "Monitoramento", "Equipe acompanha operações e gestão de risco."],
      ["Etapa 6", "Relatórios", "Acompanhamento patrimonial e operacional."],
    ],
  },
  architecture: {
    title: "Como o patrimônio é distribuído",
    subtitle: "A estrutura não depende de um único ativo ou mercado. Ela é construída em múltiplas camadas.",
    layers: [
      {
        layer: "Camada 1",
        title: "Proteção",
        items: ["Controle de risco", "Caixa estratégico", "Proteção cambial", "Preservação patrimonial"],
        tone: "from-emerald-950/80 via-emerald-900/28 to-paper/[0.035]",
        border: "border-emerald-500/35",
        glow: "shadow-[inset_0_0_45px_rgba(0,194,110,0.08),0_0_30px_rgba(0,194,110,0.06)]",
      },
      {
        layer: "Camada 2",
        title: "Renda",
        items: ["Estruturas geradoras de fluxo", "Previsibilidade", "Estabilidade"],
        tone: "from-cyan-950/75 via-sky-950/28 to-paper/[0.035]",
        border: "border-cyan-500/30",
        glow: "shadow-[inset_0_0_45px_rgba(22,119,170,0.10),0_0_30px_rgba(22,119,170,0.06)]",
      },
      {
        layer: "Camada 3",
        title: "Crescimento",
        items: ["Ações", "ETFs", "Índices globais", "Expansão patrimonial"],
        tone: "from-gold/18 via-gold/[0.075] to-paper/[0.035]",
        border: "border-gold/45",
        glow: "shadow-[inset_0_0_45px_rgba(201,155,62,0.12),0_0_34px_rgba(201,155,62,0.08)]",
      },
      {
        layer: "Camada 4",
        title: "Oportunidade",
        items: ["Forex", "Criptomoedas", "Posicionamentos táticos", "Movimentos globais"],
        tone: "from-orange-950/85 via-orange-900/25 to-paper/[0.035]",
        border: "border-orange-500/35",
        glow: "shadow-[inset_0_0_45px_rgba(194,91,28,0.10),0_0_30px_rgba(194,91,28,0.06)]",
      },
    ],
  },
  global: {
    title: "Uma carteira construída em múltiplas economias",
    text:
      "O patrimônio não fica dependente de uma única economia, moeda ou região. A estrutura busca oportunidades globais através de diferentes mercados e ciclos econômicos.",
    regions: [
      { label: "Estados Unidos", focus: ["Tecnologia", "Índices", "Ações globais"], position: "left-[21%] top-[38%]", labelPosition: "left-[7%] top-[17%]" },
      { label: "Reino Unido", focus: ["Moedas", "Mercados"], position: "left-[46%] top-[31%]", labelPosition: "left-[38%] top-[10%]" },
      { label: "Europa", focus: ["Diversificação setorial"], position: "left-[51%] top-[36%]", labelPosition: "left-[54%] top-[17%]" },
      { label: "Japão", focus: ["Exposição internacional"], position: "left-[79%] top-[43%]", labelPosition: "right-[3%] top-[24%]" },
      { label: "Singapura", focus: ["Hub financeiro asiático"], position: "left-[71%] top-[61%]", labelPosition: "right-[5%] bottom-[15%]" },
      { label: "América Latina", focus: ["Oportunidades regionais"], position: "left-[31%] top-[67%]", labelPosition: "left-[12%] bottom-[12%]" },
    ],
  },
  markets: {
    title: "Mercados utilizados na estrutura",
    cards: [
      ["Forex Global", ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "USD/CHF", "NZD/USD"]],
      ["Ações", ["Apple", "Microsoft", "Google", "Amazon", "Nvidia", "Meta", "Tesla"]],
      ["Criptomoedas", ["Bitcoin", "Ethereum", "Solana", "XRP"]],
    ],
  },
  profile: {
    title: "Para quem o Select foi criado",
    subtitle:
      "Uma estrutura para investidores que já possuem patrimônio relevante, mas não querem transformar o mercado financeiro em uma segunda profissão.",
    cards: [
      "Patrimônio acima de R$ 250 mil",
      "Empresários com pouco tempo operacional",
      "Executivos e profissionais liberais",
      "Investidores internacionais",
      "Famílias em construção patrimonial",
      "Investidores que desejam exposição global",
      "Pessoas que querem automatizar a execução",
      "Quem busca acompanhamento profissional",
    ],
  },
  simulator: {
    title: "Simulador de Estrutura Patrimonial",
    invested: "Patrimônio investido",
    returnLabel: "Rentabilidade anual estimada",
    years: "Prazo em anos",
    managementFee: "Taxa de gestão anual",
    referenceRate: "Faixa de rentabilidade sem cobrança de performance",
    performanceRate: "Participação sobre o lucro excedente",
    initial: "Patrimônio inicial",
    grossResult: "Resultado bruto",
    reference: "Faixa sem performance",
    excess: "Lucro excedente sujeito à performance",
    management: "Taxa de gestão estimada",
    performance: "Participação estimada sobre excedente",
    netResult: "Resultado líquido estimado",
    final: "Patrimônio final estimado",
    netReturn: "Rentabilidade líquida estimada",
    chartTitle: "Evolução patrimonial no período",
    grossBar: "Resultado bruto",
    netBar: "Resultado líquido",
    minimumAlert: "Aplicação mínima do Select: R$ 250.000.",
    disclaimer: "Simulação educacional. Não representa promessa ou garantia de rentabilidade futura.",
  },
  automatic: {
    title: "O mercado continua trabalhando mesmo quando você não está acompanhando",
    cards: [
      "Conta em seu nome",
      "Capital sob seu controle",
      "Cópia automática",
      "Acompanhamento profissional",
      "Relatórios periódicos",
      "Exposição global",
      "Gestão de risco",
      "Diversificação internacional",
    ],
  },
  cta: {
    title: "Construa uma estrutura global para seu patrimônio",
    text: "Conheça os detalhes do Varejo Investidor Select e avalie se a estrutura faz sentido para o seu perfil patrimonial.",
    disclaimer:
      "O Select não é fundo de investimento, não é produto educacional e não representa promessa de resultado. A estrutura depende de elegibilidade, documentação, corretora, riscos de mercado e condições operacionais.",
  },
};

const enCopy: Copy = {
  ...ptCopy,
  hero: {
    tag: "Global wealth strategy",
    title: "Varejo Investidor Select",
    subtitle: "Operational structure for investors who want exposure to global markets without monitoring trades every day.",
    text:
      "While the Elite Channel was created for investors who prefer to execute trades manually, Varejo Investidor Select was designed for qualified investors who want an automated operational structure, professional monitoring, and access to global markets.",
    primary: "Request presentation",
    secondary: "Schedule a call",
    cards: [
      ["Minimum investment", "US$ 50,000", "International reference"],
      ["Brazilian investor", "R$ 250,000", "Local reference"],
      ["Management fee", "0.70% yearly", "Ongoing monitoring"],
      ["Performance fee", "30%", "Only above 14% yearly"],
    ],
  },
  comparison: {
    ...ptCopy.comparison,
    title: "You do not need to copy signals",
    text: [
      "In the Elite Channel, investors receive signals and execute trades manually.",
      "In Select, the structure is different. The client keeps the account under their own name while trades are replicated automatically through the operational connection.",
      "Ideal for investors who want to participate in global markets without turning trading into a second profession.",
    ],
    eliteSubtitle: "You execute the trades",
    selectSubtitle: "The operation happens automatically",
    eliteMessage: "Full execution control. Requires daily monitoring.",
    selectMessage: "Designed for investors without operational time.",
    eliteSteps: ["Receive signal", "Analyze", "Execute", "Monitor", "Close", "Track result"],
    selectSteps: ["Capital allocated", "Account linked", "Automatic copy", "Team monitors", "Periodic reports", "Wealth tracking"],
  },
  operations: {
    title: "How the operational structure works",
    subtitle: "Your account remains under your name. You track results without executing trades manually.",
    steps: [
      ["Step 1", "Account opening", "Account created with the partner broker."],
      ["Step 2", "Deposit", "Transfer of funds."],
      ["Step 3", "Linking", "Account connected to the operational structure."],
      ["Step 4", "Automatic copy", "Trades start being replicated automatically."],
      ["Step 5", "Monitoring", "The team monitors operations and risk management."],
      ["Step 6", "Reports", "Operational and wealth tracking."],
    ],
  },
  architecture: {
    ...ptCopy.architecture,
    title: "How wealth is distributed",
    subtitle: "The structure does not depend on a single asset or market. It is built in multiple layers.",
  },
  global: {
    ...ptCopy.global,
    title: "A portfolio built across multiple economies",
    text:
      "Wealth should not depend on a single economy, currency, or region. The structure seeks global opportunities across different markets and economic cycles.",
  },
  markets: {
    title: "Markets used in the structure",
    cards: [
      ["Global Forex", ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CAD", "USD/CHF", "NZD/USD"]],
      ["Stocks", ["Apple", "Microsoft", "Google", "Amazon", "Nvidia", "Meta", "Tesla"]],
      ["Crypto assets", ["Bitcoin", "Ethereum", "Solana", "XRP"]],
    ],
  },
  profile: {
    title: "Who Select was created for",
    subtitle:
      "A structure for investors who already have relevant wealth but do not want to turn financial markets into a second profession.",
    cards: [
      "Wealth above R$ 250,000",
      "Business owners with limited operational time",
      "Executives and independent professionals",
      "International investors",
      "Families building wealth",
      "Investors seeking global exposure",
      "People who want automated execution",
      "Those seeking professional monitoring",
    ],
  },
  simulator: {
    title: "Wealth Structure Simulator",
    invested: "Invested wealth",
    returnLabel: "Estimated annual return",
    years: "Term in years",
    managementFee: "Annual management fee",
    referenceRate: "Reference level",
    performanceRate: "Performance fee",
    initial: "Initial wealth",
    grossResult: "Gross result",
    reference: "Result above 14%",
    excess: "Excess above 14%",
    management: "Estimated management fee",
    performance: "Estimated performance fee",
    netResult: "Estimated net result",
    final: "Estimated final wealth",
    netReturn: "Estimated net return",
    chartTitle: "Wealth evolution over the period",
    grossBar: "Gross result",
    netBar: "Net result",
    minimumAlert: "Select minimum investment: R$ 250,000.",
    disclaimer: "Educational simulation. It does not represent a promise or guarantee of future returns.",
  },
  automatic: {
    title: "The market keeps working even when you are not watching",
    cards: [
      "Account under your name",
      "Capital under your control",
      "Automatic copy",
      "Professional monitoring",
      "Periodic reports",
      "Global exposure",
      "Risk management",
      "International diversification",
    ],
  },
  cta: {
    title: "Build a global structure for your wealth",
    text: "Learn the details of Varejo Investidor Select and evaluate whether the structure fits your wealth profile.",
    disclaimer:
      "Select is not an investment fund, is not an educational product, and does not represent a promise of results. The structure depends on eligibility, documentation, broker availability, market risks, and operational conditions.",
  },
};

const localizedCopy: Partial<Record<string, Copy>> = {
  pt: ptCopy,
  en: enCopy,
  es: {
    ...enCopy,
    hero: {
      ...enCopy.hero,
      tag: "Estrategia patrimonial global",
      subtitle: "Estructura operativa para inversores que desean exposición a mercados globales sin seguir operaciones diariamente.",
      primary: "Solicitar presentación",
      secondary: "Agendar conversación",
    },
  },
  fr: {
    ...enCopy,
    hero: {
      ...enCopy.hero,
      tag: "Stratégie patrimoniale globale",
      subtitle: "Structure opérationnelle pour investisseurs souhaitant une exposition aux marchés mondiaux sans suivre les opérations chaque jour.",
      primary: "Demander une présentation",
      secondary: "Planifier un appel",
    },
  },
};

const rtlLocales = new Set(["ar", "ur", "fa"]);

function getCopy(locale: string): Copy {
  return localizedCopy[locale] ?? enCopy;
}

function formatMoney(value: number, currency: "BRL" | "USD") {
  return new Intl.NumberFormat(currency === "BRL" ? "pt-BR" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      className="max-w-4xl"
    >
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{eyebrow}</p> : null}
      <h2 className="mt-4 font-serif text-4xl leading-[1] tracking-[-0.045em] text-paper md:text-6xl">{title}</h2>
      {text ? <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68] md:text-lg">{text}</p> : null}
    </motion.div>
  );
}

function PremiumCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
      className={`relative overflow-hidden border border-gold/[0.18] bg-paper/[0.035] p-5 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.44] hover:bg-paper/[0.055] md:p-6 ${className}`}
    >
      <div className="absolute inset-0 terminal-grid opacity-5" />
      <div className="relative">{children}</div>
    </motion.article>
  );
}

function WorldMapPanel({ copy }: { copy: Copy["global"] }) {
  return (
    <div className="relative min-h-[560px] overflow-hidden border border-gold/[0.24] bg-gradient-to-br from-[#050505] via-[#080807] to-[#020202] p-5 text-paper shadow-[0_0_55px_rgba(201,155,62,0.10)] md:p-7">
      <div className="absolute inset-0 terminal-grid opacity-8" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_45%,rgba(201,155,62,0.16),transparent_55%)]" />
      <svg viewBox="0 0 1000 520" aria-label="Mapa mundi de exposição global" className="absolute inset-x-0 top-8 mx-auto h-[390px] w-[98%] opacity-100 drop-shadow-[0_18px_34px_rgba(0,0,0,0.6)]" role="img">
        <defs>
          <linearGradient id="selectMapLand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(201,155,62,0.36)" />
            <stop offset="45%" stopColor="rgba(70,70,64,0.42)" />
            <stop offset="100%" stopColor="rgba(12,12,12,0.88)" />
          </linearGradient>
          <filter id="selectMapGlow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g transform="translate(8 10)" opacity="0.45">
          <path d="M88 168 128 129 189 118 241 150 227 207 259 253 221 315 155 292 114 237Z" fill="rgba(0,0,0,0.75)" />
          <path d="M253 318 308 329 329 397 307 479 263 446 238 376Z" fill="rgba(0,0,0,0.75)" />
          <path d="M430 126 484 105 532 130 514 179 458 175Z" fill="rgba(0,0,0,0.75)" />
          <path d="M476 196 545 185 614 231 607 315 548 340 488 298Z" fill="rgba(0,0,0,0.75)" />
          <path d="M608 133 735 138 826 196 812 279 724 290 642 236Z" fill="rgba(0,0,0,0.75)" />
          <path d="M799 324 857 344 884 402 842 441 789 409Z" fill="rgba(0,0,0,0.75)" />
        </g>
        <path d="M88 168 128 129 189 118 241 150 227 207 259 253 221 315 155 292 114 237Z" fill="url(#selectMapLand)" stroke="rgba(201,155,62,0.26)" strokeWidth="1" />
        <path d="M253 318 308 329 329 397 307 479 263 446 238 376Z" fill="url(#selectMapLand)" stroke="rgba(201,155,62,0.26)" strokeWidth="1" />
        <path d="M430 126 484 105 532 130 514 179 458 175Z" fill="url(#selectMapLand)" stroke="rgba(201,155,62,0.26)" strokeWidth="1" />
        <path d="M476 196 545 185 614 231 607 315 548 340 488 298Z" fill="url(#selectMapLand)" stroke="rgba(201,155,62,0.26)" strokeWidth="1" />
        <path d="M608 133 735 138 826 196 812 279 724 290 642 236Z" fill="url(#selectMapLand)" stroke="rgba(201,155,62,0.26)" strokeWidth="1" />
        <path d="M799 324 857 344 884 402 842 441 789 409Z" fill="url(#selectMapLand)" stroke="rgba(201,155,62,0.26)" strokeWidth="1" />
        <path d="M164 207 C260 128 383 121 474 148 C570 177 671 198 800 222" fill="none" stroke="rgba(201,155,62,0.48)" strokeWidth="1.8" />
        <path d="M479 156 C559 213 619 260 724 319" fill="none" stroke="rgba(201,155,62,0.38)" strokeWidth="1.8" />
        <path d="M506 182 C413 252 338 322 286 382" fill="none" stroke="rgba(201,155,62,0.34)" strokeWidth="1.8" />
        {[
          [210, 198],
          [460, 160],
          [508, 186],
          [794, 224],
          [716, 318],
          [305, 386],
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`} filter="url(#selectMapGlow)">
            <circle cx={cx} cy={cy} r="12" fill="rgba(201,155,62,0.18)" />
            <circle cx={cx} cy={cy} r="4" fill="#c99b3e" />
          </g>
        ))}
      </svg>
      {copy.regions.map((region) => (
        <article key={region.label} className={`absolute ${region.labelPosition} max-w-[210px] border border-gold/[0.18] bg-ink/80 p-3 shadow-[0_0_28px_rgba(201,155,62,0.08)] backdrop-blur`}>
          <h3 className="text-xs font-black uppercase tracking-[0.14em] text-gold">{region.label}</h3>
          <div className="mt-2 flex flex-wrap gap-1">
            {region.focus.map((item) => (
              <span key={item} className="text-[10px] font-bold uppercase tracking-[0.12em] text-paper/[0.62]">{item}</span>
            ))}
          </div>
        </article>
      ))}
      {copy.regions.map((region) => (
        <span key={`${region.label}-node`} className={`absolute ${region.position} h-3 w-3 rounded-full bg-gold shadow-[0_0_28px_rgba(201,155,62,0.75)]`} />
      ))}
    </div>
  );
}

export default function SelectPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = getCopy(locale);
  const isBrazilian = locale === "pt";
  const currency = "BRL";
  const minimumCapital = 250000;
  const [capital, setCapital] = useState(250000);
  const [annualReturn, setAnnualReturn] = useState(20);
  const [years, setYears] = useState(1);

  const simulation = useMemo(() => {
    const safeCapital = Math.max(capital, 0);
    const safeYears = Math.max(1, years);
    const grossFinal = safeCapital * Math.pow(1 + annualReturn / 100, safeYears);
    const referenceFinal = safeCapital * Math.pow(1 + SELECT_REFERENCE_RATE / 100, safeYears);
    const grossResult = grossFinal - safeCapital;
    const reference = Math.max(0, referenceFinal - safeCapital);
    const excess = Math.max(0, grossResult - reference);
    const management = safeCapital * (SELECT_MANAGEMENT_FEE / 100) * safeYears;
    const performance = excess * (SELECT_PERFORMANCE_RATE / 100);
    const netResult = grossResult - management - performance;
    const final = safeCapital + netResult;
    const netReturn = safeCapital > 0 ? (netResult / safeCapital) * 100 : 0;
    const evolution = Array.from({ length: safeYears + 1 }, (_, index) => {
      const gross = safeCapital * Math.pow(1 + annualReturn / 100, index);
      const referenceValue = safeCapital * Math.pow(1 + SELECT_REFERENCE_RATE / 100, index);
      const periodGrossResult = gross - safeCapital;
      const periodReference = referenceValue - safeCapital;
      const periodExcess = Math.max(0, periodGrossResult - periodReference);
      const periodManagement = safeCapital * (SELECT_MANAGEMENT_FEE / 100) * index;
      const periodPerformance = periodExcess * (SELECT_PERFORMANCE_RATE / 100);
      const net = safeCapital + periodGrossResult - periodManagement - periodPerformance;
      return { year: index, gross, net, reference: referenceValue };
    });
    return { grossResult, reference, excess, management, performance, netResult, final, netReturn, evolution };
  }, [annualReturn, capital, years]);
  const maxChartValue = Math.max(...simulation.evolution.map((point) => Math.max(point.gross, point.net, point.reference)), capital || 1);
  const grossBarWidth = Math.min(100, Math.max(0, (simulation.grossResult / Math.max(simulation.grossResult, simulation.netResult, 1)) * 100));
  const netBarWidth = Math.min(100, Math.max(0, (simulation.netResult / Math.max(simulation.grossResult, simulation.netResult, 1)) * 100));
  const feeThresholdPosition = (SELECT_REFERENCE_RATE / 40) * 100;
  const simulatorNotes = isBrazilian
    ? {
        fixedTitle: "Parâmetros fixos da estrutura Select",
        capitalHint: "Valor mínimo: R$ 250.000",
        returnHint: "Arraste para simular de 0% a 40% ao ano.",
        horizon: "Horizonte de tempo",
        belowThreshold: "Somente taxa de gestão",
        aboveThreshold: "Incide participação sobre o lucro excedente",
        waterfallTitle: "Leitura simples da simulação",
        remunerationTitle: "Como funciona a remuneração da estrutura?",
        remunerationText:
          "O Varejo Investidor Select possui duas cobranças. A primeira é uma taxa de gestão fixa de 0,70% ao ano, utilizada para acompanhamento operacional, monitoramento e suporte da estrutura. A segunda é uma participação de 30% sobre o lucro excedente, aplicada apenas sobre o resultado que ultrapassar a faixa de rentabilidade de 14% ao ano.",
        exampleOneTitle: "Se o patrimônio gerar 10% ao ano",
        exampleOneText: "Não existe cobrança de performance. O cliente paga apenas a taxa de gestão.",
        exampleTwoTitle: "Se o patrimônio gerar 20% ao ano",
        exampleTwoText: "Os primeiros 14% pertencem integralmente ao cliente. A participação incide apenas sobre os 6% excedentes.",
        exampleSimpleTitle: "Exemplo simplificado",
        referenceSimple: "Faixa sem performance",
      }
    : {
        fixedTitle: "Fixed Select structure parameters",
        capitalHint: "Minimum amount: R$ 250,000",
        returnHint: "Slide to simulate from 0% to 40% yearly.",
        horizon: "Time horizon",
        belowThreshold: "Management fee only",
        aboveThreshold: "Performance applies on excess profit",
        waterfallTitle: "Simple simulation reading",
        remunerationTitle: "How does the structure compensation work?",
        remunerationText:
          "Varejo Investidor Select has two charges. The first is a fixed 0.70% annual management fee for operational monitoring and support. The second is a 30% participation on excess profit, applied only to the result above the 14% annual reference range.",
        exampleOneTitle: "If wealth grows 10% per year",
        exampleOneText: "There is no performance charge. The client only pays the management fee.",
        exampleTwoTitle: "If wealth grows 20% per year",
        exampleTwoText: "The first 14% belongs fully to the client. The participation applies only to the 6% excess.",
        exampleSimpleTitle: "Simplified example",
        referenceSimple: "Range without performance",
      };
  const fixedParameters = [
    [copy.simulator.managementFee, formatPercent(SELECT_MANAGEMENT_FEE), isBrazilian ? "Acompanhamento e suporte" : "Monitoring and support"],
    [copy.simulator.referenceRate, formatPercent(SELECT_REFERENCE_RATE), isBrazilian ? "Sem performance até essa faixa" : "No performance up to this range"],
    [copy.simulator.performanceRate, formatPercent(SELECT_PERFORMANCE_RATE), isBrazilian ? "Sobre lucro excedente" : "On excess profit"],
  ];
  const quickCapitalOptions = [250000, 500000, 750000, 1000000, 5000000];
  const waterfallRows = [
    [copy.simulator.initial, formatMoney(capital, currency), "●"],
    [copy.simulator.returnLabel, formatPercent(annualReturn), "↗"],
    [copy.simulator.grossResult, formatMoney(simulation.grossResult, currency), "+"],
    [copy.simulator.referenceRate, formatPercent(SELECT_REFERENCE_RATE), "◇"],
    [copy.simulator.excess, formatMoney(simulation.excess, currency), "◆"],
    [copy.simulator.performanceRate, formatMoney(simulation.performance, currency), "-"],
    [copy.simulator.managementFee, formatMoney(simulation.management, currency), "-"],
  ];
  const brokerCopy = isBrazilian
    ? {
        eyebrow: "Corretoras utilizadas na estrutura",
        title: "A conta continua em seu nome.",
        text: "O cliente pode abrir conta nas corretoras parceiras e vincular essa conta à estrutura operacional do Select, mantendo acesso, titularidade e acompanhamento dos movimentos.",
        forexTitle: "FXPro",
        forexText: "Forex, ouro, petróleo, índices e moedas globais com acesso internacional.",
        cryptoTitle: "Binance",
        cryptoText: "Criptoativos com acesso global para acompanhamento e diversificação digital.",
        fxproButton: "Abrir conta FXPro",
        binanceButton: "Abrir conta Binance",
        notice: "O Select utiliza corretoras parceiras para execução operacional. A disponibilidade pode variar conforme país, perfil e regras da corretora.",
      }
    : {
        eyebrow: "Brokers used in the structure",
        title: "The account remains in your name.",
        text: "The client may open accounts with partner brokers and link the account to the Select operational structure while keeping access, ownership, and visibility over movements.",
        forexTitle: "FXPro",
        forexText: "Forex, gold, oil, indices, and global currencies with international access.",
        cryptoTitle: "Binance",
        cryptoText: "Crypto assets with global access for monitoring and digital diversification.",
        fxproButton: fxproButtonLabels[locale],
        binanceButton: "Open Binance Account",
        notice: "Select uses partner brokers for operational execution. Availability may vary according to country, profile, and broker rules.",
      };

  return (
    <main lang={isBrazilian ? "pt-BR" : locale} dir={rtlLocales.has(locale) ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-ink text-paper">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="select-hero premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="absolute right-0 top-24 h-[520px] w-[520px] bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="visible" transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="max-w-6xl">
            <p className="inline-flex border border-gold/[0.36] bg-gold/[0.08] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-gold">{copy.hero.tag}</p>
            <h1 className="mt-6 max-w-5xl font-serif text-6xl leading-[0.94] tracking-[-0.06em] text-paper md:text-8xl">{copy.hero.title}</h1>
            <p className="mt-6 max-w-4xl font-serif text-3xl leading-[1.12] tracking-[-0.04em] text-gold md:text-5xl">{copy.hero.subtitle}</p>
            <p className="mt-7 max-w-4xl text-base leading-8 text-paper/[0.7] md:text-lg">{copy.hero.text}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={SELECT_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-1 hover:bg-[#d8ad52]">{copy.hero.primary}</a>
              <a href={SELECT_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-gold/[0.38] bg-paper/[0.035] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-paper transition hover:-translate-y-1 hover:border-gold">{copy.hero.secondary}</a>
            </div>
          </motion.div>
          <div className="mt-12 grid border border-gold/[0.22] bg-paper/[0.035] shadow-premium md:grid-cols-2 lg:grid-cols-4">
            {copy.hero.cards.map(([title, value, note]) => (
              <div key={title} className="border-b border-gold/[0.14] p-6 md:border-r lg:border-b-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">{title}</p>
                <p className="mt-5 font-serif text-4xl tracking-[-0.05em] text-paper md:text-5xl">{value}</p>
                <p className="mt-3 text-sm leading-6 text-paper/[0.56]">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.12] bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="absolute left-0 top-12 h-80 w-80 bg-sky-500/[0.08] blur-3xl" />
        <div className="absolute right-0 bottom-8 h-96 w-96 bg-gold/[0.10] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }} variants={fadeUp}>
            <h2 className="font-serif text-4xl leading-[1] tracking-[-0.045em] md:text-6xl">{copy.comparison.title}</h2>
            <div className="mt-6 grid gap-4 text-base leading-8 text-paper/[0.68] md:text-lg">
              {copy.comparison.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </motion.div>
          <div className="grid gap-5">
            {[
              { title: copy.comparison.eliteTitle, subtitle: copy.comparison.eliteSubtitle, message: copy.comparison.eliteMessage, steps: copy.comparison.eliteSteps, select: false },
              { title: copy.comparison.selectTitle, subtitle: copy.comparison.selectSubtitle, message: copy.comparison.selectMessage, steps: copy.comparison.selectSteps, select: true },
            ].map((card) => (
              <motion.article key={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`relative overflow-hidden border p-5 shadow-fine transition hover:-translate-y-1 md:p-6 ${card.select ? "border-gold/[0.48] bg-gradient-to-br from-gold/[0.16] via-paper/[0.055] to-ink text-paper shadow-[0_0_45px_rgba(201,155,62,0.14)]" : "border-sky-300/[0.22] bg-gradient-to-br from-sky-950/[0.78] via-[#07131f] to-ink text-paper shadow-[0_0_36px_rgba(28,92,140,0.12)]"}`}>
                <div className="absolute inset-0 terminal-grid opacity-5" />
                <div className="relative">
                  <p className={`text-xs font-black uppercase tracking-[0.22em] ${card.select ? "text-gold" : "text-sky-300"}`}>{card.subtitle}</p>
                  <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <h3 className="font-serif text-3xl tracking-[-0.05em] md:text-4xl">{card.title}</h3>
                    <p className="max-w-sm text-sm font-bold leading-6 text-paper/[0.68]">{card.message}</p>
                  </div>
                  <div className="mt-7 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
                    {card.steps.map((step, index) => (
                      <div key={step} className={`relative border p-3 text-center ${card.select ? "border-gold/[0.24] bg-gold/[0.06]" : "border-sky-300/[0.16] bg-white/[0.04]"}`}>
                        <p className="text-xs font-black uppercase tracking-[0.14em]">{step}</p>
                        {index < card.steps.length - 1 ? <p className={`mt-2 xl:absolute xl:-right-3 xl:top-1/2 xl:mt-0 xl:-translate-y-1/2 ${card.select ? "text-gold" : "text-sky-300"}`}>↓</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader title={copy.operations.title} text={copy.operations.subtitle} />
          <div className="relative mt-12 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <div className="absolute left-[8%] right-[8%] top-12 hidden h-px bg-gradient-to-r from-transparent via-gold/[0.45] to-transparent xl:block" />
            {copy.operations.steps.map(([step, title, text], index) => (
              <PremiumCard key={step} className="p-5">
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center border border-gold/[0.45] bg-ink font-mono text-sm font-black text-gold shadow-[0_0_24px_rgba(201,155,62,0.18)]">{index + 1}</div>
                <p className="mt-5 text-center font-mono text-xs font-black text-gold">{step}</p>
                <h3 className="mt-3 text-center text-sm font-black uppercase tracking-[0.14em] text-paper">{title}</h3>
                <p className="mt-4 text-center text-sm leading-7 text-paper/[0.58]">{text}</p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.1] bg-[#030303] px-5 py-16 md:px-8 md:py-24">
        <div className="absolute right-[12%] top-12 h-72 w-72 bg-gold/[0.055] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{brokerCopy.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1] tracking-[-0.045em] text-paper md:text-6xl">{brokerCopy.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.66] md:text-lg">{brokerCopy.text}</p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              {
                title: brokerCopy.forexTitle,
                tag: "Forex",
                text: brokerCopy.forexText,
                button: brokerCopy.fxproButton,
                href: fxproLinks[locale],
                symbol: "FX",
              },
              {
                title: brokerCopy.cryptoTitle,
                tag: "Crypto",
                text: brokerCopy.cryptoText,
                button: brokerCopy.binanceButton,
                href: BINANCE_URL,
                symbol: "₿",
              },
            ].map((broker) => (
              <motion.article
                key={broker.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                className="group relative min-h-[300px] overflow-hidden border border-gold/[0.18] bg-gradient-to-br from-paper/[0.06] via-paper/[0.025] to-gold/[0.045] p-6 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.42] hover:shadow-[0_0_34px_rgba(201,155,62,0.10)] md:p-8"
              >
                <div className="absolute right-6 top-6 h-24 w-24 bg-gold/[0.08] blur-3xl transition group-hover:bg-gold/[0.12]" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="border border-gold/[0.24] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-gold">{broker.tag}</span>
                    <span className="grid h-12 w-12 place-items-center border border-gold/[0.22] bg-ink font-mono text-sm font-black text-gold">{broker.symbol}</span>
                  </div>
                  <h3 className="mt-7 font-serif text-4xl leading-[1.02] tracking-[-0.05em] text-paper">{broker.title}</h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-paper/[0.66]">{broker.text}</p>
                  <a
                    href={broker.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-full items-center justify-center border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-[#d8ad52] md:w-fit"
                  >
                    {broker.button}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-6 border border-gold/[0.16] bg-paper/[0.035] px-5 py-4 text-sm font-semibold leading-7 text-paper/[0.6]">
            {brokerCopy.notice}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader title={copy.architecture.title} text={copy.architecture.subtitle} />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4">
            {copy.architecture.layers.map((item, index) => (
              <motion.article key={item.layer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className={`mx-auto w-full overflow-hidden border bg-gradient-to-br p-6 transition hover:-translate-y-1 ${item.tone} ${item.border} ${item.glow} ${index === 0 ? "max-w-[58rem]" : index === 1 ? "max-w-[50rem]" : index === 2 ? "max-w-[42rem]" : "max-w-[34rem]"}`}>
                <div className="absolute inset-0 terminal-grid opacity-5" />
                <div className="relative text-center">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">{item.layer}</p>
                  <h3 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-paper">{item.title}</h3>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {item.items.map((detail) => <span key={detail} className="border border-paper/[0.12] bg-ink/[0.28] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-paper/[0.72]">{detail}</span>)}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 py-16 text-ink md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }} variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Exposição global</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1] tracking-[-0.045em] md:text-6xl">{copy.global.title}</h2>
            <p className="mt-6 text-base leading-8 text-ink/[0.68] md:text-lg">{copy.global.text}</p>
          </motion.div>
          <WorldMapPanel copy={copy.global} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader title={copy.markets.title} />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.markets.cards.map(([title, items]) => (
              <PremiumCard key={title} className="min-h-[320px]">
                <h3 className="font-serif text-4xl tracking-[-0.05em] text-paper">{title}</h3>
                <div className="mt-6 grid gap-2">
                  {items.map((item) => <p key={item} className="border-l border-gold pl-4 text-sm font-black uppercase tracking-[0.14em] text-paper/[0.7]">{item}</p>)}
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.12] bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="absolute left-[10%] top-10 h-80 w-80 bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader title={copy.profile.title} text={copy.profile.subtitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {copy.profile.cards.map((item, index) => (
              <motion.article
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.035 }}
                variants={fadeUp}
                className="group relative min-h-[168px] overflow-hidden border border-gold/[0.18] bg-gradient-to-br from-paper/[0.07] via-paper/[0.025] to-gold/[0.055] p-5 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.48] hover:shadow-[0_0_34px_rgba(201,155,62,0.10)]"
              >
                <div className="absolute inset-0 terminal-grid opacity-5" />
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center border border-gold/[0.34] bg-ink font-mono text-sm font-black text-gold shadow-[0_0_18px_rgba(201,155,62,0.12)]">
                    ✓
                  </div>
                  <p className="mt-6 text-sm font-black uppercase leading-6 tracking-[0.12em] text-paper">{item}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-24">
        <div className="absolute inset-0 terminal-grid opacity-5" />
        <div className="absolute left-[18%] top-20 h-72 w-72 bg-sky-500/[0.07] blur-3xl" />
        <div className="absolute right-[8%] bottom-16 h-80 w-80 bg-gold/[0.09] blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeader title={copy.simulator.title} />
          <div className="mt-10 grid gap-8 xl:grid-cols-[0.42fr_0.58fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative overflow-hidden border border-gold/[0.26] bg-gradient-to-br from-paper/[0.08] via-paper/[0.035] to-gold/[0.06] p-6 shadow-premium">
              <div className="absolute inset-0 luxury-grid opacity-6" />
              <div className="relative">
                <div className="mb-7 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {fixedParameters.map(([label, value, note]) => (
                    <div key={label} className="border border-gold/[0.18] bg-ink/[0.38] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gold">{label}</p>
                      <p className="mt-3 font-serif text-3xl tracking-[-0.04em] text-paper">{value}</p>
                      <p className="mt-2 text-xs font-semibold leading-5 text-paper/[0.52]">{note}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-5 border-t border-gold/[0.16] pt-5 text-xs font-black uppercase tracking-[0.2em] text-paper/[0.5]">
                  {simulatorNotes.fixedTitle}
                </p>
              </div>
              <div className="relative grid gap-6">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">{copy.simulator.invested}</span>
                  <input value={capital} onChange={(event) => setCapital(Number(event.target.value) || 0)} type="number" min={minimumCapital} step={1000} className="mt-4 w-full border border-gold/[0.22] bg-ink px-4 py-4 font-mono text-lg text-paper outline-none transition focus:border-gold focus:shadow-[0_0_20px_rgba(201,155,62,0.12)]" />
                  <span className="mt-2 block text-xs font-semibold text-paper/[0.48]">{simulatorNotes.capitalHint}</span>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {quickCapitalOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCapital(option)}
                        className={`border px-3 py-3 text-[10px] font-black uppercase tracking-[0.12em] transition ${
                          capital === option
                            ? "border-gold bg-gold text-ink shadow-[0_0_18px_rgba(201,155,62,0.16)]"
                            : "border-gold/[0.22] bg-ink/[0.42] text-paper/[0.68] hover:border-gold hover:text-paper"
                        }`}
                      >
                        {formatMoney(option, currency)}
                      </button>
                    ))}
                  </div>
                </label>
                <label className="block">
                  <span className="flex items-center justify-between gap-4 text-xs font-black uppercase tracking-[0.2em] text-gold">
                    {copy.simulator.returnLabel}
                    <span className="font-mono text-sm text-paper">{formatPercent(annualReturn)}</span>
                  </span>
                  <input
                    value={annualReturn}
                    onChange={(event) => setAnnualReturn(Math.min(40, Math.max(0, Number(event.target.value) || 0)))}
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    className="mt-5 w-full accent-[#c99b3e]"
                  />
                  <span className="mt-2 block text-xs font-semibold text-paper/[0.48]">{simulatorNotes.returnHint}</span>
                </label>
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">{simulatorNotes.horizon}</span>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-2">
                    {[1, 3, 5, 10].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setYears(option)}
                        className={`border px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition ${
                          years === option
                            ? "border-gold bg-gold text-ink shadow-[0_0_20px_rgba(201,155,62,0.18)]"
                            : "border-gold/[0.22] bg-ink/[0.52] text-paper/[0.68] hover:border-gold hover:text-paper"
                        }`}
                      >
                        {option} {option === 1 ? "ano" : "anos"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {capital < minimumCapital ? (
                <p className="mt-6 border border-red-500/[0.35] bg-red-950/[0.24] px-4 py-3 text-sm font-bold leading-6 text-red-100">
                  {copy.simulator.minimumAlert}
                </p>
              ) : null}
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative overflow-hidden border border-gold/[0.2] bg-gradient-to-br from-paper/[0.06] via-paper/[0.025] to-sky-950/[0.22] p-6 shadow-premium">
              <div className="absolute inset-0 terminal-grid opacity-5" />
              <div className="relative">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="min-w-0 overflow-hidden border border-gold/[0.32] bg-gold/[0.08] p-6 shadow-[0_0_34px_rgba(201,155,62,0.10)] md:p-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gold">{copy.simulator.netResult}</p>
                    <motion.p key={`net-${simulation.netResult}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 break-words font-serif text-[clamp(2rem,3.8vw,3.55rem)] leading-[0.98] tracking-[-0.045em] text-paper">
                      {formatMoney(simulation.netResult, currency)}
                    </motion.p>
                    <p className="mt-3 text-sm font-bold text-paper/[0.56]">{copy.simulator.netReturn}: {formatPercent(simulation.netReturn)}</p>
                  </div>
                  <div className="min-w-0 overflow-hidden border border-gold bg-gradient-to-br from-gold/[0.18] to-paper/[0.055] p-6 shadow-[0_0_42px_rgba(201,155,62,0.14)] md:p-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-gold">{copy.simulator.final}</p>
                    <motion.p key={`final-${simulation.final}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 break-words font-serif text-[clamp(2rem,3.8vw,3.55rem)] leading-[0.98] tracking-[-0.045em] text-paper">
                      {formatMoney(simulation.final, currency)}
                    </motion.p>
                    <p className="mt-3 text-sm font-bold text-paper/[0.56]">{years} {years === 1 ? "ano" : "anos"} de horizonte</p>
                  </div>
                </div>

                <div className="mt-6 border border-gold/[0.16] bg-ink/[0.36] p-5">
                  <h3 className="text-xs font-black uppercase tracking-[0.22em] text-gold">{simulatorNotes.waterfallTitle}</h3>
                  <div className="mt-5 grid gap-3">
                    {waterfallRows.map(([label, value, icon], index) => (
                      <div key={label} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center border text-xs font-black ${index >= 5 ? "border-red-400/[0.28] text-red-200" : "border-gold/[0.28] text-gold"}`}>
                          {icon}
                        </span>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-paper/[0.6]">{label}</p>
                        <motion.p key={`${label}-${value}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-right font-mono text-sm font-black text-paper">
                          {value}
                        </motion.p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border border-gold/[0.14] bg-ink/[0.42] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xs font-black uppercase tracking-[0.22em] text-gold">{copy.simulator.referenceRate}</h3>
                    <span className="font-mono text-xs text-paper/[0.5]">0% / {formatPercent(SELECT_REFERENCE_RATE)} / 40%</span>
                  </div>
                  <div className="relative mt-7 h-5 overflow-hidden bg-paper/[0.08]">
                    <div className="absolute inset-y-0 left-0 bg-sky-500/[0.62]" style={{ width: `${feeThresholdPosition}%` }} />
                    <div className="absolute inset-y-0 right-0 bg-gold/[0.78]" style={{ left: `${feeThresholdPosition}%` }} />
                    <span className="absolute inset-y-[-8px] w-px bg-paper" style={{ left: `${feeThresholdPosition}%` }} />
                    <span className="absolute inset-y-[-5px] w-px bg-paper shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ left: `${(annualReturn / 40) * 100}%` }} />
                  </div>
                  <div className="mt-4 grid gap-3 text-xs font-bold uppercase tracking-[0.14em] text-paper/[0.56] md:grid-cols-2">
                    <p className="border border-sky-300/[0.16] bg-sky-950/[0.28] px-3 py-3 text-sky-100">{simulatorNotes.belowThreshold}</p>
                    <p className="border border-gold/[0.18] bg-gold/[0.07] px-3 py-3 text-gold">{simulatorNotes.aboveThreshold}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7 border border-gold/[0.14] bg-ink/[0.42] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xs font-black uppercase tracking-[0.22em] text-gold">{copy.simulator.chartTitle}</h3>
                  <span className="font-mono text-xs text-paper/[0.5]">{copy.simulator.referenceRate}: {formatPercent(SELECT_REFERENCE_RATE)}</span>
                </div>
                <div className="mt-6 flex h-48 items-end gap-2">
                  {simulation.evolution.map((point) => (
                    <div key={point.year} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-1">
                      <span className="block bg-gold/[0.65] shadow-[0_0_14px_rgba(201,155,62,0.20)]" style={{ height: `${Math.max(4, (point.net / maxChartValue) * 100)}%` }} />
                      <span className="text-center font-mono text-[9px] text-paper/[0.48]">{point.year}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-paper/[0.62]">
                      <span>{copy.simulator.grossBar}</span>
                      <span>{formatMoney(simulation.grossResult, currency)}</span>
                    </div>
                    <div className="mt-2 h-3 bg-paper/[0.08]">
                      <span className="block h-full bg-paper/[0.46]" style={{ width: `${grossBarWidth}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.16em] text-paper/[0.62]">
                      <span>{copy.simulator.netBar}</span>
                      <span>{formatMoney(simulation.netResult, currency)}</span>
                    </div>
                    <div className="mt-2 h-3 bg-paper/[0.08]">
                      <span className="block h-full bg-gold shadow-[0_0_16px_rgba(201,155,62,0.25)]" style={{ width: `${netBarWidth}%` }} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-7 border-t border-gold/[0.14] pt-5 text-xs leading-6 text-paper/[0.5]">{copy.simulator.disclaimer}</p>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 grid gap-6 border border-gold/[0.2] bg-paper/[0.04] p-6 shadow-premium lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{simulatorNotes.remunerationTitle}</p>
              <p className="mt-5 text-base leading-8 text-paper/[0.68]">{simulatorNotes.remunerationText}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-sky-300/[0.18] bg-sky-950/[0.26] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">{simulatorNotes.exampleOneTitle}</p>
                <p className="mt-4 text-sm font-semibold leading-7 text-paper/[0.68]">{simulatorNotes.exampleOneText}</p>
              </div>
              <div className="border border-gold/[0.24] bg-gold/[0.07] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">{simulatorNotes.exampleTwoTitle}</p>
                <p className="mt-4 text-sm font-semibold leading-7 text-paper/[0.68]">{simulatorNotes.exampleTwoText}</p>
              </div>
              <div className="border border-gold/[0.18] bg-ink/[0.4] p-5 md:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">{simulatorNotes.exampleSimpleTitle}</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    [copy.simulator.initial, formatMoney(250000, currency)],
                    [copy.simulator.returnLabel, "20%"],
                    [copy.simulator.grossResult, formatMoney(50000, currency)],
                    [simulatorNotes.referenceSimple, formatMoney(35000, currency)],
                    [copy.simulator.excess, formatMoney(15000, currency)],
                    [copy.simulator.performanceRate, formatMoney(4500, currency)],
                    [copy.simulator.netResult, formatMoney(43750, currency)],
                    [copy.simulator.final, formatMoney(293750, currency)],
                  ].map(([label, value]) => (
                    <div key={label} className="border border-paper/[0.08] bg-paper/[0.035] p-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.13em] text-paper/[0.42]">{label}</p>
                      <p className="mt-2 font-mono text-sm font-black text-paper">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-gold/[0.12] bg-paper px-5 py-16 text-ink md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-5xl font-serif text-4xl leading-[1] tracking-[-0.045em] md:text-6xl">{copy.automatic.title}</motion.h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.automatic.cards.map((item) => <article key={item} className="border border-ink/[0.1] bg-white p-5 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.5]"><p className="text-sm font-black uppercase tracking-[0.14em] text-ink"><span className="mr-3 text-gold">✓</span>{item}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl border border-gold/[0.28] bg-paper/[0.045] p-7 text-center shadow-premium md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-gold">Varejo Investidor Select</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1] tracking-[-0.045em] text-paper md:text-6xl">{copy.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-paper/[0.66]">{copy.cta.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={SELECT_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-1 hover:bg-[#d8ad52]">{copy.hero.primary}</a>
            <a href={SELECT_CONTACT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-gold/[0.38] bg-paper/[0.035] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-paper transition hover:-translate-y-1 hover:border-gold">{copy.hero.secondary}</a>
          </div>
          <p className="mx-auto mt-8 max-w-3xl border-t border-gold/[0.14] pt-6 text-xs leading-6 text-paper/[0.48]">{copy.cta.disclaimer}</p>
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
