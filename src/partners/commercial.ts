export type CommercialCopy = {
  earnEyebrow: string;
  earnTitle: string;
  earnText: string;
  earnPending: string;
  affiliateTitle: string;
  affiliateLead: string;
  affiliateItems: string[];
  leaderTitle: string;
  leaderLead: string;
  leaderItems: string[];
  economicTitle: string;
  economicLead: string;
  economicItems: string[];
  economicCta: string;
  simEyebrow: string;
  simTitle: string;
  simText: string;
  product: string;
  products: string[];
  price: string;
  quantity: string;
  affiliateRate: string;
  leaderRate: string;
  model: string;
  modelA: string;
  modelAHelp: string;
  modelB: string;
  modelBHelp: string;
  gross: string;
  affiliateOut: string;
  leaderOut: string;
  houseOut: string;
  monthly: string;
  annual: string;
  overflow: string;
  disclaimer: string;
  exampleTitle: string;
  exampleText: string;
  exampleRows: string[];
  ecoEyebrow: string;
  ecoTitle: string;
  ecoText: string;
  layers: { title: string; kicker: string; text: string; points: string[] }[];
  rotate: string;
  zoomIn: string;
  zoomOut: string;
  layerLabel: string;
  growthEyebrow: string;
  growthTitle: string;
  growthText: string;
  growthSteps: string[];
  growthNote: string;
  flowEyebrow: string;
  flowTitle: string;
  flowText: string;
  flowSteps: { title: string; text: string }[];
  flowNote: string;
};

