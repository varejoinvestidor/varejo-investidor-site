"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_ANALYTICS_NAV, ADMIN_FOOTER_NAV, ADMIN_PUBLISHER_NAV, ADMIN_RESEARCH_NAV } from "./nav";
import { ROLE_LABELS } from "../permissions";
import type { PublisherProfile } from "../types";
import { createPublisherBrowserClient } from "../supabase/browser";

type Props = {
  profile: PublisherProfile;
  children: React.ReactNode;
};

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function navLinkClass(active: boolean) {
  return `block rounded-md px-3 py-2.5 text-sm transition ${
    active ? "bg-paper/[0.06] text-paper" : "text-paper/60 hover:bg-paper/[0.04] hover:text-paper/90"
  }`;
}

export function AdminShell({ profile, children }: Props) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const isAdmin = profile.role === "admin";
  const footerNav = isAdmin ? ADMIN_FOOTER_NAV : ADMIN_FOOTER_NAV.filter((i) => i.href !== "/admin/usuarios");
  const settingsActive = pathname.startsWith("/admin/configuracoes");

  async function signOut() {
    const client = createPublisherBrowserClient();
    if (client) await client.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-ink text-paper">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-line/10 bg-[#070707] lg:flex lg:flex-col">
          <div className="border-b border-line/10 px-6 py-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">Varejo Investidor</p>
            <h1 className="mt-2 font-serif text-xl tracking-tight text-paper">VI Publisher</h1>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-0.5">
              {ADMIN_PUBLISHER_NAV.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={navLinkClass(active)}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {isAdmin ? (
              <div className="my-5 border-t border-line/12 pt-4">
                <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-paper/40">VI Administrador</p>
                <ul className="mt-2 space-y-0.5">
                  {ADMIN_ANALYTICS_NAV.map((item) => {
                    const active =
                      item.href === "/admin/vi-administrador"
                        ? pathname === "/admin/vi-administrador"
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <li key={item.href}>
                        <Link href={item.href} className={navLinkClass(active)}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <div className="my-5 border-t border-line/12 pt-4">
              <p className="px-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-paper/40">VI Research</p>
              <ul className="mt-2 space-y-0.5">
                {ADMIN_RESEARCH_NAV.map((item) => {
                  const active =
                    item.href === "/admin/relatorio-elite"
                      ? pathname === "/admin/relatorio-elite"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link href={item.href} className={navLinkClass(active)}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="relative border-t border-line/10 px-4 py-4">
            <Link
              href="/admin/configuracoes"
              title="Configurações"
              className={`absolute right-3 top-3 rounded-md p-1.5 transition ${
                settingsActive ? "bg-gold/15 text-gold" : "text-paper/45 hover:bg-paper/[0.06] hover:text-gold"
              }`}
              aria-label="Configurações"
            >
              <SettingsIcon />
            </Link>
            <p className="pr-10 truncate text-sm font-medium text-paper/90">{profile.full_name ?? profile.email}</p>
            <p className="mt-0.5 text-xs text-paper/50">{ROLE_LABELS[profile.role]}</p>
            <ul className="mt-3 space-y-0.5">
              {footerNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={`${navLinkClass(active)} py-2 text-xs`}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line/10 px-4 py-4 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <p className="text-xs uppercase tracking-widest text-gold">VI Publisher</p>
              <Link
                href="/admin/configuracoes"
                className="rounded p-1.5 text-paper/50 hover:text-gold"
                aria-label="Configurações"
              >
                <SettingsIcon />
              </Link>
            </div>
            <div className="ml-auto flex flex-1 flex-wrap items-center justify-end gap-3 text-sm text-paper/70">
              <a href="/artigos" className="transition hover:text-gold" target="_blank" rel="noreferrer">
                /artigos
              </a>
              <a href="/" className="transition hover:text-paper" target="_blank" rel="noreferrer">
                Site
              </a>
              <button
                type="button"
                onClick={() => void signOut()}
                className="rounded border border-line/20 px-3 py-1.5 text-xs uppercase tracking-wider transition hover:border-gold/40 hover:text-paper"
              >
                Sair
              </button>
            </div>
          </header>
          <main className="flex-1 px-4 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
