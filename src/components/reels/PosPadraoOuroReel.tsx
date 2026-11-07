"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  REEL_DURATION_SEC,
  REEL_SCENES,
  type ReelScene,
} from "../../data/reels/posPadraoOuroReel";

const W = 1080;
const H = 1920;

function sceneAtTime(t: number): ReelScene {
  const clamped = Math.min(Math.max(t, 0), REEL_DURATION_SEC - 0.001);
  return (
    REEL_SCENES.find((s) => clamped >= s.startSec && clamped < s.endSec) ??
    REEL_SCENES[REEL_SCENES.length - 1]
  );
}

function Stars({ seed }: { seed: number }) {
  const dots = useMemo(() => {
    const items: { x: number; y: number; s: number; o: number }[] = [];
    let h = seed;
    for (let i = 0; i < 48; i++) {
      h = (h * 16807) % 2147483647;
      items.push({
        x: (h % 1000) / 1000,
        y: ((h * 7) % 1000) / 1000,
        s: 1 + (h % 3),
        o: 0.15 + (h % 40) / 100,
      });
    }
    return items;
  }, [seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#e8dfd0]"
          style={{
            left: `${d.x * 100}%`,
            top: `${d.y * 100}%`,
            width: d.s,
            height: d.s,
            opacity: d.o,
          }}
        />
      ))}
    </div>
  );
}

function BrettonChart({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden>
      <rect x="0" y="0" width="400" height="220" rx="16" fill="#12101c" />
      <text x="20" y="28" fill="#9a9288" fontSize="11" fontFamily="system-ui">
        elo USD ↔ ouro · gráfico ilustrativo
      </text>
      <line x1="40" y1="180" x2="360" y2="180" stroke="#3d3848" strokeWidth="1" />
      <motion.path
        d={`M 60 160 L ${60 + 280 * p} ${160 - 90 * p}`}
        fill="none"
        stroke="#5b8fd4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.circle
        cx={60 + 280 * p}
        cy={160 - 90 * p}
        r="6"
        fill="#e8c56a"
        opacity={p > 0.1 ? 1 : 0}
      />
      <text x="52" y="198" fill="#6e6878" fontSize="10">
        1944
      </text>
      <text x="168" y="198" fill="#6e6878" fontSize="10">
        1960
      </text>
      <motion.text
        x={270}
        y="198"
        fill="#e8c56a"
        fontSize="11"
        fontWeight="700"
        opacity={p > 0.7 ? 1 : 0.4}
      >
        1971
      </motion.text>
      <text x="300" y={155 - 90 * 0.95} fill="#f7f3eb" fontSize="12" fontWeight="600">
        fim da
      </text>
      <text x="300" y={170 - 90 * 0.95} fill="#e8c56a" fontSize="12" fontWeight="700">
        conversibilidade
      </text>
    </svg>
  );
}

function DollarReserveCard({ progress }: { progress: number }) {
  const share = Math.round(58 + progress * 4);
  return (
    <div className="flex h-full flex-col justify-center gap-4 rounded-2xl border border-[#3d3428] bg-[#c9b896] p-6 text-[#3d2a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-4xl font-extrabold tracking-tight">USD</p>
        <span className="rounded-full border-2 border-[#6b4f32] bg-[#b8a582] px-3 py-1 text-sm font-bold">
          $
        </span>
      </div>
      <p className="font-mono text-[clamp(1.25rem,4vw,2rem)] font-bold leading-none tracking-tight">
        ~{share}% das reservas globais
      </p>
      <p className="text-sm font-medium opacity-90">referência em commodities, dívida e câmbio</p>
      <div className="mt-1 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#4a3728] px-3 py-1 text-xs font-semibold text-[#f0e6d8]">
          petróleo em USD
        </span>
        <span className="rounded-full bg-[#7a3d32] px-3 py-1 text-xs font-semibold text-[#fce8e4]">
          câmbio competitivo
        </span>
      </div>
    </div>
  );
}

function GlobalFlowIllustration({ progress }: { progress: number }) {
  const p = Math.min(1, Math.max(0, progress));
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" aria-hidden>
      <rect width="400" height="240" rx="16" fill="#12101c" />
      <ellipse cx="200" cy="120" rx="150" ry="70" fill="#1a1728" stroke="#3d3848" />
      <circle cx="130" cy="105" r="4" fill="#5b8fd4" />
      <circle cx="265" cy="95" r="4" fill="#e8c56a" />
      <circle cx="220" cy="145" r="4" fill="#a8845a" />
      <text x="118" y="125" fill="#8a8494" fontSize="9">
        NY
      </text>
      <text x="252" y="115" fill="#8a8494" fontSize="9">
        EU
      </text>
      <text x="205" y="165" fill="#8a8494" fontSize="9">
        EM
      </text>
      {[
        { x1: 130, y1: 105, x2: 265, y2: 95 },
        { x1: 265, y1: 95, x2: 220, y2: 145 },
        { x1: 220, y1: 145, x2: 130, y2: 105 },
      ].map((line, i) => (
        <motion.line
          key={i}
          {...line}
          stroke="#5b8fd4"
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: p, opacity: 0.5 + p * 0.5 }}
          transition={{ delay: i * 0.08 }}
        />
      ))}
      <motion.circle
        cx={130 + (265 - 130) * p}
        cy={105 + (95 - 105) * p}
        r="5"
        fill="#e8c56a"
        opacity={p}
      />
      <text x="20" y="28" fill="#9a9288" fontSize="11">
        fluxos de capital · ilustração
      </text>
    </svg>
  );
}

