"use server";

import { runSqlMigrationFiles } from "../publisher/schema/runSqlMigrations";
import { getPublisherSession } from "../publisher/supabase/server";

import { VI_ANALYTICS_MIGRATION_FILES } from "../publisher/schema/runSqlMigrations";

export async function installViAnalyticsSchemaFromAdmin(): Promise<{ ok: true } | { ok: false; error?: string }> {
  const { profile } = await getPublisherSession();
  if (profile?.role !== "admin") {
    return { ok: false, error: "Apenas administradores podem instalar o schema." };
  }

  const result = await runSqlMigrationFiles(VI_ANALYTICS_MIGRATION_FILES);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}
