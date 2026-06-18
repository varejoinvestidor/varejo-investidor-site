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

type PrivateCopy = {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    text: string;
    primary: string;
    secondary: string;
    cards: [string, string][];
  };
  what: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  audience: {
    title: string;
    cards: string[];
  };
  institutional: {
    title: string;
    text: string;
    items: string[];
  };
  comparison: {
    title: string;
    subtitle: string;
    tiers: [string, string, string][];
  };
  flow: {
    title: string;
    steps: string[];
  };
  pillars: {
    title: string;
    cards: [string, string][];
  };
  selectVsPrivate: {
    title: string;
    select: string;
    private: string;
  };
  ladder: {
    title: string;
    items: [string, string][];
  };
  cta: {
    title: string;
    text: string;
    disclaimer: string;
  };
};

const copyByLocale: Record<string, PrivateCopy> = {
  pt: {
    hero: {
      tag: "Camada institucional global",
      title: "Varejo Investidor Private",
      subtitle: "Estrutura patrimonial institucional para investidores com capital acima de US$ 1.000.000.",
      text: "Uma abordagem global para proteção, expansão e organização de patrimônio em escala internacional.",
      primary: "Solicitar análise privada",
      secondary: "Agendar conversa institucional",
      cards: [
        ["Entrada", "Acima de US$ 1.000.000"],
        ["Perfil", "Alta escala patrimonial"],
        ["Foco", "Proteção e alocação global"],
      ],
    },
    what: {
      eyebrow: "O que é o Private",
      title: "O Private não é um produto. É uma estrutura patrimonial institucional.",
      paragraphs: [
        "O Private é uma estrutura desenvolvida para investidores que já possuem patrimônio consolidado e precisam de organização, proteção e expansão global.",
        "Diferente dos níveis anteriores, aqui o foco não é execução de sinais ou automação. O foco é estrutura patrimonial.",
      ],
    },
    audience: {
      title: "Para quem é",
      cards: [
        "Investidores acima de US$ 1.000.000",
        "Empresários com capital internacional",
        "Famílias em construção patrimonial",
        "Profissionais com patrimônio global",
        "Investidores que buscam proteção de capital",
        "Pessoas com múltiplas moedas e países",
      ],
    },
    institutional: {
      title: "O Private opera em nível institucional.",
      text: "A estrutura foi criada para organizar patrimônio com visão internacional, planejamento de longo prazo e leitura de risco em múltiplos ambientes.",
      items: [
        "Estruturação global de patrimônio",
        "Planejamento multimoeda",
        "Proteção de capital em diferentes jurisdições",
        "Estratégia de alocação internacional",
        "Gestão de risco patrimonial",
        "Visão de longo prazo, de 10 a 30 anos",
      ],
    },
    comparison: {
      title: "Comparação dos níveis",
      subtitle: "Uma escada clara entre execução manual, automação e estrutura institucional global.",
      tiers: [
        ["Elite", "Execução manual de sinais", "< US$ 50.000"],
        ["Select", "Estrutura automatizada", "US$ 50.000 - US$ 1.000.000"],
        ["Private", "Estrutura institucional global", "> US$ 1.000.000"],
      ],
    },
    flow: {
      title: "Fluxo do Private",
      steps: [
        "Entrada de capital",
        "Análise patrimonial global",
        "Estruturação internacional",
        "Definição de alocação",
        "Gestão contínua",
        "Rebalanceamento estratégico",
      ],
    },
    pillars: {
      title: "Pilares do Private",
      cards: [
        ["Proteção patrimonial", "Organização de capital com foco em preservação e continuidade."],
        ["Expansão global", "Visão internacional para ampliar exposição e reduzir dependência local."],
        ["Eficiência tributária estrutural", "Planejamento de estrutura, jurisdição e organização patrimonial."],
        ["Diversificação internacional", "Distribuição entre moedas, regiões, instituições e classes de ativos."],
        ["Gestão de risco avançada", "Leitura patrimonial para equilibrar liquidez, proteção e crescimento."],
        ["Planejamento intergeracional", "Estrutura pensada para ciclos longos, sucessão e permanência."],
      ],
    },
    selectVsPrivate: {
      title: "Diferencial em relação ao Select",
      select: "Select: automação operacional e execução estruturada.",
      private: "Private: estrutura institucional e visão patrimonial global.",
    },
    ladder: {
      title: "Posicionamento final da escada",
      items: [
        ["Formiga", "Aprendizado"],
        ["Lobo", "Estrutura"],
        ["Harpia", "Visão global"],
        ["Elite", "Execução manual"],
        ["Select", "Automação"],
        ["Private", "Estrutura institucional global"],
      ],
    },
    cta: {
      title: "Acesso à estrutura Private",
      text: "O Varejo Investidor Private é destinado a investidores que operam em escala global e buscam estrutura patrimonial de nível institucional.",
      disclaimer: "Conteúdo institucional e educacional. Não representa recomendação individual, promessa de rentabilidade ou oferta pública de investimento.",
    },
  },
  en: {
    hero: {
      tag: "Global institutional layer",
      title: "Varejo Investidor Private",
      subtitle: "An institutional wealth structure for investors with capital above US$1,000,000.",
      text: "A global approach to protecting, expanding, and organizing wealth across international markets.",
      primary: "Request private analysis",
      secondary: "Schedule institutional call",
      cards: [
        ["Entry", "Above US$1,000,000"],
        ["Profile", "High-scale wealth"],
        ["Focus", "Protection and global allocation"],
      ],
    },
    what: {
      eyebrow: "What Private is",
      title: "Private is not a product. It is an institutional wealth structure.",
      paragraphs: [
        "Private was designed for investors who already have consolidated wealth and need global organization, protection, and expansion.",
        "Unlike the previous levels, the focus here is not signal execution or automation. The focus is wealth structure.",
      ],
    },
    audience: {
      title: "Who it is for",
      cards: [
        "Investors above US$1,000,000",
        "Business owners with international capital",
        "Families building wealth",
        "Professionals with global wealth",
        "Investors seeking capital protection",
        "People with multiple currencies and countries",
      ],
    },
    institutional: {
      title: "Private operates at an institutional level.",
      text: "The structure was created to organize wealth with an international view, long-term planning, and risk awareness across multiple environments.",
      items: [
        "Global wealth structuring",
        "Multi-currency planning",
        "Capital protection across jurisdictions",
        "International allocation strategy",
        "Wealth risk management",
        "Long-term view, from 10 to 30 years",
      ],
    },
    comparison: {
      title: "Level comparison",
      subtitle: "A clear ladder between manual execution, automation, and global institutional structure.",
      tiers: [
        ["Elite", "Manual signal execution", "< US$50,000"],
        ["Select", "Automated structure", "US$50,000 - US$1,000,000"],
        ["Private", "Global institutional structure", "> US$1,000,000"],
      ],
    },
    flow: {
      title: "Private flow",
      steps: [
        "Capital entry",
        "Global wealth analysis",
        "International structuring",
        "Allocation definition",
        "Continuous management",
        "Strategic rebalancing",
      ],
    },
    pillars: {
      title: "Private pillars",
      cards: [
        ["Wealth protection", "Capital organization focused on preservation and continuity."],
        ["Global expansion", "International view to expand exposure and reduce local dependence."],
        ["Structural tax efficiency", "Planning around structure, jurisdiction, and wealth organization."],
        ["International diversification", "Distribution across currencies, regions, institutions, and asset classes."],
        ["Advanced risk management", "Wealth reading to balance liquidity, protection, and growth."],
        ["Intergenerational planning", "Structure designed for long cycles, succession, and permanence."],
      ],
    },
    selectVsPrivate: {
      title: "Difference from Select",
      select: "Select: operational automation and structured execution.",
      private: "Private: institutional structure and global wealth vision.",
    },
    ladder: {
      title: "Final ecosystem ladder",
      items: [
        ["Ant", "Learning"],
        ["Wolf", "Structure"],
        ["Harpy", "Global vision"],
        ["Elite", "Manual execution"],
        ["Select", "Automation"],
        ["Private", "Global institutional structure"],
      ],
    },
    cta: {
      title: "Access the Private structure",
      text: "Varejo Investidor Private is designed for investors operating at global scale who seek institutional-level wealth structuring.",
      disclaimer: "Institutional and educational content. This is not individual advice, a return promise, or a public investment offer.",
    },
  },
  es: {
    hero: {
      tag: "Capa institucional global",
      title: "Varejo Investidor Private",
      subtitle: "Estructura patrimonial institucional para inversores con capital superior a US$ 1.000.000.",
      text: "Un enfoque global para proteger, expandir y organizar patrimonio a escala internacional.",
      primary: "Solicitar análisis privado",
      secondary: "Agendar conversación institucional",
      cards: [
        ["Entrada", "Más de US$ 1.000.000"],
        ["Perfil", "Alta escala patrimonial"],
        ["Foco", "Protección y asignación global"],
      ],
    },
    what: {
      eyebrow: "Qué es Private",
      title: "Private no es un producto. Es una estructura patrimonial institucional.",
      paragraphs: [
        "Private fue desarrollado para inversores que ya poseen patrimonio consolidado y necesitan organización, protección y expansión global.",
        "A diferencia de los niveles anteriores, aquí el foco no es la ejecución de señales ni la automatización. El foco es la estructura patrimonial.",
      ],
    },
    audience: {
      title: "Para quién es",
      cards: [
        "Inversores por encima de US$ 1.000.000",
        "Empresarios con capital internacional",
        "Familias en construcción patrimonial",
        "Profesionales con patrimonio global",
        "Inversores que buscan protección de capital",
        "Personas con múltiples monedas y países",
      ],
    },
    institutional: {
      title: "Private opera a nivel institucional.",
      text: "La estructura fue creada para organizar patrimonio con visión internacional, planificación de largo plazo y lectura de riesgo en múltiples entornos.",
      items: [
        "Estructuración global de patrimonio",
        "Planificación multimoneda",
        "Protección de capital en diferentes jurisdicciones",
        "Estrategia de asignación internacional",
        "Gestión de riesgo patrimonial",
        "Visión de largo plazo, de 10 a 30 años",
      ],
    },
    comparison: {
      title: "Comparación de niveles",
      subtitle: "Una escalera clara entre ejecución manual, automatización y estructura institucional global.",
      tiers: [
        ["Elite", "Ejecución manual de señales", "< US$ 50.000"],
        ["Select", "Estructura automatizada", "US$ 50.000 - US$ 1.000.000"],
        ["Private", "Estructura institucional global", "> US$ 1.000.000"],
      ],
    },
    flow: {
      title: "Flujo de Private",
      steps: [
        "Entrada de capital",
        "Análisis patrimonial global",
        "Estructuración internacional",
        "Definición de asignación",
        "Gestión continua",
        "Rebalanceo estratégico",
      ],
    },
    pillars: {
      title: "Pilares de Private",
      cards: [
        ["Protección patrimonial", "Organización de capital con foco en preservación y continuidad."],
        ["Expansión global", "Visión internacional para ampliar exposición y reducir dependencia local."],
        ["Eficiencia fiscal estructural", "Planificación de estructura, jurisdicción y organización patrimonial."],
        ["Diversificación internacional", "Distribución entre monedas, regiones, instituciones y clases de activos."],
        ["Gestión de riesgo avanzada", "Lectura patrimonial para equilibrar liquidez, protección y crecimiento."],
        ["Planificación intergeneracional", "Estructura pensada para ciclos largos, sucesión y permanencia."],
      ],
    },
    selectVsPrivate: {
      title: "Diferencia frente a Select",
      select: "Select: automatización operativa y ejecución estructurada.",
      private: "Private: estructura institucional y visión patrimonial global.",
    },
    ladder: {
      title: "Posicionamiento final del ecosistema",
      items: [
        ["Formiga", "Aprendizaje"],
        ["Lobo", "Estructura"],
        ["Harpia", "Visión global"],
        ["Elite", "Ejecución manual"],
        ["Select", "Automatización"],
        ["Private", "Estructura institucional global"],
      ],
    },
    cta: {
      title: "Acceso a la estructura Private",
      text: "Varejo Investidor Private está destinado a inversores que operan a escala global y buscan una estructura patrimonial de nivel institucional.",
      disclaimer: "Contenido institucional y educativo. No representa recomendación individual, promesa de rentabilidad ni oferta pública de inversión.",
    },
  },
};