const pt: CommercialCopy = {
  earnEyebrow: "Remuneração",
  earnTitle: "Construa sua operação. Participe dos resultados.",
  earnText:
    "O Partnership Varejo Investidor conecta pessoas, equipes e líderes a uma estrutura internacional de produtos, tecnologia, conteúdo e distribuição comercial. Cada participante pode desenvolver sua própria operação de acordo com sua categoria, responsabilidades, desempenho e condições contratuais.",
  earnPending:
    "O percentual oficial de comissão ainda não está publicado. Ele depende de aprovação administrativa e da validação da base de cálculo na Lastlink. Nada nesta página é a regra comercial vigente.",
  affiliateTitle: "Afiliados",
  affiliateLead: "O afiliado recebe remuneração pelas vendas válidas atribuídas ao seu link individual.",
  affiliateItems: [
    "Link exclusivo e identificação da venda.",
    "Produtos autorizados no contrato.",
    "Comissão por venda conforme o contrato aprovado.",
    "Histórico de resultados.",
    "Regras de renovação, cancelamento e reembolso.",
    "Possibilidade de participar do programa Rewards, conforme regulamento.",
  ],
  leaderTitle: "Líderes e coprodutores",
  leaderLead: "O líder desenvolve uma operação comercial em um idioma, país ou mercado. A remuneração do líder é separada da comissão individual do afiliado.",
  leaderItems: [
    "Desenvolver equipes e organizar afiliados.",
    "Expandir a presença da marca e coordenar campanhas.",
    "Desenvolver parcerias e acompanhar resultados.",
    "Participar da expansão internacional dentro do que for aprovado.",
  ],
  economicTitle: "Participantes econômicos",
  economicLead: "Modalidade distinta, sujeita a análise, elegibilidade e formalização contratual.",
  economicItems: [
    "Não é a modalidade comum de afiliado.",
    "Não representa automaticamente participação societária.",
    "Os direitos dependem dos instrumentos contratuais.",
    "Não há promessa de rentabilidade nem garantia de liquidez.",
    "Toda manifestação passa por análise e validação jurídica.",
  ],
  economicCta: "Manifestar interesse em participação econômica",
  simEyebrow: "Simulação",
  simTitle: "Quanto sua operação pode gerar?",
  simText: "Simule cenários de vendas e entenda como a estrutura comercial pode distribuir os resultados.",
  product: "Produto",
  products: ["Elite", "Formação Varejo Investidor", "Consultoria"],
  price: "Preço da venda",
  quantity: "Vendas por mês",
  affiliateRate: "Comissão do afiliado",
  leaderRate: "Remuneração do líder",
  model: "Leitura ilustrativa",
  modelA: "Modelo A · comissão sobre o saldo",
  modelAHelp: "O afiliado incide sobre o valor bruto. O líder incide sobre o saldo depois dessa comissão. O restante, antes de outros custos, fica com o Varejo Investidor.",
  modelB: "Modelo B · percentuais sobre o bruto",
  modelBHelp: "Afiliado e líder incidem, cada um, sobre o valor bruto. O restante, antes de outros custos, fica com o Varejo Investidor.",
  gross: "Volume bruto",
  affiliateOut: "Afiliado estimado",
  leaderOut: "Líder estimado",
  houseOut: "Saldo estimado do Varejo Investidor",
  monthly: "Resultado mensal",
  annual: "Projeção anual",
  overflow: "A soma dos percentuais passa de 100% do bruto. Ajuste os campos. O saldo não fica negativo nesta simulação.",
  disclaimer:
    "Simulação ilustrativa. Os valores não representam promessa de ganhos ou remuneração garantida. A remuneração efetiva depende das regras comerciais aprovadas, vendas válidas, contratos, taxas, tributos, estornos e condições da plataforma.",
  exampleTitle: "Exemplo hipotético de R$ 1.000",
  exampleText:
    "No Modelo A, com 40% para o afiliado e 40% do saldo restante para o líder: venda bruta R$ 1.000, afiliado R$ 400, saldo R$ 600, líder R$ 240, Varejo Investidor R$ 360. É um exemplo anterior a taxas, tributos, reembolsos, chargebacks e outros custos. Não é regra comercial definitiva.",
  exampleRows: ["Venda bruta · R$ 1.000", "Afiliado · R$ 400", "Saldo · R$ 600", "Líder · R$ 240", "Varejo Investidor · R$ 360"],
  ecoEyebrow: "Estrutura",
  ecoTitle: "Um ecossistema. Diferentes camadas. Um objetivo global.",
  ecoText: "Cada participante exerce uma função dentro de uma estrutura integrada de desenvolvimento comercial, distribuição, tecnologia e expansão internacional.",
  layers: [
    {
      title: "Clientes e mercados",
      kicker: "Camada 01",
      text: "A base de crescimento é formada pelas pessoas e mercados que utilizam os produtos e serviços do ecossistema.",
      points: ["Mercados internacionais", "Clientes", "Educação", "Produtos e conteúdo", "Relacionamento"],
    },
    {
      title: "Afiliados",
      kicker: "Camada 02",
      text: "Os afiliados ampliam a distribuição dos produtos por meio de suas próprias redes, campanhas e relacionamentos.",
      points: ["Links individuais", "Campanhas", "Conteúdo", "Aquisição de clientes", "Relacionamento comercial"],
    },
    {
      title: "Líderes e coprodutores",
      kicker: "Camada 03",
      text: "Os líderes organizam equipes, desenvolvem mercados e coordenam operações comerciais dentro das responsabilidades aprovadas.",
      points: ["Equipes", "Idiomas", "Países", "Campanhas", "Operações comerciais"],
    },
    {
      title: "Varejo Investidor",
      kicker: "Camada 04",
      text: "O Varejo Investidor fornece a infraestrutura, os produtos, a tecnologia, a marca e a direção estratégica que sustentam o ecossistema.",
      points: ["Marca", "Tecnologia", "Produtos", "Gestão", "Governança", "Estratégia internacional"],
    },
  ],
  rotate: "Arraste para girar",
  zoomIn: "Aproximar",
  zoomOut: "Afastar",
  layerLabel: "Selecionar camada",
  growthEyebrow: "Jornada",
  growthTitle: "Sua operação pode crescer junto com o ecossistema.",
  growthText: "A evolução não é automática. Cada etapa depende de desempenho, critérios, aprovação e contrato.",
  growthSteps: [
    "Cadastro e aprovação.",
    "Início como afiliado.",
    "Desenvolvimento de vendas.",
    "Construção de uma comunidade comercial.",
    "Possibilidade de assumir liderança.",
    "Coordenação de equipes e mercados.",
    "Possibilidade de apresentar proposta de operação internacional.",
  ],
  growthNote: "Nenhuma etapa promete promoção, remuneração ou participação automática.",
  flowEyebrow: "Funcionamento",
  flowTitle: "Da descoberta à remuneração.",
  flowText: "Um cliente conhece o Varejo Investidor por uma campanha de um afiliado, usa o link individual e conclui uma compra válida. A plataforma registra a transação e a atribuição. O acompanhamento do afiliado e, quando couber, do líder usa essa base. A remuneração segue o contrato e a base de cálculo configurada.",
  flowSteps: [
    { title: "Descoberta", text: "O cliente encontra a campanha." },
    { title: "Link individual", text: "O acesso fica identificado." },
    { title: "Venda", text: "A compra válida é registrada." },
    { title: "Atribuição", text: "A plataforma associa a origem." },
    { title: "Remuneração", text: "O cálculo segue o contrato." },
  ],
  flowNote: "Entrar em um canal de WhatsApp, sozinho, não atribui uma venda.",
};

