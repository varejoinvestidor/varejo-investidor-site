type AuthorRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
};

export function AdminAuthorsPanel({ authors }: { authors: AuthorRow[] }) {
  return (
    <ul className="space-y-2 rounded-xl border border-line/12 p-4 text-sm text-paper/70">
      {authors.length === 0 ? (
        <li className="text-paper/45">Nenhum perfil editorial encontrado.</li>
      ) : (
        authors.map((a) => (
          <li key={a.id} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/8 pb-2 last:border-0 last:pb-0">
            <span className="font-medium text-paper/90">{a.full_name ?? a.email ?? a.id}</span>
            <span className="text-xs uppercase tracking-wider text-paper/40">{a.role}</span>
          </li>
        ))
      )}
    </ul>
  );
}
