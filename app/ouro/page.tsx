import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("ouro");

export default function OuroPage() {
  return <MarketPage slug="ouro" />;
}
