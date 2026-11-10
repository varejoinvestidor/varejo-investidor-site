"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { AnalyticsCollectPayload } from "./types";

const SESSION_KEY = "vi_analytics_sid";
const LAST_CLICK_KEY = "vi_analytics_last_click";

function analyticsSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `s-${Date.now()}`;
  }
}

function sendEvent(payload: AnalyticsCollectPayload) {
  try {
    const body = JSON.stringify(payload);
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/analytics/event", blob);
      if (ok) return;
    }
    void fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}

function pageLocaleFromPath(pathname: string): string | null {
  const seg = pathname.split("/").filter(Boolean)[0];
  if (!seg) return "pt";
  if (seg.length === 2 || seg.length === 5) return seg;
  return null;
}

function shouldTrackPath(pathname: string | null): pathname is string {
  if (!pathname) return false;
  if (pathname.startsWith("/admin")) return false;
  return !pathname.startsWith("/api");
}

export function ViSiteAnalytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!shouldTrackPath(pathname)) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    sendEvent({
      kind: "page_view",
      path: pathname,
      pageTitle: typeof document !== "undefined" ? document.title : null,
      locale: pageLocaleFromPath(pathname),
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      sessionId: analyticsSessionId(),
    });
  }, [pathname]);

  useEffect(() => {
    if (!shouldTrackPath(pathname)) return;

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tracked = target.closest<HTMLElement>("[data-vi-track]");
      const interactive = target.closest<HTMLElement>("a[href], button, [role='button']");
      const el = tracked ?? interactive;
      if (!el) return;

      if (el.closest("[data-vi-no-track]")) return;

      const href = el instanceof HTMLAnchorElement ? el.getAttribute("href") : null;
      const trackId = el.getAttribute("data-vi-track");
      const aria = el.getAttribute("aria-label");
      const text = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      const elementLabel = trackId ?? aria ?? (text.length > 0 ? text.slice(0, 120) : null);
      const elementKey = trackId ?? (href ? `link:${href}` : null) ?? elementLabel;
      if (!elementKey && !elementLabel) return;

      const dedupe = `${pathname}|${elementKey}`;
      try {
        const last = sessionStorage.getItem(LAST_CLICK_KEY);
        if (last === dedupe) return;
        sessionStorage.setItem(LAST_CLICK_KEY, dedupe);
      } catch {
        /* ignore */
      }

      sendEvent({
        kind: "click",
        path: pathname ?? "/",
        elementKey,
        elementLabel,
        locale: pageLocaleFromPath(pathname ?? "/"),
        sessionId: analyticsSessionId(),
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  useEffect(() => {
    if (!shouldTrackPath(pathname)) return;

    function onVarejoTrack(event: Event) {
      const detail = (event as CustomEvent<Record<string, string> & { event?: string }>).detail;
      const key = detail?.event;
      if (!key) return;
      sendEvent({
        kind: "click",
        path: pathname ?? "/",
        elementKey: key,
        elementLabel: key,
        locale: detail.locale ?? pageLocaleFromPath(pathname ?? "/"),
        sessionId: analyticsSessionId(),
      });
    }

    window.addEventListener("varejo:track", onVarejoTrack);
    return () => window.removeEventListener("varejo:track", onVarejoTrack);
  }, [pathname]);

  return null;
}
