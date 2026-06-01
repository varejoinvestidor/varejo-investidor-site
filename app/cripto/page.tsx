import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("cripto");

export default function CriptoPage() {
  return <MarketPage slug="cripto" />;
}
