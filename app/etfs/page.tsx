import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("etfs");

export default function EtfsPage() {
  return <MarketPage slug="etfs" />;
}
