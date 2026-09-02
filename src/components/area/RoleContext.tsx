import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { AREA_ROLES, ROLE_SECTIONS, type AreaRole } from "@/mocks/area";

const STORAGE_KEY = "jr-area-demo-role";

type RoleContextValue = {
  role: AreaRole;
  setRole: (role: AreaRole) => void;
  can: (section: string) => boolean;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AreaRole>("owner");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (AREA_ROLES as string[]).includes(stored)) setRole(stored as AreaRole);
  }, []);

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      setRole: (next) => {
        setRole(next);
        window.localStorage.setItem(STORAGE_KEY, next);
      },
      can: (section) => ROLE_SECTIONS[role].includes(section),
    }),
    [role],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const value = useContext(RoleContext);
  if (!value) throw new Error("useRole must be used inside RoleProvider");
  return value;
}
