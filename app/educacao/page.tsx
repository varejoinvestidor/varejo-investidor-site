"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

type Track = {
  id: "formiga" | "lobo" | "harpia";
  name: string;
  subtitle: string;
  seal: string;
  difficulty: string;
  tone: "rise" | "gold" | "elite";
  levels: readonly [string, string, string, number][];
};

const educationCopy = {
  pt: {
    eyebrow: "Educação",
    title: "FORMAÇÃO VAREJO INVESTIDOR",
    text: "Uma grade educacional em 15 níveis para desenvolver visão financeira, leitura de mercado, operação, risco, patrimônio e estrutura global.",
    seal: "FORMIGA 1-5 • LOBO 1-5 • HARPIA 1-5",
    matrixEyebrow: "Matriz de evolução",
    matrixTitle: "FORMIGA → LOBO → HARPIA",
    tableEyebrow: "Grade acadêmica",
    tableTitle: "GRADE COMPLETA DA FORMAÇÃO",
    tableText: "A matriz de desenvolvimento organizada por nível, fase, objetivo, conteúdos principais e evolução.",
    tableHeaders: ["Nível", "Fase", "Objetivo", "Conteúdos principais", "Evolução"],
    expansionTitle: "FORMAÇÃO EM EXPANSÃO",
    expansionText: "A trilha educacional completa Formiga, Lobo e Harpia será liberada progressivamente dentro do ecossistema Varejo Investidor.",
    expansionNote: "Novas aulas, módulos e materiais serão adicionados por fase.",
    expansionUpdate: "Atualizações contínuas da estrutura educacional global.",
    tracks: [
      {
        id: "formiga",
        name: "FORMIGA - BASE FINANCEIRA",
        subtitle: "Organização, primeiros investimentos, disciplina, risco e fundamentos.",
        seal: "Base financeira",
        difficulty: "★☆☆☆☆ até ★★★★★",
        tone: "rise",
        levels: [
          ["F1", "Realidade financeira", "Organização, renda, contas, dívida e primeiro capital.", 1],
          ["F2", "Planejamento e disciplina", "Controle emocional, rotina financeira e construção de caixa.", 2],
          ["F3", "Primeiros mercados", "Introdução a Forex, cripto, ações, renda fixa e fundos imobiliários.", 3],
          ["F4", "Risco e proteção", "Gestão de risco, proteção de capital e leitura básica de mercado.", 4],
          ["F5", "Saída da base", "Preparação para operar com mais clareza e evoluir para o nível Lobo.", 5],
        ],
      },
      {
        id: "lobo",
        name: "LOBO - ESTRATÉGIA E EXPANSÃO",
        subtitle: "Leitura de mercado, operação, ciclos, risco avançado e posicionamento.",
        seal: "Estratégia operacional",
        difficulty: "★★★☆☆ até ★★★★★",
        tone: "gold",
        levels: [
          ["L1", "Decisão operacional", "Leitura de fluxo, cenário e tomada de decisão.", 3],
          ["L2", "Mercado internacional", "Forex, cripto, ouro, petróleo, índices e moedas globais.", 4],
          ["L3", "Ciclos e correlações", "Relação entre ativos, liquidez, macroeconomia e cenário global.", 5],
          ["L4", "Gestão de carteira", "Risco avançado, proteção, alocação e posicionamento.", 5],
          ["L5", "Visão patrimonial", "Preparação para patrimônio, estrutura e nível Harpia.", 5],
        ],
      },
      {
        id: "harpia",
        name: "HARPIA - PATRIMÔNIO GLOBAL",
        subtitle: "Patrimônio, proteção, sucessão, moedas fortes e estrutura internacional.",
        seal: "Patrimônio global",
        difficulty: "★★★★★",
        tone: "elite",
        levels: [
          ["H1", "Visão macro global", "Leitura institucional, geopolítica, juros, moedas e fluxo internacional.", 5],
          ["H2", "Proteção patrimonial", "Preservação de capital, diversificação e alocação estratégica.", 5],
          ["H3", "Estrutura familiar", "Sucessão, patrimônio geracional e construção de longo prazo.", 5],
          ["H4", "Expansão internacional", "Moedas fortes, ativos globais, contas internacionais e proteção.", 5],
          ["H5", "Estrutura de elite", "Preservação, decisão patrimonial e visão acima do mercado.", 5],
        ],
      },
    ] satisfies Track[],
  },
  en: {
    eyebrow: "Education",
    title: "VAREJO INVESTIDOR EDUCATION",
    text: "A 15-level educational track designed to develop financial vision, market reading, trading, risk, wealth building, and global structure.",
    seal: "ANT 1-5 • WOLF 1-5 • HARPY 1-5",
    matrixEyebrow: "Evolution matrix",
    matrixTitle: "ANT → WOLF → HARPY",
    tableEyebrow: "Academic grid",
    tableTitle: "FULL EDUCATION GRID",
    tableText: "The development matrix organized by level, phase, objective, core content, and evolution.",
    tableHeaders: ["Level", "Phase", "Objective", "Core content", "Evolution"],
    expansionTitle: "EDUCATION EXPANDING",
    expansionText: "The complete Ant, Wolf, and Harpy educational path will be released progressively inside the Varejo Investidor ecosystem.",
    expansionNote: "New classes, modules, and materials will be added by phase.",
    expansionUpdate: "Continuous updates to the global educational structure.",
    tracks: [
      {
        id: "formiga",
        name: "ANT - FINANCIAL FOUNDATION",
        subtitle: "Organization, first investments, discipline, risk, and fundamentals.",
        seal: "Financial foundation",
        difficulty: "★☆☆☆☆ to ★★★★★",
        tone: "rise",
        levels: [
          ["F1", "Financial reality", "Organization, income, bills, debt, and first capital.", 1],
          ["F2", "Planning and discipline", "Emotional control, financial routine, and cash-building.", 2],
          ["F3", "First markets", "Introduction to Forex, crypto, stocks, fixed income, and real estate funds.", 3],
          ["F4", "Risk and protection", "Risk management, capital protection, and basic market reading.", 4],
          ["F5", "Leaving the base", "Preparation to operate with more clarity and evolve into the Wolf level.", 5],
        ],
      },
      {
        id: "lobo",
        name: "WOLF - STRATEGY AND EXPANSION",
        subtitle: "Market reading, trading, cycles, advanced risk, and positioning.",
        seal: "Operational strategy",
        difficulty: "★★★☆☆ to ★★★★★",
        tone: "gold",
        levels: [
          ["L1", "Operational decision", "Flow reading, scenario analysis, and decision-making.", 3],
          ["L2", "International market", "Forex, crypto, gold, oil, indices, and global currencies.", 4],
          ["L3", "Cycles and correlations", "Relationships between assets, liquidity, macroeconomics, and global scenarios.", 5],
          ["L4", "Portfolio management", "Advanced risk, protection, allocation, and positioning.", 5],
          ["L5", "Wealth vision", "Preparation for wealth, structure, and the Harpy level.", 5],
        ],
      },
      {
        id: "harpia",
        name: "HARPY - GLOBAL WEALTH",
        subtitle: "Wealth, protection, succession, strong currencies, and international structure.",
        seal: "Global wealth",
        difficulty: "★★★★★",
        tone: "elite",
        levels: [
          ["H1", "Global macro vision", "Institutional reading, geopolitics, rates, currencies, and international flow.", 5],
          ["H2", "Wealth protection", "Capital preservation, diversification, and strategic allocation.", 5],
          ["H3", "Family structure", "Succession, generational wealth, and long-term building.", 5],
          ["H4", "International expansion", "Strong currencies, global assets, international accounts, and protection.", 5],
          ["H5", "Elite structure", "Preservation, wealth decision-making, and vision above the market.", 5],
        ],
      },
    ] satisfies Track[],
  },
  es: {
    eyebrow: "Educación",
    title: "FORMACIÓN VAREJO INVESTIDOR",
    text: "Una grade educativa en 15 niveles para desarrollar visión financiera, lectura de mercado, operación, riesgo, patrimonio y estructura global.",
    seal: "HORMIGA 1-5 • LOBO 1-5 • HARPÍA 1-5",
    matrixEyebrow: "Matriz de evolución",
    matrixTitle: "HORMIGA → LOBO → HARPÍA",
    tableEyebrow: "Grade académica",
    tableTitle: "GRADE COMPLETA DE LA FORMACIÓN",
    tableText: "La matriz de desarrollo organizada por nivel, fase, objetivo, contenidos principales y evolución.",
    tableHeaders: ["Nivel", "Fase", "Objetivo", "Contenidos principales", "Evolución"],
    expansionTitle: "FORMACIÓN EN EXPANSIÓN",
    expansionText: "La ruta educativa completa Hormiga, Lobo y Harpía será liberada progresivamente dentro del ecosistema Varejo Investidor.",
    expansionNote: "Nuevas clases, módulos y materiales serán agregados por fase.",
    expansionUpdate: "Actualizaciones continuas de la estructura educativa global.",
    tracks: [
      {
        id: "formiga",
        name: "HORMIGA - BASE FINANCIERA",
        subtitle: "Organización, primeras inversiones, disciplina, riesgo y fundamentos.",
        seal: "Base financiera",
        difficulty: "★☆☆☆☆ hasta ★★★★★",
        tone: "rise",
        levels: [
          ["F1", "Realidad financiera", "Organización, ingresos, cuentas, deuda y primer capital.", 1],
          ["F2", "Planificación y disciplina", "Control emocional, rutina financiera y construcción de caja.", 2],
          ["F3", "Primeros mercados", "Introducción a Forex, cripto, acciones, renta fija y fondos inmobiliarios.", 3],
          ["F4", "Riesgo y protección", "Gestión de riesgo, protección de capital y lectura básica de mercado.", 4],
          ["F5", "Salida de la base", "Preparación para operar con más claridad y evolucionar al nivel Lobo.", 5],
        ],
      },
      {
        id: "lobo",
        name: "LOBO - ESTRATEGIA Y EXPANSIÓN",
        subtitle: "Lectura de mercado, operación, ciclos, riesgo avanzado y posicionamiento.",
        seal: "Estrategia operativa",
        difficulty: "★★★☆☆ hasta ★★★★★",
        tone: "gold",
        levels: [
          ["L1", "Decisión operativa", "Lectura de flujo, escenario y toma de decisión.", 3],
          ["L2", "Mercado internacional", "Forex, cripto, oro, petróleo, índices y divisas globales.", 4],
          ["L3", "Ciclos y correlaciones", "Relación entre activos, liquidez, macroeconomía y escenario global.", 5],
          ["L4", "Gestión de cartera", "Riesgo avanzado, protección, asignación y posicionamiento.", 5],
          ["L5", "Visión patrimonial", "Preparación para patrimonio, estructura y nivel Harpía.", 5],
        ],
      },
      {
        id: "harpia",
        name: "HARPÍA - PATRIMONIO GLOBAL",
        subtitle: "Patrimonio, protección, sucesión, monedas fuertes y estructura internacional.",
        seal: "Patrimonio global",
        difficulty: "★★★★★",
        tone: "elite",
        levels: [
          ["H1", "Visión macro global", "Lectura institucional, geopolítica, tasas, divisas y flujo internacional.", 5],
          ["H2", "Protección patrimonial", "Preservación de capital, diversificación y asignación estratégica.", 5],
          ["H3", "Estructura familiar", "Sucesión, patrimonio generacional y construcción de largo plazo.", 5],
          ["H4", "Expansión internacional", "Monedas fuertes, activos globales, cuentas internacionales y protección.", 5],
          ["H5", "Estructura de elite", "Preservación, decisión patrimonial y visión por encima del mercado.", 5],
        ],
      },
    ] satisfies Track[],
  },
};

