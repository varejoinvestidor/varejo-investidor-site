"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { buildGlobeModel } from "./selectGlobeMath";
import {
  SELECT_GLOBE_VIEW,
  SELECT_MAP_FLOW_EDGES,
  SELECT_MAP_LABEL_OFFSET,
  flowsTouchingHub,
  type SelectMapHubId,
} from "./selectMapData";

export type SelectGlobalMapCopy = {
  regions: {
    id?: SelectMapHubId;
    label: string;
    focus: string[];
    position?: string;
    labelPosition?: string;
  }[];
};

const HUB_IDS: SelectMapHubId[] = ["us", "uk", "eu", "jp", "sg", "latam"];

function hubIdFromLabel(label: string): SelectMapHubId | null {
  const n = label.toLowerCase();
  if (n.includes("estados") || n.includes("united") || n.includes("states")) return "us";
  if (n.includes("reino") || n.includes("kingdom")) return "uk";
  if (n.includes("europa") || n.includes("europe")) return "eu";
  if (n.includes("jap")) return "jp";
  if (n.includes("singapur") || n.includes("singapore")) return "sg";
  if (n.includes("latina") || n.includes("latin")) return "latam";
  return null;
}

export function SelectGlobalMap({ copy }: { copy: SelectGlobalMapCopy }) {
  const reduceMotion = useReducedMotion();
  const [activeHub, setActiveHub] = useState<SelectMapHubId | null>(null);
  const [rotation, setRotation] = useState<[number, number, number]>([-26, -18, 0]);
  const dragRef = useRef<{ active: boolean; lastX: number; lastY: number }>({
    active: false,
    lastX: 0,
    lastY: 0,
  });

  const regions = useMemo(
    () =>
      copy.regions.map((r) => ({
        ...r,
        hubId: r.id ?? hubIdFromLabel(r.label),
      })),
    [copy.regions],
  );

  const model = useMemo(() => buildGlobeModel(rotation), [rotation]);
  const activeFlows = activeHub ? new Set(flowsTouchingHub(activeHub)) : null;
  const hubById = useMemo(() => new Map(model.hubs.map((h) => [h.id, h])), [model.hubs]);

  useEffect(() => {
    if (reduceMotion || activeHub || dragRef.current.active) return;
    const id = window.setInterval(() => {
      setRotation(([lambda, phi, gamma]) => [lambda - 0.35, phi, gamma]);
    }, 48);
    return () => window.clearInterval(id);
  }, [reduceMotion, activeHub]);

  const onPointerDown = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { active: true, lastX: event.clientX, lastY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.lastX;
    const dy = event.clientY - dragRef.current.lastY;
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
    const sens = 0.32;
    setRotation(([lambda, phi, gamma]) => [
      lambda + dx * sens,
      Math.max(-58, Math.min(10, phi - dy * sens * 0.35)),
      gamma,
    ]);
  }, []);

  const onPointerUp = useCallback((event: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  return (
    <div
      className="select-global-map relative min-h-[640px] overflow-hidden border border-gold/[0.24] bg-gradient-to-br from-[#040404] via-[#070706] to-[#010101] p-5 text-paper shadow-[0_0_55px_rgba(201,155,62,0.10)] md:p-7"
      onMouseLeave={() => setActiveHub(null)}
    >
      <div className="pointer-events-none absolute inset-0 terminal-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_42%,rgba(201,155,62,0.16),transparent_58%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[52%] h-[min(88vw,420px)] w-[min(88vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,155,62,0.08),transparent_68%)] blur-md" />
      {!reduceMotion ? <div className="select-map-scan pointer-events-none absolute inset-0" aria-hidden /> : null}

      <svg
        viewBox={`0 0 ${SELECT_GLOBE_VIEW.width} ${SELECT_GLOBE_VIEW.height}`}
        aria-label="Globo terrestre em projeção ortográfica com fluxos de exposição global"
        className="select-map-svg select-globe-svg relative z-[1] mx-auto w-full max-w-[980px] touch-none drop-shadow-[0_22px_44px_rgba(0,0,0,0.72)]"
        role="img"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <defs>
          <radialGradient id="selectGlobeSphere" cx="40%" cy="36%" r="68%">
            <stop offset="0%" stopColor="rgba(32,34,40,0.98)" />
            <stop offset="55%" stopColor="rgba(10,12,16,0.98)" />
            <stop offset="100%" stopColor="rgba(2,2,4,1)" />
          </radialGradient>
          <linearGradient id="selectGlobeLand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(118,98,58,0.82)" />
            <stop offset="45%" stopColor="rgba(64,62,56,0.9)" />
            <stop offset="100%" stopColor="rgba(18,17,15,0.96)" />
          </linearGradient>
          <linearGradient id="selectGlobeLandHi" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(214,175,98,0.38)" />
            <stop offset="100%" stopColor="rgba(24,22,18,0.94)" />
          </linearGradient>
          <filter id="selectMapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="selectGlobeSpecular" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feOffset dx="-4" dy="-6" result="offsetBlur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.28" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {model.sphere ? (
          <path d={model.sphere} fill="url(#selectGlobeSphere)" filter="url(#selectGlobeSpecular)" />
        ) : null}

        {model.graticule ? (
          <path d={model.graticule} fill="none" stroke="rgba(201,155,62,0.14)" strokeWidth="0.65" opacity="0.55" />
        ) : null}

        <g opacity="0.42">
          {model.landPaths.map((land) => (
            <path key={`shadow-${land.id}`} d={land.d} fill="rgba(0,0,0,0.55)" transform="translate(2 3)" />
          ))}
        </g>

        <g className="select-map-land">
          {model.landPaths.map((land, i) => (
            <path
              key={land.id}
              d={land.d}
              fill={i % 4 === 0 ? "url(#selectGlobeLandHi)" : "url(#selectGlobeLand)"}
              stroke="rgba(201,155,62,0.26)"
              strokeWidth="0.7"
              className="select-map-land-path"
            />
          ))}
        </g>

        <g className="select-map-routes" fill="none">
          {model.flows.map((flow) => {
            if (!flow.visible || !flow.d) return null;
            const edge = SELECT_MAP_FLOW_EDGES.find((f) => f.id === flow.id);
            const lit = !activeFlows || activeFlows.has(flow.id);
            return (
              <g key={flow.id} opacity={lit ? 1 : 0.18}>
                <path d={flow.d} stroke="rgba(201,155,62,0.12)" strokeWidth="4" strokeLinecap="round" />
                <path
                  d={flow.d}
                  className={reduceMotion ? undefined : "select-map-flow-line"}
                  stroke="rgba(201,155,62,0.58)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    animationDuration: `${flow.duration}s`,
                    animationDelay: `${flow.delay}s`,
                  }}
                />
                {!reduceMotion && edge ? (
                  <>
                    <circle r="3.5" fill="#e8c06a" filter="url(#selectMapGlow)">
                      <animateMotion
                        dur={`${flow.duration}s`}
                        begin={`${flow.delay}s`}
                        repeatCount="indefinite"
                        path={flow.d}
                      />
                    </circle>
                    <circle r="2" fill="#c99b3e" opacity="0.85">
                      <animateMotion
                        dur={`${flow.duration}s`}
                        begin={`${flow.delay + flow.duration * 0.45}s`}
                        repeatCount="indefinite"
                        path={flow.d}
                      />
                    </circle>
                  </>
                ) : null}
              </g>
            );
          })}
        </g>

        {HUB_IDS.map((id) => {
          const hub = hubById.get(id);
          if (!hub?.visible) return null;
          const active = activeHub === id;
          return (
            <g
              key={id}
              filter="url(#selectMapGlow)"
              className="select-map-hub"
              opacity={activeHub && !active ? 0.4 : 1}
            >
              {!reduceMotion ? (
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={active ? 22 : 16}
                  fill="rgba(201,155,62,0.14)"
                  className="select-map-pulse-ring"
                />
              ) : null}
              <circle cx={hub.x} cy={hub.y} r="11" fill="rgba(201,155,62,0.18)" stroke="rgba(201,155,62,0.4)" strokeWidth="1" />
              <circle cx={hub.x} cy={hub.y} r={active ? 5 : 4} fill="#e8c06a" />
            </g>
          );
        })}
      </svg>

      {regions.map((region) => {
        if (!region.hubId) return null;
        const hub = hubById.get(region.hubId);
        if (!hub?.visible) return null;
        const offset = SELECT_MAP_LABEL_OFFSET[region.hubId];
        const isActive = activeHub === region.hubId;
        const leftPct = ((hub.x + offset.dx) / SELECT_GLOBE_VIEW.width) * 100;
        const topPct = ((hub.y + offset.dy) / SELECT_GLOBE_VIEW.height) * 100;
        const posStyle: CSSProperties = {
          left: `${Math.min(92, Math.max(4, leftPct))}%`,
          top: `${Math.min(88, Math.max(6, topPct))}%`,
          textAlign: offset.align,
        };

        return (
          <motion.article
            key={region.label}
            layout
            onMouseEnter={() => setActiveHub(region.hubId!)}
            onFocus={() => setActiveHub(region.hubId!)}
            tabIndex={0}
            className={`absolute z-[2] max-w-[210px] cursor-default border bg-ink/88 p-3 shadow-[0_0_28px_rgba(201,155,62,0.08)] backdrop-blur transition ${
              isActive
                ? "border-gold/55 shadow-[0_0_36px_rgba(201,155,62,0.22)]"
                : "border-gold/[0.18]"
            }`}
            style={posStyle}
          >
            <h3 className="text-xs font-black uppercase tracking-[0.14em] text-gold">{region.label}</h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {region.focus.map((item) => (
                <span key={item} className="text-[10px] font-bold uppercase tracking-[0.12em] text-paper/[0.62]">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        );
      })}

      <p className="pointer-events-none absolute bottom-3 left-4 z-[2] text-[9px] font-bold uppercase tracking-[0.2em] text-paper/38">
        Natural Earth 110m · projeção 3D ortográfica · arraste para girar
      </p>
    </div>
  );
}
