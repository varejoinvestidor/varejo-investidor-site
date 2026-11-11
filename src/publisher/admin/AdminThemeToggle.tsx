"use client";

import type { AdminTheme } from "./useAdminTheme";

export function AdminThemeToggle({
  theme,
  onChange,
  compact,
}: {
  theme: AdminTheme;
  onChange: (theme: AdminTheme) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`admin-theme-toggle flex items-center gap-1 ${compact ? "" : ""}`}
      role="group"
      aria-label="Tema do painel"
    >
      <button
        type="button"
        onClick={() => onChange("dark")}
        className={`rounded px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
          theme === "dark" ? "bg-gold/20 text-gold" : "text-paper/55 hover:text-paper"
        }`}
        aria-pressed={theme === "dark"}
      >
        Escuro
      </button>
      <button
        type="button"
        onClick={() => onChange("light")}
        className={`rounded px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
          theme === "light" ? "bg-gold/20 text-gold" : "text-paper/55 hover:text-paper"
        }`}
        aria-pressed={theme === "light"}
      >
        Claro
      </button>
    </div>
  );
}
