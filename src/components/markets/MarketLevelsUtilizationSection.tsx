"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import { fadeUp } from "../SiteSections";
import { MarketLevelCharacterStage, type MarketLevelId } from "./MarketLevelCharacterCard";

type LevelCard = {
  id: MarketLevelId;
  title: string;
  items: string[];
  href: string;
  tone: "rise" | "gold";
};

export function MarketLevelsUtilizationSection({
  locale,
  levelsTitle,
  levelCards,
}: {
  locale: Locale;
  levelsTitle: string;
  levelCards: LevelCard[];
}) {
  void locale;

  return (
    <section className="border-t border-gold/[0.14] bg-ink px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{levelsTitle}</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {levelCards.map((level) => (
            <motion.a
              key={level.id}
              href={level.href}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group terminal-module relative overflow-hidden border border-gold/[0.2] bg-white p-7 transition hover:-translate-y-1 hover:border-gold/[0.55] md:p-8"
            >
              <div className="absolute inset-0 terminal-grid opacity-40" />
              <div className="relative">
                <MarketLevelCharacterStage level={level.id} />
                <h3 className="font-serif text-3xl tracking-[-0.04em]">{level.title}</h3>
                <ul className="mt-6 space-y-3">
                  {level.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-paper/[0.7]">
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${level.tone === "rise" ? "bg-rise" : "bg-gold"}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
