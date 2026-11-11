"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import type { InstitutionalSection } from "../../data/institutionalMarketPages/types";
import { fadeUp } from "../SiteSections";

function pathCopy(locale: Locale) {
  if (locale === "pt") {
    return {
      eyebrow: "Roteiro de leitura",
      title: "Do básico ao aprofundado",
      hint: "Siga a ordem: primeiro entenda a ideia, depois veja o cenário em movimento e só então os detalhes técnicos.",
    };
  }
  if (locale === "es") {
    return {
      eyebrow: "Hoja de ruta",
      title: "De lo básico a lo profundo",
      hint: "Sigue el orden: primero la idea, luego el escenario en movimiento y al final los detalles.",
    };
  }
  return {
    eyebrow: "Reading path",
    title: "From basics to depth",
    hint: "Follow the order: grasp the idea, watch the motion scene, then read the technical details.",
  };
}

function stepLabel(index: number, title: string, locale: Locale): string {
  const t = title.toLowerCase();
  if (index === 0 || t.includes("panorama") || t.includes("overview")) {
    return locale === "pt" ? "Comece aqui" : locale === "es" ? "Empieza aquí" : "Start here";
  }
  if (t.includes("como funciona") || t.includes("how") || t.includes("funciona")) {
    return locale === "pt" ? "Como funciona" : locale === "es" ? "Cómo funciona" : "How it works";
  }
  if (t.includes("risco") || t.includes("risk") || t.includes("volatil")) {
    return locale === "pt" ? "Riscos" : locale === "es" ? "Riesgos" : "Risks";
  }
  return locale === "pt" ? "Aprofunde" : locale === "es" ? "Profundiza" : "Go deeper";
}

export function MarketLearningPath({ sections, locale }: { sections: InstitutionalSection[]; locale: Locale }) {
  const copy = pathCopy(locale);
  const steps = sections.slice(0, 6).map((s, i) => ({
    id: s.id,
    label: stepLabel(i, s.title, locale),
    title: s.title,
  }));

  return (
    <section className="border-b border-gold/[0.14] bg-[#06080c] px-5 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{copy.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] text-paper md:text-4xl">{copy.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-paper/60 md:text-base">{copy.hint}</p>
        </motion.div>
        <ol className="mt-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:overflow-visible">
          {steps.map((step, index) => (
            <li key={step.id} className="min-w-[140px] flex-1 md:min-w-0">
              <a
                href={`#${step.id}`}
                className="group block h-full border border-gold/[0.22] bg-ink/80 p-3 transition hover:border-gold/50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-xs font-black text-gold">
                  {index + 1}
                </span>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-rise">{step.label}</p>
                <p className="mt-1 line-clamp-2 font-serif text-sm leading-snug text-paper/80 group-hover:text-paper">
                  {step.title}
                </p>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
