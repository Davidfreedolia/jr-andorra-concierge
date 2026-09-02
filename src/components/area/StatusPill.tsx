type Tone = "neutral" | "good" | "warn";

export function StatusPill({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return <span className={`jr-pill jr-pill-${tone}`}>{label}</span>;
}
