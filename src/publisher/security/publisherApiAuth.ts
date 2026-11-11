import { NextResponse } from "next/server";
import type { PublisherProfile } from "../types";
import { canManageUsers, canPublish, canViewSiteAnalytics, isPublisherStaffRole } from "../permissions";
import { getPublisherSession } from "../supabase/server";
import { assertCronBearer } from "./cronAuth";

export function jsonUnauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Caminho interno seguro para redirects pós-login OAuth. */
export function safePublisherRedirectPath(next: string | null | undefined, fallback = "/admin"): string {
  if (!next) return fallback;
  const value = next.trim();
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("://")) return fallback;
  if (!value.startsWith("/admin")) return fallback;
  return value;
}

type StaffAuthOk = { ok: true; profile: PublisherProfile };
type StaffAuthFail = { ok: false; response: NextResponse };

export async function requirePublisherStaffSession(): Promise<StaffAuthOk | StaffAuthFail> {
  const { user, profile } = await getPublisherSession();
  if (!user || !profile || !isPublisherStaffRole(profile.role)) {
    return { ok: false, response: jsonUnauthorized() };
  }
  return { ok: true, profile };
}

export async function requirePublisherAdminSession(): Promise<StaffAuthOk | StaffAuthFail> {
  const { user, profile } = await getPublisherSession();
  if (!user || !profile || profile.role !== "admin") {
    return { ok: false, response: jsonUnauthorized() };
  }
  return { ok: true, profile };
}

export async function requireCronOrPublisherAdmin(request: Request): Promise<
  { authorized: true; via: "cron" | "admin" } | { authorized: false; response: NextResponse }
> {
  if (assertCronBearer(request)) return { authorized: true, via: "cron" };
  const session = await requirePublisherAdminSession();
  if (!session.ok) {
    return { authorized: false, response: session.response };
  }
  return { authorized: true, via: "admin" };
}

export function staffMayRunSchemaInstall(profile: PublisherProfile) {
  return profile.role === "admin";
}

export function staffMayViewAnalytics(profile: PublisherProfile) {
  return canViewSiteAnalytics(profile.role);
}

export function staffMayPublish(profile: PublisherProfile) {
  return canPublish(profile.role);
}

export function staffMayManageUsers(profile: PublisherProfile) {
  return canManageUsers(profile.role);
}
