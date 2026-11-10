"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REFRESH_MS = 90_000;

/** Atualiza métricas do painel automaticamente (tráfego recente). */
export function ViAnalyticsLiveRefresh({ enabled = true }: { enabled?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => router.refresh(), REFRESH_MS);
    return () => window.clearInterval(id);
  }, [enabled, router]);

  return null;
}
