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
  };
  audience: {
    title: string;
    cards: string[];
  };
  structure: {
    title: string;
    tiers: Tier[];
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
  comparison: {
    title: string;
    tiers: [string, string, string][];
  };
  pillars: {
    title: string;
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
    title: "Varejo Investidor Private",
    subtitle: "Estrutura patrimonial global para investidores com patrimônio acima de US$ 1.000.000.",
    text: "Uma camada privada de acompanhamento patrimonial, alocação estratégica e monitoramento contínuo para investidores, empresários e famílias que desejam preservar, expandir e organizar patrimônio em escala internacional.",
    primary: "Solicitar análise privada",
    secondary: "Agendar conversa institucional",
    cards: [
      ["Patrimônio mínimo", "US$ 1.000.000"],
      ["Modelo", "Gestão patrimonial contínua"],
      ["Foco", "Proteção, crescimento e continuidade patrimonial"],
    ],
  },
  notConsulting: {
    title: "O Private não vende horas. Ele acompanha patrimônio.",
    subtitle: "Patrimônio relevante exige monitoramento contínuo.",
    paragraphs: [
      "O Private foi desenvolvido para investidores que já possuem patrimônio consolidado e não desejam gastar tempo acompanhando mercados, relatórios, riscos ou decisões operacionais diariamente.",
      "Enquanto o Select executa a estratégia de investimento, o Private acompanha toda a estrutura patrimonial.",
      "O foco está na preservação de capital, alocação estratégica, controle de risco e crescimento de longo prazo.",
    ],
  },
  audience: {
    title: "Para quem é",
    cards: [
      "Investidores acima de US$ 1.000.000",
      "Empresários com liquidez relevante",
      "Famílias em construção patrimonial",
      "Patrimônio em múltiplas moedas",
      "Investidores internacionais",
      "Clientes que buscam acompanhamento contínuo",
    ],
  },
  structure: {
    title: "Estrutura Private",
    tiers: [
      {
        name: "Private Core",
        range: "US$ 1.000.000 a US$ 3.000.000",
        management: "0,70% ao ano",
        performance: "30% acima de 15% ao ano",
        includes: [
          "Relatórios mensais",
          "Controle de risco patrimonial",
          "Acompanhamento patrimonial",
          "Alocação estratégica",
          "Monitoramento contínuo",
          "Atendimento prioritário",
        ],
      },
      {
        name: "Private Global",
        range: "US$ 3.000.000 a US$ 10.000.000",
        management: "0,60% ao ano",
        performance: "30% acima de 15% ao ano",
        includes: [
          "Tudo do Private Core",
          "Estratégia multimoeda",
          "Diversificação internacional",
          "Estruturação global",
          "Relatórios avançados",
          "Revisões estratégicas",
        ],
      },
      {
        name: "Private Family",
        range: "Acima de US$ 10.000.000",
        management: "0,50% ao ano",
        performance: "20% acima de 15% ao ano",
        includes: [
          "Tudo do Private Global",
          "Governança patrimonial",
          "Continuidade familiar",
          "Planejamento sucessório",
          "Estrutura internacional",
          "Atendimento dedicado",
        ],
      },
    ],
  },
  flow: {
    title: "Como o Private funciona",
    steps: [
      ["Diagnóstico patrimonial", "Mapeamento completo da estrutura patrimonial."],
      ["Definição da alocação", "Distribuição estratégica entre ativos, moedas e regiões."],
      ["Implementação", "Execução através das instituições escolhidas pelo cliente."],
      ["Monitoramento contínuo", "Acompanhamento permanente de patrimônio e risco."],
      ["Relatórios mensais", "Visão consolidada da carteira e posicionamento."],
      ["Rebalanceamento", "Ajustes conforme cenário global e objetivos."],
    ],
  },
  difference: {
    title: "Por que o Private é diferente",
    subtitle: "O patrimônio permanece sob controle do cliente.",
    paragraphs: [
      "O Private não exige transferência de patrimônio para uma instituição específica.",
      "A estrutura acompanha e orienta a carteira utilizando as instituições escolhidas pelo próprio cliente.",
    ],
    cards: [
      ["Patrimônio sob controle do cliente", "A estrutura acompanha sem exigir transferência para uma instituição específica."],
      ["Instituições escolhidas pelo cliente", "O acompanhamento respeita as contas, bancos e corretoras definidos pelo próprio investidor."],
      ["Monitoramento contínuo", "A estrutura patrimonial é acompanhada de forma recorrente, não pontual."],
      ["Relatórios recorrentes", "O cliente recebe visão consolidada da carteira, exposição e evolução patrimonial."],
    ],
  },
  institutions: {
    title: "Compatível com as principais instituições financeiras",
    subtitle: "O acompanhamento pode ser feito respeitando as contas, bancos e corretoras já escolhidos pelo cliente.",
    text: "O Private foi pensado para investidores que já possuem patrimônio distribuído entre diferentes instituições. A estrutura não prende o cliente a uma única plataforma. O foco é leitura, organização, risco, alocação e acompanhamento patrimonial.",
    brazil: "Brasil",
    global: "Mundo",
  },
  comparison: {
    title: "Comparação dos níveis",
    tiers: [
      ["Elite", "Sinais e execução manual", "Até US$ 50.000"],
      ["Select", "Estratégia automatizada", "US$ 50.000 a US$ 1.000.000"],
      ["Private", "Gestão patrimonial global", "Acima de US$ 1.000.000"],
    ],
  },
  pillars: {
    title: "O que recebe o cliente Private",
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
    title: "Seu patrimônio exige mais do que investimentos. Ele exige estrutura.",
    text: "O Private foi desenvolvido para investidores que precisam acompanhar patrimônio, risco, liquidez e alocação global com visão de longo prazo.",
    minimum: "Patrimônio mínimo: US$ 1.000.000",
    disclaimer: "Conteúdo institucional e educacional. Não representa recomendação individual, oferta pública ou promessa de rentabilidade.",
  },
};

