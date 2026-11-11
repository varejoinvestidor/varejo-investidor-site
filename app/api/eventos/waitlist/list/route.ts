import { NextResponse } from "next/server";
import { createPublisherServiceClient } from "../../../../../src/publisher/supabase/service";
import { createPublisherServerClient } from "../../../../../src/publisher/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = createPublisherServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase não configurado" }, { status: 503 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile || (profile.role !== "admin" && profile.role !== "editor")) {
    return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get("limit") ?? 100)));

  const admin = createPublisherServiceClient();
  if (!admin) {
    return NextResponse.json({ error: "Service role não configurado" }, { status: 503 });
  }

  const { data, error } = await admin
    .from("event_waitlist_signups")
    .select("id, created_at, name, email, whatsapp, country, city, language, utm_source, utm_campaign")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rows: data ?? [] });
}
