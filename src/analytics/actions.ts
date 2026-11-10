"use server";

import { runSqlMigrationFiles } from "../publisher/schema/runSqlMigrations";
import { getPublisherSession } from "../publisher/supabase/server";

const VI_ANALYTICS_MIGRATION_FILES = ["20260318120000_vi_analytics.sql"] as const;

export async function installViAnalyticsSchemaFromAdmin(): Promise<{ ok: true } | { ok: false; error?: string }> {
  const { profile } = await getPublisherSession();
  if (profile?.role !== "admin") {
    return { ok: false, error: "Apenas administradores podem instalar o schema." };
  }

  const result = await runSqlMigrationFiles(VI_ANALYTICS_MIGRATION_FILES);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}
