/**
 * Smoke check: hubs de artigos por idioma (canônico + redirecionamentos listados).
 * Rode: node scripts/check-locale-hub-routes.mjs
 */
import { buildLegacyArticleRedirects } from "../src/i18n/legacyArticleRedirects.mjs";

const LOCALES = [
  ["pt", "/artigos"],
  ["en", "/en/artigos"],
  ["es", "/es/artigos"],
  ["fr", "/fr/artigos"],
  ["de", "/de/artigos"],
  ["it", "/it/artigos"],
  ["ar", "/ar/artigos"],
  ["fa", "/fa/artigos"],
  ["hi", "/hi/artigos"],
  ["ur", "/ur/artigos"],
  ["bn", "/bn/artigos"],
  ["tr", "/tr/artigos"],
  ["ru", "/ru/artigos"],
  ["id", "/id/artigos"],
  ["vi", "/vi/artigos"],
  ["th", "/th/artigos"],
  ["tl", "/fil/artigos"],
  ["zh", "/zh/artigos"],
  ["ja", "/ja/artigos"],
  ["ko", "/ko/artigos"],
  ["pl", "/pl/artigos"],
  ["he", "/he/artigos"],
];

const redirects = buildLegacyArticleRedirects();
console.log(`Redirects legados de artigos: ${redirects.length}`);
for (const [name, path] of LOCALES) {
  console.log(`  ${name.padEnd(4)} → ${path}`);
}

const missingDest = new Set(LOCALES.map(([, p]) => p));
for (const rule of redirects) {
  const dest = rule.destination.replace(/\/:slug\*$/, "");
  if (dest.startsWith("/") && !dest.includes(":") && !missingDest.has(dest) && dest.endsWith("/artigos")) {
    console.warn(`Redirect destino sem checagem de página: ${dest}`);
  }
}

console.log("OK — revise deploy e testes e2e em produção.");
