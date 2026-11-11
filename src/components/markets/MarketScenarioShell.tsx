"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";

export function MarketScenarioShell({
  locale,
  hint,
  children,
}: {
  locale: Locale;
  hint: string;
  children: React.ReactNode;
}) {
  const caption =
    locale === "pt"
      ? "Cenário 3D · leia o movimento"
      : locale === "es"
        ? "Escenario 3D · siga el movimiento"
        : "3D scene · follow the motion";

  return (
    <div className="relative mt-6 overflow-hidden border border-gold/[0.22] bg-[#050810] [perspective:1100px]">
      <ScenarioBackground />
      <div className="relative p-4 md:p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold/70">{caption}</p>
        <motion.div
          className="relative mt-3 min-h-[220px] md:min-h-[300px]"
          style={{ transformStyle: "preserve-3d", rotateX: 8 }}
        >
          <ScenarioDepthFloor />
          {children}
        </motion.div>
        <p className="mt-3 text-xs leading-6 text-paper/55 md:text-sm">{hint}</p>
      </div>
    </div>
  );
}

export function ScenarioBackground() {
  return (
    <>
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15,143,86,0.22), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(198,153,74,0.12), transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <motion.div
        className="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-rise/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity }}
        aria-hidden="true"
      />
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold/60"
          style={{ left: `${12 + i * 14}%`, top: `${20 + (i % 3) * 22}%` }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

function ScenarioDepthFloor() {
  return (
    <div
      className="pointer-events-none absolute inset-x-[8%] bottom-2 h-24 [transform:perspective(600px)_rotateX(72deg)]"
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full rounded-[40%] border border-gold/20 bg-gradient-to-t from-rise/10 to-transparent"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </div>
  );
}
