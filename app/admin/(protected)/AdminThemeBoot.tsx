"use client";

import { useEffect } from "react";
import { ADMIN_THEME_STORAGE_KEY } from "../../../src/publisher/admin/useAdminTheme";

/** Aplica tema salvo antes da hidratação visual do shell (reduz flash). */
export function AdminThemeBoot() {
  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_THEME_STORAGE_KEY);
    const shell = document.querySelector(".admin-shell");
    if (!shell || (stored !== "light" && stored !== "dark")) return;
    shell.setAttribute("data-admin-theme", stored);
  }, []);
  return null;
}
