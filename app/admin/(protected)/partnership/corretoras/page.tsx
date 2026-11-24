import { listRows } from "../../../../../src/partnership/db";
import { saveBrokerage, saveBrokerageClient, saveBrokerageStatement } from "../../../../../src/partnership/actions";
import { requirePartnershipRestrictedPage } from "../../../../../src/publisher/admin/requireAdminPage";
import { ActionForm, DataTable, Field } from "../../../../../src/partnership/ui";

export default async function BrokeragePage() {
  await requirePartnershipRestrictedPage();
  const brokers = await listRows("partnership_brokerages");
  const clients = await listRows("partnership_brokerage_clients");
  const statements = await listRows("partnership_brokerage_statements");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">Brokerage Network</h2>
      <p className="text-sm text-paper/60">Receita IB fica separada da Lastlink. Não há incentivo a volume excessivo de operações.</p>
      <section className="admin-panel p-5">
        <ActionForm action={saveBrokerage}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="name" label="Corretora" />
            <Field name="country" label="País" />
            <Field name="contact" label="Responsável" />
            <Field name="contract_ref" label="Contrato" />
            <Field name="started_on" label="Início" type="date" />
            <Field name="instruments" label="Instrumentos elegíveis" />
            <Field name="terms" label="Condições comerciais" />
            <Field name="pay_rules" label="Regras de remuneração" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "name", label: "Corretora" }, { key: "country", label: "País" }, { key: "status", label: "Status" }, { key: "contract_ref", label: "Contrato" }]} rows={brokers.rows} />
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Cliente atribuído</h3>
        <ActionForm action={saveBrokerageClient}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="brokerage_id" label="ID da corretora" />
            <Field name="safe_id" label="Identificador seguro" />
            <Field name="partner_id" label="ID do parceiro" />
            <Field name="country" label="País" />
            <Field name="assigned_at" label="Data de atribuição" type="date" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "safe_id", label: "Identificador" }, { key: "country", label: "País" }, { key: "status", label: "Status" }, { key: "assigned_at", label: "Atribuição" }]} rows={clients.rows} />
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Conciliação de relatório</h3>
        <ActionForm action={saveBrokerageStatement}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="brokerage_id" label="ID da corretora" />
            <Field name="period" label="Período" />
            <Field name="volume" label="Volume elegível" type="number" />
            <Field name="lots" label="Lotes informados" type="number" />
            <Field name="instruments" label="Instrumentos" />
            <Field name="calculated" label="Comissão calculada" type="number" />
            <Field name="adjustments" label="Ajustes" type="number" />
            <Field name="received" label="Valor recebido" type="number" />
            <Field name="pending" label="Valor pendente" type="number" />
            <Field name="note" label="Nota" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "period", label: "Período" }, { key: "lots", label: "Lotes" }, { key: "calculated", label: "Calculada" }, { key: "received", label: "Recebida" }, { key: "pending", label: "Pendente" }]} rows={statements.rows} />
    </div>
  );
}
