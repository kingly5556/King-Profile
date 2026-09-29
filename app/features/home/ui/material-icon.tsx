import type { CSSProperties } from "react";
import { FILLED_ICONS, ICONS } from "./icon-paths";

type MaterialIconProps = {
  /** Key in `icon-paths.ts` (legacy Material Symbols ligature names) */
  name: string;
  className?: string;
  filled?: boolean;
  /** Tailwind text size class, e.g. text-sm — the SVG scales with font-size */
  sizeClass?: string;
  style?: CSSProperties;
};

export function MaterialIcon({
  name,
  className = "",
  filled = false,
  sizeClass = "text-xl",
  style,
}: MaterialIconProps) {
  const icon = (filled && FILLED_ICONS[name]) || ICONS[name];
  if (!icon) return null;

  return (
    <svg
      viewBox={icon.viewBox}
      fill="currentColor"
      width="1em"
      height="1em"
      className={`inline-block shrink-0 select-none ${sizeClass} ${className}`.trim()}
      style={style}
      aria-hidden
      focusable="false"
    >
      <path d={icon.d} />
    </svg>
  );
}