const formationSteps = ["F1", "F2", "F3", "F4", "F5", "L1", "L2", "L3", "L4", "L5", "H1", "H2", "H3", "H4", "H5"];
const localizedEducationCopy = {
  ...educationCopy,
  ar: {
    ...educationCopy.en,
    eyebrow: "التعليم",
    title: "تكوين Varejo Investidor",
    text: "مسار تعليمي من 15 مستوى لتطوير الرؤية المالية وقراءة السوق والتشغيل والمخاطر وبناء الثروة والهيكل العالمي.",
    seal: "النملة 1-5 • الذئب 1-5 • الهاربي 1-5",
    matrixEyebrow: "مصفوفة التطور",
    matrixTitle: "النملة → الذئب → الهاربي",
    tableEyebrow: "المنهج الأكاديمي",
    tableTitle: "المنهج الكامل للتكوين",
    tableText: "مصفوفة التطور منظمة حسب المستوى والمرحلة والهدف والمحتوى الأساسي والتقدم.",
    tableHeaders: ["المستوى", "المرحلة", "الهدف", "المحتوى الأساسي", "التطور"],
    expansionTitle: "التكوين قيد التوسع",
    expansionText: "سيتم إطلاق مسار النملة والذئب والهاربي تدريجيا داخل نظام Varejo Investidor.",
    expansionNote: "ستضاف دروس ووحدات ومواد جديدة حسب كل مرحلة.",
    expansionUpdate: "تحديثات مستمرة للهيكل التعليمي العالمي.",
    tracks: [
      {
        ...educationCopy.en.tracks[0],
        name: "النملة - الأساس المالي",
        subtitle: "تنظيم، استثمارات أولى، انضباط، مخاطر وأساسيات.",
        seal: "الأساس المالي",
        difficulty: "★☆☆☆☆ إلى ★★★★★",
        levels: [
          ["F1", "الواقع المالي", "تنظيم الدخل والمصاريف والديون ورأس المال الأول.", 1],
          ["F2", "التخطيط والانضباط", "التحكم العاطفي والروتين المالي وبناء السيولة.", 2],
          ["F3", "الأسواق الأولى", "مقدمة إلى الفوركس والكريبتو والأسهم والدخل الثابت.", 3],
          ["F4", "المخاطر والحماية", "إدارة المخاطر وحماية رأس المال وقراءة السوق الأساسية.", 4],
          ["F5", "الخروج من القاعدة", "التحضير للتشغيل بوضوح أكبر والانتقال إلى مستوى الذئب.", 5],
        ],
      },
      {
        ...educationCopy.en.tracks[1],
        name: "الذئب - الاستراتيجية والتوسع",
        subtitle: "قراءة السوق، التشغيل، الدورات، المخاطر المتقدمة والتموضع.",
        seal: "استراتيجية تشغيلية",
        difficulty: "★★★☆☆ إلى ★★★★★",
        levels: [
          ["L1", "القرار التشغيلي", "قراءة التدفق والسيناريو واتخاذ القرار.", 3],
          ["L2", "السوق الدولية", "فوركس، كريبتو، ذهب، نفط، مؤشرات وعملات عالمية.", 4],
          ["L3", "الدورات والارتباطات", "العلاقة بين الأصول والسيولة والاقتصاد الكلي والسيناريو العالمي.", 5],
          ["L4", "إدارة المحفظة", "مخاطر متقدمة، حماية، توزيع وتموضع.", 5],
          ["L5", "رؤية الثروة", "التحضير للثروة والهيكل ومستوى الهاربي.", 5],
        ],
      },
      {
        ...educationCopy.en.tracks[2],
        name: "الهاربي - الثروة العالمية",
        subtitle: "ثروة، حماية، تعاقب، عملات قوية وهيكل دولي.",
        seal: "ثروة عالمية",
        difficulty: "★★★★★",
        levels: [
          ["H1", "رؤية ماكرو عالمية", "قراءة مؤسسية، جغرافيا سياسية، فوائد، عملات وتدفقات عالمية.", 5],
          ["H2", "حماية الثروة", "حفظ رأس المال والتنويع والتوزيع الاستراتيجي.", 5],
          ["H3", "الهيكل العائلي", "تعاقب وثروة أجيال وبناء طويل المدى.", 5],
          ["H4", "التوسع الدولي", "عملات قوية وأصول عالمية وحسابات دولية وحماية.", 5],
          ["H5", "هيكل النخبة", "حفظ وقرار ثروة ورؤية فوق السوق.", 5],
        ],
      },
    ] satisfies Track[],
  },
  tr: {
    ...educationCopy.en,
    eyebrow: "Eğitim",
    title: "Varejo Investidor Eğitimi",
    text: "Finansal vizyon, piyasa okuma, işlem, risk, varlık inşası ve küresel yapı geliştirmek için 15 seviyelik eğitim yolu.",
    seal: "KARINCA 1-5 • KURT 1-5 • HARPIA 1-5",
    matrixEyebrow: "Evrim matrisi",
    matrixTitle: "KARINCA → KURT → HARPIA",
    tableEyebrow: "Akademik plan",
    tableTitle: "TAM EĞİTİM PLANI",
    tableText: "Gelişim matrisi seviye, aşama, hedef, ana içerik ve ilerlemeye göre düzenlenmiştir.",
    tableHeaders: ["Seviye", "Aşama", "Hedef", "Ana içerik", "Evrim"],
    expansionTitle: "EĞİTİM GENİŞLİYOR",
    expansionText: "Karınca, Kurt ve Harpia eğitim yolu Varejo Investidor ekosistemi içinde kademeli olarak yayınlanacak.",
    expansionNote: "Yeni dersler, modüller ve materyaller aşamalara göre eklenecek.",
    expansionUpdate: "Küresel eğitim yapısına sürekli güncellemeler.",
    tracks: [
      {
        ...educationCopy.en.tracks[0],
        name: "KARINCA - FİNANSAL TEMEL",
        subtitle: "Organizasyon, ilk yatırımlar, disiplin, risk ve temeller.",
        seal: "Finansal temel",
        difficulty: "★☆☆☆☆ ile ★★★★★ arası",
        levels: [
          ["F1", "Finansal gerçeklik", "Organizasyon, gelir, faturalar, borç ve ilk sermaye.", 1],
          ["F2", "Planlama ve disiplin", "Duygusal kontrol, finansal rutin ve nakit oluşturma.", 2],
          ["F3", "İlk piyasalar", "Forex, kripto, hisse, sabit getiri ve fonlara giriş.", 3],
          ["F4", "Risk ve koruma", "Risk yönetimi, sermaye koruması ve temel piyasa okuma.", 4],
          ["F5", "Temelden çıkış", "Daha net işlem yapmak ve Kurt seviyesine geçmek için hazırlık.", 5],
        ],
      },
      {
        ...educationCopy.en.tracks[1],
        name: "KURT - STRATEJİ VE GENİŞLEME",
        subtitle: "Piyasa okuma, işlem, döngüler, ileri risk ve konumlanma.",
        seal: "Operasyonel strateji",
        difficulty: "★★★☆☆ ile ★★★★★ arası",
        levels: [
          ["L1", "Operasyonel karar", "Akış okuma, senaryo analizi ve karar alma.", 3],
          ["L2", "Uluslararası piyasa", "Forex, kripto, altın, petrol, endeksler ve küresel para birimleri.", 4],
          ["L3", "Döngüler ve korelasyonlar", "Varlıklar, likidite, makroekonomi ve küresel senaryo ilişkileri.", 5],
          ["L4", "Portföy yönetimi", "İleri risk, koruma, tahsis ve konumlanma.", 5],
          ["L5", "Varlık vizyonu", "Varlık, yapı ve Harpia seviyesine hazırlık.", 5],
        ],
      },
      {
        ...educationCopy.en.tracks[2],
        name: "HARPIA - KÜRESEL VARLIK",
        subtitle: "Varlık, koruma, devir, güçlü para birimleri ve uluslararası yapı.",
        seal: "Küresel varlık",
        difficulty: "★★★★★",
        levels: [
          ["H1", "Küresel makro vizyon", "Kurumsal okuma, jeopolitik, faizler, para birimleri ve uluslararası akış.", 5],
          ["H2", "Varlık koruması", "Sermaye koruma, çeşitlendirme ve stratejik tahsis.", 5],
          ["H3", "Aile yapısı", "Devir, kuşaklar arası varlık ve uzun vadeli inşa.", 5],
          ["H4", "Uluslararası genişleme", "Güçlü para birimleri, küresel varlıklar, uluslararası hesaplar ve koruma.", 5],
          ["H5", "Elite yapı", "Koruma, varlık kararı ve piyasanın üstünde vizyon.", 5],
        ],
      },
    ] satisfies Track[],
  },
};

