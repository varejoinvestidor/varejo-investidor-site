"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, trackVarejoClick, useSiteLocale } from "../src/components/SiteSections";
import { getInsightsPath } from "../src/data/insightsContent";
import {
  getFormigaChannelUrl,
  getLoboChannelButtonLabel,
  getLoboChannelUrl,
} from "../src/data/whatsappChannels";
import type { Locale } from "../src/i18n";
import { isSupportedLocale, type SupportedLocale } from "../src/i18n/locales";
import { localeToUrlSegment, localizedPath } from "../src/i18n/routing";
import { getHomeHeroSubtext, homeHeroSubtext } from "../src/data/homeHeroSubtext";
import {
  getAuthorityLanguageCard,
  getHomeHeroLanguageStat,
  getIntroLanguageStat,
} from "../src/data/languageCountCopy";
import { homeLiteCopyHe } from "../src/data/homeLiteCopyHe";
import { homePrivateCopyByLocale, homeSelectCopyByLocale } from "../src/data/homeSelectPrivateCopy";
import { isRtlLocale } from "../src/i18n";

type HomeLiteLocaleCopy = {
  hero: { eyebrow: string; title: string; text: string; free: string; services: string };
  intro: { eyebrow: string; title: string; manifesto: string; text: string[]; stats: string[] };
  cards: { code: string; title: string; text: string; href: string }[];
  cardCta: string;
  final: { title: string; text?: string; free: string; elite: string };
};

