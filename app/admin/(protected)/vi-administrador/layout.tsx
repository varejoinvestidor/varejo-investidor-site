import { redirect } from "next/navigation";
import { autoEnsureViAnalyticsForSession } from "../../../../src/analytics/actions";
import { ViAnalyticsAutoInstall } from "../../../../src/analytics/admin/ViAnalyticsAutoInstall";
import { ViAnalyticsLiveRefresh } from "../../../../src/analytics/admin/ViAnalyticsLiveRefresh";
import { ViAnalyticsSchemaAlert } from "../../../../src/analytics/admin/ViAnalyticsSchemaAlert";
import { ViAnalyticsSubnav } from "../../../../src/analytics/admin/ViAnalyticsSubnav";
import { probeAnalyticsSchema } from "../../../../src/analytics/admin/queries";
import { canViewSiteAnalytics } from "../../../../src/publisher/permissions";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";

export const revalidate = 60;

export default async function ViAdministradorLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getPublisherSession();
  if (!profile || !canViewSiteAnalytics(profile.role)) {
    redirect("/admin");
  }

  if (profile.role === "admin") {
    await autoEnsureViAnalyticsForSession();
  }

  const schema = await probeAnalyticsSchema();

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-2">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold">VI Administrador</p>
        <h2 className="font-serif text-3xl tracking-tight text-paper">Dados do site</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-paper/60">
          Páginas mais vistas, CTAs mais clicados, regiões e países, e relatórios de acesso (diário, semanal e mensal).
          Telemetria respeita rotas públicas — o painel admin não é contabilizado.
        </p>
      </header>

      {schema !== "ok" ? (
        <ViAnalyticsSchemaAlert state={schema === "partial" ? "partial" : schema === "unconfigured" ? "unconfigured" : "missing"} />
      ) : null}

      {profile.role === "admin" && schema !== "ok" && schema !== "unconfigured" ? (
        <ViAnalyticsAutoInstall state={schema === "partial" ? "partial" : "missing"} />
      ) : null}

      <ViAnalyticsLiveRefresh enabled={schema === "ok" || schema === "partial"} />

      <ViAnalyticsSubnav />
      {children}
    </div>
  );
}
