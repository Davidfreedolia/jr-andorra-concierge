import type { CSSProperties } from "react";

import logoAsset from "@/assets/jr-logo.png.asset.json";

type LogoJRProps = {
  title: string;
  className?: string;
  style?: CSSProperties;
};

/** Final brand mark — used as supplied, never redrawn. */
export function LogoJR({ title, className, style }: LogoJRProps) {
  return <img src={logoAsset.url} alt={title} className={className} style={style} />;
}
