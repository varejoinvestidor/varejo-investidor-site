import { getPublisherSession } from "../../../../src/publisher/supabase/server";

export default async function AdminAutoresPage() {
  const { supabase } = await getPublisherSession();
  if (!supabase) return <p className="text-fall">Supabase não configurado.</p>;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .in("role", ["author", "editor", "admin"])
    .order("full_name");

  if (error) return <p className="text-fall">{error.message}</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Autores</h2>
      <ul className="space-y-2 text-sm text-paper/70">
        {(data ?? []).map((a) => (
          <li key={a.id}>
            {a.full_name ?? a.email} · {a.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
