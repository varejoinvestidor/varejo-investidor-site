import { NextResponse } from "next/server";
import { backfillAllArticleBannerEmbeds } from "../../../../src/publisher/articles/actions";
import { assertCronBearer } from "../../../../src/publisher/security/cronAuth";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Embute banners publicados em `content` + coluna (CRON_SECRET ou admin via action no painel). */
export async function POST(request: Request) {
  if (!assertCronBearer(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await backfillAllArticleBannerEmbeds();
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ...result.data });
}
