import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("forex");

export default function ForexPage() {
  return <MarketPage slug="forex" />;
}
