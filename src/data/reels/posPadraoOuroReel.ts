export type ReelScene = {
  id: string;
  startSec: number;
  endSec: number;
  kicker: string;
  headline: string;
  headlineAccent?: string;
  body?: string;
  narration: string;
  sfx: string[];
};

/** Duração total alvo: 100s (1:40) — alinhar narração na exportação. */
export const REEL_DURATION_SEC = 100;

export const REEL_SCENES: ReelScene[] = [
  {
    id: "hook",
    startSec: 0,
    endSec: 8,
    kicker: "MUNDO PÓS-PADRÃO-OURO",
    headline: "1971.",
    headlineAccent: "O dólar solta o ouro.",
    body: "Fim da conversibilidade — o lastro metálico deixa de limitar a emissão global.",
    narration:
      "Em agosto de mil novecentos e setenta e um, Nixon encerrou a conversibilidade do dólar em ouro. Naquele dia, o sistema monetário mundial mudou de patamar.",
    sfx: ["impacto grave", "ruído de filme retrô"],
  },
  {
    id: "bretton",
    startSec: 8,
    endSec: 18,
    kicker: "BRETTON WOODS · 1944–1971",
    headline: "Dólar no centro.",
    headlineAccent: "Ouro na margem.",
    body: "US$ 35 por onça-troy. Moedas europeias atadas ao dólar até o elo quebrar.",
    narration:
      "Desde Bretton Woods, o dólar era conversível em ouro a trinta e cinco dólares a onça. Quando esse elo caiu, restou moeda fiduciária: valor sustentado por decreto e por confiança nas instituições.",
    sfx: ["papel / arquivo", "transição suave"],
  },
  {
    id: "local",
    startSec: 18,
    endSec: 30,
    kicker: "ECONOMIAS LOCAIS",
    headline: "Cada país,",
    headlineAccent: "sua política monetária.",
    body: "Juros, câmbio e inflação passam a refletir o banco central — e o fluxo de capital externo.",
    narration:
      "Cada economia ganhou autonomia para definir juros e liquidez — mas também ficou exposta. Taxa, câmbio e inflação respondem ao banco central local e ao humor do investidor internacional.",
    sfx: ["pulso metrônomo leve"],
  },
  {
    id: "dollar",
    startSec: 30,
    endSec: 45,
    kicker: "PARIDADE & REFERÊNCIA",
    headline: "O dólar como",
    headlineAccent: "âncora informal.",
    body: "Petróleo, dívida e reservas em USD. Câmbio competitivo vira arma de competitividade exportadora.",
    narration:
      "O dólar virou referência global: commodities e dívida sobrenacional em dólares, reservas acumuladas em USD. Quem exporta precisa de câmbio competitivo; quem importa energia sofre quando o dólar valoriza.",
    sfx: ["whoosh lateral", "moedas discretas"],
  },
  {
    id: "global",
    startSec: 45,
    endSec: 58,
    kicker: "GLOBALIZAÇÃO FINANCEIRA",
    headline: "Capital em segundos.",
    headlineAccent: "Choque em cadeia.",
    body: "Cadeias produtivas, derivativos e fluxos instantâneos ligam mesas em Nova York a câmbios emergentes.",
    narration:
      "A globalização financeira ligou fábricas, navios e telas de operações. O dinheiro circula em segundos: um aperto de liquidez nos Estados Unidos vira pressão no câmbio de mercados emergentes no dia seguinte.",
    sfx: ["conexão digital suave", "mapa animado"],
  },
  {
    id: "bcb",
    startSec: 58,
    endSec: 78,
    kicker: "BANCOS CENTRAIS",
    headline: "Controle do crédito",
    headlineAccent: "e do preço do dinheiro.",
    body: "Fed, BCE, BoJ e BCs emergentes: emissão, QE e intervenção cambial em escala inédita desde 2008.",
    narration:
      "Os bancos centrais assumiram o centro do tabuleiro. Imprimir liquidez, comprar títulos, sinalizar juros futuros — ferramentas que moldam crédito, emprego e preços. Depois de 2008, isso escalou para volumes sem precedente.",
    sfx: ["batida grave", "ambiente sala de máquinas suave"],
  },
  {
    id: "investor",
    startSec: 78,
    endSec: 92,
    kicker: "EFEITO NO INVESTIDOR",
    headline: "Não é teoria.",
    headlineAccent: "É o pano de fundo.",
    body: "Poupança em moeda fraca, dívida indexada e ciclos de aperto nos EUA mexem no seu patrimônio.",
    narration:
      "Para quem investe no Brasil ou em mercados emergentes, isso não é abstração. Ciclo de juros americano, dólar forte e inflação local definem o risco que sua carteira já carrega — mesmo quando você não acompanha notícia internacional.",
    sfx: ["revelação / lift"],
  },
  {
    id: "close",
    startSec: 92,
    endSec: 100,
    kicker: "CONTEXTO VAREJO INVESTIDOR",
    headline: "Depois do ouro,",
    headlineAccent: "só resta método.",
    body: "Entender fiat, dólar e política monetária — sem ilusão de estabilidade automática.",
    narration:
      "O padrão-ouro não volta como antes. O jogo é navegar moeda fiduciária, dólar e decisões de banco central com método — não com fantasia de paridade fixa.",
    sfx: ["fechamento / logo suave"],
  },
];

export const NARRATION_FULL = REEL_SCENES.map((s) => s.narration).join(" ");
