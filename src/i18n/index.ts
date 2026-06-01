import { ar } from "./ar";
import { en } from "./en";
import { es } from "./es";
import { hi } from "./hi";
import { id } from "./id";
import { pt } from "./pt";
import { tr } from "./tr";
import { vi } from "./vi";

export const translations = {
  pt,
  en,
  es,
  hi,
  ar,
  tr,
  id,
  vi,
};

export type Locale = keyof typeof translations;
