import { redirect } from "next/navigation";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";

export default async function AdminEventosPage() {
  const { profile } = await getPublisherSession();
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    redirect("/admin/login");
  }

  const admin = createPublisherServiceClient();
  const { data: rows, error } = admin
    ? await admin
        .from("event_waitlist_signups")
        .select("id, created_at, name, email, whatsapp, country, city, language, lead_list")
        .order("created_at", { ascending: false })
        .limit(150)
    : { data: null, error: { message: "Service role ausente" } };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 text-paper">
      <div>
        <h1 className="font-serif text-3xl text-paper">Lista de eventos</h1>
        <p className="mt-2 text-sm text-paper/55">Cadastros de varejoinvestidor.com/eventos (Supabase).</p>
      </div>
      {error ? (
        <p className="rounded border border-bear/40 bg-bear/10 px-4 py-3 text-sm">
          {error.message.includes("does not exist") || error.message.includes("schema cache")
            ? "Execute a migration supabase/migrations/20260322120000_event_waitlist.sql no Supabase."
            : error.message}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded border border-line/15">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line/15 text-xs uppercase tracking-wider text-paper/45">
            <tr>
              <th className="px-3 py-3">Data</th>
              <th className="px-3 py-3">Nome</th>
              <th className="px-3 py-3">E-mail</th>
              <th className="px-3 py-3">WhatsApp</th>
              <th className="px-3 py-3">País</th>
              <th className="px-3 py-3">Cidade</th>
              <th className="px-3 py-3">Idioma</th>
            </tr>
          </thead>
          <tbody>
            {(rows ?? []).map((row) => (
              <tr key={row.id} className="border-b border-line/10 last:border-0">
                <td className="px-3 py-2 whitespace-nowrap text-paper/60">
                  {new Date(row.created_at).toLocaleString("pt-BR")}
                </td>
                <td className="px-3 py-2 font-semibold">{row.name}</td>
                <td className="px-3 py-2">{row.email}</td>
                <td className="px-3 py-2 text-paper/70">{row.whatsapp ?? "—"}</td>
                <td className="px-3 py-2">{row.country}</td>
                <td className="px-3 py-2">{row.city}</td>
                <td className="px-3 py-2 uppercase text-paper/50">{row.language ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows?.length && !error ? <p className="px-4 py-8 text-center text-paper/45">Nenhum cadastro ainda.</p> : null}
      </div>
    </div>
  );
}
