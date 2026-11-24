import { NextResponse } from "next/server";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export async function POST(request: Request) {
  const secret = process.env.LASTLINK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Webhook Lastlink ainda não configurado." }, { status: 503 });
  }
  if (request.headers.get("x-partnership-webhook-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
  }
  const db = createPublisherServiceClient();
  if (!db) return NextResponse.json({ ok: false, error: "Banco indisponível." }, { status: 503 });

  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  const externalId = String(payload.id ?? payload.order_id ?? payload.external_id ?? "");
  if (!externalId) return NextResponse.json({ ok: false, error: "Pedido sem identificador." }, { status: 400 });

  const { error: eventError } = await db.from("partnership_lastlink_events").insert({ external_id: externalId, payload });
  if (eventError && !eventError.message.includes("duplicate")) {
    return NextResponse.json({ ok: false, error: eventError.message }, { status: 500 });
  }
  if (eventError) return NextResponse.json({ ok: true, duplicate: true });

  await db.from("partnership_lastlink_orders").upsert(
    {
      external_id: externalId,
      product: payload.product ?? null,
      buyer: payload.buyer ?? payload.customer ?? null,
      affiliate_code: payload.affiliate_code ?? payload.affiliate ?? null,
      leader_code: payload.leader_code ?? null,
      language: payload.language ?? null,
      country: payload.country ?? null,
      campaign: payload.campaign ?? null,
      ordered_at: payload.ordered_at ?? null,
      gross_amount: payload.gross_amount ?? payload.amount ?? null,
      fees: payload.fees ?? null,
      payment_status: payload.payment_status ?? payload.status ?? null,
      refunded: Boolean(payload.refunded),
      chargeback: Boolean(payload.chargeback),
      renewal: Boolean(payload.renewal),
      raw: payload,
    },
    { onConflict: "external_id" },
  );
  await db.from("partnership_audit").insert({ area: "lastlink", action: "webhook", detail: externalId });
  return NextResponse.json({ ok: true });
}
