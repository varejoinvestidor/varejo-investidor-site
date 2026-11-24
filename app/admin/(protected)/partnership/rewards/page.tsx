import { listRows } from "../../../../../src/partnership/db";
import { grantReward, saveReward } from "../../../../../src/partnership/actions";
import { ActionForm, DataTable, Field, SelectField } from "../../../../../src/partnership/ui";

export default async function RewardsPage() {
  const rewards = await listRows("partnership_rewards");
  const grants = await listRows("partnership_reward_grants");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">Varejo Partners Rewards</h2>
      <p className="text-sm text-paper/60">Toda recompensa depende de regulamento e aprovação. O ranking usa vendas Lastlink quando existirem.</p>
      <p className="text-sm text-paper/60">Ranking mensal, trimestral e anual: pendente de conexão com vendas aprovadas.</p>
      <section className="admin-panel p-5">
        <ActionForm action={saveReward}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="title" label="Recompensa" />
            <SelectField
              name="category"
              label="Categoria"
              options={[
                { value: "smartphone", label: "iPhones e smartphones" },
                { value: "computer", label: "Notebooks e computadores" },
                { value: "ai", label: "Ferramentas de IA" },
                { value: "software", label: "Softwares" },
                { value: "editors", label: "Equipes de editores" },
                { value: "design", label: "Designers" },
                { value: "video", label: "Produção audiovisual" },
              ]}
            />
            <Field name="period" label="Período" />
            <Field name="budget" label="Orçamento" type="number" />
            <Field name="notes" label="Critério / regulamento" />
          </div>
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "title", label: "Recompensa" }, { key: "category", label: "Categoria" }, { key: "budget", label: "Orçamento" }, { key: "available", label: "Disponível" }]} rows={rewards.rows} />
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Concessão</h3>
        <ActionForm action={grantReward} submit="Registrar">
          <Field name="reward_id" label="ID da recompensa" />
          <Field name="partner_id" label="ID do parceiro" />
          <Field name="period" label="Período" />
          <SelectField
            name="status"
            label="Status"
            options={[
              { value: "pending", label: "Pendente" },
              { value: "approved", label: "Aprovada" },
              { value: "granted", label: "Concedida" },
              { value: "rejected", label: "Recusada" },
            ]}
          />
          <Field name="note" label="Histórico" />
        </ActionForm>
      </section>
      <DataTable columns={[{ key: "period", label: "Período" }, { key: "status", label: "Status" }, { key: "partner_id", label: "Parceiro" }, { key: "note", label: "Nota" }]} rows={grants.rows} />
    </div>
  );
}
