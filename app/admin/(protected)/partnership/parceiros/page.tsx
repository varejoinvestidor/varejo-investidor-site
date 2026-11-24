import { listRows } from "../../../../../src/partnership/db";
import { savePartner, setPartnerStatus } from "../../../../../src/partnership/actions";
import { ActionForm, DataTable, ExportButton, Field, SelectField } from "../../../../../src/partnership/ui";

export default async function PartnersPage({ searchParams }: { searchParams?: { q?: string; kind?: string; status?: string } }) {
  const listed = await listRows("partnership_partners");
  const events = await listRows("partnership_partner_events", 40);
  const q = (searchParams?.q ?? "").toLowerCase();
  const rows = listed.rows.filter((row) => {
    if (searchParams?.kind && row.kind !== searchParams.kind) return false;
    if (searchParams?.status && row.status !== searchParams.status) return false;
    if (!q) return true;
    return `${row.name} ${row.email} ${row.code} ${row.country}`.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-3xl text-paper">Partners</h2>
        <ExportButton filename="partners.csv" rows={rows} />
      </div>
      {listed.error ? <p className="text-sm text-fall">{listed.error}</p> : null}
      <p className="text-sm text-paper/60">
        Participação econômica é contratual e não equivale a participação societária. O cadastro econômico exige perfil de direção.
      </p>
      <form className="flex flex-wrap gap-2">
        <input name="q" placeholder="Buscar" defaultValue={searchParams?.q} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm" />
        <select name="kind" defaultValue={searchParams?.kind ?? ""} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm">
          <option value="">Tipo</option>
          <option value="affiliate">Afiliado</option>
          <option value="leader">Líder</option>
          <option value="coproducer">Coprodutor</option>
          <option value="economic">Participante econômico</option>
        </select>
        <select name="status" defaultValue={searchParams?.status ?? ""} className="rounded border border-line/20 bg-transparent px-3 py-2 text-sm">
          <option value="">Status</option>
          <option value="pending">Pendente</option>
          <option value="active">Ativo</option>
          <option value="suspended">Suspenso</option>
          <option value="closed">Encerrado</option>
        </select>
        <button className="rounded border border-line/25 px-3 py-2 text-xs font-bold uppercase">Filtrar</button>
      </form>
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Novo cadastro</h3>
        <ActionForm action={savePartner}>
          <div className="grid gap-3 md:grid-cols-2">
            <SelectField
              name="kind"
              label="Tipo"
              options={[
                { value: "affiliate", label: "Afiliado" },
                { value: "leader", label: "Líder" },
                { value: "coproducer", label: "Coprodutor" },
                { value: "economic", label: "Participante econômico" },
              ]}
            />
            <Field name="name" label="Nome" />
            <Field name="email" label="E-mail" type="email" />
            <Field name="country" label="País" />
            <Field name="language" label="Idioma" />
            <Field name="code" label="Código (opcional)" />
            <Field name="products" label="Produtos autorizados (vírgula)" />
            <Field name="remuneration" label="Remuneração contratual" />
            <Field name="contract_instrument" label="Instrumento contratual" />
            <Field name="economic_rights" label="Direitos econômicos" />
            <Field name="approved_percent" label="Percentual aprovado" type="number" />
            <Field name="documentation" label="Documentação" />
          </div>
        </ActionForm>
      </section>
      <DataTable
        columns={[
          { key: "name", label: "Nome" },
          { key: "kind", label: "Tipo" },
          { key: "email", label: "E-mail" },
          { key: "country", label: "País" },
          { key: "code", label: "Código" },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
      />
      <section className="admin-panel space-y-4 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider">Aprovar, suspender, reativar ou encerrar</h3>
        <ActionForm action={setPartnerStatus} submit="Atualizar status">
          <Field name="id" label="ID do parceiro" />
          <SelectField
            name="status"
            label="Novo status"
            options={[
              { value: "active", label: "Aprovar / reativar" },
              { value: "suspended", label: "Suspender" },
              { value: "closed", label: "Encerrar" },
              { value: "pending", label: "Voltar para pendente" },
            ]}
          />
          <Field name="note" label="Nota do histórico" />
        </ActionForm>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">Histórico</h3>
        <DataTable
          columns={[
            { key: "created_at", label: "Quando" },
            { key: "partner_id", label: "Parceiro" },
            { key: "action", label: "Ação" },
            { key: "note", label: "Nota" },
          ]}
          rows={events.rows}
        />
      </section>
    </div>
  );
}
