"use client";

import { AdminLoginForm } from "./AdminLoginForm";

export function AdminLoginClient({ returnTo }: { returnTo: string }) {
  return <AdminLoginForm returnTo={returnTo} />;
}
