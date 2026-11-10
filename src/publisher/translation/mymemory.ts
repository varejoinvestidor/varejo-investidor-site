const CHUNK = 450;

export async function translateText(text: string, langpair: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const parts: string[] = [];
  for (let i = 0; i < trimmed.length; i += CHUNK) {
    parts.push(trimmed.slice(i, i + CHUNK));
  }

  const out: string[] = [];
  for (const part of parts) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(part)}&langpair=${encodeURIComponent(langpair)}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("Serviço de tradução indisponível.");
    const json = (await res.json()) as { responseData?: { translatedText?: string } };
    const translated = json.responseData?.translatedText?.trim();
    if (!translated) throw new Error("Não foi possível traduzir este trecho.");
    out.push(translated);
  }

  return out.join(" ");
}

export function langPairForTarget(target: string, source: string) {
  const map: Record<string, string> = {
    pt: "pt-BR",
    en: "en",
    es: "es",
    fr: "fr",
    de: "de",
    it: "it",
    ar: "ar",
    fa: "fa",
    hi: "hi",
    ur: "ur",
    bn: "bn",
    tr: "tr",
    ru: "ru",
    id: "id",
    vi: "vi",
    th: "th",
    tl: "tl",
    zh: "zh-CN",
    ja: "ja",
    ko: "ko",
    pl: "pl",
    he: "he",
  };
  const from = map[source] ?? source;
  const to = map[target] ?? target;
  return `${from}|${to}`;
}
