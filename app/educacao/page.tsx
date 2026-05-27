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
    id: "formiga",
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
    id: "lobo",
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
    id: "harpia",
    name: "HARPIA - PATRIMÔNIO GLOBAL",
    subtitle: "Patrimônio, proteção, sucessão, moedas fortes e estrutura internacional.",
    seal: "Patrimônio global",
    difficulty: "★★★★★",
    tone: "elite",
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
    <div className="education-progress-bars flex gap-1" aria-label={`Evolução ${value} de 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-5 border border-gold/[0.22] ${index < value ? "is-filled bg-gold" : "bg-ink/[0.55]"}`}
          style={{ transitionDelay: `${index * 45}ms` }}
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

      <section id="topo" className="education-hero premium-stage px-5 pb-8 pt-32 md:px-8 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Educação"
            title="FORMAÇÃO VAREJO INVESTIDOR"
            text="Uma grade educacional em 15 níveis para desenvolver visão financeira, leitura de mercado, operação, risco, patrimônio e estrutura global."
          />
          <div className="mt-6 inline-flex border border-gold/[0.32] bg-gold/[0.08] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            FORMIGA 1-5 • LOBO 1-5 • HARPIA 1-5
          </div>
        </div>
      </section>
      <section id="matriz" className="education-campus-section border-y border-gold/[0.08] bg-ink px-5 pb-16 pt-0 md:px-8 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="education-levels-visual relative mx-auto -mt-10 mb-8 flex max-w-[1280px] justify-center md:-mt-16 md:mb-10"
        >
          <div className="education-levels-glow" />
          <div className="education-levels-floor" />
          <Image
            src="/characters/education-formation-premium.png"
            alt="Personagens Formiga, Lobo e Harpia do Varejo Investidor"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 1120px, 96vw"
            className="education-levels-image education-levels-image-portrait relative z-10"
          />
        </motion.div>

        <div className="education-transition-line mx-auto mb-8 max-w-7xl" />

        <div className="education-matrix mx-auto mb-10 max-w-7xl border border-gold/[0.22] bg-ink/[0.72] p-6 shadow-premium md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">Matriz de evolução</p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.04em] text-paper">FORMIGA → LOBO → HARPIA</h2>
            </div>
            <div className="education-step-grid grid grid-cols-5 gap-3 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
              {formationSteps.map((step, index) => (
                <div key={step} className="education-step-node grid place-items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${index < 5 ? "bg-rise" : "bg-gold"}`} />
                  <span className="font-mono text-xs font-bold text-paper/[0.76]">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="education-matrix-line mt-6 h-px bg-gradient-to-r from-rise via-gold to-gold" />
        </div>

        <div id="formacao" className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {formationTracks.map((track, index) => (
            <motion.article
              key={track.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              variants={fadeUp}
              className={`education-academic-card education-track-${track.id} relative overflow-hidden border border-ink/[0.1] bg-paper p-6 shadow-fine md:p-7`}
            >
              <div className="absolute inset-0 luxury-grid opacity-35" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{track.seal}</p>
                  <span className="font-mono text-xs text-gold">{track.difficulty}</span>
                </div>
                <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.04em]">{track.name}</h2>
                <p className="mt-5 text-[15px] leading-8 text-ink/[0.68]">{track.subtitle}</p>
                <div className="education-track-line mt-7 h-1 bg-ink/[0.28]">
                  <div className={`h-full ${track.tone === "rise" ? "bg-rise" : "bg-gold"}`} style={{ width: `${(index + 1) * 33}%` }} />
                </div>
                <div className="mt-7 grid gap-4">
                  {track.levels.map(([code, title, objective, progress]) => (
                    <div key={code} className="education-level-row border border-ink/[0.08] bg-white p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-sm font-bold text-gold">{code}</span>
                        <ProgressMarks value={progress} />
                      </div>
                      <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-ink">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-ink/[0.68]">{objective}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div id="grade" className="mx-auto mt-16 max-w-7xl">
          <SectionHeader
            eyebrow="Grade acadêmica"
            title="GRADE COMPLETA DA FORMAÇÃO"
            text="A matriz de desenvolvimento organizada por nível, fase, objetivo, conteúdos principais e evolução."
          />
          <div className="education-table mt-8 overflow-x-auto border border-ink/[0.12] bg-white shadow-fine">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="border-b border-ink/[0.1] bg-paper/[0.04] text-xs uppercase tracking-[0.18em] text-gold">
                <tr>
                  {["Nível", "Fase", "Objetivo", "Conteúdos principais", "Evolução"].map((heading) => (
                    <th key={heading} className="px-5 py-5 font-bold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formationRows.map((row) => (
                  <tr key={row.code} className="border-b border-ink/[0.06] transition hover:bg-gold/[0.045]">
                    <td className="px-5 py-5 font-mono text-sm font-bold text-gold">{row.code}</td>
                    <td className="px-5 py-5 text-sm font-bold uppercase tracking-[0.14em] text-ink/[0.72]">
                      <span className="mr-2 text-gold">✦</span>
                      {row.phase}
                    </td>
                    <td className="px-5 py-5 text-sm text-ink">{row.title}</td>
                    <td className="px-5 py-5 text-sm leading-7 text-ink/[0.68]">{row.objective}</td>
                    <td className="px-5 py-5">
                      <ProgressMarks value={row.progress} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="expansao" className="mx-auto mt-10 max-w-7xl">
          <div
            aria-disabled="true"
            className="education-expansion relative cursor-not-allowed overflow-hidden border border-gold/[0.45] bg-ink/[0.88] px-6 py-8 text-center shadow-premium md:px-10 md:py-10"
          >
            <div className="absolute inset-0 terminal-grid opacity-20" />
            <div className="relative mx-auto grid h-11 w-11 place-items-center border border-gold/[0.55] font-mono text-lg font-bold text-gold">
              X
            </div>
            <h2 className="relative mt-5 font-serif text-5xl tracking-[-0.05em] text-gold md:text-6xl">FORMAÇÃO EM EXPANSÃO</h2>
            <p className="relative mx-auto mt-4 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
              A trilha educacional completa Formiga, Lobo e Harpia será liberada progressivamente dentro do ecossistema Varejo Investidor.
            </p>
            <p className="relative mx-auto mt-3 max-w-3xl text-sm uppercase tracking-[0.16em] text-paper/[0.52]">
              Novas aulas, módulos e materiais serão adicionados por fase.
            </p>
            <p className="relative mx-auto mt-4 max-w-3xl text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Atualizações contínuas da estrutura educacional global.
            </p>
          </div>
        </div>
      </section>

      <ForexBrokerBannerWide language={locale} />

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
