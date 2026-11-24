"use client";

import { useRef, useState } from "react";
import type { CommercialCopy } from "../../partners/commercial";
import styles from "./ecosystem.module.css";

export function PartnershipEcosystem({ copy }: { copy: CommercialCopy }) {
  const [active, setActive] = useState(3);
  const [rotation, setRotation] = useState({ x: 58, y: -28 });
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);
  const layer = copy.layers[active];

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rx: rotation.x, ry: rotation.y };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    setRotation({
      x: Math.min(72, Math.max(42, drag.current.rx - dy * 0.15)),
      y: drag.current.ry + dx * 0.25,
    });
  }

  return (
    <div className={styles.stage}>
      <div>
        <div
          className={styles.viewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => {
            drag.current = null;
          }}
        >
          <div
            className={styles.world}
            style={{ transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.y}deg) scale(${zoom})` }}
          >
            <div className={styles.spine} />
            {copy.layers.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={styles.slab}
                data-active={active === index}
                style={{ bottom: `${8 + index * 18}%` }}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
              >
                <strong>{item.kicker}</strong>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => setZoom((value) => Math.min(1.25, value + 0.08))}>
            {copy.zoomIn}
          </button>
          <button type="button" onClick={() => setZoom((value) => Math.max(0.82, value - 0.08))}>
            {copy.zoomOut}
          </button>
        </div>
        <p className={styles.hint}>{copy.rotate}</p>
      </div>
      <aside className={styles.panel} aria-live="polite">
        <div className={styles.tabs} role="tablist" aria-label={copy.layerLabel}>
          {copy.layers.map((item, index) => (
            <button key={item.kicker} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
              {item.kicker}
            </button>
          ))}
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d7b56a]">{layer.kicker}</p>
        <h3>{layer.title}</h3>
        <p>{layer.text}</p>
        <ul>
          {layer.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
