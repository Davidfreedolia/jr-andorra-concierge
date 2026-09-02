import type { ReactNode } from "react";

/** Card of the private area: --jr-night surface with a 15% gold hairline. */
export function AreaCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  return <Tag className={`jr-area-card${className ? ` ${className}` : ""}`}>{children}</Tag>;
}
