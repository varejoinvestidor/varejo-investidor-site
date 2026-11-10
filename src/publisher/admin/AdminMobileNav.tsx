"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ADMIN_ANALYTICS_NAV,
  ADMIN_FOOTER_NAV,
  ADMIN_PUBLISHER_NAV,
  ADMIN_RESEARCH_NAV,
} from "./nav";

function navLinkClass(active: boolean) {
  return `block rounded-md px-3 py-3 text-sm transition ${
    active ? "bg-paper/[0.08] text-paper" : "text-paper/65 hover:bg-paper/[0.04] hover:text-paper"
  }`;
}

export function AdminMobileNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-[44px] items-center gap-2 rounded border border-line/20 px-3 py-2 text-xs font-bold uppercase tracking-wider text-paper/80 lg:hidden"
        aria-expanded={open}
        aria-controls="admin-mobile-drawer"
      >
        <span className="grid gap-1" aria-hidden>
          <span className="block h-0.5 w-4 bg-gold" />
          <span className="block h-0.5 w-4 bg-gold" />
          <span className="block h-0.5 w-4 bg-gold" />
        </span>
        Menu
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" id="admin-mobile-drawer" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/70" aria-label="Fechar menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col border-r border-line/15 bg-[#070707] shadow-2xl">
            <div className="flex items-center justify-between border-b border-line/10 px-4 py-4">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">VI Publisher</p>
                <p className="text-sm font-medium text-paper">Painel admin</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-[44px] min-w-[44px] rounded border border-line/20 text-paper/70"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-0.5">
                {ADMIN_PUBLISHER_NAV.map((item) => {
                  const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link href={item.href} className={navLinkClass(active)} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {isAdmin ? (
                <div className="my-4 border-t border-line/12 pt-4">
                  <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-paper/40">VI Administrador</p>
                  <ul className="mt-2 space-y-0.5">
                    {ADMIN_ANALYTICS_NAV.map((item) => {
                      const active =
                        item.href === "/admin/vi-administrador"
                          ? pathname === "/admin/vi-administrador"
                          : pathname === item.href || pathname.startsWith(`${item.href}/`);
                      return (
                        <li key={item.href}>
                          <Link href={item.href} className={navLinkClass(active)} onClick={() => setOpen(false)}>
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
              <div className="my-4 border-t border-line/12 pt-4">
                <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-paper/40">VI Research</p>
                <ul className="mt-2 space-y-0.5">
                  {ADMIN_RESEARCH_NAV.map((item) => {
                    const active =
                      item.href === "/admin/relatorio-elite"
                        ? pathname === "/admin/relatorio-elite"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <li key={item.href}>
                        <Link href={item.href} className={navLinkClass(active)} onClick={() => setOpen(false)}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <ul className="mt-4 space-y-0.5 border-t border-line/12 pt-4">
                {ADMIN_FOOTER_NAV.filter((i) => isAdmin || i.href !== "/admin/usuarios").map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link href={item.href} className={`${navLinkClass(active)} text-xs`} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
