"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";
import { fadeUp } from "../SiteSections";

type Copy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  chainTitle: string;
  chainHint: string;
  txTitle: string;
  txSteps: string[];
  layersTitle: string;
  layers: { id: string; label: string; detail: string }[];
  venueTitle: string;
  cexTitle: string;
  cexPoints: string[];
  dexTitle: string;
  dexPoints: string[];
  consensusTitle: string;
  powLabel: string;
  posLabel: string;
  marketTitle: string;
  marketHint: string;
  ticks: { symbol: string; price: string; change: string; tone: "rise" | "bear" }[];
  cycleTitle: string;
  cyclePhases: { phase: string; detail: string; tone: string }[];
  blockPrefix: string;
  genesisLabel: string;
  prevBlockLabel: string;
};

const copyPt: Copy = {
  eyebrow: "Como o ecossistema funciona",
  title: "Blockchain, liquidez e formação de preço em tempo real",
  subtitle:
    "Ativos digitais negociam 24/7 em redes abertas. Preço, adoção e risco emergem da interação entre validadores, exchanges, stablecoins, fluxos macro e narrativas de ciclo.",
  chainTitle: "Encadeamento de blocos (ilustrativo)",
  chainHint: "Cada bloco referencia o hash anterior. Alterar histórico exigiria refazer todo o trabalho de consenso.",
  txTitle: "Da carteira à confirmação on-chain",
  txSteps: [
    "Assinatura com chave privada",
    "Broadcast para a rede (mempool)",
    "Validadores/miners incluem no bloco",
    "Confirmações empilham segurança",
    "Saldo atualiza em nós da rede",
  ],
  layersTitle: "Camadas da economia digital (3D)",
  layers: [
    { id: "L0", label: "Camada 0", detail: "Energia, hardware e conectividade." },
    { id: "L1", label: "Camada 1", detail: "Bitcoin, Ethereum e blockchains base." },
    { id: "L2", label: "Camada 2", detail: "Rollups e canais de escalabilidade." },
    { id: "P", label: "Protocolos", detail: "DeFi, NFTs e identidade descentralizada." },
    { id: "A", label: "Apps", detail: "Carteiras, front-ends e aggregators." },
    { id: "F", label: "Fiat ramps", detail: "On-ramp, off-ramp e stablecoins." },
  ],
  venueTitle: "Onde a negociação acontece",
  cexTitle: "Exchange centralizada (CEX)",
  cexPoints: ["Matching off-chain rápido", "Depósito fiat via banco", "KYC e conformidade", "Custódia concentrada"],
  dexTitle: "Exchange descentralizada (DEX)",
  dexPoints: ["Pools automatizados on-chain", "Carteira conectada (non-custodial)", "Risco de smart contract", "Slippage em baixa liquidez"],
  consensusTitle: "Consenso que protege a rede",
  powLabel: "Proof of Work",
  posLabel: "Proof of Stake",
  marketTitle: "Mercado spot (cotações ilustrativas)",
  marketHint: "Volatilidade extrema é estrutural. Gestão de tamanho e custódia vêm antes da tese.",
  ticks: [
    { symbol: "BTC/USD", price: "97.842", change: "+2,4%", tone: "rise" },
    { symbol: "ETH/USD", price: "3.518", change: "+1,1%", tone: "rise" },
    { symbol: "SOL/USD", price: "198,4", change: "-3,2%", tone: "bear" },
  ],
  cycleTitle: "Ciclo de liquidez e narrativa",
  blockPrefix: "Bloco",
  genesisLabel: "Genesis",
  prevBlockLabel: "Ref. bloco",
  cyclePhases: [
    { phase: "Acumulação", detail: "Volume baixo, builders ativos, narrativa silenciosa.", tone: "border-gold/35 bg-gold/10" },
    { phase: "Expansão", detail: "Fluxos institucionais, adoção em destaque, correlação com risco.", tone: "border-rise/35 bg-rise/10" },
    { phase: "Euforia", detail: "Alavancagem alta, memecoins, spreads comprimidos.", tone: "border-gold/50 bg-gold/15" },
    { phase: "Correção", detail: "Liquidações, stress em stablecoins, regulação no foco.", tone: "border-bear/35 bg-bear/10" },
  ],
};

