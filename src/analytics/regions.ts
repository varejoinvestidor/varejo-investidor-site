export type AnalyticsRegionId =
  | "brazil"
  | "latinAmerica"
  | "northAmerica"
  | "europe"
  | "middleEast"
  | "asia"
  | "oceania"
  | "africa"
  | "other";

export const ANALYTICS_REGION_LABELS: Record<AnalyticsRegionId, string> = {
  brazil: "Brasil",
  latinAmerica: "América Latina",
  northAmerica: "América do Norte",
  europe: "Europa",
  middleEast: "Oriente Médio",
  asia: "Ásia",
  oceania: "Oceania",
  africa: "África",
  other: "Indefinido",
};

/** Nomes em português para o painel admin */
export const ANALYTICS_COUNTRY_NAMES: Record<string, string> = {
  BR: "Brasil",
  US: "Estados Unidos",
  CA: "Canadá",
  MX: "México",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colômbia",
  PE: "Peru",
  PT: "Portugal",
  ES: "Espanha",
  FR: "França",
  DE: "Alemanha",
  IT: "Itália",
  GB: "Reino Unido",
  IE: "Irlanda",
  CH: "Suíça",
  NL: "Países Baixos",
  BE: "Bélgica",
  AT: "Áustria",
  PL: "Polônia",
  SE: "Suécia",
  NO: "Noruega",
  DK: "Dinamarca",
  FI: "Finlândia",
  RU: "Rússia",
  UA: "Ucrânia",
  TR: "Turquia",
  AE: "Emirados Árabes",
  SA: "Arábia Saudita",
  IL: "Israel",
  IN: "Índia",
  CN: "China",
  JP: "Japão",
  KR: "Coreia do Sul",
  SG: "Singapura",
  ID: "Indonésia",
  TH: "Tailândia",
  VN: "Vietnã",
  PH: "Filipinas",
  AU: "Austrália",
  NZ: "Nova Zelândia",
  ZA: "África do Sul",
  NG: "Nigéria",
  EG: "Egito",
  MA: "Marrocos",
};

const LATIN_AMERICA = new Set([
  "MX",
  "AR",
  "CL",
  "CO",
  "PE",
  "UY",
  "PY",
  "BO",
  "EC",
  "VE",
  "CR",
  "PA",
  "GT",
  "HN",
  "SV",
  "NI",
  "DO",
  "CU",
  "PR",
  "HT",
  "JM",
  "TT",
  "BZ",
  "GY",
  "SR",
  "GF",
]);

const NORTH_AMERICA = new Set(["US", "CA"]);

const EUROPE = new Set([
  "PT",
  "ES",
  "FR",
  "DE",
  "IT",
  "GB",
  "IE",
  "CH",
  "NL",
  "BE",
  "AT",
  "PL",
  "SE",
  "NO",
  "DK",
  "FI",
  "GR",
  "CZ",
  "HU",
  "RO",
  "BG",
  "HR",
  "SK",
  "SI",
  "LT",
  "LV",
  "EE",
  "LU",
  "MT",
  "CY",
  "IS",
  "RS",
  "BA",
  "MK",
  "AL",
  "ME",
  "UA",
  "BY",
  "MD",
  "RU",
]);

const MIDDLE_EAST = new Set(["AE", "SA", "IL", "QA", "KW", "OM", "BH", "JO", "LB", "IQ", "IR", "YE", "SY", "TR"]);

const ASIA = new Set([
  "IN",
  "CN",
  "JP",
  "KR",
  "SG",
  "ID",
  "TH",
  "VN",
  "PH",
  "MY",
  "TW",
  "HK",
  "PK",
  "BD",
  "LK",
  "NP",
  "MM",
  "KH",
  "LA",
  "MN",
  "KZ",
  "UZ",
]);

const OCEANIA = new Set(["AU", "NZ", "FJ", "PG"]);

const AFRICA = new Set([
  "ZA",
  "NG",
  "EG",
  "MA",
  "KE",
  "GH",
  "TZ",
  "ET",
  "DZ",
  "TN",
  "AO",
  "MZ",
  "CM",
  "CI",
  "SN",
  "UG",
]);

export function countryToAnalyticsRegion(countryCode: string | null | undefined): AnalyticsRegionId {
  const code = (countryCode ?? "").trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return "other";
  if (code === "BR") return "brazil";
  if (LATIN_AMERICA.has(code)) return "latinAmerica";
  if (NORTH_AMERICA.has(code)) return "northAmerica";
  if (EUROPE.has(code)) return "europe";
  if (MIDDLE_EAST.has(code)) return "middleEast";
  if (OCEANIA.has(code)) return "oceania";
  if (AFRICA.has(code)) return "africa";
  if (ASIA.has(code)) return "asia";
  return "other";
}

