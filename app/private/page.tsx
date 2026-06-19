"use client";

import { motion } from "framer-motion";
import {
  SiteChrome,
  SupportFooter,
  fadeUp,
  trackVarejoClick,
  useSiteLocale,
} from "../../src/components/SiteSections";

const PRIVATE_CONTACT_URL =
  "https://wa.me/5519983393147?text=Ol%C3%A1%2C%20quero%20solicitar%20uma%20an%C3%A1lise%20privada%20do%20Varejo%20Investidor%20Private.";
const PRIVATE_MEETING_URL =
  "https://wa.me/5519983393147?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20conversa%20institucional%20sobre%20o%20Varejo%20Investidor%20Private.";

type Tier = {
  name: string;
  range: string;
  management: string;
  performance: string;
  includes: string[];
};

type PrivateCopy = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    text: string;
    primary: string;
    secondary: string;
    cards: [string, string][];
  };
  notConsulting: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    cards: [string, string][];
  };
  audience: {
    title: string;
    text: string;
    cards: string[];
  };
  structure: {
    title: string;
    cards: [string, string][];
  };
  flow: {
    title: string;
    steps: [string, string][];
  };
  difference: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    cards: [string, string][];
  };
  institutions: {
    title: string;
    subtitle: string;
    text: string;
    brazil: string;
    global: string;
  };
  pillars: {
    title: string;
    subtitle: string;
    cards: [string, string][];
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    minimum: string;
    disclaimer: string;
  };
};

type PrivateLabels = {
  wealthManagement: string;
  wealth: string;
  managementFee: string;
  performance: string;
  step: string;
  clientControl: string;
  profile: string;
};

