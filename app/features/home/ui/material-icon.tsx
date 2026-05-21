import type { CSSProperties } from "react";

type MaterialIconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  /** Tailwind text size class, e.g. text-sm */
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
  return (
    <span
      className={`select-none ${sizeClass} material-symbols-outlined ${filled ? "material-symbols-outlined--filled" : ""} ${className}`.trim()}
      style={style}
      aria-hidden
    >
      {name}
    </span>
  );
}
