"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import { localizedPath } from "../../i18n/routing";
import { getMarketLabel, publicMarketSlugs, type MarketSlug } from "../../data/marketContent";
import { fadeUp } from "../SiteSections";

const ribbonCopy: Record<"pt" | "en" | "es", { eyebrow: string; title: string; chip: string }> = {
  pt: { eyebrow: "Biblioteca Varejo Investidor", title: "Explore todos os mercados", chip: "Mercado" },
  en: { eyebrow: "Varejo Investidor library", title: "Explore every market", chip: "Market" },
  es: { eyebrow: "Biblioteca Varejo Investidor", title: "Explora todos los mercados", chip: "Mercado" },
};

function ribbonUi(locale: Locale) {
  if (locale === "pt") return ribbonCopy.pt;
  if (locale === "es") return ribbonCopy.es;
  return ribbonCopy.en;
}

export function MarketExploreRibbon({ locale, currentSlug }: { locale: Locale; currentSlug: MarketSlug }) {
  const ui = ribbonUi(locale);
  const slugs = locale === "pt" ? [...publicMarketSlugs, "fundos-imobiliarios" as MarketSlug] : publicMarketSlugs;

  return (
    <section className="border-t border-gold/[0.14] px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{ui.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl">{ui.title}</h2>
        </motion.div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {slugs
            .filter((s) => s !== currentSlug)
            .map((slug, index) => {
              const href = locale === "pt" ? `/${slug}` : localizedPath(`/${slug}`, locale);
              return (
                <motion.a
                  key={slug}
                  href={href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -4, rotateX: 4 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="group border border-gold/[0.22] bg-paper/[0.04] px-4 py-5 transition hover:border-gold/50 hover:bg-gold/[0.08]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold/80">{ui.chip}</p>
                  <p className="mt-2 font-serif text-xl tracking-[-0.03em] text-paper group-hover:text-gold">
                    {getMarketLabel(slug, locale)}
                  </p>
                </motion.a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
