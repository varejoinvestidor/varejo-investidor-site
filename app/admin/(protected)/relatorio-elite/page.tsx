import { EliteReportAdmin } from "../../../../src/elite/admin/EliteReportAdmin";
import { fetchStaffEliteData } from "../../../../src/elite/queries";
import { requirePublisherManagerPage } from "../../../../src/publisher/admin/requireAdminPage";

export default async function AdminEliteReportPage() {
  await requirePublisherManagerPage();

  const data = await fetchStaffEliteData();

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-3xl text-paper">Relatório Elite</h2>
      <EliteReportAdmin
        operations={data.operations}
        monthly={data.monthly}
        totalOperations={data.totalOperations}
        loadError={data.error}
      />
    </div>
  );
}
