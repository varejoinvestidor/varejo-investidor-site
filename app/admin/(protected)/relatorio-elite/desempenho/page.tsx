import { EliteAdminSubnav } from "../../../../../src/elite/admin/EliteAdminSubnav";
import { ElitePerformanceAdmin } from "../../../../../src/elite/admin/ElitePerformanceAdmin";
import { reconcileMonthlyFromOperations } from "../../../../../src/elite/reconcileMonthly";
import { fetchStaffEliteData } from "../../../../../src/elite/queries";
import { getPublisherSession } from "../../../../../src/publisher/supabase/server";

export default async function AdminEliteDesempenhoPage() {
  const { profile } = await getPublisherSession();
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return <p className="text-fall">Sem permissão.</p>;
  }

  const data = await fetchStaffEliteData();

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl text-paper">Relatório Elite — Desempenho</h2>
      <EliteAdminSubnav />
      <ElitePerformanceAdmin
        operations={data.operations}
        monthly={reconcileMonthlyFromOperations(data.monthly, data.operations)}
        loadError={data.error}
      />
    </div>
  );
}
