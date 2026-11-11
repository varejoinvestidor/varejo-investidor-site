"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AdminTheme } from "./useAdminTheme";
import { ADMIN_THEME_STORAGE_KEY } from "./useAdminTheme";

type AdminThemeContextValue = {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AdminTheme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") setThemeState(stored);
  }, []);

  const setTheme = useCallback((next: AdminTheme) => {
    setThemeState(next);
    localStorage.setItem(ADMIN_THEME_STORAGE_KEY, next);
    document.querySelector(".admin-shell")?.setAttribute("data-admin-theme", next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <AdminThemeContext.Provider value={value}>{children}</AdminThemeContext.Provider>;
}

export function useAdminThemeContext(): AdminThemeContextValue {
  const ctx = useContext(AdminThemeContext);
  if (!ctx) throw new Error("useAdminThemeContext must be used within AdminThemeProvider");
  return ctx;
}
