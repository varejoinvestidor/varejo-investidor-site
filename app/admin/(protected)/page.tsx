import Link from "next/link";
import { getDashboardCounts, getPublisherSession } from "../../../src/publisher/supabase/server";
import { ROLE_LABELS } from "../../../src/publisher/permissions";
import { fetchRecentArticles } from "../../../src/publisher/admin/dashboardQueries";
import { STATUS_BADGE, STATUS_LABELS } from "../../../src/publisher/articles/labels";
import { isSupabaseConfigured } from "../../../src/publisher/env";
import { getPublisherArticlePath } from "../../../src/publisher/public/paths";

function StatCard({ label, value, hint }: { label: string; value: number | string; hint?: string }) {
  return (
    <div className="admin-panel admin-panel-elevated p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-paper/60">{label}</p>
      <p className="admin-stat-value mt-2">{value}</p>
      {hint ? <p className="mt-1 text-xs text-paper/55">{hint}</p> : null}
    </div>
  );
}

function QuickLink({
  href,
  title,
  description,
  primary,
}: {
  href: string;
  title: string;
  description: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`admin-quick-link ${primary ? "admin-quick-link-primary" : ""}`}
    >
      <p className={`text-sm font-bold ${primary ? "text-gold" : "text-paper"}`}>{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-paper/60">{description}</p>
    </Link>
  );
}

export default async function AdminOverviewPage() {
  const { profile } = await getPublisherSession();
  const counts = await getDashboardCounts();
  const recent = await fetchRecentArticles(8);
  const configured = isSupabaseConfigured();

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-paper">Visão geral</h2>
          <p className="mt-2 text-sm text-paper/65">
            {profile ? (
              <>
                Olá, {profile.full_name ?? profile.email} — {ROLE_LABELS[profile.role]}
              </>
            ) : null}
          </p>
        </div>
        <PulseBadge configured={configured} />
      </div>

      {counts ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Publicados" value={counts.published} hint="No ar em /artigos" />
          <StatCard label="Rascunhos" value={counts.draft} />
          <StatCard label="Em revisão" value={counts.review} />
          <StatCard label="Agendados" value={counts.scheduled} />
          <StatCard label="Visualizações" value={counts.views.toLocaleString("pt-BR")} />
        </div>
      ) : (
        <p className="rounded-xl border border-fall/30 bg-fall/10 px-4 py-3 text-sm text-paper/80">
          Não foi possível carregar métricas. Verifique Supabase e sessão.
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickLink href="/admin/artigos/novo" title="Novo artigo" description="Abre um rascunho no editor Tiptap." primary />
        <QuickLink href="/admin/artigos" title="Todos os artigos" description="Filtrar por status, idioma ou busca." />
        <QuickLink href="/admin/agendamentos" title="Agendamentos" description="Publicações com data futura." />
        {profile?.role === "admin" ? (
          <QuickLink
            href="/admin/vi-administrador"
            title="VI Administrador"
            description="Páginas, cliques e relatórios de acesso."
            primary
          />
        ) : null}
        <QuickLink
          href="/artigos"
          title="Portal público (PT)"
          description="Abre /artigos em nova aba do site."
        />
      </section>

      <section className="admin-panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/75">Atividade recente</h3>
          <Link href="/admin/artigos" className="text-xs text-gold hover:underline">
            Ver lista completa
          </Link>
        </div>
        {recent.length ? (
          <ul className="mt-4 divide-y divide-line/10">
            {recent.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0">
                <div className="min-w-0">
                  <Link href={`/admin/artigos/${row.id}`} className="font-medium text-paper hover:text-gold">
                    {row.title}
                  </Link>
                  <p className="text-xs text-paper/40">
                    {row.language.toUpperCase()} · {row.slug}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded border px-2 py-0.5 text-xs ${STATUS_BADGE[row.status]}`}>
                    {STATUS_LABELS[row.status]}
                  </span>
                  {row.status === "published" ? (
                    <a
                      href={getPublisherArticlePath(row.language === "en" ? "en" : "pt", row.slug)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-paper/50 hover:text-gold"
                    >
                      Ver no site
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-paper/55">
            Nenhum artigo ainda.{" "}
            <Link href="/admin/artigos/novo" className="text-gold hover:underline">
              Criar o primeiro
            </Link>
          </p>
        )}
      </section>
    </div>
  );
}

function PulseBadge({ configured }: { configured: boolean }) {
  return (
    <div className="admin-panel flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-paper/65">
      <span
        className={`h-2 w-2 rounded-full ${configured ? "bg-rise shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-fall"}`}
        aria-hidden
      />
      {configured ? "Supabase conectado" : "Supabase pendente"}
    </div>
  );
}
