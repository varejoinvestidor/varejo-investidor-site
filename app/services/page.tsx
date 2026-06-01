"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BrokerBanners,
  ContactSection,
  ELITE_LASTLINK_URL,
  ELITE_STRIPE_LINKS,
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
  getElitePlanHref,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

const compactPtServices = [
  {
    title: "Canal Elite",
    description: "Produto principal com sinais ao vivo, análises, aulas gravadas e leitura global de mercado.",
    bullets: ["100% dos sinais", "Análises completas", "Educação por níveis", "Mercado global"],
    cta: "Conhecer o Canal Elite",
    href: "/sinais",
    kind: "elite",
  },
  {
    title: "Canal Gratuito Formiga",
    subtitle: "Entrada inicial para o ecossistema Varejo Investidor",
    description: "Receba sinais gratuitos, análises de mercado, leitura global e conteúdos financeiros diários diretamente no WhatsApp.",
    details: [
      "Comece seus primeiros passos no mercado internacional entendendo Forex, ouro, petróleo, índices, moedas globais e estrutura financeira.",
      "O Canal Formiga foi criado para ajudar investidores comuns a saírem da base financeira, desenvolver disciplina, leitura de mercado e evoluir em direção ao nível Lobo e Harpia.",
    ],
    bullets: ["Entrada gratuita", "Conteúdo diário", "Base Formiga", "WhatsApp"],
    highlights: ["Sinais gratuitos", "Conteúdo diário", "Mercado internacional", "Evolução financeira", "Estrutura de longo prazo"],
    cta: "Entrar no Canal Gratuito",
    href: "free",
    kind: "free",
  },
];

const elitePtPackages = [
  ["Mensal", "R$149,90", ""],
  ["Trimestral", "R$397,90", ""],
  ["Semestral", "R$697,90", ""],
  ["Anual", "R$1.197,90", "MAIOR ECONOMIA"],
];

const elitePackagesByLocale = {
  pt: { title: "Pacotes disponíveis", cta: "Assinar agora", items: elitePtPackages },
  en: {
    title: "Available packages",
    cta: "Subscribe now",
    items: [["Monthly", "US$ 30", ""], ["3 Months", "US$ 80", ""], ["6 Months", "US$ 145", ""], ["Annual", "US$ 240", "BEST VALUE"]],
  },
  es: {
    title: "Paquetes disponibles",
    cta: "Suscribirse ahora",
    items: [["Mensual", "US$ 30", ""], ["Trimestral", "US$ 80", ""], ["Semestral", "US$ 145", ""], ["Anual", "US$ 240", "MAYOR AHORRO"]],
  },
  hi: {
    title: "\u0909\u092A\u0932\u092C\u094D\u0927 \u092A\u0948\u0915\u0947\u091C",
    cta: "\u0905\u092D\u0940 \u0938\u0926\u0938\u094D\u092F\u0924\u093E \u0932\u0947\u0902",
    items: [["\u092E\u093E\u0938\u093F\u0915", "US$ 30", ""], ["3 \u092E\u0939\u0940\u0928\u0947", "US$ 80", ""], ["6 \u092E\u0939\u0940\u0928\u0947", "US$ 145", ""], ["\u0935\u093E\u0930\u094D\u0937\u093F\u0915", "US$ 240", "\u0938\u092C\u0938\u0947 \u0905\u091A\u094D\u091B\u093E \u092E\u0942\u0932\u094D\u092F"]],
  },
  ar: {
    title: "الباقات المتاحة",
    cta: "اشترك الآن",
    items: [["شهري", "US$ 30", ""], ["3 أشهر", "US$ 80", ""], ["6 أشهر", "US$ 145", ""], ["سنوي", "US$ 240", "أفضل قيمة"]],
  },
  tr: {
    title: "Mevcut paketler",
    cta: "Şimdi abone ol",
    items: [["Aylık", "US$ 30", ""], ["3 Ay", "US$ 80", ""], ["6 Ay", "US$ 145", ""], ["Yıllık", "US$ 240", "EN İYİ DEĞER"]],
  },
};

