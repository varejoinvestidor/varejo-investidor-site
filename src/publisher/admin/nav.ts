export type AdminNavItem = {
  href: string;
  label: string;
  description?: string;
};

/** Menu editorial / Publisher (artigos, mídia, agenda). */
export const ADMIN_PUBLISHER_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/artigos", label: "Artigos" },
  { href: "/admin/artigos/novo", label: "Novo artigo" },
  { href: "/admin/categorias", label: "Categorias" },
  { href: "/admin/tags", label: "Tags" },
  { href: "/admin/autores", label: "Autores" },
  { href: "/admin/midia", label: "Biblioteca de mídia" },
  { href: "/admin/agendamentos", label: "Agendamentos" },
];

/** VI Research — desk Elite e relatórios de performance. */
export const ADMIN_RESEARCH_NAV: AdminNavItem[] = [
  { href: "/admin/relatorio-elite", label: "Relatório Elite", description: "Sinais e colar WhatsApp" },
  { href: "/admin/relatorio-elite/desempenho", label: "Desempenho & lotes", description: "KPIs e consolidado" },
];

/** @deprecated use ADMIN_PUBLISHER_NAV + ADMIN_RESEARCH_NAV */
export const ADMIN_NAV: AdminNavItem[] = [...ADMIN_PUBLISHER_NAV, ...ADMIN_RESEARCH_NAV];

/** Rodapé da sidebar (perfil + gestão). */
export const ADMIN_FOOTER_NAV: AdminNavItem[] = [
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/configuracoes", label: "Configurações" },
];
