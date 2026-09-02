import {
  BedDouble,
  Briefcase,
  CalendarCheck,
  CarFront,
  ChefHat,
  ClipboardCheck,
  Compass,
  Eye,
  KeyRound,
  Mountain,
  ShieldCheck,
  Sparkle,
  Plane,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/** Rotating gold icon set used to frame every service block. */
const ICONS: LucideIcon[] = [
  KeyRound,
  CalendarCheck,
  ClipboardCheck,
  Sparkle,
  Wrench,
  Briefcase,
  ShieldCheck,
  Eye,
  Plane,
  CarFront,
  Mountain,
  ChefHat,
  BedDouble,
  Compass,
];

export function IconTile({ index, className = "" }: { index: number; className?: string }) {
  const Icon = ICONS[index % ICONS.length]!;
  return (
    <span className={`jr-icon-tile${className ? ` ${className}` : ""}`} aria-hidden="true">
      <Icon size={28} strokeWidth={1.6} />
    </span>
  );
}