const en: CommercialCopy = {
  ...pt,
  earnEyebrow: "Compensation",
  earnTitle: "Build your operation. Participate in the results.",
  earnText:
    "Varejo Investidor Partnership connects people, teams, and leaders to an international structure of products, technology, content, and commercial distribution. Each participant can develop an operation according to category, responsibilities, performance, and contract terms.",
  earnPending:
    "The official commission rate is not published. It depends on administrative approval and on validation of the calculation base in Lastlink. Nothing on this page is the current commercial rule.",
  affiliateTitle: "Affiliates",
  affiliateLead: "An affiliate is compensated for valid sales attributed to an individual link.",
  affiliateItems: [
    "Exclusive link and sale identification.",
    "Products authorized in the contract.",
    "Commission per sale under the approved contract.",
    "Results history.",
    "Renewal, cancellation, and refund rules.",
    "Possible participation in Rewards, under its regulation.",
  ],
  leaderTitle: "Leaders and co-producers",
  leaderLead: "A leader builds a commercial operation in a language, country, or market. Leader compensation is separate from the affiliate’s individual commission.",
  leaderItems: [
    "Develop teams and organize affiliates.",
    "Expand the brand and coordinate campaigns.",
    "Build partnerships and follow results.",
    "Take part in international expansion only where approved.",
  ],
  economicTitle: "Economic participants",
  economicLead: "A distinct path, subject to review, eligibility, and a formal contract.",
  economicItems: [
    "It is not the ordinary affiliate path.",
    "It does not automatically mean equity ownership.",
    "Rights depend on the contractual instruments.",
    "There is no promise of return and no liquidity guarantee.",
    "Every expression of interest is reviewed, including legally.",
  ],
  economicCta: "Express interest in economic participation",
  simEyebrow: "Simulation",
  simTitle: "What could your operation generate?",
  simText: "Model sales scenarios and see how a commercial structure can allocate results.",
  product: "Product",
  products: ["Elite", "Varejo Investidor Education", "Consulting"],
  price: "Sale price",
  quantity: "Sales per month",
  affiliateRate: "Affiliate commission",
  leaderRate: "Leader compensation",
  model: "Illustrative reading",
  modelA: "Model A · commission on the balance",
  modelAHelp: "The affiliate rate applies to gross. The leader rate applies to the balance after that commission. The remainder, before other costs, stays with Varejo Investidor.",
  modelB: "Model B · rates on gross",
  modelBHelp: "Affiliate and leader rates each apply to gross. The remainder, before other costs, stays with Varejo Investidor.",
  gross: "Gross volume",
  affiliateOut: "Estimated affiliate",
  leaderOut: "Estimated leader",
  houseOut: "Estimated Varejo Investidor balance",
  monthly: "Monthly result",
  annual: "Annual projection",
  overflow: "The rates add up to more than 100% of gross. Adjust the fields. This simulation does not show a negative balance.",
  disclaimer:
    "Illustrative simulation. Figures are not a promise of earnings or guaranteed compensation. Actual compensation depends on approved commercial rules, valid sales, contracts, fees, taxes, reversals, and platform conditions.",
  exampleTitle: "Hypothetical example of R$ 1,000",
  exampleText:
    "In Model A, with 40% for the affiliate and 40% of the remaining balance for the leader: gross R$ 1,000, affiliate R$ 400, balance R$ 600, leader R$ 240, Varejo Investidor R$ 360. This is before fees, taxes, refunds, chargebacks, and other costs. It is not a definitive commercial rule.",
  exampleRows: ["Gross sale · R$ 1,000", "Affiliate · R$ 400", "Balance · R$ 600", "Leader · R$ 240", "Varejo Investidor · R$ 360"],
  ecoEyebrow: "Structure",
  ecoTitle: "One ecosystem. Different layers. One global objective.",
  ecoText: "Each participant has a role inside an integrated structure of commercial development, distribution, technology, and international expansion.",
  layers: [
    {
      title: "Clients and markets",
      kicker: "Layer 01",
      text: "Growth starts with the people and markets that use the ecosystem’s products and services.",
      points: ["International markets", "Clients", "Education", "Products and content", "Relationships"],
    },
    {
      title: "Affiliates",
      kicker: "Layer 02",
      text: "Affiliates extend distribution through their own networks, campaigns, and relationships.",
      points: ["Individual links", "Campaigns", "Content", "Client acquisition", "Commercial relationships"],
    },
    {
      title: "Leaders and co-producers",
      kicker: "Layer 03",
      text: "Leaders organize teams, develop markets, and coordinate commercial operations within approved responsibilities.",
      points: ["Teams", "Languages", "Countries", "Campaigns", "Commercial operations"],
    },
    {
      title: "Varejo Investidor",
      kicker: "Layer 04",
      text: "Varejo Investidor provides the infrastructure, products, technology, brand, and strategic direction that hold the ecosystem.",
      points: ["Brand", "Technology", "Products", "Management", "Governance", "International strategy"],
    },
  ],
  rotate: "Drag to rotate",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  layerLabel: "Select layer",
  growthEyebrow: "Path",
  growthTitle: "Your operation can grow with the ecosystem.",
  growthText: "Progress is not automatic. Each step depends on performance, criteria, approval, and a contract.",
  growthSteps: [
    "Registration and approval.",
    "Start as an affiliate.",
    "Develop sales.",
    "Build a commercial community.",
    "Possible move into leadership.",
    "Coordinate teams and markets.",
    "Possible proposal for an international operation.",
  ],
  growthNote: "No step promises promotion, compensation, or automatic participation.",
  flowEyebrow: "How it works",
  flowTitle: "From discovery to compensation.",
  flowText:
    "A client meets Varejo Investidor through an affiliate campaign, uses the individual link, and completes a valid purchase. The sales platform records the transaction and the attribution. Affiliate follow-up, and the leader’s when applicable, uses that record. Compensation follows the contract and the configured calculation base.",
  flowSteps: [
    { title: "Discovery", text: "The client finds the campaign." },
    { title: "Individual link", text: "The visit is identified." },
    { title: "Sale", text: "The valid purchase is recorded." },
    { title: "Attribution", text: "The platform assigns the source." },
    { title: "Compensation", text: "Calculation follows the contract." },
  ],
  flowNote: "Joining a WhatsApp channel, by itself, does not attribute a sale.",
};