const ptCopy: PrivateCopy = {
  hero: {
    eyebrow: "CAMADA PATRIMONIAL GLOBAL",
    title: "Private Varejo Investidor",
    subtitle: "Não gerimos apenas investimentos. Organizamos patrimônio, estrutura e continuidade.",
    text: "Para clientes com patrimônio acima de US$ 1 milhão que buscam alocação global, leitura de mercado, controle patrimonial e acompanhamento direto sem precisar transferir seus recursos para fora da instituição em que confiam.",
    primary: "Solicitar análise Private",
    secondary: "Conhecer estrutura patrimonial",
    cards: [
      ["Patrimônio mínimo", "Acima de US$ 1 milhão"],
      ["Modelo", "Estrutura patrimonial global"],
      ["Foco", "Controle, proteção e continuidade"],
    ],
  },
  notConsulting: {
    title: "Gestão patrimonial global",
    subtitle: "Patrimônio relevante exige visão internacional, organização e continuidade.",
    paragraphs: [
      "O Private Varejo Investidor acompanha o patrimônio do cliente com visão internacional, combinando alocação em dólar, proteção cambial, leitura macroeconômica, diversificação entre classes de ativos e organização estratégica da carteira.",
      "A proposta não é parecer uma página de sinais, consultoria comum ou produto de varejo. O foco está em estrutura, controle, relatórios e acompanhamento patrimonial de longo prazo.",
    ],
    cards: [
      ["Alocação global em dólar", "Organização de exposição internacional e multimoeda."],
      ["Diversificação entre mercados", "Leitura de classes, regiões, moedas e instituições."],
      ["Proteção cambial", "Acompanhamento do impacto de moedas fortes sobre o patrimônio."],
      ["Leitura macroeconômica", "Interpretação de ciclos, juros, inflação e geopolítica."],
      ["Controle de risco", "Monitoramento de concentração, liquidez e vulnerabilidades."],
      ["Visão patrimonial de longo prazo", "Estrutura para preservação, crescimento e continuidade."],
    ],
  },
  audience: {
    title: "Critérios de entrada",
    text: "O Private Varejo Investidor é destinado a clientes com patrimônio relevante, visão de longo prazo e necessidade de uma estrutura mais próxima, estratégica e organizada.",
    cards: [
      "Patrimônio acima de US$ 1 milhão",
      "Interesse em alocação global",
      "Necessidade de acompanhamento direto",
      "Busca por relatórios e controle patrimonial",
      "Visão de preservação e crescimento de longo prazo",
    ],
  },
  structure: {
    title: "Estrutura Private",
    cards: [
      ["Patrimônio mínimo", "Acima de US$ 1 milhão"],
      ["Atendimento", "Direto e estratégico"],
      ["Relatórios", "Mensais"],
      ["Reuniões", "Periódicas"],
      ["Instituições", "Bancos, corretoras e custodiantes de confiança"],
      ["Foco", "Preservação, crescimento e continuidade patrimonial"],
    ],
  },
  flow: {
    title: "Como o Private funciona",
    steps: [
      ["Diagnóstico patrimonial", "Análise do perfil, patrimônio, objetivos, instituições utilizadas e exposição atual."],
      ["Arquitetura da carteira", "Definição da estratégia de alocação, liquidez, proteção, risco e crescimento."],
      ["Execução com controle do cliente", "A execução respeita a instituição escolhida pelo cliente, mantendo acesso, transparência e controle."],
      ["Acompanhamento contínuo", "Relatórios mensais, reuniões estratégicas e ajustes conforme mercado, cenário global e objetivos do cliente."],
    ],
  },
  difference: {
    title: "Controle do cliente",
    subtitle: "O patrimônio permanece sob controle do cliente.",
    paragraphs: [
      "O patrimônio permanece sob controle do cliente, dentro da instituição financeira escolhida. O Varejo Investidor atua na leitura estratégica, organização da carteira, acompanhamento e orientação de alocação, sem assumir custódia direta dos recursos.",
    ],
    cards: [
      ["Acesso e controle", "O cliente mantém acesso e controle da própria conta."],
      ["Instituições autorizadas", "A alocação pode ser feita em bancos, corretoras ou plataformas autorizadas."],
      ["Acompanhamento contínuo", "Relatórios, reuniões e leitura contínua de mercado."],
      ["Transparência", "A estrutura reduz a barreira de confiança e mantém clareza sobre cada decisão."],
    ],
  },
  institutions: {
    title: "Compatível com as maiores instituições financeiras",
    subtitle: "A estrutura Private respeita a instituição de confiança do cliente.",
    text: "A estrutura Private foi pensada para clientes que já possuem relacionamento com bancos, corretoras, custodiantes ou plataformas internacionais. A estratégia pode ser organizada respeitando a instituição de confiança do cliente.",
    brazil: "Brasil",
    global: "Mundo",
  },
  pillars: {
    title: "Relatórios e acompanhamento",
    subtitle: "O cliente Private recebe uma visão organizada da carteira, da exposição e das decisões patrimoniais ao longo do tempo.",
    cards: [
      ["Relatórios mensais", "Visão consolidada da carteira, evolução e posicionamento."],
      ["Controle de exposição", "Acompanhamento por ativos, moedas, regiões e instituições."],
      ["Controle de risco", "Monitoramento de concentração, liquidez e vulnerabilidades."],
      ["Diversificação global", "Organização de exposição internacional e multimoeda."],
      ["Monitoramento contínuo", "Acompanhamento recorrente da estrutura patrimonial."],
      ["Alocação multimoeda", "Distribuição estratégica entre moedas fortes e ativos globais."],
      ["Proteção patrimonial", "Preservação de capital com foco em ciclos longos."],
      ["Estratégia internacional", "Visão patrimonial além das fronteiras locais."],
    ],
  },
  cta: {
    eyebrow: "PRIVATE",
    title: "Estruture seu patrimônio em nível global",
    text: "Clientes Private precisam de mais do que produtos financeiros. Precisam de uma estrutura clara, acompanhamento direto e visão internacional para proteger, organizar e expandir patrimônio ao longo do tempo.",
    minimum: "Patrimônio mínimo: US$ 1.000.000",
    disclaimer: "Conteúdo institucional e educacional. Não representa recomendação individual, oferta pública ou promessa de rentabilidade.",
  },
};