const homeLiteCopy = {
  pt: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Tudo o que voc\u00ea precisa para investir e construir patrim\u00f4nio em n\u00edvel global.",
      text: homeHeroSubtext.pt,
      free: "ENTRAR NO CANAL FORMIGA",
      services: "CONHECER A FORMA\u00c7\u00c3O",
    },
    intro: {
      eyebrow: "O que \u00e9",
      title: "O que \u00e9 o Varejo Investidor",
      manifesto:
        "O Varejo Investidor \u00e9 uma estrutura financeira global criada para acompanhar a evolu\u00e7\u00e3o do investidor desde os primeiros passos da educa\u00e7\u00e3o financeira at\u00e9 a constru\u00e7\u00e3o de patrim\u00f4nio internacional.",
      text: [
        "Desde 2018, desenvolvemos uma jornada composta por educa\u00e7\u00e3o, sinais, gest\u00e3o operacional e estrutura patrimonial, permitindo que cada investidor avance de acordo com seu momento financeiro.",
        "Formiga: educação financeira, organização, disciplina e construção de base patrimonial.",
        "Elite: análises, sinais e acompanhamento dos mercados globais.",
        "Select: estrutura operacional automatizada para investidores que desejam exposição internacional sem acompanhar operações diariamente.",
        "Private: estrutura patrimonial internacional voltada para proteção, organização, crescimento e continuidade do patrimônio.",
      ],
      stats: ["Desde 2018", "Milh\u00f5es de d\u00f3lares movimentados", "22 idiomas", "Mercados globais"],
    },
    cards: [
      { code: "FORMIGA", title: "Base financeira", text: "Educa\u00e7\u00e3o por n\u00edveis para sair da base, organizar risco e construir os primeiros pilares.", href: "/nivel-formiga" },
      { code: "LOBO", title: "Estrat\u00e9gia e expans\u00e3o", text: "Sinais ao vivo, leitura de mercado e decis\u00f5es estruturadas para operar com disciplina.", href: "/nivel-lobo" },
      { code: "HARPIA", title: "Patrim\u00f4nio global", text: "Consultorias estrat\u00e9gicas para prote\u00e7\u00e3o, posicionamento, patrim\u00f4nio e vis\u00e3o internacional.", href: "/nivel-harpia" },
    ],
    cardCta: "Saiba mais",
    final: {
      title: "Sua jornada come\u00e7a no N\u00edvel Formiga.",
      text: "Comece gratuitamente, acompanhe os mercados globais e desenvolva sua evolu\u00e7\u00e3o financeira atrav\u00e9s dos n\u00edveis Formiga, Lobo e Harpia.",
      free: "ENTRAR NO CANAL FORMIGA",
      elite: "CONHECER CANAL ELITE HARPIA",
    },
  },
  en: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Everything you need to invest and build wealth on a global level.",
      text: "Understand global markets, follow economic analysis, and develop a strategy to build wealth beyond the borders of your country.",
      free: "JOIN THE FORMIGA CHANNEL",
      services: "EXPLORE FORMATION",
    },
    intro: {
      eyebrow: "What it is",
      title: "What is Varejo Investidor",
      manifesto:
        "Varejo Investidor is a global financial structure for people who want to move beyond the basics, understand international markets, and build their financial life in layers.",
      text: [
        "Since 2018, we have delivered more than 4,200 live signals while following Forex, gold, oil, crypto, indices, and global currencies.",
        "The journey is divided into levels: Ant, Wolf, and Harpy.",
        "The Ant level builds the foundation. The Wolf level develops strategy and market reading. The Harpy level expands vision toward wealth, protection, and global structure.",
      ],
      stats: ["Since 2018", "live signals", "Ant / Wolf / Harpy"],
    },
    cards: [
      { code: "ANT", title: "Financial foundation", text: "Level-based education to build foundation, organize risk, and create the first pillars.", href: "/nivel-formiga" },
      { code: "WOLF", title: "Strategy and expansion", text: "Live signals, market reading, and structured decisions for disciplined execution.", href: "/nivel-lobo" },
      { code: "HARPY", title: "Global wealth", text: "Strategic consulting for protection, positioning, wealth, and international vision.", href: "/nivel-harpia" },
    ],
    cardCta: "Learn more",
    final: {
      title: "Start free and choose your next level.",
      free: "Join Free Channel",
      elite: "Explore Elite Channel",
    },
  },
  es: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Todo lo que necesitas para invertir y construir patrimonio a nivel global.",
      text: "Comprende los mercados globales, sigue an\u00e1lisis econ\u00f3micos y desarrolla una estrategia para construir patrimonio m\u00e1s all\u00e1 de las fronteras de tu pa\u00eds.",
      free: "ENTRAR AL CANAL FORMIGA",
      services: "CONOCER LA FORMACI\u00d3N",
    },
    intro: {
      eyebrow: "Qu\u00e9 es",
      title: "Qu\u00e9 es Varejo Investidor",
      manifesto:
        "Varejo Investidor es una estructura financiera global para quien desea salir de lo b\u00e1sico, entender el mercado internacional y construir su vida financiera por capas.",
      text: [
        "Desde 2018, entregamos m\u00e1s de 4.200 se\u00f1ales en vivo, acompa\u00f1ando Forex, oro, petr\u00f3leo, cripto, \u00edndices y monedas globales.",
        "La jornada se divide en niveles: Hormiga, Lobo y Harp\u00eda.",
        "El nivel Hormiga construye la base. El nivel Lobo desarrolla estrategia y lectura de mercado. El nivel Harp\u00eda ampl\u00eda la visi\u00f3n hacia patrimonio, protecci\u00f3n y estructura global.",
      ],
      stats: ["Desde 2018", "se\u00f1ales en vivo", "Hormiga / Lobo / Harp\u00eda"],
    },
    cards: [
      { code: "HORMIGA", title: "Base financiera", text: "Educaci\u00f3n por niveles para construir base, organizar riesgo y crear los primeros pilares.", href: "/nivel-formiga" },
      { code: "LOBO", title: "Estrategia y expansi\u00f3n", text: "Se\u00f1ales en vivo, lectura de mercado y decisiones estructuradas para operar con disciplina.", href: "/nivel-lobo" },
      { code: "HARP\u00cdA", title: "Patrimonio global", text: "Consultor\u00edas estrat\u00e9gicas para protecci\u00f3n, posicionamiento, patrimonio y visi\u00f3n internacional.", href: "/nivel-harpia" },
    ],
    cardCta: "Saber m\u00e1s",
    final: {
      title: "Empieza gratis y elige tu pr\u00f3ximo nivel.",
      free: "Entrar al canal gratuito",
      elite: "Conocer Canal Elite",
    },
  },
  fr: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Tout ce qu’il faut pour investir et construire un patrimoine à l’échelle mondiale.",
      text: "Comprenez les marchés mondiaux, suivez les analyses économiques et développez une stratégie pour bâtir un patrimoine au-delà des frontières de votre pays.",
      free: "REJOINDRE LE CANAL FORMIGA",
      services: "DÉCOUVRIR LA FORMATION",
    },
    intro: {
      eyebrow: "Notre approche",
      title: "Qu’est-ce que Varejo Investidor",
      manifesto:
        "Varejo Investidor est une structure financière mondiale pour progresser au-delà des bases, comprendre les marchés internationaux et construire son parcours patrimonial par étapes.",
      text: [
        "Depuis 2018, nous diffusons analyses, signaux et formation sur le Forex, l’or, le pétrole, les cryptoactifs, les indices et les devises internationales.",
        "Le parcours s’organise en niveaux : Fourmi, Loup et Harpie.",
        "Fourmi pose les fondations. Loup développe stratégie et lecture de marché. Harpie élargit la vision vers patrimoine, protection et structure internationale.",
      ],
      stats: ["Depuis 2018", "signaux en direct", "Fourmi / Loup / Harpie"],
    },
    cards: [
      { code: "FOURMI", title: "Éducation financière", text: "Formation par niveaux pour construire la base, organiser le risque et poser les premiers piliers.", href: "/nivel-formiga" },
      { code: "LOUP", title: "Stratégie et marchés", text: "Signaux en direct, lecture de marché et décisions structurées pour opérer avec discipline.", href: "/nivel-lobo" },
      { code: "HARPIE", title: "Patrimoine mondial", text: "Conseil stratégique pour protection, positionnement patrimonial et vision internationale.", href: "/nivel-harpia" },
    ],
    cardCta: "En savoir plus",
    final: {
      title: "Choisissez la prochaine étape de votre évolution patrimoniale.",
      text: "Commencez par la formation, suivez analyses et signaux, explorez Select ou structurez votre patrimoine mondial avec Private.",
      free: "CANAL FORMIGA",
      elite: "CANAL ELITE",
    },
  },
  de: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Alles, was Sie brauchen, um global zu investieren und Vermögen aufzubauen.",
      text: "Verstehen Sie globale Märkte, folgen Sie Wirtschaftsanalysen und entwickeln Sie eine Strategie für Vermögensaufbau über Landesgrenzen hinaus.",
      free: "FORMIGA-KANAL BEITRETEN",
      services: "AUSBILDUNG ENTDECKEN",
    },
    intro: {
      eyebrow: "Was wir sind",
      title: "Was ist Varejo Investidor",
      manifesto:
        "Varejo Investidor ist eine globale Finanzstruktur für Anleger, die über Grundlagen hinausgehen, internationale Kapitalmärkte verstehen und ihr Vermögen stufenweise aufbauen möchten.",
      text: [
        "Seit 2018 begleiten wir Forex, Gold, Öl, Krypto, Indizes und globale Devisen mit Analysen, Signalen und Finanzbildung.",
        "Der Weg gliedert sich in die Stufen Formiga, Wolf und Harpy.",
        "Formiga legt die Basis. Wolf entwickelt Strategie und Markteinordnung. Harpy erweitert den Blick auf Vermögen, Schutz und internationale Struktur.",
      ],
      stats: ["Seit 2018", "Live-Signale", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "Finanzielle Grundlagen", text: "Stufenweise Finanzbildung für Basis, Risikoorganisation und erste Vermögenspfeiler.", href: "/nivel-formiga" },
      { code: "WOLF", title: "Strategie und Märkte", text: "Live-Signale, Markteinordnung und strukturierte Entscheidungen für diszipliniertes Handeln.", href: "/nivel-lobo" },
      { code: "HARPY", title: "Globales Vermögen", text: "Strategische Beratung für Schutz, Positionierung und internationale Vermögensstruktur.", href: "/nivel-harpia" },
    ],
    cardCta: "Mehr erfahren",
    final: {
      title: "Wählen Sie den nächsten Schritt Ihrer Vermögensentwicklung.",
      text: "Starten Sie mit Finanzbildung, folgen Sie Analysen und Signalen, entdecken Sie Select oder strukturieren Sie globales Vermögen mit Private.",
      free: "FORMIGA-KANAL",
      elite: "ELITE-KANAL",
    },
  },
  hi: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "\u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u0938\u094d\u0924\u0930 \u092a\u0930 \u0928\u093f\u0935\u0947\u0936 \u0915\u0930\u0928\u0947 \u0914\u0930 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u092c\u0928\u093e\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0906\u092a\u0915\u094b \u091c\u094b \u0915\u0941\u091b \u092d\u0940 \u091a\u093e\u0939\u093f\u090f\u0964",
      text: "\u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u092c\u093e\u091c\u093e\u0930\u094b\u0902 \u0915\u094b \u0938\u092e\u091d\u0947\u0902, \u0906\u0930\u094d\u0925\u093f\u0915 \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923\u094b\u0902 \u0915\u093e \u0905\u0928\u0941\u0938\u0930\u0923 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0905\u092a\u0928\u0947 \u0926\u0947\u0936 \u0915\u0940 \u0938\u0940\u092e\u093e\u0913\u0902 \u0938\u0947 \u092a\u0930\u0947 \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u092c\u0928\u093e\u0928\u0947 \u0915\u0940 \u0930\u0923\u0928\u0940\u0924\u093f \u0935\u093f\u0915\u0938\u093f\u0924 \u0915\u0930\u0947\u0902\u0964",
      free: "\u092e\u0941\u092b\u094d\u0924 \u091a\u0948\u0928\u0932 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
      services: "\u0938\u0947\u0935\u093e\u090f\u0901 \u0926\u0947\u0916\u0947\u0902",
    },
    intro: {
      eyebrow: "\u092a\u0930\u093f\u091a\u092f",
      title: "Varejo Investidor \u0915\u094d\u092f\u093e \u0939\u0948",
      manifesto:
        "Varejo Investidor \u0909\u0928 \u0932\u094b\u0917\u094b\u0902 \u0915\u0947 \u0932\u093f\u090f \u090f\u0915 \u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u0935\u093f\u0924\u094d\u0924\u0940\u092f \u0938\u0902\u0930\u091a\u0928\u093e \u0939\u0948 \u091c\u094b \u092c\u0941\u0928\u093f\u092f\u093e\u0926\u0940 \u0938\u094d\u0924\u0930 \u0938\u0947 \u0906\u0917\u0947 \u092c\u0922\u093c\u0915\u0930 \u0905\u0902\u0924\u0930\u0930\u093e\u0937\u094d\u091f\u094d\u0930\u0940\u092f \u092c\u093e\u091c\u093e\u0930 \u0915\u094b \u0938\u092e\u091d\u0928\u093e \u0914\u0930 \u0905\u092a\u0928\u0940 \u0935\u093f\u0924\u094d\u0924\u0940\u092f \u091c\u093f\u0902\u0926\u0917\u0940 \u0915\u094b \u091a\u0930\u0923\u094b\u0902 \u092e\u0947\u0902 \u092c\u0928\u093e\u0928\u093e \u091a\u093e\u0939\u0924\u0947 \u0939\u0948\u0902\u0964",
      text: [
        "2018 \u0938\u0947 \u0939\u092e Forex, \u0938\u094b\u0928\u093e, \u0924\u0947\u0932, \u0915\u094d\u0930\u093f\u092a\u094d\u091f\u094b, \u0938\u0942\u091a\u0915\u093e\u0902\u0915 \u0914\u0930 \u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u092e\u0941\u0926\u094d\u0930\u093e\u0913\u0902 \u0915\u093e \u0905\u0928\u0941\u0938\u0930\u0923 \u0915\u0930\u0924\u0947 \u0939\u0941\u090f 4,200 \u0938\u0947 \u0905\u0927\u093f\u0915 \u0932\u093e\u0907\u0935 \u0938\u093f\u0917\u094d\u0928\u0932 \u092d\u0947\u091c \u091a\u0941\u0915\u0947 \u0939\u0948\u0902\u0964",
        "\u092f\u0939 \u092f\u093e\u0924\u094d\u0930\u093e \u0924\u0940\u0928 \u0938\u094d\u0924\u0930\u094b\u0902 \u092e\u0947\u0902 \u0935\u093f\u092d\u093e\u091c\u093f\u0924 \u0939\u0948: \u091a\u0940\u0902\u091f\u0940, \u092d\u0947\u0921\u093c\u093f\u092f\u093e \u0914\u0930 \u0917\u0930\u0941\u0921\u093c\u0964",
        "\u091a\u0940\u0902\u091f\u0940 \u0938\u094d\u0924\u0930 \u0906\u0927\u093e\u0930 \u092c\u0928\u093e\u0924\u093e \u0939\u0948\u0964 \u092d\u0947\u0921\u093c\u093f\u092f\u093e \u0938\u094d\u0924\u0930 \u0930\u0923\u0928\u0940\u0924\u093f \u0914\u0930 \u092c\u093e\u091c\u093e\u0930-\u092a\u0920\u0928 \u0935\u093f\u0915\u0938\u093f\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964 \u0917\u0930\u0941\u0921\u093c \u0938\u094d\u0924\u0930 \u0938\u0902\u092a\u0924\u094d\u0924\u093f, \u0938\u0941\u0930\u0915\u094d\u0937\u093e \u0914\u0930 \u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u0938\u0902\u0930\u091a\u0928\u093e \u0915\u0940 \u0926\u0943\u0937\u094d\u091f\u093f \u0915\u094b \u0935\u093f\u0938\u094d\u0924\u0943\u0924 \u0915\u0930\u0924\u093e \u0939\u0948\u0964",
      ],
      stats: ["2018 \u0938\u0947", "\u0932\u093e\u0907\u0935 \u0938\u093f\u0917\u094d\u0928\u0932", "\u091a\u0940\u0902\u091f\u0940 / \u092d\u0947\u0921\u093c\u093f\u092f\u093e / \u0917\u0930\u0941\u0921\u093c"],
    },
    cards: [
      { code: "\u091a\u0940\u0902\u091f\u0940", title: "\u0935\u093f\u0924\u094d\u0924\u0940\u092f \u0906\u0927\u093e\u0930", text: "\u0906\u0927\u093e\u0930 \u092c\u0928\u093e\u0928\u0947, \u091c\u094b\u0916\u093f\u092e \u0935\u094d\u092f\u0935\u0938\u094d\u0925\u093f\u0924 \u0915\u0930\u0928\u0947 \u0914\u0930 \u092a\u0939\u0932\u0947 \u0938\u094d\u0924\u0902\u092d \u0924\u0948\u092f\u093e\u0930 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0938\u094d\u0924\u0930-\u0906\u0927\u093e\u0930\u093f\u0924 \u0936\u093f\u0915\u094d\u0937\u093e\u0964", href: "/nivel-formiga" },
      { code: "\u092d\u0947\u0921\u093c\u093f\u092f\u093e", title: "\u0930\u0923\u0928\u0940\u0924\u093f \u0914\u0930 \u0935\u093f\u0938\u094d\u0924\u093e\u0930", text: "\u0905\u0928\u0941\u0936\u093e\u0938\u093f\u0924 \u0911\u092a\u0930\u0947\u0936\u0928 \u0915\u0947 \u0932\u093f\u090f \u0932\u093e\u0907\u0935 \u0938\u093f\u0917\u094d\u0928\u0932, \u092c\u093e\u091c\u093e\u0930-\u092a\u0920\u0928 \u0914\u0930 \u0938\u0902\u0930\u091a\u093f\u0924 \u0928\u093f\u0930\u094d\u0923\u092f\u0964", href: "/nivel-lobo" },
      { code: "\u0917\u0930\u0941\u0921\u093c", title: "\u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u0938\u0902\u092a\u0924\u094d\u0924\u093f", text: "\u0938\u0941\u0930\u0915\u094d\u0937\u093e, \u092a\u094b\u091c\u093f\u0936\u0928\u093f\u0902\u0917, \u0938\u0902\u092a\u0924\u094d\u0924\u093f \u0914\u0930 \u0905\u0902\u0924\u0930\u0930\u093e\u0937\u094d\u091f\u094d\u0930\u0940\u092f \u0926\u0943\u0937\u094d\u091f\u093f \u0915\u0947 \u0932\u093f\u090f \u0930\u0923\u0928\u0940\u0924\u093f\u0915 \u0938\u0947\u0935\u093e\u090f\u0901\u0964", href: "/nivel-harpia" },
    ],
    cardCta: "\u0914\u0930 \u091c\u093e\u0928\u0947\u0902",
    final: {
      title: "\u092e\u0941\u092b\u094d\u0924 \u092e\u0947\u0902 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0905\u092a\u0928\u093e \u0905\u0917\u0932\u093e \u0938\u094d\u0924\u0930 \u091a\u0941\u0928\u0947\u0902\u0964",
      free: "\u092e\u0941\u092b\u094d\u0924 \u091a\u0948\u0928\u0932 \u092e\u0947\u0902 \u092a\u094d\u0930\u0935\u0947\u0936 \u0915\u0930\u0947\u0902",
      elite: "\u090f\u0932\u0940\u091f \u091a\u0948\u0928\u0932 \u0926\u0947\u0916\u0947\u0902",
    },
  },
  ar: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "\u0643\u0644 \u0645\u0627 \u062a\u062d\u062a\u0627\u062c\u0647 \u0644\u0644\u0627\u0633\u062a\u062b\u0645\u0627\u0631 \u0648\u0628\u0646\u0627\u0621 \u0627\u0644\u062b\u0631\u0648\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0639\u0627\u0644\u0645\u064a.",
      text: "\u0627\u0641\u0647\u0645 \u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629\u060c \u062a\u0627\u0628\u0639 \u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f\u064a\u0629\u060c \u0648\u0637\u0648\u0631 \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0644\u0628\u0646\u0627\u0621 \u0627\u0644\u062b\u0631\u0648\u0629 \u062e\u0627\u0631\u062c \u062d\u062f\u0648\u062f \u0628\u0644\u062f\u0643.",
      free: "\u0627\u0628\u062f\u0623 \u0645\u062c\u0627\u0646\u0627",
      services: "\u0634\u0627\u0647\u062f \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
    },
    intro: {
      eyebrow: "\u0645\u0627 \u0647\u0648",
      title: "\u0645\u0627 \u0647\u0648 Varejo Investidor",
      manifesto:
        "Varejo Investidor \u0647\u0648 \u0647\u064a\u0643\u0644 \u0645\u0627\u0644\u064a \u0639\u0627\u0644\u0645\u064a \u0644\u0645\u0646 \u064a\u0631\u064a\u062f \u062a\u062c\u0627\u0648\u0632 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0627\u062a \u0648\u0641\u0647\u0645 \u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u0648\u0628\u0646\u0627\u0621 \u062d\u064a\u0627\u062a\u0647 \u0627\u0644\u0645\u0627\u0644\u064a\u0629 \u0639\u0644\u0649 \u0637\u0628\u0642\u0627\u062a.",
      text: [
        "\u0645\u0646\u0630 2018\u060c \u0623\u0631\u0633\u0644\u0646\u0627 \u0623\u0643\u062b\u0631 \u0645\u0646 4,200 \u0625\u0634\u0627\u0631\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0639 \u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u0643\u0631\u064a\u0628\u062a\u0648 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062a \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629.",
        "\u062a\u0646\u0642\u0633\u0645 \u0627\u0644\u0631\u062d\u0644\u0629 \u0625\u0644\u0649 \u0645\u0633\u062a\u0648\u064a\u0627\u062a: \u0627\u0644\u0646\u0645\u0644\u0629\u060c \u0627\u0644\u0630\u0626\u0628\u060c \u0648\u0627\u0644\u0647\u0627\u0631\u0628\u064a.",
        "\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0646\u0645\u0644\u0629 \u064a\u0628\u0646\u064a \u0627\u0644\u0623\u0633\u0627\u0633. \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0630\u0626\u0628 \u064a\u0637\u0648\u0631 \u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0633\u0648\u0642. \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u0647\u0627\u0631\u0628\u064a \u064a\u0648\u0633\u0639 \u0627\u0644\u0631\u0624\u064a\u0629 \u0646\u062d\u0648 \u0627\u0644\u062b\u0631\u0648\u0629 \u0648\u0627\u0644\u062d\u0645\u0627\u064a\u0629 \u0648\u0627\u0644\u0647\u064a\u0643\u0644 \u0627\u0644\u0639\u0627\u0644\u0645\u064a.",
      ],
      stats: ["\u0645\u0646\u0630 2018", "\u0625\u0634\u0627\u0631\u0627\u062a \u0645\u0628\u0627\u0634\u0631\u0629", "\u0627\u0644\u0646\u0645\u0644\u0629 / \u0627\u0644\u0630\u0626\u0628 / \u0627\u0644\u0647\u0627\u0631\u0628\u064a"],
    },
    cards: [
      { code: "\u0627\u0644\u0646\u0645\u0644\u0629", title: "\u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u0645\u0627\u0644\u064a", text: "\u062a\u0639\u0644\u064a\u0645 \u0628\u0627\u0644\u0645\u0633\u062a\u0648\u064a\u0627\u062a \u0644\u0628\u0646\u0627\u0621 \u0627\u0644\u0642\u0627\u0639\u062f\u0629 \u0648\u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0645\u062e\u0627\u0637\u0631 \u0648\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0639\u0645\u062f\u0629 \u0627\u0644\u0623\u0648\u0644\u0649.", href: "/nivel-formiga" },
      { code: "\u0627\u0644\u0630\u0626\u0628", title: "\u0627\u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u0648\u0633\u0639", text: "\u0625\u0634\u0627\u0631\u0627\u062a \u0645\u0628\u0627\u0634\u0631\u0629 \u0648\u0642\u0631\u0627\u0621\u0629 \u0644\u0644\u0633\u0648\u0642 \u0648\u0642\u0631\u0627\u0631\u0627\u062a \u0645\u0646\u0638\u0645\u0629 \u0644\u0644\u062a\u0646\u0641\u064a\u0630 \u0628\u0627\u0646\u0636\u0628\u0627\u0637.", href: "/nivel-lobo" },
      { code: "\u0627\u0644\u0647\u0627\u0631\u0628\u064a", title: "\u0627\u0644\u062b\u0631\u0648\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629", text: "\u062e\u062f\u0645\u0627\u062a \u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u0629 \u0644\u0644\u062d\u0645\u0627\u064a\u0629 \u0648\u0627\u0644\u062a\u0645\u0648\u0636\u0639 \u0648\u0628\u0646\u0627\u0621 \u0627\u0644\u062b\u0631\u0648\u0629 \u0648\u0627\u0644\u0631\u0624\u064a\u0629 \u0627\u0644\u062f\u0648\u0644\u064a\u0629.", href: "/nivel-harpia" },
    ],
    cardCta: "\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f",
    final: {
      title: "\u0627\u0628\u062f\u0623 \u0645\u062c\u0627\u0646\u0627 \u0648\u0627\u062e\u062a\u0631 \u0645\u0633\u062a\u0648\u0627\u0643 \u0627\u0644\u062a\u0627\u0644\u064a.",
      free: "\u0627\u062f\u062e\u0644 \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0645\u062c\u0627\u0646\u064a\u0629",
      elite: "\u062a\u0639\u0631\u0641 \u0625\u0644\u0649 \u0642\u0646\u0627\u0629 \u0627\u0644\u0646\u062e\u0628\u0629",
    },
  },
  tr: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "K\u00fcresel \u00f6l\u00e7ekte yat\u0131r\u0131m yapmak ve servet olu\u015fturmak i\u00e7in ihtiyac\u0131n\u0131z olan her \u015fey.",
      text: "K\u00fcresel piyasalar\u0131 anlay\u0131n, ekonomik analizleri takip edin ve \u00fclkenizin s\u0131n\u0131rlar\u0131n\u0131n \u00f6tesinde servet olu\u015fturacak bir strateji geli\u015ftirin.",
      free: "\u00dccretsiz ba\u015fla",
      services: "Hizmetleri g\u00f6r",
    },
    intro: {
      eyebrow: "Nedir",
      title: "Varejo Investidor nedir",
      manifesto:
        "Varejo Investidor, temel seviyeyi a\u015fmak, uluslararas\u0131 piyasalar\u0131 anlamak ve finansal hayat\u0131n\u0131 katmanlar halinde kurmak isteyenler i\u00e7in k\u00fcresel bir finansal yap\u0131d\u0131r.",
      text: [
        "2018'den beri Forex, alt\u0131n, petrol, kripto, endeksler ve k\u00fcresel para birimlerini takip ederek 4.200'den fazla canl\u0131 sinyal g\u00f6nderdik.",
        "Yolculuk \u00fc\u00e7 seviyeye ayr\u0131l\u0131r: Kar\u0131nca, Kurt ve Harpia.",
        "Kar\u0131nca seviyesi temeli kurar. Kurt seviyesi strateji ve piyasa okuma geli\u015ftirir. Harpia seviyesi varl\u0131k, koruma ve k\u00fcresel yap\u0131 vizyonunu geni\u015fletir.",
      ],
      stats: ["2018'den beri", "canl\u0131 sinyaller", "Kar\u0131nca / Kurt / Harpia"],
    },
    cards: [
      { code: "KARINCA", title: "Finansal temel", text: "Temel olu\u015fturmak, riski d\u00fczenlemek ve ilk s\u00fctunlar\u0131 kurmak i\u00e7in seviyeli e\u011fitim.", href: "/nivel-formiga" },
      { code: "KURT", title: "Strateji ve geni\u015fleme", text: "Disiplinli i\u015flem i\u00e7in canl\u0131 sinyaller, piyasa okuma ve yap\u0131land\u0131r\u0131lm\u0131\u015f kararlar.", href: "/nivel-lobo" },
      { code: "HARPIA", title: "K\u00fcresel varl\u0131k", text: "Koruma, konumlanma, varl\u0131k ve uluslararas\u0131 vizyon i\u00e7in stratejik hizmetler.", href: "/nivel-harpia" },
    ],
    cardCta: "Daha fazla bilgi",
    final: {
      title: "\u00dccretsiz ba\u015fla ve bir sonraki seviyeni se\u00e7.",
      free: "\u00dccretsiz kanala gir",
      elite: "Elite Kanal\u0131n\u0131 ke\u015ffet",
    },
  },
  id: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Semua yang Anda butuhkan untuk berinvestasi dan membangun kekayaan di tingkat global.",
      text: "Pahami pasar global, ikuti analisis ekonomi, dan kembangkan strategi untuk membangun kekayaan melampaui batas negara Anda.",
      free: "Mulai gratis",
      services: "Lihat layanan",
    },
    intro: {
      eyebrow: "Apa itu",
      title: "Apa itu Varejo Investidor",
      manifesto:
        "Varejo Investidor adalah struktur finansial global untuk orang yang ingin keluar dari dasar, memahami pasar internasional, dan membangun kehidupan finansial secara bertahap.",
      text: [
        "Sejak 2018, kami telah mengirim lebih dari 4.200 sinyal live sambil mengikuti Forex, emas, minyak, kripto, indeks, dan mata uang global.",
        "Perjalanan ini dibagi menjadi level: Semut, Serigala, dan Elang Harpy.",
        "Level Semut membangun fondasi. Level Serigala mengembangkan strategi dan pembacaan pasar. Level Elang Harpy memperluas visi menuju kekayaan, perlindungan, dan struktur global.",
      ],
      stats: ["Sejak 2018", "sinyal live", "Semut / Serigala / Elang Harpy"],
    },
    cards: [
      { code: "SEMUT", title: "Fondasi finansial", text: "Edukasi bertahap untuk membangun dasar, mengatur risiko, dan menciptakan pilar pertama.", href: "/nivel-formiga" },
      { code: "SERIGALA", title: "Strategi dan ekspansi", text: "Sinyal live, pembacaan pasar, dan keputusan terstruktur untuk eksekusi yang disiplin.", href: "/nivel-lobo" },
      { code: "ELANG HARPY", title: "Kekayaan global", text: "Konsultasi strategis untuk perlindungan, posisi, kekayaan, dan visi internasional.", href: "/nivel-harpia" },
    ],
    cardCta: "Pelajari",
    final: {
      title: "Mulai gratis dan pilih level berikutnya.",
      free: "Masuk kanal gratis",
      elite: "Lihat Kanal Elite",
    },
  },
  vi: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "M\u1ecdi th\u1ee9 b\u1ea1n c\u1ea7n \u0111\u1ec3 \u0111\u1ea7u t\u01b0 v\u00e0 x\u00e2y d\u1ef1ng t\u00e0i s\u1ea3n \u1edf quy m\u00f4 to\u00e0n c\u1ea7u.",
      text: "Hi\u1ec3u c\u00e1c th\u1ecb tr\u01b0\u1eddng to\u00e0n c\u1ea7u, theo d\u00f5i c\u00e1c ph\u00e2n t\u00edch kinh t\u1ebf v\u00e0 x\u00e2y d\u1ef1ng chi\u1ebfn l\u01b0\u1ee3c \u0111\u1ec3 ph\u00e1t tri\u1ec3n t\u00e0i s\u1ea3n v\u01b0\u1ee3t ra ngo\u00e0i bi\u00ean gi\u1edbi qu\u1ed1c gia c\u1ee7a b\u1ea1n.",
      free: "B\u1eaft \u0111\u1ea7u mi\u1ec5n ph\u00ed",
      services: "Xem d\u1ecbch v\u1ee5",
    },
    intro: {
      eyebrow: "Gi\u1edbi thi\u1ec7u",
      title: "Varejo Investidor l\u00e0 g\u00ec",
      manifesto:
        "Varejo Investidor l\u00e0 m\u1ed9t c\u1ea5u tr\u00fac t\u00e0i ch\u00ednh to\u00e0n c\u1ea7u d\u00e0nh cho ng\u01b0\u1eddi mu\u1ed1n v\u01b0\u1ee3t qua n\u1ec1n t\u1ea3ng c\u01a1 b\u1ea3n, hi\u1ec3u th\u1ecb tr\u01b0\u1eddng qu\u1ed1c t\u1ebf v\u00e0 x\u00e2y d\u1ef1ng \u0111\u1eddi s\u1ed1ng t\u00e0i ch\u00ednh theo t\u1eebng l\u1edbp.",
      text: [
        "T\u1eeb n\u0103m 2018, ch\u00fang t\u00f4i \u0111\u00e3 g\u1eedi h\u01a1n 4.200 t\u00edn hi\u1ec7u tr\u1ef1c ti\u1ebfp, theo d\u00f5i Forex, v\u00e0ng, d\u1ea7u, crypto, ch\u1ec9 s\u1ed1 v\u00e0 ti\u1ec1n t\u1ec7 to\u00e0n c\u1ea7u.",
        "H\u00e0nh tr\u00ecnh \u0111\u01b0\u1ee3c chia th\u00e0nh c\u00e1c c\u1ea5p \u0111\u1ed9: Ki\u1ebfn, S\u00f3i v\u00e0 \u0110\u1ea1i B\u00e0ng Harpy.",
        "C\u1ea5p \u0111\u1ed9 Ki\u1ebfn x\u00e2y d\u1ef1ng n\u1ec1n t\u1ea3ng. C\u1ea5p \u0111\u1ed9 S\u00f3i ph\u00e1t tri\u1ec3n chi\u1ebfn l\u01b0\u1ee3c v\u00e0 kh\u1ea3 n\u0103ng \u0111\u1ecdc th\u1ecb tr\u01b0\u1eddng. C\u1ea5p \u0111\u1ed9 \u0110\u1ea1i B\u00e0ng Harpy m\u1edf r\u1ed9ng t\u1ea7m nh\u00ecn v\u1ec1 t\u00e0i s\u1ea3n, b\u1ea3o v\u1ec7 v\u1ed1n v\u00e0 c\u1ea5u tr\u00fac to\u00e0n c\u1ea7u.",
      ],
      stats: ["T\u1eeb n\u0103m 2018", "t\u00edn hi\u1ec7u tr\u1ef1c ti\u1ebfp", "Ki\u1ebfn / S\u00f3i / \u0110\u1ea1i B\u00e0ng Harpy"],
    },
    cards: [
      { code: "KI\u1ebeN", title: "N\u1ec1n t\u1ea3ng t\u00e0i ch\u00ednh", text: "Gi\u00e1o d\u1ee5c theo c\u1ea5p \u0111\u1ed9 \u0111\u1ec3 x\u00e2y n\u1ec1n m\u00f3ng, t\u1ed5 ch\u1ee9c r\u1ee7i ro v\u00e0 t\u1ea1o c\u00e1c tr\u1ee5 c\u1ed9t \u0111\u1ea7u ti\u00ean.", href: "/nivel-formiga" },
      { code: "S\u00d3I", title: "Chi\u1ebfn l\u01b0\u1ee3c v\u00e0 m\u1edf r\u1ed9ng", text: "T\u00edn hi\u1ec7u tr\u1ef1c ti\u1ebfp, \u0111\u1ecdc th\u1ecb tr\u01b0\u1eddng v\u00e0 quy\u1ebft \u0111\u1ecbnh c\u00f3 c\u1ea5u tr\u00fac \u0111\u1ec3 v\u1eadn h\u00e0nh k\u1ef7 lu\u1eadt.", href: "/nivel-lobo" },
      { code: "\u0110\u1ea0I B\u00c0NG HARPY", title: "T\u00e0i s\u1ea3n to\u00e0n c\u1ea7u", text: "T\u01b0 v\u1ea5n chi\u1ebfn l\u01b0\u1ee3c v\u1ec1 b\u1ea3o v\u1ec7, \u0111\u1ecbnh v\u1ecb, t\u00e0i s\u1ea3n v\u00e0 t\u1ea7m nh\u00ecn qu\u1ed1c t\u1ebf.", href: "/nivel-harpia" },
    ],
    cardCta: "T\u00ecm hi\u1ec3u th\u00eam",
    final: {
      title: "B\u1eaft \u0111\u1ea7u mi\u1ec5n ph\u00ed v\u00e0 ch\u1ecdn c\u1ea5p \u0111\u1ed9 ti\u1ebfp theo.",
      free: "V\u00e0o k\u00eanh mi\u1ec5n ph\u00ed",
      elite: "T\u00ecm hi\u1ec3u K\u00eanh Elite",
    },
  },
  th: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "\u0e17\u0e38\u0e01\u0e2a\u0e34\u0e48\u0e07\u0e17\u0e35\u0e48\u0e04\u0e38\u0e13\u0e15\u0e49\u0e2d\u0e07\u0e43\u0e0a\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e25\u0e07\u0e17\u0e38\u0e19\u0e41\u0e25\u0e30\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e04\u0e27\u0e32\u0e21\u0e21\u0e31\u0e48\u0e07\u0e04\u0e31\u0e48\u0e07\u0e43\u0e19\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e42\u0e25\u0e01",
      text: "\u0e40\u0e02\u0e49\u0e32\u0e43\u0e08\u0e15\u0e25\u0e32\u0e14\u0e42\u0e25\u0e01 \u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e1a\u0e17\u0e27\u0e34\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c\u0e40\u0e28\u0e23\u0e29\u0e10\u0e01\u0e34\u0e08 \u0e41\u0e25\u0e30\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e01\u0e25\u0e22\u0e38\u0e17\u0e18\u0e4c\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e04\u0e27\u0e32\u0e21\u0e21\u0e31\u0e48\u0e07\u0e04\u0e31\u0e48\u0e07\u0e19\u0e2d\u0e01\u0e1e\u0e23\u0e21\u0e41\u0e14\u0e19\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13",
      free: "\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e0a\u0e48\u0e2d\u0e07 Formiga",
      services: "\u0e14\u0e39\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23\u0e02\u0e2d\u0e07\u0e40\u0e23\u0e32",
    },
    intro: {
      eyebrow: "\u0e04\u0e37\u0e2d\u0e2d\u0e30\u0e44\u0e23",
      title: "Varejo Investidor \u0e04\u0e37\u0e2d\u0e2d\u0e30\u0e44\u0e23",
      manifesto:
        "Varejo Investidor \u0e04\u0e37\u0e2d\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e01\u0e32\u0e23\u0e40\u0e07\u0e34\u0e19\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e42\u0e25\u0e01\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e17\u0e35\u0e48\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e2d\u0e2d\u0e01\u0e08\u0e32\u0e01\u0e1e\u0e37\u0e49\u0e19\u0e10\u0e32\u0e19 \u0e40\u0e02\u0e49\u0e32\u0e43\u0e08\u0e15\u0e25\u0e32\u0e14\u0e15\u0e48\u0e32\u0e07\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28 \u0e41\u0e25\u0e30\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e0a\u0e35\u0e27\u0e34\u0e15\u0e01\u0e32\u0e23\u0e40\u0e07\u0e34\u0e19\u0e40\u0e1b\u0e47\u0e19\u0e02\u0e31\u0e49\u0e19\u0e40\u0e1b\u0e47\u0e19\u0e15\u0e2d\u0e19",
      text: [
        "\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48\u0e1b\u0e35 2018 \u0e40\u0e23\u0e32\u0e2a\u0e48\u0e07\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e2a\u0e14\u0e21\u0e32\u0e01\u0e01\u0e27\u0e48\u0e32 4,200 \u0e04\u0e23\u0e31\u0e49\u0e07 \u0e42\u0e14\u0e22\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21 Forex \u0e17\u0e2d\u0e07\u0e04\u0e33 \u0e19\u0e49\u0e33\u0e21\u0e31\u0e19 \u0e04\u0e23\u0e34\u0e1b\u0e42\u0e15 \u0e14\u0e31\u0e0a\u0e19\u0e35 \u0e41\u0e25\u0e30\u0e2a\u0e01\u0e38\u0e25\u0e40\u0e07\u0e34\u0e19\u0e17\u0e31\u0e48\u0e27\u0e42\u0e25\u0e01",
        "\u0e40\u0e2a\u0e49\u0e19\u0e17\u0e32\u0e07\u0e16\u0e39\u0e01\u0e41\u0e1a\u0e48\u0e07\u0e40\u0e1b\u0e47\u0e19\u0e23\u0e30\u0e14\u0e31\u0e1a: \u0e21\u0e14 \u0e2b\u0e21\u0e32\u0e1b\u0e48\u0e32 \u0e41\u0e25\u0e30\u0e2e\u0e32\u0e23\u0e4c\u0e1b\u0e35",
        "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e21\u0e14\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e1e\u0e37\u0e49\u0e19\u0e10\u0e32\u0e19 \u0e23\u0e30\u0e14\u0e31\u0e1a\u0e2b\u0e21\u0e32\u0e1b\u0e48\u0e32\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e01\u0e25\u0e22\u0e38\u0e17\u0e18\u0e4c\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e2d\u0e48\u0e32\u0e19\u0e15\u0e25\u0e32\u0e14 \u0e23\u0e30\u0e14\u0e31\u0e1a\u0e2e\u0e32\u0e23\u0e4c\u0e1b\u0e35\u0e02\u0e22\u0e32\u0e22\u0e21\u0e38\u0e21\u0e21\u0e2d\u0e07\u0e44\u0e1b\u0e2a\u0e39\u0e48\u0e04\u0e27\u0e32\u0e21\u0e21\u0e31\u0e48\u0e07\u0e04\u0e31\u0e48\u0e07 \u0e01\u0e32\u0e23\u0e1b\u0e01\u0e1b\u0e49\u0e2d\u0e07 \u0e41\u0e25\u0e30\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e42\u0e25\u0e01",
      ],
      stats: ["\u0e15\u0e31\u0e49\u0e07\u0e41\u0e15\u0e48\u0e1b\u0e35 2018", "\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e2a\u0e14", "\u0e21\u0e14 / \u0e2b\u0e21\u0e32\u0e1b\u0e48\u0e32 / \u0e2e\u0e32\u0e23\u0e4c\u0e1b\u0e35"],
    },
    cards: [
      { code: "\u0e21\u0e14", title: "\u0e1e\u0e37\u0e49\u0e19\u0e10\u0e32\u0e19\u0e01\u0e32\u0e23\u0e40\u0e07\u0e34\u0e19", text: "\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32\u0e40\u0e1b\u0e47\u0e19\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e10\u0e32\u0e19 \u0e08\u0e31\u0e14\u0e01\u0e32\u0e23\u0e04\u0e27\u0e32\u0e21\u0e40\u0e2a\u0e35\u0e48\u0e22\u0e07 \u0e41\u0e25\u0e30\u0e27\u0e32\u0e07\u0e40\u0e2a\u0e32\u0e2b\u0e25\u0e31\u0e01\u0e41\u0e23\u0e01", href: "/nivel-formiga" },
      { code: "\u0e2b\u0e21\u0e32\u0e1b\u0e48\u0e32", title: "\u0e01\u0e25\u0e22\u0e38\u0e17\u0e18\u0e4c\u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e02\u0e22\u0e32\u0e22\u0e15\u0e31\u0e27", text: "\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e2a\u0e14 \u0e01\u0e32\u0e23\u0e2d\u0e48\u0e32\u0e19\u0e15\u0e25\u0e32\u0e14 \u0e41\u0e25\u0e30\u0e01\u0e32\u0e23\u0e15\u0e31\u0e14\u0e2a\u0e34\u0e19\u0e43\u0e08\u0e2d\u0e22\u0e48\u0e32\u0e07\u0e21\u0e35\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e01\u0e32\u0e23\u0e1b\u0e0f\u0e34\u0e1a\u0e31\u0e15\u0e34\u0e17\u0e35\u0e48\u0e21\u0e35\u0e27\u0e34\u0e19\u0e31\u0e22", href: "/nivel-lobo" },
      { code: "\u0e2e\u0e32\u0e23\u0e4c\u0e1b\u0e35", title: "\u0e04\u0e27\u0e32\u0e21\u0e21\u0e31\u0e48\u0e07\u0e04\u0e31\u0e48\u0e07\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e42\u0e25\u0e01", text: "\u0e1a\u0e23\u0e34\u0e01\u0e32\u0e23\u0e40\u0e0a\u0e34\u0e07\u0e01\u0e25\u0e22\u0e38\u0e17\u0e18\u0e4c\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e01\u0e32\u0e23\u0e1b\u0e01\u0e1b\u0e49\u0e2d\u0e07 \u0e01\u0e32\u0e23\u0e27\u0e32\u0e07\u0e15\u0e33\u0e41\u0e2b\u0e19\u0e48\u0e07 \u0e04\u0e27\u0e32\u0e21\u0e21\u0e31\u0e48\u0e07\u0e04\u0e31\u0e48\u0e07 \u0e41\u0e25\u0e30\u0e27\u0e34\u0e2a\u0e31\u0e22\u0e17\u0e31\u0e28\u0e19\u0e4c\u0e23\u0e30\u0e2b\u0e27\u0e48\u0e32\u0e07\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28", href: "/nivel-harpia" },
    ],
    cardCta: "\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49\u0e40\u0e1e\u0e34\u0e48\u0e21\u0e40\u0e15\u0e34\u0e21",
    final: {
      title: "\u0e01\u0e32\u0e23\u0e40\u0e14\u0e34\u0e19\u0e17\u0e32\u0e07\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e40\u0e23\u0e34\u0e48\u0e21\u0e17\u0e35\u0e48\u0e23\u0e30\u0e14\u0e31\u0e1a Formiga",
      text: "\u0e40\u0e23\u0e34\u0e48\u0e21\u0e1f\u0e23\u0e35 \u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e15\u0e25\u0e32\u0e14\u0e42\u0e25\u0e01 \u0e41\u0e25\u0e30\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e01\u0e32\u0e23\u0e40\u0e07\u0e34\u0e19\u0e1c\u0e48\u0e32\u0e19\u0e23\u0e30\u0e14\u0e31\u0e1a Formiga, Lobo \u0e41\u0e25\u0e30 Harpia",
      free: "\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e0a\u0e48\u0e2d\u0e07 Formiga",
      elite: "\u0e23\u0e39\u0e49\u0e08\u0e31\u0e01 Canal Elite Harpia",
    },
  },
  ru: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Все, что нужно для инвестиций и создания капитала на глобальном уровне.",
      text: "Понимайте мировые рынки, следите за экономической аналитикой и развивайте стратегию создания капитала за пределами своей страны.",
      free: "ВОЙТИ В КАНАЛ FORMIGA",
      services: "ПОСМОТРЕТЬ УСЛУГИ",
    },
    intro: {
      eyebrow: "О проекте",
      title: "Что такое Varejo Investidor",
      manifesto: "Varejo Investidor, это глобальная финансовая структура для частных инвесторов, которые хотят выйти за рамки базового уровня, понять международные рынки и строить капитал поэтапно.",
      text: [
        "С 2018 года проект сопровождает Forex, золото, нефть, индексы, криптоактивы и мировые валюты, уже отправив более 4 200 сигналов в WhatsApp.",
        "Методология построена вокруг трех уровней развития: Formiga, Wolf и Harpy.",
        "Formiga формирует базу. Wolf развивает стратегию и чтение рынка. Harpy фокусируется на капитале, защите и глобальной структуре.",
      ],
      stats: ["С 2018 года", "4 200+ сигналов", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "Финансовая база", text: "Организация, дисциплина, первые рынки и фундамент для осознанного роста.", href: "/nivel-formiga" },
      { code: "WOLF", title: "Стратегия и расширение", text: "Чтение рынка, риск, операции и позиционирование для международного рынка.", href: "/nivel-lobo" },
      { code: "HARPY", title: "Глобальный капитал", text: "Защита, наследование, международная структура и долгосрочное сохранение капитала.", href: "/nivel-harpia" },
    ],
    cardCta: "УЗНАТЬ БОЛЬШЕ",
    final: {
      title: "Ваш путь начинается с уровня Formiga.",
      text: "Начните бесплатно, следите за мировыми рынками и развивайтесь через уровни Formiga, Wolf и Harpy.",
      free: "ВОЙТИ В КАНАЛ FORMIGA",
      elite: "УЗНАТЬ ELITE HARPY",
    },
  },
  ur: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "عالمی سطح پر سرمایہ کاری اور دولت بنانے کے لیے سب کچھ ایک جگہ۔",
      text: "عالمی منڈیوں کو سمجھیں، معاشی تجزیات پر نظر رکھیں اور اپنے ملک کی سرحدوں سے آگے دولت بنانے کی حکمت عملی تیار کریں۔",
      free: "FORMIGA چینل میں شامل ہوں",
      services: "خدمات دیکھیں",
    },
    intro: {
      eyebrow: "تعارف",
      title: "Varejo Investidor کیا ہے",
      manifesto: "Varejo Investidor عام سرمایہ کاروں کے لیے ایک عالمی مالیاتی ڈھانچہ ہے جو بین الاقوامی منڈیوں کو سمجھنا، مالی نظم بنانا اور مرحلہ وار ترقی کرنا چاہتے ہیں۔",
      text: [
        "2018 سے یہ منصوبہ Forex، سونا، تیل، انڈیکس، کرپٹو اثاثوں اور عالمی کرنسیوں کو روزانہ فالو کرتا ہے اور WhatsApp پر 4,200 سے زائد سگنلز بھیج چکا ہے۔",
        "طریقہ کار تین سطحوں پر قائم ہے: Formiga، Wolf اور Harpy۔",
        "Formiga بنیاد بناتا ہے۔ Wolf حکمت عملی اور مارکیٹ ریڈنگ کو مضبوط کرتا ہے۔ Harpy سرمایہ، تحفظ اور عالمی ساخت پر توجہ دیتا ہے۔",
      ],
      stats: ["2018 سے", "4,200+ سگنلز", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "مالی بنیاد", text: "تنظیم، نظم و ضبط، پہلی منڈیاں اور شعوری ترقی کی بنیاد۔", href: "/nivel-formiga" },
      { code: "WOLF", title: "حکمت عملی اور وسعت", text: "مارکیٹ ریڈنگ، رسک، آپریشن اور بین الاقوامی پوزیشننگ۔", href: "/nivel-lobo" },
      { code: "HARPY", title: "عالمی دولت", text: "تحفظ، وراثت، بین الاقوامی ساخت اور طویل مدتی سرمایہ۔", href: "/nivel-harpia" },
    ],
    cardCta: "مزید جانیں",
    final: {
      title: "آپ کا سفر Formiga سطح سے شروع ہوتا ہے۔",
      text: "مفت آغاز کریں، عالمی منڈیوں کو فالو کریں اور Formiga، Wolf اور Harpy سطحوں کے ذریعے اپنی مالی ترقی کو آگے بڑھائیں۔",
      free: "FORMIGA چینل میں شامل ہوں",
      elite: "ELITE HARPY جانیں",
    },
  },
  bn: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "বৈশ্বিক পর্যায়ে বিনিয়োগ ও সম্পদ গঠনের জন্য যা দরকার, সব এক জায়গায়।",
      text: "গ্লোবাল মার্কেট বুঝুন, অর্থনৈতিক বিশ্লেষণ অনুসরণ করুন এবং নিজের দেশের সীমানার বাইরে সম্পদ গড়ার কৌশল তৈরি করুন।",
      free: "FORMIGA চ্যানেলে যোগ দিন",
      services: "সেবা দেখুন",
    },
    intro: {
      eyebrow: "পরিচিতি",
      title: "Varejo Investidor কী",
      manifesto: "Varejo Investidor সাধারণ বিনিয়োগকারীদের জন্য একটি গ্লোবাল আর্থিক কাঠামো, যারা আন্তর্জাতিক বাজার বুঝতে, শৃঙ্খলা তৈরি করতে এবং ধাপে ধাপে সম্পদ গড়তে চান।",
      text: [
        "২০১৮ সাল থেকে প্রকল্পটি Forex, সোনা, তেল, সূচক, ক্রিপ্টো এবং বৈশ্বিক মুদ্রা প্রতিদিন পর্যবেক্ষণ করে এবং WhatsApp-এ ৪,২০০টির বেশি সিগন্যাল পাঠিয়েছে।",
        "পদ্ধতিটি তিনটি উন্নয়ন স্তরের ওপর দাঁড়ানো: Formiga, Wolf এবং Harpy।",
        "Formiga ভিত্তি তৈরি করে। Wolf কৌশল ও মার্কেট রিডিং বাড়ায়। Harpy সম্পদ, সুরক্ষা ও আন্তর্জাতিক কাঠামোতে ফোকাস করে।",
      ],
      stats: ["২০১৮ সাল থেকে", "৪,২০০+ সিগন্যাল", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "আর্থিক ভিত্তি", text: "সংগঠন, শৃঙ্খলা, প্রথম বাজার এবং সচেতন বৃদ্ধির ভিত্তি।", href: "/nivel-formiga" },
      { code: "WOLF", title: "কৌশল ও বিস্তার", text: "মার্কেট রিডিং, ঝুঁকি, অপারেশন এবং আন্তর্জাতিক অবস্থান তৈরি।", href: "/nivel-lobo" },
      { code: "HARPY", title: "বৈশ্বিক সম্পদ", text: "সুরক্ষা, উত্তরাধিকার, আন্তর্জাতিক কাঠামো এবং দীর্ঘমেয়াদি মূলধন।", href: "/nivel-harpia" },
    ],
    cardCta: "আরও জানুন",
    final: {
      title: "আপনার যাত্রা Formiga স্তর থেকে শুরু হয়।",
      text: "বিনামূল্যে শুরু করুন, গ্লোবাল মার্কেট অনুসরণ করুন এবং Formiga, Wolf ও Harpy স্তরের মাধ্যমে আর্থিকভাবে এগিয়ে যান।",
      free: "FORMIGA চ্যানেলে যোগ দিন",
      elite: "ELITE HARPY জানুন",
    },
  },
  ja: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "グローバルな資産形成と投資に必要なすべてを一つの場所で。",
      text: "世界の金融市場を理解し、経済分析を学び、自国の枠を超えた資産形成戦略を構築しましょう。",
      free: "アリチャンネルに参加",
      services: "サービスを見る",
    },
    intro: {
      eyebrow: "概要",
      title: "Varejo Investidorとは",
      manifesto: "Varejo Investidorは、基礎から抜け出し、国際市場を理解し、資産形成を段階的に構築したい人のためのグローバル金融構造です。",
      text: [
        "2018年から、Forex、金、原油、暗号資産、指数、世界の通貨を追跡し、4,200件以上のライブシグナルを配信してきました。",
        "旅はアリ、オオカミ、ハーピーの3つのレベルに分かれています。",
        "アリは基礎を築き、オオカミは戦略と市場読解を磨き、ハーピーは資産、保護、グローバル構造へ視野を広げます。",
      ],
      stats: ["2018年から", "ライブシグナル", "アリ / オオカミ / ハーピー"],
    },
    cards: [
      { code: "アリ", title: "金融基盤", text: "整理、規律、最初の投資、リスク意識を身につける入口。", href: "/nivel-formiga" },
      { code: "オオカミ", title: "戦略と拡大", text: "市場読解、運用、リスク、国際市場でのポジショニング。", href: "/nivel-lobo" },
      { code: "ハーピー", title: "グローバル資産", text: "資産保全、継承、強い通貨、国際的な構造。", href: "/nivel-harpia" },
    ],
    cardCta: "詳しく見る",
    final: { title: "あなたの旅はアリレベルから始まります。", text: "無料で始め、世界市場を追跡し、アリ、オオカミ、ハーピーの各レベルで金融進化を進めましょう。", free: "アリチャンネルに参加", elite: "Eliteハーピーを見る" },
  },
  ko: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "글로벌 투자와 자산 형성에 필요한 모든 것을 한 곳에서.",
      text: "글로벌 금융시장을 이해하고 경제 분석을 배우며 자국의 경계를 넘어 자산을 구축하는 전략을 개발하세요.",
      free: "개미 채널 참여",
      services: "서비스 보기",
    },
    intro: {
      eyebrow: "소개",
      title: "Varejo Investidor란 무엇인가",
      manifesto: "Varejo Investidor는 기초를 넘어 국제 시장을 이해하고 자산 형성을 단계적으로 구축하려는 사람들을 위한 글로벌 금융 구조입니다.",
      text: [
        "2018년부터 Forex, 금, 원유, 암호화폐, 지수, 글로벌 통화를 추적하며 4,200개 이상의 실시간 신호를 전달했습니다.",
        "여정은 개미, 늑대, 하피 세 단계로 나뉩니다.",
        "개미는 기반을 만들고, 늑대는 전략과 시장 읽기를 개발하며, 하피는 자산, 보호, 글로벌 구조로 시야를 확장합니다.",
      ],
      stats: ["2018년부터", "실시간 신호", "개미 / 늑대 / 하피"],
    },
    cards: [
      { code: "개미", title: "금융 기반", text: "정리, 규율, 첫 투자와 리스크 인식을 만드는 입구입니다.", href: "/nivel-formiga" },
      { code: "늑대", title: "전략과 확장", text: "시장 읽기, 운용, 리스크, 국제 시장에서의 포지셔닝입니다.", href: "/nivel-lobo" },
      { code: "하피", title: "글로벌 자산", text: "자산 보호, 승계, 강한 통화와 국제 구조를 다룹니다.", href: "/nivel-harpia" },
    ],
    cardCta: "자세히 보기",
    final: { title: "당신의 여정은 개미 레벨에서 시작됩니다.", text: "무료로 시작하고 글로벌 시장을 따라가며 개미, 늑대, 하피 레벨을 통해 금융 성장을 발전시키세요.", free: "개미 채널 참여", elite: "Elite Harpia 보기" },
  },
  it: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Tutto ciò che serve per investire e costruire patrimonio a livello globale.",
      text: homeHeroSubtext.it,
      free: "ENTRA NEL CANALE FORMIGA",
      services: "SCOPRI LA FORMAZIONE",
    },
    intro: {
      eyebrow: "La nostra offerta",
      title: "Cos'è Varejo Investidor",
      manifesto:
        "Varejo Investidor è una struttura finanziaria globale per chi vuole andare oltre le basi, comprendere i mercati internazionali e costruire il proprio percorso patrimoniale per fasi.",
      text: [
        "Dal 2018 accompagniamo Forex, oro, petrolio, crypto, indici e valute globali con analisi, segnali e formazione finanziaria.",
        "Il percorso si organizza in livelli: Formica, Lupo e Arpia.",
        "Formica pone le fondamenta. Lupo sviluppa strategia e lettura di mercato. Arpia amplia la visione verso patrimonio, protezione e struttura internazionale.",
      ],
      stats: ["Dal 2018", "segnali live", "Formica / Lupo / Arpia"],
    },
    cards: [
      { code: "FORMICA", title: "Educazione finanziaria", text: "Formazione per livelli per costruire la base, organizzare il rischio e porre i primi pilastri.", href: "/nivel-formiga" },
      { code: "LUPO", title: "Strategia e mercati", text: "Segnali live, lettura di mercato e decisioni strutturate per operare con disciplina.", href: "/nivel-lobo" },
      { code: "ARPIA", title: "Patrimonio globale", text: "Consulenza strategica per protezione, posizionamento patrimoniale e visione internazionale.", href: "/nivel-harpia" },
    ],
    cardCta: "Scopri di più",
    final: {
      title: "Scegli il prossimo passo della tua evoluzione patrimoniale.",
      text: "Inizia dalla formazione, segui analisi e segnali, esplora Select o struttura il patrimonio globale con Private.",
      free: "CANALE FORMIGA",
      elite: "CANALE ELITE",
    },
  },
  fa: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "هر آنچه برای سرمایه‌گذاری و ساخت ثروت در سطح جهانی نیاز دارید.",
      text: homeHeroSubtext.fa,
      free: "عضویت در کانال Formiga",
      services: "آشنایی با آموزش",
    },
    intro: {
      eyebrow: "ما چه هستیم",
      title: "Varejo Investidor چیست",
      manifesto:
        "Varejo Investidor یک ساختار مالی جهانی برای سرمایه‌گذارانی است که می‌خواهند فراتر از مبانی بروند، بازارهای بین‌المللی را بفهمند و ثروت خود را مرحله‌به‌مرحله بسازند.",
      text: [
        "از سال ۲۰۱۸ در Forex، طلا، نفت، رمزارزها، شاخص‌ها و ارزهای جهانی با تحلیل، سیگنال و آموزش مالی همراهیم.",
        "مسیر به سطوح Formiga، Wolf و Harpy تقسیم می‌شود.",
        "Formiga پایه را می‌سازد. Wolf استراتژی و خوانش بازار را توسعه می‌دهد. Harpy دید را به سمت ثروت، حفاظت و ساختار بین‌المللی گسترش می‌دهد.",
      ],
      stats: ["از ۲۰۱۸", "سیگنال زنده", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "آموزش مالی", text: "آموزش مرحله‌ای برای ساخت پایه، سازماندهی ریسک و ایجاد اولین ستون‌های سرمایه.", href: "/nivel-formiga" },
      { code: "WOLF", title: "استراتژی و بازار", text: "سیگنال زنده، خوانش بازار و تصمیم‌های ساختاریافته برای اجرای منضبط.", href: "/nivel-lobo" },
      { code: "HARPY", title: "ثروت جهانی", text: "مشاوره راهبردی برای حفاظت، موقعیت‌یابی و ساختار بین‌المللی دارایی.", href: "/nivel-harpia" },
    ],
    cardCta: "بیشتر بدانید",
    final: {
      title: "گام بعدی تحول سرمایه خود را انتخاب کنید.",
      text: "با آموزش شروع کنید، تحلیل و سیگنال‌ها را دنبال کنید، Select را بشناسید یا ثروت جهانی را با Private سامان دهید.",
      free: "کانال FORMIGA",
      elite: "کانال ELITE",
    },
  },
  pl: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Wszystko, czego potrzebujesz, by inwestować i budować majątek na poziomie globalnym.",
      text: homeHeroSubtext.pl,
      free: "DOŁĄCZ DO KANAŁU FORMIGA",
      services: "POZNAJ SZKOLENIE",
    },
    intro: {
      eyebrow: "Kim jesteśmy",
      title: "Czym jest Varejo Investidor",
      manifesto:
        "Varejo Investidor to globalna struktura finansowa dla inwestorów, którzy chcą wyjść poza podstawy, zrozumieć rynki międzynarodowe i budować majątek etapami.",
      text: [
        "Od 2018 roku towarzyszymy Forexowi, złotu, ropie, krypto, indeksom i walutom globalnym poprzez analizy, sygnały i edukację finansową.",
        "Ścieżka dzieli się na poziomy: Formiga, Wolf i Harpy.",
        "Formiga buduje fundament. Wolf rozwija strategię i czytanie rynku. Harpy poszerza wizję o majątek, ochronę i strukturę międzynarodową.",
      ],
      stats: ["Od 2018", "sygnały live", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "Edukacja finansowa", text: "Szkolenie poziomowe, by zbudować bazę, uporządkować ryzyko i postawić pierwsze filary.", href: "/nivel-formiga" },
      { code: "WOLF", title: "Strategia i rynki", text: "Sygnały live, czytanie rynku i uporządkowane decyzje dla zdyscyplinowanego działania.", href: "/nivel-lobo" },
      { code: "HARPY", title: "Majątek globalny", text: "Doradztwo strategiczne w zakresie ochrony, pozycjonowania i międzynarodowej struktury majątku.", href: "/nivel-harpia" },
    ],
    cardCta: "Dowiedz się więcej",
    final: {
      title: "Wybierz kolejny krok w rozwoju swojego majątku.",
      text: "Zacznij od edukacji, śledź analizy i sygnały, poznaj Select lub uporządkuj globalny majątek z Private.",
      free: "KANAŁ FORMIGA",
      elite: "KANAŁ ELITE",
    },
  },
  zh: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "在全球层面投资与构建财富所需的一切。",
      text: homeHeroSubtext.zh,
      free: "加入 FORMIGA 频道",
      services: "了解培训课程",
    },
    intro: {
      eyebrow: "我们是谁",
      title: "什么是 Varejo Investidor",
      manifesto:
        "Varejo Investidor 是一个全球金融结构，帮助投资者超越基础、理解国际市场，并分阶段构建财富路径。",
      text: [
        "自 2018 年以来，我们通过分析、信号与金融教育覆盖 Forex、黄金、原油、加密资产、指数与全球货币。",
        "路径分为 Formiga、Wolf 与 Harpy 三个层级。",
        "Formiga 奠定基础。Wolf 发展策略与市场解读。Harpy 将视野扩展到财富、保护与全球结构。",
      ],
      stats: ["自 2018 年", "实时信号", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "金融教育", text: "分级培训，构建基础、组织风险并建立首批资产支柱。", href: "/nivel-formiga" },
      { code: "WOLF", title: "策略与市场", text: "实时信号、市场解读与结构化决策，助力纪律化执行。", href: "/nivel-lobo" },
      { code: "HARPY", title: "全球财富", text: "战略咨询，涵盖保护、定位与国际财富结构。", href: "/nivel-harpia" },
    ],
    cardCta: "了解更多",
    final: {
      title: "选择您财富演进的下一步。",
      text: "从教育开始，关注分析与信号，了解 Select，或通过 Private 组织全球财富。",
      free: "FORMIGA 频道",
      elite: "ELITE 频道",
    },
  },
  tl: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Lahat ng kailangan mo para mag-invest at magbuo ng kayamanan sa global na antas.",
      text: homeHeroSubtext.tl,
      free: "SUMALI SA FORMIGA CHANNEL",
      services: "ALAMIN ANG FORMASYON",
    },
    intro: {
      eyebrow: "Ano kami",
      title: "Ano ang Varejo Investidor",
      manifesto:
        "Ang Varejo Investidor ay isang global financial structure para sa mga gustong lumampas sa basics, maintindihan ang international markets, at bumuo ng kanilang wealth journey nang paunti-unti.",
      text: [
        "Mula 2018, sinusundan namin ang Forex, gold, oil, crypto, indices, at global currencies sa pamamagitan ng analysis, signals, at financial education.",
        "Ang journey ay nahahati sa mga level: Formiga, Wolf, at Harpy.",
        "Ang Formiga ay nagtatayo ng pundasyon. Ang Wolf ay nagde-develop ng strategy at market reading. Ang Harpy ay nagpapalawak ng pananaw patungo sa wealth, protection, at global structure.",
      ],
      stats: ["Mula 2018", "live signals", "Formiga / Wolf / Harpy"],
    },
    cards: [
      { code: "FORMIGA", title: "Financial education", text: "Level-based training para makabuo ng base, ayusin ang risk, at lumikha ng unang pillars.", href: "/nivel-formiga" },
      { code: "WOLF", title: "Strategy at markets", text: "Live signals, market reading, at structured decisions para sa disiplinadong execution.", href: "/nivel-lobo" },
      { code: "HARPY", title: "Global wealth", text: "Strategic consulting para sa protection, positioning, at international wealth structure.", href: "/nivel-harpia" },
    ],
    cardCta: "Alamin pa",
    final: {
      title: "Piliin ang susunod na hakbang sa pag-unlad ng iyong kayamanan.",
      text: "Magsimula sa edukasyon, sundan ang analysis at signals, tuklasin ang Select, o ayusin ang global wealth sa pamamagitan ng Private.",
      free: "FORMIGA CHANNEL",
      elite: "ELITE CHANNEL",
    },
  },
} satisfies Record<Locale, HomeLiteLocaleCopy>;

