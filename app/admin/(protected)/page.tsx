import Link from "next/link";
import { getDashboardCounts, getPublisherSession } from "../../../src/publisher/supabase/server";
import { ROLE_LABELS } from "../../../src/publisher/permissions";

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-line/12 bg-paper/[0.02] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-paper/50">{label}</p>
      <p className="mt-2 font-serif text-3xl text-paper">{value}</p>
    </div>
  );
}

export default async function AdminOverviewPage() {
  const { profile } = await getPublisherSession();
  const counts = await getDashboardCounts();

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <h2 className="font-serif text-3xl tracking-tight text-paper">Visão geral</h2>
        <p className="mt-2 text-sm text-paper/60">
          {profile ? (
            <>
              Olá, {profile.full_name ?? profile.email} — {ROLE_LABELS[profile.role]}
            </>
          ) : null}
        </p>
      </div>

      {counts ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Publicados" value={counts.published} />
          <StatCard label="Rascunhos" value={counts.draft} />
          <StatCard label="Em revisão" value={counts.review} />
          <StatCard label="Agendados" value={counts.scheduled} />
          <StatCard label="Visualizações" value={counts.views.toLocaleString("pt-BR")} />
        </div>
      ) : (
        <p className="text-sm text-paper/60">Conecte o Supabase para ver métricas em tempo real.</p>
      )}

      <section className="rounded-xl border border-line/12 bg-paper/[0.02] p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-paper/70">Produção</h3>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-paper/65">
          <li>
            Runbook: <code className="text-gold">docs/vi-publisher-producao.md</code>
          </li>
          <li>
            Saúde: <code className="text-gold">/api/publisher/health</code>
          </li>
          <li>
            Verificar env: <code className="text-gold">npm run verify:publisher</code>
          </li>
        </ul>
        <p className="mt-4 text-sm text-paper/55">
          Portal: <a href="/artigos" className="text-gold hover:underline">/artigos</a> (PT) ·{" "}
          <a href="/en/artigos" className="text-gold hover:underline">/en/artigos</a>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/artigos/novo"
            className="rounded bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink"
          >
            Novo artigo
          </Link>
          <Link
            href="/admin/configuracoes"
            className="rounded border border-line/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-paper/80"
          >
            Configurações
          </Link>
        </div>
      </section>
    </div>
  );
}
