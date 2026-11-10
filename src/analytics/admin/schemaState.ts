import type { AnalyticsSchemaState } from "./queries";

export function analyticsSchemaHasEvents(schema: AnalyticsSchemaState) {
  return schema === "ok" || schema === "partial";
}

export function analyticsSchemaHasRegions(schema: AnalyticsSchemaState) {
  return schema === "ok";
}
