import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { hi } from "./hi";
import { id } from "./id";
import { ja } from "./ja";
import { ko } from "./ko";
import { pt } from "./pt";
import { bn } from "./bn";
import { ur } from "./ur";
import { ru } from "./ru";
import { th } from "./th";
import { tr } from "./tr";
import { vi } from "./vi";

export const translations: Record<string, typeof en> = {
  pt,
  en,
  es,
  fr,
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
};

export type Locale = keyof typeof translations;
