import { NextResponse } from "next/server";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 200;
const buckets = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const row = buckets.get(ip);
  if (!row || now > row.reset) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (row.count >= 15) return false;
  row.count += 1;
  return true;
}

function clean(v: unknown, max = MAX_LEN): string {
  return String(v ?? "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde um minuto." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const whatsapp = clean(body.whatsapp, 40);
  const country = clean(body.country, 120);
  const country_code = clean(body.country_code, 8).toUpperCase();
  const city = clean(body.city, 120);
  const continent = clean(body.continent, 80);
  const language = clean(body.language, 12);
  const lead_list = clean(body.lead_list, 160);
  const origin = clean(body.origin, 80) || "eventos";
  const utm_source = clean(body.utm_source, 80);
  const utm_medium = clean(body.utm_medium, 80);
  const utm_campaign = clean(body.utm_campaign, 120);

  if (!name || !email || !country || !city) {
    return NextResponse.json({ error: "Preencha nome, e-mail, país e cidade." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const admin = createPublisherServiceClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Banco indisponível. Tente mais tarde ou fale com o suporte." },
      { status: 503 },
    );
  }

  const row = {
    name,
    email,
    whatsapp: whatsapp || null,
    country,
    country_code: country_code || null,
    city,
    continent: continent || null,
    language: language || null,
    lead_list: lead_list || "EVENTOS PRESENCIAIS VAREJO INVESTIDOR",
    origin,
    utm_source: utm_source || null,
    utm_medium: utm_medium || null,
    utm_campaign: utm_campaign || null,
    raw_meta: { ip, user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null },
  };

  const { error } = await admin.from("event_waitlist_signups").insert(row);

  if (error) {
    if (/event_waitlist_signups|schema cache|does not exist/i.test(error.message)) {
      return NextResponse.json(
        {
          error:
            "Tabela event_waitlist_signups ainda não existe no Supabase. Execute a migration 20260322120000_event_waitlist.sql.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Não foi possível salvar o cadastro." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
