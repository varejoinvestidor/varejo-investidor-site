"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";

const LAYERS_PT = [
  { id: "Apps", label: "Aplicações", detail: "Carteiras, front-ends, agregadores", z: 0 },
  { id: "DeFi", label: "Protocolos DeFi", detail: "DEX, lending, stablecoins", z: 1 },
  { id: "L2", label: "Camada 2", detail: "Rollups, canais, provas", z: 2 },
  { id: "L1", label: "Camada 1", detail: "Consenso, blocos, validadores", z: 3 },
  { id: "L0", label: "Infra", detail: "Nós, miners, energia, rede", z: 4 },
];

const LAYERS_EN = [
  { id: "Apps", label: "Applications", detail: "Wallets, front-ends, aggregators", z: 0 },
  { id: "DeFi", label: "DeFi protocols", detail: "DEX, lending, stablecoins", z: 1 },
  { id: "L2", label: "Layer 2", detail: "Rollups, channels, proofs", z: 2 },
  { id: "L1", label: "Layer 1", detail: "Consensus, blocks, validators", z: 3 },
  { id: "L0", label: "Infrastructure", detail: "Nodes, miners, energy, network", z: 4 },
];

export function CryptoEcosystemHero3D({ locale }: { locale: Locale }) {
  const layers = locale === "en" || locale === "es" ? LAYERS_EN : LAYERS_PT;
  const title =
    locale === "en" || locale === "es" ? "Digital ecosystem architecture (3D)" : "Arquitetura do ecossistema digital (3D)";
  const hint =
    locale === "en" || locale === "es"
      ? "Value flows top-down from apps to settlement; security stacks bottom-up from infrastructure to user."
      : "Fluxo de valor desce das apps até a liquidação; segurança sobe da infraestrutura até o usuário.";

  return (
    <div className="relative overflow-hidden border border-gold/[0.25] bg-[#060a14] px-5 py-10 md:px-8 md:py-14">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,153,74,0.12),transparent_65%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{title}</p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-paper/[0.62]">{hint}</p>

        <div className="relative mt-10 flex min-h-[320px] items-center justify-center [perspective:1200px] md:min-h-[380px]">
          <motion.div
            className="relative w-full max-w-3xl"
            style={{ transformStyle: "preserve-3d", rotateX: 58, rotateZ: -12 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className="absolute left-1/2 w-[min(92%,520px)] -translate-x-1/2 border border-gold/[0.28] bg-gradient-to-r from-ink via-[#121a2e] to-ink px-5 py-4 shadow-[0_25px_50px_rgba(0,0,0,0.45)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${layer.z * 28}px) translateY(${index * -52}px)`,
                  zIndex: 10 - index,
                }}
                animate={{ translateY: [index * -52, index * -52 - 4, index * -52] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.1, ease: "easeInOut" }}
                whileHover={{ scale: 1.02, borderColor: "rgba(198,153,74,0.55)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-serif text-lg tracking-[-0.03em] text-paper">{layer.label}</span>
                  <span className="font-mono text-[10px] font-bold text-gold">{layer.id}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-paper/[0.55]">{layer.detail}</p>
                <motion.div
                  className="mt-2 h-0.5 bg-gradient-to-r from-transparent via-rise/60 to-transparent"
                  animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
              </motion.div>
            ))}

            {/* Fluxos laterais CEX / on-chain */}
            <motion.span
              className="absolute -left-2 top-1/3 rounded border border-rise/35 bg-rise/10 px-2 py-1 text-[9px] font-bold uppercase text-rise"
              animate={{ x: [-4, 4, -4], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              CEX
            </motion.span>
            <motion.span
              className="absolute -right-2 top-2/3 rounded border border-gold/35 bg-gold/10 px-2 py-1 text-[9px] font-bold uppercase text-gold"
              animate={{ x: [4, -4, 4], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              On-chain
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
