"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import { fadeUp } from "../SiteSections";
import { getMarketExperienceCopy } from "./marketExperienceCopy";
import type { MarketExperienceSlug } from "./marketExperienceTypes";
import { MarketArchitecturePulse } from "./MarketArchitecturePulse";

function FlowPulse({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {steps.map((step, index) => (
        <motion.li
          key={step}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="relative text-center"
        >
          <motion.span
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 bg-ink text-xs font-black text-gold"
            animate={{ boxShadow: ["0 0 0 rgba(198,153,74,0)", "0 0 18px rgba(198,153,74,0.35)", "0 0 0 rgba(198,153,74,0)"] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
          >
            {index + 1}
          </motion.span>
          <p className="mt-3 text-xs leading-5 text-paper/[0.75]">{step}</p>
        </motion.li>
      ))}
    </ol>
  );
}

function LayerStack({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <div className="mt-5 space-y-2 [perspective:900px]">
      {items.map((layer, index) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, rotateX: 18, y: 20 }}
          whileInView={{ opacity: 1, rotateX: 8, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 8, rotateY: -4 }}
          style={{ transformStyle: "preserve-3d", marginLeft: index * 6 }}
          className="border border-gold/[0.2] bg-gradient-to-r from-ink to-[#121a2e] px-4 py-3 shadow-fine"
        >
          <p className="font-serif text-lg tracking-[-0.03em] text-gold">{layer.label}</p>
          <p className="mt-1 text-sm leading-6 text-paper/[0.68]">{layer.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}

function EtfNavVisual() {
  return (
    <div className="relative mt-5 border border-gold/[0.22] bg-ink p-4 [perspective:800px]">
      <motion.div
        className="grid gap-2 sm:grid-cols-3"
        style={{ rotateX: 12 }}
        animate={{ rotateY: [0, 4, 0, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {["NAV", "ETF price", "Premium"].map((label, i) => (
          <div key={label} className="border border-gold/25 bg-paper/[0.04] p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold">{label}</p>
            <motion.p
              className="mt-2 font-mono text-lg font-bold text-paper"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {i === 0 ? "100,00" : i === 1 ? "100,05" : "+0,05%"}
            </motion.p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function GoldUsdPulse() {
  return (
    <div className="relative mt-5 grid gap-3 sm:grid-cols-2 [perspective:800px]">
      {[
        { label: "XAU", value: "▲", tone: "text-rise border-rise/35 bg-rise/10" },
        { label: "USD", value: "▼", tone: "text-bear border-bear/35 bg-bear/10" },
      ].map((row, i) => (
        <motion.div
          key={row.label}
          animate={{ rotateY: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          className={`border p-4 text-center ${row.tone}`}
        >
          <p className="text-[10px] font-black uppercase tracking-widest">{row.label}</p>
          <p className="mt-2 font-mono text-2xl font-bold">{row.value}</p>
        </motion.div>
      ))}
    </div>
  );
}

function FuturesCurveVisual() {
  return (
    <div className="relative mt-5 h-32 border border-gold/[0.22] bg-ink px-4 py-3">
      <svg viewBox="0 0 320 80" className="h-full w-full" aria-hidden="true">
        <motion.path
          d="M 10 55 Q 90 50 160 35 T 310 25"
          fill="none"
          stroke="rgb(198,153,74)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <motion.path
          d="M 10 30 Q 90 38 160 48 T 310 58"
          fill="none"
          stroke="rgb(15,143,86)"
          strokeWidth="2"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
      </svg>
      <p className="mt-1 flex justify-between font-mono text-[10px] text-paper/45">
        <span>Spot</span>
        <span className="text-gold">Contango</span>
        <span className="text-rise">Backwardation</span>
      </p>
    </div>
  );
}

function FiiYieldBars() {
  const bars = [72, 88, 65, 91];
  return (
    <div className="mt-5 flex h-28 items-end justify-between gap-2 border border-gold/[0.22] bg-[#0a0e12] px-4 pb-3 pt-6">
      {bars.map((h, i) => (
        <motion.div
          key={h}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="w-full max-w-[52px] bg-gradient-to-t from-gold/80 to-gold/30"
        />
      ))}
    </div>
  );
}

function PipelineVisual() {
  const nodes = ["Poço", "Navio", "Refino", "Bomba"];
  return (
    <div className="relative mt-5 flex items-center justify-between overflow-x-auto border border-gold/[0.22] bg-[#0a0c08] px-4 py-6">
      {nodes.map((node, i) => (
        <div key={node} className="flex shrink-0 items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-[10px] font-black uppercase text-gold"
          >
            {i + 1}
          </motion.div>
          <span className="text-xs font-semibold text-paper/70">{node}</span>
          {i < nodes.length - 1 ? (
            <motion.span
              className="mx-2 hidden h-px w-8 bg-rise sm:block"
              animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function OrderBookVisual() {
  const levels = [
    { side: "ask", price: "182,40", size: "1,2k" },
    { side: "ask", price: "182,38", size: "800" },
    { side: "bid", price: "182,35", size: "2,1k" },
    { side: "bid", price: "182,33", size: "950" },
  ];
  return (
    <div className="relative mt-5 overflow-hidden border border-gold/[0.22] bg-[#0a0f18] p-4 [perspective:900px]">
      <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
      <motion.div style={{ rotateX: 10, rotateY: -8 }} className="relative space-y-2">
        {levels.map((row, i) => (
          <motion.div
            key={`${row.side}-${row.price}`}
            animate={{ x: row.side === "ask" ? [0, 4, 0] : [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
            className={`flex justify-between border px-3 py-2 font-mono text-xs ${
              row.side === "ask" ? "border-bear/30 bg-bear/[0.08] text-bear" : "border-rise/30 bg-rise/[0.08] text-rise"
            }`}
          >
            <span>{row.side === "ask" ? "Ask" : "Bid"}</span>
            <span>{row.price}</span>
            <span className="text-paper/50">{row.size}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function MarketExperienceSection({ slug, locale }: { slug: MarketExperienceSlug; locale: Locale }) {
  const c = getMarketExperienceCopy(slug, locale);

  return (
    <>
    <section className="border-t border-gold/[0.14] px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gold">{c.eyebrow}</p>
          <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-paper md:text-5xl">
            {c.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-paper/[0.68]">{c.subtitle}</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-gold/[0.2] bg-white p-6 text-paper shadow-fine md:p-8"
          >
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.flowTitle}</p>
            <div className="mt-6 border border-gold/[0.16] bg-paper/[0.03] p-4">
              <FlowPulse steps={c.flowSteps} />
            </div>
            {slug === "acoes" ? <OrderBookVisual /> : null}
            {slug === "etfs" ? <EtfNavVisual /> : null}
            {slug === "petroleo" ? <PipelineVisual /> : null}
            {slug === "ouro" ? <GoldUsdPulse /> : null}
            {slug === "commodities" ? <FuturesCurveVisual /> : null}
            {slug === "fundos-imobiliarios" ? <FiiYieldBars /> : null}

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-gold">{c.stackTitle}</p>
            <LayerStack items={c.stackItems} />
          </motion.article>

          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-gold/[0.2] bg-ink p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.compareTitle}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <motion.div
                  whileHover={{ rotateY: 6, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="border border-gold/30 bg-paper/[0.04] p-4"
                >
                  <h3 className="font-serif text-xl tracking-[-0.03em] text-gold">{c.leftCard.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {c.leftCard.points.map((point) => (
                      <li key={point} className="flex gap-2 text-xs leading-5 text-paper/[0.72]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  whileHover={{ rotateY: -6, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="border border-rise/30 bg-rise/[0.06] p-4"
                >
                  <h3 className="font-serif text-xl tracking-[-0.03em] text-rise">{c.rightCard.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {c.rightCard.points.map((point) => (
                      <li key={point} className="flex gap-2 text-xs leading-5 text-paper/[0.72]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rise" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>

            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-gold/[0.2] bg-ink p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.metricsTitle}</p>
              <p className="mt-2 text-xs leading-6 text-paper/55">{c.metricsHint}</p>
              <div className="mt-5 space-y-3">
                {c.metrics.map((row) => (
                  <motion.div
                    key={row.symbol}
                    whileHover={{ x: 6 }}
                    className="flex items-center justify-between border border-gold/[0.18] bg-paper/[0.04] px-4 py-3"
                  >
                    <span className="font-mono text-sm font-bold text-paper">{row.symbol}</span>
                    <span className="font-mono text-lg text-paper/90">{row.value}</span>
                    <motion.span
                      className={`font-mono text-sm font-bold ${row.tone === "rise" ? "text-rise" : "text-bear"}`}
                      animate={{ opacity: [1, 0.55, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                    >
                      {row.change}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-gold">{c.cycleTitle}</p>
              <div className="mt-4 grid gap-2">
                {c.cyclePhases.map((phase, i) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`border px-4 py-3 ${phase.tone}`}
                  >
                    <p className="font-serif text-lg tracking-[-0.03em]">{phase.phase}</p>
                    <p className="mt-1 text-xs leading-5 text-paper/[0.65]">{phase.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
    <MarketArchitecturePulse slug={slug} locale={locale} />
    </>
  );
}