const enCopy: PrivateCopy = {
  hero: {
    eyebrow: "GLOBAL WEALTH LAYER",
    title: "Private Varejo Investidor",
    subtitle: "We do not only manage investments. We organize wealth, structure, and continuity.",
    text: "For clients with wealth above US$ 1 million seeking global allocation, market reading, wealth control, and direct monitoring without needing to transfer resources away from the institution they trust.",
    primary: "Request Private analysis",
    secondary: "Explore the wealth structure",
    cards: [
      ["Minimum wealth", "Above US$ 1 million"],
      ["Model", "Global wealth structure"],
      ["Focus", "Control, protection, and continuity"],
    ],
  },
  notConsulting: {
    title: "Global wealth management",
    subtitle: "Relevant wealth requires international vision, organization, and continuity.",
    paragraphs: [
      "Private Varejo Investidor monitors the client's wealth with an international view, combining dollar allocation, currency protection, macroeconomic reading, diversification across asset classes, and strategic portfolio organization.",
      "This is not positioned as a signals page, common consulting service, or retail product. The focus is structure, control, reporting, and long-term wealth monitoring.",
    ],
    cards: [
      ["Global dollar allocation", "Organization of international and multi-currency exposure."],
      ["Diversification across markets", "Reading of asset classes, regions, currencies, and institutions."],
      ["Currency protection", "Monitoring the impact of strong currencies on wealth."],
      ["Macroeconomic reading", "Interpretation of cycles, rates, inflation, and geopolitics."],
      ["Risk control", "Monitoring concentration, liquidity, and vulnerabilities."],
      ["Long-term wealth vision", "Structure for preservation, growth, and continuity."],
    ],
  },
  audience: {
    title: "Entry criteria",
    text: "Private Varejo Investidor is designed for clients with relevant wealth, a long-term view, and the need for a closer, strategic, and organized structure.",
    cards: [
      "Wealth above US$ 1 million",
      "Interest in global allocation",
      "Need for direct monitoring",
      "Search for reports and wealth control",
      "Long-term preservation and growth vision",
    ],
  },
  structure: {
    title: "Private structure",
    cards: [
      ["Minimum wealth", "Above US$ 1 million"],
      ["Service", "Direct and strategic"],
      ["Reports", "Monthly"],
      ["Meetings", "Periodic"],
      ["Institutions", "Trusted banks, brokers, and custodians"],
      ["Focus", "Preservation, growth, and wealth continuity"],
    ],
  },
  flow: {
    title: "How Private works",
    steps: [
      ["Wealth diagnosis", "Analysis of profile, wealth, objectives, institutions used, and current exposure."],
      ["Portfolio architecture", "Definition of allocation, liquidity, protection, risk, and growth strategy."],
      ["Execution with client control", "Execution respects the institution chosen by the client, preserving access, transparency, and control."],
      ["Continuous monitoring", "Monthly reports, strategic meetings, and adjustments according to markets, global scenario, and client objectives."],
    ],
  },
  difference: {
    title: "Client control",
    subtitle: "The wealth remains under the client's control.",
    paragraphs: [
      "The wealth remains under the client's control, inside the chosen financial institution. Varejo Investidor works on strategic reading, portfolio organization, monitoring, and allocation guidance without taking direct custody of the resources.",
    ],
    cards: [
      ["Access and control", "The client keeps access and control of their own account."],
      ["Authorized institutions", "Allocation can be made through banks, brokers, or authorized platforms."],
      ["Continuous monitoring", "Reports, meetings, and continuous market reading."],
      ["Transparency", "The structure lowers the trust barrier and keeps clarity around each decision."],
    ],
  },
  institutions: {
    title: "Compatible with major financial institutions",
    subtitle: "The Private structure respects the client's trusted institution.",
    text: "The Private structure was designed for clients who already have relationships with banks, brokers, custodians, or international platforms. The strategy can be organized while respecting the client's trusted institution.",
    brazil: "Brazil",
    global: "Global",
  },
  pillars: {
    title: "Reports and monitoring",
    subtitle: "The Private client receives an organized view of the portfolio, exposure, and wealth decisions over time.",
    cards: [
      ["Monthly reports", "Consolidated view of portfolio, evolution, and positioning."],
      ["Exposure control", "Monitoring by assets, currencies, regions, and institutions."],
      ["Risk control", "Monitoring of concentration, liquidity, and vulnerabilities."],
      ["Global diversification", "Organization of international and multi-currency exposure."],
      ["Continuous monitoring", "Recurring oversight of the wealth structure."],
      ["Multi-currency allocation", "Strategic distribution across strong currencies and global assets."],
      ["Wealth protection", "Capital preservation focused on long cycles."],
      ["International strategy", "Wealth vision beyond local borders."],
    ],
  },
  cta: {
    eyebrow: "PRIVATE",
    title: "Structure your wealth at a global level",
    text: "Private clients need more than financial products. They need a clear structure, direct monitoring, and international vision to protect, organize, and expand wealth over time.",
    minimum: "Minimum wealth: US$ 1,000,000",
    disclaimer: "Institutional and educational content. It does not represent individual recommendation, public offering, or promise of returns.",
  },
};