const copyEn: Copy = {
  eyebrow: "How the ecosystem works",
  title: "Blockchain, liquidity and live price discovery",
  subtitle:
    "Digital assets trade 24/7 on open networks. Price, adoption and risk emerge from validators, exchanges, stablecoins, macro flows and cycle narratives.",
  chainTitle: "Block chain (illustrative)",
  chainHint: "Each block references the previous hash. Rewriting history would require redoing consensus work.",
  txTitle: "From wallet to on-chain confirmation",
  txSteps: [
    "Signed with private key",
    "Broadcast to the network (mempool)",
    "Validators/miners include in a block",
    "Confirmations stack security",
    "Balance updates across network nodes",
  ],
  layersTitle: "Digital economy layers (3D)",
  layers: [
    { id: "L0", label: "Layer 0", detail: "Energy, hardware and connectivity." },
    { id: "L1", label: "Layer 1", detail: "Bitcoin, Ethereum and base chains." },
    { id: "L2", label: "Layer 2", detail: "Rollups and scalability channels." },
    { id: "P", label: "Protocols", detail: "DeFi, NFTs and decentralized identity." },
    { id: "A", label: "Apps", detail: "Wallets, front-ends and aggregators." },
    { id: "F", label: "Fiat ramps", detail: "On-ramp, off-ramp and stablecoins." },
  ],
  venueTitle: "Where trading happens",
  cexTitle: "Centralized exchange (CEX)",
  cexPoints: ["Fast off-chain matching", "Fiat bank deposits", "KYC and compliance", "Concentrated custody"],
  dexTitle: "Decentralized exchange (DEX)",
  dexPoints: ["Automated on-chain pools", "Connected wallet (non-custodial)", "Smart contract risk", "Slippage when liquidity is thin"],
  consensusTitle: "Consensus securing the network",
  powLabel: "Proof of Work",
  posLabel: "Proof of Stake",
  marketTitle: "Spot market (illustrative quotes)",
  marketHint: "Extreme volatility is structural. Sizing and custody come before the thesis.",
  ticks: [
    { symbol: "BTC/USD", price: "97,842", change: "+2.4%", tone: "rise" },
    { symbol: "ETH/USD", price: "3,518", change: "+1.1%", tone: "rise" },
    { symbol: "SOL/USD", price: "198.4", change: "-3.2%", tone: "bear" },
  ],
  cycleTitle: "Liquidity and narrative cycle",
  blockPrefix: "Block",
  genesisLabel: "Genesis",
  prevBlockLabel: "Prev. block",
  cyclePhases: [
    { phase: "Accumulation", detail: "Low volume, builders active, quiet narrative.", tone: "border-gold/35 bg-gold/10" },
    { phase: "Expansion", detail: "Institutional flows, adoption headlines, risk-on correlation.", tone: "border-rise/35 bg-rise/10" },
    { phase: "Euphoria", detail: "High leverage, memecoins, compressed spreads.", tone: "border-gold/50 bg-gold/15" },
    { phase: "Correction", detail: "Liquidations, stablecoin stress, regulation in focus.", tone: "border-bear/35 bg-bear/10" },
  ],
};

function ui(locale: Locale): Copy {
  if (locale === "en") return copyEn;
  if (locale === "es") {
    return {
      ...copyEn,
      eyebrow: "Cómo funciona el ecosistema",
      title: "Blockchain, liquidez y formación de precios",
      subtitle:
        "Los activos digitales operan 24/7 en redes abiertas. Precio, adopción y riesgo surgen de validadores, exchanges, stablecoins y narrativas de ciclo.",
      chainTitle: "Cadena de bloques (ilustrativo)",
      txTitle: "De la cartera a la confirmación on-chain",
      layersTitle: "Capas de la economía digital (3D)",
      venueTitle: "Dónde ocurre el trading",
      consensusTitle: "Consenso que protege la red",
      marketTitle: "Mercado spot (cotizaciones ilustrativas)",
      cycleTitle: "Ciclo de liquidez y narrativa",
    };
  }
  return copyPt;
}

const BLOCK_HASHES = ["#8f2a…c41", "#c41…9e0", "#9e0…11b", "#11b…7fd"];

