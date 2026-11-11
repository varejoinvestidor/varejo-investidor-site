"use client";

import { useAdminThemeContext } from "./AdminThemeProvider";
import { AdminThemeToggle } from "./AdminThemeToggle";

export function AdminInterfacePreferences() {
  const { theme, setTheme } = useAdminThemeContext();

  return (
    <div className="admin-panel max-w-md space-y-3 p-6">
      <div>
        <h4 className="text-sm font-bold text-paper">Aparência do painel</h4>
        <p className="mt-1 text-xs text-paper/50">
          Escolha entre tema escuro ou claro no VI Publisher. A preferência fica salva neste navegador.
        </p>
      </div>
      <AdminThemeToggle theme={theme} onChange={setTheme} />
    </div>
  );
}
