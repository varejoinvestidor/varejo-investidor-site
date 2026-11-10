import { runSqlMigrationFiles, VI_ANALYTICS_MIGRATION_FILES } from "../publisher/schema/runSqlMigrations";
import { resolvePostgresConnectionString } from "../publisher/schema/postgresConnection";
import { createPublisherServiceClient } from "../publisher/supabase/service";
import type { AnalyticsSchemaState } from "./admin/queries";

export type EnsureViAnalyticsResult =
  | { ok: true; state: AnalyticsSchemaState; installed: boolean }
  | { ok: false; error: string; state: AnalyticsSchemaState };

async function probeState(): Promise<AnalyticsSchemaState> {
  const admin = createPublisherServiceClient();
  if (!admin) return "unconfigured";
  const { error } = await admin.from("site_analytics_events").select("id", { head: true }).limit(0);
  if (error) {
    const msg = error.message ?? "";
    if (error.code === "PGRST205" || /could not find the table/i.test(msg)) return "missing";
    return "missing";
  }
  const { error: regionRpcError } = await admin.rpc("analytics_by_region", {
    p_from: new Date(0).toISOString(),
    p_to: new Date().toISOString(),
    p_limit: 1,
  });
  if (regionRpcError && /analytics_by_region|Could not find the function|PGRST202/i.test(regionRpcError.message)) {
    return "partial";
  }
  return "ok";
}

/** Aplica migrations VI Analytics quando Postgres está configurado (idempotente). */
export async function ensureViAnalyticsSchema(): Promise<EnsureViAnalyticsResult> {
  const before = await probeState();
  if (before === "ok") return { ok: true, state: "ok", installed: false };
  if (before === "unconfigured") {
    return { ok: false, error: "Supabase service role indisponível.", state: "unconfigured" };
  }

  if (!resolvePostgresConnectionString()) {
    return {
      ok: false,
      error: "POSTGRES_URL não configurado — use o botão no admin ou rode o SQL manualmente.",
      state: before,
    };
  }

  const migrated = await runSqlMigrationFiles(VI_ANALYTICS_MIGRATION_FILES);
  if (!migrated.ok) return { ok: false, error: migrated.error, state: before };

  const after = await probeState();
  if (after === "ok" || after === "partial") {
    return { ok: true, state: after, installed: true };
  }
  return { ok: false, error: "Migration aplicada mas o schema ainda incompleto.", state: after };
}