function BlockchainChain({
  blockPrefix,
  genesisLabel,
  prevBlockLabel,
}: {
  blockPrefix: string;
  genesisLabel: string;
  prevBlockLabel: string;
}) {
  return (
    <div className="relative overflow-hidden border border-gold/[0.22] bg-[#0a1020] p-5 [perspective:1000px]">
      <div className="absolute inset-0 terminal-grid opacity-20" aria-hidden="true" />
      <motion.div
        className="relative flex gap-3 overflow-x-auto pb-2 pt-2"
        style={{ transformStyle: "preserve-3d", rotateX: 12 }}
      >
        {BLOCK_HASHES.map((hash, index) => (
          <motion.div
            key={hash}
            initial={{ opacity: 0, z: -40 }}
            whileInView={{ opacity: 1, z: index * 14 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="min-w-[140px] shrink-0 border border-gold/30 bg-ink/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-gold">
              {blockPrefix} {index + 1}
            </p>
            <p className="mt-2 font-mono text-xs text-rise">{hash}</p>
            <motion.div
              className="mt-3 h-1 bg-gradient-to-r from-gold/60 to-rise/60"
              animate={{ scaleX: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
            />
            <p className="mt-2 text-[10px] text-paper/45">
              {index === 0 ? genesisLabel : `${prevBlockLabel} ${index}`}
            </p>
          </motion.div>
        ))}
        <motion.div
          animate={{ x: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex min-w-[100px] items-center justify-center border border-dashed border-rise/40 px-3 text-[10px] font-bold uppercase tracking-wider text-rise"
        >
          + mempool
        </motion.div>
      </motion.div>
    </div>
  );
}

function TxPulse({ steps }: { steps: string[] }) {
  return (
    <div className="relative mt-6 border border-gold/[0.16] bg-paper/[0.03] p-4">
      <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-gold/25 md:block" aria-hidden="true" />
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
    </div>
  );
}

function LayerStack({ layers }: { layers: Copy["layers"] }) {
  return (
    <div className="relative mt-5 space-y-2 [perspective:900px]">
      {layers.map((layer, index) => (
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, rotateX: 18, y: 20 }}
          whileInView={{ opacity: 1, rotateX: 8, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 8, rotateY: -4 }}
          style={{
            transformStyle: "preserve-3d",
            zIndex: layers.length - index,
            marginLeft: index * 6,
          }}
          className="border border-gold/[0.2] bg-gradient-to-r from-ink to-[#121a2e] px-4 py-3 shadow-fine"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold text-gold">{layer.label}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-paper/40">{layer.id}</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-paper/[0.68]">{layer.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}

function ConsensusOrbit({ powLabel, posLabel }: { powLabel: string; posLabel: string }) {
  return (
    <div className="relative mt-5 flex h-44 items-center justify-center overflow-hidden border border-gold/[0.2] bg-ink [perspective:800px]">
      <motion.div
        className="absolute h-28 w-28 rounded-full border border-rise/35"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded border border-rise/40 bg-rise/10 px-2 py-0.5 text-[10px] font-bold uppercase text-rise">
          {powLabel}
        </span>
      </motion.div>
      <motion.div
        className="absolute h-20 w-20 rounded-full border border-gold/40"
        animate={{ rotateZ: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase text-gold">
          {posLabel}
        </span>
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="relative z-10 h-14 w-14 rounded-full border border-paper/20 bg-gradient-to-br from-gold/30 to-rise/20"
      />
    </div>
  );
}

export function CryptoMarketExperience({ locale }: { locale: Locale }) {
  const c = ui(locale);

  return (
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.chainTitle}</p>
            <p className="mt-2 text-sm leading-7 text-paper/[0.62]">{c.chainHint}</p>
            <div className="mt-5">
              <BlockchainChain
                blockPrefix={c.blockPrefix}
                genesisLabel={c.genesisLabel}
                prevBlockLabel={c.prevBlockLabel}
              />
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-gold">{c.txTitle}</p>
            <TxPulse steps={c.txSteps} />

            <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-gold">{c.layersTitle}</p>
            <LayerStack layers={c.layers} />
          </motion.article>

          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-gold/[0.2] bg-ink p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.venueTitle}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <motion.div
                  whileHover={{ rotateY: 6, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="border border-gold/30 bg-paper/[0.04] p-4"
                >
                  <h3 className="font-serif text-xl tracking-[-0.03em] text-gold">{c.cexTitle}</h3>
                  <ul className="mt-3 space-y-2">
                    {c.cexPoints.map((point) => (
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
                  <h3 className="font-serif text-xl tracking-[-0.03em] text-rise">{c.dexTitle}</h3>
                  <ul className="mt-3 space-y-2">
                    {c.dexPoints.map((point) => (
                      <li key={point} className="flex gap-2 text-xs leading-5 text-paper/[0.72]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rise" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-gold">{c.consensusTitle}</p>
              <ConsensusOrbit powLabel={c.powLabel} posLabel={c.posLabel} />
            </motion.div>

            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border border-gold/[0.2] bg-ink p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">{c.marketTitle}</p>
              <p className="mt-2 text-xs leading-6 text-paper/55">{c.marketHint}</p>
              <div className="mt-5 space-y-3">
                {c.ticks.map((row) => (
                  <motion.div
                    key={row.symbol}
                    whileHover={{ x: 6 }}
                    className="flex items-center justify-between border border-gold/[0.18] bg-paper/[0.04] px-4 py-3"
                  >
                    <span className="font-mono text-sm font-bold text-paper">{row.symbol}</span>
                    <span className="font-mono text-lg text-paper/90">{row.price}</span>
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
  );
}
