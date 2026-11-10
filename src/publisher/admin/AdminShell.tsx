"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_NAV } from "./nav";
import { ROLE_LABELS } from "../permissions";
import type { PublisherProfile } from "../types";
import { createPublisherBrowserClient } from "../supabase/browser";

type Props = {
  profile: PublisherProfile;
  children: React.ReactNode;
};

export function AdminShell({ profile, children }: Props) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

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
          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {ADMIN_NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-paper/[0.06] text-paper"
                      : "text-paper/60 hover:bg-paper/[0.04] hover:text-paper/90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-line/10 px-4 py-4 text-xs text-paper/50">
            <p className="truncate font-medium text-paper/80">{profile.full_name ?? profile.email}</p>
            <p>{ROLE_LABELS[profile.role]}</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line/10 px-4 py-4 lg:px-8">
            <div className="lg:hidden">
              <p className="text-xs uppercase tracking-widest text-gold">VI Publisher</p>
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
