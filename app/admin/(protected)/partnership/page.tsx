import { countRows, pending } from "../../../../src/partnership/db";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export default async function PartnershipOverviewPage({
  searchParams,
}: {
  searchParams?: { status?: string; language?: string; country?: string };
}) {
  const partners = await countRows("partnership_partners");
  const schemaMissing = partners.error?.includes("partnership_partners") || partners.error?.includes("schema cache");
  const db = createPublisherServiceClient();
  let affiliates = 0;
  let leaders = 0;
  let coproducers = 0;
  let waiting = 0;
  let suspended = 0;
  let channels = 0;
  let analysts = 0;
  let offices = 0;
  let brokers = 0;
  let orders = 0;
  if (db && !schemaMissing) {
    const client = db;
    const status = searchParams?.status;
    const language = searchParams?.language;
    const country = searchParams?.country;
    async function count(kind?: string, partnerStatus?: string) {
      let query = client.from("partnership_partners").select("id", { count: "exact", head: true });
      if (kind) query = query.eq("kind", kind);
      if (partnerStatus) query = query.eq("status", partnerStatus);
      else if (status) query = query.eq("status", status);
      if (language) query = query.eq("language", language);
      if (country) query = query.eq("country", country);
      const { count: value } = await query;
      return value ?? 0;
    }
    affiliates = await count("affiliate", "active");
    leaders = await count("leader", "active");
    coproducers = await count("coproducer", "active");
    waiting = await count(undefined, "pending");
    suspended = await count(undefined, "suspended");
    channels = (await client.from("partnership_whatsapp_channels").select("id", { count: "exact", head: true })).count ?? 0;
    analysts = (await client.from("partnership_analysts").select("id", { count: "exact", head: true }).eq("status", "active")).count ?? 0;
    offices = (await client.from("partnership_offices").select("id", { count: "exact", head: true }).eq("status", "operating")).count ?? 0;
    brokers = (await client.from("partnership_brokerages").select("id", { count: "exact", head: true })).count ?? 0;
    orders = (await client.from("partnership_lastlink_orders").select("id", { count: "exact", head: true })).count ?? 0;
  }

  const cards = [
    { label: "Total de parceiros", value: schemaMissing ? "—" : String(partners.count ?? 0) },
    { label: "Afiliados ativos", value: String(affiliates) },
    { label: "Líderes ativos", value: String(leaders) },
    { label: "Coprodutores", value: String(coproducers) },
    { label: "Aguardando aprovação", value: String(waiting) },
    { label: "Suspensos", value: String(suspended) },
    { label: "Canais de WhatsApp", value: String(channels) },
    { label: "Analistas ativos", value: String(analysts) },
    { label: "Escritórios em operação", value: String(offices) },
    { label: "Corretoras parceiras", value: String(brokers) },
    ...(orders > 0
      ? [{ label: "Pedidos Lastlink recebidos", value: String(orders) }]
      : [
          pending("Vendas totais"),
          pending("Receita bruta"),
          pending("Comissões calculadas"),
          pending("Receita líquida estimada"),
          pending("Vendas por produto, idioma, país, líder e afiliado"),
        ]),
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl text-paper">Overview</h2>
      {schemaMissing ? (
        <p className="rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-paper/80">
          As tabelas do Partnership ainda não foram aplicadas no Supabase. Os indicadores permanecem sem números inventados.
        </p>
      ) : null}
      <form className="flex flex-wrap gap-2">
        <input name="country" placeholder="País" defaultValue={searchParams?.country} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm" />
        <input name="language" placeholder="Idioma" defaultValue={searchParams?.language} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm" />
        <select name="status" defaultValue={searchParams?.status ?? ""} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm">
          <option value="">Status</option>
          <option value="pending">Pendente</option>
          <option value="active">Ativo</option>
          <option value="suspended">Suspenso</option>
          <option value="closed">Encerrado</option>
        </select>
        <button className="rounded border border-line/25 px-3 py-2 text-xs font-bold uppercase">Filtrar</button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="admin-panel p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-paper/55">{card.label}</p>
            <p className="mt-2 text-lg text-paper">{"pending" in card && card.pending ? card.value : card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
