import { createPublisherPublicClient } from "../supabase/public";
import { resolvePostgresConnectionString } from "./postgresConnection";

export type SupabaseTableStatus = "ok" | "missing" | "unconfigured" | "error";

export type SupabaseSchemaProbe = {
  supabaseConfigured: boolean;
  postgresConfigured: boolean;
  tables: Record<string, { status: SupabaseTableStatus; message?: string }>;
};

const PROBE_TABLES = [
  "categories",
  "articles",
  "elite_operations",
  "elite_monthly_reports",
] as const;

export async function probeSupabaseSchema(): Promise<SupabaseSchemaProbe> {
  const client = createPublisherPublicClient();
  const supabaseConfigured = Boolean(client);
  const postgresConfigured = Boolean(resolvePostgresConnectionString());

  const tables = {} as SupabaseSchemaProbe["tables"];

  if (!client) {
    for (const name of PROBE_TABLES) {
      tables[name] = { status: "unconfigured" };
    }
    return { supabaseConfigured, postgresConfigured, tables };
  }

  await Promise.all(
    PROBE_TABLES.map(async (name) => {
      const { error } = await client.from(name).select("id", { head: true, count: "exact" }).limit(1);
      if (!error) {
        tables[name] = { status: "ok" };
        return;
      }
      const msg = error.message ?? "unknown";
      if (error.code === "PGRST205" || /could not find the table/i.test(msg)) {
        tables[name] = { status: "missing", message: msg };
        return;
      }
      tables[name] = { status: "error", message: msg };
    }),
  );

  return { supabaseConfigured, postgresConfigured, tables };
}

export function eliteSchemaReady(probe: SupabaseSchemaProbe): boolean {
  return (
    probe.tables.elite_operations?.status === "ok" && probe.tables.elite_monthly_reports?.status === "ok"
  );
}
