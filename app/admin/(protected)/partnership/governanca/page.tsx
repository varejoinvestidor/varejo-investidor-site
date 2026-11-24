import { listRows } from "../../../../../src/partnership/db";
import { saveDistribution, saveEquity } from "../../../../../src/partnership/actions";
import { requirePartnershipRestrictedPage } from "../../../../../src/publisher/admin/requireAdminPage";
import { ActionForm, DataTable, Field } from "../../../../../src/partnership/ui";

export default async function GovernancePage() {
  await requirePartnershipRestrictedPage();
  const equity = await listRows("partnership_equity");
  const distributions = await listRows("partnership_distributions");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">Equity & Governance</h2>
      <p className="text-sm text-paper/60">
        Área restrita à direção. Direitos econômicos contratuais não são participação societária, marketplace ou liquidez.
      </p>
      <section className="admin-panel p-5">
        <ActionForm action={saveEquity}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="label" label="Identificação" />
            <Field name="instrument" label="Instrumento contratual" />
            <Field name="rights" label="Direitos econômicos" />
            <Field name="approved_percent" label="Percentual aprovado" type="number" />
            <Field name="valid_from" label="Início" type="date" />
            <Field name="valid_until" label="Fim" type="date" />
            <Field name="documents" label="Documentos" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "label", label: "Participante" }, { key: "instrument", label: "Instrumento" }, { key: "approved_percent", label: "%" }, { key: "status", label: "Status" }]} rows={equity.rows} />
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Distribuição</h3>
        <ActionForm action={saveDistribution}>
          <Field name="equity_id" label="ID do participante" />
          <Field name="period" label="Período" />
          <Field name="amount" label="Valor" type="number" />
          <Field name="note" label="Histórico" />
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "period", label: "Período" }, { key: "amount", label: "Valor" }, { key: "approved", label: "Aprovada" }, { key: "note", label: "Nota" }]} rows={distributions.rows} />
    </div>
  );
}