function CentralBankPanel({ progress }: { progress: number }) {
  const bars = [0.35, 0.55, 0.72, 0.88, 1].map((h) => h * progress);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#2a2640] bg-[#12101c] p-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a9288]">
        balanço do BC · ilustrativo
      </p>
      <div className="flex flex-1 items-end justify-between gap-2 px-1 pb-2">
        {["09", "13", "16", "20", "23"].map((yr, i) => (
          <div key={yr} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              className="w-full max-w-[44px] rounded-t-md bg-gradient-to-t from-[#4a3d6b] to-[#6b7fa8]"
              initial={{ height: 0 }}
              animate={{ height: `${bars[i] * 100}%` }}
              style={{ minHeight: 4 }}
            />
            <span className="text-[10px] text-[#6e6878]">{yr}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-[#b8b0a4]">liquidez e compra de títulos pós-2008</p>
    </div>
  );
}

function SceneVisual({ sceneId, localProgress }: { sceneId: string; localProgress: number }) {
  switch (sceneId) {
    case "hook":
      return (
        <div className="flex h-full items-center justify-center rounded-2xl border border-[#2a2640] bg-[#12101c] p-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#9a9288]">15 ago 1971</p>
            <motion.p
              className="mt-2 text-6xl font-black text-[#e8c56a]"
              animate={{ scale: 1 + localProgress * 0.04 }}
            >
              Nixon Shock
            </motion.p>
            <p className="mt-4 text-lg text-[#c8c0b4]">janela de conversão fechada</p>
          </div>
        </div>
      );
    case "bretton":
      return <BrettonChart progress={localProgress} />;
    case "local":
      return (
        <div className="grid h-full grid-cols-2 gap-3">
          {["SELIC", "Câmbio", "IPCA", "Fluxo"].map((label, i) => (
            <motion.div
              key={label}
              className="flex flex-col justify-center rounded-xl border border-[#2a2640] bg-[#12101c] p-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <p className="text-2xl font-bold text-[#e8c56a]">{label}</p>
              <p className="mt-1 text-xs text-[#8a8494]">variáveis locais</p>
            </motion.div>
          ))}
        </div>
      );
    case "dollar":
      return <DollarReserveCard progress={localProgress} />;
    case "global":
      return <GlobalFlowIllustration progress={localProgress} />;
    case "bcb":
      return <CentralBankPanel progress={localProgress} />;
    case "investor":
      return (
        <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden>
          <rect width="400" height="220" rx="16" fill="#12101c" />
          <text x="20" y="28" fill="#9a9288" fontSize="11">
            DXY ↑ vs BRL · correlação ilustrativa
          </text>
          <motion.path
            d="M 40 150 Q 120 140, 180 120 T 360 55"
            fill="none"
            stroke="#5b8fd4"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: localProgress }}
          />
          <motion.path
            d="M 40 170 Q 130 165, 200 155 T 360 130"
            fill="none"
            stroke="#a8845a"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: localProgress }}
            transition={{ delay: 0.1 }}
          />
          <text x="40" y="205" fill="#5b8fd4" fontSize="10">
            dólar
          </text>
          <text x="100" y="205" fill="#a8845a" fontSize="10">
            emergentes
          </text>
        </svg>
      );
    case "close":
      return (
        <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#3d3428] bg-[#1a1520] p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a9288]">
            fiat · USD · BC
          </p>
          <p className="mt-4 text-3xl font-extrabold text-[#f7f3eb]">contexto antes de operar</p>
          <p className="mt-2 text-lg font-semibold text-[#e8c56a]">varejoinvestidor</p>
        </div>
      );
    default:
      return null;
  }
}

