export type PartnerCategory = "affiliate" | "leader" | "economic" | "office" | "analyst";

export type PartnersCopy = {
  nav: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroText: string;
  ctaPartner: string;
  ctaEcosystem: string;
  visionEyebrow: string;
  visionFigure: string;
  visionTitle: string;
  visionText: string;
  visionNote: string;
  pathsEyebrow: string;
  pathsTitle: string;
  affiliateTitle: string;
  affiliateText: string;
  affiliateProducts: string;
  affiliateBenefits: string[];
  affiliateCta: string;
  affiliateNote: string;
  leaderTitle: string;
  leaderText: string;
  leaderItems: string[];
  leaderCta: string;
  leaderNote: string;
  economicTitle: string;
  economicText: string;
  economicCta: string;
  economicNote: string;
  rewardsEyebrow: string;
  rewardsTitle: string;
  rewardsText: string;
  rewards: { title: string; items: string[] }[];
  rewardsNote: string;
  officesEyebrow: string;
  officesTitle: string;
  officesSubtitle: string;
  officesText: string;
  officesItems: string[];
  officesCta: string;
  officesNote: string;
  deskEyebrow: string;
  deskTitle: string;
  deskText: string;
  deskAreas: string[];
  deskMore: string;
  deskCta: string;
  deskNote: string;
  productsEyebrow: string;
  productsTitle: string;
  products: { title: string; text: string; cta: string; href: string }[];
  globalEyebrow: string;
  globalTitle: string;
  globalText: string;
  centralEyebrow: string;
  centralTitle: string;
  centralText: string;
  centralCta: string;
  centralNote: string;
  form: {
    name: string;
    email: string;
    country: string;
    city: string;
    language: string;
    experience: string;
    structure: string;
    investment: string;
    proposal: string;
    specialty: string;
    history: string;
    links: string;
    presentation: string;
    consent: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    pending: string;
    required: string;
  };
};

const formPt: PartnersCopy["form"] = {
  name: "Nome",
  email: "E-mail",
  country: "País",
  city: "Cidade",
  language: "Idioma",
  experience: "Experiência empresarial",
  structure: "Estrutura pretendida",
  investment: "Investimento estimado",
  proposal: "Apresentação da proposta",
  specialty: "Especialidade",
  history: "Experiência profissional",
  links: "Links de trabalhos ou portfólio",
  presentation: "Apresentação pessoal",
  consent: "Autorizo o uso destes dados apenas para avaliar esta manifestação de interesse.",
  submit: "Enviar manifestação",
  sending: "Enviando…",
  success: "Recebemos sua manifestação. A equipe avalia cada envio individualmente.",
  error: "Não foi possível enviar agora. Tente de novo em instantes.",
  pending: "O registro ainda não está ativo no banco. A manifestação não foi gravada.",
  required: "Preencha os campos obrigatórios e o consentimento.",
};

const formEn: PartnersCopy["form"] = {
  name: "Name",
  email: "Email",
  country: "Country",
  city: "City",
  language: "Language",
  experience: "Business experience",
  structure: "Proposed structure",
  investment: "Estimated investment",
  proposal: "Proposal",
  specialty: "Specialty",
  history: "Professional experience",
  links: "Work or portfolio links",
  presentation: "Personal introduction",
  consent: "I authorize the use of this information only to review this expression of interest.",
  submit: "Submit interest",
  sending: "Sending…",
  success: "We received your interest. Each submission is reviewed individually.",
  error: "Could not send right now. Please try again shortly.",
  pending: "Storage is not active yet. This submission was not saved.",
  required: "Complete the required fields and consent.",
};

