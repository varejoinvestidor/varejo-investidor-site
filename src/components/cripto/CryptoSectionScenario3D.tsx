"use client";

import { motion } from "framer-motion";
import type { Locale } from "../../i18n";

type ScenarioId =
  | "panorama"
  | "blockchain"
  | "participants"
  | "drivers"
  | "onchain"
  | "defi"
  | "education"
  | "risk"
  | "layers";

function resolveScenario(title: string): ScenarioId {
  const t = title.toLowerCase();
  if (t.includes("ativos digitais") || t.includes("digital assets") || t.includes("open network")) return "panorama";
  if (t.includes("blockchain") || t.includes("como funciona")) return "blockchain";
  if (t.includes("participante") || t.includes("infrastructure") || t.includes("infraestrutura")) return "participants";
  if (t.includes("preço") || t.includes("adoção") || t.includes("price") || t.includes("adoption")) return "drivers";
  if (t.includes("on-chain") || t.includes("indicador") || t.includes("macro")) return "onchain";
  if (t.includes("defi") || t.includes("tokenização") || t.includes("tokenization")) return "defi";
  if (t.includes("oportunidade") || t.includes("educacion") || t.includes("limites")) return "education";
  if (t.includes("risco") || t.includes("volatilidade") || t.includes("custódia") || t.includes("risk")) return "risk";
  if (t.includes("camadas") || t.includes("economia digital") || t.includes("layers")) return "layers";
  return "panorama";
}

function SceneShell({
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
      <CardBackground />
      <div className="relative p-4 md:p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold/70">{caption}</p>
        <div className="relative mt-3 min-h-[200px] md:min-h-[260px]">{children}</div>
        <p className="mt-3 text-xs leading-6 text-paper/55 md:text-sm">{hint}</p>
      </div>
    </div>
  );
}

function CardBackground() {
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <motion.div
        className="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-rise/10 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </>
  );
}