const copyByLocale: Record<string, PrivateCopy> = {
  pt: ptCopy,
  en: enCopy,
  es: {
    ...enCopy,
    hero: {
      ...enCopy.hero,
      eyebrow: "CAPA PATRIMONIAL GLOBAL",
      title: "Private Varejo Investidor",
      subtitle: "No gestionamos solo inversiones. Organizamos patrimonio, estructura y continuidad.",
      text: "Para clientes con patrimonio superior a US$ 1 millón que buscan asignación global, lectura de mercado, control patrimonial y seguimiento directo sin transferir recursos fuera de la institución en la que confían.",
      primary: "Solicitar análisis Private",
      secondary: "Conocer la estructura patrimonial",
      cards: [
        ["Patrimonio mínimo", "Superior a US$ 1 millón"],
        ["Modelo", "Estructura patrimonial global"],
        ["Foco", "Control, protección y continuidad"],
      ],
    },
    notConsulting: {
      title: "Gestión patrimonial global",
      subtitle: "El patrimonio relevante exige visión internacional, organización y continuidad.",
      paragraphs: [
        "Private Varejo Investidor acompaña el patrimonio del cliente con visión internacional, combinando asignación en dólar, protección cambiaria, lectura macroeconómica, diversificación entre clases de activos y organización estratégica de la cartera.",
        "No se posiciona como una página de señales, una consultoría común o un producto minorista. El foco está en estructura, control, reportes y seguimiento patrimonial de largo plazo.",
      ],
      cards: [
        ["Asignación global en dólar", "Organización de exposición internacional y multimoneda."],
        ["Diversificación entre mercados", "Lectura de clases de activos, regiones, monedas e instituciones."],
        ["Protección cambiaria", "Seguimiento del impacto de monedas fuertes sobre el patrimonio."],
        ["Lectura macroeconómica", "Interpretación de ciclos, tasas, inflación y geopolítica."],
        ["Control de riesgo", "Monitoreo de concentración, liquidez y vulnerabilidades."],
        ["Visión patrimonial de largo plazo", "Estructura para preservación, crecimiento y continuidad."],
      ],
    },
    audience: {
      title: "Criterios de entrada",
      text: "Private Varejo Investidor está destinado a clientes con patrimonio relevante, visión de largo plazo y necesidad de una estructura más cercana, estratégica y organizada.",
      cards: [
        "Patrimonio superior a US$ 1 millón",
        "Interés en asignación global",
        "Necesidad de seguimiento directo",
        "Búsqueda de reportes y control patrimonial",
        "Visión de preservación y crecimiento de largo plazo",
      ],
    },
    structure: {
      title: "Estructura Private",
      cards: [
        ["Patrimonio mínimo", "Superior a US$ 1 millón"],
        ["Atención", "Directa y estratégica"],
        ["Reportes", "Mensuales"],
        ["Reuniones", "Periódicas"],
        ["Instituciones", "Bancos, corredoras y custodios de confianza"],
        ["Foco", "Preservación, crecimiento y continuidad patrimonial"],
      ],
    },
    flow: {
      title: "Cómo funciona Private",
      steps: [
        ["Diagnóstico patrimonial", "Análisis del perfil, patrimonio, objetivos, instituciones utilizadas y exposición actual."],
        ["Arquitectura de cartera", "Definición de estrategia de asignación, liquidez, protección, riesgo y crecimiento."],
        ["Ejecución con control del cliente", "La ejecución respeta la institución elegida por el cliente, manteniendo acceso, transparencia y control."],
        ["Seguimiento continuo", "Reportes mensuales, reuniones estratégicas y ajustes según mercado, escenario global y objetivos del cliente."],
      ],
    },
    difference: {
      title: "Control del cliente",
      subtitle: "El patrimonio permanece bajo control del cliente.",
      paragraphs: [
        "El patrimonio permanece bajo control del cliente, dentro de la institución financiera elegida. Varejo Investidor actúa en lectura estratégica, organización de cartera, seguimiento y orientación de asignación, sin asumir custodia directa de los recursos.",
      ],
      cards: [
        ["Acceso y control", "El cliente mantiene acceso y control de su propia cuenta."],
        ["Instituciones autorizadas", "La asignación puede realizarse en bancos, corredoras o plataformas autorizadas."],
        ["Seguimiento continuo", "Reportes, reuniones y lectura continua de mercado."],
        ["Transparencia", "La estructura reduce la barrera de confianza y mantiene claridad sobre cada decisión."],
      ],
    },
    institutions: {
      title: "Compatible con las mayores instituciones financieras",
      subtitle: "La estructura Private respeta la institución de confianza del cliente.",
      text: "La estructura Private fue pensada para clientes que ya tienen relación con bancos, corredoras, custodios o plataformas internacionales. La estrategia puede organizarse respetando la institución de confianza del cliente.",
      brazil: "Brasil",
      global: "Mundo",
    },
    pillars: {
      title: "Reportes y seguimiento",
      subtitle: "El cliente Private recibe una visión organizada de la cartera, la exposición y las decisiones patrimoniales a lo largo del tiempo.",
      cards: [
        ["Reportes mensuales", "Visión consolidada de cartera, evolución y posicionamiento."],
        ["Control de exposición", "Seguimiento por activos, monedas, regiones e instituciones."],
        ["Control de riesgo", "Monitoreo de concentración, liquidez y vulnerabilidades."],
        ["Diversificación global", "Organización de exposición internacional y multimoneda."],
        ["Monitoreo continuo", "Seguimiento recurrente de la estructura patrimonial."],
        ["Asignación multimoneda", "Distribución estratégica entre monedas fuertes y activos globales."],
        ["Protección patrimonial", "Preservación de capital con foco en ciclos largos."],
        ["Estrategia internacional", "Visión patrimonial más allá de las fronteras locales."],
      ],
    },
    cta: {
      eyebrow: "PRIVATE",
      title: "Estructure su patrimonio a nivel global",
      text: "Los clientes Private necesitan más que productos financieros. Necesitan una estructura clara, seguimiento directo y visión internacional para proteger, organizar y expandir patrimonio a lo largo del tiempo.",
      minimum: "Patrimonio mínimo: US$ 1.000.000",
      disclaimer: "Contenido institucional y educativo. No representa recomendación individual, oferta pública ni promesa de rentabilidad.",
    },
  },
};

