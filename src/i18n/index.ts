import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { fa } from "./fa";
import { hi } from "./hi";
import { id } from "./id";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { pt } from "./pt";
import { pl } from "./pl";
import { zh } from "./zh";
import { bn } from "./bn";
import { ur } from "./ur";
import { ru } from "./ru";
import { th } from "./th";
import { tl } from "./tl";
import { tr } from "./tr";
import { vi } from "./vi";
export {
  DEFAULT_LOCALE,
  RTL_LOCALES,
  SUPPORTED_LOCALES,
  isRtlLocale,
  isSupportedLocale,
  localeToHtmlLang,
  type Locale,
  type SupportedLocale,
} from "./locales";
import type { SupportedLocale } from "./locales";

export type TranslationSchema = typeof en;

const translationMap = {
  pt,
  en,
  es,
  fr,
  it,
  de,
  fa,
  hi,
  ar,
  tr,
  id,
  vi,
  th,
  ru,
  ur,
  bn,
  ja,
  ko,
  zh,
  pl,
  tl,
} satisfies Record<SupportedLocale, TranslationSchema>;

export const translations: Record<string, TranslationSchema> = translationMap;