function PanoramaScene() {
  return (
    <motion.div className="relative h-full w-full" style={{ transformStyle: "preserve-3d", rotateX: 48 }}>
      {["BTC", "ETH", "Rede", "Carteira", "Validador"].map((label, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 36}px)` }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + i * 0.2, repeat: Infinity }}
          >
            <span className="block rounded border border-gold/40 bg-ink/90 px-2 py-1 text-[9px] font-bold uppercase text-gold shadow-lg">
              {label}
            </span>
          </motion.div>
        );
      })}
      <motion.div
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rise/50 bg-rise/15 shadow-[0_0_40px_rgba(15,143,86,0.4)]"
        animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 20px rgba(15,143,86,0.3)", "0 0 50px rgba(15,143,86,0.5)", "0 0 20px rgba(15,143,86,0.3)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="flex h-full items-center justify-center text-[10px] font-black text-rise">REDE</span>
      </motion.div>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
          animate={{ rotateZ: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 14 + i * 4, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}

function BlockchainScene() {
  const blocks = ["Bloco 1", "Bloco 2", "Bloco 3", "Bloco 4"];
  return (
    <motion.div className="flex h-full items-center justify-center gap-2 overflow-x-auto px-2" style={{ transformStyle: "preserve-3d", rotateX: 38 }}>
      {blocks.map((b, i) => (
        <div key={b} className="flex shrink-0 items-center gap-1">
          <motion.div
            initial={{ opacity: 0, z: -30 }}
            whileInView={{ opacity: 1, z: i * 12 }}
            viewport={{ once: true }}
            className="w-[88px] border border-gold/35 bg-gradient-to-b from-[#121a2e] to-ink p-2 shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
          >
            <p className="text-[8px] font-black uppercase text-gold">{b}</p>
            <motion.div className="mt-1 h-1 bg-rise/60" animate={{ scaleX: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }} />
            <p className="mt-1 font-mono text-[7px] text-paper/50">hash…{i + 1}a</p>
          </motion.div>
          {i < blocks.length - 1 ? (
            <motion.span className="text-rise" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}>
              →
            </motion.span>
          ) : null}
        </div>
      ))}
      <motion.span
        className="absolute bottom-4 left-4 rounded border border-rise/30 bg-rise/10 px-2 py-0.5 text-[8px] font-bold uppercase text-rise"
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        + mempool
      </motion.span>
    </motion.div>
  );
}

function ParticipantsScene() {
  return (
    <div className="relative grid h-full grid-cols-2 gap-3 md:gap-4">
      <motion.div
        className="relative overflow-hidden border border-gold/30 bg-gradient-to-br from-gold/10 to-ink p-3"
        whileHover={{ rotateY: 4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="text-[10px] font-black uppercase text-gold">CEX</p>
        <p className="mt-1 text-[9px] text-paper/60">Banco → conta → trade rápido</p>
        <motion.div className="mt-3 flex gap-1">
          {["Fiat", "KYC", "Order"].map((s, i) => (
            <motion.span key={s} className="rounded bg-paper/10 px-1.5 py-0.5 text-[8px] text-paper/70" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}>
              {s}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="relative overflow-hidden border border-rise/30 bg-gradient-to-br from-rise/10 to-ink p-3"
        whileHover={{ rotateY: -4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <p className="text-[10px] font-black uppercase text-rise">DEX</p>
        <p className="mt-1 text-[9px] text-paper/60">Carteira → pool → on-chain</p>
        <motion.div className="mt-3 h-8 rounded border border-rise/25 bg-rise/5" animate={{ backgroundColor: ["rgba(15,143,86,0.05)", "rgba(15,143,86,0.15)", "rgba(15,143,86,0.05)"] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <span className="flex h-full items-center justify-center text-[8px] font-bold text-rise">liquidez compartilhada</span>
        </motion.div>
      </motion.div>
      <motion.div className="col-span-2 flex items-center justify-center gap-4 border border-paper/10 bg-paper/[0.03] py-2">
        <span className="text-[9px] text-paper/50">Custódia</span>
        <motion.span animate={{ scaleX: [1, 1.2, 1] }} className="h-px w-12 bg-gold/50" />
        <span className="text-[9px] font-bold text-gold">Você ou instituição</span>
      </motion.div>
    </div>
  );
}

function DriversScene() {
  return (
    <div className="relative h-full">
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 400 120" preserveAspectRatio="none">
        <motion.path
          d="M 20 90 Q 100 20, 180 70 T 380 40"
          fill="none"
          stroke="rgba(15,143,86,0.6)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
      </svg>
      {[
        { label: "Oferta", x: "8%", y: "70%" },
        { label: "Demanda", x: "38%", y: "25%" },
        { label: "ETF/Fluxo", x: "62%", y: "45%" },
        { label: "Regulação", x: "82%", y: "20%" },
      ].map((p, i) => (
        <motion.span
          key={p.label}
          className="absolute rounded border border-gold/35 bg-ink/90 px-2 py-1 text-[8px] font-bold uppercase text-gold"
          style={{ left: p.x, top: p.y }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
        >
          {p.label}
        </motion.span>
      ))}
      <motion.span
        className="absolute right-4 top-2 text-[9px] font-mono text-rise"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        preço ↑↓
      </motion.span>
    </div>
  );
}

function OnChainScene() {
  const metrics = ["Endereços", "Hashrate", "TVL", "Taxas"];
  return (
    <div className="grid h-full grid-cols-2 gap-2 md:grid-cols-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m}
          className="flex flex-col items-center justify-end border border-gold/20 bg-ink/80 p-2"
          animate={{ borderColor: ["rgba(198,153,74,0.2)", "rgba(15,143,86,0.45)", "rgba(198,153,74,0.2)"] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
        >
          <motion.div
            className="w-full rounded-sm bg-rise/30"
            animate={{ height: [24, 48 + i * 8, 24] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
          />
          <p className="mt-2 text-[8px] font-bold uppercase text-paper/70">{m}</p>
        </motion.div>
      ))}
      <motion.p className="col-span-2 mt-1 text-center text-[9px] text-paper/45 md:col-span-4">Macro (juros, dólar) ao fundo</motion.p>
    </div>
  );
}

function DefiScene() {
  const steps = ["Empréstimo", "Swap", "Yield", "Liquidação"];
  return (
    <motion.ol className="flex h-full flex-wrap items-center justify-center gap-2 md:gap-3" style={{ transformStyle: "preserve-3d", rotateX: 20 }}>
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <motion.div
            className="min-w-[72px] border border-gold/30 bg-gradient-to-r from-ink to-[#101828] px-2 py-3 text-center shadow-lg"
            animate={{ x: [0, 4, 0], rotateY: [0, 6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.2 }}
          >
            <span className="text-[9px] font-bold text-gold">{step}</span>
          </motion.div>
          {i < steps.length - 1 ? <span className="text-rise/80">›</span> : null}
        </li>
      ))}
    </motion.ol>
  );
}

function EducationScene() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <motion.div className="flex gap-2">
        {["Estudar", "Testar", "Posição pequena"].map((s, i) => (
          <motion.div
            key={s}
            className="rounded-full border border-gold/40 px-3 py-1.5 text-[9px] font-bold uppercase text-gold"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0, scale: [1, 1.04, 1] }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {i + 1}. {s}
          </motion.div>
        ))}
      </motion.div>
      <motion.p className="text-center text-[10px] text-paper/55" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>
        Processo antes de alavancagem
      </motion.p>
    </div>
  );
}

function RiskScene() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <motion.div
        className="relative h-28 w-28 rounded-lg border-2 border-bear/50 bg-bear/10"
        animate={{ rotateY: [0, 8, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase text-bear">Chave</span>
        <motion.span className="absolute -right-3 -top-3 rounded bg-bear px-1 text-[8px] text-paper" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          !
        </motion.span>
      </motion.div>
      {["Vol", "Hack", "Alav.", "Slippage"].map((r, i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <motion.span
            key={r}
            className="absolute rounded border border-bear/35 bg-ink px-2 py-0.5 text-[8px] font-bold text-bear"
            style={{
              left: `calc(50% + ${Math.cos(angle) * 110}px)`,
              top: `calc(50% + ${Math.sin(angle) * 42}px)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          >
            {r}
          </motion.span>
        );
      })}
    </div>
  );
}

