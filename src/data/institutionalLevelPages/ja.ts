import type { EvolutionCompareStep, LevelLocalePack, LevelPageUi } from "./types";

export const levelPageUiJa: LevelPageUi = {
  competenciesTitle: "このレベルが育むもの",
  philosophyTitle: "哲学",
  coreMessageLabel: "核となるメッセージ",
  evolutionTitle: "期待される成長",
  formationTitle: "教育構造",
  formationText:
    "5段階のカリキュラム、コンテンツ、価格、リンクは Varejo Investidor エコシステムに登録済みです。",
  formationStepLabel: "レベル",
  compareTitle: "三人のキャラクターの進化",
  compareSubtitle:
    "アリ、オオカミ、ハーピーは別々のコースではありません。ひとつの方法論における補完的な段階です。",
  compareProgression: "基礎 → 戦略 → グローバル視座",
  pricingEyebrow: "教育への投資",
  viewEducation: "カリキュラム全体を見る",
  otherLevels: "他のレベルを見る",
  levelFormiga: "アリレベル",
  levelLobo: "オオカミレベル",
  levelHarpia: "ハーピーレベル",
};

export const evolutionCompareJa: EvolutionCompareStep[] = [
  {
    id: "formiga",
    name: "アリ",
    tagline: "基礎を理解する",
    summary: "金融の知識、整理、規律、市場リテラシー。",
  },
  {
    id: "lobo",
    name: "オオカミ",
    tagline: "解釈し、戦略的に行動する",
    summary: "分析、行動、市場構造、リスク管理、戦略構築。",
  },
  {
    id: "harpia",
    name: "ハーピー",
    tagline: "システムと世界市場を理解する",
    summary: "マクロ、地政学、国際資本フロー、システム思考、資産形成。",
  },
];

export const levelPackJa: LevelLocalePack = {
  formiga: {
    eyebrow: "アリレベル",
    heroTitle: "基礎を築く。",
    heroSubtitle:
      "アリは旅の始まりです。規律、整理、そしてお金・経済・投資の仕組みを理解することから始まります。",
    conceptTitle: "アリレベルは何を表すのか？",
    conceptIntro:
      "表面的な市場ウォッチを超え、意識的な判断のための土台を築く段階です。",
    competencies: [
      "金融市場の基本的な仕組み",
      "お金・経済・資産の関係",
      "主要な金融商品",
      "固定収益と変動収益",
      "金利、インフレ、購買力",
      "通貨と為替",
      "投資の基礎",
      "家計・資産の整理と計画",
      "市場分析入門",
      "規律と金融行動",
      "リスクと資本保護の初歩",
    ],
    philosophyParagraphs: [
      "アリは環境を理解する前に世界を制しようとしません。観察、反復、規律、小さな決断の積み重ねで知識が育ちます。",
      "資産形成は大きなチャンスだけでなく、基礎理解と一貫性に支えられることを学びます。",
    ],
    coreMessage: "新しい市場に挑む前に、お金の仕組みを理解しなければなりません。",
    evolutionText:
      "この段階の後、学習者は金融情報を読み解き、主要な投資商品を理解し、基本的なリスクを認識し、より意識的な決断ができるようになります。",
    compareTagline: "基礎を理解する",
    compareSummary: "金融の知識、整理、規律、市場リテラシー。",
    primaryCta: "アリチャンネルに参加",
    primaryHref: "free",
    secondaryCta: "教育カリキュラムを見る",
  },
  lobo: {
    eyebrow: "オオカミレベル",
    heroTitle: "戦略、構造、市場インテリジェンス。",
    heroSubtitle:
      "オオカミは市場理解と戦略的行動をつなぎ、環境・パターン・連携した判断を読み取ります。",
    conceptTitle: "オオカミレベルは何を表すのか？",
    conceptIntro:
      "アリが基礎を築く一方、オオカミはシナリオや経済・金融変数の関係を解釈します。",
    competencies: [
      "テクニカル分析とチャート解読",
      "トレンド、反転、移動平均",
      "一目均衡表と分析体系",
      "市場構造",
      "サポートとレジスタンス",
      "リスク管理とエクスポージャー",
      "市場心理",
      "参加者の行動",
      "資産相関",
      "ポートフォリオ構築と分散",
      "条件付き確率",
      "応用マクロ分析",
      "アロケーション戦略",
      "ポジション管理",
      "不確実性下での意思決定",
    ],
    philosophyParagraphs: [
      "オオカミは市場を数字だけと見ません。参加者、機関、期待、資本、情報、決断から生まれると理解します。",
      "単一の答えを探すのをやめ、複数の可能性を読む方法を構築し始めます。",
    ],
    coreMessage:
      "市場を知るだけでは足りません。構造を理解し、動きを読み、それに応じて行動する必要があります。",
    evolutionText:
      "この段階の後、学習者は分析力を得て、シナリオを解釈し、戦略を組み、リスクを管理し、市場横断の関係を理解します。",
    compareTagline: "解釈し、戦略的に行動する",
    compareSummary: "分析、行動、市場構造、リスク管理、戦略構築。",
    primaryCta: "Eliteチャンネルを見る",
    primaryHref: "/sinais",
    secondaryCta: "教育カリキュラムを見る",
  },
  harpia: {
    eyebrow: "ハーピーレベル",
    heroTitle: "システム視座、グローバル資産、継続性。",
    heroSubtitle:
      "ハーピーは国、通貨、機関、資源、国際資本フローを含む金融システム全体を観察します。",
    conceptTitle: "ハーピーレベルは何を表すのか？",
    conceptIntro:
      "アリが基礎、オオカミが戦略を担う一方、ハーピーは複雑なシステムとその相互依存を解釈します。",
    competencies: [
      "国際マクロ経済",
      "地政学と世界経済",
      "国際資本フロー",
      "金融・財政政策",
      "中央銀行と国際金融システム",
      "通貨市場と国際準備",
      "コモディティとエネルギー安全保障",
      "グローバル流動性",
      "景気サイクル",
      "金利・インフレ・成長の関係",
      "国際アセットアロケーション",
      "ETFと国際市場",
      "高度な分散戦略",
      "グローバルシナリオ分析",
      "資産管理と継続性",
      "市場と経済の相互依存",
    ],
    philosophyParagraphs: [
      "ハーピーは単一の資産やチャート、経済だけを切り離して見ません。それらが属するシステム全体を理解しようとします。",
      "中央銀行の判断、エネルギー危機、地政学はフロー・インフレ・サプライチェーンを変えます。ハーピーは国際的・システム的な思考そのものです。",
    ],
    coreMessage:
      "市場はシステムの一部に過ぎません。資本を理解するには、世界を理解する必要があります。",
    evolutionText:
      "この段階の後、学習者は世界の経済現象を解釈し、地政学と金融変数を結び、高度な資産形成と保全を理解します。",
    compareTagline: "システムと世界市場を理解する",
    compareSummary: "マクロ、地政学、国際フロー、システム視座、資産形成。",
    primaryCta: "戦略サービスを見る",
    primaryHref: "/servicos",
    secondaryCta: "教育カリキュラムを見る",
  },
};