type HomeEliteCopy = {
  title: string;
  subtitle: string;
  text: string;
  cards: string[];
  cta: string;
};

const homeEliteCopy: Record<string, HomeEliteCopy> = {
  pt: {
    title: "Canal Elite",
    subtitle: "Receba análises e sinais enviados diretamente para o WhatsApp.",
    text: "O Canal Elite foi desenvolvido para investidores que desejam acompanhar os mercados globais através de sinais estruturados, análises e leitura de mercado.",
    cards: ["Sinais ao Vivo", "Recebimento no WhatsApp", "Entrada, Alvo e Stop", "Análises de Mercado", "Educação por Níveis", "Leitura Global"],
    cta: "Conhecer Canal Elite",
  },
  en: {
    title: "Elite Channel",
    subtitle: "Receive analysis and signals directly on WhatsApp.",
    text: "The Elite Channel was designed for investors who want to follow global markets through structured signals, analysis, and market reading. Since 2018, more than 4,200 live signals have been sent across Forex, gold, oil, indices, crypto, and global currencies.",
    cards: ["Live Signals", "WhatsApp Delivery", "Entry, Target and Stop", "Market Analysis", "Level-Based Education", "Global Reading"],
    cta: "Explore Elite Channel",
  },
  es: {
    title: "Canal Elite",
    subtitle: "Recibe análisis y señales directamente en WhatsApp.",
    text: "El Canal Elite fue creado para inversores que desean seguir los mercados globales mediante señales estructuradas, análisis y lectura de mercado. Desde 2018, se han enviado más de 4.200 señales en vivo sobre Forex, oro, petróleo, índices, criptoactivos y monedas globales.",
    cards: ["Señales en vivo", "Recepción por WhatsApp", "Entrada, objetivo y stop", "Análisis de mercado", "Educación por niveles", "Lectura global"],
    cta: "Conocer Canal Elite",
  },
  fr: {
    title: "Canal Elite",
    subtitle: "Recevez analyses et signaux directement sur WhatsApp.",
    text: "Le Canal Elite s’adresse aux investisseurs qui souhaitent suivre les marchés mondiaux grâce à des signaux structurés, des analyses et une lecture de marché claire. Depuis 2018, plus de 4 200 signaux en direct ont été envoyés sur le Forex, l’or, le pétrole, les indices, les cryptoactifs et les devises mondiales.",
    cards: ["Signaux en direct", "Réception sur WhatsApp", "Entrée, objectif et stop", "Analyse de marché", "Éducation par niveaux", "Lecture globale"],
    cta: "Découvrir Canal Elite",
  },
  de: {
    title: "Elite-Kanal",
    subtitle: "Erhalten Sie Analysen und Signale direkt über WhatsApp.",
    text: "Der Elite-Kanal wurde für Anleger entwickelt, die globale Märkte über strukturierte Signale, Analysen und Markteinordnung begleiten möchten. Seit 2018 wurden mehr als 4.200 Live-Signale zu Forex, Gold, Öl, Indizes, Kryptowährungen und globalen Währungen versendet.",
    cards: ["Live-Signale", "Versand per WhatsApp", "Einstieg, Ziel und Stop", "Marktanalyse", "Ausbildung nach Stufen", "Globale Marktsicht"],
    cta: "Elite-Kanal ansehen",
  },
  it: {
    title: "Canale Elite",
    subtitle: "Ricevi analisi e segnali direttamente su WhatsApp.",
    text: "Il Canale Elite è stato creato per investitori che vogliono seguire i mercati globali tramite segnali strutturati, analisi e lettura del mercato. Dal 2018 sono stati inviati oltre 4.200 segnali live su Forex, oro, petrolio, indici, crypto e valute globali.",
    cards: ["Segnali live", "Invio su WhatsApp", "Entrata, target e stop", "Analisi di mercato", "Educazione per livelli", "Lettura globale"],
    cta: "Scopri il Canale Elite",
  },
  tr: {
    title: "Elite Kanalı",
    subtitle: "Analizleri ve sinyalleri doğrudan WhatsApp üzerinden alın.",
    text: "Elite Kanalı, küresel piyasaları yapılandırılmış sinyaller, analizler ve piyasa okuması ile takip etmek isteyen yatırımcılar için geliştirildi. 2018’den bu yana Forex, altın, petrol, endeksler, kripto ve küresel para birimlerinde 4.200’den fazla canlı sinyal gönderildi.",
    cards: ["Canlı Sinyaller", "WhatsApp ile teslim", "Giriş, hedef ve stop", "Piyasa analizi", "Seviyeli eğitim", "Küresel okuma"],
    cta: "Elite Kanalını Tanı",
  },
  id: {
    title: "Kanal Elite",
    subtitle: "Terima analisis dan sinyal langsung melalui WhatsApp.",
    text: "Kanal Elite dibuat untuk investor yang ingin mengikuti pasar global melalui sinyal terstruktur, analisis, dan pembacaan pasar. Sejak 2018, lebih dari 4.200 sinyal live telah dikirim untuk Forex, emas, minyak, indeks, kripto, dan mata uang global.",
    cards: ["Sinyal live", "Dikirim via WhatsApp", "Entry, target dan stop", "Analisis pasar", "Edukasi bertingkat", "Pembacaan global"],
    cta: "Lihat Kanal Elite",
  },
  vi: {
    title: "Kênh Elite",
    subtitle: "Nhận phân tích và tín hiệu trực tiếp qua WhatsApp.",
    text: "Kênh Elite được xây dựng cho nhà đầu tư muốn theo dõi thị trường toàn cầu thông qua tín hiệu có cấu trúc, phân tích và đọc thị trường. Từ năm 2018, hơn 4.200 tín hiệu trực tiếp đã được gửi trên Forex, vàng, dầu, chỉ số, crypto và tiền tệ toàn cầu.",
    cards: ["Tín hiệu trực tiếp", "Nhận qua WhatsApp", "Điểm vào, mục tiêu và stop", "Phân tích thị trường", "Giáo dục theo cấp độ", "Đọc thị trường toàn cầu"],
    cta: "Tìm hiểu Kênh Elite",
  },
  ru: {
    title: "Канал Elite",
    subtitle: "Получайте аналитику и сигналы напрямую в WhatsApp.",
    text: "Канал Elite создан для инвесторов, которые хотят следить за глобальными рынками через структурированные сигналы, аналитику и рыночное чтение. С 2018 года отправлено более 4 200 live-сигналов по Forex, золоту, нефти, индексам, криптовалютам и мировым валютам.",
    cards: ["Live-сигналы", "Получение в WhatsApp", "Вход, цель и стоп", "Рыночная аналитика", "Обучение по уровням", "Глобальное чтение"],
    cta: "Узнать о канале Elite",
  },
  pl: {
    title: "Kanał Elite",
    subtitle: "Otrzymuj analizy i sygnały bezpośrednio na WhatsApp.",
    text: "Kanał Elite powstał dla inwestorów, którzy chcą śledzić globalne rynki przez uporządkowane sygnały, analizę i czytanie rynku. Od 2018 roku wysłano ponad 4 200 sygnałów live na Forex, złocie, ropie, indeksach, krypto i walutach globalnych.",
    cards: ["Sygnały live", "Odbiór na WhatsApp", "Wejście, cel i stop", "Analiza rynku", "Edukacja poziomami", "Globalna perspektywa"],
    cta: "Poznaj Kanał Elite",
  },
};