const compactServicesByLocale = {
  pt: compactPtServices,
  en: [
    {
      title: "Elite Channel",
      description: "Main product with live signals, market analysis, recorded classes, and global market reading.",
      bullets: ["100% of signals", "Complete analysis", "Level-based education", "Global markets"],
      cta: "Explore Elite Channel",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Free Formiga Channel",
      subtitle: "Entry point into the Varejo Investidor ecosystem",
      description: "Receive free signals, market analysis, global insights and daily financial content directly on WhatsApp.",
      details: [
        "Take your first steps into the international market by understanding Forex, gold, oil, indices, global currencies and financial structure.",
        "The Formiga Channel was created to help regular investors leave the financial base level, develop discipline, market reading skills and evolve toward the Lobo and Harpia levels.",
      ],
      bullets: ["Free access", "Daily content", "Formiga base", "WhatsApp"],
      highlights: ["Free signals", "Daily content", "International markets", "Financial growth", "Long-term structure"],
      cta: "JOIN FREE CHANNEL",
      href: "free",
      kind: "free",
    },
  ],
  es: [
    {
      title: "Canal Elite",
      description: "Producto principal con señales en vivo, análisis de mercado, clases grabadas y lectura global de mercado.",
      bullets: ["100% de las señales", "Análisis completos", "Educación por niveles", "Mercado global"],
      cta: "Conocer el Canal Elite",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Canal Gratuito Formiga",
      subtitle: "Entrada inicial al ecosistema Varejo Investidor",
      description: "Reciba señales gratuitas, análisis de mercado, lectura global y contenidos financieros diarios directamente en WhatsApp.",
      details: [
        "Comience sus primeros pasos en el mercado internacional entendiendo Forex, oro, petróleo, índices, monedas globales y estructura financiera.",
        "El Canal Formiga fue creado para ayudar a inversores comunes a salir de la base financiera, desarrollar disciplina, lectura de mercado y evolucionar hacia el nivel Lobo y Harpia.",
      ],
      bullets: ["Acceso gratuito", "Contenido diario", "Base Formiga", "WhatsApp"],
      highlights: ["Señales gratuitas", "Contenido diario", "Mercado internacional", "Evolución financiera", "Estructura a largo plazo"],
      cta: "ENTRAR AL CANAL GRATUITO",
      href: "free",
      kind: "free",
    },
  ],
  hi: [
    {
      title: "\u090F\u0932\u0940\u091F \u091A\u0948\u0928\u0932",
      description: "\u0932\u093E\u0907\u0935 \u0938\u093F\u0917\u094D\u0928\u0932, \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923, \u0930\u093F\u0915\u0949\u0930\u094D\u0921\u0947\u0921 \u0915\u094D\u0932\u093E\u0938 \u0914\u0930 \u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0930\u0940\u0921\u093F\u0902\u0917 \u0935\u093E\u0932\u093E \u092E\u0941\u0916\u094D\u092F \u092A\u094D\u0930\u094B\u0921\u0915\u094D\u091F\u0964",
      bullets: ["100% \u0938\u093F\u0917\u094D\u0928\u0932", "\u092A\u0942\u0930\u094D\u0923 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923", "\u0938\u094D\u0924\u0930-\u0906\u0927\u093E\u0930\u093F\u0924 \u0936\u093F\u0915\u094D\u0937\u093E", "\u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F"],
      cta: "\u090F\u0932\u0940\u091F \u091A\u0948\u0928\u0932 \u0926\u0947\u0916\u0947\u0902",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "\u092B\u0949\u0930\u094D\u092E\u093F\u0917\u093E \u092B\u094D\u0930\u0940 \u091A\u0948\u0928\u0932",
      subtitle: "Varejo Investidor \u0907\u0915\u094B\u0938\u093F\u0938\u094D\u091F\u092E \u0915\u093E \u0936\u0941\u0930\u0941\u0906\u0924\u0940 \u092A\u094D\u0930\u0935\u0947\u0936",
      description: "WhatsApp \u092A\u0930 \u0938\u0940\u0927\u0947 \u092E\u0941\u092B\u094D\u0924 \u0938\u093F\u0917\u094D\u0928\u0932, \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923, \u0917\u094D\u0932\u094B\u092C\u0932 \u0930\u0940\u0921\u093F\u0902\u0917 \u0914\u0930 \u0926\u0948\u0928\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0915\u0902\u091F\u0947\u0902\u091F \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964",
      details: [
        "Forex, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932, \u0907\u0902\u0921\u093F\u0938\u0947\u0938, \u0917\u094D\u0932\u094B\u092C\u0932 \u0915\u0930\u0947\u0902\u0938\u0940 \u0914\u0930 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0902\u0930\u091A\u0928\u093E \u0915\u094B \u0938\u092E\u091D\u0924\u0947 \u0939\u0941\u090F \u0905\u0902\u0924\u0930\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092C\u093E\u091C\u093E\u0930 \u092E\u0947\u0902 \u0905\u092A\u0928\u0947 \u092A\u0939\u0932\u0947 \u0915\u0926\u092E \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902\u0964",
        "Formiga Channel \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0928\u093F\u0935\u0947\u0936\u0915\u094B\u0902 \u0915\u094B \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0906\u0927\u093E\u0930 \u0938\u094D\u0924\u0930 \u0938\u0947 \u092C\u093E\u0939\u0930 \u0928\u093F\u0915\u0932\u0928\u0947, \u0905\u0928\u0941\u0936\u093E\u0938\u0928 \u0935\u093F\u0915\u0938\u093F\u0924 \u0915\u0930\u0928\u0947, \u092E\u093E\u0930\u094D\u0915\u0947\u091F \u0938\u092E\u091D \u092C\u0922\u093C\u093E\u0928\u0947 \u0914\u0930 Lobo \u0924\u0925\u093E Harpia \u0938\u094D\u0924\u0930 \u0924\u0915 \u0935\u093F\u0915\u0938\u093F\u0924 \u0939\u094B\u0928\u0947 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092C\u0928\u093E\u092F\u093E \u0917\u092F\u093E \u0939\u0948\u0964",
      ],
      bullets: ["\u092E\u0941\u092B\u094D\u0924 \u092A\u094D\u0930\u0935\u0947\u0936", "\u0926\u0948\u0928\u093F\u0915 \u0915\u0902\u091F\u0947\u0902\u091F", "Formiga \u0906\u0927\u093E\u0930", "WhatsApp"],
      highlights: ["\u092E\u0941\u092B\u094D\u0924 \u0938\u093F\u0917\u094D\u0928\u0932", "\u0926\u0948\u0928\u093F\u0915 \u0915\u0902\u091F\u0947\u0902\u091F", "\u0905\u0902\u0924\u0930\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092C\u093E\u091C\u093E\u0930", "\u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0935\u093F\u0915\u093E\u0938", "\u0926\u0940\u0930\u094D\u0918\u0915\u093E\u0932\u093F\u0915 \u0938\u0902\u0930\u091A\u0928\u093E"],
      cta: "\u092B\u094D\u0930\u0940 \u091A\u0948\u0928\u0932 \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0947\u0936 \u0915\u0930\u0947\u0902",
      href: "free",
      kind: "free",
    },
  ],
  ar: [
    {
      title: "قناة النخبة",
      description: "المنتج الرئيسي مع إشارات مباشرة وتحليلات ودروس مسجلة وقراءة عالمية للسوق.",
      bullets: ["100% من الإشارات", "تحليلات كاملة", "تعليم بالمستويات", "أسواق عالمية"],
      cta: "تعرف إلى قناة النخبة",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "قناة فورميغا المجانية",
      subtitle: "نقطة الدخول إلى نظام Varejo Investidor",
      description: "استقبل إشارات مجانية وتحليلات للسوق وقراءة عالمية ومحتوى مالي يومي مباشرة عبر واتساب.",
      details: [
        "ابدأ خطواتك الأولى في السوق الدولية بفهم الفوركس والذهب والنفط والمؤشرات والعملات العالمية والهيكل المالي.",
        "تم إنشاء قناة فورميغا لمساعدة المستثمرين الأفراد على الخروج من المستوى الأساسي وتطوير الانضباط وقراءة السوق والتقدم نحو مستويات الذئب والهاربي.",
      ],
      bullets: ["دخول مجاني", "محتوى يومي", "أساس فورميغا", "واتساب"],
      highlights: ["إشارات مجانية", "محتوى يومي", "أسواق دولية", "تطور مالي", "هيكل طويل المدى"],
      cta: "ادخل القناة المجانية",
      href: "free",
      kind: "free",
    },
  ],
  tr: [
    {
      title: "Elite Kanalı",
      description: "Canlı sinyaller, piyasa analizi, kayıtlı dersler ve küresel piyasa okuma sunan ana ürün.",
      bullets: ["Sinyallerin %100'ü", "Tam analiz", "Seviyeli eğitim", "Küresel piyasalar"],
      cta: "Elite Kanalını keşfet",
      href: "/sinais",
      kind: "elite",
    },
    {
      title: "Ücretsiz Formiga Kanalı",
      subtitle: "Varejo Investidor ekosistemine giriş noktası",
      description: "Ücretsiz sinyaller, piyasa analizleri, küresel okuma ve günlük finans içeriklerini doğrudan WhatsApp üzerinden alın.",
      details: [
        "Forex, altın, petrol, endeksler, küresel para birimleri ve finansal yapıyı anlayarak uluslararası piyasadaki ilk adımlarınızı atın.",
        "Formiga Kanalı, sıradan yatırımcıların finansal temel seviyeden çıkmasına, disiplin ve piyasa okuma geliştirmesine, Kurt ve Harpia seviyelerine ilerlemesine yardımcı olmak için oluşturuldu.",
      ],
      bullets: ["Ücretsiz giriş", "Günlük içerik", "Formiga temeli", "WhatsApp"],
      highlights: ["Ücretsiz sinyaller", "Günlük içerik", "Uluslararası piyasalar", "Finansal gelişim", "Uzun vadeli yapı"],
      cta: "ÜCRETSİZ KANALA GİR",
      href: "free",
      kind: "free",
    },
  ],
};

