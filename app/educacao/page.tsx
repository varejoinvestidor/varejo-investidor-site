"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FreeChannelCTA,
  SectionHeader,
  SiteChrome,
  SupportFooter,
  fadeUp,
  useSiteLocale,
} from "../../src/components/SiteSections";
import { ForexBrokerBannerWide } from "../../src/components/ForexBrokerBannerWide";

const formationTracks = [
  {
    name: "FORMIGA - BASE FINANCEIRA",
    subtitle: "Organização, primeiros investimentos, disciplina, risco e fundamentos.",
    seal: "Base financeira",
    difficulty: "★☆☆☆☆ até ★★★★★",
    tone: "rise",
    levels: [
      ["F1", "Realidade financeira", "Organização, renda, contas, dívida e primeiro capital.", 1],
      ["F2", "Planejamento e disciplina", "Controle emocional, rotina financeira e construção de caixa.", 2],
      ["F3", "Primeiros mercados", "Introdução a Forex, cripto, ações, renda fixa e fundos imobiliários.", 3],
      ["F4", "Risco e proteção", "Gestão de risco, proteção de capital e leitura básica de mercado.", 4],
      ["F5", "Saída da base", "Preparação para operar com mais clareza e evoluir para o nível Lobo.", 5],
    ],
  },
  {
    name: "LOBO - ESTRATÉGIA E EXPANSÃO",
    subtitle: "Leitura de mercado, operação, ciclos, risco avançado e posicionamento.",
    seal: "Estratégia operacional",
    difficulty: "★★★☆☆ até ★★★★★",
    tone: "gold",
    levels: [
      ["L1", "Decisão operacional", "Leitura de fluxo, cenário e tomada de decisão.", 3],
      ["L2", "Mercado internacional", "Forex, cripto, ouro, petróleo, índices e moedas globais.", 4],
      ["L3", "Ciclos e correlações", "Relação entre ativos, liquidez, macroeconomia e cenário global.", 5],
      ["L4", "Gestão de carteira", "Risco avançado, proteção, alocação e posicionamento.", 5],
      ["L5", "Visão patrimonial", "Preparação para patrimônio, estrutura e nível Harpia.", 5],
    ],
  },
  {
    name: "HARPIA - PATRIMÔNIO GLOBAL",
    subtitle: "Patrimônio, proteção, sucessão, moedas fortes e estrutura internacional.",
    seal: "Patrimônio global",
    difficulty: "★★★★★",
    tone: "gold",
    levels: [
      ["H1", "Visão macro global", "Leitura institucional, geopolítica, juros, moedas e fluxo internacional.", 5],
      ["H2", "Proteção patrimonial", "Preservação de capital, diversificação e alocação estratégica.", 5],
      ["H3", "Estrutura familiar", "Sucessão, patrimônio geracional e construção de longo prazo.", 5],
      ["H4", "Expansão internacional", "Moedas fortes, ativos globais, contas internacionais e proteção.", 5],
      ["H5", "Estrutura de elite", "Preservação, decisão patrimonial e visão acima do mercado.", 5],
    ],
  },
] as const;

const formationSteps = ["F1", "F2", "F3", "F4", "F5", "L1", "L2", "L3", "L4", "L5", "H1", "H2", "H3", "H4", "H5"];

const formationRows = formationTracks.flatMap((track) =>
  track.levels.map(([code, title, objective, progress]) => ({
    code,
    phase: track.name.split(" - ")[0],
    title,
    objective,
    progress,
  })),
);

function ProgressMarks({ value }: { value: number }) {
  return (
    <div className="flex gap-1" aria-label={`Evolução ${value} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-5 border border-gold/[0.22] ${index < value ? "bg-gold" : "bg-ink/[0.55]"}`}
        />
      ))}
    </div>
  );
}

