import type { EvolutionCompareStep, LevelLocalePack, LevelPageUi } from "./types";

export const levelPageUiPt: LevelPageUi = {
  competenciesTitle: "O que este nível desenvolve",
  philosophyTitle: "A filosofia",
  coreMessageLabel: "Mensagem central",
  evolutionTitle: "Evolução esperada",
  formationTitle: "Estrutura educacional",
  formationText: "Cinco níveis progressivos da formação, conteúdos, preços e links já cadastrados no ecossistema Varejo Investidor.",
  formationStepLabel: "Nível",
  compareTitle: "A evolução dos três personagens",
  compareSubtitle: "Formiga, Lobo e Harpia não são cursos isolados: são estágios complementares de uma mesma metodologia.",
  compareProgression: "Fundamentos → Estratégia → Visão global",
  pricingEyebrow: "Investimento na formação",
  viewEducation: "Ver grade completa",
  otherLevels: "Explorar outros níveis",
  levelFormiga: "Nível Formiga",
  levelLobo: "Nível Lobo",
  levelHarpia: "Nível Harpia",
};

export const evolutionComparePt: EvolutionCompareStep[] = [
  {
    id: "formiga",
    name: "FORMIGA",
    tagline: "Compreender os fundamentos",
    summary: "Conhecimento financeiro, organização, disciplina e compreensão dos mercados.",
  },
  {
    id: "lobo",
    name: "LOBO",
    tagline: "Interpretar e agir estrategicamente",
    summary: "Análise, comportamento, estrutura de mercado, gestão de risco e construção de estratégias.",
  },
  {
    id: "harpia",
    name: "HARPIA",
    tagline: "Compreender sistemas e mercados globais",
    summary: "Macroeconomia, geopolítica, fluxos internacionais de capital, visão sistêmica e construção patrimonial.",
  },
];