const privateLocales = [
  "fr",
  "de",
  "it",
  "ar",
  "fa",
  "hi",
  "ur",
  "bn",
  "tr",
  "ru",
  "id",
  "vi",
  "th",
  "tl",
  "zh",
  "ja",
  "ko",
  "pl",
];

for (const locale of privateLocales) {
  copyByLocale[locale] = copyByLocale[locale] ?? enCopy;
}

const labelsByLocale: Record<string, PrivateLabels> = {
  pt: {
    wealthManagement: "Gestão patrimonial",
    wealth: "Patrimônio",
    managementFee: "Gestão",
    performance: "Performance",
    step: "Passo",
    clientControl: "Controle do cliente",
    profile: "Perfil",
  },
  en: {
    wealthManagement: "Wealth management",
    wealth: "Wealth",
    managementFee: "Management",
    performance: "Performance",
    step: "Step",
    clientControl: "Client control",
    profile: "Profile",
  },
  es: {
    wealthManagement: "Gestión patrimonial",
    wealth: "Patrimonio",
    managementFee: "Gestión",
    performance: "Performance",
    step: "Paso",
    clientControl: "Control del cliente",
    profile: "Perfil",
  },
};

const brazilInstitutions = [
  "Itaú Private",
  "BTG Pactual",
  "XP Private",
  "Bradesco",
  "Santander",
  "Safra",
  "Banco do Brasil",
];