Object.assign(homeEliteCopy, {
  ar: {
    title: "قناة Elite",
    subtitle: "استلم التحليلات والإشارات مباشرة عبر واتساب.",
    text: "تم تطوير قناة Elite للمستثمرين الذين يرغبون في متابعة الأسواق العالمية من خلال إشارات منظمة وتحليلات وقراءة للسوق. منذ عام 2018 تم إرسال أكثر من 4,200 إشارة مباشرة على الفوركس والذهب والنفط والمؤشرات والعملات الرقمية والعملات العالمية.",
    cards: ["إشارات مباشرة", "استلام عبر واتساب", "دخول وهدف ووقف", "تحليل السوق", "تعليم حسب المستويات", "قراءة عالمية"],
    cta: "تعرف على قناة Elite",
  },
  fa: {
    title: "کانال Elite",
    subtitle: "تحلیل‌ها و سیگنال‌ها را مستقیم در واتساپ دریافت کنید.",
    text: "کانال Elite برای سرمایه‌گذارانی طراحی شده که می‌خواهند بازارهای جهانی را از طریق سیگنال‌های ساختاریافته، تحلیل و خوانش بازار دنبال کنند. از سال ۲۰۱۸ بیش از ۴٬۲۰۰ سیگنال زنده در فارکس، طلا، نفت، شاخص‌ها، رمزارزها و ارزهای جهانی ارسال شده است.",
    cards: ["سیگنال زنده", "ارسال در واتساپ", "ورود، هدف و حد ضرر", "تحلیل بازار", "آموزش مرحله‌ای", "خوانش جهانی"],
    cta: "آشنایی با کانال Elite",
  },
  hi: {
    title: "Elite चैनल",
    subtitle: "विश्लेषण और सिग्नल सीधे WhatsApp पर प्राप्त करें।",
    text: "Elite चैनल उन निवेशकों के लिए बनाया गया है जो संरचित सिग्नल, विश्लेषण और मार्केट रीडिंग के माध्यम से वैश्विक बाजारों का अनुसरण करना चाहते हैं। 2018 से Forex, सोना, तेल, इंडेक्स, क्रिप्टो और वैश्विक मुद्राओं पर 4,200 से अधिक लाइव सिग्नल भेजे जा चुके हैं।",
    cards: ["लाइव सिग्नल", "WhatsApp पर प्राप्ति", "एंट्री, लक्ष्य और स्टॉप", "मार्केट विश्लेषण", "स्तर आधारित शिक्षा", "वैश्विक रीडिंग"],
    cta: "Elite चैनल देखें",
  },
  ur: {
    title: "Elite چینل",
    subtitle: "تجزیے اور سگنلز براہ راست WhatsApp پر حاصل کریں۔",
    text: "Elite چینل ان سرمایہ کاروں کے لیے بنایا گیا ہے جو منظم سگنلز، تجزیات اور مارکیٹ ریڈنگ کے ذریعے عالمی منڈیوں کو فالو کرنا چاہتے ہیں۔ 2018 سے Forex، سونا، تیل، انڈیکس، کرپٹو اور عالمی کرنسیوں پر 4,200 سے زائد لائیو سگنلز بھیجے جا چکے ہیں۔",
    cards: ["لائیو سگنلز", "WhatsApp پر موصول", "انٹری، ہدف اور اسٹاپ", "مارکیٹ تجزیہ", "سطحی تعلیم", "عالمی ریڈنگ"],
    cta: "Elite چینل دیکھیں",
  },
  bn: {
    title: "Elite চ্যানেল",
    subtitle: "বিশ্লেষণ ও সিগন্যাল সরাসরি WhatsApp-এ পান।",
    text: "Elite চ্যানেল এমন বিনিয়োগকারীদের জন্য তৈরি, যারা কাঠামোবদ্ধ সিগন্যাল, বিশ্লেষণ ও বাজার পাঠের মাধ্যমে বৈশ্বিক বাজার অনুসরণ করতে চান। ২০১৮ সাল থেকে Forex, সোনা, তেল, সূচক, ক্রিপ্টো ও বৈশ্বিক মুদ্রায় ৪,২০০টির বেশি লাইভ সিগন্যাল পাঠানো হয়েছে।",
    cards: ["লাইভ সিগন্যাল", "WhatsApp-এ গ্রহণ", "এন্ট্রি, লক্ষ্য ও স্টপ", "বাজার বিশ্লেষণ", "স্তরভিত্তিক শিক্ষা", "গ্লোবাল রিডিং"],
    cta: "Elite চ্যানেল দেখুন",
  },
  th: {
    title: "ช่อง Elite",
    subtitle: "รับบทวิเคราะห์และสัญญาณโดยตรงผ่าน WhatsApp",
    text: "ช่อง Elite ถูกสร้างขึ้นสำหรับนักลงทุนที่ต้องการติดตามตลาดโลกผ่านสัญญาณที่มีโครงสร้าง บทวิเคราะห์ และการอ่านตลาด ตั้งแต่ปี 2018 มีการส่งสัญญาณสดมากกว่า 4,200 ครั้งใน Forex ทองคำ น้ำมัน ดัชนี คริปโต และสกุลเงินโลก",
    cards: ["สัญญาณสด", "รับผ่าน WhatsApp", "เข้า เป้าหมาย และ Stop", "วิเคราะห์ตลาด", "การศึกษาตามระดับ", "มุมมอง global"],
    cta: "ดูช่อง Elite",
  },
  tl: {
    title: "Elite Channel",
    subtitle: "Tumanggap ng analysis at signals direkta sa WhatsApp.",
    text: "Ang Elite Channel ay ginawa para sa investors na gustong sundan ang global markets gamit ang structured signals, analysis, at market reading. Mula 2018, mahigit 4,200 live signals ang naipadala sa Forex, gold, oil, indices, crypto, at global currencies.",
    cards: ["Live signals", "WhatsApp delivery", "Entry, target at stop", "Market analysis", "Level-based education", "Global reading"],
    cta: "Tingnan ang Elite Channel",
  },
  zh: {
    title: "Elite 频道",
    subtitle: "通过 WhatsApp 直接接收分析和交易信号。",
    text: "Elite 频道面向希望通过结构化信号、市场分析和全球视角跟踪市场的投资者。自 2018 年以来，已在 Forex、黄金、原油、指数、加密资产和全球货币中发送超过 4,200 条实时信号。",
    cards: ["实时信号", "WhatsApp 接收", "入场、目标和止损", "市场分析", "分级教育", "全球市场解读"],
    cta: "了解 Elite 频道",
  },
  ja: {
    title: "Elite チャンネル",
    subtitle: "分析とシグナルをWhatsAppで直接受け取れます。",
    text: "Eliteチャンネルは、構造化されたシグナル、分析、市場読解を通じて世界市場を追いたい投資家のために設計されています。2018年以降、Forex、金、原油、指数、暗号資産、世界通貨で4,200件以上のライブシグナルを配信してきました。",
    cards: ["ライブシグナル", "WhatsAppで受信", "エントリー・目標・ストップ", "市場分析", "レベル別教育", "グローバル読解"],
    cta: "Eliteチャンネルを見る",
  },
  he: {
    title: "ערוץ Elite",
    subtitle: "קבלו ניתוח וסיגנלים ישירות ב-WhatsApp.",
    text: "ערוץ Elite נבנה למשקיעים שרוצים לעקוב אחר שווקים גלובליים באמצעות סיגנלים מובנים, ניתוח וקריאת שוק. מאז 2018 נשלחו יותר מ-4,200 סיגנלים חיים ב-Forex, זהב, נפט, מדדים, קריפטו ומטבעות.",
    cards: ["סיגנלים חיים", "קבלה ב-WhatsApp", "כניסה, יעד וסטופ", "ניתוח שוק", "הכשרה לפי רמות", "קריאה גלובלית"],
    cta: "גלו את ערוץ Elite",
  },
  ko: {
    title: "Elite 채널",
    subtitle: "분석과 신호를 WhatsApp으로 직접 받아보세요.",
    text: "Elite 채널은 구조화된 신호, 분석, 시장 해석을 통해 글로벌 시장을 따라가고 싶은 투자자를 위해 설계되었습니다. 2018년부터 Forex, 금, 원유, 지수, 암호화폐, 글로벌 통화에서 4,200개 이상의 실시간 신호가 전송되었습니다.",
    cards: ["실시간 신호", "WhatsApp 수신", "진입, 목표, 손절", "시장 분석", "레벨별 교육", "글로벌 리딩"],
    cta: "Elite 채널 보기",
  },
});


