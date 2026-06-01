import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { hi } from "./hi";
import { pt } from "./pt";
import { tr } from "./tr";

export const translations = {
  pt,
  en,
  es,
  hi,
  ar,
  tr,
};

export type Locale = keyof typeof translations;
