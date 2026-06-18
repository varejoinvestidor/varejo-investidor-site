"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FreeChannelCTA, SiteChrome, SupportFooter, fadeUp, trackVarejoClick, useSiteLocale } from "../src/components/SiteSections";
import { getInsightsPath } from "../src/data/insightsContent";
import type { Locale } from "../src/i18n";

const homeLiteCopy = {
  pt: {
    hero: {
      eyebrow: "Varejo Investidor",
      title: "Tudo o que voc\u00ea precisa para investir e construir patrim\u00f4nio em n\u00edvel global.",
      text: "Entenda os mercados globais, acompanhe an\u00e1lises econ\u00f4micas e desenvolva uma estrat\u00e9gia para construir patrim\u00f4nio al\u00e9m das fronteiras do seu pa\u00eds.",
      free: "ENTRAR NO CANAL FORMIGA",
      services: "CONHECER A EDUCA\u00c7\u00c3O",
    },
    intro: {
      eyebrow: "O que \u00e9",
      title: "O que \u00e9 o Varejo Investidor",
      manifesto:
        "O Varejo Investidor \u00e9 uma estrutura financeira global para quem deseja sair do b\u00e1sico, entender o mercado internacional e construir sua vida financeira em camadas.",
      text: [
        "Desde 2018, entregamos mais de 4.200 sinais ao vivo, acompanhando Forex, ouro, petr\u00f3leo, cripto, \u00edndices e moedas globais.",
        "A jornada \u00e9 dividida em n\u00edveis: Formiga, Lobo e Harpia.",
        "O n\u00edvel Formiga constr\u00f3i a base. O n\u00edvel Lobo desenvolve estrat\u00e9gia e leitura de mercado. O n\u00edvel Harpia amplia a vis\u00e3o para patrim\u00f4nio, prote\u00e7\u00e3o e estrutura global.",
      ],
      stats: ["Desde 2018", "sinais ao vivo", "Formiga / Lobo / Harpia"],
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
      free: "Start free",
      services: "View education",
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
      free: "Empezar gratis",
      services: "Ver educaci\u00f3n",
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
      title: "Tout ce dont vous avez besoin pour investir et construire un patrimoine a l'echelle mondiale.",
      text: "Comprenez les marches mondiaux, suivez les analyses economiques et developpez une strategie pour construire un patrimoine au-dela des frontieres de votre pays.",
      free: "ENTRER DANS LE CANAL FORMIGA",
      services: "DECOUVRIR NOS SERVICES",
    },
    intro: {
      eyebrow: "Ce que c'est",
      title: "Qu'est-ce que Varejo Investidor",
      manifesto:
        "Varejo Investidor est une structure financiere mondiale pour ceux qui veulent sortir des bases, comprendre les marches internationaux et construire leur vie financiere par etapes.",
      text: [
        "Depuis 2018, nous avons envoye plus de 4 200 signaux en direct en suivant le Forex, l'or, le petrole, les cryptos, les indices et les devises mondiales.",
        "Le parcours est divise en niveaux : Fourmi, Loup et Harpie.",
        "Le niveau Fourmi construit la base. Le niveau Loup developpe la strategie et la lecture de marche. Le niveau Harpie elargit la vision vers le patrimoine, la protection et la structure globale.",
      ],
      stats: ["Depuis 2018", "signaux en direct", "Fourmi / Loup / Harpie"],
    },
    cards: [
      { code: "FOURMI", title: "Base financiere", text: "Education par niveaux pour construire la base, organiser le risque et creer les premiers piliers.", href: "/nivel-formiga" },
      { code: "LOUP", title: "Strategie et expansion", text: "Signaux en direct, lecture de marche et decisions structurees pour operer avec discipline.", href: "/nivel-lobo" },
      { code: "HARPIE", title: "Patrimoine mondial", text: "Services strategiques pour protection, positionnement, patrimoine et vision internationale.", href: "/nivel-harpia" },
    ],
    cardCta: "En savoir plus",
    final: {
      title: "Votre parcours commence au Niveau Fourmi.",
      text: "Commencez gratuitement, suivez les marches mondiaux et developpez votre evolution financiere a travers les niveaux Fourmi, Loup et Harpie.",
      free: "ENTRER DANS LE CANAL FORMIGA",
      elite: "DECOUVRIR LE CANAL ELITE HARPIA",
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
      manifesto: "Varejo Investidor — это глобальная финансовая структура для частных инвесторов, которые хотят выйти за рамки базового уровня, понять международные рынки и строить капитал поэтапно.",
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
    final: { title: "あなたの旅はアリレベルから始まります。", text: "無料で始め、世界市場を追跡し、アリ、オオカミ、ハーピーの各レベルで金融進化を進めましょう。", free: "アリチャンネルに参加", elite: "Elite Harpiaを見る" },
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
} satisfies Record<
  Locale,
  {
    hero: { eyebrow: string; title: string; text: string; free: string; services: string };
    intro: { eyebrow: string; title: string; manifesto: string; text: string[]; stats: string[] };
    cards: { code: string; title: string; text: string; href: string }[];
    cardCta: string;
    final: { title: string; text?: string; free: string; elite: string };
  }
>;

const signalCounterLabels: Record<Locale, string> = {
  pt: "SINAIS AO VIVO NO WHATSAPP",
  en: "LIVE SIGNALS ON WHATSAPP",
  es: "SE\u00D1ALES EN VIVO EN WHATSAPP",
  fr: "SIGNAUX EN DIRECT SUR WHATSAPP",
  hi: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u0910\u092A \u092A\u0930 \u0932\u093E\u0907\u0935 \u0938\u093F\u0917\u094D\u0928\u0932",
  ar: "\u0625\u0634\u0627\u0631\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629 \u0639\u0644\u0649 \u0648\u0627\u062A\u0633\u0627\u0628",
  tr: "WHATSAPP'TA CANLI S\u0130NYALLER",
  id: "SINYAL LIVE DI WHATSAPP",
  vi: "T\u00CDN HI\u1EC6U TR\u1EF0C TI\u1EBEP TR\u00CAN WHATSAPP",
  th: "\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e13\u0e2a\u0e14\u0e1a\u0e19 WhatsApp",
  ja: "WHATSAPPのライブシグナル",
  ko: "WHATSAPP 실시간 신호",
};

type HomeEliteCopy = {
  title: string;
  subtitle: string;
  text: string;
  cards: string[];
  cta: string;
};

type HomeSelectCopy = {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  cards: Array<{ label: string; value?: string }>;
};

const homeEliteCopy: Record<string, HomeEliteCopy> = {
  pt: {
    title: "Canal Elite",
    subtitle: "Receba análises e sinais enviados diretamente para o WhatsApp.",
    text: "O Canal Elite foi desenvolvido para investidores que desejam acompanhar os mercados globais através de sinais estruturados, análises e leitura de mercado. Desde 2018, mais de 4.200 sinais foram enviados ao vivo acompanhando Forex, ouro, petróleo, índices, criptomoedas e moedas globais.",
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
  ko: {
    title: "Elite 채널",
    subtitle: "분석과 신호를 WhatsApp으로 직접 받아보세요.",
    text: "Elite 채널은 구조화된 신호, 분석, 시장 해석을 통해 글로벌 시장을 따라가고 싶은 투자자를 위해 설계되었습니다. 2018년부터 Forex, 금, 원유, 지수, 암호화폐, 글로벌 통화에서 4,200개 이상의 실시간 신호가 전송되었습니다.",
    cards: ["실시간 신호", "WhatsApp 수신", "진입, 목표, 손절", "시장 분석", "레벨별 교육", "글로벌 리딩"],
    cta: "Elite 채널 보기",
  },
});

const homeSelectCopy: Record<string, HomeSelectCopy> = {
  pt: {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title: "Varejo Investidor Select",
    text: "Estrutura operacional voltada para investidores que já possuem patrimônio relevante e desejam exposição aos mercados globais sem necessidade de acompanhar operações diariamente.",
    cta: "CONHECER SELECT",
    cards: [
      { label: "Aplicação mínima", value: "R$ 250.000" },
      { label: "Investidor internacional", value: "US$ 50.000" },
      { label: "Forex" },
      { label: "Ações" },
      { label: "Criptomoedas" },
    ],
  },
  en: {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title: "Varejo Investidor Select",
    text: "An operational structure for investors who already have meaningful wealth and want exposure to global markets without following trades every day.",
    cta: "EXPLORE SELECT",
    cards: [
      { label: "Minimum allocation", value: "R$ 250,000" },
      { label: "International investor", value: "US$ 50,000" },
      { label: "Forex" },
      { label: "Stocks" },
      { label: "Crypto" },
    ],
  },
  es: {
    eyebrow: "VAREJO INVESTIDOR SELECT",
    title: "Varejo Investidor Select",
    text: "Estructura operativa para inversores que ya poseen patrimonio relevante y desean exposición a mercados globales sin acompañar operaciones todos los días.",
    cta: "CONOCER SELECT",
    cards: [
      { label: "Aplicación mínima", value: "R$ 250.000" },
      { label: "Inversor internacional", value: "US$ 50.000" },
      { label: "Forex" },
      { label: "Acciones" },
      { label: "Criptoactivos" },
    ],
  },
};

Object.assign(homeSelectCopy, {
  fr: { ...homeSelectCopy.en, text: "Structure opérationnelle destinée aux investisseurs disposant déjà d’un patrimoine significatif et souhaitant une exposition aux marchés mondiaux sans suivre les opérations chaque jour.", cta: "DÉCOUVRIR SELECT", cards: [{ label: "Allocation minimale", value: "R$ 250 000" }, { label: "Investisseur international", value: "US$ 50 000" }, { label: "Forex" }, { label: "Actions" }, { label: "Cryptoactifs" }] },
  de: { ...homeSelectCopy.en, text: "Operative Struktur für Anleger mit relevantem Vermögen, die globale Marktexponierung wünschen, ohne täglich Trades zu verfolgen.", cta: "SELECT ANSEHEN", cards: [{ label: "Mindestanlage", value: "R$ 250.000" }, { label: "Internationaler Anleger", value: "US$ 50.000" }, { label: "Forex" }, { label: "Aktien" }, { label: "Krypto" }] },
  it: { ...homeSelectCopy.en, text: "Struttura operativa per investitori con patrimonio rilevante che desiderano esposizione ai mercati globali senza seguire le operazioni ogni giorno.", cta: "SCOPRI SELECT", cards: [{ label: "Investimento minimo", value: "R$ 250.000" }, { label: "Investitore internazionale", value: "US$ 50.000" }, { label: "Forex" }, { label: "Azioni" }, { label: "Cripto" }] },
  ar: { ...homeSelectCopy.en, text: "هيكل تشغيلي للمستثمرين الذين يمتلكون ثروة مهمة ويرغبون في التعرض للأسواق العالمية دون متابعة العمليات يومياً.", cta: "تعرّف على Select", cards: [{ label: "الحد الأدنى", value: "R$ 250.000" }, { label: "مستثمر دولي", value: "US$ 50.000" }, { label: "الفوركس" }, { label: "الأسهم" }, { label: "الكريبتو" }] },
  fa: { ...homeSelectCopy.en, text: "ساختار عملیاتی برای سرمایه‌گذارانی که دارایی قابل توجه دارند و می‌خواهند بدون پیگیری روزانه معاملات، در بازارهای جهانی قرار بگیرند.", cta: "آشنایی با Select", cards: [{ label: "حداقل سرمایه", value: "R$ 250.000" }, { label: "سرمایه‌گذار بین‌المللی", value: "US$ 50.000" }, { label: "Forex" }, { label: "سهام" }, { label: "رمزارزها" }] },
  hi: { ...homeSelectCopy.en, text: "उन निवेशकों के लिए परिचालन संरचना जिनके पास महत्वपूर्ण पूंजी है और जो रोज़ाना ऑपरेशन देखे बिना वैश्विक बाजारों में एक्सपोज़र चाहते हैं।", cta: "SELECT देखें", cards: [{ label: "न्यूनतम निवेश", value: "R$ 250.000" }, { label: "अंतरराष्ट्रीय निवेशक", value: "US$ 50.000" }, { label: "Forex" }, { label: "शेयर" }, { label: "क्रिप्टो" }] },
  ur: { ...homeSelectCopy.en, text: "ایسی آپریشنل ساخت جو ان سرمایہ کاروں کے لیے ہے جن کے پاس قابلِ ذکر سرمایہ ہے اور وہ روزانہ ٹریڈز دیکھے بغیر عالمی منڈیوں تک رسائی چاہتے ہیں۔", cta: "SELECT دیکھیں", cards: [{ label: "کم از کم سرمایہ", value: "R$ 250.000" }, { label: "بین الاقوامی سرمایہ کار", value: "US$ 50.000" }, { label: "Forex" }, { label: "Stocks" }, { label: "Crypto" }] },
  bn: { ...homeSelectCopy.en, text: "যাদের ইতিমধ্যে উল্লেখযোগ্য পুঁজি আছে এবং প্রতিদিন অপারেশন না দেখে বৈশ্বিক বাজারে এক্সপোজার চান, তাদের জন্য অপারেশনাল কাঠামো।", cta: "SELECT দেখুন", cards: [{ label: "ন্যূনতম বিনিয়োগ", value: "R$ 250.000" }, { label: "আন্তর্জাতিক বিনিয়োগকারী", value: "US$ 50.000" }, { label: "Forex" }, { label: "Stocks" }, { label: "Crypto" }] },
  tr: { ...homeSelectCopy.en, text: "Halihazırda anlamlı bir varlığa sahip olan ve işlemleri her gün takip etmeden küresel piyasalara maruz kalmak isteyen yatırımcılar için operasyonel yapı.", cta: "SELECT'İ TANIMA", cards: [{ label: "Minimum yatırım", value: "R$ 250.000" }, { label: "Uluslararası yatırımcı", value: "US$ 50.000" }, { label: "Forex" }, { label: "Hisseler" }, { label: "Kripto" }] },
  ru: { ...homeSelectCopy.en, text: "Операционная структура для инвесторов с существенным капиталом, которым нужна экспозиция на глобальные рынки без ежедневного отслеживания сделок.", cta: "УЗНАТЬ SELECT", cards: [{ label: "Минимальный капитал", value: "R$ 250.000" }, { label: "Международный инвестор", value: "US$ 50.000" }, { label: "Forex" }, { label: "Акции" }, { label: "Крипто" }] },
  id: { ...homeSelectCopy.en, text: "Struktur operasional untuk investor yang sudah memiliki kekayaan signifikan dan ingin eksposur ke pasar global tanpa memantau transaksi setiap hari.", cta: "LIHAT SELECT", cards: [{ label: "Alokasi minimum", value: "R$ 250.000" }, { label: "Investor internasional", value: "US$ 50.000" }, { label: "Forex" }, { label: "Saham" }, { label: "Kripto" }] },
  vi: { ...homeSelectCopy.en, text: "Cấu trúc vận hành dành cho nhà đầu tư đã có tài sản đáng kể và muốn tiếp cận thị trường toàn cầu mà không cần theo dõi giao dịch hằng ngày.", cta: "TÌM HIỂU SELECT", cards: [{ label: "Mức tối thiểu", value: "R$ 250.000" }, { label: "Nhà đầu tư quốc tế", value: "US$ 50.000" }, { label: "Forex" }, { label: "Cổ phiếu" }, { label: "Crypto" }] },
  th: { ...homeSelectCopy.en, text: "โครงสร้างการดำเนินงานสำหรับนักลงทุนที่มีสินทรัพย์สำคัญแล้ว และต้องการเข้าถึงตลาดโลกโดยไม่ต้องติดตามการเทรดทุกวัน", cta: "ดู SELECT", cards: [{ label: "เงินลงทุนขั้นต่ำ", value: "R$ 250.000" }, { label: "นักลงทุนต่างประเทศ", value: "US$ 50.000" }, { label: "Forex" }, { label: "หุ้น" }, { label: "คริปโต" }] },
  tl: { ...homeSelectCopy.en, text: "Operational structure para sa investors na may malaking kapital at gustong magkaroon ng exposure sa global markets nang hindi kailangang bantayan ang trades araw-araw.", cta: "TINGNAN ANG SELECT", cards: [{ label: "Minimum allocation", value: "R$ 250,000" }, { label: "International investor", value: "US$ 50,000" }, { label: "Forex" }, { label: "Stocks" }, { label: "Crypto" }] },
  zh: { ...homeSelectCopy.en, text: "面向已有较高资产、希望参与全球市场但不想每天跟踪交易的投资者的运营结构。", cta: "了解 SELECT", cards: [{ label: "最低配置", value: "R$ 250,000" }, { label: "国际投资者", value: "US$ 50,000" }, { label: "Forex" }, { label: "股票" }, { label: "加密资产" }] },
  ja: { ...homeSelectCopy.en, text: "すでに一定の資産を持ち、日々の取引を追わずに世界市場へのエクスポージャーを得たい投資家向けの運用構造です。", cta: "SELECTを見る", cards: [{ label: "最低運用額", value: "R$ 250,000" }, { label: "海外投資家", value: "US$ 50,000" }, { label: "Forex" }, { label: "株式" }, { label: "暗号資産" }] },
  ko: { ...homeSelectCopy.en, text: "이미 의미 있는 자산을 보유하고 있으며 매일 거래를 따라가지 않고 글로벌 시장 노출을 원하는 투자자를 위한 운영 구조입니다.", cta: "SELECT 보기", cards: [{ label: "최소 운용금액", value: "R$ 250,000" }, { label: "국제 투자자", value: "US$ 50,000" }, { label: "Forex" }, { label: "주식" }, { label: "암호화폐" }] },
  pl: { ...homeSelectCopy.en, text: "Struktura operacyjna dla inwestorów z istotnym kapitałem, którzy chcą ekspozycji na rynki globalne bez codziennego śledzenia transakcji.", cta: "POZNAJ SELECT", cards: [{ label: "Minimalna alokacja", value: "R$ 250.000" }, { label: "Inwestor międzynarodowy", value: "US$ 50.000" }, { label: "Forex" }, { label: "Akcje" }, { label: "Krypto" }] },
});

const homeFxproLinks: Record<Locale, string> = {
  pt: "https://direct.fxpro.group/pt/partner/77014650?platform=web",
  en: "https://direct.fxpro.group/en/partner/77014650?platform=web",
  es: "https://direct.fxpro.group/es/partner/77014650?platform=web",
  fr: "https://direct.fxpro.group/en/partner/77014650?platform=web",
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
    eyebrow: "Compte global",
    title: "Ouvrez votre compte et accedez aux marches mondiaux",
    text: "Forex, or, petrole, indices, actions, ETF et cryptomonnaies via les principales plateformes du marche international.",
    fxproLabel: "COURTIER FOREX",
    fxproTitle: "Marches mondiaux avec FXPro",
    fxproText: "Accedez au Forex, a l'or, au petrole et aux indices via le courtier utilise dans la structure operationnelle de Varejo Investidor.",
    fxproCta: "Ouvrir un compte FXPro",
    binanceLabel: "COURTIER CRYPTO",
    binanceTitle: "Marche mondial des cryptomonnaies",
    binanceText: "Achetez, vendez et suivez les cryptomonnaies via l'une des plus grandes plateformes d'echange au monde.",
    binanceCta: "Ouvrir un compte Binance",
    bannerLabel: "OUVREZ VOTRE COMPTE FOREX",
    bannerText: "Cliquez sur la banniere pour acceder au courtier dans la bonne langue.",
    ecosystemLabel: "Explorer l'ecosysteme",
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
  fr: { forex: "Forex", stocks: "Actions", crypto: "Crypto", etfs: "ETF", formiga: "Niveau Fourmi", lobo: "Niveau Loup", harpia: "Niveau Harpie", articles: "Articles" },
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
  return locale === "pt" ? `/${slug}` : `/${locale}/${slug}`;
}

function homeSeoLinks(locale: Locale) {
  const labels = homeSeoLabels[locale] ?? homeSeoLabels.en;
  return [
    { href: localizedMarketPath(locale, "forex"), label: labels.forex },
    { href: localizedMarketPath(locale, "stocks"), label: labels.stocks },
    { href: localizedMarketPath(locale, "crypto"), label: labels.crypto },
    { href: localizedMarketPath(locale, "etfs"), label: labels.etfs },
    { href: "/nivel-formiga", label: labels.formiga },
    { href: "/nivel-lobo", label: labels.lobo },
    { href: "/nivel-harpia", label: labels.harpia },
    { href: getInsightsPath(locale), label: labels.articles },
  ];
}

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
    text: "Le parcours organise l'investisseur en trois niveaux : base, execution et patrimoine mondial.",
    button: "COMMENCER PAR LE CANAL FORMIGA",
    steps: [
      { name: "Fourmi", text: "Apprend les bases, comprend le marche et construit une conscience financiere." },
      { name: "Loup", text: "Opere avec methode, gestion du risque et lecture de marche." },
      { name: "Harpie", text: "Construit un patrimoine mondial, protege le capital et pense long terme." },
    ],
  },
  hi: {
    eyebrow: "कैसे काम करता है",
    title: "Varejo Investidor कैसे काम करता है",
    text: "यात्रा निवेशक को तीन स्तरों में व्यवस्थित करती है: आधार, संचालन और वैश्विक संपत्ति।",
    button: "FORMIGA चैनल से शुरू करें",
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
    button: "FORMIGAチャンネルから始める",
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

function AnimatedCounter({ label }: { label: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const start = performance.now();
        const duration = 1400;

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * 4200));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-3 lg:flex-col lg:items-start lg:gap-1">
      <span ref={ref} className="font-mono text-2xl text-gold md:text-3xl">
        {value.toLocaleString("pt-BR")}+
      </span>
      <span className="signal-counter-label text-[10px] font-bold uppercase tracking-[0.16em] text-ink/[0.62]">
        {label}
      </span>
    </span>
  );
}