const homeFxproLinks: Record<Locale, string> = {
  pt: "https://direct.fxpro.group/pt/partner/77014650?platform=web",
  en: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  es: "https://direct.fxpro.group/es/partner/77014650?platform=web",
  fr: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  de: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  hi: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  ar: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  tr: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  id: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  vi: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  ru: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  ur: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  bn: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  th: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  ja: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  ko: "https://direct.fxpro.group/en/partner/77014650?platform=web",
};

const homeFxproBanners: Record<Locale, string> = {
  pt: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-pt-fscm-1324x150.png",
  en: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  es: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-es-fscm-1324x150.png",
  fr: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  de: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  hi: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  ar: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  tr: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  id: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  vi: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  ru: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  ur: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  bn: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  th: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  ja: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
  ko: "https://fxpro-cdn.cloud/repo/marketing-portal-direct/banners/mclaren-orange-en-fscm-1324x150.png",
};

const binanceLink = "https://accounts.binance.com/register?ref=453580362";

const homeAccountCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    text: string;
    fxproLabel: string;
    fxproTitle: string;
    fxproText: string;
    fxproCta: string;
    binanceLabel: string;
    binanceTitle: string;
    binanceText: string;
    binanceCta: string;
    bannerLabel: string;
    bannerText: string;
    ecosystemLabel: string;
  }
> = {
  pt: {
    eyebrow: "CONTA GLOBAL",
    title: "Abra sua conta e acesse os mercados globais.",
    text: "Acesse Forex, ouro, petr\u00F3leo, \u00EDndices, a\u00E7\u00F5es, ETFs e criptomoedas atrav\u00E9s das principais plataformas do mercado internacional.",
    fxproLabel: "CORRETORA FOREX",
    fxproTitle: "Forex com acesso aos mercados globais",
    fxproText: "Acesse a corretora utilizada pelo Varejo Investidor para acompanhar moedas, ouro, petr\u00F3leo, \u00EDndices e mercados internacionais.",
    fxproCta: "ABRIR CONTA FXPRO",
    binanceLabel: "CORRETORA CRIPTO",
    binanceTitle: "Criptoativos com acesso internacional",
    binanceText: "Compre, venda e acompanhe criptomoedas atrav\u00E9s de uma das maiores exchanges do mundo.",
    binanceCta: "ABRIR CONTA BINANCE",
    bannerLabel: "ABRA SUA CONTA FOREX",
    bannerText: "Clique no banner para acessar a corretora no idioma correto.",
    ecosystemLabel: "Explore o ecossistema",
  },
  en: {
    eyebrow: "Global account",
    title: "Open your account and access global markets",
    text: "Forex, gold, oil, indices, stocks, ETFs, and cryptocurrencies through leading international market platforms.",
    fxproLabel: "FOREX BROKER",
    fxproTitle: "Global markets with FXPro",
    fxproText: "Access Forex, gold, oil, and indices through the broker used in the Varejo Investidor operational structure.",
    fxproCta: "Open FXPro Account",
    binanceLabel: "CRYPTO BROKER",
    binanceTitle: "Global cryptocurrency market",
    binanceText: "Buy, sell, and follow cryptocurrencies through one of the world's largest exchanges.",
    binanceCta: "Open Binance Account",
    bannerLabel: "OPEN YOUR FOREX ACCOUNT",
    bannerText: "Click the banner to access the broker in the correct language.",
    ecosystemLabel: "Explore the ecosystem",
  },
  es: {
    eyebrow: "Cuenta global",
    title: "Abre tu cuenta y accede a los mercados globales",
    text: "Forex, oro, petr\u00F3leo, \u00EDndices, acciones, ETFs y criptomonedas a trav\u00E9s de las principales plataformas del mercado internacional.",
    fxproLabel: "BROKER FOREX",
    fxproTitle: "Mercados globales con FXPro",
    fxproText: "Accede a Forex, oro, petr\u00F3leo e \u00EDndices a trav\u00E9s del broker utilizado en la estructura operativa de Varejo Investidor.",
    fxproCta: "Abrir Cuenta FXPro",
    binanceLabel: "BROKER CRIPTO",
    binanceTitle: "Mercado global de criptomonedas",
    binanceText: "Compra, vende y acompa\u00F1a criptomonedas a trav\u00E9s de una de las mayores exchanges del mundo.",
    binanceCta: "Abrir Cuenta Binance",
    bannerLabel: "ABRE TU CUENTA FOREX",
    bannerText: "Haz clic en el banner para acceder al broker en el idioma correcto.",
    ecosystemLabel: "Explora el ecosistema",
  },
  fr: {
    eyebrow: "Compte mondial",
    title: "Ouvrez votre compte et accédez aux marchés mondiaux",
    text: "Forex, or, pétrole, indices, actions, ETF et cryptoactifs via les principales plateformes du marché international.",
    fxproLabel: "COURTIER FOREX",
    fxproTitle: "Marchés mondiaux avec FXPro",
    fxproText: "Accédez au Forex, à l’or, au pétrole et aux indices via le courtier utilisé dans la structure opérationnelle de Varejo Investidor.",
    fxproCta: "Ouvrir un compte FXPro",
    binanceLabel: "COURTIER CRYPTO",
    binanceTitle: "Marché mondial des cryptoactifs",
    binanceText: "Achetez, vendez et suivez les cryptoactifs via l’une des plus grandes plateformes d’échange au monde.",
    binanceCta: "Ouvrir un compte Binance",
    bannerLabel: "OUVREZ VOTRE COMPTE FOREX",
    bannerText: "Cliquez sur la bannière pour accéder au courtier dans la bonne langue.",
    ecosystemLabel: "Explorer l’écosystème",
  },
  de: {
    eyebrow: "Globales Konto",
    title: "Konto eröffnen und globale Märkte nutzen",
    text: "Forex, Gold, Öl, Indizes, Aktien, ETFs und Krypto über führende internationale Handelsplattformen.",
    fxproLabel: "FOREX-BROKER",
    fxproTitle: "Globale Märkte mit FXPro",
    fxproText: "Zugang zu Forex, Gold, Öl und Indizes über den Broker der operativen Struktur von Varejo Investidor.",
    fxproCta: "FXPro-Konto eröffnen",
    binanceLabel: "KRYPTO-BROKER",
    binanceTitle: "Globaler Kryptomarkt",
    binanceText: "Krypto kaufen, verkaufen und verfolgen über eine der größten Börsen weltweit.",
    binanceCta: "Binance-Konto eröffnen",
    bannerLabel: "FOREX-KONTO ERÖFFNEN",
    bannerText: "Klicken Sie auf das Banner, um den Broker in der passenden Sprache zu öffnen.",
    ecosystemLabel: "Ökosystem entdecken",
  },
  hi: {
    eyebrow: "\u0917\u094D\u0932\u094B\u092C\u0932 \u0905\u0915\u093E\u0909\u0902\u091F",
    title: "\u0905\u092A\u0928\u093E \u0905\u0915\u093E\u0909\u0902\u091F \u0916\u094B\u0932\u0947\u0902 \u0914\u0930 \u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F\u094D\u0938 \u0924\u0915 \u092A\u0939\u0941\u0901\u091A \u092C\u0928\u093E\u090F\u0901",
    text: "Forex, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932, \u0907\u0902\u0921\u093F\u0938\u0947\u0938, \u0936\u0947\u092F\u0930, ETFs \u0914\u0930 \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B\u0915\u0930\u0947\u0902\u0938\u0940 \u0915\u094B \u0905\u0902\u0924\u0930\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u092C\u093E\u091C\u093E\u0930 \u0915\u0940 \u092A\u094D\u0930\u092E\u0941\u0916 \u092A\u094D\u0932\u0947\u091F\u092B\u0949\u0930\u094D\u092E\u094D\u0938 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 \u090F\u0915\u094D\u0938\u0947\u0938 \u0915\u0930\u0947\u0902\u0964",
    fxproLabel: "FOREX BROKER",
    fxproTitle: "FXPro \u0915\u0947 \u0938\u093E\u0925 \u0917\u094D\u0932\u094B\u092C\u0932 \u092E\u093E\u0930\u094D\u0915\u0947\u091F\u094D\u0938",
    fxproText: "Varejo Investidor \u0915\u0940 \u0911\u092A\u0930\u0947\u0936\u0928\u0932 \u0938\u0902\u0930\u091A\u0928\u093E \u092E\u0947\u0902 \u0909\u092A\u092F\u094B\u0917 \u0915\u093F\u090F \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u092C\u094D\u0930\u094B\u0915\u0930 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 Forex, \u0917\u094B\u0932\u094D\u0921, \u0911\u092F\u0932 \u0914\u0930 \u0907\u0902\u0921\u093F\u0938\u0947\u0938 \u0924\u0915 \u092A\u0939\u0941\u0901\u091A\u0947\u0902\u0964",
    fxproCta: "FXPro Account \u0916\u094B\u0932\u0947\u0902",
    binanceLabel: "CRYPTO BROKER",
    binanceTitle: "\u0917\u094D\u0932\u094B\u092C\u0932 \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B\u0915\u0930\u0947\u0902\u0938\u0940 \u092E\u093E\u0930\u094D\u0915\u0947\u091F",
    binanceText: "\u0926\u0941\u0928\u093F\u092F\u093E \u0915\u0940 \u0938\u092C\u0938\u0947 \u092C\u0921\u093C\u0940 exchanges \u092E\u0947\u0902 \u0938\u0947 \u090F\u0915 \u0915\u0947 \u092E\u093E\u0927\u094D\u092F\u092E \u0938\u0947 \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B\u0915\u0930\u0947\u0902\u0938\u0940 \u0916\u0930\u0940\u0926\u0947\u0902, \u092C\u0947\u091A\u0947\u0902 \u0914\u0930 \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0947\u0902\u0964",
    binanceCta: "Binance Account \u0916\u094B\u0932\u0947\u0902",
    bannerLabel: "FOREX ACCOUNT \u0916\u094B\u0932\u0947\u0902",
    bannerText: "\u0938\u0939\u0940 \u092D\u093E\u0937\u093E \u092E\u0947\u0902 broker \u0924\u0915 \u092A\u0939\u0941\u0901\u091A\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F banner \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902\u0964",
    ecosystemLabel: "\u0907\u0915\u094B\u0938\u093F\u0938\u094D\u091F\u092E \u0926\u0947\u0916\u0947\u0902",
  },
  ar: {
    eyebrow: "\u062D\u0633\u0627\u0628 \u0639\u0627\u0644\u0645\u064A",
    title: "\u0627\u0641\u062A\u062D \u062D\u0633\u0627\u0628\u0643 \u0648\u0627\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629",
    text: "\u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0633\u0647\u0645 \u0648\u0635\u0646\u0627\u062F\u064A\u0642 ETF \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0639\u0628\u0631 \u0623\u0647\u0645 \u0645\u0646\u0635\u0627\u062A \u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u062F\u0648\u0644\u064A.",
    fxproLabel: "\u0648\u0633\u064A\u0637 \u0641\u0648\u0631\u0643\u0633",
    fxproTitle: "\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629 \u0645\u0639 FXPro",
    fxproText: "\u0627\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0641\u0648\u0631\u0643\u0633 \u0648\u0627\u0644\u0630\u0647\u0628 \u0648\u0627\u0644\u0646\u0641\u0637 \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0639\u0628\u0631 \u0627\u0644\u0648\u0633\u064A\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A \u0644\u0640 Varejo Investidor.",
    fxproCta: "\u0641\u062A\u062D \u062D\u0633\u0627\u0628 FXPro",
    binanceLabel: "\u0648\u0633\u064A\u0637 \u0643\u0631\u064A\u0628\u062A\u0648",
    binanceTitle: "\u0633\u0648\u0642 \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064A",
    binanceText: "\u0627\u0634\u062A\u0631\u0650 \u0648\u0628\u0650\u0639 \u0648\u062A\u0627\u0628\u0639 \u0627\u0644\u0639\u0645\u0644\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0639\u0628\u0631 \u0648\u0627\u062D\u062F\u0629 \u0645\u0646 \u0623\u0643\u0628\u0631 \u0627\u0644\u0645\u0646\u0635\u0627\u062A \u0641\u064A \u0627\u0644\u0639\u0627\u0644\u0645.",
    binanceCta: "\u0641\u062A\u062D \u062D\u0633\u0627\u0628 Binance",
    bannerLabel: "\u0627\u0641\u062A\u062D \u062D\u0633\u0627\u0628 \u0641\u0648\u0631\u0643\u0633",
    bannerText: "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0646\u0631 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0648\u0633\u064A\u0637 \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629.",
    ecosystemLabel: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",
  },
  tr: {
    eyebrow: "Global hesap",
    title: "Hesab\u0131n\u0131z\u0131 a\u00E7\u0131n ve k\u00FCresel piyasalara eri\u015Fin",
    text: "Forex, alt\u0131n, petrol, endeksler, hisseler, ETF'ler ve kripto paralar; uluslararas\u0131 piyasan\u0131n \u00F6nde gelen platformlar\u0131 \u00FCzerinden.",
    fxproLabel: "FOREX ARACI KURUMU",
    fxproTitle: "FXPro ile k\u00FCresel piyasalar",
    fxproText: "Varejo Investidor operasyonel yap\u0131s\u0131nda kullan\u0131lan broker arac\u0131l\u0131\u011F\u0131yla Forex, alt\u0131n, petrol ve endekslere eri\u015Fin.",
    fxproCta: "FXPro Hesab\u0131 A\u00E7",
    binanceLabel: "KR\u0130PTO ARACI KURUMU",
    binanceTitle: "K\u00FCresel kripto para piyasas\u0131",
    binanceText: "D\u00FCnyan\u0131n en b\u00FCy\u00FCk borsalar\u0131ndan biri \u00FCzerinden kripto para al\u0131n, sat\u0131n ve takip edin.",
    binanceCta: "Binance Hesab\u0131 A\u00E7",
    bannerLabel: "FOREX HESABINIZI A\u00C7IN",
    bannerText: "Do\u011Fru dilde araci kuruma eri\u015Fmek i\u00E7in bannera t\u0131klay\u0131n.",
    ecosystemLabel: "Ekosistemi ke\u015Ffet",
  },
  id: {
    eyebrow: "Akun global",
    title: "Buka akun Anda dan akses pasar global",
    text: "Forex, emas, minyak, indeks, saham, ETF, dan kripto melalui platform utama pasar internasional.",
    fxproLabel: "BROKER FOREX",
    fxproTitle: "Pasar global bersama FXPro",
    fxproText: "Akses Forex, emas, minyak, dan indeks melalui broker yang digunakan dalam struktur operasional Varejo Investidor.",
    fxproCta: "Buka Akun FXPro",
    binanceLabel: "BROKER KRIPTO",
    binanceTitle: "Pasar kripto global",
    binanceText: "Beli, jual, dan pantau kripto melalui salah satu exchange terbesar di dunia.",
    binanceCta: "Buka Akun Binance",
    bannerLabel: "BUKA AKUN FOREX",
    bannerText: "Klik banner untuk mengakses broker dalam bahasa yang tepat.",
    ecosystemLabel: "Jelajahi ekosistem",
  },
  vi: {
    eyebrow: "T\u00E0i kho\u1EA3n to\u00E0n c\u1EA7u",
    title: "M\u1EDF t\u00E0i kho\u1EA3n v\u00E0 ti\u1EBFp c\u1EADn c\u00E1c th\u1ECB tr\u01B0\u1EDDng to\u00E0n c\u1EA7u",
    text: "Forex, v\u00E0ng, d\u1EA7u, ch\u1EC9 s\u1ED1, c\u1ED5 phi\u1EBFu, ETF v\u00E0 ti\u1EC1n \u0111i\u1EC7n t\u1EED th\u00F4ng qua c\u00E1c n\u1EC1n t\u1EA3ng h\u00E0ng \u0111\u1EA7u c\u1EE7a th\u1ECB tr\u01B0\u1EDDng qu\u1ED1c t\u1EBF.",
    fxproLabel: "NH\u00C0 M\u00D4I GI\u1EDAI FOREX",
    fxproTitle: "Th\u1ECB tr\u01B0\u1EDDng to\u00E0n c\u1EA7u c\u00F9ng FXPro",
    fxproText: "Ti\u1EBFp c\u1EADn Forex, v\u00E0ng, d\u1EA7u v\u00E0 ch\u1EC9 s\u1ED1 th\u00F4ng qua broker \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng trong c\u1EA5u tr\u00FAc v\u1EADn h\u00E0nh c\u1EE7a Varejo Investidor.",
    fxproCta: "M\u1EDF T\u00E0i Kho\u1EA3n FXPro",
    binanceLabel: "NH\u00C0 M\u00D4I GI\u1EDAI CRYPTO",
    binanceTitle: "Th\u1ECB tr\u01B0\u1EDDng ti\u1EC1n \u0111i\u1EC7n t\u1EED to\u00E0n c\u1EA7u",
    binanceText: "Mua, b\u00E1n v\u00E0 theo d\u00F5i ti\u1EC1n \u0111i\u1EC7n t\u1EED th\u00F4ng qua m\u1ED9t trong nh\u1EEFng s\u00E0n giao d\u1ECBch l\u1EDBn nh\u1EA5t th\u1EBF gi\u1EDBi.",
    binanceCta: "M\u1EDF T\u00E0i Kho\u1EA3n Binance",
    bannerLabel: "M\u1EDE T\u00C0I KHO\u1EA2N FOREX",
    bannerText: "Nh\u1EA5p v\u00E0o banner \u0111\u1EC3 truy c\u1EADp broker \u0111\u00FAng ng\u00F4n ng\u1EEF.",
    ecosystemLabel: "Kh\u00E1m ph\u00E1 h\u1EC7 sinh th\u00E1i",
  },
  th: {
    eyebrow: "\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e42\u0e25\u0e01",
    title: "\u0e40\u0e1b\u0e34\u0e14\u0e1a\u0e31\u0e0d\u0e0a\u0e35\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13\u0e41\u0e25\u0e30\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07\u0e15\u0e25\u0e32\u0e14\u0e42\u0e25\u0e01",
    text: "Forex \u0e17\u0e2d\u0e07\u0e04\u0e33 \u0e19\u0e49\u0e33\u0e21\u0e31\u0e19 \u0e14\u0e31\u0e0a\u0e19\u0e35 \u0e2b\u0e38\u0e49\u0e19 ETF \u0e41\u0e25\u0e30\u0e04\u0e23\u0e34\u0e1b\u0e42\u0e15 \u0e1c\u0e48\u0e32\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e0a\u0e31\u0e49\u0e19\u0e19\u0e33\u0e02\u0e2d\u0e07\u0e15\u0e25\u0e32\u0e14\u0e15\u0e48\u0e32\u0e07\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28",
    fxproLabel: "\u0e42\u0e1a\u0e23\u0e01\u0e40\u0e01\u0e2d\u0e23\u0e4c FOREX",
    fxproTitle: "\u0e15\u0e25\u0e32\u0e14\u0e42\u0e25\u0e01\u0e01\u0e31\u0e1a FXPro",
    fxproText: "\u0e40\u0e02\u0e49\u0e32\u0e16\u0e36\u0e07 Forex \u0e17\u0e2d\u0e07\u0e04\u0e33 \u0e19\u0e49\u0e33\u0e21\u0e31\u0e19 \u0e41\u0e25\u0e30\u0e14\u0e31\u0e0a\u0e19\u0e35\u0e1c\u0e48\u0e32\u0e19\u0e42\u0e1a\u0e23\u0e01\u0e40\u0e01\u0e2d\u0e23\u0e4c\u0e17\u0e35\u0e48\u0e43\u0e0a\u0e49\u0e43\u0e19\u0e42\u0e04\u0e23\u0e07\u0e2a\u0e23\u0e49\u0e32\u0e07\u0e01\u0e32\u0e23\u0e14\u0e33\u0e40\u0e19\u0e34\u0e19\u0e07\u0e32\u0e19\u0e02\u0e2d\u0e07 Varejo Investidor",
    fxproCta: "\u0e40\u0e1b\u0e34\u0e14\u0e1a\u0e31\u0e0d\u0e0a\u0e35 FXPro",
    binanceLabel: "\u0e42\u0e1a\u0e23\u0e01\u0e40\u0e01\u0e2d\u0e23\u0e4c\u0e04\u0e23\u0e34\u0e1b\u0e42\u0e15",
    binanceTitle: "\u0e15\u0e25\u0e32\u0e14\u0e04\u0e23\u0e34\u0e1b\u0e42\u0e15\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e42\u0e25\u0e01",
    binanceText: "\u0e0b\u0e37\u0e49\u0e2d \u0e02\u0e32\u0e22 \u0e41\u0e25\u0e30\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21\u0e04\u0e23\u0e34\u0e1b\u0e42\u0e15\u0e1c\u0e48\u0e32\u0e19\u0e2b\u0e19\u0e36\u0e48\u0e07\u0e43\u0e19\u0e41\u0e1e\u0e25\u0e15\u0e1f\u0e2d\u0e23\u0e4c\u0e21\u0e41\u0e25\u0e01\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e17\u0e35\u0e48\u0e43\u0e2b\u0e0d\u0e48\u0e17\u0e35\u0e48\u0e2a\u0e38\u0e14\u0e43\u0e19\u0e42\u0e25\u0e01",
    binanceCta: "\u0e40\u0e1b\u0e34\u0e14\u0e1a\u0e31\u0e0d\u0e0a\u0e35 Binance",
    bannerLabel: "\u0e40\u0e1b\u0e34\u0e14\u0e1a\u0e31\u0e0d\u0e0a\u0e35 FOREX",
    bannerText: "\u0e04\u0e25\u0e34\u0e01\u0e41\u0e1a\u0e19\u0e40\u0e19\u0e2d\u0e23\u0e4c\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e40\u0e02\u0e49\u0e32\u0e2a\u0e39\u0e48\u0e42\u0e1a\u0e23\u0e01\u0e40\u0e01\u0e2d\u0e23\u0e4c\u0e43\u0e19\u0e20\u0e32\u0e29\u0e32\u0e17\u0e35\u0e48\u0e16\u0e39\u0e01\u0e15\u0e49\u0e2d\u0e07",
    ecosystemLabel: "\u0e2a\u0e33\u0e23\u0e27\u0e08\u0e23\u0e30\u0e1a\u0e1a\u0e19\u0e34\u0e40\u0e27\u0e28",
  },
  ja: {
    eyebrow: "グローバル口座",
    title: "口座を開設して世界市場にアクセス",
    text: "Forex、金、原油、指数、株式、ETF、暗号資産を国際市場の主要プラットフォームを通じて利用できます。",
    fxproLabel: "FOREXブローカー",
    fxproTitle: "世界市場にアクセスできるForex",
    fxproText: "通貨、金、原油、指数、国際市場を追跡するためにVarejo Investidorが利用するブローカーへアクセスします。",
    fxproCta: "FXPRO口座を開設",
    binanceLabel: "暗号資産取引所",
    binanceTitle: "国際アクセスを備えた暗号資産",
    binanceText: "世界最大級の取引所を通じて暗号資産を購入、売却、追跡できます。",
    binanceCta: "BINANCE口座を開設",
    bannerLabel: "FOREX口座を開設",
    bannerText: "正しい言語でブローカーへアクセスするにはバナーをクリックしてください。",
    ecosystemLabel: "エコシステムを見る",
  },
  ko: {
    eyebrow: "글로벌 계좌",
    title: "계좌를 개설하고 글로벌 시장에 접근하세요",
    text: "Forex, 금, 원유, 지수, 주식, ETF, 암호화폐를 국제 시장의 주요 플랫폼을 통해 이용하세요.",
    fxproLabel: "FOREX 브로커",
    fxproTitle: "글로벌 시장 접근이 가능한 Forex",
    fxproText: "통화, 금, 원유, 지수 및 국제 시장을 확인하기 위해 Varejo Investidor가 사용하는 브로커에 접근하세요.",
    fxproCta: "FXPRO 계좌 개설",
    binanceLabel: "암호화폐 거래소",
    binanceTitle: "국제 접근이 가능한 암호화폐",
    binanceText: "세계 최대 거래소 중 하나를 통해 암호화폐를 사고팔고 추적하세요.",
    binanceCta: "BINANCE 계좌 개설",
    bannerLabel: "FOREX 계좌 개설",
    bannerText: "올바른 언어로 브로커에 접근하려면 배너를 클릭하세요.",
    ecosystemLabel: "생태계 보기",
  },
};

