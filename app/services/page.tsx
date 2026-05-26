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
    description: "Canal gratuito no WhatsApp para sinais gratuitos, análises e conteúdos diários.",
    bullets: ["Entrada gratuita", "Conteúdo diário", "Base Formiga", "WhatsApp"],
    cta: "Entrar no Canal Gratuito",
    href: "free",
    kind: "free",
  },
];

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
  hi: "Varejo Investidor ?? ??????, ?????? ?? ??????? ?????-??? ???? ?????.",
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
  const compactServices = isPt ? compactPtServices : t.servicesPage.items.slice(0, 2);

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage relative px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeader eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} text={servicesIntro} />

          <div className="relative overflow-hidden border border-gold/[0.22] bg-ink p-6 text-paper shadow-premium md:p-8">
            <div className="absolute inset-0 terminal-grid opacity-20" />
            <div className="absolute right-6 top-6 h-28 w-28 rounded-full bg-gold/[0.12] blur-3xl" />
            <div className="relative">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-gold">Estrutura estratégica</p>
              <h2 className="mt-5 font-serif text-5xl leading-[0.98] tracking-[-0.05em] md:text-6xl">
                Serviços para evolução financeira em camadas.
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Sinais", "Educação", "Consultoria"].map((item, index) => (
                  <div key={item} className="border border-paper/[0.1] bg-paper/[0.04] p-4">
                    <p className="font-mono text-xs text-gold">0{index + 1}</p>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-paper/[0.72]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-2">
            {compactServices.map((service, index) => {
              const eliteProps = index === 0 ? eliteLinkProps(locale, service.href) : undefined;
              const href = service.href === "free" ? t.freeChannel.link : service.href;
              const external = service.href === "free";
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
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  variants={fadeUp}
                  className={`relative overflow-hidden border p-5 shadow-fine md:p-6 ${compactCardTone(service.kind)}`}
                >
                  <div className="absolute inset-0 luxury-grid opacity-30" />
                  <div className="relative flex h-full flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-gold">Produto 0{index + 1}</p>
                      <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">{service.title}</h2>
                      <p className="mt-4 max-w-2xl leading-7 text-ink/[0.66]">{service.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.bullets.map((bullet) => (
                          <span key={bullet} className="border border-ink/[0.1] px-3 py-2 text-xs uppercase tracking-[0.14em] text-ink/[0.62]">
                            {bullet}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      {...linkProps}
                      className="block shrink-0 border border-gold bg-gold px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-paper md:min-w-56"
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
