import { NextResponse } from "next/server";

const priceMap = {
  monthly: "price_1TXvJHAetIvwiZrV93ZeRRL8",
  quarterly: "price_1TXvJHAetIvwiZrVxMbV3F4L",
  semiannual: "price_1TXvJHAetIvwiZrV9YpL5tAd",
  annual: "price_1TXvJHAetIvwiZrVZFrwru8K",
} as const;

type PlanId = keyof typeof priceMap;

function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in priceMap;
}

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!secretKey) {
      return NextResponse.json({ error: "STRIPE_SECRET_KEY não configurada." }, { status: 500 });
    }

    if (!siteUrl) {
      return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL não configurada." }, { status: 500 });
    }

    const body = await req.json();
    const { planId } = body as { planId?: unknown };

    if (!isPlanId(planId)) {
      return NextResponse.json({ error: "Plano inválido" }, { status: 400 });
    }

    const form = new URLSearchParams({
      mode: "subscription",
      "payment_method_types[0]": "card",
      "line_items[0][price]": priceMap[planId],
      "line_items[0][quantity]": "1",
      success_url: `${siteUrl}/sucesso`,
      cancel_url: `${siteUrl}/cancelado`,
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });

    const session = (await response.json()) as { url?: string; error?: { message?: string } };

    if (!response.ok || !session.url) {
      console.error("Stripe Error:", session.error?.message ?? session);
      return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }
}
