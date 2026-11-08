export type ReelScene = {
  id: string;
  startSec: number;
  endSec: number;
  kicker: string;
  headline: string;
  headlineAccent?: string;
  body?: string;
  stat?: string;
  narration: string;
  sfx: string[];
};

/** Ritmo alto retenção: cortes curtos, ~68s */
export const REEL_DURATION_SEC = 68;

export const REEL_SCENES: ReelScene[] = [
  {
    id: "hook",
    startSec: 0,
    endSec: 4,
    kicker: "GATILHO",
    headline: "1971.",
    headlineAccent: "Ouro desligado.",
    stat: "NIXON SHOCK",
    body: "Conversibilidade encerrada. O mundo passou a rodar em moeda sem lastro metálico.",
    narration:
      "Mil novecentos e setenta e um: Nixon corta o dólar do ouro. Em um fim de semana, o lastro do planeta some.",
    sfx: ["impacto grave"],
  },
  {
    id: "bretton",
    startSec: 4,
    endSec: 11,
    kicker: "BRETTON WOODS · ROMPIDO",
    headline: "35 dólares",
    headlineAccent: "por onça. Acabou.",
    stat: "FIDUCIÁRIA",
    body: "Valor por decreto. Confiança nas instituições vira a nova âncora, frágil.",
    narration:
      "Antes: trinta e cinco dólares por onça. Depois: fiduciário puro. Moeda que imprime sem teto físico.",
    sfx: ["whoosh seco"],
  },
  {
    id: "local",
    startSec: 11,
    endSec: 19,
    kicker: "SUA ECONOMIA",
    headline: "Juros. Câmbio.",
    headlineAccent: "Inflação. Agora.",
    stat: "4 ALAVANCAS",
    body: "Cada país imprime e ajusta taxa, mas o capital global responde em horas, não em anos.",
    narration:
      "Cada país ganhou o volante: juros, câmbio, inflação. Só que o mercado internacional pune errado na velocidade da tela.",
    sfx: ["tick rápido"],
  },
  {
    id: "dollar",
    startSec: 19,
    endSec: 27,
    kicker: "REGRA NÃO ESCRITA",
    headline: "Tudo em",
    headlineAccent: "dólar.",
    stat: "~60% RESERVAS",
    body: "Commodity, dívida, reserva. Dólar forte sangra quem importa energia e insumo.",
    narration:
      "Petróleo em dólar. Dívida em dólar. Reserva em dólar. Quando o dólar sobe, o bolso do emergente pesa.",
    sfx: ["moedas"],
  },
  {
    id: "global",
    startSec: 27,
    endSec: 35,
    kicker: "GLOBALIZAÇÃO",
    headline: "Liquidez em",
    headlineAccent: "milissegundos.",
    stat: "EFEITO DOMINÓ",
    body: "Fed aperta hoje → câmbio e bolsa do emergente reagem amanhã.",
    narration:
      "Dinheiro não dorme. Um aperto nos Estados Unidos vira câmbio estourado aqui antes do café esfriar.",
    sfx: ["pulso"],
  },
  {
    id: "bcb",
    startSec: 35,
    endSec: 45,
    kicker: "BANCOS CENTRAIS",
    headline: "Eles decidem",
    headlineAccent: "o preço do dinheiro.",
    stat: "QE · TÍTULOS · FX",
    body: "Imprimir, comprar dívida, intervir no câmbio. Escala pós-2008 sem precedente.",
    narration:
      "Banco central virou protagonista: liquidez infinita, compra de título, sinalização de juro. Crédito e emprego obedecem à política monetária.",
    sfx: ["batida"],
  },
  {
    id: "investor",
    startSec: 45,
    endSec: 58,
    kicker: "SUA CARTEIRA",
    headline: "Não é história.",
    headlineAccent: "É risco vivo.",
    stat: "DXY → BRL",
    body: "Dólar, Selic lá fora e inflação local mexem no seu patrimônio, com ou sem você olhando.",
    narration:
      "Investidor de varejo: isso está na sua carteira agora. Ciclo americano, dólar forte, inflação local, risco que você já carrega sem perceber.",
    sfx: ["lift"],
  },
  {
    id: "close",
    startSec: 58,
    endSec: 68,
    kicker: "VAREJO INVESTIDOR",
    headline: "Sem ouro?",
    headlineAccent: "Só contexto.",
    stat: "MÉTODO",
    body: "Entenda fiat, dólar e BC antes de clicar em comprar.",
    narration:
      "O ouro não volta. O jogo é método: entender moeda, dólar e banco central, ou ser surpreendido de novo.",
    sfx: ["fechamento"],
  },
];

export const NARRATION_FULL = REEL_SCENES.map((s) => s.narration).join(" ");
