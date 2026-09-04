import type { CSSProperties } from "react";

import logoStacked from "@/assets/jr-logo.png";
import logoHorizontal from "@/assets/jr-logo-h.png";
import logoMark from "@/assets/jr-logo-mark.png";

/**
 * Les tres peces del logotip, tal com les entrega el client. Mai es redibuixen
 * ni es recomponen: cada variant es un fitxer propi.
 *
 * - stacked:    el bloc complet, per a moments amb espai (peu, pantalla d'accés)
 * - horizontal: monograma i text en linia, per a capceleres i barres laterals
 * - mark:       nomes el monograma, per a mides petites
 */
export type LogoVariant = "stacked" | "horizontal" | "mark";

const ASSETS: Record<LogoVariant, string> = {
  stacked: logoStacked,
  horizontal: logoHorizontal,
  mark: logoMark,
};

type LogoJRProps = {
  title: string;
  variant?: LogoVariant;
  className?: string;
  style?: CSSProperties;
};

export function LogoJR({ title, variant = "stacked", className, style }: LogoJRProps) {
  return <img src={ASSETS[variant]} alt={title} className={className} style={style} />;
}
