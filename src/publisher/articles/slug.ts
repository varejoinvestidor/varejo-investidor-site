const DASHES = /[\u0300-\u036f]/g;

export function slugifyTitle(title: string) {
  return title
    .normalize("NFD")
    .replace(DASHES, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function emptyTipTapDocument() {
  return { type: "doc", content: [{ type: "paragraph" }] };
}
