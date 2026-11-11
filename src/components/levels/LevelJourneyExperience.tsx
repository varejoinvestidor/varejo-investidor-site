"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LevelId } from "../../data/institutionalLevelPages";
import { getLevelJourneyCopy } from "../../data/levelJourneyCopy";
import type { Locale } from "../../i18n";
import { localizedPath } from "../../i18n/routing";
import { fadeUp } from "../SiteSections";

function BiomeScene3D({ level }: { level: LevelId }) {
  const accent =
    level === "formiga" ? "border-rise/45 bg-rise/10" : level === "lobo" ? "border-gold/45 bg-gold/10" : "border-paper/25 bg-paper/10";
  const nodes =
    level === "formiga"
      ? ["Rotina", "Estoque", "Cooperação", "Trilha", "Defesa"]
      : level === "lobo"
        ? ["Matilha", "Território", "Caça", "Comunicação", "Paciência"]
        : ["Dossel", "Visão", "Macro", "Patrimônio", "Paciência"];

  return (
    <div className="relative min-h-[220px] overflow-hidden border border-gold/[0.2] bg-ink [perspective:1000px] md:min-h-[260px]">
      <div className="absolute inset-0 terminal-grid opacity-25" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d", rotateX: 52, rotateZ: -8 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className={`absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 border-2 ${accent} shadow-[0_30px_60px_rgba(0,0,0,0.5)]`}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {nodes.map((label, i) => {
          const angle = (i / nodes.length) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 22;
          return (
            <motion.span
              key={label}
              className="absolute rounded border border-gold/30 bg-paper/[0.08] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-gold"
              style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
              animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.15 }}
            >
              {label}
            </motion.span>
          );
        })}
      </motion.div>
      <p className="absolute bottom-3 left-4 text-[10px] font-black uppercase tracking-[0.2em] text-paper/45">Mapa 3D · {level}</p>
    </div>
  );
}

function nextLevelHref(level: LevelId, locale: Locale): string {
  if (level === "formiga") return localizedPath("/nivel-lobo", locale);
  if (level === "lobo") return localizedPath("/nivel-harpia", locale);
  return localizedPath("/educacao", locale);
}

export function LevelJourneyExperience({ level, locale }: { level: LevelId; locale: Locale }) {
  const copy = getLevelJourneyCopy(level, locale);
  const nextHref = nextLevelHref(level, locale);

  const blocks = [
    { title: copy.lifeTitle, text: copy.lifeText },
    { title: copy.behaviorTitle, text: copy.behaviorText },
    { title: copy.environmentTitle, text: copy.environmentText },
  ];

  return (
    <section className="border-y border-gold/[0.12] bg-ink px-5 py-14 text-paper md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{copy.eyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.04em] md:text-5xl">{copy.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68]">{copy.intro}</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <BiomeScene3D level={level} />
          <div className="space-y-5">
            {blocks.map((block, index) => (
              <motion.article
                key={block.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-gold/[0.18] bg-paper/[0.04] p-5 md:p-6"
              >
                <h3 className="font-serif text-2xl tracking-[-0.03em] text-gold">{block.title}</h3>
                <p className="mt-3 text-sm leading-7 text-paper/[0.72] md:text-base md:leading-8">{block.text}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-gold/[0.22] bg-white p-6 text-ink shadow-fine md:p-8"
          >
            <h3 className="font-serif text-2xl tracking-[-0.03em]">{copy.structureTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-ink/[0.68]">
              {copy.structureBullets.map((item) => (
                <li key={item} className="flex gap-2 border-l-2 border-gold/40 pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-bear/25 bg-bear/[0.08] p-6 md:p-8"
          >
            <h3 className="font-serif text-2xl tracking-[-0.03em] text-bear">{copy.difficultiesTitle}</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-paper/[0.75]">
              {copy.difficulties.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bear" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 border border-gold/[0.35] bg-gradient-to-br from-gold/[0.14] to-ink p-8 md:p-10 [perspective:900px]"
        >
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{copy.nextTitle}</p>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-paper/[0.78]">{copy.nextTeaser}</p>
          <Link
            href={nextHref}
            className="premium-button-gold mt-8 inline-flex min-h-12 items-center justify-center border border-gold bg-gold px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
          >
            {copy.nextCta} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
