import { EliteReportAdmin } from "../../../../src/elite/admin/EliteReportAdmin";
import { fetchStaffEliteData } from "../../../../src/elite/queries";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";

export default async function AdminEliteReportPage() {
  const { profile } = await getPublisherSession();
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return <p className="text-fall">Sem permissão.</p>;
  }

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
