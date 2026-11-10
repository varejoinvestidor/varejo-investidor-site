"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/relatorio-elite", label: "Operações" },
  { href: "/admin/relatorio-elite/desempenho", label: "Desempenho & lotes" },
];

export function EliteAdminSubnav() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 border-b border-line/15 pb-4">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
              active ? "bg-gold/20 text-gold" : "border border-line/20 text-paper/55 hover:text-paper"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <a
        href="/relatorio-elite"
        target="_blank"
        rel="noreferrer"
        className="ml-auto rounded border border-rise/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-rise/90 hover:bg-rise/5"
      >
        Ver site público ↗
      </a>
    </nav>
  );
}
