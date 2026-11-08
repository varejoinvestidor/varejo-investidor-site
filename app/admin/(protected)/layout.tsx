import { redirect } from "next/navigation";
import { AdminShell } from "../../../src/publisher/admin/AdminShell";
import { getPublisherSession } from "../../../src/publisher/supabase/server";
import { isSupabaseConfigured } from "../../../src/publisher/env";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const { user, profile } = await getPublisherSession();

  if (!user || !profile) {
    redirect("/admin/login?returnTo=/admin");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
