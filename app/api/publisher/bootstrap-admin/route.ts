import { NextResponse } from "next/server";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";

/**
 * Cria/promove admin (uso único). Protegido por CRON_SECRET.
 * POST + Authorization: Bearer <CRON_SECRET>
 * Body: { "email": "...", "password": "...", "fullName"?: "..." }
 */
export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { email?: string; password?: string; fullName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;
  const fullName = body.fullName?.trim() || "Administrador";

  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: "email and password (min 8) required" }, { status: 400 });
  }

  const admin = createPublisherServiceClient();
  if (!admin) {
    return NextResponse.json({ error: "Supabase service role not configured" }, { status: 503 });
  }

  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const existing = list?.users?.find((u) => u.email?.toLowerCase() === email);

  let userId = existing?.id;

  if (!userId) {
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    userId = data.user.id;
  } else {
    const { error } = await admin.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({ role: "admin", full_name: fullName, email })
    .eq("id", userId);

  if (profileError) {
    const { error: upsertError } = await admin.from("profiles").upsert({
      id: userId,
      email,
      full_name: fullName,
      role: "admin",
    });
    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, email, userId });
}