export function regionLabel(id: AnalyticsRegionId | string | null | undefined): string {
  const key = (id ?? "other") as AnalyticsRegionId;
  return ANALYTICS_REGION_LABELS[key] ?? ANALYTICS_REGION_LABELS.other;
}

export function countryDisplayName(code: string | null | undefined): string {
  const c = (code ?? "").trim().toUpperCase();
  if (!c) return "—";
  return ANALYTICS_COUNTRY_NAMES[c] ?? c;
}

const LOCALE_DEFAULT_COUNTRY: Record<string, string> = {
  pt: "BR",
  en: "US",
  es: "ES",
  fr: "FR",
  de: "DE",
  it: "IT",
  ar: "SA",
  fa: "IR",
  hi: "IN",
  ur: "PK",
  bn: "BD",
  tr: "TR",
  ru: "RU",
  id: "ID",
  vi: "VN",
  th: "TH",
  tl: "PH",
  zh: "CN",
  ja: "JP",
  ko: "KR",
  pl: "PL",
  he: "IL",
};

/** Inferência quando o CDN não envia país (dev local, proxy genérico). */
export function inferCountryFromTimezone(timezone: string | null | undefined): string | null {
  const tz = (timezone ?? "").trim();
  if (!tz) return null;
  if (tz === "America/Sao_Paulo" || tz.startsWith("America/Fortaleza") || tz.startsWith("America/Belem")) return "BR";
  if (tz.startsWith("America/Argentina")) return "AR";
  if (tz.startsWith("America/Santiago")) return "CL";
  if (tz.startsWith("America/Bogota")) return "CO";
  if (tz.startsWith("America/Mexico")) return "MX";
  if (tz.startsWith("America/Lima")) return "PE";
  if (tz.startsWith("America/New_York") || tz.startsWith("America/Chicago") || tz.startsWith("America/Denver")) return "US";
  if (tz.startsWith("America/Los_Angeles") || tz.startsWith("America/Phoenix")) return "US";
  if (tz.startsWith("America/Toronto") || tz.startsWith("America/Vancouver")) return "CA";
  if (tz.startsWith("Europe/Lisbon")) return "PT";
  if (tz.startsWith("Europe/Madrid")) return "ES";
  if (tz.startsWith("Europe/London")) return "GB";
  if (tz.startsWith("Europe/")) return "DE";
  if (tz.startsWith("Asia/Tokyo")) return "JP";
  if (tz.startsWith("Asia/Seoul")) return "KR";
  if (tz.startsWith("Asia/Shanghai") || tz.startsWith("Asia/Hong_Kong")) return "CN";
  if (tz.startsWith("Asia/Kolkata")) return "IN";
  if (tz.startsWith("Asia/")) return "SG";
  if (tz.startsWith("Australia/")) return "AU";
  if (tz.startsWith("Pacific/Auckland")) return "NZ";
  return null;
}

export function inferCountryFromLocale(locale: string | null | undefined): string | null {
  const loc = (locale ?? "").trim().toLowerCase().split("-")[0];
  if (!loc) return "BR";
  return LOCALE_DEFAULT_COUNTRY[loc] ?? null;
}

export type ResolvedAnalyticsGeo = {
  countryCode: string | null;
  regionId: AnalyticsRegionId;
  regionLabel: string;
};

export function resolveAnalyticsGeo(input: {
  countryHeader?: string | null;
  locale?: string | null;
  timezone?: string | null;
}): ResolvedAnalyticsGeo {
  const rawHeader = (input.countryHeader ?? "").trim().toUpperCase();
  let country =
    rawHeader.length === 2 && rawHeader !== "XX" && rawHeader !== "T1" ? rawHeader : null;

  if (!country) country = inferCountryFromTimezone(input.timezone);
  if (!country) country = inferCountryFromLocale(input.locale);

  const regionId = countryToAnalyticsRegion(country);
  return {
    countryCode: country,
    regionId,
    regionLabel: regionLabel(regionId),
  };
}

export function countryCodeFromRequestHeaders(headers: Headers): string | null {
  const candidates = [
    headers.get("x-vercel-ip-country"),
    headers.get("cf-ipcountry"),
    headers.get("x-country-code"),
    headers.get("cloudfront-viewer-country"),
  ];
  for (const raw of candidates) {
    const code = (raw ?? "").trim().toUpperCase();
    if (code.length === 2 && code !== "XX" && code !== "T1") return code;
  }
  return null;
}
