/** Hubs de exposição — coordenadas geográficas reais [lon, lat]. */

export type SelectMapHubId = "us" | "uk" | "eu" | "jp" | "sg" | "latam";

export type SelectMapFlowEdge = {
  id: string;
  from: SelectMapHubId;
  to: SelectMapHubId;
  duration: number;
  delay: number;
};

/** Natural Earth 110m — proporções reais na projeção ortográfica. */
export const SELECT_GLOBE_VIEW = { width: 1000, height: 540, scale: 255, centerY: 268 };

export const SELECT_MAP_HUB_LONLAT: Record<SelectMapHubId, [number, number]> = {
  us: [-98.5, 39.5],
  uk: [-1.8, 52.8],
  eu: [12.5, 49.8],
  jp: [139.65, 35.5],
  sg: [103.85, 1.29],
  latam: [-58.5, -14.2],
};

export const SELECT_MAP_FLOW_EDGES: readonly SelectMapFlowEdge[] = [
  { id: "us-uk", from: "us", to: "uk", duration: 5.2, delay: 0 },
  { id: "uk-eu", from: "uk", to: "eu", duration: 3.8, delay: 0.4 },
  { id: "eu-jp", from: "eu", to: "jp", duration: 6.5, delay: 0.8 },
  { id: "jp-sg", from: "jp", to: "sg", duration: 4.6, delay: 1.1 },
  { id: "us-latam", from: "us", to: "latam", duration: 5.8, delay: 0.3 },
  { id: "eu-latam", from: "eu", to: "latam", duration: 6.2, delay: 1.4 },
  { id: "sg-latam", from: "sg", to: "latam", duration: 7.4, delay: 2 },
];

export const SELECT_MAP_LABEL_OFFSET: Record<
  SelectMapHubId,
  { dx: number; dy: number; align: "left" | "right" | "center" }
> = {
  us: { dx: -108, dy: -72, align: "left" },
  uk: { dx: -96, dy: -80, align: "left" },
  eu: { dx: 64, dy: -64, align: "left" },
  jp: { dx: 88, dy: -56, align: "right" },
  sg: { dx: 92, dy: 40, align: "right" },
  latam: { dx: -96, dy: 72, align: "left" },
};

export function flowsTouchingHub(hubId: SelectMapHubId): string[] {
  return SELECT_MAP_FLOW_EDGES.filter(
    (f) => f.from === hubId || f.to === hubId,
  ).map((f) => f.id);
}
