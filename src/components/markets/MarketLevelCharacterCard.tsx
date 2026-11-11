"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LEVEL_HERO_MEDIA } from "../../data/institutionalLevelPages/types";

export type MarketLevelId = "formiga" | "lobo" | "harpia";

const LEVEL_MEDIA: Record<
  MarketLevelId,
  { src: string; alt: string; glow: string; objectPosition: string; panelClass: string }
> = {
  formiga: {
    src: LEVEL_HERO_MEDIA.formiga.hero,
    alt: LEVEL_HERO_MEDIA.formiga.heroAlt,
    glow: "rgba(15,143,86,0.38)",
    objectPosition: "50% 92%",
    panelClass: "bg-[#0a2818]",
  },
  lobo: {
    src: LEVEL_HERO_MEDIA.lobo.hero,
    alt: LEVEL_HERO_MEDIA.lobo.heroAlt,
    glow: "rgba(198,153,74,0.35)",
    objectPosition: "50% 88%",
    panelClass: "bg-[#12100a]",
  },
  harpia: {
    src: LEVEL_HERO_MEDIA.harpia.hero,
    alt: LEVEL_HERO_MEDIA.harpia.heroAlt,
    glow: "rgba(120,160,220,0.28)",
    objectPosition: "50% 86%",
    panelClass: "bg-[#0c1424]",
  },
};

export function MarketLevelCharacterStage({ level }: { level: MarketLevelId }) {
  const media = LEVEL_MEDIA[level];

  return (
    <div
      className={`relative mb-6 h-52 overflow-hidden border border-gold/[0.22] [perspective:900px] md:h-56 ${media.panelClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" aria-hidden="true" />
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, ${media.glow}, transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04), transparent 50%)`,
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 top-2 px-1"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-contain object-bottom"
            style={{ objectPosition: media.objectPosition }}
          />
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent" aria-hidden="true" />
      <motion.div
        className="absolute left-3 top-3 h-10 w-10 rounded-full border border-gold/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
    </div>
  );
}