function ProgressMarks({ value }: { value: number }) {
  return (
    <div className="education-progress-bars flex gap-1" aria-label={`Evolution ${value} of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-5 border border-gold/[0.22] ${index < value ? "is-filled bg-gold" : "bg-ink/[0.55]"}`}
          style={{ transitionDelay: `${index * 45}ms` }}
        />
      ))}
    </div>
  );
}

export default function EducationPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = localizedEducationCopy[locale as keyof typeof localizedEducationCopy] ?? localizedEducationCopy.en;
  const formationRows = copy.tracks.flatMap((track) =>
    track.levels.map(([code, title, objective, progress]) => ({
      code,
      phase: track.name.split(" - ")[0],
      title,
      objective,
      progress,
    })),
  );

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section id="topo" className="education-hero premium-stage px-5 pb-8 pt-32 md:px-8 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} text={copy.text} />
          <div className="mt-6 inline-flex border border-gold/[0.32] bg-gold/[0.08] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {copy.seal}
          </div>
        </div>
      </section>

      <section id="matriz" className="education-campus-section border-y border-gold/[0.08] bg-ink px-5 pb-16 pt-0 md:px-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="education-levels-visual relative mx-auto -mt-10 mb-8 flex max-w-[1280px] justify-center md:-mt-16 md:mb-10"
        >
          <div className="education-levels-glow" />
          <div className="education-levels-floor" />
          <Image
            src="/characters/education-formation-premium.png"
            alt="Varejo Investidor education characters"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 1120px, 96vw"
            className="education-levels-image education-levels-image-portrait relative z-10"
          />
        </motion.div>

        <div className="education-transition-line mx-auto mb-8 max-w-7xl" />

        <div className="education-matrix mx-auto mb-10 max-w-7xl border border-gold/[0.22] bg-ink/[0.72] p-6 shadow-premium md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{copy.matrixEyebrow}</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] text-paper">{copy.matrixTitle}</h2>
            </div>
            <div className="education-step-grid grid grid-cols-5 gap-3 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
              {formationSteps.map((step, index) => (
                <div key={step} className="education-step-node grid place-items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${index < 5 ? "bg-rise" : "bg-gold"}`} />
                  <span className="font-mono text-xs font-bold text-paper/[0.76]">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="education-matrix-line mt-6 h-px bg-gradient-to-r from-rise via-gold to-gold" />
        </div>

        <div id="formacao" className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {copy.tracks.map((track, index) => (
            <motion.article
              key={track.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              variants={fadeUp}
              className={`education-academic-card education-track-${track.id} relative overflow-hidden border border-ink/[0.1] bg-paper p-6 shadow-fine md:p-7`}
            >
              <div className="absolute inset-0 luxury-grid opacity-35" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{track.seal}</p>
                  <span className="font-mono text-xs text-gold">{track.difficulty}</span>
                </div>
                <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.04em]">{track.name}</h2>
                <p className="mt-5 text-[15px] leading-8 text-ink/[0.68]">{track.subtitle}</p>
                <div className="education-track-line mt-7 h-1 bg-ink/[0.28]">
                  <div className={`h-full ${track.tone === "rise" ? "bg-rise" : "bg-gold"}`} style={{ width: `${(index + 1) * 33}%` }} />
                </div>
                <div className="mt-7 grid gap-4">
                  {track.levels.map(([code, title, objective, progress]) => (
                    <div key={code} className="education-level-row border border-ink/[0.08] bg-white p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-sm font-bold text-gold">{code}</span>
                        <ProgressMarks value={progress} />
                      </div>
                      <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-ink">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink/[0.68]">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div id="grade" className="mx-auto mt-16 max-w-7xl">
          <SectionHeader eyebrow={copy.tableEyebrow} title={copy.tableTitle} text={copy.tableText} />
          <div className="education-table mt-8 overflow-x-auto border border-ink/[0.12] bg-white shadow-fine">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.18em] text-gold">
                <tr>
                  {copy.tableHeaders.map((heading) => (
                    <th key={heading} className="px-5 py-5 font-bold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formationRows.map((row) => (
                  <tr key={row.code} className="border-b border-ink/[0.06] transition hover:bg-gold/[0.045]">
                    <td className="px-5 py-5 font-mono text-sm font-bold text-gold">{row.code}</td>
                    <td className="px-5 py-5 text-sm font-bold uppercase tracking-[0.14em] text-ink/[0.72]">
                      <span className="mr-2 text-gold">✦</span>
                      {row.phase}
                    </td>
                    <td className="px-5 py-5 text-sm text-ink">{row.title}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-ink/[0.68]">{row.objective}</td>
                    <td className="px-5 py-5">
                      <ProgressMarks value={row.progress} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="expansao" className="mx-auto mt-10 max-w-7xl">
          <div
            aria-disabled="true"
            className="education-expansion relative cursor-not-allowed overflow-hidden border border-gold/[0.45] bg-ink/[0.88] px-6 py-8 text-center shadow-premium md:px-10 md:py-10"
          >
            <div className="absolute inset-0 terminal-grid opacity-20" />
            <div className="expansion-badge relative mx-auto inline-flex items-center justify-center">
              EM BREVE
            </div>
            <h2 className="relative mt-5 font-serif text-5xl tracking-[-0.05em] text-gold md:text-6xl">{copy.expansionTitle}</h2>
            <p className="relative mx-auto mt-4 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">{copy.expansionText}</p>
            <p className="relative mx-auto mt-3 max-w-3xl text-sm uppercase tracking-[0.16em] text-paper/[0.52]">{copy.expansionNote}</p>
            <p className="relative mx-auto mt-4 max-w-3xl text-xs font-bold uppercase tracking-[0.18em] text-gold">{copy.expansionUpdate}</p>
          </div>
        </div>

        {locale === "pt" ? (
          <div className="mx-auto mt-6 max-w-7xl">
            <a
              href="/calculadora-de-risco"
              className="group grid gap-4 border border-gold/[0.22] bg-white p-6 shadow-fine transition hover:-translate-y-1 hover:border-gold hover:shadow-premium md:grid-cols-[1fr_auto] md:items-center md:p-7"
            >
              <span>
                <span className="block text-xs font-black uppercase tracking-[0.26em] text-gold">Ferramenta educacional</span>
                <span className="mt-3 block font-serif text-3xl tracking-[-0.04em] text-ink">Calculadora de Risco</span>
                <span className="mt-2 block max-w-3xl text-sm leading-7 text-ink/[0.64]">
                  Calcule lote, stop, risco por operação e sobrevivência da conta antes de operar.
                </span>
              </span>
              <span className="inline-flex items-center justify-center border border-gold bg-gold px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition group-hover:bg-ink group-hover:text-gold">
                Abrir calculadora
              </span>
            </a>
          </div>
        ) : null}
      </section>

      <ForexBrokerBannerWide language={locale} />

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
