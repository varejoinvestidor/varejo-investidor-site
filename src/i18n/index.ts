import { en } from "./en";
import { es } from "./es";
import { hi } from "./hi";
import { pt } from "./pt";

export const translations = {
  pt,
  en,
  es,
  hi,
};

export type Locale = keyof typeof translations;
