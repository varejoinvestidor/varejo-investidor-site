export type EliteLastlinkPlanPt = {
  period: string;
  validity: string;
  total: string;
  monthlyEquivalent: string;
  badge?: string;
  featured?: boolean;
};

/** Tabela Lastlink (Canal Elite) — somente exibição PT-BR em /servicos e /sinais. */
export const ELITE_LASTLINK_PLANS_PT: EliteLastlinkPlanPt[] = [
  {
    period: "Mensal",
    validity: "1 mês de assinatura",
    total: "R$ 157,50",
    monthlyEquivalent: "R$ 157,50/mês",
  },
  {
    period: "Trimestral",
    validity: "3 meses de assinatura",
    total: "R$ 420,00",
    monthlyEquivalent: "R$ 140,00/mês",
  },
  {
    period: "Semestral",
    validity: "6 meses de assinatura",
    total: "R$ 761,25",
    monthlyEquivalent: "R$ 126,88/mês",
  },
  {
    period: "Anual",
    validity: "12 meses de assinatura",
    total: "R$ 1.260,00",
    monthlyEquivalent: "R$ 105,00/mês",
    badge: "MAIOR ECONOMIA",
    featured: true,
  },
];

export const ELITE_LASTLINK_HERO_MONTHLY_PT = "R$ 105,00/mês";
