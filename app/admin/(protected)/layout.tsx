import { redirect } from "next/navigation";
import { AdminShell } from "../../../src/publisher/admin/AdminShell";
import { AdminThemeBoot } from "./AdminThemeBoot";
import { getPublisherSession } from "../../../src/publisher/supabase/server";
import { isSupabaseConfigured } from "../../../src/publisher/env";
import { isPublisherStaffRole } from "../../../src/publisher/permissions";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const { user, profile } = await getPublisherSession();

  if (!user) {
    redirect("/admin/login?returnTo=/admin");
  }

  if (!profile) {
    redirect("/admin/login?returnTo=/admin&error=profile");
  }

  if (!isPublisherStaffRole(profile.role)) {
    redirect("/admin/login?returnTo=/admin&error=access");
  }

  return (
  <>
    <AdminThemeBoot />
    <AdminShell profile={profile}>{children}</AdminShell>
  </>
  );
}
