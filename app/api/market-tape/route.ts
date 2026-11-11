import { NextResponse } from "next/server";
import { buildGlobalMarketTape } from "../../../src/market/globalMarketTape";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const items = await buildGlobalMarketTape();
  return NextResponse.json({
    items,
    updatedAt: new Date().toISOString(),
  });
}