export default function Home() {
  const { locale, t, changeLocale } = useSiteLocale();
  const copy = homeLiteCopy[locale as keyof typeof homeLiteCopy] ?? homeLiteCopy.en;
  const flow = homeFlowCopy[locale] ?? homeFlowCopy.en;
  const account = homeAccountCopy[locale] ?? homeAccountCopy.en;
  const eliteHome = homeEliteCopy[locale] ?? homeEliteCopy.en;
  const selectHome = homeSelectCopy[locale] ?? homeSelectCopy.en;
  const finalText = "text" in copy.final ? copy.final.text : undefined;
  const educationHref = locale === "pt" ? "/educacao" : `/${locale}/education`;

  return (
    <main lang={locale === "pt" ? "pt-BR" : locale} dir={locale === "ar" || locale === "ur" || locale === "fa" ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteChrome locale={locale} t={t} onLocaleChange={changeLocale} />

      <section id="home" className="home-hero premium-stage relative px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48 lg:px-12 xl:px-16">
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
            <div className="hero-image-wrapper relative mx-auto flex min-h-[24rem] items-center justify-center sm:min-h-[34rem] lg:min-h-[44rem] xl:min-h-[48rem]">
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
            <motion.h1 variants={fadeUp} className="hero-headline max-w-5xl text-balance font-serif text-[2.55rem] leading-[1.04] tracking-[-0.045em] text-ink md:text-[4.55rem] xl:text-[5.4rem]">
              {copy.hero.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg font-light leading-9 text-ink/[0.7] md:text-xl">
              {copy.hero.text}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("home_formiga_click", { locale })} className="premium-button-gold border border-gold bg-gold px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink shadow-premium transition hover:-translate-y-0.5">
                {copy.hero.free}
              </a>
              <a href={educationHref} onClick={() => trackVarejoClick("home_education_click", { locale })} className="premium-button-ghost border border-ink/[0.18] bg-paper/[0.03] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5">
                {copy.hero.services}
              </a>
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
              <p className="text-xs font-black uppercase tracking-[0.34em] text-gold">{flow.eyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.04] tracking-[-0.04em] md:text-5xl">
                {flow.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/[0.68]">{flow.text}</p>
              <a
                href={t.freeChannel.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackVarejoClick("home_flow_formiga_click", { locale })}
                className="premium-button-gold mt-7 inline-flex border border-gold bg-gold px-6 py-4 text-center text-xs font-black uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5"
              >
                {flow.button}
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {flow.steps.map((step) => (
                <article key={step.name} className="level-card relative overflow-hidden border border-gold/[0.16] bg-paper p-5 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.48] hover:shadow-premium">
                  <div className="absolute inset-0 luxury-grid opacity-25" />
                  <div className="relative">
                    <h3 className="font-serif text-3xl leading-[1.04] tracking-[-0.035em]">{step.name}</h3>
                    <p className="mt-4 text-sm leading-7 text-ink/[0.64]">{step.text}</p>
                  </div>
                </article>
              ))}
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
              {copy.intro.stats.map((stat, index) => (
                <div key={stat} className="strategic-stat border-l-2 border-gold/[0.68] bg-paper px-4 py-4 shadow-fine">
                  {index === 1 ?<AnimatedCounter label={signalCounterLabels[locale] ?? signalCounterLabels.en} /> : <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink">{stat}</p>}
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

      <section className="home-levels-section px-5 py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="section-team-stage relative mx-auto flex w-full max-w-[34rem] justify-center lg:max-w-none">
            <div className="section-team-depth absolute inset-0" />
            <Image src="/characters/home-structure-horizontal-cutout.png" alt="Personagens Formiga, Lobo e Harpia ao lado dos servi\u00e7os do Varejo Investidor" width={1536} height={1024} sizes="(min-width: 1024px) 46vw, 92vw" className="home-structure-image relative z-10 h-auto w-full object-contain" />
          </motion.div>

          <div className="grid gap-5">
            {copy.cards.map((card, index) => (
              <motion.a key={card.title} href={card.href} aria-label={card.title} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.06 }} variants={fadeUp} className="level-card system-module group relative block overflow-hidden p-7 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:p-8">
                <div className="absolute inset-0 luxury-grid opacity-30" />
                <div className="relative">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.36em] text-gold">{card.code}</p>
                    <h3 className="mt-2 font-serif text-3xl leading-[1.04] tracking-[-0.035em] md:text-4xl">{card.title}</h3>
                    <p className="mt-3 leading-7 text-ink/[0.64]">{card.text}</p>
                  </div>
                  <span className="mt-5 inline-flex text-lg text-gold transition group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </div>
              </motion.a>
            ))}
          </div>
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
              href="/sinais"
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
              href="/select"
              className="premium-button-gold mt-8 inline-flex border border-gold bg-gold px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5"
            >
              {selectHome.cta}
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {selectHome.cards.map((item) => (
              <article key={`${item.label}-${item.value ?? ""}`} className="relative overflow-hidden border border-gold/[0.22] bg-paper/[0.04] p-6 shadow-fine">
                <div className="absolute inset-0 luxury-grid opacity-20" />
                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-paper/[0.55]">{item.label}</p>
                  {item.value ? (
                    <p className="mt-3 font-serif text-3xl leading-[1.04] tracking-[-0.04em] text-gold">{item.value}</p>
                  ) : null}
                </div>
              </article>
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
            <article className="broker-home-card broker-home-card-forex group relative flex h-full min-h-[360px] flex-col overflow-hidden border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:p-8">
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

            <article className="broker-home-card broker-home-card-crypto group relative flex h-full min-h-[360px] flex-col overflow-hidden border border-gold/[0.22] bg-white/[0.035] p-6 shadow-fine transition duration-300 hover:-translate-y-1 hover:border-gold/[0.55] hover:shadow-premium md:p-8">
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
            <a href={homeFxproLinks[locale]} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("fxpro_click", { locale, source: "home_banner" })} className="group mx-auto mt-6 block w-full max-w-[1324px] overflow-hidden rounded-sm transition duration-300 hover:-translate-y-0.5">
              <img
                src={homeFxproBanners[locale]}
                alt="FxPro Banner"
                width={1324}
                height={150}
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
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={t.freeChannel.link} target="_blank" rel="noopener noreferrer" onClick={() => trackVarejoClick("home_final_formiga_click", { locale })} className="premium-button-gold border border-gold bg-gold px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition">
                {copy.final.free}
              </a>
              <a href="/sinais" onClick={() => trackVarejoClick("home_elite_click", { locale })} className="premium-button-ghost border border-paper/[0.25] bg-paper/[0.04] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-paper transition">
                {copy.final.elite}
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <SupportFooter t={t} locale={locale} onLocaleChange={changeLocale} />
    </main>
  );
}