const globalInstitutions = [
  "Morgan Stanley",
  "J.P. Morgan",
  "Goldman Sachs",
  "UBS",
  "Credit Suisse",
  "Interactive Brokers",
  "Charles Schwab",
  "Binance",
  "Nomad",
  "Avenue",
];

function usePrivateCopy(locale: string) {
  return copyByLocale[locale] ?? enCopy;
}

function usePrivateLabels(locale: string) {
  return labelsByLocale[locale] ?? labelsByLocale.en;
}

function AccentCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="relative overflow-hidden border border-gold/[0.18] bg-paper/[0.03] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.5] hover:shadow-premium">
      <span className="block h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(201,155,62,0.5)]" />
      <h3 className="mt-5 font-serif text-2xl leading-[1.05] tracking-[-0.035em] text-paper">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-paper/[0.68]">{text}</p>
    </article>
  );
}

function InstitutionLogoCard({ name }: { name: string }) {
  return (
    <div
      role="img"
      aria-label={name}
      className="group flex min-h-[76px] items-center justify-center border border-gold/[0.12] bg-paper/[0.025] px-4 py-5 text-center shadow-fine transition duration-300 hover:-translate-y-0.5 hover:border-gold/[0.45] hover:bg-gold/[0.06]"
    >
      <span className="text-sm font-black uppercase tracking-[0.18em] text-paper/[0.58] transition group-hover:text-gold">
        {name}
      </span>
    </div>
  );
}