export default function EducationPage() {
  const { locale, t, changeLocale } = useSiteLocale();

  return (
    <main lang={locale === "hi" ? "hi" : undefined} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section className="premium-stage px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Educação"
            title="FORMAÇÃO VAREJO INVESTIDOR"
            text="Uma grade educacional em 15 níveis para desenvolver visão financeira, leitura de mercado, operação, risco, patrimônio e estrutura global."
          />
          <div className="mt-6 inline-flex border border-gold/[0.32] bg-gold/[0.08] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            FORMIGA 1-5 • LOBO 1-5 • HARPIA 1-5
          </div>
          <div className="mt-8">
            <FreeChannelCTA t={t} />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white px-5 py-16 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="education-levels-visual relative mx-auto mb-12 flex max-w-[980px] justify-center md:mb-16"
        >
          <div className="education-levels-glow" />
          <div className="education-levels-floor" />
          <Image
            src="/characters/services-hero-team.png"
            alt="Personagens Formiga, Lobo e Harpia do Varejo Investidor"
            width={1080}
            height={1350}
            sizes="(min-width: 1024px) 980px, 94vw"
            className="education-levels-image education-levels-image-portrait relative z-10"
          />
        </motion.div>

        <div className="mx-auto mb-10 max-w-7xl border border-gold/[0.22] bg-ink/[0.72] p-5 shadow-premium md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Matriz de evolução</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] text-paper">FORMIGA → LOBO → HARPIA</h2>
            </div>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
              {formationSteps.map((step, index) => (
                <div key={step} className="grid place-items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${index < 5 ? "bg-rise" : "bg-gold"}`} />
                  <span className="font-mono text-xs font-bold text-paper/[0.76]">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 h-px bg-gradient-to-r from-rise via-gold to-gold" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {formationTracks.map((track, index) => (
            <motion.article
              key={track.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              variants={fadeUp}
              className="education-academic-card relative overflow-hidden border border-ink/[0.1] bg-paper p-6 shadow-fine md:p-7"
            >
              <div className="absolute inset-0 luxury-grid opacity-35" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{track.seal}</p>
                  <span className="font-mono text-xs text-gold">{track.difficulty}</span>
                </div>
                <h2 className="mt-4 font-serif text-4xl leading-[1] tracking-[-0.04em]">{track.name}</h2>
                <p className="mt-5 leading-8 text-ink/[0.66]">{track.subtitle}</p>
                <div className="mt-6 h-1 bg-ink/[0.28]">
                  <div className={`h-full ${track.tone === "rise" ? "bg-rise" : "bg-gold"}`} style={{ width: `${(index + 1) * 33}%` }} />
                </div>
                <div className="mt-6 grid gap-3">
                  {track.levels.map(([code, title, objective, progress]) => (
                    <div key={code} className="border border-ink/[0.08] bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-sm font-bold text-gold">{code}</span>
                        <ProgressMarks value={progress} />
                      </div>
                      <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-ink">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-ink/[0.68]">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <SectionHeader
            eyebrow="Grade acadêmica"
            title="GRADE COMPLETA DA FORMAÇÃO"
            text="A matriz de desenvolvimento organizada por nível, fase, objetivo, conteúdos principais e evolução."
          />
          <div className="mt-8 overflow-x-auto border border-ink/[0.12] bg-white shadow-fine">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.18em] text-gold">
                <tr>
                  {["Nível", "Fase", "Objetivo", "Conteúdos principais", "Evolução"].map((heading) => (
                    <th key={heading} className="px-4 py-4 font-bold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formationRows.map((row) => (
                  <tr key={row.code} className="border-b border-ink/[0.08] transition hover:bg-gold/[0.04]">
                    <td className="px-4 py-4 font-mono text-sm font-bold text-gold">{row.code}</td>
                    <td className="px-4 py-4 text-sm font-bold uppercase tracking-[0.14em] text-ink/[0.72]">{row.phase}</td>
                    <td className="px-4 py-4 text-sm text-ink">{row.title}</td>
                    <td className="px-4 py-4 text-sm leading-7 text-ink/[0.68]">{row.objective}</td>
                    <td className="px-4 py-4">
                      <ProgressMarks value={row.progress} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          <div
            aria-disabled="true"
            className="cursor-not-allowed border border-gold/[0.45] bg-ink/[0.88] px-6 py-8 text-center shadow-premium md:px-10 md:py-10"
          >
            <div className="mx-auto grid h-11 w-11 place-items-center border border-gold/[0.55] font-mono text-lg font-bold text-gold">
              X
            </div>
            <h2 className="mt-5 font-serif text-5xl tracking-[-0.05em] text-gold md:text-6xl">FORMAÇÃO EM EXPANSÃO</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
              A trilha educacional completa Formiga, Lobo e Harpia será liberada progressivamente dentro do ecossistema Varejo Investidor.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm uppercase tracking-[0.16em] text-paper/[0.52]">
              Novas aulas, módulos e materiais serão adicionados por fase.
            </p>
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
