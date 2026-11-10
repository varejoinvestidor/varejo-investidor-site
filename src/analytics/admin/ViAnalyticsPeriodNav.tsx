"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ANALYTICS_PERIOD_OPTIONS } from "../periods";

export function ViAnalyticsPeriodNav() {
  const pathname = usePathname() ?? "/admin/vi-administrador";
  const searchParams = useSearchParams();
  const active = searchParams?.get("period") ?? "30d";

  return (
    <div className="flex flex-wrap gap-2">
      {ANALYTICS_PERIOD_OPTIONS.map((option) => {
        const selected = active === option.key;
        const href = `${pathname}?period=${option.key}`;
        return (
          <Link
            key={option.key}
            href={href}
            className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
              selected ? "bg-gold/20 text-gold" : "border border-line/20 text-paper/55 hover:text-paper"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
