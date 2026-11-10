"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type EliteReportHub from "./EliteReportHub";

function EliteReportHubSkeleton() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-ink text-paper/55">
      <p className="animate-pulse text-xs font-bold uppercase tracking-[0.28em] text-gold">Carregando relatório Elite…</p>
    </main>
  );
}

const Hub = dynamic(() => import("./EliteReportHub"), {
  loading: () => <EliteReportHubSkeleton />,
});

type Props = ComponentProps<typeof EliteReportHub>;

/** Code-split do hub (~280kB) — use nas rotas /relatorio-elite. */
export default function EliteReportHubEntry(props: Props) {
  return <Hub {...props} />;
}
