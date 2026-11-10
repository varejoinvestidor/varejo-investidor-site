"use client";

import { AdminLoginForm } from "./AdminLoginForm";

export function AdminLoginClient({ returnTo, urlError }: { returnTo: string; urlError?: string }) {
  return <AdminLoginForm returnTo={returnTo} urlError={urlError} />;
}