const highTicketServices = [
  {
    title: "Mentoria Individual 4 horas",
    description: "Sessão individual para leitura de perfil, estrutura operacional, risco e posicionamento no mercado.",
    workload: "4 horas",
    price: "R$ 3.200,00",
    hourly: "R$ 800,00/hora",
    tag: "Atendimento individual",
    deliveries: ["Diagnóstico de perfil", "Leitura de mercado", "Risco operacional", "Direcionamento estratégico"],
    cta: "Solicitar Mentoria 4h",
    href: "https://lastlink.com/p/CD2963C67/checkout-payment",
    kind: "mentoria",
  },
  {
    title: "Mentoria Individual 10 horas",
    description: "Acompanhamento individual para construção de método, organização operacional e evolução estratégica.",
    workload: "10 horas",
    price: "R$ 7.000,00",
    hourly: "R$ 700,00/hora",
    tag: "Vagas limitadas",
    deliveries: ["Construção de método", "Organização operacional", "Leitura de cenário", "Posicionamento global"],
    cta: "Solicitar Mentoria 10h",
    href: "https://lastlink.com/p/C06E583A1/checkout-payment",
    kind: "mentoria",
  },
  {
    title: "Consultoria Gold",
    description: "Consultoria premium para estrutura patrimonial, visão global, estratégia, risco e expansão.",
    workload: "6 meses | 30 horas",
    price: "R$ 18.000,00",
    hourly: "R$ 600,00/hora",
    tag: "Estrutura 6 meses",
    deliveries: ["Estruturação financeira", "Gestão de risco", "Leitura institucional", "Clareza estratégica"],
    cta: "Solicitar Consultoria Gold",
    href: "https://lastlink.com/p/C5FB7AC16/checkout-payment",
    kind: "gold",
  },
  {
    title: "Consultoria Platinum",
    description: "Consultoria anual de elite para patrimônio, sucessão, proteção de capital, visão global e expansão estratégica.",
    workload: "Anual | 58 horas",
    price: "R$ 29.000,00",
    hourly: "aprox. R$ 500,00/hora",
    tag: "Elite anual",
    deliveries: ["Visão patrimonial", "Estrutura global", "Sucessão e proteção", "Expansão estratégica"],
    cta: "Solicitar Consultoria Platinum",
    href: "https://lastlink.com/p/C8CE5F9DB/checkout-payment",
    kind: "platinum",
  },
];

