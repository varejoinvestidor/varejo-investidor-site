import { NextResponse } from "next/server";
import { eliteSchemaReady, probeSupabaseSchema } from "../../../../src/publisher/schema/supabaseTableProbe";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";
import { resolvePostgresConnectionString } from "../../../../src/publisher/schema/postgresConnection";

export const dynamic = "force-dynamic";

/** Diagnóstico de tabelas (admin/editor autenticado). */
export async function GET() {
  const { profile } = await getPublisherSession();
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const probe = await probeSupabaseSchema();

  return NextResponse.json({
    ...probe,
    eliteReady: eliteSchemaReady(probe),
    postgresConfigured: Boolean(resolvePostgresConnectionString()),
  });
}
