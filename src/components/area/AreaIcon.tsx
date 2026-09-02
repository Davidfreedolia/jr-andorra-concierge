import type { AreaNavKey } from "@/lib/area-nav";

const PATHS: Record<AreaNavKey, string> = {
  home: "M4 11 12 4l8 7v9h-6v-6H10v6H4v-9Z",
  reports: "M7 3h7l4 4v14H7V3Zm7 0v5h5M9.5 12.5h6M9.5 16h6",
  arrival: "M3 20h18M6 16 4 9l2 .5 2 3 4-7 2 .5 1 7-9 3Z",
  requests: "M4 5h16v11H9l-5 4V5Zm4 4h8M8 12h5",
  property: "M4 20V9l8-5 8 5v11h-5v-6H9v6H4Z",
  billing: "M4 5h16v14H4V5Zm0 5h16M8 15h5",
  people: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.7-5 6-5s6 2 6 5m2-5c3 0 6 2 6 5",
  guest: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-8 16c0-4 3.6-6 8-6s8 2 8 6",
};

export function AreaIcon({ name, className = "" }: { name: AreaNavKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
