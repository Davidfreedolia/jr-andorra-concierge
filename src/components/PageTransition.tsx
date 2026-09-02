import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Fades and lifts each page into view on route change.
 * Purely presentational: keyed on the pathname so the animation replays.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div key={pathname} className="jr-page-transition">
      {children}
    </div>
  );
}