function LayersScene() {
  const layers = [
    { id: "Apps", y: 0, color: "border-gold/40" },
    { id: "DeFi", y: 1, color: "border-gold/35" },
    { id: "L2", y: 2, color: "border-rise/35" },
    { id: "L1", y: 3, color: "border-rise/45" },
    { id: "Infra", y: 4, color: "border-paper/25" },
  ];
  return (
    <motion.div className="relative mx-auto h-full max-w-md" style={{ transformStyle: "preserve-3d", rotateX: 55, rotateZ: -6 }}>
      {layers.map((layer, index) => (
        <motion.div
          key={layer.id}
          className={`absolute left-0 right-0 border ${layer.color} bg-gradient-to-r from-ink via-[#0f1628] to-ink px-4 py-2 shadow-[0_20px_40px_rgba(0,0,0,0.45)]`}
          style={{
            top: index * 28,
            zIndex: 10 - index,
            marginLeft: index * 6,
          }}
          animate={{ y: [index * 28, index * 28 - 3, index * 28] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
        >
          <span className="text-[10px] font-black uppercase text-gold">{layer.id}</span>
          <motion.div className="mt-1 h-0.5 w-full bg-gradient-to-r from-transparent via-rise/50 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const HINTS_PT: Record<ScenarioId, string> = {
  panorama: "Imagine uma rede mundial: cada ponto é uma pessoa, um validador ou uma carteira. O centro pulsa porque a rede está sempre ativa, 24 horas.",
  blockchain: "Cada caixa é um bloco de transações. A seta mostra a ordem: mudar um bloco antigo quebraria toda a corrente — por isso é difícil fraudar.",
  participants: "À esquerda, exchange tradicional (com banco). À direita, protocolo na blockchain (com sua carteira). Em baixo, quem guarda as chaves.",
  drivers: "A linha verde é o preço oscilando. Oferta, demanda, fluxo institucional e notícias regulatórias puxam a curva para cima ou para baixo.",
  onchain: "Barras = atividade real na blockchain (uso, mineração, DeFi). Não preveem preço, mas mostram se o ecossistema está “vivo”.",
  defi: "Fluxo típico DeFi: você deposita, troca, busca rendimento — e pode ser liquidado se o colateral cair. Leia na ordem das setas.",
  education: "Trilha segura: entender, simular, só então operar pequeno. Pula etapas = risco desnecessário.",
  risk: "O cofre é sua chave privada. Ao redor, os perigos reais: volatilidade, hacks, alavancagem e baixa liquidez.",
  layers: "De baixo para cima: energia e internet → blockchain base → escala (L2) → protocolos → aplicativos que você usa no celular.",
};

const HINTS_EN: Record<ScenarioId, string> = {
  panorama: "A global network: each node is a person, validator or wallet. The center pulses because the network never sleeps.",
  blockchain: "Each box is a block. Arrows show order: tampering with an old block breaks the chain — that is why fraud is hard.",
  participants: "Left: traditional exchange with banking. Right: on-chain protocol with your wallet. Bottom: who holds the keys.",
  drivers: "The green line is price swinging. Supply, demand, institutional flows and regulation pull it up or down.",
  onchain: "Bars show real blockchain activity — not price prediction, but whether the ecosystem is active.",
  defi: "Typical DeFi path: lend, swap, earn yield — with liquidation risk if collateral falls. Read left to right.",
  education: "Safe path: learn, paper-trade, then size small. Skipping steps adds risk.",
  risk: "The vault is your private key. Around it: volatility, hacks, leverage and thin liquidity.",
  layers: "Bottom to top: power and internet → base chain → L2 scale → protocols → apps on your phone.",
};

export function CryptoSectionScenario3D({ title, locale }: { title: string; locale: Locale }) {
  const id = resolveScenario(title);
  const hints = locale === "pt" || locale === "es" ? HINTS_PT : HINTS_EN;
  const hint = hints[id];

  const scene =
    id === "panorama" ? (
      <PanoramaScene />
    ) : id === "blockchain" ? (
      <BlockchainScene />
    ) : id === "participants" ? (
      <ParticipantsScene />
    ) : id === "drivers" ? (
      <DriversScene />
    ) : id === "onchain" ? (
      <OnChainScene />
    ) : id === "defi" ? (
      <DefiScene />
    ) : id === "education" ? (
      <EducationScene />
    ) : id === "risk" ? (
      <RiskScene />
    ) : (
      <LayersScene />
    );

  return (
    <SceneShell locale={locale} hint={hint}>
      {scene}
    </SceneShell>
  );
}
