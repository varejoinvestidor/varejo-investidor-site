"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type CSSProperties } from "react";
import {
  SELECT_MAP_FLOWS,
  SELECT_MAP_GRATICULE,
  SELECT_MAP_HUBS,
  SELECT_MAP_LABEL_ANCHORS,
  SELECT_MAP_LAND_PATHS,
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

  const regions = useMemo(
    () =>
      copy.regions.map((r) => ({
        ...r,
        hubId: r.id ?? hubIdFromLabel(r.label),
      })),
    [copy.regions],
  );

  const activeFlows = activeHub ? new Set(flowsTouchingHub(activeHub)) : null;

  return (
    <div
      className="select-global-map relative min-h-[580px] overflow-hidden border border-gold/[0.24] bg-gradient-to-br from-[#040404] via-[#070706] to-[#010101] p-5 text-paper shadow-[0_0_55px_rgba(201,155,62,0.10)] md:p-7"
      onMouseLeave={() => setActiveHub(null)}
    >
      <div className="pointer-events-none absolute inset-0 terminal-grid opacity-[0.07]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_42%,rgba(201,155,62,0.14),transparent_58%)]" />
      {!reduceMotion ? <div className="select-map-scan pointer-events-none absolute inset-0" aria-hidden /> : null}

      <svg
        viewBox="0 0 1000 520"
        aria-label="Mapa mundial com fluxos de exposição global"
        className="select-map-svg absolute inset-x-0 top-6 mx-auto h-[400px] w-[98%] drop-shadow-[0_18px_34px_rgba(0,0,0,0.65)]"
        role="img"
      >
        <defs>
          <linearGradient id="selectMapOcean" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(8,10,14,0.95)" />
            <stop offset="100%" stopColor="rgba(2,2,2,0.98)" />
          </linearGradient>
          <linearGradient id="selectMapLand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(92,78,52,0.55)" />
            <stop offset="40%" stopColor="rgba(48,48,44,0.65)" />
            <stop offset="100%" stopColor="rgba(14,14,12,0.92)" />
          </linearGradient>
          <linearGradient id="selectMapLandHi" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(201,155,62,0.22)" />
            <stop offset="100%" stopColor="rgba(12,12,10,0.88)" />
          </linearGradient>
          <filter id="selectMapGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="selectMapNodeGlow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1000" height="520" fill="url(#selectMapOcean)" rx="4" />

        <g className="select-map-graticule" opacity="0.35">
          {SELECT_MAP_GRATICULE.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(201,155,62,0.12)" strokeWidth="0.6" />
          ))}
        </g>

        <g opacity="0.55">
          {SELECT_MAP_LAND_PATHS.map((d, i) => (
            <path key={`shadow-${i}`} d={d} fill="rgba(0,0,0,0.65)" transform="translate(3 4)" />
          ))}
        </g>

        <g className="select-map-land">
          {SELECT_MAP_LAND_PATHS.map((d, i) => (
            <path
              key={`land-${i}`}
              d={d}
              fill={i % 3 === 0 ? "url(#selectMapLandHi)" : "url(#selectMapLand)"}
              stroke="rgba(201,155,62,0.22)"
              strokeWidth="0.85"
              className="select-map-land-path"
            />
          ))}
        </g>

        <g className="select-map-routes" fill="none">
          {SELECT_MAP_FLOWS.map((flow) => {
            const lit = !activeFlows || activeFlows.has(flow.id);
            return (
              <g key={flow.id} opacity={lit ? 1 : 0.22}>
                <path
                  d={flow.path}
                  stroke="rgba(201,155,62,0.12)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d={flow.path}
                  className={reduceMotion ? undefined : "select-map-flow-line"}
                  stroke="rgba(201,155,62,0.55)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  style={{
                    animationDuration: `${flow.duration}s`,
                    animationDelay: `${flow.delay}s`,
                  }}
                />
                {!reduceMotion ? (
                  <>
                    <circle r="3.5" fill="#e8c06a" filter="url(#selectMapNodeGlow)">
                      <animateMotion
                        dur={`${flow.duration}s`}
                        begin={`${flow.delay}s`}
                        repeatCount="indefinite"
                        path={flow.path}
                      />
                    </circle>
                    <circle r="2" fill="#c99b3e" opacity="0.85">
                      <animateMotion
                        dur={`${flow.duration}s`}
                        begin={`${flow.delay + flow.duration * 0.45}s`}
                        repeatCount="indefinite"
                        path={flow.path}
                      />
                    </circle>
                  </>
                ) : null}
              </g>
            );
          })}
        </g>

        {HUB_IDS.map((id) => {
          const hub = SELECT_MAP_HUBS[id];
          const active = activeHub === id;
          return (
            <g
              key={id}
              filter="url(#selectMapGlow)"
              className="select-map-hub"
              opacity={activeHub && !active ? 0.45 : 1}
            >
              {!reduceMotion ? (
                <circle cx={hub.x} cy={hub.y} r={active ? 22 : 16} fill="rgba(201,155,62,0.12)" className="select-map-pulse-ring" />
              ) : null}
              <circle cx={hub.x} cy={hub.y} r="12" fill="rgba(201,155,62,0.16)" stroke="rgba(201,155,62,0.35)" strokeWidth="1" />
              <circle cx={hub.x} cy={hub.y} r={active ? 5 : 4} fill="#e8c06a" />
            </g>
          );
        })}
      </svg>

        {regions.map((region) => {
        if (!region.hubId) return null;
        const anchor = SELECT_MAP_LABEL_ANCHORS[region.hubId];
        const isActive = activeHub === region.hubId;
        const posStyle: CSSProperties = {
          left: anchor.align === "left" && anchor.left !== "auto" ? anchor.left : undefined,
          right: anchor.align === "right" ? "3%" : undefined,
          top: anchor.top !== "auto" ? anchor.top : undefined,
          bottom: region.hubId === "latam" ? "8%" : undefined,
        };

        return (
          <motion.article
            key={region.label}
            layout
            onMouseEnter={() => setActiveHub(region.hubId!)}
            onFocus={() => setActiveHub(region.hubId!)}
            tabIndex={0}
            className={`absolute max-w-[210px] cursor-default border bg-ink/85 p-3 shadow-[0_0_28px_rgba(201,155,62,0.08)] backdrop-blur transition ${
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

      <p className="pointer-events-none absolute bottom-3 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-paper/35">
        Fluxos ilustrativos · exposição multi-região
      </p>
    </div>
  );
}