export default function PrivatePage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = usePrivateCopy(locale);
  const labels = usePrivateLabels(locale);
  const isRtl = locale === "ar" || locale === "ur" || locale === "fa";

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-ink text-paper">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="relative overflow-hidden border-b border-gold/[0.14] bg-ink px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44 lg:px-12 xl:px-16">
        <div className="absolute right-[8%] top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.07] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.34em] text-gold">{copy.hero.eyebrow}</motion.p>
            <motion.h1 variants={fadeUp} className="mt-5 max-w-5xl text-balance font-serif text-[2.8rem] leading-[1.02] tracking-[-0.055em] md:text-[5.6rem]">
              {copy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-3xl font-serif text-2xl leading-[1.22] tracking-[-0.035em] text-gold md:text-4xl">
              {copy.hero.subtitle}
            </motion.p>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-paper/[0.68] md:text-lg">
              {copy.hero.text}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={PRIVATE_CONTACT_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("private_analysis_click", { locale })} className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
                {copy.hero.primary}
              </a>
              <a href={PRIVATE_MEETING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("private_meeting_click", { locale })} className="border border-paper/[0.2] bg-paper/[0.04] px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-paper transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                {copy.hero.secondary}
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid gap-4">
            {copy.hero.cards.map(([label, value]) => (
              <article key={label} className="relative overflow-hidden border border-gold/[0.24] bg-paper/[0.045] p-6 shadow-fine">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-paper/[0.52]">{label}</p>
                <p className="mt-3 font-serif text-3xl leading-[1.02] tracking-[-0.04em] text-gold">{value}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{labels.wealthManagement}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.notConsulting.title}</h2>
            <p className="mt-5 font-serif text-2xl leading-[1.16] tracking-[-0.035em] text-gold">{copy.notConsulting.subtitle}</p>
          </div>
          <div className="grid gap-5 text-base leading-8 text-paper/[0.68] md:text-lg">
            {copy.notConsulting.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {copy.notConsulting.cards.map(([title, text]) => (
              <AccentCard key={title} title={title} text={text} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-b border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{labels.clientControl}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.difference.title}</h2>
            <p className="mt-5 font-serif text-2xl leading-[1.16] tracking-[-0.035em] text-gold">{copy.difference.subtitle}</p>
            <div className="mt-6 grid gap-4 text-base leading-8 text-paper/[0.68]">
              {copy.difference.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {copy.difference.cards.map(([title, text]) => (
              <AccentCard key={title} title={title} text={text} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-b border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{labels.clientControl}</p>
              <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.institutions.title}</h2>
            </div>
            <div>
              <p className="font-serif text-2xl leading-[1.18] tracking-[-0.035em] text-gold">{copy.institutions.subtitle}</p>
              <p className="mt-5 text-base leading-8 text-paper/[0.68]">{copy.institutions.text}</p>
            </div>
          </div>

          <div className="mt-12 grid gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-paper/[0.5]">{copy.institutions.brazil}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
                {brazilInstitutions.map((name) => (
                  <InstitutionLogoCard key={name} name={name} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-paper/[0.5]">{copy.institutions.global}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
                {globalInstitutions.map((name) => (
                  <InstitutionLogoCard key={name} name={name} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.flow.title}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {copy.flow.steps.map(([title, text], index) => (
              <article key={title} className="relative overflow-hidden border border-gold/[0.2] bg-paper/[0.04] p-5 shadow-fine">
                <div className="absolute inset-x-0 top-0 h-1 bg-gold/[0.7]" />
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold">{labels.step} {index + 1}</p>
                <h3 className="mt-5 font-serif text-2xl leading-[1.05] tracking-[-0.035em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-paper/[0.64]">{text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="max-w-4xl font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.pillars.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68] md:text-lg">{copy.pillars.subtitle}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.pillars.cards.map(([title, text]) => (
              <AccentCard key={title} title={title} text={text} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.structure.title}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.structure.cards.map(([title, text]) => (
              <AccentCard key={title} title={title} text={text} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.audience.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68] md:text-lg">{copy.audience.text}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.audience.cards.map((item) => (
              <article key={item} className="border border-gold/[0.16] bg-paper/[0.035] p-5 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.45]">
                <span className="block h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(201,155,62,0.5)]" />
                <p className="mt-5 font-serif text-2xl leading-[1.08] tracking-[-0.035em]">{item}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 text-center md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/[0.1] blur-3xl" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="relative mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{copy.cta.eyebrow}</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.cta.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-paper/[0.7] md:text-lg">{copy.cta.text}</p>
          <p className="mx-auto mt-6 w-fit border border-gold/[0.3] bg-paper/[0.04] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-gold">
            {copy.cta.minimum}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={PRIVATE_CONTACT_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("private_final_analysis_click", { locale })} className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
              {copy.hero.primary}
            </a>
            <a href={PRIVATE_MEETING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("private_final_meeting_click", { locale })} className="border border-paper/[0.2] bg-paper/[0.04] px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-paper transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">
              {copy.hero.secondary}
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-6 text-paper/[0.48]">{copy.cta.disclaimer}</p>
        </motion.div>
      </section>

      <SupportFooter locale={locale} t={t} onLocaleChange={changeLocale} />
    </main>
  );
}
