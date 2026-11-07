"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "./SiteSections";

export type InstitutionalServiceTone = "elite" | "select" | "platinum" | "mentorship";

const TONE_STYLES: Record<InstitutionalServiceTone, string> = {
  elite: "terminal-module border border-gold bg-ink text-paper shadow-premium",
  select: "terminal-module border border-gold/[0.3] bg-ink text-paper shadow-premium",
  platinum: "terminal-module border border-gold bg-ink text-paper shadow-premium",
  mentorship: "terminal-module border border-ink/[0.14] bg-paper text-ink shadow-premium",
};

type InstitutionalServiceCardProps = {
  tone?: InstitutionalServiceTone;
  className?: string;
  children: ReactNode;
  delay?: number;
};

export function InstitutionalServiceCard({ tone = "elite", className = "", children, delay = 0 }: InstitutionalServiceCardProps) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      variants={fadeUp}
      className={`relative flex min-h-[520px] flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 md:p-8 ${TONE_STYLES[tone]} ${className}`}
    >
      <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-gold/[0.08] blur-3xl" aria-hidden="true" />
      <div className="relative flex h-full flex-col">{children}</div>
    </motion.article>
  );
}
