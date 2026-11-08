import { NextResponse } from "next/server";
import { createPublisherServiceClient } from "../../../../src/publisher/supabase/service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createPublisherServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase service client unavailable" }, { status: 503 });
  }

  const now = new Date().toISOString();

  const { data: due, error: selectError } = await supabase
    .from("articles")
    .select("id, slug")
    .eq("status", "scheduled")
    .lte("scheduled_at", now);

  if (selectError) {
    return NextResponse.json({ ok: false, error: selectError.message }, { status: 500 });
  }

  const ids = (due ?? []).map((row) => row.id);
  if (!ids.length) {
    return NextResponse.json({ ok: true, published: 0 });
  }

  const { error: updateError } = await supabase
    .from("articles")
    .update({
      status: "published",
      published_at: now,
      scheduled_at: null,
    })
    .in("id", ids);

  if (updateError) {
    return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
  }

  await supabase.from("activity_logs").insert(
    ids.map((id) => ({
      action: "article.cron_published",
      entity_type: "article",
      entity_id: id,
      metadata: { published_at: now },
    })),
  );

  return NextResponse.json({ ok: true, published: ids.length, slugs: due?.map((d) => d.slug) });
}
