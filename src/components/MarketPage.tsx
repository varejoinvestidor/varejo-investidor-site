"use client";

import { motion } from "framer-motion";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "./SiteSections";
import type { Locale } from "../i18n";
import { getMarketContent, getMarketLabel, publicMarketSlugs, type MarketSlug } from "../data/marketContent";

const pageLabels: Record<Locale, {
  eyebrow: string;
  levelsTitle: string;
  formigaTitle: string;
  loboTitle: string;
  harpiaTitle: string;
  characteristics: string;
  educationTitle: string;
  educationText: string;
  educationButton: string;
  faq: string;
  internalLinks: string;
}> = {
  pt: {
    eyebrow: "Biblioteca de Mercados",
    levelsTitle: "Como cada nível utiliza este mercado",
    formigaTitle: "Formiga: o que aprende",
    loboTitle: "Lobo: como opera",
    harpiaTitle: "Harpia: como estrutura patrimônio",
    characteristics: "Principais características",
    educationTitle: "Evolua dentro da metodologia Varejo Investidor",
    educationText: "Aprofunde sua visão em Educação e conecte este mercado à jornada Formiga, Lobo e Harpia.",
    educationButton: "Ver Educação",
    faq: "FAQ",
    internalLinks: "Continue estudando",
  },
  en: {
    eyebrow: "Market Library",
    levelsTitle: "How each level uses this market",
    formigaTitle: "Formiga: what it learns",
    loboTitle: "Lobo: how it trades",
    harpiaTitle: "Harpia: how it structures wealth",
    characteristics: "Key characteristics",
    educationTitle: "Evolve inside the Varejo Investidor methodology",
    educationText: "Deepen your view in Education and connect this market to the Formiga, Lobo and Harpia journey.",
    educationButton: "View Education",
    faq: "FAQ",
    internalLinks: "Keep studying",
  },
  es: {
    eyebrow: "Biblioteca de Mercados",
    levelsTitle: "Cómo cada nivel utiliza este mercado",
    formigaTitle: "Formiga: lo que aprende",
    loboTitle: "Lobo: cómo opera",
    harpiaTitle: "Harpia: cómo estructura patrimonio",
    characteristics: "Principales características",
    educationTitle: "Evoluciona dentro de la metodología Varejo Investidor",
    educationText: "Profundiza tu visión en Educación y conecta este mercado con la jornada Formiga, Lobo y Harpia.",
    educationButton: "Ver Educación",
    faq: "FAQ",
    internalLinks: "Seguir estudiando",
  },
  hi: {
    eyebrow: "मार्केट लाइब्रेरी",
    levelsTitle: "हर स्तर इस बाजार का उपयोग कैसे करता है",
    formigaTitle: "Formiga: क्या सीखता है",
    loboTitle: "Lobo: कैसे ट्रेड करता है",
    harpiaTitle: "Harpia: संपत्ति कैसे संरचित करता है",
    characteristics: "मुख्य विशेषताएँ",
    educationTitle: "Varejo Investidor methodology के भीतर विकसित हों",
    educationText: "Education में अपनी समझ बढ़ाएँ और इस बाजार को Formiga, Lobo और Harpia यात्रा से जोड़ें।",
    educationButton: "शिक्षा देखें",
    faq: "FAQ",
    internalLinks: "अध्ययन जारी रखें",
  },
  ar: {
    eyebrow: "مكتبة الأسواق",
    levelsTitle: "كيف يستخدم كل مستوى هذا السوق",
    formigaTitle: "Formiga: ماذا يتعلم",
    loboTitle: "Lobo: كيف يتداول",
    harpiaTitle: "Harpia: كيف يبني الثروة",
    characteristics: "الخصائص الرئيسية",
    educationTitle: "تطور داخل منهجية Varejo Investidor",
    educationText: "عمق رؤيتك في التعليم واربط هذا السوق برحلة Formiga وLobo وHarpia.",
    educationButton: "عرض التعليم",
    faq: "الأسئلة الشائعة",
    internalLinks: "تابع الدراسة",
  },
  tr: {
    eyebrow: "Piyasa Kütüphanesi",
    levelsTitle: "Her seviye bu piyasayı nasıl kullanır",
    formigaTitle: "Formiga: ne öğrenir",
    loboTitle: "Lobo: nasıl işlem yapar",
    harpiaTitle: "Harpia: serveti nasıl yapılandırır",
    characteristics: "Temel özellikler",
    educationTitle: "Varejo Investidor metodolojisi içinde gelişin",
    educationText: "Eğitim bölümünde bakışınızı derinleştirin ve bu piyasayı Formiga, Lobo ve Harpia yolculuğuna bağlayın.",
    educationButton: "Eğitimi Gör",
    faq: "SSS",
    internalLinks: "Çalışmaya devam et",
  },
};

