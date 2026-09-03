import type { AdminNavKey } from "@/lib/admin-nav";

export type AdminIconName = AdminNavKey | "exit";

const PATHS: Record<AdminIconName, string> = {
  dashboard: "M4 4h7v6H4V4Zm9 0h7v10h-7V4ZM4 12h7v8H4v-8Zm9 4h7v4h-7v-4Z",
  requests: "M4 5h16v11H9l-5 4V5Zm4 4h8M8 12h5",
  clients: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-8 16c0-4 3.6-6 8-6s8 2 8 6M17 5l2 2 3-3",
  expenses: "M4 19V5m0 14h16M8 15V9m4 6v-9m4 9v-5",
  company: "M4 20V6l7-3v17M11 20h9V10l-9-3M14 11h3M14 14h3M14 17h3M6.5 8v.01M6.5 11v.01M6.5 14v.01",
  properties: "M4 20V9l8-5 8 5v11h-5v-6H9v6H4Z",
  visits: "M7 3v3m10-3v3M4 8h16M4 6h16v14H4V6Zm5 8 2 2 4-4",
  billing: "M4 5h16v14H4V5Zm0 5h16M8 15h5",
  marketing: "M4 10v4h3l6 4V6l-6 4H4Zm13-1a4 4 0 0 1 0 6",
  team: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.7-5 6-5s6 2 6 5m2-5c3 0 6 2 6 5",
  exit: "M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10",
};

export function AdminIcon({ name, className = "" }: { name: AdminIconName; className?: string }) {
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
