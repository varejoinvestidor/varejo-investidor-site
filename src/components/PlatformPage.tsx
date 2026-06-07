"use client";

import { motion } from "framer-motion";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, useSiteLocale } from "./SiteSections";
import { getMarketLabel, type MarketSlug } from "../data/marketContent";
import {
  getPlatformContent,
  getPlatformLabels,
  getPlatformPath,
  platformSlugs,
  type PlatformSlug,
} from "../data/platformContent";
import type { Locale } from "../i18n";
import { translations } from "../i18n";

const relatedMarkets: MarketSlug[] = ["forex", "ouro", "petroleo", "commodities"];

function marketPath(locale: Locale, slug: MarketSlug) {
  const aliases: Record<Locale, Partial<Record<MarketSlug, string>>> = {
    pt: { forex: "forex", acoes: "acoes", cripto: "cripto", etfs: "etfs", ouro: "ouro", petroleo: "petroleo", commodities: "commodities", "fundos-imobiliarios": "fundos-imobiliarios" },
    en: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    es: { forex: "forex", acoes: "acciones", cripto: "cripto", etfs: "etfs", ouro: "oro", petroleo: "petroleo", commodities: "commodities" },
    hi: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ar: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    tr: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    id: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    vi: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    th: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ru: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ur: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    bn: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ja: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
    ko: { forex: "forex", acoes: "stocks", cripto: "crypto", etfs: "etfs", ouro: "gold", petroleo: "oil", commodities: "commodities" },
  };
  const alias = (aliases[locale] ?? aliases.en)[slug] ?? slug;
  return locale === "pt" ? `/${alias}` : `/${locale}/${alias}`;
}

export function PlatformPage({ pageLocale, slug }: { pageLocale: Locale; slug: string }) {
  const { locale, t, changeLocale } = useSiteLocale();
  const contentLocale = pageLocale ?? locale;
  const content = getPlatformContent(contentLocale, slug);
  const labels = getPlatformLabels(contentLocale);
  const footerT = pageLocale ? translations[pageLocale] : t;

  if (!content) return null;

  return (
    <>
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />
      <main className="min-h-screen bg-paper text-ink">
        <section className="page-hero relative overflow-hidden px-5 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
          <div className="absolute inset-0 luxury-grid opacity-45" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-gold/[0.08] blur-3xl" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-7xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{labels.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/[0.68] md:text-xl">{content.subtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={content.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button-gold inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
              >
                {content.ctaLabel}
              </a>
              <a
                href={labels.articlesHref}
                className="inline-flex min-h-12 items-center justify-center border border-ink/[0.18] bg-white/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:border-gold hover:text-gold"
              >
                {labels.articles}
              </a>
            </div>
          </motion.div>
        </section>

        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.84fr_1.16fr]">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="terminal-module border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine md:p-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{content.label}</p>
              <p className="mt-5 text-lg leading-8 text-ink/[0.72]">{content.intro}</p>
            </motion.article>
            <div className="grid gap-4 md:grid-cols-3">
              {content.sections.map((section) => (
                <motion.article
                  key={section.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="level-card terminal-module border border-ink/[0.1] bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-gold/[0.5]"
                >
                  <h2 className="font-serif text-2xl tracking-[-0.04em]">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink/[0.65]">{section.text}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    {section.bullets.map((bullet) => (
                      <span key={bullet} className="border border-ink/[0.1] bg-paper/[0.035] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/[0.58]">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8 md:pb-20">
          <div className="mx-auto max-w-7xl border border-ink/[0.1] bg-white/[0.035] p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold">{labels.related}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedMarkets.map((market) => (
                <a key={market} href={marketPath(contentLocale, market)} className="border border-ink/[0.1] bg-paper/[0.04] p-4 font-bold transition hover:-translate-y-0.5 hover:border-gold hover:text-gold">
                  {getMarketLabel(market, contentLocale)}
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {platformSlugs.filter((item) => item !== content.slug).map((item) => (
                <a key={item} href={getPlatformPath(contentLocale, item as PlatformSlug)} className="text-sm font-semibold text-ink/[0.58] transition hover:text-gold">
                  {getPlatformContent(contentLocale, item)?.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <FreeChannelCTA t={footerT} />
          </div>
        </section>
      </main>
      <SupportFooter t={footerT} locale={contentLocale} onLocaleChange={changeLocale} />
    </>
  );
}
