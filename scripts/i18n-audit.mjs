import fs from "node:fs";
import path from "node:path";

const i18nDir = path.join(process.cwd(), "src", "i18n");
const LOCALES = [
  "pt", "en", "es", "fr", "de", "it", "ar", "fa", "hi", "ur", "bn", "tr", "ru", "id", "vi", "th", "tl", "zh", "ja", "ko", "pl", "he",
];
const files = LOCALES.map((l) => `${l}.ts`);

let failures = 0;
for (const file of files) {
  const code = fs.readFileSync(path.join(i18nDir, file), "utf8");
  const usesEn = /import\s*\{\s*en\s*\}\s*from\s*["']\.\/en["']/.test(code) || /\.\.\.en\b/.test(code);
  const locale = file.replace(/\.ts$/, "");
  if (usesEn) {
    console.log(`INCOMPLETE\t${locale}`);
    failures += 1;
  } else {
    console.log(`OK\t\t${locale}`);
  }
}
console.log(`\n${files.length - failures}/${files.length} locales without en spread`);
process.exit(failures > 0 ? 1 : 0);
