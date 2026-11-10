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
  { href: "/admin/relatorio-elite", label: "Relatório Elite", description: "Sinais e colar WhatsApp" },
  { href: "/admin/relatorio-elite/desempenho", label: "Elite — Desempenho", description: "KPIs, consolidado e lotes" },
];

/** Rodapé da sidebar (perfil + gestão). */
export const ADMIN_FOOTER_NAV: AdminNavItem[] = [
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/configuracoes", label: "Configurações" },
];
