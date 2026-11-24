import { NextResponse } from "next/server";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES = new Set(["affiliate", "leader", "economic", "office", "analyst"]);
const buckets = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const row = buckets.get(ip);
  if (!row || now > row.reset) {
    buckets.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (row.count >= 8) return false;
  row.count += 1;
  return true;
}

function clean(value: unknown, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
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

  if (clean(body.company_site)) {
    return NextResponse.json({ ok: true });
  }

  const category = clean(body.category, 40);
  const name = clean(body.name, 160);
  const email = clean(body.email, 180).toLowerCase();
  const consent = body.consent === "on" || body.consent === true || body.consent === "true";

  if (!CATEGORIES.has(category) || !name || !email || !consent) {
    return NextResponse.json({ error: "Preencha nome, e-mail e o consentimento." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const admin = createPublisherServiceClient();
  if (!admin) {
    return NextResponse.json(
      { pending: true, error: "Banco indisponível. A manifestação não foi gravada." },
      { status: 503 },
    );
  }

  const { error } = await admin.from("partner_interest").insert({
    category,
    name,
    email,
    country: clean(body.country, 120) || null,
    city: clean(body.city, 120) || null,
    language: clean(body.language, 40) || clean(body.locale, 12) || null,
    consent: true,
    payload: {
      experience: clean(body.experience, 4000),
      structure: clean(body.structure, 4000),
      investment: clean(body.investment, 400),
      proposal: clean(body.proposal, 6000),
      specialty: clean(body.specialty, 400),
      history: clean(body.history, 6000),
      links: clean(body.links, 2000),
      presentation: clean(body.presentation, 6000),
      locale: clean(body.locale, 12),
    },
  });

  if (error) {
    if (/partner_interest|schema cache|does not exist/i.test(error.message)) {
      return NextResponse.json(
        {
          pending: true,
          error:
            "A tabela partner_interest ainda não existe. Execute supabase/migrations/20261124120000_partner_interest.sql. O envio não foi gravado.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Não foi possível registrar agora." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