function SchemaScripts({ slug, locale }: { slug: MarketSlug; locale: Locale }) {
  const content = getMarketContent(slug, locale);
  const url = `https://varejo-investidor-site.vercel.app/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.metaDescription,
    inLanguage: locale === "pt" ? "pt-BR" : locale,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "Varejo Investidor",
      url: "https://varejo-investidor-site.vercel.app/",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Varejo Investidor", item: "https://varejo-investidor-site.vercel.app/" },
      { "@type": "ListItem", position: 2, name: content.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

export function MarketPage({ slug }: { slug: MarketSlug }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const pageLocale = slug === "fundos-imobiliarios" ? "pt" : locale;
  const content = getMarketContent(slug, pageLocale);
  const labels = pageLabels[pageLocale];
  const direction = pageLocale === "ar" ? "rtl" : "ltr";
  const relatedMarkets = content.related.filter((market) => market !== "fundos-imobiliarios" || pageLocale === "pt");

  const levelCards = [
    { title: labels.formigaTitle, items: content.formiga, href: "/formiga", tone: "rise" },
    { title: labels.loboTitle, items: content.lobo, href: "/lobo", tone: "gold" },
    { title: labels.harpiaTitle, items: content.harpia, href: "/harpia", tone: "gold" },
  ];

  return (
    <>
      <SiteChrome t={t} locale={locale} onLocaleChange={changeLocale} />
      <SchemaScripts slug={slug} locale={pageLocale} />
      <main lang={pageLocale === "pt" ? "pt-BR" : pageLocale} dir={direction} className="min-h-screen bg-ink text-paper">
        <section className="page-hero relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div className="absolute inset-0 terminal-grid opacity-50" />
          <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.55 }}
            className="relative mx-auto max-w-7xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-gold">{labels.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] text-paper md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-paper/[0.68] md:text-xl">{content.subtitle}</p>
          </motion.div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            {[{ title: content.explanationTitle, text: content.explanation }, { title: content.howItWorksTitle, text: content.howItWorks }].map((block) => (
              <motion.article
                key={block.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="terminal-module relative overflow-hidden border border-gold/[0.18] bg-white p-7 shadow-fine md:p-9"
              >
                <div className="absolute inset-0 luxury-grid opacity-35" />
                <div className="relative">
                  <h2 className="font-serif text-3xl tracking-[-0.04em] md:text-4xl">{block.title}</h2>
                  <p className="mt-5 text-base leading-8 text-paper/[0.68]">{block.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.levelsTitle}</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {levelCards.map((level) => (
                <motion.a
                  key={level.title}
                  href={level.href}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group terminal-module relative overflow-hidden border border-gold/[0.2] bg-white p-7 transition hover:-translate-y-1 hover:border-gold/[0.55] md:p-8"
                >
                  <div className="absolute inset-0 terminal-grid opacity-40" />
                  <div className="relative">
                    <h3 className="font-serif text-3xl tracking-[-0.04em]">{level.title}</h3>
                    <ul className="mt-6 space-y-3">
                      {level.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-paper/[0.7]">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${level.tone === "rise" ? "bg-rise" : "bg-gold"}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.characteristics}</p>
              <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] md:text-6xl">{getMarketLabel(slug, pageLocale)}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.characteristics.map((item, index) => (
                <div key={item} className="border border-gold/[0.18] bg-white p-5">
                  <p className="text-xs font-bold text-gold">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-semibold text-paper">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl border border-gold/[0.22] bg-white p-7 text-center shadow-premium md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.educationTitle}</p>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-paper/[0.68]">{labels.educationText}</p>
            <a
              href="/educacao"
              className="premium-button-gold mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
            >
              {labels.educationButton}
            </a>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <FreeChannelCTA t={t} />
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.faq}</p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {content.faqs.map((faq) => (
                <article key={faq.question} className="border border-gold/[0.18] bg-white p-6">
                  <h3 className="font-serif text-2xl tracking-[-0.04em]">{faq.question}</h3>
                  <p className="mt-4 text-sm leading-7 text-paper/[0.66]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{labels.internalLinks}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {relatedMarkets.map((related) => (
                <a key={related} href={`/${related}`} className="border border-gold/[0.24] bg-white px-4 py-3 text-sm font-semibold text-paper/[0.72] transition hover:border-gold hover:text-gold">
                  {getMarketLabel(related, pageLocale)}
                </a>
              ))}
              {["/educacao", "/sinais", "/sobre", "/formiga", "/lobo", "/harpia"].map((href) => (
                <a key={href} href={href} className="border border-paper/[0.12] bg-ink px-4 py-3 text-sm font-semibold text-paper/[0.62] transition hover:border-gold hover:text-gold">
                  {href.replace("/", "") || "home"}
                </a>
              ))}
            </div>
          </div>
        </section>

        <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
      </main>
    </>
  );
}
