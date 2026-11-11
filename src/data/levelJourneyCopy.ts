import type { Locale } from "../i18n";
import type { LevelId } from "./institutionalLevelPages";

export type LevelJourneyCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  lifeTitle: string;
  lifeText: string;
  behaviorTitle: string;
  behaviorText: string;
  environmentTitle: string;
  environmentText: string;
  structureTitle: string;
  structureBullets: string[];
  difficultiesTitle: string;
  difficulties: string[];
  nextTitle: string;
  nextTeaser: string;
  nextCta: string;
};

const formigaPt: LevelJourneyCopy = {
  eyebrow: "Bioma Formiga",
  title: "Resiliência coletiva, rotina e acúmulo silencioso",
  intro:
    "No formigueiro, sobrevivência é cooperativa: cada indivíduo cumpre papel mínimo, mas o sistema inteiro move montanhas grão a grão. O Nível Formiga espelha essa lógica no mercado — construir base antes de buscar altitude.",
  lifeTitle: "Vida no ecossistema",
  lifeText:
    "Formigas constroem túneis, estoques e rotas previsíveis. Não disputam o topo do predador: garantem água, alimento e defesa. No investidor, isso se traduz em organização patrimonial, reserva de emergência e primeiros contatos educados com mercado, sem alavancagem.",
  behaviorTitle: "Comportamento no mercado",
  behaviorText:
    "Paciência operacional: registrar gastos, definir tamanho de posição micro, evitar “atalhos” que prometem retorno sem processo. Comportamento formiga é repetir o certo em dias chatos — não reagir a cada manchete.",
  environmentTitle: "Ambiente ideal",
  environmentText:
    "Ambientes húmidos e protegidos, longe de predadores diretos. Para o investidor: horários de estudo fixos, fontes confiáveis, conta demo ou microcapital, e um mapa claro de metas de 12 a 24 meses.",
  structureTitle: "Estrutura do nível",
  structureBullets: [
    "Módulos de alfabetização financeira e psicologia básica.",
    "Introdução a Forex, índices e ativos com risco explicado.",
    "Rotina de journal: entrada, saída, emoção e lição.",
    "Comunidade gratuita para accountability leve.",
  ],
  difficultiesTitle: "Dificuldades reais",
  difficulties: [
    "Vergonha de começar pequeno e comparar-se com “gurus”.",
    "Ansiedade que transforma estudo em compulsão por sinais.",
    "Falta de plano: trocar de ativo a cada semana sem método.",
    "Subestimar custos, spread e tempo de aprendizado.",
  ],
  nextTitle: "Próximo bioma: Nível Lobo",
  nextTeaser:
    "Quando a base está organizada, o investidor precisa de coordenação de manada — leitura de contexto, sessões de mercado e gestão de risco em regime. O Lobo trabalha em grupo, mas com hierarquia clara.",
  nextCta: "Conhecer Nível Lobo",
};

