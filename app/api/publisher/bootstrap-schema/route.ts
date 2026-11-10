import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import pg from "pg";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

function assertCron(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return false;
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  return token === secret;
}

/** Aplica migrations do Publisher (idempotente onde possível). */
export async function POST(request: Request) {
  if (!assertCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const conn =
    process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL ?? process.env.SUPABASE_DB_URL;
  if (!conn) {
    return NextResponse.json({ error: "POSTGRES_URL not configured" }, { status: 503 });
  }

  // Supabase pooler TLS (uso único no bootstrap de schema).
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const root = process.cwd();
  const files = [
    "20260308120000_publisher_foundation.sql",
    "20260308120001_storage_publisher_media.sql",
    "20260308130000_publisher_public_views.sql",
  ];

  const client = new pg.Client({ connectionString: conn, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    for (const file of files) {
      const sql = readFileSync(join(root, "supabase", "migrations", file), "utf8");
      await client.query(sql);
    }

    const { rows } = await client.query("select count(*)::int as n from public.categories");
    return NextResponse.json({ ok: true, categories: rows[0]?.n ?? 0 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Migration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await client.end().catch(() => undefined);
  }
}
