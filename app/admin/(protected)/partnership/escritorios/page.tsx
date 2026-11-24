import { listRows } from "../../../../../src/partnership/db";
import { saveOffice, setOfficeStatus } from "../../../../../src/partnership/actions";
import { ActionForm, DataTable, Field, SelectField } from "../../../../../src/partnership/ui";

const STATUSES = [
  { value: "proposal", label: "Proposta" },
  { value: "commercial_review", label: "Análise comercial" },
  { value: "financial_review", label: "Análise financeira" },
  { value: "legal_review", label: "Análise jurídica" },
  { value: "direction_approval", label: "Aprovação da direção" },
  { value: "deployment", label: "Implantação" },
  { value: "operating", label: "Operação" },
  { value: "rejected", label: "Recusada" },
];

export default async function OfficesPage() {
  const offices = await listRows("partnership_offices");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">Global Offices</h2>
      <p className="text-sm text-paper/60">Nenhuma despesa ou abertura é autorizada automaticamente. A mudança de etapa exige a direção.</p>
      <section className="admin-panel p-5">
        <ActionForm action={saveOffice}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="country" label="País" />
            <Field name="city" label="Cidade" />
            <Field name="leader_name" label="Líder responsável" />
            <Field name="objective" label="Objetivo" />
            <Field name="team" label="Equipe" />
            <Field name="budget" label="Orçamento" type="number" />
            <Field name="costs" label="Custos" type="number" />
            <Field name="projection" label="Projeção comercial" />
            <Field name="legal_structure" label="Estrutura jurídica" />
            <Field name="documents" label="Documentos" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "country", label: "País" }, { key: "city", label: "Cidade" }, { key: "status", label: "Status" }, { key: "budget", label: "Orçamento" }]} rows={offices.rows} />
      <section className="admin-panel p-5">
        <ActionForm action={setOfficeStatus} submit="Atualizar etapa">
          <Field name="id" label="ID do escritório" />
          <SelectField name="status" label="Etapa" options={STATUSES} />
        </ActionForm>
      </section>
    </div>
  );
}
