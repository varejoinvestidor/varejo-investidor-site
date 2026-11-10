"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/vi-administrador", label: "Visão geral", exact: true },
  { href: "/admin/vi-administrador/paginas", label: "Páginas" },
  { href: "/admin/vi-administrador/cliques", label: "Cliques & CTAs" },
  { href: "/admin/vi-administrador/regioes", label: "Regiões" },
  { href: "/admin/vi-administrador/relatorios", label: "Relatórios" },
];

export function ViAnalyticsSubnav() {
  const pathname = usePathname() ?? "";
  return (
    <nav className="flex flex-wrap gap-2 border-b border-line/15 pb-4">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);
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
        href="/"
        target="_blank"
        rel="noreferrer"
        className="ml-auto rounded border border-rise/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-rise/90 hover:bg-rise/5"
      >
        Site público ↗
      </a>
    </nav>
  );
}
