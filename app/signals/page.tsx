"use client";

import { motion } from "framer-motion";
import {
  BrokerBanners,
  FreeChannelCTA,
  SectionHeader,
  SignalTicket,
  SiteChrome,
  Sparkline,
  SupportFooter,
  WhatsAppSignalExample,
  eliteLinkProps,
  fadeUp,
  useSiteLocale,
  useSiteTheme,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

export default function SignalsPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const { theme, changeTheme } = useSiteTheme();
  const eliteCta = eliteLinkProps(locale, "/#planos");

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} theme={theme} onThemeChange={changeTheme} />

      <section className="premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow={t.signalBlock.eyebrow} title={t.signalBlock.title} text={t.signalBlock.text} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.signalBlock.stats.map((item) => (
                <div key={item} className="border-l-2 border-ink bg-white p-4 shadow-fine">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
            <a
              {...eliteCta}
              className="mt-8 inline-block border border-ink bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-paper transition hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
            >
              {t.signalBlock.cta}
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel p-3"
          >
            <SignalTicket t={t} />
          </motion.div>
        </div>
      </section>

      <WhatsAppSignalExample t={t} locale={locale} />

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {t.signalBlock.stats.slice(0, 3).map((item, index) => (
            <motion.article
              key={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              variants={fadeUp}
              className="relative overflow-hidden border border-ink/[0.1] bg-white p-6 shadow-fine"
            >
              <div className="absolute inset-0 luxury-grid opacity-45" />
              <div className="relative">
                <p className="font-mono text-xs text-rise">0{index + 1}</p>
                <h2 className="mt-6 font-serif text-3xl tracking-[-0.04em]">{item}</h2>
                <div className="mt-5">
                  <Sparkline tone={index === 1 ? "down" : "up"} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <BrokerBanners t={t} />

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} />
    </main>
  );
}
