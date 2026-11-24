import Link from "next/link";
import { ADMIN_PARTNERSHIP_NAV } from "../../../../src/publisher/admin/nav";
import { canAccessPartnershipRestricted } from "../../../../src/publisher/permissions";
import { requirePartnershipPage } from "../../../../src/publisher/admin/requireAdminPage";

export default async function PartnershipLayout({ children }: { children: React.ReactNode }) {
  const profile = await requirePartnershipPage();
  const restricted = new Set(["/admin/partnership/governanca", "/admin/partnership/lastlink", "/admin/partnership/corretoras"]);
  const links = ADMIN_PARTNERSHIP_NAV.filter(
    (item) => canAccessPartnershipRestricted(profile.role) || !restricted.has(item.href),
  );
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Partnership</p>
        <p className="mt-1 text-sm text-paper/60">Módulo interno do Varejo Admin. Sem dados simulados.</p>
      </div>
      <nav className="flex gap-2 overflow-x-auto pb-1">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded border border-line/20 px-3 py-2 text-xs text-paper/80 hover:border-gold/40">
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
