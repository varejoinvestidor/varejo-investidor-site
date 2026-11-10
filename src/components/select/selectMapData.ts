/** Projeção equirectangular simplificada — viewBox 0 0 1000 520 */

export type SelectMapHubId = "us" | "uk" | "eu" | "jp" | "sg" | "latam";

export type SelectMapHub = {
  id: SelectMapHubId;
  x: number;
  y: number;
};

export type SelectMapFlow = {
  id: string;
  path: string;
  duration: number;
  delay: number;
};

/** Massas continentais (detalhe médio — costas + ilhas principais). */
export const SELECT_MAP_LAND_PATHS: readonly string[] = [
  /* América do Norte */
  "M 58 95 L 118 72 178 68 238 82 278 118 298 158 292 198 268 248 248 298 218 332 178 348 138 338 108 298 88 248 72 198 58 145 Z",
  "M 248 118 L 288 108 318 128 308 158 268 168 Z",
  /* Groenlândia */
  "M 318 62 L 368 55 398 78 388 108 348 118 318 95 Z",
  /* América Central + Caribe */
  "M 218 318 L 248 308 268 328 258 358 228 368 208 348 Z",
  "M 268 328 L 298 318 318 338 308 368 278 378 258 358 Z",
  /* América do Sul */
  "M 248 368 L 298 358 338 378 358 418 348 468 318 498 278 488 248 458 228 418 238 388 Z",
  "M 278 418 L 318 408 338 438 318 468 288 458 Z",
  /* Europa */
  "M 448 108 L 488 98 528 108 548 138 538 168 508 178 468 168 448 138 Z",
  "M 468 168 L 508 158 548 178 568 208 558 238 528 248 488 228 468 198 Z",
  "M 488 228 L 528 218 548 248 528 268 498 258 Z",
  /* África */
  "M 488 248 L 528 238 568 258 588 298 578 358 548 408 508 438 468 428 448 388 458 338 478 288 Z",
  "M 528 358 L 558 348 578 378 558 408 528 398 Z",
  /* Oriente Médio */
  "M 548 208 L 588 198 618 218 608 248 578 258 548 238 Z",
  /* Ásia */
  "M 568 118 L 648 108 728 118 808 148 848 188 868 238 848 288 808 318 748 328 688 308 648 278 608 248 568 208 548 168 558 138 Z",
  "M 688 258 L 728 248 758 268 748 298 718 308 688 288 Z",
  "M 748 208 L 788 198 818 218 808 248 778 258 748 238 Z",
  /* Índia */
  "M 628 268 L 658 258 678 288 658 318 628 308 Z",
  /* Sudeste asiático */
  "M 708 298 L 748 288 778 318 758 348 718 358 688 328 Z",
  /* Japão */
  "M 818 198 L 838 188 848 208 838 228 818 218 Z",
  "M 838 208 L 858 198 868 218 858 238 838 228 Z",
  /* China costa */
  "M 768 228 L 808 218 828 248 808 278 768 268 Z",
  /* Oceania */
  "M 768 388 L 828 378 868 408 848 448 808 458 768 428 Z",
  "M 848 428 L 878 418 898 438 878 458 848 448 Z",
  /* Indonésia / arquipélago */
  "M 718 358 L 748 348 768 368 748 388 718 378 Z",
  "M 748 368 L 778 358 798 378 778 398 748 388 Z",
];

export const SELECT_MAP_HUBS: Record<SelectMapHubId, SelectMapHub> = {
  us: { id: "us", x: 210, y: 198 },
  uk: { id: "uk", x: 460, y: 160 },
  eu: { id: "eu", x: 508, y: 186 },
  jp: { id: "jp", x: 824, y: 224 },
  sg: { id: "sg", x: 716, y: 318 },
  latam: { id: "latam", x: 305, y: 386 },
};

/** Rotas de exposição / fluxo de capital entre hubs. */
export const SELECT_MAP_FLOWS: readonly SelectMapFlow[] = [
  { id: "us-uk", path: "M 210 198 Q 320 118 460 160", duration: 5.2, delay: 0 },
  { id: "uk-eu", path: "M 460 160 Q 478 148 508 186", duration: 3.8, delay: 0.4 },
  { id: "eu-jp", path: "M 508 186 Q 650 142 824 224", duration: 6.5, delay: 0.8 },
  { id: "jp-sg", path: "M 824 224 Q 780 268 716 318", duration: 4.6, delay: 1.1 },
  { id: "us-latam", path: "M 210 198 Q 170 298 305 386", duration: 5.8, delay: 0.3 },
  { id: "eu-latam", path: "M 508 186 Q 400 298 305 386", duration: 6.2, delay: 1.4 },
  { id: "sg-latam", path: "M 716 318 Q 520 380 305 386", duration: 7.4, delay: 2 },
];

export const SELECT_MAP_LABEL_ANCHORS: Record<
  SelectMapHubId,
  { left: string; top: string; align: "left" | "right" }
> = {
  us: { left: "7%", top: "14%", align: "left" },
  uk: { left: "36%", top: "8%", align: "left" },
  eu: { left: "52%", top: "14%", align: "left" },
  jp: { left: "auto", top: "20%", align: "right" },
  sg: { left: "auto", top: "58%", align: "right" },
  latam: { left: "8%", top: "auto", align: "left" },
};

/** Graticulado (meridianos). */
export const SELECT_MAP_GRATICULE: readonly string[] = [
  "M 200 40 V 480",
  "M 400 40 V 480",
  "M 600 40 V 480",
  "M 800 40 V 480",
  "M 40 130 H 960",
  "M 40 260 H 960",
  "M 40 390 H 960",
];

export function flowsTouchingHub(hubId: SelectMapHubId): string[] {
  return SELECT_MAP_FLOWS.filter((f) => f.id.startsWith(`${hubId}-`) || f.id.endsWith(`-${hubId}`)).map((f) => f.id);
}
