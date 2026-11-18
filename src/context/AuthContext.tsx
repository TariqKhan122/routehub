import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../types";

const STORAGE_KEY = "routehub.auth";
export const DEMO_CREDENTIALS = { email: "admin@demo.dev", password: "demo1234" } as const;
const DEMO_USER: AuthUser = { name: "Alex Morgan", email: DEMO_CREDENTIALS.email };

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  loginDemo: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === "object" && parsed !== null && "name" in parsed && "email" in parsed &&
        typeof parsed.name === "string" && typeof parsed.email === "string") {
      return { name: parsed.name, email: parsed.email };
    }
  } catch { /* corrupt or unavailable storage: treat as signed out */ }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Lazy initialiser: reads localStorage once, so a reload keeps you signed in.
  const [user, setUser] = useState<AuthUser | null>(readStored);

  const persist = (next: AuthUser | null) => {
    setUser(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* storage unavailable: stay signed in for this session only */ }
  };

  const login = (email: string, password: string): boolean => {
    const ok = email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
    if (ok) persist(DEMO_USER);
    return ok;
  };

  return (
    <AuthContext.Provider value={{ user, login, loginDemo: () => persist(DEMO_USER), logout: () => persist(null) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
