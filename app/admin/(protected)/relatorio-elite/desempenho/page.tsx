import { EliteAdminSubnav } from "../../../../../src/elite/admin/EliteAdminSubnav";
import { ElitePerformanceAdmin } from "../../../../../src/elite/admin/ElitePerformanceAdmin";
import { fetchStaffEliteData } from "../../../../../src/elite/queries";
import { requirePublisherManagerPage } from "../../../../../src/publisher/admin/requireAdminPage";

export default async function AdminEliteDesempenhoPage() {
  await requirePublisherManagerPage();

  const data = await fetchStaffEliteData();

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl text-paper">Relatório Elite — Desempenho</h2>
      <EliteAdminSubnav />
      <ElitePerformanceAdmin
        operations={data.operations}
        monthly={data.monthly}
        totalOperations={data.totalOperations}
        loadError={data.error}
      />
    </div>
  );
}