const es: CommercialCopy = {
  ...en,
  earnEyebrow: "Remuneración",
  earnTitle: "Construya su operación. Participe de los resultados.",
  earnText:
    "Varejo Investidor Partnership conecta personas, equipos y líderes con una estructura internacional de productos, tecnología, contenido y distribución comercial. Cada participante puede desarrollar su operación según categoría, responsabilidades, desempeño y contrato.",
  earnPending:
    "El porcentaje oficial de comisión no está publicado. Depende de aprobación administrativa y de la validación de la base de cálculo en Lastlink. Nada en esta página es la regla comercial vigente.",
  affiliateTitle: "Afiliados",
  affiliateLead: "El afiliado recibe remuneración por las ventas válidas atribuidas a su enlace individual.",
  affiliateItems: [
    "Enlace exclusivo e identificación de la venta.",
    "Productos autorizados en el contrato.",
    "Comisión por venta según el contrato aprobado.",
    "Historial de resultados.",
    "Reglas de renovación, cancelación y reembolso.",
    "Posibilidad de participar en Rewards, según su reglamento.",
  ],
  leaderTitle: "Líderes y coproductores",
  leaderLead: "El líder desarrolla una operación comercial en un idioma, país o mercado. Su remuneración es independiente de la comisión individual del afiliado.",
  leaderItems: [
    "Desarrollar equipos y organizar afiliados.",
    "Ampliar la marca y coordinar campañas.",
    "Desarrollar alianzas y seguir resultados.",
    "Participar de la expansión internacional solo cuando esté aprobado.",
  ],
  economicTitle: "Participantes económicos",
  economicLead: "Una modalidad distinta, sujeta a análisis, elegibilidad y formalización contractual.",
  economicItems: [
    "No es la modalidad común de afiliado.",
    "No representa automáticamente participación societaria.",
    "Los derechos dependen de los instrumentos contractuales.",
    "No hay promesa de rentabilidad ni garantía de liquidez.",
    "Toda manifestación pasa por análisis y validación jurídica.",
  ],
  economicCta: "Manifestar interés en participación económica",
  simEyebrow: "Simulación",
  simTitle: "¿Cuánto puede generar su operación?",
  simText: "Simule escenarios de ventas y vea cómo una estructura comercial puede distribuir los resultados.",
  product: "Producto",
  products: ["Elite", "Formación Varejo Investidor", "Consultoría"],
  price: "Precio de la venta",
  quantity: "Ventas por mes",
  affiliateRate: "Comisión del afiliado",
  leaderRate: "Remuneración del líder",
  model: "Lectura ilustrativa",
  modelA: "Modelo A · comisión sobre el saldo",
  modelAHelp: "El afiliado se aplica sobre el bruto. El líder se aplica sobre el saldo después de esa comisión. El resto, antes de otros costos, queda para Varejo Investidor.",
  modelB: "Modelo B · porcentajes sobre el bruto",
  modelBHelp: "Afiliado y líder se aplican, cada uno, sobre el bruto. El resto, antes de otros costos, queda para Varejo Investidor.",
  gross: "Volumen bruto",
  affiliateOut: "Afiliado estimado",
  leaderOut: "Líder estimado",
  houseOut: "Saldo estimado de Varejo Investidor",
  monthly: "Resultado mensual",
  annual: "Proyección anual",
  overflow: "La suma de los porcentajes supera el 100% del bruto. Ajuste los campos. Esta simulación no muestra saldo negativo.",
  disclaimer:
    "Simulación ilustrativa. Los valores no representan promesa de ganancias ni remuneración garantizada. La remuneración efectiva depende de las reglas comerciales aprobadas, ventas válidas, contratos, tasas, impuestos, reversiones y condiciones de la plataforma.",
  exampleTitle: "Ejemplo hipotético de R$ 1.000",
  exampleText:
    "En el Modelo A, con 40% para el afiliado y 40% del saldo restante para el líder: bruto R$ 1.000, afiliado R$ 400, saldo R$ 600, líder R$ 240, Varejo Investidor R$ 360. Es anterior a tasas, impuestos, reembolsos, chargebacks y otros costos. No es una regla comercial definitiva.",
  exampleRows: ["Venta bruta · R$ 1.000", "Afiliado · R$ 400", "Saldo · R$ 600", "Líder · R$ 240", "Varejo Investidor · R$ 360"],
  ecoEyebrow: "Estructura",
  ecoTitle: "Un ecosistema. Distintas capas. Un objetivo global.",
  ecoText: "Cada participante cumple una función dentro de una estructura integrada de desarrollo comercial, distribución, tecnología y expansión internacional.",
  layers: [
    {
      title: "Clientes y mercados",
      kicker: "Capa 01",
      text: "La base de crecimiento está formada por las personas y los mercados que usan los productos y servicios del ecosistema.",
      points: ["Mercados internacionales", "Clientes", "Educación", "Productos y contenido", "Relación"],
    },
    {
      title: "Afiliados",
      kicker: "Capa 02",
      text: "Los afiliados amplían la distribución mediante sus redes, campañas y relaciones.",
      points: ["Enlaces individuales", "Campañas", "Contenido", "Adquisición de clientes", "Relación comercial"],
    },
    {
      title: "Líderes y coproductores",
      kicker: "Capa 03",
      text: "Los líderes organizan equipos, desarrollan mercados y coordinan operaciones dentro de las responsabilidades aprobadas.",
      points: ["Equipos", "Idiomas", "Países", "Campañas", "Operaciones comerciales"],
    },
    {
      title: "Varejo Investidor",
      kicker: "Capa 04",
      text: "Varejo Investidor aporta la infraestructura, los productos, la tecnología, la marca y la dirección estratégica.",
      points: ["Marca", "Tecnología", "Productos", "Gestión", "Gobernanza", "Estrategia internacional"],
    },
  ],
  rotate: "Arrastre para girar",
  zoomIn: "Acercar",
  zoomOut: "Alejar",
  layerLabel: "Seleccionar capa",
  growthEyebrow: "Recorrido",
  growthTitle: "Su operación puede crecer junto con el ecosistema.",
  growthText: "La evolución no es automática. Cada etapa depende de desempeño, criterios, aprobación y contrato.",
  growthSteps: [
    "Registro y aprobación.",
    "Inicio como afiliado.",
    "Desarrollo de ventas.",
    "Construcción de una comunidad comercial.",
    "Posibilidad de asumir liderazgo.",
    "Coordinación de equipos y mercados.",
    "Posibilidad de presentar una propuesta de operación internacional.",
  ],
  growthNote: "Ninguna etapa promete promoción, remuneración o participación automática.",
  flowEyebrow: "Funcionamiento",
  flowTitle: "Del descubrimiento a la remuneración.",
  flowText:
    "Un cliente conoce Varejo Investidor por una campaña de un afiliado, usa el enlace individual y completa una compra válida. La plataforma registra la transacción y la atribución. El seguimiento del afiliado y, cuando corresponde, del líder usa esa base. La remuneración sigue el contrato y la base de cálculo configurada.",
  flowSteps: [
    { title: "Descubrimiento", text: "El cliente encuentra la campaña." },
    { title: "Enlace individual", text: "El acceso queda identificado." },
    { title: "Venta", text: "La compra válida queda registrada." },
    { title: "Atribución", text: "La plataforma asocia el origen." },
    { title: "Remuneración", text: "El cálculo sigue el contrato." },
  ],
  flowNote: "Entrar en un canal de WhatsApp, por sí solo, no atribuye una venta.",
};

export function commercialCopyFor(locale: string): CommercialCopy {
  if (locale === "pt") return pt;
  if (locale === "es") return es;
  return en;
}
