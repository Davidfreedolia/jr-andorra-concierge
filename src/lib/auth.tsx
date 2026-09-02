import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

/**
 * Punto único previsto para el login del área privada.
 *
 * Hoy es una capa de interfaz sin backend: no hay sesión real ni llamadas de red.
 * Cuando se active Lovable Cloud, basta con sustituir la implementación de
 * `signInWithEmail` / `signOut` y la lectura de la sesión, sin tocar la UI.
 */

export type AreaRole = "titular" | "familiar" | "gestor" | "invitado";

export interface AreaUser {
  id: string;
  email: string;
  name: string;
  role: AreaRole;
}

export interface AuthState {
  user: AreaUser | null;
  isAuthenticated: boolean;
  /** Envía el enlace de acceso (magic link). Pendiente de backend. */
  signInWithEmail: (email: string) => Promise<{ ok: boolean }>;
  /** Entrada de demostración mientras no hay backend. */
  signInDemo: (user: AreaUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AreaUser | null>(null);

  const value = useMemo<AuthState>(
    () => ({
      user,
      isAuthenticated: user !== null,
      signInWithEmail: async () => ({ ok: true }),
      signInDemo: (demoUser) => setUser(demoUser),
      signOut: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
}
