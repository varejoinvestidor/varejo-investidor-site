import type { Locale } from "../../i18n";

export type SectionDepth = "intro" | "core" | "deep" | "risk";

export function sectionPhase(index: number, title: string, locale: Locale): { badge: string; depth: SectionDepth; leigoHint: string } {
  const t = title.toLowerCase();
  if (index === 0 || t.includes("panorama") || t.includes("overview")) {
    return {
      badge: locale === "pt" ? "1 · Visão geral" : locale === "es" ? "1 · Panorama" : "1 · Overview",
      depth: "intro",
      leigoHint:
        locale === "pt"
          ? "Em poucas palavras"
          : locale === "es"
            ? "En pocas palabras"
            : "In plain terms",
    };
  }
  if (t.includes("como funciona") || t.includes("how") || (t.includes("como") && t.includes("mercado"))) {
    return {
      badge: locale === "pt" ? "2 · Como funciona" : locale === "es" ? "2 · Cómo funciona" : "2 · How it works",
      depth: "core",
      leigoHint: locale === "pt" ? "Passo a passo simples" : locale === "es" ? "Paso a paso" : "Simple steps",
    };
  }
  if (t.includes("risco") || t.includes("risk") || t.includes("volatil") || t.includes("aviso")) {
    return {
      badge: locale === "pt" ? "Atenção · Riscos" : locale === "es" ? "Atención · Riesgos" : "Note · Risks",
      depth: "risk",
      leigoHint: locale === "pt" ? "Leia antes de operar" : locale === "es" ? "Lee antes de operar" : "Read before trading",
    };
  }
  return {
    badge: locale === "pt" ? `${index + 1} · Aprofunde` : locale === "es" ? `${index + 1} · Profundiza` : `${index + 1} · Go deeper`,
    depth: "deep",
    leigoHint: locale === "pt" ? "Resumo desta etapa" : locale === "es" ? "Resumen" : "Section summary",
  };
}
