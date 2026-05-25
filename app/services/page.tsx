"use client";

import { motion } from "framer-motion";
import {
  BrokerBanners,
  ContactSection,
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  eliteLinkProps,
  fadeUp,
  useSiteLocale,
  useSiteTheme,
} from "../../src/components/SiteSections";

const paidPtServiceLinks: Record<string, string> = {
  "Mentoria Individual 4 horas": "https://lastlink.com/p/CD2963C67/checkout-payment",
  "Mentoria Individual 10 horas": "https://lastlink.com/p/C06E583A1/checkout-payment",
  "Consultoria Gold": "https://lastlink.com/p/C5FB7AC16/checkout-payment",
  "Consultoria Platinum": "https://lastlink.com/p/C8CE5F9DB/checkout-payment",
};

const ptServiceEnhancements: Record<string, { description: string; workload: string; micro: string }> = {
  "Mentoria Individual 4 horas": {
    description: "Sessão individual com foco operacional, leitura de mercado, risco e posicionamento para direcionar sua próxima etapa.",
    workload: "4 horas",
    micro: "Atendimento individual",
  },
  "Mentoria Individual 10 horas": {
    description: "Acompanhamento individual mais profundo para construir método, organizar risco, interpretar cenários e melhorar posicionamento.",
    workload: "10 horas",
    micro: "Vagas limitadas",
  },
  "Consultoria Gold": {
    description: "Consultoria para estrutura patrimonial, visão global, estratégia, risco e expansão com acompanhamento premium por seis meses.",
    workload: "30 horas",
    micro: "Estrutura estratégica",
  },
  "Consultoria Platinum": {
    description: "Consultoria anual de elite para patrimônio, sucessão, proteção de capital, visão global e expansão estratégica.",
    workload: "58 horas",
    micro: "Vagas limitadas",
  },
};

const internationalServicesIntro = {
  pt: "",
  en: "Explore Varejo Investidor channels for signals, education, and global market reading.",
  es: "Conoce los canales de Varejo Investidor para señales, educación y lectura de mercado global.",
  hi: "सिग्नल, शिक्षा और वैश्विक बाजार-पठन के लिए Varejo Investidor के चैनल देखें.",
};

function serviceTone(kind: string) {
  if (kind === "platinum") {
    return "border-gold bg-ink text-paper";
  }

  if (kind === "gold") {
    return "border-gold/[0.5] bg-gold/[0.08] text-ink";
  }

  if (kind === "free") {
    return "border-rise/[0.45] bg-white text-ink";
  }

  return "border-ink/[0.1] bg-paper text-ink";
}

export default function ServicesPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const { theme, changeTheme } = useSiteTheme();
  const visibleServices = locale === "pt" ? t.servicesPage.items : t.servicesPage.items.slice(0, 2);
  const servicesIntro =
    locale === "pt"
      ? t.servicesPage.text
      : internationalServicesIntro[locale];

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} theme={theme} onThemeChange={changeTheme} />

      <section className="premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            eyebrow={t.servicesPage.eyebrow}
            title={t.servicesPage.title}
            text={servicesIntro}
          />
          <div className="terminal-shell border border-ink bg-ink p-5 text-paper shadow-premium">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-gold">
              Varejo Investidor Commercial Desk
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Signals", "Education", "Consulting"].map((item, index) => (
                <div key={item} className="border border-paper/[0.1] bg-paper/[0.035] p-4">
                  <p className="font-serif text-4xl tracking-[-0.05em]">0{index + 1}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-paper/[0.55]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          {visibleServices.map((service, index) => {
            const eliteProps = index === 0 ? eliteLinkProps(locale, service.href) : undefined;
            const paidPtLink = locale === "pt" ? paidPtServiceLinks[service.title] : undefined;
            const href = service.href === "free" ? t.freeChannel.link : paidPtLink ?? service.href;
            const external = service.href === "free" || Boolean(paidPtLink);
            const enhancement = locale === "pt" ? ptServiceEnhancements[service.title] : undefined;
            const linkProps = eliteProps ?? {
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
                transition={{ duration: 0.5, delay: index * 0.05 }}
                variants={fadeUp}
                className={`relative overflow-hidden border p-6 shadow-fine transition hover:-translate-y-1 hover:shadow-premium md:p-8 ${serviceTone(service.kind)}`}
              >
                <div className={service.kind === "platinum" ? "absolute inset-0 terminal-grid opacity-20" : "absolute inset-0 luxury-grid opacity-45"} />
                <div className="relative">
                  <p className={`font-mono text-xs uppercase tracking-[0.24em] ${service.kind === "platinum" ? "text-gold" : "text-ink/[0.42]"}`}>
                    Service 0{index + 1}
                  </p>
                  <h2 className="mt-8 font-serif text-4xl leading-[1.02] tracking-[-0.04em] md:text-5xl">
                    {service.title}
                  </h2>
                  <p className={`mt-5 text-lg leading-8 ${service.kind === "platinum" ? "text-paper/[0.72]" : "text-ink/[0.66]"}`}>
                    {enhancement?.description ?? service.description}
                  </p>
                  {enhancement ? (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <p className={`border-l-2 pl-4 text-sm font-bold uppercase tracking-[0.16em] ${service.kind === "platinum" ? "border-gold text-gold" : "border-ink text-ink"}`}>
                        Carga horária: {enhancement.workload}
                      </p>
                      <p className={`border-l-2 pl-4 text-sm font-bold uppercase tracking-[0.16em] ${service.kind === "platinum" ? "border-gold text-gold" : "border-gold text-ink"}`}>
                        {enhancement.micro}
                      </p>
                    </div>
                  ) : null}
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <p
                        key={bullet}
                        className={`border-l pl-4 text-sm leading-7 ${
                          service.kind === "platinum" ? "border-gold text-paper/[0.76]" : "border-ink text-ink/[0.68]"
                        }`}
                      >
                        {bullet}
                      </p>
                    ))}
                  </div>
                  <a
                    {...linkProps}
                    className={`mt-8 block w-full border px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] transition hover:-translate-y-0.5 ${
                      service.kind === "platinum"
                        ? "border-gold bg-gold text-ink hover:border-paper hover:bg-paper"
                        : "border-ink bg-ink text-paper hover:bg-paper hover:text-ink"
                    }`}
                  >
                    {service.cta}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <BrokerBanners t={t} />

      <ContactSection t={t} />

      <SupportFooter t={t} />
    </main>
  );
}
