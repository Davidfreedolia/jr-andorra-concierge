type LogoJRProps = {
  title: string;
  className?: string;
};

/** Placeholder mark — replace with the client's final logo file. */
export function LogoJR({ title, className }: LogoJRProps) {
  return (
    <svg
      viewBox="0 0 120 32"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontSize="16"
        fontWeight="300"
      >
        JR
      </text>
      <text
        x="44"
        y="21"
        fill="currentColor"
        fontFamily="var(--font-body)"
        fontSize="10"
        fontWeight="500"
        letterSpacing="3"
      >
        HOSPITALITY
      </text>
    </svg>
  );
}
