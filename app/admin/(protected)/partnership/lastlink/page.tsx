import { listRows } from "../../../../../src/partnership/db";
import { saveLastlinkRule } from "../../../../../src/partnership/actions";
import { requirePartnershipRestrictedPage } from "../../../../../src/publisher/admin/requireAdminPage";
import { ActionForm, DataTable, Field, SelectField } from "../../../../../src/partnership/ui";

export default async function LastlinkPage() {
  await requirePartnershipRestrictedPage();
  const rules = await listRows("partnership_lastlink_rules");
  const orders = await listRows("partnership_lastlink_orders");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">Lastlink</h2>
      <p className="rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-paper/80">
        A Lastlink é a fonte oficial de vendas e pagamentos. Nenhum percentual fica fixo no código. Pedidos aparecem somente depois do webhook oficial.
      </p>
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Regra de comissão</h3>
        <ActionForm action={saveLastlinkRule}>
          <div className="grid gap-3 md:grid-cols-2">
            <SelectField
              name="product"
              label="Produto"
              options={[
                { value: "elite", label: "Elite" },
                { value: "formacao", label: "Formação Varejo Investidor" },
                { value: "consultoria", label: "Consultoria" },
              ]}
            />
            <SelectField
              name="rule_kind"
              label="Tipo"
              options={[
                { value: "affiliate", label: "Afiliado" },
                { value: "coproducer", label: "Coprodução" },
                { value: "renewal", label: "Renovação" },
                { value: "unattributed", label: "Venda sem afiliado" },
              ]}
            />
            <Field name="campaign" label="Campanha" />
            <Field name="percent" label="Percentual contratual" type="number" />
            <Field name="valid_from" label="Vigência inicial" type="date" />
            <Field name="valid_until" label="Vigência final" type="date" />
            <Field name="notes" label="Estornos e observações" />
          </div>
        </ActionForm>
      </section>
      <DataTable
        columns={[
          { key: "product", label: "Produto" },
          { key: "rule_kind", label: "Regra" },
          { key: "percent", label: "%" },
          { key: "campaign", label: "Campanha" },
          { key: "active", label: "Ativa" },
        ]}
        rows={rules.rows}
      />
      <h3 className="text-sm font-bold uppercase tracking-wider">Pedidos conciliados</h3>
      {orders.rows.length ? (
        <DataTable
          columns={[
            { key: "external_id", label: "Pedido" },
            { key: "product", label: "Produto" },
            { key: "buyer", label: "Comprador" },
            { key: "affiliate_code", label: "Afiliado" },
            { key: "gross_amount", label: "Bruto" },
            { key: "payment_status", label: "Pagamento" },
          ]}
          rows={orders.rows}
        />
      ) : (
        <p className="text-sm text-paper/60">Pendente de conexão. Nenhum pedido Lastlink foi recebido.</p>
      )}
    </div>
  );
}
