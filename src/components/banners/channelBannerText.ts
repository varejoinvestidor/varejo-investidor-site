/** Remove travessão (U+2014) de textos de interface. */
export function withoutEmDash(text: string): string {
  return text
    .replace(/\s*\u2014\s*/g, ". ")
    .replace(/\u2014/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\.\s*\./g, ".")
    .trim();
}
