import type { InstitutionalSection } from "./types";

export type MarketCopy = {
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  showForexBroker?: boolean;
  showCryptoBroker?: boolean;
  sections: Omit<InstitutionalSection, "id">[];
};

type InstitutionalMarketSlug = "acoes" | "forex" | "etfs" | "ouro" | "petroleo" | "cripto";

export const institutionalMarketCopyPt: Record<InstitutionalMarketSlug, MarketCopy> = {
  acoes: {
    heroTitle: "MERCADO GLOBAL DE AÇÕES",
    heroSubtitle:
      "Empresas, capital, crescimento e oportunidades nos mercados financeiros internacionais.",
    metaTitle: "Mercado global de ações | Varejo Investidor",
    metaDescription:
      "Entenda como funcionam bolsas internacionais, participantes, valuation, setores e riscos do mercado acionário global.",
    sections: [
      {
        eyebrow: "Panorama",
        title: "O mercado acionário como infraestrutura de capital",
        paragraphs: [
          "O mercado global de ações é o sistema pelo qual empresas captam recursos de investidores e, em troca, oferecem participação no seu capital e nos seus resultados. Bolsas, custodiantes, autorreguladores e intermediários formam uma rede que conecta emissores, gestores institucionais e investidores de varejo em diferentes fusos horários.",
          "Mais do que cotações, o mercado acionário reflete expectativas sobre lucros futuros, inovação, governança e ciclos econômicos. A leitura institucional combina microeconomia das empresas com macroeconomia global, liquidez e apetite ao risco.",
        ],
      },
      {
        title: "Como funciona a negociação de ações",
        paragraphs: [
          "Empresas listadas emitem papéis negociáveis em ambientes regulados. Cada ordem de compra ou venda é confrontada no livro de ofertas; o preço de equilíbrio emerge da interação entre demanda e oferta em tempo quase contínuo nas principais praças.",
          "Após a abertura pública, o investidor negocia no mercado secundário, trocando posições com outros participantes. Dividendos, splits, follow-ons e recompras alteram a estrutura de capital e devem ser interpretados no contexto da estratégia corporativa.",
        ],
        bullets: [
          "Mercado primário: ofertas públicas e captação inicial.",
          "Mercado secundário: negociação entre investidores após o IPO.",
          "Custódia centralizada e registro eletrônico de posições.",
          "Liquidação financeira em prazos definidos por cada bolsa.",
        ],
      },
      {
        eyebrow: "Participantes",
        title: "Bolsas internacionais e principais atores",
        paragraphs: [
          "Grandes centros listam empresas de capital aberto sob regras de transparência e divulgação. NYSE e Nasdaq concentram gigantes globais de tecnologia e consumo; a B3 integra o ecossistema latino-americano; a LSE, TSE e Hong Kong Exchange conectam Europa, Ásia e fluxos entre mercados desenvolvidos e emergentes.",
          "Hedge funds, gestoras, fundos de pensão, seguradoras e family offices compõem a base institucional de liquidez. Corretoras e plataformas internacionais ampliam o acesso do investidor qualificado e do varejo a esses mercados, sujeito a regulação local e cambial.",
        ],
        cards: [
          { title: "NYSE / Nasdaq", text: "Maior profundidade em large caps americanas e setor de tecnologia." },
          { title: "B3", text: "Ponte entre investidores brasileiros e empresas listadas localmente." },
          { title: "LSE / Europa", text: "Diversidade setorial e acesso a emissores globais em libras e euros." },
          { title: "Ásia", text: "TSE e Hong Kong como hubs de industrial, consumo e financiamento regional." },
        ],
      },
      {
        title: "Instrumentos: tipos de ações e perfis de empresa",
        paragraphs: [
          "Ações ordinárias conferem direito a voto e participação residual nos lucros; preferenciais priorizam dividendos ou direitos específicos definidos no estatuto. A distinção importa para governança e para a política de distribuição de resultados.",
          "Large caps tendem a maior liquidez e cobertura de analistas; mid caps equilibram crescimento e volatilidade; small caps oferecem potencial de expansão com menor profundidade de mercado e maior sensibilidade a notícias locais.",
        ],
        bullets: [
          "Ordinárias (ON) e preferenciais (PN ou classes equivalentes).",
          "Segmentação por capitalização de mercado.",
          "ADR e certificados para exposição internacional indireta.",
          "Índices setoriais e amplos como referência de performance relativa.",
        ],
      },
      {
        title: "O que move os preços das ações",
        paragraphs: [
          "Resultados trimestrais, guidance de gestão e revisões de analistas redefinem expectativas de lucro por ação. Surpresas positivas ou negativas deslocam múltiplos de valuation de forma assimétrica.",
          "Fatores macro, juros, inflação, crescimento do PIB e política fiscal, alteram a taxa de desconto aplicada aos fluxos de caixa futuros. Choques geopolíticos, cadeias de suprimentos e regulação setorial adicionam prêmios de risco temporários ou estruturais.",
        ],
      },
      {
        title: "Indicadores financeiros e macro relevantes",
        paragraphs: [
          "Receita, margem operacional, fluxo de caixa livre e endividamento traduzem a saúde operacional. Múltiplos como P/L, EV/EBITDA e price-to-sales servem para comparação entre pares, sempre com cautela quanto ao ciclo e ao setor.",
        ],
        bullets: [
          "Lucro líquido e lucro por ação (EPS).",
          "Margem bruta, EBITDA e conversão em caixa.",
          "Curva de juros e política monetária nos EUA, Europa e mercados relevantes.",
          "Índices de inflação e emprego como termômetro de demanda.",
          "PMIs e indicadores de atividade industrial e serviços.",
        ],
      },
      {
        title: "Oportunidades e leituras estratégicas",
        paragraphs: [
          "Investir em empresas globais permite diversificar exposição a moedas, setores e inovação fora do mercado doméstico. Estratégias podem combinar valor (empresas subavaliadas), crescimento (reinvestimento acelerado) e dividendos (distribuição recorrente).",
          "Análise fundamentalista estuda demonstrações e vantagens competitivas; a técnica observa padrões de preço e volume. Carteiras institucionais frequentemente mesclam ambas com limites de risco e alocação por fatores.",
        ],
      },
      {
        title: "Riscos de mercado, liquidez e concentração",
        paragraphs: [
          "Quedas generalizadas (drawdowns) podem ocorrer mesmo em empresas sólidas quando o apetite ao risco diminui. Concentração em poucos nomes ou setores amplifica volatilidade.",
          "Risco de liquidez aparece especialmente em papéis de menor capitalização ou em momentos de estresse. Risco cambial afeta investidores que convertem resultados em outra moeda. Governança fraca ou fraude representam risco idiossincrático severo.",
        ],
      },
      {
        eyebrow: "Mapa setorial",
        title: "Principais setores da economia global",
        paragraphs: [
          "A alocação setorial ajuda a visualizar ciclos: tecnologia e comunicação lideram inovação; energia e materiais respondem a commodities; financeiro intermedia crédito; saúde combina demografia e pesquisa; consumo e indústria refletem a atividade doméstica.",
        ],
        visualGrid: [
          { label: "Tecnologia", detail: "Software, semicondutores e plataformas digitais." },
          { label: "Energia", detail: "Petróleo, gás, renováveis e utilidades." },
          { label: "Bancos", detail: "Crédito, pagamentos e mercados de capitais." },
          { label: "Saúde", detail: "Farmacêuticas, biotecnologia e equipamentos." },
          { label: "Indústria", detail: "Manufatura, aerospace e cadeias globais." },
          { label: "Consumo", detail: "Varejo, luxo e bens de consumo." },
          { label: "Infraestrutura", detail: "Transportes, logística e concessões." },
          { label: "Defesa", detail: "Aeroespacial e segurança nacional." },
        ],
      },
      {
        title: "Continuidade educativa e Research",
        paragraphs: [
          "Aprofunde cenários macro, relatórios setoriais e educação em gestão de risco na área de Research da Varejo Investidor. O conteúdo é informativo e não substitui assessoria personalizada ou análise de adequação ao seu perfil.",
        ],
        disclaimer:
          "Material educacional. Rentabilidade passada não garante resultados futuros. Avalie custos, tributação e regulação antes de investir em mercados internacionais.",
      },
    ],
  },

  forex: {
    heroTitle: "MERCADO GLOBAL DE CÂMBIO",
    heroSubtitle:
      "O mercado que conecta moedas, bancos centrais, comércio internacional e fluxos globais de capital.",
    metaTitle: "Mercado global de câmbio | Varejo Investidor",
    metaDescription:
      "Forex descentralizado: pares de moedas, bancos centrais, juros, liquidez, spread e riscos de operações cambiais.",
    showForexBroker: true,
    sections: [
      {
        eyebrow: "Panorama",
        title: "O maior mercado financeiro por volume",
        paragraphs: [
          "O mercado de câmbio (Forex) é onde moedas são trocadas 24 horas por dia, cinco dias por semana, em um sistema descentralizado de bancos, dealers, empresas e investidores. Ele financia comércio exterior, turismo, investimentos transfronteiriços e proteção cambial.",
          "Diferente de uma bolsa centralizada, a liquidez agrega-se em hubs como Londres, Nova York, Tóquio e Singapura. Cotações são continuamente formadas por fluxos de ordens e expectativas sobre política monetária.",
        ],
      },
      {
        title: "Como funciona o mercado descentralizado",
        paragraphs: [
          "Negociação ocorre por pares: a primeira moeda é a base e a segunda é a cotação. Se o par sobe, a base se aprecia frente à cotação. Interbancário concentra o maior volume; corretoras agregam fluxo de varejo e repassam preços com spread.",
          "Horários sobrepostos entre sessões aumentam liquidez; em feriados regionais ou anúncios macro, spreads podem alargar e slippage torna-se mais provável.",
        ],
      },
      {
        title: "Pares principais, cruzados e exóticos",
        paragraphs: [
          "Majors envolvem o dólar americano com euro, iene, libra e franco, entre outros. Crosses negociam duas moedas fortes sem USD no par. Exóticos combinam moedas de mercados emergentes, incluindo o real, com menor liquidez e custos variáveis.",
        ],
        bullets: [
          "EUR/USD, maior par global por volume.",
          "GBP/USD, sensível a dados do Reino Unido e ao ciclo do Banco da Inglaterra.",
          "USD/JPY, reflete diferencial de juros e fluxo para o Japão.",
          "USD/CHF, frequentemente associado a busca por qualidade.",
          "USD/BRL, exposição ao Brasil, volatilidade macro e fiscal.",
        ],
      },
      {
        title: "Participantes e instrumentos cambiais",
        paragraphs: [
          "Bancos centrais intervêm via taxas de juros, comunicação e, ocasionalmente, operações no mercado. Bancos comerciais atendem empresas com hedge cambial. Gestores alocam exposição internacional; especuladores buscam movimentos direcionais de curto prazo.",
        ],
        cards: [
          { title: "Spot", text: "Troca imediata ao preço atual, liquidação em T+2 na maioria dos majors." },
          { title: "Futuros e NDF", text: "Contratos para datas futuras; NDFs são comuns em moedas sem conversibilidade plena." },
          { title: "Opções", text: "Proteção assimétrica com prêmio pago antecipadamente." },
          { title: "Swaps cambiais", text: "Troca de fluxos em moedas distintas por prazos acordados." },
        ],
      },
      {
        title: "Drivers de preço no mercado cambial",
        paragraphs: [
          "Diferenciais de juros estimulam carry trade quando investidores buscam a moeda com taxa mais alta, assumindo estabilidade cambial. Inflação persistente pressiona bancos centrais a apertar política, fortalecendo moedas com credibilidade.",
          "Balança comercial, posição de investimento estrangeiro e surpresas em emprego alteram fluxos. Eventos políticos e sanções redefinem prêmios de risco país de forma abrupta.",
        ],
      },
      {
        title: "Indicadores econômicos que importam",
        paragraphs: [
          "Decisões de política monetária e atas de reuniões movem expectativas de juros futuros. IPC, PPI e índices de preços ao produtor antecipam ações dos bancos centrais. Dados de emprego nos EUA (como payroll) costumam gerar volatilidade amplificada em todos os majors.",
        ],
        bullets: [
          "Curvas de juros e preços de swaps de política monetária.",
          "PMI e confiança do consumidor.",
          "Balança comercial e conta corrente.",
          "Fluxos de reservas internacionais reportados por autoridades.",
        ],
      },
      {
        title: "Leituras técnicas, fundamentais e carry",
        paragraphs: [
          "Análise técnica mapeia suportes, resistências e tendências intradiárias. Fundamentalistas focam em paridade de poder de compra relativo, divergências de crescimento e eventos de calendário econômico.",
          "Carry trade exige gestão rigorosa: movimentos adversos podem superar o rendimento do diferencial de juros quando alavancagem é utilizada.",
        ],
      },
      {
        title: "Spread, swap, margem e alavancagem",
        paragraphs: [
          "Spread é o custo implícito entre compra e venda. Swap reflete diferença de juros entre as moedas do par e pode creditar ou debitar posições overnight. Margem é o colateral exigido; alavancagem amplia exposição nominal mas também perdas.",
        ],
        disclaimer:
          "Operações alavancadas em Forex podem resultar em perdas superiores ao capital depositado. Entenda stop, margem de manutenção e política da contraparte antes de operar.",
      },
      {
        title: "Riscos de contraparte, liquidez e regulação",
        paragraphs: [
          "Concentração em poucos dealers cria risco sistêmico em episódios de stress. Contratos com corretoras offshore podem não oferecer a mesma proteção regulatória do investidor doméstico.",
          "Gaps de preço em abertura de semana ou após notícias extremas podem ultrapassar níveis de stop. Gestão de tamanho de posição e diversificação de contrapartes mitigam, sem eliminar, esses riscos.",
        ],
      },
      {
        title: "Abertura de conta e continuidade",
        paragraphs: [
          "Quando disponível, a área de parceiros Forex segue integrações já configuradas no projeto, com avisos de risco destacados. Explore também o Research para cenários de dólar, juros globais e geopolítica aplicados ao câmbio.",
        ],
      },
    ],
  },

  etfs: {
    heroTitle: "ETFs | INVESTIMENTO GLOBAL",
    heroSubtitle:
      "Acesso diversificado a países, setores, índices, commodities e estratégias de investimento.",
    metaTitle: "ETFs | investimento global | Varejo Investidor",
    metaDescription:
      "Fundos negociados em bolsa: índices, setores, commodities, taxas, tracking error e riscos de alocação global.",
    sections: [
      {
        eyebrow: "Panorama",
        title: "ETFs como veículos de alocação",
        paragraphs: [
          "Exchange Traded Funds (ETFs) são cotas negociadas em bolsa que replicam ou seguem índices, setores, fatores ou baskets de ativos. Combinam diversificação típica de fundos com liquidez intradiária e transparência de composição publicada.",
          "Gestoras e authorized participants mantêm o preço de mercado alinhado ao valor patrimonial líquido por meio de criação e resgate de cotas, reduzindo, sem eliminar, desvios persistentes.",
        ],
      },
      {
        title: "Como funcionam na prática",
        paragraphs: [
          "O ETF detém (ou sintetiza) os ativos do índice-alvo. O investidor compra cotas como ações ordinárias, com spread e comissões da corretora. Dividendos e eventos corporativos do índice são refletidos conforme as regras do regulamento do fundo.",
        ],
        bullets: [
          "Criação/resgate em blocos com instituições autorizadas.",
          "Divulgação diária da carteira ou amostra representativa.",
          "Negociação contínua no horário da bolsa listada.",
          "Possibilidade de versões accumulating ou distributing.",
        ],
      },
      {
        title: "Famílias de ETFs e usos institucionais",
        paragraphs: [
          "Há ETFs de índice amplo, setoriais, geográficos, de commodities, renda fixa, dividendos, volatilidade e temáticos. Gestores usam-nos para beta de mercado, hedge tático e transição rápida entre fatores sem negociar dezenas de papéis.",
        ],
        cards: [
          { title: "Índice amplo", text: "Exposição a centenas de empresas por país ou região." },
          { title: "Setorial", text: "Concentração temática com regras de índice transparentes." },
          { title: "Commodities", text: "Acesso a ouro, prata, energia via físico ou derivativos." },
          { title: "Renda fixa", text: "Duration, crédito investment grade ou high yield em formato listado." },
        ],
      },
      {
        title: "Fatores que influenciam cota e NAV",
        paragraphs: [
          "Movimentos dos ativos subjacentes são o driver principal. Prêmios ou descontos temporários surgem quando liquidez do ETF diverge da do basket, especialmente em mercados emergentes ou ativos ilíquidos.",
          "Câmbio impacta ETFs listados em moeda distinta da exposição econômica subjacente. Eventos corporativos em componentes do índice provocam rebalanceamentos programados.",
        ],
      },
      {
        title: "Indicadores e métricas de qualidade",
        paragraphs: [
          "Tracking error mede o desvio de performance versus o índice. Volume médio negociado e spread bid-ask indicam custo de implementação. Taxa de administração (TER) reduz retorno composto no longo prazo.",
        ],
        bullets: [
          "NAV versus preço de mercado.",
          "Diferença de replicação física versus sintética.",
          "Sec lending e políticas de empréstimo de títulos.",
          "Concentração nos maiores componentes do índice.",
        ],
      },
      {
        title: "Exemplos educacionais por categoria",
        paragraphs: [
          "Tickers amplamente citados ilustram categorias, não carteiras recomendadas. SPY e VOO acompanham grandes empresas americanas; QQQ concentra tecnologia e crescimento; GLD e SLV referenciam ouro e prata; EEM oferece ângulo em mercados emergentes.",
        ],
        disclaimer:
          "SPY, QQQ, VOO, GLD, SLV e EEM são mencionados exclusivamente como exemplos educacionais de tipos de ETFs. Não constituem recomendação, oferta ou orientação personalizada de investimento.",
      },
      {
        title: "Estratégias de alocação e rebalanceamento",
        paragraphs: [
          "Carteiras core-satellite combinam um ETF amplo com satélites setoriais ou regionais. Alocação por fatores (valor, momentum, qualidade) usa ETFs especializados. Rebalanceamentos periódicos controlam drift de risco.",
        ],
      },
      {
        title: "Riscos cambiais, de concentração e estrutura",
        paragraphs: [
          "Replicação sintética introduz risco de contraparte do swap. ETFs de commodities podem não entregar retorno idêntico ao spot por custos de roll em futuros. Concentração em megacaps de um único país é comum em índices amplos ponderados por capitalização.",
        ],
      },
      {
        eyebrow: "Categorias",
        title: "Grade visual de tipos de ETFs",
        paragraphs: [
          "Organizar a oferta por categoria ajuda a comparar objetivos, benchmarks e complexidade antes de escolher veículos listados compatíveis com seu plano e regulação local.",
        ],
        visualGrid: [
          { label: "Índice EUA", detail: "Ex.: famílias que seguem S&P 500 (SPY, VOO como referência)." },
          { label: "Tecnologia", detail: "Ex.: QQQ, growth e Nasdaq em formato cotizado." },
          { label: "Ouro", detail: "Ex.: GLD, exposição ao metal com regras do prospecto." },
          { label: "Prata", detail: "Ex.: SLV, commodity metálica em estrutura ETF." },
          { label: "Emergentes", detail: "Ex.: EEM, cesta diversificada fora dos EUA desenvolvidos." },
          { label: "Renda fixa", detail: "Treasuries, corporativos e inflação via índices." },
        ],
      },
      {
        title: "Research e próximos passos",
        paragraphs: [
          "Consulte análises de alocação global, cenários de juros e materiais sobre custódia internacional no Research Varejo Investidor. Compare sempre prospectos, custos e tratamento fiscal aplicável ao seu domicílio.",
        ],
      },
    ],
  },

  ouro: {
    heroTitle: "OURO | RESERVA DE VALOR GLOBAL",
    heroSubtitle:
      "O metal que atravessa ciclos econômicos, políticas monetárias e transformações geopolíticas.",
    metaTitle: "Ouro | reserva de valor global | Varejo Investidor",
    metaDescription:
      "História monetária do ouro, reservas centrais, relação com o dólar, demanda industrial e formas de exposição ao metal.",
    sections: [
      {
        eyebrow: "Panorama",
        title: "Ouro na arquitetura monetária moderna",
        paragraphs: [
          "Durante décadas o ouro sustentou arranjos cambiais; mesmo após o fim do padrão-ouro clássico, permanece ativo de reserva em bancos centrais e hedge contra incerteza. Sua oferta anual depende de mineração e reciclagem, enquanto a demanda mistura joalheria, tecnologia, investimento e compras oficiais.",
          "O metal não gera fluxo de caixa como ações ou títulos; seu preço reflete expectativas sobre moedas fiduciárias, juros reais e crises de confiança institucional.",
        ],
      },
      {
        title: "Como o mercado de ouro funciona",
        paragraphs: [
          "Negociação ocorre no mercado spot, em futuros listados e via produtos cotados. Londres e Nova York concentram fixings e referências amplamente citadas. Barras e moedas de investimento seguem padrões de pureza com custódia especializada.",
          "XAU/USD cota onças troy em dólares; investidores fora dos EUA devem converter mentalmente exposição cambial ao analisar retorno local.",
        ],
      },
      {
        title: "Participantes: bancos centrais, miners e investidores",
        paragraphs: [
          "Bancos centrais acumulam ouro como diversificação de reservas e sinal de autonomia. Mineradoras expandem ou reduzem capex conforme preço estimulante. ETFs físicos e fundos listados canalizam fluxo de varejo e institucional com transparência de estoque.",
        ],
        bullets: [
          "Compras líquidas oficiais reportadas periodicamente.",
          "Produtores: América do Norte, África, Austrália e América Latina.",
          "Refinarias e certificação Good Delivery.",
          "Distribuidores de barras e moedas certificadas.",
        ],
      },
      {
        title: "Fatores que determinam o preço",
        paragraphs: [
          "Juros reais negativos ou baixos tendem a favorecer ouro, pois reduzem o custo de oportunidade de manter metal sem rendimento. Expectativas de inflação persistente e dívida soberana elevada alimentam demanda defensiva.",
          "Movimentos do dólar frequentemente exercem influência inversa no metal cotado em USD. Choques geopolíticos geram picos de fluxo para qualidade, porém podem reverter rapidamente após o choque inicial.",
        ],
      },
      {
        title: "Indicadores e leituras macro",
        paragraphs: [
          "Taxas de Treasuries indexadas ou expectativas de inflação implícitas servem como proxy de juros reais. Dados de CPI nos EUA e discursos de bancos centrais movem sessões intradiárias. Estoques em ETFs físicos divulgados pelos emissores ajudam a contextualizar fluxo de investimento, sem substituir dados oficiais agregados.",
        ],
      },
      {
        title: "Oportunidades táticas e estratégicas",
        paragraphs: [
          "Alocação estratégica em ouro pode reduzir volatilidade de carteiras diversificadas em períodos de stress, embora não elimine drawdowns. Táticas de médio prazo observam tendências em juros reais e posicionamento especulativo em futuros.",
          "Joalheria e demanda industrial (eletrônicos, odontologia) ancoram uma parcela estrutural da demanda, menos sensível a ciclos especulativos de curto prazo.",
        ],
      },
      {
        title: "Riscos e gestão de exposição",
        paragraphs: [
          "Ouro pode permanecer lateral por longos períodos, carregando custo de oportunidade. Produtos alavancados ou futuros exigem margem e disciplina de stop. Fraude em ouro físico não certificado e risco de armazenamento são relevantes fora de canais regulados.",
        ],
      },
      {
        eyebrow: "Vias de acesso",
        title: "Formas de exposição ao ouro",
        paragraphs: [
          "Cada via equilibra conveniência, custódia, custos e tributação distinta. Combine prospectos, spreads e regulação local antes de alocar.",
        ],
        visualGrid: [
          { label: "Físico", detail: "Barras e moedas com custódia segura e seguro." },
          { label: "ETFs", detail: "Cotas com lastro em estoque auditado (ex.: categorias como GLD)." },
          { label: "Futuros", detail: "Contratos com margem e rollover em curvas de vencimento." },
          { label: "Ações de miners", detail: "Beta operacional e risco de custo de extração." },
          { label: "Contas alocadas", detail: "Programas institucionais de metal alocado nominalmente." },
        ],
      },
      {
        title: "Relação ouro-dólar e reservas",
        paragraphs: [
          "Como grande parte das reservas é denominada em dólar, política monetária americana e força da moeda influenciam o metal globalmente. Diversificação de reservas por países emergentes pode alterar gradualmente fluxos oficiais, tema acompanhado em relatórios multilaterais públicos.",
        ],
      },
      {
        title: "Research e educação continuada",
        paragraphs: [
          "Explore materiais sobre inflação, geopolítica e proteção patrimonial no Research Varejo Investidor. Conteúdo informativo, sem cotações simuladas em tempo real.",
        ],
        disclaimer:
          "Ouro e derivativos relacionados envolvem volatilidade e custos de custódia. Avalie adequação, tributação e regulamentação.",
      },
    ],
  },

  petroleo: {
    heroTitle: "PETRÓLEO | ENERGIA E GEOPOLÍTICA",
    heroSubtitle:
      "O recurso estratégico que influencia inflação, comércio, indústria e equilíbrio de poder entre nações.",
    metaTitle: "Petróleo | energia e geopolítica | Varejo Investidor",
    metaDescription:
      "Mercado internacional de petróleo: Brent, WTI, OPEP+, oferta, estoques, logística e impactos macro.",
    sections: [
      {
        eyebrow: "Panorama",
        title: "Energia como variável estratégica",
        paragraphs: [
          "O petróleo permanece central na matriz energética global, alimentando transporte, petroquímica e cadeias industriais. Seu preço conecta decisões de investimento em exploração, política de cartéis, inventários e expectativas de crescimento mundial.",
          "Benchmarks Brent e WTI servem de referência para contratos físicos e derivativos; divergências entre eles refletem logística, qualidade do crude e eventos regionais.",
        ],
      },
      {
        title: "Como funciona o mercado internacional",
        paragraphs: [
          "Produção é negociada via contratos de longo prazo, mercado spot e instrumentos financeiros listados. Refinarias processam diferentes tipos de crude; spreads de crack margin medem rentabilidade entre matéria-prima e produtos derivados.",
          "Agências e organizações internacionais publicam balanços de oferta e demanda periódicos que orientam expectativas, sem substituir a formação de preço em tempo real nas bolsas de energia.",
        ],
      },
      {
        title: "Produtores, cartel e refinadores",
        paragraphs: [
          "OPEP e alianças como OPEP+ coordenam cotas de produção entre membros, com impacto em expectativas quando comunicados surpreendem. Estados Unidos, Arábia Saudita, Rússia, Canadá e Brasil figuram entre produtores relevantes em diferentes ciclos.",
        ],
        bullets: [
          "Capacidade ociosa e investimento em poços.",
          "Projetos offshore, pré-sal e xisto com custos marginais distintos.",
          "Refino concentrado em hubs asiáticos, americanos e europeus.",
          "Trading houses e estatais como intermediários globais.",
        ],
      },
      {
        title: "Oferta, demanda e estoques",
        paragraphs: [
          "Demanda de transporte e atividade industrial move consumo de derivados. Sazonalidade de gasolina e aquecimento influencia curvas sazonais. Relatórios semanais de estoques em grandes economias geram volatilidade quando divergem do consenso.",
          "Capacidade de produção marginal, custo do último barril necessário, ancora debates de piso de longo prazo, sujeitos a tecnologia e política energética.",
        ],
      },
      {
        title: "Geopolítica, rotas e sanções",
        paragraphs: [
          "Estreito de Ormuz, rotas marítimas e pipelines estratégicos concentram risco de interrupção. Sanções restringem compradores, redirecionam fluxos e pressionam spreads regionais. Conflitos armados podem deslocar prêmio de risco instantaneamente.",
        ],
      },
      {
        title: "Indicadores e dados públicos",
        paragraphs: [
          "Inventários comerciais, utilização de refino e rig counts nos EUA são monitorados por analistas. Projeções de crescimento global do FMI e organizações de energia contextualizam demanda. Relação com inflação aparece nos componentes de energia dos índices de preços ao consumidor.",
        ],
      },
      {
        title: "Instrumentos e exposição ao setor",
        paragraphs: [
          "Futuros de Brent e WTI permitem hedge ou especulação com margem. ETFs de energia oferecem cesta de empresas ou contratos, com dinâmica distinta do spot. Ações de integradas e exploration & production expõem a custo de barril, hedges e política de dividendos.",
        ],
      },
      {
        title: "Riscos de volatilidade e transição energética",
        paragraphs: [
          "Mercados podem registrar variações amplas em sessões únicas após notícias geopolíticas ou mudanças de política. Investimentos em descarbonização alteram demanda estrutural de longo prazo, exigindo revisão periódica de teses de investimento no setor.",
        ],
      },
      {
        eyebrow: "Cadeia",
        title: "Da extração ao consumidor final",
        paragraphs: [
          "Compreender etapas ajuda a identificar gargalos, gargalos que frequentemente explicam spikes de preço em momentos de stress logístico.",
        ],
        visualGrid: [
          { label: "Exploração", detail: "Perfuração onshore e offshore, licenças e capex." },
          { label: "Produção", detail: "Elevação, tratamento inicial e qualidade do crude." },
          { label: "Transporte", detail: "Dutos, navios-tanque e armazenamento." },
          { label: "Refino", detail: "Gasolina, diesel, querosene e petroquímicos." },
          { label: "Distribuição", detail: "Terminais, rodovias e redes de varejo." },
          { label: "Consumo", detail: "Transporte, indústria e geração elétrica." },
        ],
      },
      {
        title: "Research e leitura institucional",
        paragraphs: [
          "Aprofunde cenários de energia, inflação global e commodities no Research Varejo Investidor. Sem simulação de preços ao vivo; priorize fontes oficiais ao operar.",
        ],
        disclaimer:
          "Commodities energéticas são altamente voláteis. Derivativos podem amplificar perdas. Considere impacto ambiental e regulação local.",
      },
    ],
  },

  cripto: {
    heroTitle: "CRIPTOMOEDAS | ECONOMIA DIGITAL GLOBAL",
    heroSubtitle:
      "Uma nova infraestrutura financeira baseada em redes descentralizadas, ativos digitais e tecnologia blockchain.",
    metaTitle: "Criptomoedas | economia digital global | Varejo Investidor",
    metaDescription:
      "Blockchain, Bitcoin, Ethereum, stablecoins, DeFi, custódia, regulação e riscos do ecossistema de ativos digitais.",
    showCryptoBroker: true,
    sections: [
      {
        eyebrow: "Panorama",
        title: "Ativos digitais e redes abertas",
        paragraphs: [
          "Criptomoedas são ativos nativos de redes distribuídas que usam criptografia para validar transações sem depender de um emissor central único. Bitcoin introduziu escassez programada; Ethereum expandiu o escopo com contratos inteligentes executados em máquina virtual compartilhada.",
          "O ecossistema inclui exchanges, custodians, miners, validadores, desenvolvedores e protocolos DeFi que recriam funções financeiras de forma permissionless, sujeita a riscos técnicos e regulatórios.",
        ],
      },
      {
        title: "Como funciona a blockchain",
        paragraphs: [
          "Transações são agrupadas em blocos encadeados por hashes criptográficos. Consenso, proof-of-work, proof-of-stake ou variantes, define quem pode propor novos blocos. Nós completos verificam regras, preservando resistência à censura enquanto a rede permanece saudável.",
        ],
        bullets: [
          "Chaves públicas e privadas controlam titularidade.",
          "Taxas de rede remuneram validadores ou miners.",
          "Forks podem originar cadeias concorrentes.",
          "Camadas L2 escalam custos fora da base principal.",
        ],
      },
      {
        title: "Participantes e infraestrutura",
        paragraphs: [
          "Exchanges centralizadas concentram liquidez e onboarding fiat; DEXs negociam via pools automatizados on-chain. Custodians institucionais oferecem segregação de ativos; autocustódia transfere responsabilidade integral ao usuário.",
        ],
        cards: [
          { title: "CEX", text: "Matching off-chain, depósitos bancários e conformidade KYC." },
          { title: "DEX", text: "Negociação não custodial com risco de smart contract." },
          { title: "Carteiras", text: "Hot, cold e hardware; seed phrase como última linha de recuperação." },
          { title: "Custódia qualificada", text: "Políticas de seguro e auditoria para ativos digitais." },
        ],
      },
      {
        title: "Drivers de preço e adoção",
        paragraphs: [
          "Liquidez global, halving do Bitcoin, upgrades de rede e fluxos para ETFs ou produtos listados influenciam narrativas de mercado. Stablecoins medem demanda por dólares on-chain; despejos de emissão ou resgates afetam spreads em momentos de stress.",
          "Regulação, aprovações, proibições ou exigências de reserva, redefine acesso institucional. Hacks e falhas de ponte entre cadeias destroem confiança de forma abrupta.",
        ],
      },
      {
        title: "Indicadores on-chain e macro",
        paragraphs: [
          "Métricas como endereços ativos, hashrate, stake locked e TVL em DeFi contextualizam atividade, sem prever preço. Correlação variável com ativos de risco tradicionais pode aumentar em liquidações amplas.",
        ],
        bullets: [
          "Taxas de rede e congestionamento de mempool.",
          "Emissão e cronogramas de unlock de tokens.",
          "Fluxos para exchanges versus cold storage agregados.",
          "Política monetária fiduciária como pano de fundo.",
        ],
      },
      {
        title: "Camadas do ecossistema: DeFi e tokenização",
        paragraphs: [
          "DeFi recria empréstimo, trading e rendimento via protocolos abertos, frequentemente com risco de liquidação automática. Tokenização promete representar títulos, imóveis ou arte on-chain, dependente de frameworks jurídicos em evolução.",
        ],
      },
      {
        title: "Oportunidades educacionais e limites",
        paragraphs: [
          "Estudo de tokenomics, governança de DAOs e auditorias de código reduz assimetria informacional, mas não elimina risco. Estratégias de longo prazo exigem convicção sobre adoção; trading de curto prazo demanda gestão de volatilidade extrema.",
        ],
      },
      {
        title: "Riscos de volatilidade, custódia e liquidez",
        paragraphs: [
          "Perda de chaves privadas é irreversível. Contratos inteligentes podem conter vulnerabilidades. Alavancagem em derivativos cripto amplifica chamadas de margem. Tokens de baixa liquidez sofrem manipulação e slippage elevado.",
        ],
        disclaimer:
          "Criptomoedas não são moeda legal na maioria das jurisdições. Não há garantia de recuperação de capital. Utilize apenas integrações de parceiros oficialmente configurados no projeto.",
      },
      {
        eyebrow: "Arquitetura",
        title: "Camadas da economia digital",
        paragraphs: [
          "Visualizar camadas ajuda a distinguir infraestrutura, aplicação e interface, cada uma com vetores de risco distintos.",
        ],
        visualGrid: [
          { label: "Camada 0", detail: "Hardware, energia e conectividade." },
          { label: "Camada 1", detail: "Blockchains base, Bitcoin, Ethereum e pares." },
          { label: "Camada 2", detail: "Rollups e canais de escalabilidade." },
          { label: "Protocolos", detail: "DeFi, NFTs e identidade descentralizada." },
          { label: "Aplicações", detail: "Carteiras, front-ends e aggregators." },
          { label: "Fiat ramps", detail: "On-ramps, off-ramps e stablecoins." },
        ],
      },
      {
        title: "Exchanges parceiras e Research",
        paragraphs: [
          "Cards de abertura de conta seguem parceiros já cadastrados, com avisos de risco visíveis. Continue a formação em segurança digital e macro no Research Varejo Investidor.",
        ],
      },
    ],
  },
};
