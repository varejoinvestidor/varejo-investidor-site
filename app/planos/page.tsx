"use client";

import { motion } from "framer-motion";
import {
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  eliteLinkProps,
  fadeUp,
  useSiteLocale,
  useSiteTheme,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

export default function PlansPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const { theme, changeTheme } = useSiteTheme();
  const eliteCta = eliteLinkProps(locale, "/planos");

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} theme={theme} onThemeChange={changeTheme} />

      <section className="premium-stage px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.pricing.eyebrow} title={t.pricing.title} text={t.pricing.text} />
          <div className="mt-8">
            <FreeChannelCTA t={t} />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          {locale === "pt" ? (
            <motion.article
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              variants={fadeUp}
              className="overflow-hidden border border-ink bg-paper shadow-premium"
            >
              <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
                <div className="bg-ink p-7 text-paper md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Canal Elite</p>
                  <h2 className="mt-5 font-serif text-6xl tracking-[-0.05em]">Canal Elite</h2>
                  <p className="mt-5 leading-8 text-paper/[0.66]">{t.pricing.text}</p>
                  <a
                    {...eliteCta}
                    className="mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:bg-paper hover:border-paper"
                  >
                    {t.pricing.cta}
                  </a>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-7">
                  {t.pricing.plans.map((plan) => (
                    <div key={plan.period} className={plan.featured ? "border border-gold bg-gold/[0.08] p-5" : "border border-ink/[0.1] bg-white p-5"}>
                      {plan.featured ? (
                        <span className="mb-4 inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                          {t.pricing.badge}
                        </span>
                      ) : null}
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-ink/[0.48]">{plan.period}</p>
                      <p className="mt-4 font-serif text-4xl tracking-[-0.05em]">{plan.brl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ) : (
            <div className="grid gap-4 lg:grid-cols-4">
              {t.pricing.plans.map((plan) => (
                <motion.article
                  key={plan.period}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  variants={fadeUp}
                  className={plan.featured ? "border border-gold bg-ink p-6 text-paper shadow-premium" : "border border-ink/[0.1] bg-paper p-6 shadow-fine"}
                >
                  {plan.featured ? (
                    <span className="mb-5 inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                      {t.pricing.badge}
                    </span>
                  ) : null}
                  <p className={plan.featured ? "text-xs font-bold uppercase tracking-[0.28em] text-gold" : "text-xs font-bold uppercase tracking-[0.28em] text-ink/[0.48]"}>
                    Elite
                  </p>
                  <h2 className="mt-6 font-serif text-4xl tracking-[-0.05em]">{plan.period}</h2>
                  <p className="mt-5 font-serif text-4xl tracking-[-0.05em]">{plan.usd}</p>
                  <a
                    {...eliteCta}
                    className={plan.featured ? "mt-8 block border border-gold bg-gold px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink" : "mt-8 block border border-ink bg-ink px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper"}
                  >
                    {t.pricing.cta}
                  </a>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-5 grid gap-3 border border-ink bg-ink p-5 text-paper shadow-premium md:grid-cols-2 lg:grid-cols-4">
            {t.pricing.features.map((feature) => (
              <p key={feature} className="border-l border-gold pl-4 text-sm leading-7">
                {feature}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} />
    </main>
  );
}
