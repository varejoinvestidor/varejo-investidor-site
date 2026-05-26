"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BrokerBanners,
  FreeChannelCTA,
  SectionHeader,
  SignalTicket,
  SiteChrome,
  SupportFooter,
  WhatsAppSignalExample,
  eliteLinkProps,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

const howItWorks = [
  "2 a 5 sinais por dia",
  "Envio direto no WhatsApp",
  "Entrada, alvo e stop definidos",
  "Contexto operacional e leitura de mercado",
];

const ichimokuPoints = [
  "leitura da nuvem",
  "médias do Ichimoku",
  "direção do preço",
  "alvo e stop",
  "contexto do ativo",
  "gerenciamento de risco",
];

const reports = [
  ["AGO/2018", "Relatório Elite", "124 sinais", "+18.4%", "Disponível"],
  ["JAN/2021", "Relatório Elite", "98 sinais", "+11.2%", "Disponível"],
  ["MAR/2024", "Relatório Elite", "137 sinais", "+22.7%", "Disponível"],
];

const formigaBullets = [
  "gratuito",
  "conteúdos educacionais",
  "análises básicas",
  "visão introdutória",
  "construção da base",
  "sinais limitados",
];

const eliteBullets = [
  "sinais completos",
  "2 a 5 sinais dia",
  "operações estruturadas",
  "contexto operacional",
  "Forex",
  "ouro",
  "petróleo",
  "índices",
  "cripto",
  "leitura institucional",
  "comunidade fechada",
  "aulas gravadas nível Formiga",
  "aulas gravadas nível Lobo",
  "aulas gravadas nível Harpia",
  "estrutura Elite",
];

const prices = [
  ["MENSAL", "R$ 149,90", "US$ 30"],
  ["TRIMESTRAL", "R$ 397,90", "US$ 80"],
  ["SEMESTRAL", "R$ 697,90", "US$ 145"],
  ["ANUAL", "R$ 1.197,90", "US$ 240"],
];

