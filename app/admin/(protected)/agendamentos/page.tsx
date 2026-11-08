import Link from "next/link";
import { listArticles } from "../../../../src/publisher/articles/actions";

export default async function AdminAgendamentosPage() {
  const result = await listArticles({ status: "scheduled" });
  if (!result.ok) return <p className="text-fall">{result.error}</p>;

  const items = result.data ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Agendamentos</h2>
      <p className="text-sm text-paper/55">Publicação automática via cron na Fase 4.</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border border-line/12 px-4 py-3">
            <Link href={`/admin/artigos/${item.id}`} className="font-medium text-paper hover:text-gold">
              {item.title}
            </Link>
            <p className="text-xs text-paper/50">
              {item.scheduled_at ? new Date(item.scheduled_at).toLocaleString("pt-BR") : "Sem data"} · {item.language}
            </p>
          </li>
        ))}
        {!items.length ? <li className="text-paper/50">Nenhum artigo agendado.</li> : null}
      </ul>
    </div>
  );
}