const homeSeoLabels: Record<Locale, Record<"forex" | "stocks" | "crypto" | "etfs" | "formiga" | "lobo" | "harpia" | "articles", string>> = {
  pt: { forex: "Forex", stocks: "A\u00E7\u00F5es", crypto: "Criptomoedas", etfs: "ETFs", formiga: "N\u00EDvel Formiga", lobo: "N\u00EDvel Lobo", harpia: "N\u00EDvel Harpia", articles: "Artigos" },
  en: { forex: "Forex", stocks: "Stocks", crypto: "Crypto", etfs: "ETFs", formiga: "Ant Level", lobo: "Wolf Level", harpia: "Harpy Level", articles: "Articles" },
  es: { forex: "Forex", stocks: "Acciones", crypto: "Cripto", etfs: "ETFs", formiga: "Nivel Formiga", lobo: "Nivel Lobo", harpia: "Nivel Harpia", articles: "Art\u00EDculos" },
  fr: { forex: "Forex", stocks: "Actions", crypto: "Cryptoactifs", etfs: "ETF", formiga: "Niveau Fourmi", lobo: "Niveau Loup", harpia: "Niveau Harpie", articles: "Articles" },
  de: { forex: "Forex", stocks: "Aktien", crypto: "Krypto", etfs: "ETFs", formiga: "Formiga-Stufe", lobo: "Wolf-Stufe", harpia: "Harpy-Stufe", articles: "Artikel" },
  hi: { forex: "Forex", stocks: "\u0936\u0947\u092F\u0930", crypto: "\u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B", etfs: "ETFs", formiga: "\u091A\u0940\u0902\u091F\u0940 \u0938\u094D\u0924\u0930", lobo: "\u092D\u0947\u0921\u093C\u093F\u092F\u093E \u0938\u094D\u0924\u0930", harpia: "\u0917\u0930\u0941\u0921\u093C \u0938\u094D\u0924\u0930", articles: "\u0932\u0947\u0916" },
  ar: { forex: "\u0627\u0644\u0641\u0648\u0631\u0643\u0633", stocks: "\u0627\u0644\u0623\u0633\u0647\u0645", crypto: "\u0627\u0644\u0643\u0631\u064A\u0628\u062A\u0648", etfs: "ETFs", formiga: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0646\u0645\u0644\u0629", lobo: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0630\u0626\u0628", harpia: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0647\u0627\u0631\u0628\u064A", articles: "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A" },
  tr: { forex: "Forex", stocks: "Hisseler", crypto: "Kripto", etfs: "ETF'ler", formiga: "Kar\u0131nca Seviyesi", lobo: "Kurt Seviyesi", harpia: "Harpia Seviyesi", articles: "Makaleler" },
  id: { forex: "Forex", stocks: "Saham", crypto: "Kripto", etfs: "ETF", formiga: "Level Semut", lobo: "Level Serigala", harpia: "Level Elang Harpy", articles: "Artikel" },
  vi: { forex: "Forex", stocks: "C\u1ED5 Phi\u1EBFu", crypto: "Ti\u1EC1n \u0110i\u1EC7n T\u1EED", etfs: "ETF", formiga: "C\u1EA5p Ki\u1EBFn", lobo: "C\u1EA5p S\u00F3i", harpia: "C\u1EA5p \u0110\u1EA1i B\u00E0ng Harpy", articles: "B\u00E0i vi\u1EBFt" },
  th: { forex: "Forex", stocks: "\u0e2b\u0e38\u0e49\u0e19", crypto: "\u0e04\u0e23\u0e34\u0e1b\u0e42\u0e15", etfs: "ETF", formiga: "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e21\u0e14", lobo: "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e2b\u0e21\u0e32\u0e1b\u0e48\u0e32", harpia: "\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e2e\u0e32\u0e23\u0e4c\u0e1b\u0e35", articles: "\u0e1a\u0e17\u0e04\u0e27\u0e32\u0e21" },
  ru: { forex: "Forex", stocks: "Stocks", crypto: "Crypto", etfs: "ETFs", formiga: "Ant Level", lobo: "Wolf Level", harpia: "Harpy Level", articles: "Articles" },
  ur: { forex: "Forex", stocks: "Stocks", crypto: "Crypto", etfs: "ETFs", formiga: "Ant Level", lobo: "Wolf Level", harpia: "Harpy Level", articles: "Articles" },
  bn: { forex: "Forex", stocks: "Stocks", crypto: "Crypto", etfs: "ETFs", formiga: "Ant Level", lobo: "Wolf Level", harpia: "Harpy Level", articles: "Articles" },
  ja: { forex: "Forex", stocks: "株式", crypto: "暗号資産", etfs: "ETF", formiga: "アリレベル", lobo: "オオカミレベル", harpia: "ハーピーレベル", articles: "記事" },
  ko: { forex: "Forex", stocks: "주식", crypto: "암호화폐", etfs: "ETF", formiga: "개미 레벨", lobo: "늑대 레벨", harpia: "하피 레벨", articles: "기사" },
  he: {
    forex: "Forex",
    stocks: "מניות",
    crypto: "קריפטו",
    etfs: "ETFs",
    formiga: "רמת Formiga",
    lobo: "רמת Lobo",
    harpia: "רמת Harpia",
    articles: "מאמרים",
  },
};

type HomeMarketKey = "forex" | "stocks" | "crypto" | "etfs" | "fiis" | "platforms" | "tools" | "articles";

function localizedMarketPath(locale: Locale, market: HomeMarketKey) {
  const slugs: Partial<Record<Locale, Partial<Record<HomeMarketKey, string>>>> = {
    pt: { forex: "forex", stocks: "acoes", crypto: "cripto", etfs: "etfs" },
    en: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    es: { forex: "forex", stocks: "acciones", crypto: "cripto", etfs: "etfs" },
    fr: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    hi: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    ar: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    tr: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    id: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    vi: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    th: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    ru: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    ur: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    bn: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    ja: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
    ko: { forex: "forex", stocks: "stocks", crypto: "crypto", etfs: "etfs" },
  };

  const defaultSlugs: Record<HomeMarketKey, string> = {
    forex: "forex",
    stocks: "stocks",
    crypto: "crypto",
    etfs: "etfs",
    fiis: "fundos-imobiliarios",
    platforms: "platforms",
    tools: "tools",
    articles: "articles",
  };
  const localeSlugs = slugs[locale] ?? slugs.en ?? defaultSlugs;
  const slug = localeSlugs[market] ?? defaultSlugs[market] ?? market;
  const localeSegment = localeToUrlSegment(locale);
  return locale === "pt" ? `/${slug}` : `/${localeSegment}/${slug}`;
}

function homeSeoLinks(locale: Locale) {
  const labels = homeSeoLabels[locale] ?? homeSeoLabels.en;
  return [
    { href: localizedMarketPath(locale, "forex"), label: labels.forex },
    { href: localizedMarketPath(locale, "stocks"), label: labels.stocks },
    { href: localizedMarketPath(locale, "crypto"), label: labels.crypto },
    { href: localizedMarketPath(locale, "etfs"), label: labels.etfs },
    { href: localizedPath("/nivel-formiga", locale), label: labels.formiga },
    { href: localizedPath("/nivel-lobo", locale), label: labels.lobo },
    { href: localizedPath("/nivel-harpia", locale), label: labels.harpia },
    { href: getInsightsPath(locale), label: labels.articles },
  ];
}

const homeHeroStats: Record<string, Array<{ value: string; label: string }>> = {
  pt: [
    { value: "2018", label: "Desde" },
    { value: "Milhões", label: "de dólares movimentados" },
    { value: "22", label: "idiomas" },
    { value: "Global", label: "mercados globais" },
  ],
  en: [
    { value: "2018", label: "Since" },
    { value: "Millions", label: "of dollars moved" },
    { value: "22", label: "languages" },
    { value: "Global", label: "markets" },
  ],
  es: [
    { value: "2018", label: "Desde" },
    { value: "Millones", label: "de dólares movilizados" },
    { value: "22", label: "idiomas" },
    { value: "Global", label: "mercados globales" },
  ],
};

const homeJourneyCopy: Record<string, {
  eyebrow: string;
  title: string;
  text: string;
  cards: Array<{ title: string; wealth: string; goal: string; cta: string; href: string }>;
}> = {
  pt: {
    eyebrow: "Jornada patrimonial",
    title: "Sua evolução financeira em quatro etapas",
    text: "Da educação financeira à estrutura patrimonial internacional.",
    cards: [
      { title: "Formiga", wealth: "Início da jornada", goal: "Educação financeira, fundamentos e organização.", cta: "Começar gratuitamente", href: "formiga" },
      { title: "Elite", wealth: "Investidores em evolução", goal: "Receber sinais, análises e acompanhamento dos mercados globais.", cta: "Conhecer Elite", href: "elite" },
      { title: "Select", wealth: "US$ 50.000+", goal: "Estratégia patrimonial e exposição global sem necessidade de acompanhar o mercado diariamente.", cta: "Conhecer Select", href: "select" },
      { title: "Private", wealth: "US$ 1.000.000+", goal: "Estrutura patrimonial internacional, proteção e continuidade.", cta: "Conhecer Private", href: "private" },
    ],
  },
  en: {
    eyebrow: "Wealth journey",
    title: "Your financial evolution in four levels",
    text: "From the first educational base to a global wealth structure.",
    cards: [
      { title: "Formiga", wealth: "Starting point", goal: "Financial education, foundations, and organization.", cta: "Start free", href: "formiga" },
      { title: "Elite", wealth: "Evolving investors", goal: "Receive signals, analysis, and global market follow-up.", cta: "Explore Elite", href: "elite" },
      { title: "Select", wealth: "US$50,000+", goal: "Wealth strategy and global exposure without tracking markets every day.", cta: "Explore Select", href: "select" },
      { title: "Private", wealth: "US$1,000,000+", goal: "International wealth structure, protection, and continuity.", cta: "Explore Private", href: "private" },
    ],
  },
  es: {
    eyebrow: "Jornada patrimonial",
    title: "Tu evolución financiera en cuatro niveles",
    text: "Del aprendizaje inicial a la estructura patrimonial global.",
    cards: [
      { title: "Formiga", wealth: "Inicio de la jornada", goal: "Educación financiera, fundamentos y organización.", cta: "Empezar gratis", href: "formiga" },
      { title: "Elite", wealth: "Inversores en evolución", goal: "Recibir señales, análisis y seguimiento de mercados globales.", cta: "Conocer Elite", href: "elite" },
      { title: "Select", wealth: "US$ 50.000+", goal: "Estrategia patrimonial y exposición global sin acompañar el mercado diariamente.", cta: "Conocer Select", href: "select" },
      { title: "Private", wealth: "US$ 1.000.000+", goal: "Estructura patrimonial internacional, protección y continuidad.", cta: "Conocer Private", href: "private" },
    ],
  },
};

const homeAuthorityCopy: Record<string, {
  eyebrow: string;
  title: string;
  text: string;
  cards: Array<{ title: string; text: string }>;
}> = {
  pt: {
    eyebrow: "Autoridade",
    title: "Uma estrutura construída desde 2018",
    text: "O Varejo Investidor conecta educação, sinais, mercados globais e soluções patrimoniais para diferentes fases da jornada financeira.",
    cards: [
      { title: "Milhões de dólares movimentados", text: "Experiência operacional conectada a mercados e estruturas internacionais." },
      { title: "22 idiomas ativos", text: "Estrutura internacional preparada para investidores globais." },
      { title: "Mercados globais", text: "Forex, ações, ETFs, criptoativos e commodities." },
      { title: "Educação estruturada", text: "Base educacional pela metodologia Formiga, Lobo e Harpia." },
      { title: "Atendimento patrimonial", text: "Select e Private para patrimônio internacional e gestão estratégica." },
    ],
  },
  en: {
    eyebrow: "Authority",
    title: "A structure built since 2018",
    text: "Varejo Investidor connects education, signals, global markets, and wealth solutions for different stages of the financial journey.",
    cards: [
      { title: "+4,200 signals sent", text: "Operational history followed live since 2018." },
      { title: "22 active languages", text: "International structure prepared for global investors." },
      { title: "Global markets", text: "Forex, stocks, ETFs, crypto assets, and commodities." },
      { title: "Structured education", text: "Educational foundation through the Formiga, Lobo, and Harpia methodology." },
      { title: "Wealth support", text: "Select and Private for international wealth and strategic guidance." },
    ],
  },
  es: {
    eyebrow: "Autoridad",
    title: "Una estructura construida desde 2018",
    text: "Varejo Investidor conecta educación, señales, mercados globales y soluciones patrimoniales para diferentes etapas financieras.",
    cards: [
      { title: "+4.200 señales enviadas", text: "Historial operativo acompañado en vivo desde 2018." },
      { title: "22 idiomas activos", text: "Estructura internacional preparada para inversores globales." },
      { title: "Mercados globales", text: "Forex, acciones, ETFs, criptoactivos y commodities." },
      { title: "Educación estructurada", text: "Base educativa por la metodología Formiga, Lobo y Harpia." },
      { title: "Atención patrimonial", text: "Select y Private para patrimonio internacional y estrategia." },
    ],
  },
  hi: {
    eyebrow: "विश्वसनीयता",
    title: "2018 से बनी हुई संरचना",
    text: "Varejo Investidor शिक्षा, सिग्नल, वैश्विक बाजार और संपत्ति समाधान को वित्तीय यात्रा के विभिन्न चरणों से जोड़ता है।",
    cards: [
      { title: "4,200+ सिग्नल भेजे गए", text: "2018 से लाइव परिचालन इतिहास।" },
      { title: "22 सक्रिय भाषाएँ", text: "वैश्विक निवेशकों के लिए अंतर्राष्ट्रीय संरचना।" },
      { title: "वैश्विक बाजार", text: "Forex, शेयर, ETF, क्रिप्टो और कमोडिटी।" },
      { title: "संरचित शिक्षा", text: "चींटी, भेड़िया और गरुड़ पद्धति की शैक्षिक आधार।" },
      { title: "संपत्ति सहयोग", text: "अंतर्राष्ट्रीय संपत्ति के लिए Select और Private।" },
    ],
  },
  ja: {
    eyebrow: "実績",
    title: "2018年から築いてきた構造",
    text: "Varejo Investidorは、金融の旅の各段階に合わせて教育、シグナル、世界市場、資産ソリューションをつなぎます。",
    cards: [
      { title: "4,200件超のシグナル配信", text: "2018年からライブで追跡してきた運用履歴。" },
      { title: "22言語対応", text: "世界の投資家向けの国際構造。" },
      { title: "グローバル市場", text: "Forex、株式、ETF、暗号資産、コモディティ。" },
      { title: "体系的教育", text: "アリ・オオカミ・ハーピーの方法論による教育基盤。" },
      { title: "資産サポート", text: "国際資産と戦略ガイドのためのSelect・Private。" },
    ],
  },
};

const homeEducationBaseCopy: Record<string, { eyebrow: string; title: string; text: string; cta: string }> = {
  pt: {
    eyebrow: "Base educacional",
    title: "A metodologia começa na educação.",
    text: "Formiga, Lobo e Harpia organizam a base educacional do Varejo Investidor. Essa trilha ajuda o investidor a sair do básico, entender risco, ler mercados globais e construir visão patrimonial.",
    cta: "Conhecer Formação",
  },
  en: {
    eyebrow: "Educational base",
    title: "The methodology starts with education.",
    text: "Formiga, Lobo, and Harpia organize Varejo Investidor's educational base, helping investors understand risk, read global markets, and build a wealth mindset.",
    cta: "View Formation",
  },
  es: {
    eyebrow: "Base educativa",
    title: "La metodología comienza con educación.",
    text: "Formiga, Lobo y Harpia organizan la base educativa de Varejo Investidor para ayudar al inversor a entender riesgo, mercados globales y visión patrimonial.",
    cta: "Ver Formación",
  },
  hi: {
    eyebrow: "शैक्षिक आधार",
    title: "पद्धति शिक्षा से शुरू होती है।",
    text: "चींटी, भेड़िया और गरुड़ शैक्षिक आधार व्यवस्थित करते हैं — जोखिम, वैश्विक बाजार और संपत्ति दृष्टि समझने में मदद करते हैं।",
    cta: "प्रशिक्षण कार्यक्रम देखें",
  },
  ja: {
    eyebrow: "教育の基盤",
    title: "方法論は教育から始まります。",
    text: "アリ、オオカミ、ハーピーが教育基盤を組み立て、リスク、世界市場、資産視座の理解を支えます。",
    cta: "教育プログラムを見る",
  },
};

const homeInstitutionsCopy: Record<string, { eyebrow: string; title: string; text: string; institutions: string[] }> = {
  pt: {
    eyebrow: "Instituições compatíveis",
    title: "Compatível com as maiores instituições financeiras.",
    text: "O cliente mantém o patrimônio na instituição que já utiliza.",
    institutions: ["Itaú", "BTG", "XP", "Safra", "Santander", "Morgan Stanley", "JP Morgan", "UBS", "Goldman Sachs", "Interactive Brokers", "Charles Schwab", "Nomad", "Avenue", "Binance"],
  },
  en: {
    eyebrow: "Compatible institutions",
    title: "Compatible with major financial institutions.",
    text: "The client keeps wealth in the institution they already use.",
    institutions: ["Itaú", "BTG", "XP", "Safra", "Santander", "Morgan Stanley", "JP Morgan", "UBS", "Goldman Sachs", "Interactive Brokers", "Charles Schwab", "Nomad", "Avenue", "Binance"],
  },
  es: {
    eyebrow: "Instituciones compatibles",
    title: "Compatible con grandes instituciones financieras.",
    text: "El cliente mantiene su patrimonio en la institución que ya utiliza.",
    institutions: ["Itaú", "BTG", "XP", "Safra", "Santander", "Morgan Stanley", "JP Morgan", "UBS", "Goldman Sachs", "Interactive Brokers", "Charles Schwab", "Nomad", "Avenue", "Binance"],
  },
  hi: {
    eyebrow: "संगत संस्थाएँ",
    title: "प्रमुख वित्तीय संस्थाओं के साथ संगत।",
    text: "ग्राहक अपनी मौजूदा संस्था में ही संपत्ति रख सकता है।",
    institutions: ["Itaú", "BTG", "XP", "Safra", "Santander", "Morgan Stanley", "JP Morgan", "UBS", "Goldman Sachs", "Interactive Brokers", "Charles Schwab", "Nomad", "Avenue", "Binance"],
  },
  ja: {
    eyebrow: "対応金融機関",
    title: "主要金融機関と両立します。",
    text: "お客様はこれまで利用している機関に資産を置いたままにできます。",
    institutions: ["Itaú", "BTG", "XP", "Safra", "Santander", "Morgan Stanley", "JP Morgan", "UBS", "Goldman Sachs", "Interactive Brokers", "Charles Schwab", "Nomad", "Avenue", "Binance"],
  },
};

const homeFinalCtas: Record<string, { select: string; private: string }> = {
  pt: { select: "CONHECER SELECT", private: "CONHECER PRIVATE" },
  en: { select: "EXPLORE SELECT", private: "EXPLORE PRIVATE" },
  es: { select: "CONOCER SELECT", private: "CONOCER PRIVATE" },
  fr: { select: "DÉCOUVRIR SELECT", private: "DÉCOUVRIR PRIVATE" },
  de: { select: "SELECT ENTDECKEN", private: "PRIVATE ENTDECKEN" },
  ja: { select: "SELECTを見る", private: "PRIVATEを見る" },
  hi: { select: "SELECT देखें", private: "PRIVATE देखें" },
};

Object.assign(homeLiteCopy, { he: homeLiteCopyHe });

function getHomeLiteCopy(locale: SupportedLocale): HomeLiteLocaleCopy {
  return (homeLiteCopy as Record<SupportedLocale, HomeLiteLocaleCopy>)[locale];
}

(Object.keys(homeHeroSubtext) as SupportedLocale[]).forEach((locale) => {
  const entry = homeLiteCopy[locale as keyof typeof homeLiteCopy];
  if (entry) {
    entry.hero.text = homeHeroSubtext[locale];
  }
});

homeLiteCopy.pt.final = {
  title: "Escolha o próximo passo da sua evolução patrimonial.",
  text: "Comece pela educação, acompanhe análises e sinais, avance para uma estrutura Select ou organize patrimônio global com o Private.",
  free: "CANAL FORMIGA",
  elite: "CANAL ELITE",
};
homeLiteCopy.en.final.title = "Choose the next step in your wealth evolution.";
(homeLiteCopy.en.final as { title: string; text?: string; free: string; elite: string }).text = "Start with education, follow analysis and signals, move toward Select, or organize global wealth through Private.";
homeLiteCopy.en.final.free = "FORMIGA CHANNEL";
homeLiteCopy.en.final.elite = "ELITE CHANNEL";
homeLiteCopy.es.final.title = "Elige el próximo paso de tu evolución patrimonial.";
(homeLiteCopy.es.final as { title: string; text?: string; free: string; elite: string }).text = "Empieza con educación, acompaña análisis y señales, avanza hacia Select u organiza patrimonio global con Private.";
homeLiteCopy.es.final.free = "CANAL FORMIGA";
homeLiteCopy.es.final.elite = "CANAL ELITE";
homeLiteCopy.fr.final.title = "Choisissez la prochaine étape de votre évolution patrimoniale.";
(homeLiteCopy.fr.final as { title: string; text?: string }).text =
  "Commencez par la formation, suivez analyses et signaux, explorez Select ou structurez votre patrimoine mondial avec Private.";
homeLiteCopy.fr.final.free = "CANAL FORMIGA";
homeLiteCopy.fr.final.elite = "CANAL ELITE";
homeLiteCopy.de.final.title = "Wählen Sie den nächsten Schritt Ihrer Vermögensentwicklung.";
(homeLiteCopy.de.final as { title: string; text?: string }).text =
  "Starten Sie mit Finanzbildung, folgen Sie Analysen und Signalen, entdecken Sie Select oder strukturieren Sie globales Vermögen mit Private.";
homeLiteCopy.de.final.free = "FORMIGA-KANAL";
homeLiteCopy.de.final.elite = "ELITE-KANAL";
(homeLiteCopy.hi.final as { title: string; text?: string; free: string; elite: string }).text =
  "शिक्षा से शुरू करें, विश्लेषण और सिग्नल अपनाएँ, Select की ओर बढ़ें या Private से वैश्विक संपत्ति व्यवस्थित करें।";

const homeFinalCtasItFaPlZhTl: Partial<Record<SupportedLocale, { select: string; private: string }>> = {
  it: { select: "SCOPRI SELECT", private: "SCOPRI PRIVATE" },
  fa: { select: "آشنایی با Select", private: "آشنایی با Private" },
  pl: { select: "POZNAJ SELECT", private: "POZNAJ PRIVATE" },
  zh: { select: "了解 SELECT", private: "了解 PRIVATE" },
  tl: { select: "TINGNAN ANG SELECT", private: "TINGNAN ANG PRIVATE" },
};
Object.assign(homeFinalCtas, homeFinalCtasItFaPlZhTl);

const homeFlowCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  text: string;
  button: string;
  steps: Array<{ name: string; text: string }>;
}> = {
  pt: {
    eyebrow: "Como funciona",
    title: "Como funciona o Varejo Investidor",
    text: "A jornada organiza o investidor em tres niveis claros: base, operacao e patrimonio global.",
    button: "COME\u00c7AR PELO CANAL FORMIGA",
    steps: [
      { name: "Formiga", text: "Aprende os fundamentos, entende o mercado e comeca a construir consciencia financeira." },
      { name: "Lobo", text: "Opera com metodo, gestao de risco e leitura de mercado." },
      { name: "Harpia", text: "Constroi patrimonio global, protege capital e pensa em longo prazo." },
    ],
  },
  en: {
    eyebrow: "How it works",
    title: "How Varejo Investidor works",
    text: "The journey organizes investors into three clear levels: foundation, execution, and global wealth.",
    button: "START WITH THE FORMIGA CHANNEL",
    steps: [
      { name: "Ant", text: "Learns the foundations, understands markets, and starts building financial awareness." },
      { name: "Wolf", text: "Operates with method, risk management, and market reading." },
      { name: "Harpy", text: "Builds global wealth, protects capital, and thinks long term." },
    ],
  },
  es: {
    eyebrow: "C\u00f3mo funciona",
    title: "C\u00f3mo funciona Varejo Investidor",
    text: "La jornada organiza al inversor en tres niveles claros: base, operaci\u00f3n y patrimonio global.",
    button: "EMPEZAR POR EL CANAL FORMIGA",
    steps: [
      { name: "Hormiga", text: "Aprende los fundamentos, entiende el mercado y comienza a construir conciencia financiera." },
      { name: "Lobo", text: "Opera con m\u00e9todo, gesti\u00f3n de riesgo y lectura de mercado." },
      { name: "Harp\u00eda", text: "Construye patrimonio global, protege capital y piensa a largo plazo." },
    ],
  },
  fr: {
    eyebrow: "Fonctionnement",
    title: "Comment fonctionne Varejo Investidor",
    text: "Le parcours organise l’investisseur en trois niveaux : fondations, opération et patrimoine mondial.",
    button: "COMMENCER PAR LE CANAL FORMIGA",
    steps: [
      { name: "Fourmi", text: "Acquiert les fondamentaux, comprend les marchés et construit une conscience financière." },
      { name: "Loup", text: "Opère avec méthode, gestion des risques et lecture de marché." },
      { name: "Harpie", text: "Construit un patrimoine mondial, protège le capital et raisonne à long terme." },
    ],
  },
  de: {
    eyebrow: "So funktioniert es",
    title: "So funktioniert Varejo Investidor",
    text: "Der Lernpfad ordnet Anleger in drei klare Stufen: Basis, operative Umsetzung und globales Vermögen.",
    button: "MIT FORMIGA-KANAL STARTEN",
    steps: [
      { name: "Formiga", text: "Erlangt Grundlagen, versteht Märkte und baut finanzielle Bewusstheit auf." },
      { name: "Wolf", text: "Handelt mit Methode, Risikomanagement und professioneller Markteinordnung." },
      { name: "Harpy", text: "Baut globales Vermögen auf, schützt Kapital und denkt langfristig." },
    ],
  },
  hi: {
    eyebrow: "कैसे काम करता है",
    title: "Varejo Investidor कैसे काम करता है",
    text: "यात्रा निवेशक को तीन स्तरों में व्यवस्थित करती है: आधार, संचालन और वैश्विक संपत्ति।",
    button: "मुफ्त चींटी चैनल से शुरू करें",
    steps: [
      { name: "चींटी", text: "बुनियाद सीखता है, बाजार समझता है और वित्तीय जागरूकता बनाना शुरू करता है।" },
      { name: "भेड़िया", text: "मेथड, जोखिम प्रबंधन और बाजार पढ़ने के साथ ऑपरेट करता है।" },
      { name: "गरुड़", text: "वैश्विक संपत्ति बनाता है, पूंजी की रक्षा करता है और लंबी अवधि सोचता है।" },
    ],
  },
  ar: {
    eyebrow: "كيف يعمل",
    title: "كيف يعمل Varejo Investidor",
    text: "تنظم الرحلة المستثمر في ثلاثة مستويات: الأساس، التشغيل، والثروة العالمية.",
    button: "ابدأ من قناة Formiga",
    steps: [
      { name: "النملة", text: "يتعلم الأساسيات ويفهم السوق ويبدأ في بناء الوعي المالي." },
      { name: "الذئب", text: "يعمل بمنهجية وإدارة مخاطر وقراءة للسوق." },
      { name: "الهاربي", text: "يبني ثروة عالمية ويحمي رأس المال ويفكر على المدى الطويل." },
    ],
  },
  tr: {
    eyebrow: "Nasıl çalışır",
    title: "Varejo Investidor nasıl çalışır",
    text: "Yolculuk yatırımcıyı üç seviyede düzenler: temel, operasyon ve küresel varlık.",
    button: "FORMIGA KANALIYLA BAŞLA",
    steps: [
      { name: "Karınca", text: "Temelleri öğrenir, piyasayı anlar ve finansal farkındalık inşa eder." },
      { name: "Kurt", text: "Metot, risk yönetimi ve piyasa okumasıyla işlem yapar." },
      { name: "Harpia", text: "Küresel varlık inşa eder, sermayeyi korur ve uzun vadeli düşünür." },
    ],
  },
  id: {
    eyebrow: "Cara kerja",
    title: "Cara kerja Varejo Investidor",
    text: "Perjalanan ini mengatur investor dalam tiga level: dasar, eksekusi, dan kekayaan global.",
    button: "MULAI DARI CHANNEL FORMIGA",
    steps: [
      { name: "Semut", text: "Mempelajari dasar, memahami pasar, dan mulai membangun kesadaran finansial." },
      { name: "Serigala", text: "Beroperasi dengan metode, manajemen risiko, dan pembacaan pasar." },
      { name: "Elang Harpy", text: "Membangun kekayaan global, melindungi modal, dan berpikir jangka panjang." },
    ],
  },
  vi: {
    eyebrow: "Cách hoạt động",
    title: "Varejo Investidor hoạt động như thế nào",
    text: "Hành trình sắp xếp nhà đầu tư theo ba cấp độ: nền tảng, vận hành và tài sản toàn cầu.",
    button: "BẮT ĐẦU VỚI KÊNH FORMIGA",
    steps: [
      { name: "Kiến", text: "Học nền tảng, hiểu thị trường và bắt đầu xây dựng nhận thức tài chính." },
      { name: "Sói", text: "Vận hành với phương pháp, quản trị rủi ro và đọc thị trường." },
      { name: "Đại Bàng Harpy", text: "Xây dựng tài sản toàn cầu, bảo vệ vốn và tư duy dài hạn." },
    ],
  },
  th: {
    eyebrow: "วิธีทำงาน",
    title: "Varejo Investidor ทำงานอย่างไร",
    text: "เส้นทางนี้แบ่งนักลงทุนเป็นสามระดับ: พื้นฐาน การดำเนินการ และความมั่งคั่งระดับโลก",
    button: "เริ่มจากช่อง FORMIGA",
    steps: [
      { name: "มด", text: "เรียนรู้พื้นฐาน เข้าใจตลาด และเริ่มสร้างความตระหนักทางการเงิน" },
      { name: "หมาป่า", text: "ดำเนินการด้วยวิธีการ การบริหารความเสี่ยง และการอ่านตลาด" },
      { name: "ฮาร์ปี", text: "สร้างความมั่งคั่งระดับโลก ปกป้องเงินทุน และคิดระยะยาว" },
    ],
  },
  ru: {
    eyebrow: "Как это работает",
    title: "Как работает Varejo Investidor",
    text: "Путь делит инвестора на три уровня: база, операции и глобальный капитал.",
    button: "НАЧАТЬ С КАНАЛА FORMIGA",
    steps: [
      { name: "Муравей", text: "Изучает основы, понимает рынок и формирует финансовую осознанность." },
      { name: "Волк", text: "Действует с методом, управлением риском и чтением рынка." },
      { name: "Гарпия", text: "Строит глобальный капитал, защищает средства и мыслит долгосрочно." },
    ],
  },
  ur: {
    eyebrow: "یہ کیسے کام کرتا ہے",
    title: "Varejo Investidor کیسے کام کرتا ہے",
    text: "یہ سفر سرمایہ کار کو تین سطحوں میں منظم کرتا ہے: بنیاد، عمل اور عالمی دولت۔",
    button: "FORMIGA چینل سے شروع کریں",
    steps: [
      { name: "چیونٹی", text: "بنیادیں سیکھتا ہے، مارکیٹ سمجھتا ہے اور مالی شعور بناتا ہے۔" },
      { name: "بھیڑیا", text: "طریقہ، رسک مینجمنٹ اور مارکیٹ ریڈنگ کے ساتھ کام کرتا ہے۔" },
      { name: "ہارپی", text: "عالمی دولت بناتا ہے، سرمایہ محفوظ رکھتا ہے اور طویل مدتی سوچتا ہے۔" },
    ],
  },
  bn: {
    eyebrow: "কিভাবে কাজ করে",
    title: "Varejo Investidor কিভাবে কাজ করে",
    text: "এই যাত্রা বিনিয়োগকারীকে তিন স্তরে সাজায়: ভিত্তি, অপারেশন এবং বৈশ্বিক সম্পদ।",
    button: "FORMIGA চ্যানেল দিয়ে শুরু করুন",
    steps: [
      { name: "পিঁপড়া", text: "ভিত্তি শেখে, বাজার বোঝে এবং আর্থিক সচেতনতা তৈরি শুরু করে।" },
      { name: "নেকড়ে", text: "পদ্ধতি, ঝুঁকি ব্যবস্থাপনা এবং বাজার পাঠের মাধ্যমে পরিচালনা করে।" },
      { name: "হার্পি", text: "বৈশ্বিক সম্পদ তৈরি করে, মূলধন রক্ষা করে এবং দীর্ঘমেয়াদে ভাবে।" },
    ],
  },
  ja: {
    eyebrow: "仕組み",
    title: "Varejo Investidorの仕組み",
    text: "投資家の旅を基礎、運用、グローバル資産の三段階に整理します。",
    button: "アリチャンネルから始める",
    steps: [
      { name: "アリ", text: "基礎を学び、市場を理解し、金融意識を作り始めます。" },
      { name: "オオカミ", text: "方法、リスク管理、市場分析に基づいて行動します。" },
      { name: "ハーピー", text: "グローバル資産を築き、資本を守り、長期で考えます。" },
    ],
  },
  ko: {
    eyebrow: "작동 방식",
    title: "Varejo Investidor 작동 방식",
    text: "투자 여정을 기초, 실행, 글로벌 자산의 세 단계로 정리합니다.",
    button: "FORMIGA 채널로 시작하기",
    steps: [
      { name: "개미", text: "기초를 배우고 시장을 이해하며 금융 인식을 쌓기 시작합니다." },
      { name: "늑대", text: "방법, 리스크 관리, 시장 해석을 바탕으로 실행합니다." },
      { name: "하피", text: "글로벌 자산을 구축하고 자본을 보호하며 장기적으로 생각합니다." },
    ],
  },
};

