import type { ArticleBanner } from "./types/banner";

type BannerVisual = Pick<ArticleBanner, "image_focus_x" | "image_focus_y" | "image_scale" | "display_scale" | "panel_height">;

export function bannerObjectPosition(banner: BannerVisual): string {
  const x = clamp(banner.image_focus_x ?? 50, 0, 100);
  const y = clamp(banner.image_focus_y ?? 82, 0, 100);
  return `${x}% ${y}%`;
}

export function bannerImageScale(banner: BannerVisual): number {
  const raw = banner.image_scale ?? 103;
  return clamp(raw, 70, 120) / 100;
}

export type BannerPanelHeight = NonNullable<ArticleBanner["panel_height"]>;

export function bannerPanelMinClass(height: BannerPanelHeight | undefined): string {
  if (height === "compact") return "md:min-h-[180px]";
  if (height === "medium") return "md:min-h-[240px]";
  return "md:min-h-[300px]";
}

export function bannerOuterMaxWidth(scale: BannerVisual["display_scale"]): string | undefined {
  if (!scale || scale >= 100) return undefined;
  const pct = clamp(scale, 55, 100);
  return `${pct}%`;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
