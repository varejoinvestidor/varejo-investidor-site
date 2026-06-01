import { MarketPage } from "../../src/components/MarketPage";
import { createMarketMetadata } from "../../src/data/marketMetadata";

export const metadata = createMarketMetadata("fundos-imobiliarios");

export default function FundosImobiliariosPage() {
  return <MarketPage slug="fundos-imobiliarios" />;
}
