"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { playWhatsAppNotification } from "../../lib/whatsappNotificationSound";
import { WhatsAppPhoneSignal3D } from "./WhatsAppPhoneSignal3D";

type Props = {
  contactName?: string;
  signalId: string;
  asset: string;
  direction: string;
  entry: string;
  takeProfit: string;
  stopLoss: string;
  time?: string;
  analysisTitle: string;
  analysis: string;
  className?: string;
};

export function WhatsAppSignalDemo({
  contactName,
  signalId,
  asset,
  direction,
  entry,
  takeProfit,
  stopLoss,
  time,
  analysisTitle,
  analysis,
  className = "",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.35, margin: "0px 0px -8% 0px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase(3);
      return;
    }

    const playTimer = window.setTimeout(() => {
      playWhatsAppNotification();
      setPhase(1);
    }, 350);
    const messageTimer = window.setTimeout(() => setPhase(2), 1100);
    const analysisTimer = window.setTimeout(() => {
      setPhase(3);
      analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 2200);

    return () => {
      window.clearTimeout(playTimer);
      window.clearTimeout(messageTimer);
      window.clearTimeout(analysisTimer);
    };
  }, [inView]);

  return (
    <div ref={rootRef} className={`flex flex-col items-center ${className}`}>
      <WhatsAppPhoneSignal3D
        contactName={contactName}
        signalId={signalId}
        asset={asset}
        direction={direction}
        entry={entry}
        takeProfit={takeProfit}
        stopLoss={stopLoss}
        time={time}
        variant="index"
        phase={phase}
      />
      <motion.div
        ref={analysisRef}
        initial={{ opacity: 0, y: 28, maxHeight: 0 }}
        animate={
          phase >= 3
            ? { opacity: 1, y: 0, maxHeight: 320 }
            : { opacity: 0, y: 28, maxHeight: 0 }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 w-full max-w-md overflow-hidden border-l-2 border-rise bg-rise/[0.08] p-4"
        aria-hidden={phase < 3}
      >
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-rise">{analysisTitle}</p>
        <p className="mt-2 leading-7 text-ink/[0.7]">{analysis}</p>
        {phase >= 3 ? (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink/45">US500 · gráfico diário</p>
        ) : null}
      </motion.div>
    </div>
  );
}
