"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import { fadeUp } from "../SiteSections";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  flowTitle: string;
  flowSteps: string[];
  sessionsTitle: string;
  sessions: { city: string; window: string; tone: string }[];
  quoteTitle: string;
  spreadLabel: string;
  bid: string;
  ask: string;
  moveTitle: string;
  moveExamples: { pair: string; move: string; impact: string; tone: "rise" | "bear" }[];
};

const copyPt: Copy = {
  eyebrow: "Como o mercado se move",
  title: "Liquidez, sessões e formação de preço em tempo real",
  subtitle:
    "O Forex não tem pregão único: ordens circulam entre bancos, liquidez agrega-se nos hubs globais e o preço que você vê é a soma de milhares de negócios por segundo.",
  flowTitle: "Da ordem ao preço no varejo",
  flowSteps: [
    "Investidor envia ordem na corretora",
    "Corretora roteia ao liquidity provider",
    "LP cruza com bancos e outros LPs",
    "Preço retorna com spread embutido",
    "Execução, swap e margem overnight",
  ],
  sessionsTitle: "Sobreposição de sessões (UTC)",
  sessions: [
    { city: "Tóquio", window: "00:00 – 09:00", tone: "bg-rise/20 border-rise/40" },
    { city: "Londres", window: "08:00 – 17:00", tone: "bg-gold/15 border-gold/35" },
    { city: "Nova York", window: "13:00 – 22:00", tone: "bg-paper/10 border-paper/25" },
  ],
  quoteTitle: "Cotação ao vivo (ilustrativa)",
  spreadLabel: "Spread",
  bid: "1.08421",
  ask: "1.08438",
  moveTitle: "Exemplos de movimento no par",
  moveExamples: [
    { pair: "EUR/USD", move: "+25 pips", impact: "Base se aprecia frente ao dólar", tone: "rise" },
    { pair: "GBP/USD", move: "-40 pips", impact: "Libra perde força após dado macro", tone: "bear" },
    { pair: "USD/JPY", move: "+0,8%", impact: "Carry e diferencial de juros à frente", tone: "rise" },
  ],
};

const copyEn: Copy = {
  eyebrow: "How the market moves",
  title: "Liquidity, sessions and live price discovery",
  subtitle:
    "There is no single exchange: orders flow through banks, liquidity stacks in global hubs, and your quote is the aggregation of thousands of trades per second.",
  flowTitle: "From order to retail price",
  flowSteps: [
    "Investor sends order to the broker",
    "Broker routes to liquidity provider",
    "LP matches with banks and other LPs",
    "Price returns with embedded spread",
    "Execution, swap and overnight margin",
  ],
  sessionsTitle: "Session overlap (UTC)",
  sessions: [
    { city: "Tokyo", window: "00:00 – 09:00", tone: "bg-rise/20 border-rise/40" },
    { city: "London", window: "08:00 – 17:00", tone: "bg-gold/15 border-gold/35" },
    { city: "New York", window: "13:00 – 22:00", tone: "bg-paper/10 border-paper/25" },
  ],
  quoteTitle: "Live quote (illustrative)",
  spreadLabel: "Spread",
  bid: "1.08421",
  ask: "1.08438",
  moveTitle: "Pair movement examples",
  moveExamples: [
    { pair: "EUR/USD", move: "+25 pips", impact: "Base strengthens vs the dollar", tone: "rise" },
    { pair: "GBP/USD", move: "-40 pips", impact: "Sterling weakens after macro data", tone: "bear" },
    { pair: "USD/JPY", move: "+0.8%", impact: "Carry and rate differential in play", tone: "rise" },
  ],
};

function ui(locale: Locale): Copy {
  if (locale === "en") return copyEn;
  if (locale === "es") {
    return {
      ...copyEn,
      eyebrow: "Cómo se mueve el mercado",
      title: "Liquidez, sesiones y formación de precios",
      subtitle:
        "No hay una bolsa única: las órdenes circulan entre bancos, la liquidez se concentra en hubs globales y tu cotización agrega miles de operaciones por segundo.",
      flowTitle: "De la orden al precio minorista",
      sessionsTitle: "Superposición de sesiones (UTC)",
      quoteTitle: "Cotización en vivo (ilustrativa)",
      spreadLabel: "Spread",
      moveTitle: "Ejemplos de movimiento",
    };
  }
  return copyPt;
}

function AnimatedQuote({ bid, ask, spreadLabel }: { bid: string; ask: string; spreadLabel: string }) {
  return (
    <div className="relative overflow-hidden border border-gold/[0.28] bg-ink p-6 shadow-premium [perspective:900px]">
      <div className="absolute inset-0 terminal-grid opacity-25" aria-hidden="true" />
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gold">EUR/USD</p>
      <motion.div
        className="relative mt-5 grid gap-4 sm:grid-cols-2"
        style={{ rotateX: 8, rotateY: -6 }}
      >
        <div className="border border-rise/30 bg-rise/[0.08] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Bid</p>
          <motion.p
            className="mt-2 font-mono text-2xl font-bold text-rise"
            animate={{ opacity: [1, 0.72, 1], y: [0, -2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {bid}
          </motion.p>
        </div>
        <div className="border border-bear/30 bg-bear/[0.08] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-paper/50">Ask</p>
          <motion.p
            className="mt-2 font-mono text-2xl font-bold text-bear"
            animate={{ opacity: [1, 0.72, 1], y: [0, 2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          >
            {ask}
          </motion.p>
        </div>
      </motion.div>
      <p className="mt-4 text-xs text-paper/55">
        {spreadLabel}: <span className="font-mono font-bold text-gold">1.7 pips</span>
      </p>
    </div>
  );
}

export function ForexMarketExperience({ locale }: { locale: Locale }) {
  const c = ui(locale);

  return (
    <section className="px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.eyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-paper md:text-5xl">
            {c.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68]">{c.subtitle}</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-gold/[0.2] bg-white p-6 text-paper shadow-fine md:p-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.flowTitle}</p>
            <ol className="mt-6 space-y-4">
              {c.flowSteps.map((step, index) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex gap-4 border border-gold/[0.14] bg-paper/[0.03] px-4 py-3"
                  style={{
                    transform: `translateZ(${index * 6}px)`,
                  }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xs font-black text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-7 text-paper/[0.78]">{step}</span>
                </motion.li>
              ))}
            </ol>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-gold">{c.sessionsTitle}</p>
            <div className="mt-4 grid gap-3">
              {c.sessions.map((session, i) => (
                <motion.div
                  key={session.city}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                  className={`flex items-center justify-between border px-4 py-3 ${session.tone}`}
                >
                  <span className="font-serif text-xl tracking-[-0.03em]">{session.city}</span>
                  <span className="font-mono text-xs text-paper/70">{session.window}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <AnimatedQuote bid={c.bid} ask={c.ask} spreadLabel={c.spreadLabel} />
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-gold/[0.2] bg-ink p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.quoteTitle}</p>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-gold/80">{c.moveTitle}</p>
              <div className="mt-4 space-y-3">
                {c.moveExamples.map((row) => (
                  <motion.div
                    key={row.pair}
                    whileHover={{ x: 6, rotateY: 4 }}
                    className="grid gap-2 border border-gold/[0.18] bg-paper/[0.04] p-4 sm:grid-cols-[auto_1fr]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.span
                      className={`font-mono text-lg font-bold ${row.tone === "rise" ? "text-rise" : "text-bear"}`}
                      animate={{ opacity: [1, 0.65, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    >
                      {row.pair} {row.move}
                    </motion.span>
                    <span className="text-sm leading-6 text-paper/[0.68]">{row.impact}</span>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
