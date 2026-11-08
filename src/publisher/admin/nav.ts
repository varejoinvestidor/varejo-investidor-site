export type AdminNavItem = {
  href: string;
  label: string;
  description?: string;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/artigos", label: "Artigos" },
  { href: "/admin/artigos/novo", label: "Novo artigo" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/tags", label: "Tags" },
  { href: "/admin/autores", label: "Autores" },
  { href: "/admin/midia", label: "Biblioteca de mídia" },
  { href: "/admin/agendamentos", label: "Agendamentos" },
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/configuracoes", label: "Configurações" },
];