export default function Home() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = isSupportedLocale(locale) ? getHomeLiteCopy(locale) : getHomeLiteCopy("en");
  const heroStats = (homeHeroStats[locale] ?? homeHeroStats.en).map((stat, index) =>
    index === 2 ? getHomeHeroLanguageStat(locale) : stat,
  );
  const journey = homeJourneyCopy[locale] ?? homeJourneyCopy.en;
  const authorityBase = homeAuthorityCopy[locale] ?? homeAuthorityCopy.en;
  const languageAuthorityCard = getAuthorityLanguageCard(locale);
  const authority = {
    ...authorityBase,
    cards: authorityBase.cards.map((card, index) => (index === 1 ? languageAuthorityCard : card)),
  };
  const introStats = copy.intro.stats.map((stat) =>
    /^\d+\s+idiomas$/i.test(stat) || /^\d+\s+languages$/i.test(stat) ? getIntroLanguageStat(locale) : stat,
  );
  const educationBase = homeEducationBaseCopy[locale] ?? homeEducationBaseCopy.en;
  const institutions = homeInstitutionsCopy[locale] ?? homeInstitutionsCopy.en;
  const finalCtas = homeFinalCtas[locale] ?? homeFinalCtas.en;
  const account = homeAccountCopy[locale] ?? homeAccountCopy.en;
  const eliteHome = homeEliteCopy[locale] ?? homeEliteCopy.en;
  const selectHome = isSupportedLocale(locale) ? homeSelectCopyByLocale[locale] : homeSelectCopyByLocale.en;
  const privateHome = isSupportedLocale(locale) ? homePrivateCopyByLocale[locale] : homePrivateCopyByLocale.en;
  const finalText = "text" in copy.final ? copy.final.text : undefined;
  const localizedPage = (path: string) => localizedPath(path, locale);
  const educationHref = localizedPage("/educacao");
  const formigaHref = getFormigaChannelUrl(locale, t.freeChannel.link);
  const loboHref = getLoboChannelUrl(locale);
  const loboLabel = getLoboChannelButtonLabel(locale);
  const loboButtonClass =
    "premium-button-ghost border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5";

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={isRtlLocale(locale) ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section id="home" className="home-hero premium-stage relative px-5 pb-16 pt-8 md:px-8 md:pb-28 md:pt-48 lg:px-12 xl:px-16">
        <div className="cinematic-noise" />
        <div className="finance-particles" />
        <div className="absolute right-[7%] top-24 h-[34rem] w-[34rem] rounded-full bg-gold/[0.08] blur-3xl" />
        <div className="absolute left-0 top-44 h-96 w-96 rounded-full bg-rise/[0.08] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="hero-mascot-wrap order-2 mx-auto w-full max-w-[340px] sm:max-w-[520px] lg:order-2 lg:max-w-[640px] 2xl:max-w-[720px]"
          >
            <div className="hero-image-wrapper relative mx-auto flex min-h-[15rem] items-center justify-center sm:min-h-[24rem] md:min-h-[34rem] lg:min-h-[44rem] xl:min-h-[48rem]">
              <Image
                src="/characters/home-hero-official-20260527.png"
                alt="Personagens oficiais Formiga, Lobo e Harpia do Varejo Investidor"
                width={1536}
                height={1024}
                priority
                sizes="(min-width: 1536px) 720px, (min-width: 1024px) 640px, (min-width: 640px) 520px, 340px"
                className="hero-main-image hero-mascot-image relative z-10 h-auto w-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div className="order-1 lg:order-1" initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }}>
            <motion.h1 variants={fadeUp} className="hero-headline max-w-5xl text-balance font-serif text-[clamp(1.875rem,7.8vw,2.375rem)] leading-[1.05] tracking-[-0.03em] text-ink md:text-[4.55rem] md:leading-[1.04] md:tracking-[-0.045em] xl:text-[5.4rem]">
              {copy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg font-light leading-9 text-ink/[0.7] md:text-xl">
              {getHomeHeroSubtext(locale)}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={formigaHref} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("home_formiga_click", { locale })} className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink shadow-premium transition hover:-translate-y-0.5">
                {copy.hero.free}
              </a>
              {loboHref ? (
                <a
                  href={loboHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackVarejoClick("home_lobo_click", { locale })}
                  className={loboButtonClass}
                >
                  {loboLabel}
                </a>
              ) : (
                <span className={`${loboButtonClass} cursor-not-allowed opacity-55`} aria-disabled="true" title={loboLabel}>
                  {loboLabel}
                </span>
              )}
            </motion.div>
            <motion.div variants={fadeUp} className="hero-stats-grid mt-9 grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={`${stat.value}-${stat.label}`}
                  className={`hero-stat-card min-w-0 border border-gold/[0.18] bg-white/[0.04] px-3 py-3.5 shadow-fine backdrop-blur sm:px-4 sm:py-4${stat.label ? "" : " hero-stat-card--solo"}`}
                >
                  <p className="font-serif text-xl leading-none tracking-[-0.04em] text-gold sm:text-2xl md:text-3xl">{stat.value}</p>
                  {stat.label ? (
                    <p className="mt-2 text-balance text-[0.6875rem] font-bold uppercase leading-snug tracking-[0.1em] text-ink/[0.58] sm:text-[10px] sm:tracking-[0.14em]">
                      {stat.label}
                    </p>
                  ) : null}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="home-flow-section border-y border-gold/[0.12] bg-paper px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="relative mx-auto max-w-[1280px] overflow-hidden border border-gold/[0.18] bg-white/[0.025] p-6 shadow-fine md:p-9"
        >
          <div className="absolute inset-0 terminal-grid opacity-20" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.07] blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{journey.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-5xl">
                {journey.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/[0.68]">{journey.text}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {journey.cards.map((step) => {
                const href = step.href === "formiga" ? t.freeChannel.link : step.href === "elite" ? localizedPage("/sinais") : localizedPage(`/${step.href}`);
                const external = step.href === "formiga";
                return (
                <a key={step.title} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={() => trackVarejoClick(`home_journey_${step.href}_click`, { locale })} className="level-card group relative block overflow-hidden border border-gold/[0.16] bg-paper p-5 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.48] hover:shadow-premium">
                  <div className="absolute inset-0 luxury-grid opacity-25" />
                  <div className="relative">
                    <h3 className="font-serif text-3xl leading-[1.04] tracking-[-0.035em]">{step.title}</h3>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-gold">{step.wealth}</p>
                    <p className="mt-3 text-sm leading-7 text-ink/[0.64]">{step.goal}</p>
                    <span className="mt-5 inline-flex text-[11px] font-black uppercase tracking-[0.16em] text-gold transition group-hover:translate-x-1">{step.cta} &rarr;</span>
                  </div>
                </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-ink/[0.08] bg-white/90 px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.58fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">{copy.intro.eyebrow}</p>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
              {copy.intro.title}
            </h2>
            <div className="home-stats mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {introStats.map((stat) => (
                <div key={stat} className="strategic-stat border-l-2 border-gold/[0.68] bg-paper px-4 py-4 shadow-fine">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">{stat}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 text-base leading-8 text-ink/[0.7] md:text-lg md:leading-9">
            <p className="manifesto-text font-serif text-2xl leading-9 tracking-[-0.03em] text-ink md:text-4xl md:leading-[1.18]">
              {copy.intro.manifesto}
            </p>
            {copy.intro.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-b border-gold/[0.12] bg-paper px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{authority.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">{authority.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-ink/[0.68] md:text-lg">{authority.text}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {authority.cards.map((card) => (
              <article key={card.title} className="relative overflow-hidden border border-gold/[0.16] bg-white/[0.035] p-5 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.45]">
                <div className="absolute inset-0 luxury-grid opacity-20" />
                <div className="relative">
                  <h3 className="font-serif text-2xl leading-[1.08] tracking-[-0.035em] text-ink">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink/[0.62]">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="home-levels-section px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="section-team-stage relative mx-auto flex w-full max-w-[34rem] justify-center lg:max-w-none">
            <div className="section-team-depth absolute inset-0" />
            <Image src="/characters/home-structure-horizontal-cutout.png" alt="Personagens Formiga, Lobo e Harpia ao lado dos servi\u00e7os do Varejo Investidor" width={1536} height={1024} sizes="(min-width: 1024px) 46vw, 92vw" className="home-structure-image relative z-10 h-auto w-full object-contain" />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.55 }} variants={fadeUp} className="level-card system-module relative overflow-hidden p-8 shadow-fine md:p-10">
            <div className="absolute inset-0 luxury-grid opacity-25" />
            <div className="relative">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-gold">{educationBase.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">{educationBase.title}</h2>
              <p className="mt-5 text-base leading-8 text-ink/[0.66] md:text-lg">{educationBase.text}</p>
              <a href={educationHref} onClick={() => trackVarejoClick("home_education_base_click", { locale })} className="premium-button-gold mt-8 inline-flex border border-gold bg-gold px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                {educationBase.cta}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.12] bg-paper px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="absolute inset-0 terminal-grid opacity-20" />
        <div className="absolute left-[10%] top-8 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{eliteHome.title}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.03] tracking-[-0.045em] md:text-6xl">
              {eliteHome.subtitle}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink/[0.7] md:text-lg">
              {eliteHome.text}
            </p>
            <a
              href={localizedPage("/sinais")}
              onClick={() => trackVarejoClick("home_elite_section_click", { locale })}
              className="premium-button-gold mt-8 inline-flex border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {eliteHome.cta}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {eliteHome.cards.map((item) => (
              <article key={item} className="relative overflow-hidden border border-gold/[0.18] bg-white/[0.035] p-5 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.5] hover:shadow-premium md:p-6">
                <div className="absolute inset-0 luxury-grid opacity-20" />
                <div className="relative flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_18px_rgba(201,155,62,0.55)]" />
                  <p className="font-serif text-2xl leading-[1.08] tracking-[-0.035em] text-ink">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/[0.14] bg-ink px-5 py-16 text-paper md:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="absolute inset-0 terminal-grid opacity-20" />
        <div className="absolute right-[8%] top-8 h-72 w-72 rounded-full bg-gold/[0.08] blur-3xl" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{selectHome.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.03] tracking-[-0.045em] md:text-6xl">
              {selectHome.title}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
              {selectHome.text}
            </p>
            <a
              href={localizedPage("/select")}
              className="premium-button-gold mt-8 inline-flex border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {selectHome.cta}
            </a>
          </div>
          <div className="home-tier-cards grid gap-4 sm:grid-cols-2">
            {selectHome.cards.map((item) =>
              item.value ? (
                <article
                  key={`${item.label}-${item.value}`}
                  className="home-tier-card home-tier-card--primary relative overflow-hidden border border-gold/[0.22] bg-paper/[0.04] p-6 shadow-fine"
                >
                  <div className="absolute inset-0 luxury-grid opacity-20" />
                  <div className="relative">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-paper/[0.55]">{item.label}</p>
                    <p className="mt-3 font-serif text-3xl leading-[1.04] tracking-[-0.04em] text-gold">{item.value}</p>
                  </div>
                </article>
              ) : (
                <div
                  key={item.label}
                  className="home-tier-card home-tier-card--item text-[11px] font-bold uppercase tracking-[0.18em] text-paper/[0.78] md:relative md:overflow-hidden md:border md:border-gold/[0.22] md:bg-paper/[0.04] md:p-6 md:shadow-fine md:text-[10px] md:tracking-[0.22em] md:text-paper/[0.55]"
                >
                  {item.label}
                </div>
              ),
            )}
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-b border-gold/[0.14] bg-ink px-5 py-16 text-paper md:px-8 md:py-20 lg:px-12 xl:px-16">
        <div className="absolute left-[8%] top-10 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-gold">{privateHome.eyebrow}</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.03] tracking-[-0.045em] md:text-6xl">
              {privateHome.title}
            </h2>
            <p className="mt-4 max-w-3xl font-serif text-2xl leading-[1.16] tracking-[-0.035em] text-gold md:text-4xl">
              {privateHome.subtitle}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
              {privateHome.text}
            </p>
            <a
              href={localizedPage("/private")}
              className="premium-button-gold mt-8 inline-flex border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {privateHome.cta}
            </a>
          </div>
          <div className="home-tier-cards grid gap-4 sm:grid-cols-2">
            {privateHome.cards.map((item) =>
              item.value ? (
                <article
                  key={`${item.label}-${item.value}`}
                  className="home-tier-card home-tier-card--primary relative overflow-hidden border border-gold/[0.22] bg-paper/[0.04] p-6 shadow-fine transition hover:-translate-y-1 hover:border-gold/[0.48]"
                >
                  <div className="relative">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-paper/[0.55]">{item.label}</p>
                    <p className="mt-3 font-serif text-3xl leading-[1.04] tracking-[-0.04em] text-gold">{item.value}</p>
                  </div>
                </article>
              ) : (
                <div
                  key={item.label}
                  className="home-tier-card home-tier-card--item text-[11px] font-bold uppercase tracking-[0.18em] text-paper/[0.78] md:relative md:overflow-hidden md:border md:border-gold/[0.22] md:bg-paper/[0.04] md:p-6 md:shadow-fine md:text-[10px] md:tracking-[0.22em] md:text-paper/[0.55]"
                >
                  {item.label}
                </div>
              ),
            )}
          </div>
        </motion.div>
      </section>

      <section className="relative overflow-hidden border-b border-gold/[0.12] bg-ink px-5 py-16 text-paper md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{institutions.eyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">{institutions.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-paper/[0.68] md:text-lg">{institutions.text}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {institutions.institutions.map((name) => (
              <div key={name} className="group border border-paper/[0.12] bg-paper/[0.035] px-4 py-5 text-center shadow-fine transition duration-300 hover:-translate-y-0.5 hover:border-gold/[0.45]">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-paper/[0.64] transition group-hover:text-gold">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="home-global-account px-5 py-16 md:px-8 md:py-20 lg:px-12 xl:px-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} variants={fadeUp} className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">{account.eyebrow}</p>
            <h2 className="mt-5 text-balance font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-6xl">
              {account.title}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-ink/[0.68] md:text-lg md:leading-9">
              {account.text}
            </p>
          </div>

          <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
            <article className="broker-home-card broker-home-card-forex group relative flex h-full min-h-0 flex-col overflow-hidden border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:min-h-[360px] md:p-8">
              <div className="absolute inset-0 terminal-grid opacity-20" />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{account.fxproLabel}</p>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/[0.28] bg-ink font-mono text-sm font-black text-gold shadow-fine">FX</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif text-3xl leading-[1.05] tracking-[-0.035em] md:text-4xl">{account.fxproTitle}</h3>
                  <p className="mt-5 max-w-xl flex-1 leading-8 text-ink/[0.64]">{account.fxproText}</p>
                </div>
                <a href={homeFxproLinks[locale]} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("fxpro_click", { locale, source: "home_account_card" })} className="premium-button-gold mt-8 w-full border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                  {account.fxproCta}
                </a>
              </div>
            </article>

            <article className="broker-home-card broker-home-card-crypto group relative flex h-full min-h-0 flex-col overflow-hidden border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:min-h-[360px] md:p-8">
              <div className="absolute inset-0 terminal-grid opacity-20" />
              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{account.binanceLabel}</p>
                  <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/[0.28] bg-ink font-mono text-sm font-black text-gold shadow-fine">BTC</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-serif text-3xl leading-[1.05] tracking-[-0.035em] md:text-4xl">{account.binanceTitle}</h3>
                  <p className="mt-5 max-w-xl flex-1 leading-8 text-ink/[0.64]">{account.binanceText}</p>
                </div>
                <a href={binanceLink} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("binance_click", { locale, source: "home_account_card" })} className="premium-button-gold mt-8 w-full border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5">
                  {account.binanceCta}
                </a>
              </div>
            </article>
          </div>

          <div className="mt-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-gold">{account.bannerLabel}</p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink/[0.62] md:text-base">
                {account.bannerText}
              </p>
            </div>
            <a href={homeFxproLinks[locale]} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("fxpro_click", { locale, source: "home_banner" })} className="group relative mx-auto mt-6 block w-full max-w-[1324px] overflow-hidden rounded-sm transition duration-300 hover:-translate-y-0.5">
              <Image
                src={homeFxproBanners[locale]}
                alt="FxPro Banner"
                width={1324}
                height={150}
                sizes="(max-width: 1324px) 100vw, 1324px"
                loading="lazy"
                className="block h-auto w-full transition duration-300 group-hover:scale-[1.006]"
              />
            </a>
          </div>

          <nav aria-label={account.ecosystemLabel} className="mt-8 flex flex-wrap justify-center gap-2">
            {homeSeoLinks(locale).map((link) => (
              <a key={link.href} href={link.href} className="border border-gold/[0.18] bg-white/[0.03] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/[0.72] transition hover:border-gold/[0.5] hover:text-gold">
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-14 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1280px]">
          <FreeChannelCTA t={t} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="relative mx-auto max-w-[1280px] overflow-hidden border border-ink bg-ink px-6 py-16 text-center text-paper shadow-premium md:px-12 md:py-24">
          <div className="absolute inset-0 terminal-grid opacity-30" />
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/[0.1] blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-gold">Varejo Investidor</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-balance font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-7xl">
              {copy.final.title}
            </h2>
            {finalText ? (
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-paper/[0.72] md:text-lg">
                {finalText}
              </p>
            ) : null}
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("home_final_formiga_click", { locale })} className="premium-button-gold border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition">
                {copy.final.free}
              </a>
              <a href={educationHref} onClick={() => trackVarejoClick("home_final_education_click", { locale })} className="premium-button-ghost border border-paper/[0.25] bg-paper/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-paper transition">
                {copy.hero.services}
              </a>
            </div>
            <nav aria-label={locale === "pt" ? "Outros níveis do ecossistema" : "Other ecosystem levels"} className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a href={localizedPage("/sinais")} onClick={() => trackVarejoClick("home_elite_click", { locale })} className="text-[11px] font-bold uppercase tracking-[0.14em] text-paper/[0.52] transition hover:text-gold">
                {copy.final.elite}
              </a>
              <span className="hidden text-paper/[0.25] sm:inline" aria-hidden="true">
                ·
              </span>
              <a href={localizedPage("/select")} onClick={() => trackVarejoClick("home_final_select_click", { locale })} className="text-[11px] font-bold uppercase tracking-[0.14em] text-paper/[0.52] transition hover:text-gold">
                {finalCtas.select}
              </a>
              <span className="hidden text-paper/[0.25] sm:inline" aria-hidden="true">
                ·
              </span>
              <a href={localizedPage("/private")} onClick={() => trackVarejoClick("home_final_private_click", { locale })} className="text-[11px] font-bold uppercase tracking-[0.14em] text-paper/[0.52] transition hover:text-gold">
                {finalCtas.private}
              </a>
            </nav>
          </div>
        </motion.div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