export default function SignalsPage() {
  const { locale, t, changeLocale } = useSiteLocale();
  const eliteCta = eliteLinkProps(locale, "/sinais");

  return (
    <main lang={locale === "hi" ?"hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="signals-hero premium-stage relative px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
        <div className="finance-particles" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-rise/[0.12] blur-3xl" />
        <div className="absolute left-0 top-36 h-80 w-80 rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow={t.signalBlock.eyebrow} title={t.signalBlock.title} text={t.signalBlock.text} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.signalBlock.stats.map((item) => (
                <div key={item} className="operational-chip border-l-2 border-rise bg-white p-4 shadow-fine">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
            <a
              {...eliteCta}
              className="premium-button-gold mt-8 inline-block border border-gold bg-gold px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {t.signalBlock.cta}
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel signal-terminal-wrap p-3"
          >
            <SignalTicket t={t} />
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Canal Elite"
            title="Como funciona o Canal Elite"
            text="O canal Elite entrega operações estruturadas ao vivo diretamente no WhatsApp com contexto operacional e gestão de risco."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item, index) => (
              <motion.article
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                variants={fadeUp}
                className="terminal-module relative overflow-hidden border border-rise/[0.18] bg-white p-6 shadow-fine"
              >
                <div className="absolute inset-0 terminal-grid opacity-25" />
                <p className="relative font-mono text-xs text-rise">0{index + 1}</p>
                <h3 className="relative mt-8 font-serif text-3xl leading-[1.03] tracking-[-0.04em]">{item}</h3>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 border border-rise/[0.18] bg-white p-6 shadow-fine md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Horários operacionais</p>
                <h3 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Horários operacionais</h3>
                <p className="mt-4 max-w-2xl leading-8 text-ink/[0.66]">
                  Os sinais são enviados geralmente nos principais períodos de liquidez do mercado, entre 8h e 15h, e
                  também entre 21h e 00h, no horário de Brasília.
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink/[0.48]">
                  Os horários podem variar conforme volatilidade, liquidez e oportunidades reais do mercado.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["MANHÃ E TARDE", "8h às 15h"],
                  ["NOITE", "21h às 00h"],
                ].map(([label, time]) => (
                  <div key={label} className="terminal-module border border-ink/[0.1] bg-paper p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-rise">{label}</p>
                    <p className="mt-4 font-mono text-3xl text-ink">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Método operacional"
            title="Sinais baseados no Ichimoku"
            text="Todos os sinais do Varejo Investidor são enviados com base na leitura do indicador Ichimoku, observando principalmente a nuvem, as médias, o posicionamento do preço, zonas de suporte, resistência e contexto do ativo."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div className="grid gap-3 sm:grid-cols-2">
              {ichimokuPoints.map((item) => (
                <div key={item} className="terminal-module border border-rise/[0.14] bg-paper p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/[0.72]">{item}</p>
                </div>
              ))}
            </div>
            <div className="terminal-module relative overflow-hidden border border-rise/[0.22] bg-ink p-3 shadow-premium md:p-4">
              <div className="absolute inset-0 terminal-grid opacity-30" />
              <div className="relative overflow-hidden border border-rise/[0.16] bg-paper/[0.035]">
                <Image
                  src="/signals/ichimoku-operacional.jpeg"
                  alt="Print operacional do indicador Ichimoku"
                  width={1599}
                  height={748}
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppSignalExample t={t} locale={locale} />

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Histórico"
            title="Relatório Elite desde agosto de 2018"
            text="Acompanhe a evolução operacional do Canal Elite através dos relatórios históricos enviados desde agosto de 2018."
          />
          <div className="mt-8 overflow-x-auto border border-ink/[0.12] bg-white shadow-fine">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.22em] text-gold">
                <tr>
                  {["DATA", "RELATÓRIO ELITE", "SINAIS", "RESULTADO", "STATUS", "DOWNLOAD"].map((heading) => (
                    <th key={heading} className="px-5 py-4 font-bold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((row) => (
                  <tr key={row[0]} className="border-b border-ink/[0.08] transition hover:bg-rise/[0.05]">
                    {row.map((cell, index) => (
                      <td
                        key={cell}
                        className={`px-5 py-5 text-sm ${index === 3 ?"font-mono font-bold text-rise" : "text-ink/[0.72]"}`}
                      >
                        {cell}
                      </td>
                    ))}
                    <td className="px-5 py-5">
                      <button
                        type="button"
                        className="border border-ink/[0.18] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:border-gold hover:text-gold"
                      >
                        VER
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Documental"
            title="Estrutura real de envio"
            text="Sinais enviados ao vivo diretamente no WhatsApp desde 2018."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="terminal-module relative min-h-[320px] overflow-hidden border border-rise/[0.16] bg-paper p-5"
              >
                <div className="absolute inset-0 terminal-grid opacity-30" />
                <div className="relative flex items-center justify-between border-b border-ink/[0.08] pb-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-rise">WhatsApp print 0{item}</p>
                  <span className="h-2 w-2 rounded-full bg-rise" />
                </div>
                <div className="relative mt-6 grid gap-3">
                  <div className="h-4 w-2/3 bg-paper/[0.08]" />
                  <div className="h-4 w-5/6 bg-paper/[0.08]" />
                  <div className="h-28 border border-ink/[0.08] bg-ink/[0.24]" />
                  <div className="h-4 w-1/2 bg-paper/[0.08]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Níveis"
            title="Escolha seu nível"
            text="Comece gratuitamente no Canal Formiga ou entre no Elite Harpia para acesso completo à estrutura operacional."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="terminal-module border border-rise/[0.22] bg-white p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-rise">Canal Formiga</p>
              <h3 className="mt-5 font-serif text-5xl tracking-[-0.05em]">Gratuito</h3>
              <div className="mt-6 grid gap-3">
                {formigaBullets.map((item) => (
                  <p key={item} className="border-l border-rise pl-4 text-sm uppercase tracking-[0.12em] text-ink/[0.66]">
                    {item}
                  </p>
                ))}
              </div>
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block border border-rise bg-rise px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-paper"
              >
                Entrar gratuitamente
              </a>
            </article>

            <article className="terminal-module relative overflow-hidden border border-gold bg-ink p-6 text-paper shadow-premium md:p-8">
              <div className="absolute inset-0 terminal-grid opacity-25" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Canal Elite Harpia</p>
                <h3 className="mt-5 font-serif text-5xl tracking-[-0.05em]">Estrutura Elite</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {eliteBullets.map((item) => (
                    <p key={item} className="border-l border-gold pl-4 text-sm uppercase tracking-[0.12em] text-paper/[0.72]">
                      {item}
                    </p>
                  ))}
                </div>
                <a
                  {...eliteCta}
                  className="premium-button-gold mt-8 block border border-gold bg-gold px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-ink"
                >
                  Entrar no Elite
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Pacotes"
            title="Acesso ao Elite"
            text="Escolha o pacote do Canal Elite Harpia para receber sinais ao vivo, análises, aulas gravadas e estrutura completa de mercado."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {prices.map(([period, price, usd], index) => (
              <article
                key={period}
                className={`terminal-module border p-6 ${index === 3 ?"border-gold bg-ink text-paper shadow-premium" : "border-ink/[0.1] bg-paper"}`}
              >
                {index === 3 ?(
                  <span className="mb-5 inline-block border border-gold bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                    Maior economia
                  </span>
                ) : null}
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{period}</p>
                <p className="mt-5 font-serif text-4xl tracking-[-0.05em]">{price}</p>
                <p className="mt-2 font-mono text-sm uppercase tracking-[0.16em] text-ink/[0.48]">{usd}</p>
                <a
                  {...eliteCta}
                  className={`mt-8 block border px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] ${index === 3 ?"border-gold bg-gold text-ink" : "border-ink bg-ink text-paper"}`}
                >
                  Entrar agora
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <BrokerBanners t={t} />

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