export const levelPackPt: LevelLocalePack = {
  formiga: {
    eyebrow: "Nível Formiga",
    heroTitle: "A construção dos fundamentos.",
    heroSubtitle:
      "A Formiga representa o início da jornada: disciplina, organização e compreensão de como dinheiro, economia e investimentos funcionam.",
    conceptTitle: "O que representa o nível Formiga?",
    conceptIntro:
      "É o estágio em que o indivíduo deixa de observar o mercado superficialmente e começa a construir base sólida para decisões conscientes.",
    competencies: [
      "Funcionamento básico dos mercados financeiros",
      "Relação entre dinheiro, economia e patrimônio",
      "Principais instrumentos financeiros",
      "Renda fixa e renda variável",
      "Juros, inflação e poder de compra",
      "Moedas e câmbio",
      "Fundamentos de investimentos",
      "Organização financeira e planejamento patrimonial",
      "Introdução à análise de mercado",
      "Disciplina e comportamento financeiro",
      "Primeiros conceitos de risco e proteção de capital",
    ],
    philosophyParagraphs: [
      "A Formiga não tenta dominar o mundo antes de compreender o próprio ambiente. Ela representa a construção de conhecimento através da observação, da repetição, da disciplina e da acumulação de pequenas decisões.",
      "O aluno aprende que construir patrimônio não depende exclusivamente de grandes oportunidades, mas também de compreender fundamentos e desenvolver consistência.",
    ],
    coreMessage: "Antes de conquistar novos mercados, é necessário compreender como o dinheiro funciona.",
    evolutionText:
      "Ao concluir esta etapa, o aluno possui fundamentos para interpretar informações financeiras, compreender os principais produtos de investimento, reconhecer riscos básicos e tomar decisões mais conscientes.",
    compareTagline: "Compreender os fundamentos",
    compareSummary: "Conhecimento financeiro, organização, disciplina e compreensão dos mercados.",
    primaryCta: "Entrar no Canal Formiga",
    primaryHref: "free",
    secondaryCta: "Ver grade da formação",
  },
  lobo: {
    eyebrow: "Nível Lobo",
    heroTitle: "Estratégia, estrutura e inteligência de mercado.",
    heroSubtitle:
      "O Lobo desenvolve a transição entre compreender o mercado e agir estrategicamente, com leitura de ambiente, padrões e coordenação de decisões.",
    conceptTitle: "O que representa o nível Lobo?",
    conceptIntro:
      "Enquanto a Formiga constrói fundamentos, o Lobo interpreta cenários, movimentos e relações entre variáveis econômicas e financeiras.",
    competencies: [
      "Análise técnica e interpretação de gráficos",
      "Tendências, reversões e médias móveis",
      "Ichimoku e sistemas de análise",
      "Estrutura de mercado",
      "Suportes e resistências",
      "Gestão de risco e exposição",
      "Psicologia do mercado",
      "Comportamento dos participantes",
      "Correlação entre ativos",
      "Construção e diversificação de carteiras",
      "Probabilidade condicional",
      "Análise macroeconômica aplicada",
      "Estratégias de alocação",
      "Gestão de posições",
      "Tomada de decisão sob incerteza",
    ],
    philosophyParagraphs: [
      "O Lobo entende que o mercado não é formado apenas por números: é resultado da interação entre participantes, instituições, expectativas, capital, informações e decisões.",
      "O investidor deixa de procurar apenas respostas e começa a desenvolver métodos para interpretar diferentes possibilidades.",
    ],
    coreMessage:
      "Não basta conhecer o mercado. É preciso compreender suas estruturas, interpretar seus movimentos e saber agir diante deles.",
    evolutionText:
      "Ao concluir esta etapa, o aluno desenvolve maior capacidade de análise, interpreta cenários, estrutura estratégias, administra riscos e compreende as relações entre os mercados.",
    compareTagline: "Interpretar e agir estrategicamente",
    compareSummary: "Análise, comportamento, estrutura de mercado, gestão de risco e construção de estratégias.",
    primaryCta: "Ver Canal Elite",
    primaryHref: "/sinais",
    secondaryCta: "Ver grade da formação",
  },
  harpia: {
    eyebrow: "Nível Harpia",
    heroTitle: "Visão sistêmica, capital global e continuidade patrimonial.",
    heroSubtitle:
      "A Harpia observa o sistema financeiro em escala ampla: países, moedas, instituições, recursos e fluxos internacionais de capital.",
    conceptTitle: "O que representa o nível Harpia?",
    conceptIntro:
      "Enquanto a Formiga compreende fundamentos e o Lobo desenvolve estratégias, a Harpia interpreta sistemas complexos e suas interdependências.",
    competencies: [
      "Macroeconomia internacional",
      "Geopolítica e economia global",
      "Fluxos internacionais de capital",
      "Política monetária e fiscal",
      "Bancos centrais e sistema financeiro internacional",
      "Mercados de moedas e reservas internacionais",
      "Commodities e segurança energética",
      "Liquidez global",
      "Ciclos econômicos",
      "Relações entre juros, inflação e crescimento",
      "Alocação internacional de ativos",
      "ETFs e mercados internacionais",
      "Estratégias avançadas de diversificação",
      "Análise de cenários globais",
      "Gestão patrimonial e continuidade",
      "Interdependência entre mercados e economias",
    ],
    philosophyParagraphs: [
      "A Harpia não observa apenas um ativo, um gráfico ou uma economia isoladamente. Ela procura compreender o sistema no qual esses elementos estão inseridos.",
      "Decisões de bancos centrais, crises energéticas e mudanças geopolíticas alteram fluxos, inflação e cadeias produtivas, a Harpia representa o pensamento sistêmico e internacional do investidor.",
    ],
    coreMessage: "O mercado é apenas uma parte do sistema. Para compreender o capital, é necessário compreender o mundo.",
    evolutionText:
      "Ao concluir esta etapa, o aluno amplia a capacidade de interpretar fenômenos econômicos globais, relacionar variáveis geopolíticas e financeiras e compreender estratégias avançadas de construção e preservação patrimonial.",
    compareTagline: "Compreender sistemas e mercados globais",
    compareSummary: "Macroeconomia, geopolítica, fluxos internacionais, visão sistêmica e construção patrimonial.",
    primaryCta: "Conhecer consultorias",
    primaryHref: "/servicos",
    secondaryCta: "Ver grade da formação",
  },
};
