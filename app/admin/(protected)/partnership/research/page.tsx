import { listRows } from "../../../../../src/partnership/db";
import { saveAnalyst, saveDeskSignal } from "../../../../../src/partnership/actions";
import { ActionForm, DataTable, Field, SelectField } from "../../../../../src/partnership/ui";

export default async function ResearchDeskPage() {
  const analysts = await listRows("partnership_analysts");
  const signals = await listRows("partnership_desk_signals");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">Elite Research Desk</h2>
      <p className="text-sm text-paper/60">
        Cadastro inicial de 3 a 5 analistas. Estes registros não substituem o relatório de sinais já existente.
      </p>
      <section className="admin-panel p-5">
        <ActionForm action={saveAnalyst}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="name" label="Nome" />
            <Field name="country" label="País" />
            <Field name="language" label="Idioma" />
            <SelectField
              name="specialty"
              label="Especialidade"
              options={[
                { value: "forex", label: "Forex e moedas" },
                { value: "indices", label: "Índices e ações" },
                { value: "commodities", label: "Commodities e metais" },
                { value: "crypto", label: "Criptoativos" },
                { value: "macro", label: "Macroeconomia e multi mercado" },
              ]}
            />
            <Field name="experience" label="Experiência" />
            <Field name="documents" label="Documentos" />
            <Field name="bio" label="Biografia" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "name", label: "Analista" }, { key: "specialty", label: "Especialidade" }, { key: "language", label: "Idioma" }, { key: "status", label: "Status" }]} rows={analysts.rows} />
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Versão de sinal do desk</h3>
        <ActionForm action={saveDeskSignal}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="analyst_id" label="ID do analista" />
            <Field name="asset" label="Ativo" />
            <Field name="direction" label="Direção" />
            <Field name="entry" label="Entrada" />
            <Field name="stop" label="Stop" />
            <Field name="targets" label="Objetivos" />
            <Field name="risk_reward" label="Risco/retorno" />
            <Field name="horizon" label="Horizonte" />
            <Field name="rationale" label="Fundamentação" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "asset", label: "Ativo" }, { key: "direction", label: "Direção" }, { key: "status", label: "Status" }, { key: "version", label: "Versão" }, { key: "result", label: "Resultado" }]} rows={signals.rows} />
    </div>
  );
}
