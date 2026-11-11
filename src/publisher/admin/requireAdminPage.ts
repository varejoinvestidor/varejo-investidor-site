import { redirect } from "next/navigation";
import type { PublisherRole } from "../types";
import {
  canManageTaxonomy,
  canManageUsers,
  canPublish,
  canViewSiteAnalytics,
} from "../permissions";
import { getPublisherSession } from "../supabase/server";

export async function requireStaffPage() {
  const { user, profile } = await getPublisherSession();
  if (!user || !profile) redirect("/admin/login?returnTo=/admin");
  return profile;
}

export async function requireAdminPage() {
  const profile = await requireStaffPage();
  if (profile.role !== "admin") redirect("/admin");
  return profile;
}

export async function requireTaxonomyAdminPage() {
  const profile = await requireStaffPage();
  if (!canManageTaxonomy(profile.role)) redirect("/admin");
  return profile;
}

export async function requirePublisherManagerPage() {
  const profile = await requireStaffPage();
  if (!canPublish(profile.role)) redirect("/admin");
  return profile;
}

export async function requireSiteAnalyticsPage() {
  const profile = await requireStaffPage();
  if (!canViewSiteAnalytics(profile.role)) redirect("/admin");
  return profile;
}

export async function requireUsersAdminPage() {
  const profile = await requireStaffPage();
  if (!canManageUsers(profile.role)) redirect("/admin");
  return profile;
}

export function roleMayEditSiteSettings(role: PublisherRole) {
  return role === "admin";
}