const enCopy: PrivateCopy = {
  hero: {
    eyebrow: "GLOBAL WEALTH LAYER",
    title: "Varejo Investidor Private",
    subtitle: "Global wealth structure for investors with wealth above US$ 1,000,000.",
    text: "A private layer of wealth monitoring, strategic allocation, and continuous oversight for investors, business owners, and families seeking to preserve, expand, and organize wealth at international scale.",
    primary: "Request private analysis",
    secondary: "Schedule institutional call",
    cards: [
      ["Minimum wealth", "US$ 1,000,000"],
      ["Model", "Continuous wealth management"],
      ["Focus", "Protection, growth, and wealth continuity"],
    ],
  },
  notConsulting: {
    title: "Private does not sell hours. It monitors wealth.",
    subtitle: "Relevant wealth requires continuous oversight.",
    paragraphs: [
      "Private was developed for investors who already have consolidated wealth and do not want to spend time monitoring markets, reports, risks, or operational decisions every day.",
      "While Select executes the investment strategy, Private monitors the entire wealth structure.",
      "The focus is capital preservation, strategic allocation, risk control, and long-term growth.",
    ],
  },
  audience: {
    title: "Who it is for",
    cards: [
      "Investors above US$ 1,000,000",
      "Business owners with relevant liquidity",
      "Families building long-term wealth",
      "Wealth in multiple currencies",
      "International investors",
      "Clients seeking continuous wealth monitoring",
    ],
  },
  structure: {
    title: "Private structure",
    tiers: [
      {
        name: "Private Core",
        range: "US$ 1,000,000 to US$ 3,000,000",
        management: "0.70% per year",
        performance: "30% above 15% per year",
        includes: [
          "Monthly reports",
          "Wealth risk control",
          "Wealth monitoring",
          "Strategic allocation",
          "Continuous oversight",
          "Priority access",
        ],
      },
      {
        name: "Private Global",
        range: "US$ 3,000,000 to US$ 10,000,000",
        management: "0.60% per year",
        performance: "30% above 15% per year",
        includes: [
          "Everything in Private Core",
          "Multi-currency strategy",
          "International diversification",
          "Global structuring",
          "Advanced reports",
          "Strategic reviews",
        ],
      },
      {
        name: "Private Family",
        range: "Above US$ 10,000,000",
        management: "0.50% per year",
        performance: "20% above 15% per year",
        includes: [
          "Everything in Private Global",
          "Wealth governance",
          "Family continuity",
          "Succession planning",
          "International structure",
          "Dedicated access",
        ],
      },
    ],
  },
  flow: {
    title: "How Private works",
    steps: [
      ["Wealth diagnosis", "Complete mapping of the wealth structure."],
      ["Allocation definition", "Strategic distribution across assets, currencies, and regions."],
      ["Implementation", "Execution through the institutions selected by the client."],
      ["Continuous monitoring", "Permanent monitoring of wealth and risk."],
      ["Monthly reports", "Consolidated view of portfolio and positioning."],
      ["Rebalancing", "Adjustments according to the global scenario and objectives."],
    ],
  },
  difference: {
    title: "Why Private is different",
    subtitle: "The wealth remains under the client's control.",
    paragraphs: [
      "Private does not require transferring wealth to a specific institution.",
      "The structure monitors and guides the portfolio using the institutions chosen by the client.",
    ],
    cards: [
      ["Wealth stays under client control", "The structure monitors without requiring transfer to a specific institution."],
      ["Client-selected institutions", "Monitoring respects the accounts, banks, and brokers chosen by the investor."],
      ["Continuous monitoring", "The wealth structure is monitored on a recurring basis, not as a one-off review."],
      ["Recurring reports", "The client receives a consolidated view of portfolio, exposure, and wealth evolution."],
    ],
  },
  institutions: {
    title: "Compatible with leading financial institutions",
    subtitle: "Monitoring can respect the accounts, banks, and brokers already chosen by the client.",
    text: "Private was designed for investors who already hold wealth across different institutions. The structure does not lock the client into a single platform. The focus is portfolio reading, organization, risk, allocation, and ongoing wealth monitoring.",
    brazil: "Brazil",
    global: "Global",
  },
  comparison: {
    title: "Level comparison",
    tiers: [
      ["Elite", "Signals and manual execution", "Up to US$ 50,000"],
      ["Select", "Automated strategy", "US$ 50,000 to US$ 1,000,000"],
      ["Private", "Global wealth management", "Above US$ 1,000,000"],
    ],
  },
  pillars: {
    title: "What the Private client receives",
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
    title: "Your wealth needs more than investments. It needs structure.",
    text: "Private was developed for investors who need to monitor wealth, risk, liquidity, and global allocation with a long-term view.",
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
      subtitle: "Estructura patrimonial global para inversores con patrimonio superior a US$ 1.000.000.",
      text: "Una capa privada de seguimiento patrimonial, asignación estratégica y monitoreo continuo para inversores, empresarios y familias que desean preservar, expandir y organizar patrimonio a escala internacional.",
      primary: "Solicitar análisis privado",
      secondary: "Agendar conversación institucional",
      cards: [
        ["Patrimonio mínimo", "US$ 1.000.000"],
        ["Modelo", "Gestión patrimonial continua"],
        ["Foco", "Protección, crecimiento y continuidad patrimonial"],
      ],
    },
    notConsulting: {
      title: "Private no vende horas. Acompaña patrimonio.",
      subtitle: "El patrimonio relevante exige monitoreo continuo.",
      paragraphs: [
        "Private fue desarrollado para inversores que ya poseen patrimonio consolidado y no desean dedicar tiempo diario a mercados, reportes, riesgos o decisiones operativas.",
        "Mientras Select ejecuta la estrategia de inversión, Private acompaña toda la estructura patrimonial.",
        "El foco está en preservación de capital, asignación estratégica, control de riesgo y crecimiento de largo plazo.",
      ],
    },
    audience: {
      title: "Para quién es",
      cards: [
        "Inversores por encima de US$ 1.000.000",
        "Empresarios con liquidez relevante",
        "Familias en construcción patrimonial",
        "Patrimonio en múltiples monedas",
        "Inversores internacionales",
        "Clientes que buscan seguimiento continuo",
      ],
    },
    structure: {
      ...enCopy.structure,
      title: "Estructura Private",
      tiers: [
        {
          name: "Private Core",
          range: "US$ 1.000.000 a US$ 3.000.000",
          management: "0,70% al año",
          performance: "30% por encima del 15% anual",
          includes: [
            "Reportes mensuales",
            "Control de riesgo patrimonial",
            "Seguimiento patrimonial",
            "Asignación estratégica",
            "Monitoreo continuo",
            "Atención prioritaria",
          ],
        },
        {
          name: "Private Global",
          range: "US$ 3.000.000 a US$ 10.000.000",
          management: "0,60% al año",
          performance: "30% por encima del 15% anual",
          includes: [
            "Todo lo incluido en Private Core",
            "Estrategia multimoneda",
            "Diversificación internacional",
            "Estructuración global",
            "Reportes avanzados",
            "Revisiones estratégicas",
          ],
        },
        {
          name: "Private Family",
          range: "Por encima de US$ 10.000.000",
          management: "0,50% al año",
          performance: "20% por encima del 15% anual",
          includes: [
            "Todo lo incluido en Private Global",
            "Gobernanza patrimonial",
            "Continuidad familiar",
            "Planificación sucesoria",
            "Estructura internacional",
            "Atención dedicada",
          ],
        },
      ],
    },
    flow: {
      title: "Cómo funciona Private",
      steps: [
        ["Diagnóstico patrimonial", "Mapeo completo de la estructura patrimonial."],
        ["Definición de asignación", "Distribución estratégica entre activos, monedas y regiones."],
        ["Implementación", "Ejecución a través de las instituciones elegidas por el cliente."],
        ["Monitoreo continuo", "Seguimiento permanente del patrimonio y del riesgo."],
        ["Reportes mensuales", "Visión consolidada de la cartera y del posicionamiento."],
        ["Rebalanceo", "Ajustes según el escenario global y los objetivos."],
      ],
    },
    difference: {
      title: "Por qué Private es diferente",
      subtitle: "El patrimonio permanece bajo control del cliente.",
      paragraphs: [
        "Private no exige transferencia de patrimonio hacia una institución específica.",
        "La estructura monitorea y orienta la cartera utilizando las instituciones elegidas por el propio cliente.",
      ],
      cards: [
        ["Patrimonio bajo control del cliente", "La estructura acompaña sin exigir transferencia hacia una institución específica."],
        ["Instituciones elegidas por el cliente", "El seguimiento respeta las cuentas, bancos y corredoras definidos por el inversor."],
        ["Monitoreo continuo", "La estructura patrimonial se acompaña de forma recurrente, no puntual."],
        ["Reportes recurrentes", "El cliente recibe una visión consolidada de cartera, exposición y evolución patrimonial."],
      ],
    },
    institutions: {
      title: "Compatible con las principales instituciones financieras",
      subtitle: "El seguimiento puede respetar las cuentas, bancos y corredoras ya elegidos por el cliente.",
      text: "Private fue diseñado para inversores que ya tienen patrimonio distribuido entre diferentes instituciones. La estructura no ata al cliente a una sola plataforma. El foco está en lectura, organización, riesgo, asignación y seguimiento patrimonial.",
      brazil: "Brasil",
      global: "Mundo",
    },
    comparison: {
      title: "Comparación de niveles",
      tiers: [
        ["Elite", "Señales y ejecución manual", "Hasta US$ 50.000"],
        ["Select", "Estrategia automatizada", "US$ 50.000 a US$ 1.000.000"],
        ["Private", "Gestión patrimonial global", "Por encima de US$ 1.000.000"],
      ],
    },
    pillars: {
      title: "Qué recibe el cliente Private",
      cards: [
        ["Reportes mensuales", "Visión consolidada de la cartera, evolución y posicionamiento."],
        ["Control de exposición", "Seguimiento por activos, monedas, regiones e instituciones."],
        ["Control de riesgo", "Monitoreo de concentración, liquidez y vulnerabilidades."],
        ["Diversificación global", "Organización de la exposición internacional y multimoneda."],
        ["Monitoreo continuo", "Seguimiento recurrente de la estructura patrimonial."],
        ["Asignación multimoneda", "Distribución estratégica entre monedas fuertes y activos globales."],
        ["Protección patrimonial", "Preservación de capital con foco en ciclos largos."],
        ["Estrategia internacional", "Visión patrimonial más allá de las fronteras locales."],
      ],
    },
    cta: {
      eyebrow: "PRIVATE",
      title: "Tu patrimonio exige más que inversiones. Exige estructura.",
      text: "Private fue desarrollado para inversores que necesitan acompañar patrimonio, riesgo, liquidez y asignación global con visión de largo plazo.",
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
  "Itaú",
  "BTG Pactual",
  "XP Investimentos",
  "Bradesco",
  "Santander",
  "Banco do Brasil",
  "Safra",
  "Inter",
  "Nubank",
  "Clear",
];

const globalInstitutions = [
  "JPMorgan",
  "Goldman Sachs",
  "Morgan Stanley",
  "UBS",
  "HSBC",
  "Citibank",
  "Bank of America",
  "Charles Schwab",
  "Interactive Brokers",
  "Fidelity",
  "BlackRock",
  "Binance",
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
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.audience.title}</h2>
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

      <section className="border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.structure.title}</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.structure.tiers.map((tier, index) => (
              <article key={tier.name} className={`relative flex min-h-[620px] flex-col overflow-hidden border p-6 shadow-fine transition hover:-translate-y-1 md:p-7 ${index === 2 ? "border-gold/[0.48] bg-gradient-to-br from-gold/[0.14] via-paper/[0.05] to-ink shadow-premium" : "border-gold/[0.2] bg-paper/[0.035]"}`}>
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-gold/[0.08] blur-3xl" />
                <div className="relative flex h-full flex-col">
                  <h3 className="font-serif text-4xl leading-[0.98] tracking-[-0.05em] text-paper">{tier.name}</h3>
                  <div className="mt-7 space-y-5 border-y border-gold/[0.16] py-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{labels.wealth}</p>
                      <p className="mt-2 font-serif text-2xl tracking-[-0.035em] text-paper">{tier.range}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{labels.managementFee}</p>
                      <p className="mt-2 font-serif text-2xl tracking-[-0.035em] text-paper">{tier.management}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">{labels.performance}</p>
                      <p className="mt-2 font-serif text-2xl tracking-[-0.035em] text-paper">{tier.performance}</p>
                    </div>
                  </div>
                  <div className="mt-7 grid gap-3">
                    {tier.includes.map((item) => (
                      <p key={item} className="border border-gold/[0.12] bg-paper/[0.035] px-4 py-3 text-sm leading-6 text-paper/[0.74]">
                        <span className="mr-2 text-gold" aria-hidden="true">+</span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
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
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.pillars.cards.map(([title, text]) => (
              <AccentCard key={title} title={title} text={text} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.comparison.title}</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.comparison.tiers.map(([name, profile, wealth]) => (
              <article key={name} className={`relative flex min-h-[280px] flex-col overflow-hidden border p-7 shadow-fine ${name === "Private" ? "border-gold/[0.5] bg-gradient-to-br from-gold/[0.14] via-paper/[0.05] to-ink shadow-premium" : "border-gold/[0.18] bg-paper/[0.035]"}`}>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{labels.profile}</p>
                <h3 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.055em]">{name}</h3>
                <p className="mt-6 text-base leading-7 text-paper/[0.68]">{profile}</p>
                <p className="mt-auto pt-8 font-serif text-3xl tracking-[-0.04em] text-gold">{wealth}</p>
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