const loboPt: LevelJourneyCopy = {
  eyebrow: "Bioma Lobo",
  title: "Coordenação, caça tática e leitura de território",
  intro:
    "Lobos caçam em matilha: comunicação, posicionamento e paciência até a janela certa. O Nível Lobo forma o operador que entende sessão, liquidez e correlação — sempre com stop e tamanho definidos.",
  lifeTitle: "Vida no ecossistema",
  lifeText:
    "Território amplo, fronteiras disputadas, presas esquivas. A matilha não vence por força bruta isolada, mas por sincronia. No mercado: operar janelas de liquidez, respeitar calendário macro e não forçar trade fora do plano.",
  behaviorTitle: "Comportamento no mercado",
  behaviorText:
    "Executar setups com critério, aceitar dias sem operação e proteger capital antes de buscar multiplicador. Comportamento lobo é assertivo sem euforia — cortar perda rápido, deixar ganho respirar dentro de regra.",
  environmentTitle: "Ambiente ideal",
  environmentText:
    "Florestas abertas, trilhas conhecidas, vento a favor para farejar risco. Ambiente do trader: plataforma estável, feed de notícias filtrado, horários de Londres/Nova York compreendidos e playbook escrito.",
  structureTitle: "Estrutura do nível",
  structureBullets: [
    "Sessões globais, spreads e eventos de alta volatilidade.",
    "Gestão de risco por trade e por dia (drawdown máximo).",
    "Leitura de correlação FX, índices e commodities.",
    "Psicologia de execução: FOMO, vingança e overtrading.",
  ],
  difficultiesTitle: "Dificuldades reais",
  difficulties: [
    "Operar demais após um ganho (“eu já dominei”).",
    "Ignorar notícia de alto impacto por FOMO.",
    "Aumentar lote para “recuperar” sem reavaliar edge.",
    "Misturar análise institucional com memes de rede social.",
  ],
  nextTitle: "Próximo bioma: Nível Harpia",
  nextTeaser:
    "Do chão da mata ao dossel: a Harpia enxerga o mapa inteiro. O último estágio integra macro, geopolítica, alocação e visão patrimonial — menos micro-ruído, mais arquitetura de longo prazo.",
  nextCta: "Conhecer Nível Harpia",
};

const harpiaPt: LevelJourneyCopy = {
  eyebrow: "Bioma Harpia",
  title: "Visão elevada, paciência predatória e capital consciente",
  intro:
    "A harpia paira acima do dossel, observa padrões de movimento e só mergulha quando a probabilidade compensa o gasto energético. O Nível Harpia consolida gestão patrimonial, cenário global e postura institucional do investidor.",
  lifeTitle: "Vida no ecossistema",
  lifeText:
    "Poucos ovos, longa maturação, território vasto defendido com precisão. No patrimônio: diversificar por classe, moeda e regime, aceitar ciclos longos e evitar concentrar risco em narrativa única.",
  behaviorTitle: "Comportamento no mercado",
  behaviorText:
    "Decisões menos frequentes, porém mais fundamentadas: alocação estratégica, hedge quando necessário, e disciplina para não reagir a ruído político diário. Harpia não caça para entretenimento.",
  environmentTitle: "Ambiente ideal",
  environmentText:
    "Copa das árvores: visão de fluxos, frentes de vento (liquidez global) e tempestades distantes (choques geopolíticos). Ambiente: research estruturado, custódia clara, assessoria tributária e cenários documentados.",
  structureTitle: "Estrutura do nível",
  structureBullets: [
    "Macro, geopolítica e intermarket em profundidade.",
    "Construção de carteira multi-ativo e rebalanceamento.",
    "Ferramentas institucionais: relatórios, dados e governança.",
    "Preparação para diálogo com bancos, family office e compliance.",
  ],
  difficultiesTitle: "Dificuldades reais",
  difficulties: [
    "Complexidade excessiva que paralisa decisão.",
    "Confundir sofisticação com overengineering tributário.",
    "Subestimar tail risk e concentração geográfica.",
    "Perder humildade após bons ciclos macro.",
  ],
  nextTitle: "Formação completa",
  nextTeaser:
    "Os três níveis formam uma escalada: Formiga (base), Lobo (execução), Harpia (visão). Revise a trilha na Formação Varejo Investidor ou retorne ao nível que precisa reforçar.",
  nextCta: "Ver Formação",
};