function usePrivateCopy(locale: string) {
  return copyByLocale[locale] ?? copyByLocale.en;
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="relative overflow-hidden border border-gold/[0.18] bg-paper/[0.025] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.5] hover:shadow-premium">
      <div className="absolute inset-0 luxury-grid opacity-10" />
      <div className="relative">
        <h3 className="font-serif text-2xl leading-[1.05] tracking-[-0.035em] text-paper">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-paper/[0.68]">{text}</p>
      </div>
    </article>
  );
}

export default function PrivatePage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = usePrivateCopy(locale);
  const isRtl = locale === "ar" || locale === "ur" || locale === "fa";

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={isRtl ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-ink text-paper">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="relative overflow-hidden border-b border-gold/[0.14] bg-ink px-5 pb-16 pt-36 md:px-8 md:pb-24 md:pt-44 lg:px-12 xl:px-16">
        <div className="absolute inset-0 terminal-grid opacity-8" />
        <div className="absolute right-[8%] top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.p variants={fadeUp} className="text-xs font-black uppercase tracking-[0.34em] text-gold">{copy.hero.tag}</motion.p>
            <motion.h1 variants={fadeUp} className="mt-5 max-w-5xl text-balance font-serif text-[2.7rem] leading-[1.02] tracking-[-0.055em] md:text-[5.5rem]">
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
                <div className="absolute inset-0 luxury-grid opacity-16" />
                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-paper/[0.52]">{label}</p>
                  <p className="mt-3 font-serif text-3xl leading-[1.02] tracking-[-0.04em] text-gold">{value}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{copy.what.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.what.title}</h2>
          </div>
          <div className="grid gap-5 text-base leading-8 text-paper/[0.68] md:text-lg">
            {copy.what.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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

      <section className="relative overflow-hidden border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="absolute inset-0 terminal-grid opacity-7" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">Institucional</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.institutional.title}</h2>
            <p className="mt-6 text-base leading-8 text-paper/[0.68] md:text-lg">{copy.institutional.text}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.institutional.items.map((item) => (
              <article key={item} className="border border-gold/[0.16] bg-paper/[0.035] p-5 shadow-fine">
                <p className="font-serif text-2xl leading-[1.08] tracking-[-0.035em]">{item}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">Elite | Select | Private</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.comparison.title}</h2>
            <p className="mt-5 text-base leading-8 text-paper/[0.68] md:text-lg">{copy.comparison.subtitle}</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.comparison.tiers.map(([name, mode, range]) => (
              <article key={name} className={`relative flex min-h-[280px] flex-col overflow-hidden border p-7 shadow-fine ${name === "Private" ? "border-gold/[0.5] bg-gradient-to-br from-gold/[0.14] via-paper/[0.05] to-ink" : "border-gold/[0.18] bg-paper/[0.035]"}`}>
                <div className="absolute inset-0 luxury-grid opacity-14" />
                <div className="relative flex h-full flex-col">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{mode}</p>
                  <h3 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.055em]">{name}</h3>
                  <p className="mt-auto pt-8 font-serif text-3xl tracking-[-0.04em] text-gold">{range}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.flow.title}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            {copy.flow.steps.map((step, index) => (
              <article key={step} className="relative overflow-hidden border border-gold/[0.2] bg-paper/[0.04] p-5 shadow-fine">
                <div className="absolute inset-x-0 top-0 h-1 bg-gold/[0.7]" />
                <span className="block h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(201,155,62,0.5)]" />
                <h3 className="mt-5 font-serif text-2xl leading-[1.05] tracking-[-0.035em]">{step}</h3>
                {index < copy.flow.steps.length - 1 ? <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-paper/[0.35]">Next</p> : null}
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <h2 className="max-w-4xl font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.pillars.title}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.pillars.cards.map(([title, text]) => (
              <FeatureCard key={title} title={title} text={text} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-gold/[0.12] bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[0.7fr_1fr_1fr]">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.selectVsPrivate.title}</h2>
          <article className="border border-gold/[0.16] bg-paper/[0.035] p-6 shadow-fine">
            <h3 className="font-serif text-4xl tracking-[-0.04em] text-gold">Select</h3>
            <p className="mt-5 text-base leading-8 text-paper/[0.68]">{copy.selectVsPrivate.select}</p>
          </article>
          <article className="border border-gold/[0.42] bg-gradient-to-br from-gold/[0.14] via-paper/[0.045] to-ink p-6 shadow-premium">
            <h3 className="font-serif text-4xl tracking-[-0.04em] text-gold">Private</h3>
            <p className="mt-5 text-base leading-8 text-paper/[0.72]">{copy.selectVsPrivate.private}</p>
          </article>
        </motion.div>
      </section>

      <section className="bg-ink px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.5fr_1fr] lg:items-start">
          <h2 className="font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.ladder.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {copy.ladder.items.map(([name, text]) => (
              <article key={name} className="border border-gold/[0.14] bg-paper/[0.04] p-5 shadow-fine">
                <h3 className="font-serif text-3xl tracking-[-0.04em]">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-paper/[0.64]">{text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden bg-ink px-5 py-16 text-center md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="absolute inset-0 terminal-grid opacity-10" />
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/[0.1] blur-3xl" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="relative mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">Private</p>
          <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{copy.cta.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-paper/[0.7] md:text-lg">{copy.cta.text}</p>
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