function ReelFrame({ time }: { time: number }) {
  const scene = sceneAtTime(time);
  const duration = scene.endSec - scene.startSec;
  const localProgress = duration > 0 ? (time - scene.startSec) / duration : 0;

  return (
    <div
      className="relative overflow-hidden shadow-2xl"
      style={{
        width: W,
        height: H,
        background: "linear-gradient(165deg, #1a1230 0%, #2d2450 42%, #1e1838 100%)",
      }}
    >
      <Stars seed={scene.id.length * 7919} />

      {/* Guias de zona segura Instagram (ocultas na exportação) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 border-b border-dashed border-white/10"
        style={{ height: `${(230 / H) * 100}%` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-dashed border-white/10"
        style={{ height: `${(420 / H) * 100}%` }}
        aria-hidden
      />

      <div
        className="relative flex h-full flex-col"
        style={{
          paddingTop: 230,
          paddingBottom: 420,
          paddingLeft: 64,
          paddingRight: 64,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <p className="text-center text-[22px] font-bold uppercase tracking-[0.22em] text-[#d8d0c4]">
              {scene.kicker}
            </p>
            <div className="mt-6 text-center">
              <h1 className="text-[56px] font-extrabold leading-[1.05] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                {scene.headline}
              </h1>
              {scene.headlineAccent ? (
                <h2 className="mt-1 text-[52px] font-extrabold leading-[1.05] text-[#e8c56a] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {scene.headlineAccent}
                </h2>
              ) : null}
            </div>

            <motion.div
              className="mt-8 min-h-[340px] flex-1"
              animate={{ scale: 1 + Math.sin(localProgress * Math.PI) * 0.012 }}
              transition={{ duration: 0.3 }}
            >
              <SceneVisual sceneId={scene.id} localProgress={localProgress} />
            </motion.div>

            {scene.body ? (
              <p className="mt-6 text-center text-[26px] font-medium leading-snug text-[#c8c0b4]">
                {scene.body}
              </p>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto flex justify-center pb-2">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-[#e8c56a]"
              style={{ width: `${(time / REEL_DURATION_SEC) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PosPadraoOuroReel({ exportMode = false }: { exportMode?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [showSafe, setShowSafe] = useState(!exportMode);
  const [showUi, setShowUi] = useState(!exportMode);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const pausedAtRef = useRef(0);

  const tick = useCallback(
    (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000 + pausedAtRef.current;
      if (elapsed >= REEL_DURATION_SEC) {
        setTime(REEL_DURATION_SEC);
        setPlaying(false);
        pausedAtRef.current = REEL_DURATION_SEC;
        startRef.current = null;
        return;
      }
      setTime(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  useEffect(() => {
    if (playing) {
      startRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, tick]);

  const reset = () => {
    setPlaying(false);
    setTime(0);
    pausedAtRef.current = 0;
    startRef.current = null;
  };

  const [viewportScale, setViewportScale] = useState(0.45);

  useEffect(() => {
    if (exportMode) {
      setViewportScale(1);
      return;
    }
    const update = () => {
      const verticalRoom = showUi ? window.innerHeight - 120 : window.innerHeight;
      setViewportScale(Math.min(window.innerWidth / W, verticalRoom / H, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [showUi, exportMode]);

  useEffect(() => {
    if (!exportMode) return;
    const t = window.setTimeout(() => setPlaying(true), 400);
    return () => window.clearTimeout(t);
  }, [exportMode]);

  if (exportMode) {
    return (
      <div
        id="reel-export-root"
        className="bg-[#07060c]"
        style={{ width: W, height: H, margin: 0, padding: 0, overflow: "hidden" }}
      >
        <ReelFrame time={time} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8">
      {showUi ? (
        <header className="w-full max-w-xl space-y-3 text-center">
          <h1 className="text-xl font-bold text-[#f7f3eb]">Reels · Pós-padrão-ouro</h1>
          <p className="text-sm text-[#9a9288]">
            1080×1920 · {REEL_DURATION_SEC}s · grave em tela cheia (OBS/CapCut) com narração masculina
            do arquivo <code className="text-[#e8c56a]">content/reels/pos-padrao-ouro/</code>.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (time >= REEL_DURATION_SEC) reset();
                else setPlaying((p) => !p);
              }}
              className="rounded-full bg-[#e8c56a] px-5 py-2 text-sm font-bold text-[#1a1230]"
            >
              {playing ? "Pausar" : time >= REEL_DURATION_SEC ? "Repetir" : "Play prévia"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold"
            >
              Zerar
            </button>
            <button
              type="button"
              onClick={() => setShowSafe((s) => !s)}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold"
            >
              {showSafe ? "Ocultar guias IG" : "Guias IG"}
            </button>
            <button
              type="button"
              onClick={() => setShowUi(false)}
              className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold"
            >
              Modo gravação
            </button>
          </div>
        </header>
      ) : (
        <button
          type="button"
          className="fixed left-4 top-4 z-50 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs"
          onClick={() => setShowUi(true)}
        >
          Sair gravação
        </button>
      )}

      <div
        className="origin-top"
        style={{ transform: `scale(${viewportScale})` }}
      >
        <div className={showSafe ? "" : "[&_.border-dashed]:hidden"}>
          <ReelFrame time={time} />
        </div>
      </div>

      {!showUi && playing && (
        <p className="sr-only">Gravando animação — oculte esta aba na captura se necessário.</p>
      )}
    </div>
  );
}