export const partnersCopy: Record<"pt" | "en" | "es", PartnersCopy> = {
  pt: {
    nav: "Partners",
    metaTitle: "Varejo Investidor Partners | Faça parte do ecossistema global",
    metaDescription:
      "Conheça o Varejo Investidor Partners e participe da expansão internacional como afiliado, líder, analista ou parceiro estratégico.",
    heroEyebrow: "Varejo Investidor Partners",
    heroTitle: "Construa o futuro com o Varejo Investidor.",
    heroSubtitle:
      "Faça parte de um ecossistema internacional que conecta educação financeira, inteligência de mercado, tecnologia, distribuição comercial e oportunidades de crescimento.",
    heroText:
      "Estamos construindo uma estrutura global, com parceiros em diferentes países, idiomas e mercados. Procuramos pessoas e organizações que queiram participar dessa expansão.",
    ctaPartner: "Quero ser parceiro",
    ctaEcosystem: "Conhecer o ecossistema",
    visionEyebrow: "Nossa visão · 2040",
    visionFigure: "US$ 1 trilhão",
    visionTitle: "Uma ambição global para 2040.",
    visionText:
      "Nossa ambição é contribuir para que US$ 1 trilhão em patrimônio de clientes esteja sob gestão, aconselhamento ou acompanhamento do ecossistema Varejo Investidor até 2040. Estamos construindo uma estrutura internacional que conecta pessoas, tecnologia, conhecimento e mercados financeiros.",
    visionNote:
      "Meta aspiracional de longo prazo. Não representa patrimônio atualmente administrado nem resultado garantido. A redação respeita as atividades efetivamente prestadas e autorizadas.",
    pathsEyebrow: "Participação",
    pathsTitle: "Um ecossistema. Diferentes formas de participar.",
    affiliateTitle: "Distribua conhecimento. Construa resultados.",
    affiliateText:
      "Os afiliados participam da expansão comercial do Varejo Investidor, divulgando produtos e conteúdos por meio de links individuais de atribuição.",
    affiliateProducts: "Produtos elegíveis: Elite, Formação Varejo Investidor e Consultoria.",
    affiliateBenefits: [
      "Link individual de divulgação",
      "Materiais comerciais e campanhas",
      "Comunicação centralizada por idioma",
      "Acompanhamento de vendas e comissões",
      "Programa de recompensas",
      "Reconhecimento por desempenho",
    ],
    affiliateCta: "Quero ser afiliado",
    affiliateNote: "Percentuais de comissão serão publicados somente após a validação das bases de cálculo da Lastlink.",
    leaderTitle: "Lidere mercados. Desenvolva operações.",
    leaderText:
      "Os líderes desenvolvem a presença do Varejo Investidor em um idioma, produto ou mercado. A liderança não é participação societária automática.",
    leaderItems: [
      "Coordenar afiliados",
      "Desenvolver campanhas comerciais",
      "Administrar a comunicação por idioma",
      "Desenvolver parcerias locais",
      "Acompanhar resultados comerciais",
      "Participar da expansão internacional",
      "Desenvolver equipes e operações regionais",
    ],
    leaderCta: "Quero ser líder",
    leaderNote: "Atuação possível como líder de idioma, de produto ou de operação internacional, mediante seleção.",
    economicTitle: "Participe da construção de longo prazo.",
    economicText:
      "Estamos estruturando oportunidades de participação econômica para quem deseja acompanhar o desenvolvimento do ecossistema. Conhecer essas oportunidades depende de avaliação, elegibilidade, documentação e aprovação.",
    economicCta: "Conhecer oportunidades",
    economicNote:
      "Manifestação de interesse, sem compromisso de investimento. Participação econômica contratual não equivale a participação societária. Não há preço público, promessa de valorização, retorno ou negociação de participações nesta página.",
    rewardsEyebrow: "Varejo Partners Rewards",
    rewardsTitle: "Seu crescimento merece reconhecimento.",
    rewardsText:
      "Queremos desenvolver parceiros e líderes que contribuam para a expansão. O programa de incentivos será baseado em desempenho, consistência e contribuição para o ecossistema.",
    rewards: [
      { title: "Tecnologia", items: ["iPhones e smartphones", "Computadores e notebooks", "Equipamentos de trabalho"] },
      { title: "Inteligência artificial", items: ["Assinaturas de ferramentas de IA", "Ferramentas de automação", "Produtividade e pesquisa"] },
      { title: "Produção de conteúdo", items: ["Equipes de editores", "Designers", "Apoio audiovisual", "Estrutura para campanhas"] },
      { title: "Reconhecimento", items: ["Ranking de desempenho", "Reconhecimento trimestral", "Premiações anuais", "Desenvolvimento de liderança"] },
    ],
    rewardsNote:
      "Recompensas sujeitas a regulamento, metas, elegibilidade, orçamento e critérios de desempenho. A apresentação não constitui promessa de premiação automática.",
    officesEyebrow: "Global Offices",
    officesTitle: "O Varejo Investidor não tem fronteiras.",
    officesSubtitle: "Desenvolvemos uma estrutura internacional para conectar mercados, pessoas e oportunidades.",
    officesText:
      "Estamos abrindo a possibilidade de escritórios físicos em diferentes países, liderados por profissionais selecionados e aprovados pela direção central.",
    officesItems: [
      "Liderança de operações nacionais",
      "Desenvolvimento de equipes locais",
      "Produção de conteúdo no idioma",
      "Eventos e relacionamento institucional",
      "Parcerias comerciais",
      "Expansão da presença da marca",
    ],
    officesCta: "Quero propor um escritório",
    officesNote:
      "A abertura depende de aprovação institucional, análise financeira e validação jurídica, tributária e regulatória no país escolhido.",
    deskEyebrow: "Elite Research Desk",
    deskTitle: "Inteligência de mercado construída por especialistas.",
    deskText:
      "Pretendemos ampliar a estrutura de análise do Elite com três a cinco analistas selecionados.",
    deskAreas: ["Forex e moedas", "Índices e ações", "Commodities e metais", "Criptoativos", "Macroeconomia e análise multimercado"],
    deskMore: "Buscamos capacidade analítica, consistência metodológica, responsabilidade e conhecimento dos mercados.",
    deskCta: "Quero ser analista do Elite",
    deskNote: "As candidaturas passam por avaliação técnica, editorial e regulatória. Não há promessa de contratação ou remuneração antes da seleção.",
    productsEyebrow: "Lastlink",
    productsTitle: "Nossa estrutura de produtos",
    products: [
      {
        title: "Elite",
        text: "Inteligência de mercado, análises, conteúdos e acompanhamento dos mercados financeiros.",
        cta: "Conhecer o Elite",
        href: "/sinais",
      },
      {
        title: "Formação",
        text: "Educação em três níveis — Formiga, Lobo e Harpia — com desenvolvimento progressivo do conhecimento financeiro.",
        cta: "Conhecer a formação",
        href: "/educacao",
      },
      {
        title: "Consultoria",
        text: "Serviços especializados, com escopo e atendimento definidos conforme a estrutura e as autorizações aplicáveis.",
        cta: "Conhecer os serviços",
        href: "/servicos",
      },
    ],
    globalEyebrow: "Expansão",
    globalTitle: "Uma marca. Diferentes mercados. Uma visão global.",
    globalText:
      "O Varejo Investidor desenvolve uma estrutura multilíngue para conectar conhecimento, produtos e oportunidades em diferentes regiões.",
    centralEyebrow: "Central de Parceiros",
    centralTitle: "Sua operação começa aqui.",
    centralText:
      "Campanhas, materiais e ferramentas serão disponibilizados aos parceiros aprovados. Ainda não há uma central pública de login.",
    centralCta: "Registrar interesse",
    centralNote: "O acesso será informado após a seleção. Este botão abre a manifestação de afiliado. Não existe painel de parceiros nesta etapa.",
    form: formPt,
  },
  en: {
    nav: "Partners",
    metaTitle: "Varejo Investidor Partners | Join the global ecosystem",
    metaDescription:
      "Meet Varejo Investidor Partners and join the international expansion as an affiliate, leader, analyst or strategic partner.",
    heroEyebrow: "Varejo Investidor Partners",
    heroTitle: "Build the future with Varejo Investidor.",
    heroSubtitle:
      "Join an international ecosystem connecting financial education, market intelligence, technology, distribution and growth.",
    heroText:
      "We are building a global structure, with partners across countries, languages and markets. We look for people and organizations who want to take part in that expansion.",
    ctaPartner: "Become a partner",
    ctaEcosystem: "Explore the ecosystem",
    visionEyebrow: "Our vision · 2040",
    visionFigure: "US$ 1 trillion",
    visionTitle: "A global ambition for 2040.",
    visionText:
      "Our ambition is to contribute so that US$ 1 trillion of client wealth is under management, advice or monitoring within the Varejo Investidor ecosystem by 2040. We are building an international structure that connects people, technology, knowledge and financial markets.",
    visionNote:
      "A long-term aspiration. It is not assets currently managed and it is not a guaranteed outcome. Wording follows the activities the company actually provides and is authorized to provide.",
    pathsEyebrow: "Participation",
    pathsTitle: "One ecosystem. Different ways to take part.",
    affiliateTitle: "Distribute knowledge. Build results.",
    affiliateText:
      "Affiliates take part in commercial expansion by sharing products and content through individual attribution links.",
    affiliateProducts: "Eligible products: Elite, Varejo Investidor education and consulting.",
    affiliateBenefits: [
      "Individual promotion link",
      "Commercial materials and campaigns",
      "Central communication by language",
      "Sales and commission tracking",
      "Rewards program",
      "Recognition for performance",
    ],
    affiliateCta: "Become an affiliate",
    affiliateNote: "Commission rates will be published only after Lastlink calculation bases are validated.",
    leaderTitle: "Lead markets. Develop operations.",
    leaderText:
      "Leaders develop Varejo Investidor’s presence in a language, product or market. Leadership is not automatic equity.",
    leaderItems: [
      "Coordinate affiliates",
      "Develop commercial campaigns",
      "Run communication by language",
      "Develop local partnerships",
      "Track commercial results",
      "Join international expansion",
      "Build regional teams and operations",
    ],
    leaderCta: "Become a leader",
    leaderNote: "Possible roles: language lead, product lead or international operation lead, after selection.",
    economicTitle: "Take part in the long-term build.",
    economicText:
      "We are structuring economic participation opportunities for people who want to follow the ecosystem’s development. Access depends on review, eligibility, documentation and approval.",
    economicCta: "Learn about opportunities",
    economicNote:
      "An expression of interest, with no investment commitment. Contractual economic participation is not legal shareholding. This page has no public price, promised appreciation, promised return or trading of interests.",
    rewardsEyebrow: "Varejo Partners Rewards",
    rewardsTitle: "Growth deserves recognition.",
    rewardsText:
      "We want to develop partners and leaders who help the expansion. Incentives will be based on performance, consistency and contribution.",
    rewards: [
      { title: "Technology", items: ["iPhones and smartphones", "Computers and notebooks", "Work equipment"] },
      { title: "Artificial intelligence", items: ["AI tool subscriptions", "Automation tools", "Productivity and research"] },
      { title: "Content production", items: ["Editing teams", "Designers", "Audiovisual support", "Campaign production"] },
      { title: "Recognition", items: ["Performance ranking", "Quarterly recognition", "Annual awards", "Leadership development"] },
    ],
    rewardsNote:
      "Rewards depend on rules, targets, eligibility, budget and performance. Listing them is not a promise of an automatic prize.",
    officesEyebrow: "Global Offices",
    officesTitle: "Varejo Investidor has no borders.",
    officesSubtitle: "We are developing an international structure to connect markets, people and opportunities.",
    officesText:
      "We are opening the possibility of physical offices in different countries, led by professionals selected and approved by central management.",
    officesItems: [
      "National operations leadership",
      "Local teams",
      "Content in the local language",
      "Events and institutional relationships",
      "Commercial partnerships",
      "Brand presence",
    ],
    officesCta: "Propose an office",
    officesNote: "Opening depends on institutional approval, financial review and legal, tax and regulatory validation in the chosen country.",
    deskEyebrow: "Elite Research Desk",
    deskTitle: "Market intelligence built by specialists.",
    deskText: "We intend to expand Elite analysis with three to five selected analysts.",
    deskAreas: ["Forex and currencies", "Indices and equities", "Commodities and metals", "Crypto assets", "Macro and multi-market analysis"],
    deskMore: "We look for analytical ability, methodological consistency, responsibility and market knowledge.",
    deskCta: "Apply as an Elite analyst",
    deskNote: "Applications go through technical, editorial and regulatory review. Hiring and pay are not promised before selection.",
    productsEyebrow: "Lastlink",
    productsTitle: "Our product structure",
    products: [
      { title: "Elite", text: "Market intelligence, analysis, content and market monitoring.", cta: "See Elite", href: "/sinais" },
      {
        title: "Education",
        text: "Three levels — Formiga, Lobo and Harpia — for progressive financial knowledge.",
        cta: "See education",
        href: "/educacao",
      },
      {
        title: "Consulting",
        text: "Specialized services, with scope defined by the applicable structure and authorizations.",
        cta: "See services",
        href: "/servicos",
      },
    ],
    globalEyebrow: "Expansion",
    globalTitle: "One brand. Different markets. One global view.",
    globalText: "Varejo Investidor is building a multilingual structure to connect knowledge, products and opportunities across regions.",
    centralEyebrow: "Partner desk",
    centralTitle: "Your operation starts here.",
    centralText: "Campaigns, materials and tools will be available to approved partners. There is no public partner login yet.",
    centralCta: "Register interest",
    centralNote: "Access is shared after selection. This button opens the affiliate interest form. No partner panel is part of this release.",
    form: formEn,
  },
  es: {
    nav: "Partners",
    metaTitle: "Varejo Investidor Partners | Forma parte del ecosistema global",
    metaDescription:
      "Conoce Varejo Investidor Partners y participa de la expansión internacional como afiliado, líder, analista o socio estratégico.",
    heroEyebrow: "Varejo Investidor Partners",
    heroTitle: "Construye el futuro con Varejo Investidor.",
    heroSubtitle:
      "Forma parte de un ecosistema internacional que conecta educación financiera, inteligencia de mercado, tecnología, distribución y crecimiento.",
    heroText:
      "Estamos construyendo una estructura global, con socios en distintos países, idiomas y mercados.",
    ctaPartner: "Quiero ser socio",
    ctaEcosystem: "Conocer el ecosistema",
    visionEyebrow: "Nuestra visión · 2040",
    visionFigure: "US$ 1 billón",
    visionTitle: "Una ambición global para 2040.",
    visionText:
      "Nuestra ambición es contribuir a que US$ 1 billón de patrimonio de clientes esté bajo gestión, asesoramiento o seguimiento del ecosistema Varejo Investidor hasta 2040.",
    visionNote: "Meta aspiracional de largo plazo. No es patrimonio administrado hoy ni un resultado garantizado.",
    pathsEyebrow: "Participación",
    pathsTitle: "Un ecosistema. Distintas formas de participar.",
    affiliateTitle: "Distribuye conocimiento. Construye resultados.",
    affiliateText: "Los afiliados participan de la expansión comercial con enlaces individuales de atribución.",
    affiliateProducts: "Productos: Elite, Formación y Consultoría.",
    affiliateBenefits: ["Enlace individual", "Materiales y campañas", "Comunicación por idioma", "Seguimiento de ventas", "Recompensas", "Reconocimiento"],
    affiliateCta: "Quiero ser afiliado",
    affiliateNote: "Los porcentajes de comisión se publicarán tras validar las bases de Lastlink.",
    leaderTitle: "Lidera mercados. Desarrolla operaciones.",
    leaderText: "Los líderes desarrollan la presencia en un idioma, producto o mercado. No es participación societaria automática.",
    leaderItems: ["Coordinar afiliados", "Campañas", "Comunicación por idioma", "Alianzas locales", "Resultados", "Expansión", "Equipos regionales"],
    leaderCta: "Quiero ser líder",
    leaderNote: "Posible liderazgo de idioma, producto u operación internacional, tras selección.",
    economicTitle: "Participa de la construcción de largo plazo.",
    economicText: "Estamos estructurando oportunidades de participación económica, sujetas a evaluación, elegibilidad, documentación y aprobación.",
    economicCta: "Conocer oportunidades",
    economicNote: "Manifestación de interés, sin compromiso de inversión. No hay precio público, promesa de retorno ni negociación de participaciones.",
    rewardsEyebrow: "Varejo Partners Rewards",
    rewardsTitle: "Tu crecimiento merece reconocimiento.",
    rewardsText: "El programa de incentivos se basará en desempeño, consistencia y contribución.",
    rewards: [
      { title: "Tecnología", items: ["Smartphones", "Computadores", "Equipos de trabajo"] },
      { title: "Inteligencia artificial", items: ["Suscripciones de IA", "Automatización", "Productividad"] },
      { title: "Contenido", items: ["Editores", "Diseñadores", "Audiovisual", "Campañas"] },
      { title: "Reconocimiento", items: ["Ranking", "Reconocimiento trimestral", "Premios anuales", "Liderazgo"] },
    ],
    rewardsNote: "Sujeto a reglamento, metas, elegibilidad y presupuesto. No es una promesa de premio automático.",
    officesEyebrow: "Global Offices",
    officesTitle: "Varejo Investidor no tiene fronteras.",
    officesSubtitle: "Una estructura internacional para conectar mercados, personas y oportunidades.",
    officesText: "Abrimos la posibilidad de oficinas físicas lideradas por profesionales aprobados por la dirección central.",
    officesItems: ["Operaciones nacionales", "Equipos locales", "Contenido en el idioma", "Eventos", "Alianzas", "Presencia de marca"],
    officesCta: "Quiero proponer una oficina",
    officesNote: "Depende de aprobación institucional, análisis financiero y validación jurídica, tributaria y regulatoria.",
    deskEyebrow: "Elite Research Desk",
    deskTitle: "Inteligencia de mercado construida por especialistas.",
    deskText: "Pretendemos sumar de tres a cinco analistas seleccionados al Elite.",
    deskAreas: ["Forex", "Índices y acciones", "Commodities", "Criptoactivos", "Macroeconomía"],
    deskMore: "Buscamos método, responsabilidad y conocimiento de mercado.",
    deskCta: "Quiero ser analista del Elite",
    deskNote: "Evaluación técnica, editorial y regulatoria. Sin promesa de contratación ni remuneración antes de la selección.",
    productsEyebrow: "Lastlink",
    productsTitle: "Nuestra estructura de productos",
    products: [
      { title: "Elite", text: "Inteligencia de mercado, análisis y seguimiento.", cta: "Ver Elite", href: "/sinais" },
      { title: "Formación", text: "Tres niveles: Formiga, Lobo y Harpia.", cta: "Ver formación", href: "/educacao" },
      { title: "Consultoría", text: "Servicios con alcance según autorizaciones aplicables.", cta: "Ver servicios", href: "/servicos" },
    ],
    globalEyebrow: "Expansión",
    globalTitle: "Una marca. Distintos mercados. Una visión global.",
    globalText: "Desarrollamos una estructura multilingüe a partir de los idiomas ya presentes en el sitio.",
    centralEyebrow: "Central de socios",
    centralTitle: "Tu operación empieza aquí.",
    centralText: "Los recursos se liberan a los socios aprobados. Todavía no hay un acceso público.",
    centralCta: "Registrar interés",
    centralNote: "El acceso se informa después de la selección. Este botón abre el formulario de afiliado.",
    form: {
      ...formEn,
      name: "Nombre",
      country: "País",
      city: "Ciudad",
      language: "Idioma",
      experience: "Experiencia empresarial",
      structure: "Estructura prevista",
      investment: "Inversión estimada",
      proposal: "Propuesta",
      specialty: "Especialidad",
      history: "Experiencia profesional",
      links: "Enlaces de trabajos",
      presentation: "Presentación personal",
      consent: "Autorizo el uso de estos datos solo para evaluar esta manifestación de interés.",
      submit: "Enviar",
      sending: "Enviando…",
      success: "Recibimos tu manifestación. Cada envío se evalúa de forma individual.",
      error: "No fue posible enviar. Inténtalo de nuevo.",
      pending: "El registro aún no está activo. El envío no se guardó.",
      required: "Completa los campos obligatorios y el consentimiento.",
    },
  },
};

export function partnersCopyFor(locale: string): PartnersCopy {
  if (locale === "pt" || locale === "en" || locale === "es") return partnersCopy[locale];
  return partnersCopy.en;
}