const formigaEn: LevelJourneyCopy = {
  ...formigaPt,
  eyebrow: "Formiga biome",
  title: "Collective resilience, routine and silent accumulation",
  intro:
    "In the anthill, survival is cooperative. Formiga level mirrors that logic in markets: build foundation before seeking altitude.",
  lifeTitle: "Life in the ecosystem",
  lifeText:
    "Ants build tunnels, stores and predictable routes. For investors: estate organization, emergency reserve and first polite contact with markets, without leverage.",
  behaviorTitle: "Market behavior",
  behaviorText:
    "Operational patience: track expenses, define micro position size, avoid shortcuts. Formiga behavior is repeating the right thing on boring days.",
  environmentTitle: "Ideal environment",
  environmentText:
    "Protected humidity, away from direct predators. For the investor: fixed study hours, trusted sources, demo or micro capital, and a 12–24 month map.",
  structureTitle: "Level structure",
  structureBullets: [
    "Financial literacy and basic psychology modules.",
    "Intro to Forex, indices and assets with risk explained.",
    "Journal routine: entry, exit, emotion and lesson.",
    "Free community for light accountability.",
  ],
  difficultiesTitle: "Real difficulties",
  difficulties: [
    "Shame of starting small vs. social media gurus.",
    "Anxiety turning study into signal addiction.",
    "No plan: switching assets weekly without method.",
    "Underestimating costs, spread and learning time.",
  ],
  nextTitle: "Next biome: Lobo Level",
  nextTeaser:
    "When the base is organized, the investor needs pack coordination — context, sessions and risk regime. Lobo works in a group with clear hierarchy.",
  nextCta: "Explore Lobo Level",
};

const loboEn: LevelJourneyCopy = {
  ...loboPt,
  eyebrow: "Lobo biome",
  title: "Coordination, tactical hunt and territory",
  intro: "Wolves hunt in packs: communication, positioning and patience until the window is right.",
  lifeTitle: "Life in the ecosystem",
  lifeText: "Wide territory, disputed borders. The pack wins by sync, not isolated force.",
  behaviorTitle: "Market behavior",
  behaviorText: "Execute setups with criteria, accept flat days, protect capital first.",
  environmentTitle: "Ideal environment",
  environmentText: "Stable platform, filtered news, London/NY hours understood, written playbook.",
  structureTitle: "Level structure",
  structureBullets: [
    "Global sessions, spreads and high-volatility events.",
    "Risk per trade and per day (max drawdown).",
    "FX, index and commodity correlation.",
    "Execution psychology: FOMO, revenge and overtrading.",
  ],
  difficultiesTitle: "Real difficulties",
  difficulties: [
    "Overtrading after a win.",
    "Ignoring high-impact news due to FOMO.",
    "Increasing size to recover without revalidating edge.",
    "Mixing institutional analysis with social memes.",
  ],
  nextTitle: "Next biome: Harpia Level",
  nextTeaser: "From forest floor to canopy: Harpia sees the whole map — macro, geopolitics and allocation.",
  nextCta: "Explore Harpia Level",
};

const harpiaEn: LevelJourneyCopy = {
  ...harpiaPt,
  eyebrow: "Harpia biome",
  title: "Elevated vision, patient strike and conscious capital",
  intro: "Harpy eagle observes patterns above the canopy and strikes only when probability pays the energy cost.",
  lifeTitle: "Life in the ecosystem",
  lifeText: "Few offspring, long maturity, vast territory. Diversify by asset class, currency and regime.",
  behaviorTitle: "Market behavior",
  behaviorText: "Less frequent, more grounded decisions: strategic allocation and hedging when needed.",
  environmentTitle: "Ideal environment",
  environmentText: "Structured research, clear custody, tax advice and documented scenarios.",
  structureTitle: "Level structure",
  structureBullets: harpiaPt.structureBullets,
  difficultiesTitle: "Real difficulties",
  difficulties: harpiaPt.difficulties,
  nextTitle: "Complete formation",
  nextTeaser: "Formiga (base), Lobo (execution), Harpia (vision). Review the track or reinforce any level.",
  nextCta: "View Formation",
};

export function getLevelJourneyCopy(level: LevelId, locale: Locale): LevelJourneyCopy {
  const useEn = locale !== "pt" && locale !== "es";
  const table: Record<LevelId, LevelJourneyCopy> = useEn
    ? { formiga: formigaEn, lobo: loboEn, harpia: harpiaEn }
    : { formiga: formigaPt, lobo: loboPt, harpia: harpiaPt };
  return table[level];
}
