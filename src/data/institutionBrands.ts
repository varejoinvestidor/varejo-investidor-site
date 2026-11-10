export type InstitutionBrand = {
  name: string;
  domain: string;
  monogram: string;
};

export const brazilInstitutionBrands: InstitutionBrand[] = [
  { name: "Itaú Private", domain: "itau.com.br", monogram: "IT" },
  { name: "BTG Pactual", domain: "btgpactual.com", monogram: "BTG" },
  { name: "XP Private", domain: "xpi.com.br", monogram: "XP" },
  { name: "Bradesco", domain: "bradesco.com.br", monogram: "B" },
  { name: "Santander", domain: "santander.com.br", monogram: "SAN" },
  { name: "Safra", domain: "safra.com.br", monogram: "S" },
  { name: "Banco do Brasil", domain: "bb.com.br", monogram: "BB" },
];

export const globalInstitutionBrands: InstitutionBrand[] = [
  { name: "Morgan Stanley", domain: "morganstanley.com", monogram: "MS" },
  { name: "J.P. Morgan", domain: "jpmorgan.com", monogram: "JPM" },
  { name: "Goldman Sachs", domain: "goldmansachs.com", monogram: "GS" },
  { name: "UBS", domain: "ubs.com", monogram: "UBS" },
  { name: "Credit Suisse", domain: "credit-suisse.com", monogram: "CS" },
  { name: "Interactive Brokers", domain: "interactivebrokers.com", monogram: "IB" },
  { name: "Charles Schwab", domain: "schwab.com", monogram: "SCH" },
  { name: "Binance", domain: "binance.com", monogram: "BN" },
  { name: "Nomad", domain: "nomadglobal.com", monogram: "N" },
  { name: "Avenue", domain: "avenue.us", monogram: "AV" },
];

export function institutionLogoUrl(domain: string) {
  return `https://logo.clearbit.com/${domain}`;
}
