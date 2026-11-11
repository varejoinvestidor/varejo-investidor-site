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
  { href: "/admin/videos", label: "Vídeo", description: "YouTube vertical ou horizontal" },
  { href: "/admin/midia", label: "Biblioteca de mídia" },
  { href: "/admin/agendamentos", label: "Agendamentos" },
];

/** Taxonomia e perfis — agrupados em /admin/configuracoes. */
export const ADMIN_CONFIG_TAXONOMY_NAV: AdminNavItem[] = [
  { href: "/admin/configuracoes#categorias", label: "Categorias" },
  { href: "/admin/configuracoes#tags", label: "Tags" },
  { href: "/admin/configuracoes#autores", label: "Autores" },
];

/** VI Research — desk Elite e relatórios de performance. */
export const ADMIN_RESEARCH_NAV: AdminNavItem[] = [
  { href: "/admin/relatorio-elite", label: "Relatório Elite", description: "Sinais e colar WhatsApp" },
  { href: "/admin/relatorio-elite/desempenho", label: "Desempenho & lotes", description: "KPIs e consolidado" },
];

/** VI Administrador — analytics do site público (somente role admin). */
export const ADMIN_ANALYTICS_NAV: AdminNavItem[] = [
  { href: "/admin/vi-administrador", label: "Visão geral", description: "KPIs e tendências" },
  { href: "/admin/vi-administrador/paginas", label: "Páginas", description: "URLs mais vistas" },
  { href: "/admin/vi-administrador/cliques", label: "Cliques & CTAs", description: "Botões e campanhas" },
  { href: "/admin/vi-administrador/relatorios", label: "Relatórios", description: "Diário, semanal, mensal" },
];

/** @deprecated use ADMIN_PUBLISHER_NAV + ADMIN_RESEARCH_NAV */
export const ADMIN_NAV: AdminNavItem[] = [...ADMIN_PUBLISHER_NAV, ...ADMIN_RESEARCH_NAV];

/** Rodapé da sidebar (perfil + gestão). */
export const ADMIN_FOOTER_NAV: AdminNavItem[] = [
  { href: "/admin/usuarios", label: "Usuários" },
  { href: "/admin/configuracoes", label: "Configurações" },
];