const internationalServicesIntro = {
  pt: "",
  en: "Explore Varejo Investidor channels for signals, education, and global market reading.",
  es: "Conoce los canales de Varejo Investidor para señales, educación y lectura de mercado global.",
  hi: "Varejo Investidor की सेवाएँ देखें: सिग्नल, शिक्षा और वैश्विक बाजार-पठन।",
  ar: "تعرّف إلى قنوات Varejo Investidor للإشارات والتعليم وقراءة السوق العالمية.",
  tr: "Sinyaller, eğitim ve küresel piyasa okuma için Varejo Investidor kanallarını keşfedin.",
};

function compactCardTone(kind: string) {
  return kind === "free"
    ? "border-rise/[0.38] bg-rise/[0.06]"
    : "border-gold/[0.36] bg-gold/[0.07]";
}

function highTicketTone(kind: string) {
  if (kind === "platinum") {
    return "border-gold bg-ink text-paper shadow-premium";
  }

  if (kind === "gold") {
    return "border-gold/[0.55] bg-gold/[0.08] text-ink";
  }

  return "border-ink/[0.12] bg-paper text-ink";
}

export default function ServicesPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const isPt = locale === "pt";
  const servicesIntro = isPt ? t.servicesPage.text : internationalServicesIntro[locale];
  const compactServices = compactServicesByLocale[locale as keyof typeof compactServicesByLocale] ?? compactServicesByLocale.en;
  const packageCopy = elitePackagesByLocale[locale as keyof typeof elitePackagesByLocale] ?? elitePackagesByLocale.en;
  const internationalElitePrices = [
    ["Monthly", "US$30"],
    ["3 Months", "US$80"],
    ["6 Months", "US$145"],
    ["Annual", "US$240"],
  ];
  const productLabel =
    locale === "en"
      ? "Product"
      : locale === "es"
        ? "Producto"
        : locale === "hi"
          ? "\u0938\u0947\u0935\u093E"
          : "Produto";
  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="services-hero premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <SectionHeader eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} text={servicesIntro} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="services-hero-visual relative min-h-[360px] lg:min-h-[520px]"
          >
            <div className="services-hero-grid" />
            <div className="services-hero-glow" />
            <div className="services-hero-floor" />
            <Image
              src="/characters/services-hero-institutional.png"
              alt="Personagens Formiga, Lobo e Harpia em mesa institucional"
              width={1536}
              height={1024}
              sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 48vw, 96vw"
              priority
              className="services-hero-image"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-2">
            {compactServices.map((service, index) => {
              const href = service.href === "free" ? t.freeChannel.link : service.href;
              const external = service.href === "free";
              const subtitle = "subtitle" in service ? String(service.subtitle) : "";
              const details = "details" in service ? (service.details as string[]) : [];
              const highlights = "highlights" in service ? (service.highlights as string[]) : [];
              const linkProps = {
                href,
                target: external ? "_blank" : undefined,
                rel: external ? "noopener noreferrer" : undefined,
              };

              return (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  variants={fadeUp}
                  className={`service-channel-card service-channel-${service.kind} relative overflow-hidden border p-6 shadow-fine md:p-7 ${compactCardTone(service.kind)}`}
                >
                  <div className="absolute inset-0 luxury-grid opacity-30" />
                  <div className="relative flex h-full flex-col gap-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">{productLabel} 0{index + 1}</p>
                      <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">{service.title}</h2>
                      {subtitle ? (
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-rise">{subtitle}</p>
                      ) : null}
                      <p className="mt-4 max-w-2xl leading-7 text-ink/[0.66]">{service.description}</p>
                      {details.length ? (
                        <div className="mt-4 grid gap-3 text-sm leading-7 text-ink/[0.62]">
                          {details.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.bullets.map((bullet) => (
                          <span key={bullet} className="border border-ink/[0.1] px-3 py-2 text-xs uppercase tracking-[0.14em] text-ink/[0.62]">
                            {bullet}
                          </span>
                        ))}
                      </div>
                      {highlights.length ? (
                        <div className="free-channel-highlights mt-6 grid gap-2">
                          {highlights.map((item) => (
                            <p key={item} className="flex items-center gap-3 border border-rise/[0.16] bg-rise/[0.055] px-3 py-2 text-xs font-bold uppercase tracking-[0.13em] text-ink/[0.72]">
                              <span className="text-rise">✓</span>
                              {item}
                            </p>
                          ))}
                        </div>
                      ) : null}
                      {index === 0 ? (
                        <div className="elite-package-table mt-6 border border-gold/[0.24] bg-ink/[0.82] p-4">
                          {isPt ? (
                            <>
                              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Escolha sua forma de pagamento</p>
                              <p className="mt-3 text-sm leading-6 text-paper/[0.64]">
                                Clientes no Brasil podem pagar em reais via Lastlink. Clientes internacionais podem assinar em dólar via Stripe.
                              </p>
                              <div className="mt-5 grid gap-4">
                                <div className="border border-gold/[0.32] bg-paper/[0.05] p-4">
                                  <span className="inline-block bg-gold px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-ink">
                                    Brasil
                                  </span>
                                  <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-paper">Pagamento Brasil</h3>
                                  <p className="mt-3 text-sm leading-6 text-paper/[0.66]">
                                    Assine o Canal Elite em reais com checkout nacional seguro pela Lastlink.
                                  </p>
                                  <p className="mt-4 font-serif text-2xl tracking-[-0.04em] text-gold">A partir de R$149,90/mês</p>
                                  <a
                                    href={ELITE_LASTLINK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 flex w-full items-center justify-center border border-gold bg-gold px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.14em] text-ink transition hover:-translate-y-0.5"
                                  >
                                    Pagar em reais
                                  </a>
                                </div>

                                <div className="border border-gold/[0.2] bg-paper/[0.035] p-4">
                                  <span className="inline-block border border-gold/[0.45] px-2 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-gold">
                                    Internacional
                                  </span>
                                  <h3 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-paper">Pagamento Internacional</h3>
                                  <p className="mt-3 text-sm leading-6 text-paper/[0.66]">
                                    Para clientes fora do Brasil, assine em dólar via Stripe.
                                  </p>
                                  <div className="mt-4 grid gap-2">
                                    {internationalElitePrices.map(([period, price], packageIndex) => (
                                      <div key={period} className="grid gap-2 border border-gold/[0.14] bg-ink/[0.62] p-3 sm:grid-cols-[1fr_auto] sm:items-center">
                                        <div>
                                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/[0.58]">{period}</p>
                                          <p className="mt-1 font-mono text-base font-bold text-gold">{price}</p>
                                        </div>
                                        <a
                                          href={ELITE_STRIPE_LINKS[packageIndex]}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="border border-gold/[0.45] px-3 py-2 text-center text-[9px] font-black uppercase tracking-[0.12em] text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                                        >
                                          Assinar em dólar
                                        </a>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">{packageCopy.title}</p>
                              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                {packageCopy.items.map(([period, price, badge], packageIndex) => (
                                  <div key={period} className="relative border border-gold/[0.16] bg-paper/[0.05] p-3">
                                    {badge ? (
                                      <span className="mb-2 inline-block bg-gold px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-ink">
                                        {badge}
                                      </span>
                                    ) : null}
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/[0.58]">{period}</p>
                                    <p className="mt-1 font-serif text-2xl tracking-[-0.04em] text-gold">{price}</p>
                                    <a
                                      href={getElitePlanHref(locale, packageIndex)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-3 inline-block border border-gold/[0.35] px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-gold transition hover:border-gold hover:bg-gold hover:text-ink"
                                    >
                                      {packageCopy.cta}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>
                    <a
                      {...linkProps}
                      className={`service-channel-cta service-channel-cta-${service.kind} block shrink-0 px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] transition md:min-w-64`}
                    >
                      {service.cta}
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {isPt ? (
        <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Serviços estratégicos"
              title="Mentorias e consultorias"
              text="Produtos individuais para operação, leitura de mercado, estrutura patrimonial e expansão estratégica."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {highTicketServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  variants={fadeUp}
                  className={`relative overflow-hidden border p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-8 ${highTicketTone(service.kind)}`}
                >
                  <div className={service.kind === "platinum" ? "absolute inset-0 terminal-grid opacity-25" : "absolute inset-0 luxury-grid opacity-35"} />
                  <div className="absolute right-6 top-8 h-24 w-24 rounded-full bg-gold/[0.1] blur-3xl" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${service.kind === "platinum" ? "border-gold bg-gold text-ink" : "border-gold text-gold"}`}>
                        {service.tag}
                      </span>
                      <span className={`font-mono text-xs uppercase tracking-[0.18em] ${service.kind === "platinum" ? "text-paper/[0.54]" : "text-ink/[0.48]"}`}>
                        {service.workload}
                      </span>
                    </div>

                    <h2 className="mt-7 font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl">
                      {service.title}
                    </h2>
                    <p className={`mt-5 text-lg leading-8 ${service.kind === "platinum" ? "text-paper/[0.72]" : "text-ink/[0.66]"}`}>
                      {service.description}
                    </p>

                    <div className="mt-7 border-y border-gold/[0.22] py-6">
                      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${service.kind === "platinum" ? "text-gold" : "text-ink/[0.46]"}`}>
                        Investimento
                      </p>
                      <p className="mt-3 font-serif text-5xl tracking-[-0.05em] text-gold md:text-6xl">
                        {service.price}
                      </p>
                      <p className={`mt-3 font-mono text-xs uppercase tracking-[0.2em] ${service.kind === "platinum" ? "text-gold/[0.78]" : "text-gold"}`}>
                        {service.hourly}
                      </p>
                    </div>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {service.deliveries.map((delivery) => (
                        <p
                          key={delivery}
                          className={`border-l pl-4 text-sm leading-7 ${
                            service.kind === "platinum" ? "border-gold text-paper/[0.76]" : "border-ink/[0.24] text-ink/[0.68]"
                          }`}
                        >
                          {delivery}
                        </p>
                      ))}
                    </div>

                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 block w-full border px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
                        service.kind === "platinum"
                          ? "border-gold bg-gold text-ink hover:border-paper hover:bg-paper"
                          : "border-ink bg-ink text-paper hover:border-gold hover:bg-gold hover:text-ink"
                      }`}
                    >
                      {service.cta}
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <BrokerBanners t={t} />

      <ContactSection t={t} />

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
