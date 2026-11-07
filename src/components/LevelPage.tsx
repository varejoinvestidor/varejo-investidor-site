"use client";

import { InstitutionalLevelPage } from "./InstitutionalLevelPage";
import type { LevelId } from "../data/institutionalLevelPages";

export function LevelPage({ level }: { level: LevelId }) {
  return <InstitutionalLevelPage level={level} />;
}
