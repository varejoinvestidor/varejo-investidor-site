import { geoDistance, geoInterpolate, geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, FeatureCollection, LineString } from "geojson";
import type { Topology } from "topojson-specification";
import worldTopo from "world-atlas/countries-110m.json";
import {
  SELECT_GLOBE_VIEW,
  SELECT_MAP_FLOW_EDGES,
  SELECT_MAP_HUB_LONLAT,
  type SelectMapHubId,
} from "./selectMapData";

const countriesTopo = worldTopo as unknown as Topology;
const worldCountries = feature(countriesTopo, countriesTopo.objects.countries) as FeatureCollection;

function geodesicLine(a: [number, number], b: [number, number], steps = 72): [number, number][] {
  const interp = geoInterpolate(a, b);
  const coords: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    coords.push(interp(i / steps) as [number, number]);
  }
  return coords;
}

export type GlobeRenderModel = {
  sphere: string | null;
  graticule: string | null;
  landPaths: { id: string; d: string }[];
  flows: { id: string; d: string; duration: number; delay: number; visible: boolean }[];
  hubs: { id: SelectMapHubId; x: number; y: number; visible: boolean }[];
};

export function buildGlobeModel(rotation: [number, number, number]): GlobeRenderModel {
  const { width, height, scale, centerY } = SELECT_GLOBE_VIEW;
  const projection = geoOrthographic()
    .scale(scale)
    .translate([width / 2, centerY])
    .rotate(rotation)
    .clipAngle(90);

  const path = geoPath(projection);

  const sphere = path({ type: "Sphere" }) ?? null;
  const graticule = path(geoGraticule().step([18, 18])()) ?? null;

  const landPaths = worldCountries.features
    .map((f, index) => ({
      id: String((f.id ?? f.properties?.name ?? index) as string),
      d: path(f as Feature) ?? "",
    }))
    .filter((row) => row.d.length > 0);

  const centerLon = -rotation[0];
  const centerLat = -rotation[1];

  const hubs = (Object.keys(SELECT_MAP_HUB_LONLAT) as SelectMapHubId[]).map((id) => {
    const lonlat = SELECT_MAP_HUB_LONLAT[id];
    const projected = projection(lonlat);
    const visible =
      !!projected &&
      geoDistance(lonlat, [centerLon, centerLat]) < Math.PI / 2 + 0.08;
    return {
      id,
      x: projected?.[0] ?? 0,
      y: projected?.[1] ?? 0,
      visible: Boolean(visible && projected),
    };
  });

  const flows = SELECT_MAP_FLOW_EDGES.map((edge) => {
    const from = SELECT_MAP_HUB_LONLAT[edge.from];
    const to = SELECT_MAP_HUB_LONLAT[edge.to];
    const line: Feature<LineString> = {
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: geodesicLine(from, to) },
    };
    const d = path(line) ?? "";
    const visible =
      d.length > 0 &&
      geoDistance(from, [centerLon, centerLat]) < Math.PI / 2 + 0.2 &&
      geoDistance(to, [centerLon, centerLat]) < Math.PI / 2 + 0.2;
    return { id: edge.id, d, duration: edge.duration, delay: edge.delay, visible };
  });

  return { sphere, graticule, landPaths, flows, hubs };
}
