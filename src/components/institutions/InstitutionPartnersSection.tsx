"use client";

import { motion } from "framer-motion";
import { InstitutionLogoCard } from "../private/InstitutionLogoCard";
import { brazilInstitutionBrands, globalInstitutionBrands } from "../../data/institutionBrands";
import { fadeUp } from "../SiteSections";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  brazilLabel: string;
  globalLabel: string;
};

/** Mesmo layout de instituições da página Private (BR + mundo). */
export function InstitutionPartnersSection({ eyebrow, title, text, brazilLabel, globalLabel }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-gold/[0.12] bg-ink px-5 py-16 text-paper md:px-8 md:py-20 lg:px-12 xl:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-[1280px]"
      >
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.04] tracking-[-0.045em] md:text-6xl">{title}</h2>
          </div>
          <p className="text-base leading-8 text-paper/[0.68] md:text-lg">{text}</p>
        </div>

        <div className="mt-12 grid gap-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-paper/[0.5]">{brazilLabel}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
              {brazilInstitutionBrands.map((brand) => (
                <InstitutionLogoCard key={brand.name} brand={brand} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-paper/[0.5]">{globalLabel}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
              {globalInstitutionBrands.map((brand) => (
                <InstitutionLogoCard key={brand.name} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
