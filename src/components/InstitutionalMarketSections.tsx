"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "../i18n";
import type { InstitutionalMarketPage } from "../data/institutionalMarketPages/types";
import { PartnerBrokerMarketCard } from "./PartnerBrokerMarketCard";
import { fadeUp } from "./SiteSections";
import { localizedPath } from "../i18n/routing";
import { getPublisherHubPath } from "../publisher/public/paths";
import { getMarketLabel, type MarketSlug } from "../data/marketContent";

type MarketUiCopy = {
  brokerSection: string;
  researchEyebrow: string;
  researchTitle: string;
  researchText: string;
  researchCta: string;
  educationCta: string;
  relatedMarkets: string;
};

const uiPt: MarketUiCopy = {
  brokerSection: "Abertura de conta",
  researchEyebrow: "Research Varejo Investidor",
  researchTitle: "Continue com análises, formação e cenários globais",
  researchText: "Aprofunde leitura de mercado, educação financeira, geopolítica e gestão de risco com o ecossistema Varejo Investidor.",
  researchCta: "Acessar Research",
  educationCta: "Ver Formação",
  relatedMarkets: "Outros mercados",
};

const uiEn: MarketUiCopy = {
  brokerSection: "Account opening",
  researchEyebrow: "Varejo Investidor Research",
  researchTitle: "Continue with analysis, formation and global scenarios",
  researchText: "Deepen market reading, financial education, geopolitics and risk management across the Varejo Investidor ecosystem.",
  researchCta: "Access Research",
  educationCta: "View Formation",
  relatedMarkets: "Other markets",
};

const uiEs: MarketUiCopy = {
  brokerSection: "Apertura de cuenta",
  researchEyebrow: "Research Varejo Investidor",
  researchTitle: "Sigue con análisis, formación y escenarios globales",
  researchText: "Profundiza lectura de mercado, educación financiera y gestión del riesgo.",
  researchCta: "Acceder a Research",
  educationCta: "Ver Formación",
  relatedMarkets: "Otros mercados",
};

function marketUi(locale: Locale): MarketUiCopy {
  if (locale === "pt") return uiPt;
  if (locale === "es") return uiEs;
  return uiEn;
}

const relatedSlugs: MarketSlug[] = ["forex", "acoes", "etfs", "ouro", "petroleo", "cripto"];

export function MarketInstitutionalHero({ page, locale }: { page: InstitutionalMarketPage; locale: Locale }) {
  return (
    <section className="market-institutional-hero relative overflow-hidden px-5 pb-12 pt-28 md:px-8 md:pb-20 md:pt-36">
      <div className="absolute inset-0 terminal-grid opacity-40" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.55 }}>
          <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">Varejo Investidor | Mercados</p>
          <h1 className="mt-5 font-serif text-4xl leading-[0.98] tracking-[-0.05em] text-paper md:text-6xl lg:text-7xl">{page.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/[0.68] md:text-xl">{page.hero.subtitle}</p>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.65, delay: 0.08 }}
          className={`relative min-h-[280px] overflow-hidden border border-gold/[0.22] shadow-premium md:min-h-[380px] ${page.hero.imagePanelClass ?? "bg-ink"}`}
        >
          <Image
            src={page.hero.image}
            alt={page.hero.imageAlt}
            width={1536}
            height={1024}
            priority
            sizes="(min-width: 1024px) 44vw, 92vw"
            className={
              page.hero.imageFit === "contain"
                ? "h-full max-h-[440px] w-full object-contain object-bottom px-2 pb-2 pt-4"
                : "h-full max-h-[420px] w-full object-cover object-center"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

export function InstitutionalMarketSections({
  page,
  locale,
  currentSlug,
}: {
  page: InstitutionalMarketPage;
  locale: Locale;
  currentSlug: MarketSlug;
}) {
  const ui = marketUi(locale);
  const signalsHref = locale === "pt" ? "/sinais" : localizedPath("/sinais", locale);
  const educationHref = locale === "pt" ? "/educacao" : localizedPath("/educacao", locale);
  const insightsHref = getPublisherHubPath(locale);

  return (
    <>
      {page.sections.map((section, index) => (
        <section key={section.id} className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.02 }}
              className="terminal-module relative overflow-hidden border border-gold/[0.2] bg-white p-6 text-paper shadow-fine md:p-9"
            >
              <div className="absolute inset-0 terminal-grid opacity-[0.22]" aria-hidden="true" />
              <div className="relative">
                {section.eyebrow ? (
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{section.eyebrow}</p>
                ) : null}
                <h2 className="mt-3 font-serif text-3xl leading-[1.05] tracking-[-0.04em] md:text-5xl">{section.title}</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-paper/[0.68]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3 border border-gold/[0.14] bg-paper/[0.04] px-4 py-3 text-sm leading-6 text-paper/[0.76]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.cards?.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {section.cards.map((card) => (
                      <div key={card.title} className="border border-gold/[0.18] bg-paper/[0.04] p-5">
                        <h3 className="font-serif text-2xl tracking-[-0.04em] text-paper">{card.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-paper/[0.66]">{card.text}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {section.visualGrid?.length ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {section.visualGrid.map((item) => (
                      <div key={item.label} className="border border-gold/[0.22] bg-ink p-4 text-paper">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-gold">{item.label}</p>
                        {item.detail ? <p className="mt-2 text-sm leading-6 text-paper/[0.68]">{item.detail}</p> : null}
                      </div>
                    ))}
                  </div>
                ) : null}
                {section.disclaimer ? (
                  <p className="mt-6 border-l-2 border-gold/40 pl-4 text-xs leading-6 text-paper/[0.52]">{section.disclaimer}</p>
                ) : null}
              </div>
            </motion.article>
          </div>
        </section>
      ))}

      {page.showForexBroker || page.showCryptoBroker ? (
        <section className="px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{ui.brokerSection}</p>
          </div>
          <div className="mx-auto mt-8 max-w-7xl">
            {page.showForexBroker ? <PartnerBrokerMarketCard locale={locale} kind="forex" /> : null}
            {page.showCryptoBroker ? (
              <div className={page.showForexBroker ? "mt-6" : ""}>
                <PartnerBrokerMarketCard locale={locale} kind="crypto" />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl border border-gold/[0.28] bg-ink p-7 shadow-premium md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{ui.researchEyebrow}</p>
          <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-paper md:text-5xl">{ui.researchTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-paper/[0.68]">{ui.researchText}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={signalsHref} className="premium-button-gold inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
              {ui.researchCta}
            </a>
            <a href={educationHref} className="inline-flex min-h-12 items-center justify-center border border-paper/20 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:text-gold">
              {ui.educationCta}
            </a>
            <a href={insightsHref} className="inline-flex min-h-12 items-center justify-center border border-paper/20 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-paper transition hover:border-gold hover:text-gold">
              Insights
            </a>
          </div>
          <p className="mt-10 text-xs font-black uppercase tracking-[0.22em] text-gold/80">{ui.relatedMarkets}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedSlugs
              .filter((slug) => slug !== currentSlug)
              .map((slug) => (
                <a
                  key={slug}
                  href={locale === "pt" ? `/${slug}` : localizedPath(`/${slug}`, locale)}
                  className="border border-gold/[0.24] bg-paper/[0.04] px-4 py-2 text-sm font-semibold text-paper/[0.75] transition hover:border-gold hover:text-gold"
                >
                  {getMarketLabel(slug, locale)}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
