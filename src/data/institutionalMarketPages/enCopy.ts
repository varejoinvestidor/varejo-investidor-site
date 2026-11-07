import type { MarketCopy } from "./ptCopy";

type InstitutionalMarketSlug = "acoes" | "forex" | "etfs" | "ouro" | "petroleo" | "cripto";

export const institutionalMarketCopyEn: Record<InstitutionalMarketSlug, MarketCopy> = {
  acoes: {
    heroTitle: "GLOBAL EQUITY MARKETS",
    heroSubtitle:
      "Companies, capital formation, growth, and opportunity across international financial markets.",
    metaTitle: "Global equity markets | Varejo Investidor",
    metaDescription:
      "Institutional primer on global stock exchanges, participants, valuation, sectors, and market risk.",
    sections: [
      {
        eyebrow: "Overview",
        title: "Equities as global capital infrastructure",
        paragraphs: [
          "Global equity markets channel savings into listed companies in exchange for ownership and a claim on future earnings. Exchanges, clearing houses, custodians, and intermediaries connect issuers, asset managers, and retail investors across time zones.",
          "Prices embed expectations about earnings, innovation, governance, and the macro cycle. Institutional analysis blends issuer fundamentals with liquidity, rates, and cross-border flows.",
        ],
      },
      {
        title: "How stock trading works",
        paragraphs: [
          "Listed securities trade on regulated venues where buy and sell orders meet in a central limit order book. Primary issuance funds businesses; secondary trading transfers stakes among investors.",
          "Corporate actions—dividends, buybacks, splits, and follow-on offerings—reshape capital structure and should be read in the context of management strategy.",
        ],
        bullets: [
          "Primary market: IPOs and follow-on capital raises.",
          "Secondary market: peer-to-peer trading after listing.",
          "Electronic registration and centralized custody.",
          "Settlement cycles defined by each exchange.",
        ],
      },
      {
        eyebrow: "Participants",
        title: "International venues and key actors",
        paragraphs: [
          "NYSE and Nasdaq host many of the world’s largest issuers; London, Tokyo, and Hong Kong bridge Europe and Asia; Brazil’s B3 anchors Latin American liquidity. Pension funds, insurers, hedge funds, and mutual funds supply institutional depth.",
          "International brokers extend access subject to home-country regulation, tax, and foreign-exchange rules.",
        ],
        cards: [
          { title: "NYSE / Nasdaq", text: "Depth in U.S. large caps and technology leaders." },
          { title: "B3", text: "Onshore Brazilian listings and regional liquidity." },
          { title: "LSE", text: "Diversified European and global issuers." },
          { title: "Asia", text: "TSE and Hong Kong as industrial and consumption hubs." },
        ],
      },
      {
        title: "Instruments and issuer profiles",
        paragraphs: [
          "Common stock typically carries voting rights and residual cash-flow rights; preferred shares may prioritize dividends or fixed claims. Capitalization tiers—large, mid, and small—affect liquidity, analyst coverage, and sensitivity to news.",
        ],
        bullets: [
          "Common vs. preferred equity classes.",
          "Global depositary receipts and listing lines.",
          "Sector and factor indices as benchmarks.",
          "American and other depositary mechanisms.",
        ],
      },
      {
        title: "What drives equity prices",
        paragraphs: [
          "Earnings beats or misses, guidance changes, and analyst revisions reset fair-value estimates. Macro variables—rates, inflation, GDP growth, and fiscal policy—move discount rates applied to future cash flows.",
          "Geopolitical shocks, supply-chain disruptions, and regulatory shifts add risk premia that can persist beyond a single earnings cycle.",
        ],
      },
      {
        title: "Financial and macro indicators",
        paragraphs: [
          "Revenue growth, operating margin, free cash flow, and leverage describe operating quality. Multiples such as P/E and EV/EBITDA enable peer comparison when normalized for cycle and industry.",
        ],
        bullets: [
          "EPS and profit margin trends.",
          "Cash conversion and balance-sheet resilience.",
          "Yield curves and central-bank policy paths.",
          "Inflation and labor-market releases.",
          "PMIs and industrial production gauges.",
        ],
      },
      {
        title: "Analytical approaches and opportunity set",
        paragraphs: [
          "Global allocation diversifies currency, sector, and innovation exposure. Styles span value, growth, dividend income, and quantitative factor tilts. Many institutional mandates blend fundamental work with risk budgets and position limits.",
        ],
      },
      {
        title: "Market, liquidity, and concentration risk",
        paragraphs: [
          "Broad drawdowns can hit quality names when risk appetite collapses. Single-name or single-sector concentration magnifies volatility. Small caps may gap on thin liquidity. FX translation affects investors reporting in another currency.",
        ],
      },
      {
        eyebrow: "Sector map",
        title: "Major global economic sectors",
        paragraphs: [
          "Sector dashboards help align portfolio tilts with cyclical and structural themes—from technology-led productivity to energy transition and demographic health-care demand.",
        ],
        visualGrid: [
          { label: "Technology", detail: "Software, semiconductors, and digital platforms." },
          { label: "Energy", detail: "Oil, gas, renewables, and utilities." },
          { label: "Financials", detail: "Banks, payments, and capital markets." },
          { label: "Health care", detail: "Pharma, biotech, and devices." },
          { label: "Industrials", detail: "Manufacturing, aerospace, and supply chains." },
          { label: "Consumer", detail: "Discretionary and staples retail." },
          { label: "Infrastructure", detail: "Transport, logistics, concessions." },
          { label: "Defense", detail: "Aerospace and national-security suppliers." },
        ],
      },
      {
        title: "Research and next steps",
        paragraphs: [
          "Continue with macro scenarios, sector notes, and risk education in Varejo Investidor Research. Educational content only—not personalized investment advice.",
        ],
        disclaimer:
          "Past performance does not guarantee future results. Review costs, tax treatment, and cross-border rules before investing internationally.",
      },
    ],
  },

  forex: {
    heroTitle: "GLOBAL FOREIGN EXCHANGE",
    heroSubtitle:
      "The market linking currencies, central banks, international trade, and cross-border capital flows.",
    metaTitle: "Global foreign exchange | Varejo Investidor",
    metaDescription:
          "Decentralized FX: currency pairs, central banks, rates, liquidity, spreads, and leveraged trading risks.",
    showForexBroker: true,
    sections: [
      {
        eyebrow: "Overview",
        title: "The world’s deepest OTC market",
        paragraphs: [
          "Foreign exchange is a decentralized marketplace where currencies trade 24/5 through a global network of banks, dealers, corporations, and investors. It finances trade, travel, cross-border investment, and hedging programs.",
          "Liquidity clusters in London, New York, Tokyo, and Singapore. Prices reflect order flow and expectations about monetary policy rather than a single centralized matching engine.",
        ],
      },
      {
        title: "How the decentralized market operates",
        paragraphs: [
          "Quotes are expressed in pairs: the base currency versus the quote currency. The interbank segment prints the bulk of volume; retail and professional clients often access prices via brokers quoting bid-offer spreads.",
          "Session overlaps increase depth; around major releases spreads may widen and slippage risk rises.",
        ],
      },
      {
        title: "Majors, crosses, and exotics",
        paragraphs: [
          "Majors pair the U.S. dollar with other liquid currencies. Crosses trade two majors without USD. Exotics include emerging-market units such as BRL, often with higher transaction costs and lower depth.",
        ],
        bullets: [
          "EUR/USD — highest global turnover.",
          "GBP/USD — UK data and Bank of England cycles.",
          "USD/JPY — rate differentials and safe-haven flows.",
          "USD/CHF — frequently correlated with risk-off episodes.",
          "USD/BRL — Brazil macro, policy, and capital flows.",
        ],
      },
      {
        title: "Participants and instruments",
        paragraphs: [
          "Central banks set policy rates and communicate forward guidance; commercial banks service corporate hedges; asset managers manage currency overlays; active traders seek directional moves.",
        ],
        cards: [
          { title: "Spot", text: "Immediate exchange with standard T+2 settlement on majors." },
          { title: "Forwards / NDFs", text: "Dated delivery; NDFs common where convertibility is limited." },
          { title: "Options", text: "Asymmetric hedges with upfront premium." },
          { title: "Swaps", text: "Exchange of cash flows across currencies and tenors." },
        ],
      },
      {
        title: "Price drivers",
        paragraphs: [
          "Interest-rate differentials underpin carry strategies when investors borrow low-yield currencies to fund higher-yield exposure. Inflation surprises and labor data can force rapid repricing of policy paths.",
          "Current-account balances, portfolio flows, and political shocks reprice country risk overnight.",
        ],
      },
      {
        title: "Macro releases that matter",
        paragraphs: [
          "Central-bank decisions, minutes, and dot plots shift implied rate paths. CPI, PPI, and payroll data frequently trigger elevated volatility across G10 pairs.",
        ],
        bullets: [
          "OIS and policy-rate futures.",
          "PMI and consumer-confidence surveys.",
          "Trade balances and financial-account flows.",
          "Official reserve disclosures.",
        ],
      },
      {
        title: "Technical, fundamental, and carry frameworks",
        paragraphs: [
          "Technicians map trends and liquidity pools; fundamental desks weigh growth differentials and event risk. Carry exposure requires discipline—adverse spot moves can overwhelm coupon pickup, especially with leverage.",
        ],
      },
      {
        title: "Spread, swap, margin, and leverage",
        paragraphs: [
          "The spread is the embedded transaction cost. Overnight swaps reflect interest differentials. Margin deposits collateralize notional exposure; leverage magnifies both gains and losses.",
        ],
        disclaimer:
          "Leveraged FX can produce losses exceeding deposited capital. Understand margin calls, stops, and counterparty policies before trading.",
      },
      {
        title: "Counterparty, liquidity, and regulatory risk",
        paragraphs: [
          "Stress episodes can impair dealer liquidity. Offshore brokerage may offer different investor-protection regimes. Weekend gaps may skip through stop levels.",
        ],
      },
      {
        title: "Broker access and Research",
        paragraphs: [
          "Partner onboarding areas use project-configured integrations only, with risk warnings prominently displayed. Extend your macro and FX reading via Varejo Investidor Research.",
        ],
      },
    ],
  },

  etfs: {
    heroTitle: "ETFs | GLOBAL INVESTING",
    heroSubtitle:
      "Diversified access to countries, sectors, indices, commodities, and systematic investment strategies.",
    metaTitle: "ETFs | global investing | Varejo Investidor",
    metaDescription:
      "Exchange-traded funds: index tracking, sectors, commodities, fees, tracking error, and allocation risks.",
    sections: [
      {
        eyebrow: "Overview",
        title: "ETFs as allocation building blocks",
        paragraphs: [
          "ETFs are exchange-listed funds that track or replicate indices, sectors, factors, or baskets. They combine fund diversification with intraday tradability and published holdings.",
          "Authorized participants help keep market price aligned with net asset value through create/redeem mechanics, limiting but not eliminating persistent premiums or discounts.",
        ],
      },
      {
        title: "Mechanics in practice",
        paragraphs: [
          "The fund holds (or synthetically replicates) underlying assets. Investors trade shares like stocks. Distributions follow the fund prospectus and index methodology.",
        ],
        bullets: [
          "Creation/redemption in large institutional blocks.",
          "Daily portfolio or representative sampling disclosure.",
          "Exchange-hours liquidity with transparent tickers.",
          "Accumulating vs. distributing share classes.",
        ],
      },
      {
        title: "ETF families and institutional use cases",
        paragraphs: [
          "Products span broad beta, sectors, regions, commodities, fixed income, dividends, and alternatives. Desks use ETFs for rapid beta shifts, tactical hedges, and cash equitization.",
        ],
        cards: [
          { title: "Broad index", text: "Hundreds of names in one listed vehicle." },
          { title: "Sector", text: "Transparent rules with defined industry exposure." },
          { title: "Commodity", text: "Physical or derivative-backed metals and energy." },
          { title: "Fixed income", text: "Duration and credit exposure in listed format." },
        ],
      },
      {
        title: "What moves market price and NAV",
        paragraphs: [
          "Underlying constituents drive performance. Liquidity mismatches can widen premiums when baskets are hard to trade. FX matters when listing currency differs from economic exposure.",
        ],
      },
      {
        title: "Quality metrics",
        paragraphs: [
          "Tracking error gauges deviation from the benchmark. Average volume and bid-ask spread signal implementation cost. Total expense ratio compounds against long-horizon returns.",
        ],
        bullets: [
          "NAV vs. last traded price.",
          "Physical vs. synthetic replication.",
          "Securities lending policies.",
          "Top-holdings concentration.",
        ],
      },
      {
        title: "Educational ticker examples",
        paragraphs: [
          "Well-known tickers illustrate categories—not model portfolios. SPY and VOO reference broad U.S. large-cap indices; QQQ emphasizes Nasdaq growth; GLD and SLV illustrate precious-metals vehicles; EEM represents emerging-market equity exposure.",
        ],
        disclaimer:
          "SPY, QQQ, VOO, GLD, SLV, and EEM are cited solely as educational examples of ETF categories. They are not recommendations, solicitations, or personalized advice.",
      },
      {
        title: "Allocation and rebalancing",
        paragraphs: [
          "Core-satellite portfolios pair a broad ETF with tactical sleeves. Factor tilts use specialized listings. Periodic rebalancing controls risk drift.",
        ],
      },
      {
        title: "FX, concentration, and structural risks",
        paragraphs: [
          "Synthetic funds introduce swap counterparty risk. Commodity ETFs using futures may diverge from spot through roll costs. Cap-weighted indices can concentrate in a handful of megacaps.",
        ],
      },
      {
        eyebrow: "Categories",
        title: "Visual map of ETF types",
        paragraphs: [
          "Grouping products by objective clarifies benchmark, complexity, and cost before implementation.",
        ],
        visualGrid: [
          { label: "U.S. equity", detail: "e.g., S&P 500 trackers (SPY, VOO as references)." },
          { label: "Technology", detail: "e.g., QQQ — growth exposure via Nasdaq-linked indices." },
          { label: "Gold", detail: "e.g., GLD — bullion-backed rules per prospectus." },
          { label: "Silver", detail: "e.g., SLV — listed precious-metal commodity ETF." },
          { label: "Emerging markets", detail: "e.g., EEM — diversified non-U.S. developing exposure." },
          { label: "Bonds", detail: "Treasury, corporate, and inflation-linked index ETFs." },
        ],
      },
      {
        title: "Research continuation",
        paragraphs: [
          "See global allocation notes, rate scenarios, and custody guides in Varejo Investidor Research. Always read prospectuses, fees, and local tax treatment.",
        ],
      },
    ],
  },

  ouro: {
    heroTitle: "GOLD | GLOBAL STORE OF VALUE",
    heroSubtitle:
      "A metal that spans economic cycles, monetary regimes, and geopolitical realignments.",
    metaTitle: "Gold | global store of value | Varejo Investidor",
    metaDescription:
      "Monetary history of gold, central-bank reserves, dollar dynamics, industrial demand, and exposure channels.",
    sections: [
      {
        eyebrow: "Overview",
        title: "Gold in the modern monetary order",
        paragraphs: [
          "Gold backed historical currency systems; today it remains a reserve asset for sovereigns and a perceived hedge against uncertainty. Annual supply depends on mining and recycling; demand spans jewelry, technology, investment, and official-sector purchases.",
          "Unlike equities or bonds, bullion pays no coupon—its price reflects views on real rates, fiat credibility, and crisis risk.",
        ],
      },
      {
        title: "How gold markets function",
        paragraphs: [
          "Liquidity spans spot bullion, listed futures, and exchange-traded products. London and New York benchmarks anchor reference pricing globally. Good Delivery bars meet strict fineness standards with vault custody.",
          "XAU/USD quotes troy ounces in dollars; non-U.S. investors should factor FX when measuring local returns.",
        ],
      },
      {
        eyebrow: "Participants",
        title: "Central banks, miners, and investors",
        paragraphs: [
          "Official-sector buyers diversify reserves and signal autonomy. Miners adjust capex with price incentives. Physically backed ETFs and allocated programs channel institutional and retail flows with varying transparency.",
        ],
        bullets: [
          "Reported net official-sector purchases.",
          "Major mining jurisdictions across continents.",
          "Refinery accreditation and chain of integrity.",
          "Authorized bullion distributors.",
        ],
      },
      {
        title: "Drivers of the gold price",
        paragraphs: [
          "Low or negative real yields reduce the opportunity cost of holding metal. Inflation concerns and sovereign debt levels support defensive demand. The U.S. dollar often moves inversely to dollar-denominated gold.",
          "Geopolitical flare-ups can spike safe-haven bids, though reversals may follow once headlines fade.",
        ],
      },
      {
        title: "Macro and market indicators",
        paragraphs: [
          "Breakeven inflation and TIPS yields proxy real rates. U.S. CPI and Federal Reserve communication frequently move sessions. ETF inventory disclosures illustrate investment flows without replacing aggregated official statistics.",
        ],
      },
      {
        title: "Strategic and tactical roles",
        paragraphs: [
          "Strategic weights may damp portfolio volatility in stress periods but do not prevent drawdowns. Jewelry and industrial use provide a structural demand pillar distinct from speculative positioning.",
        ],
      },
      {
        title: "Risk management",
        paragraphs: [
          "Extended sideways markets impose opportunity cost. Leveraged products require margin discipline. Unverified physical gold and storage risk matter outside regulated channels.",
        ],
      },
      {
        eyebrow: "Channels",
        title: "Ways to gain gold exposure",
        paragraphs: [
          "Each channel balances convenience, custody, cost, and tax differently.",
        ],
        visualGrid: [
          { label: "Physical", detail: "Bars and coins with secure vaulting." },
          { label: "ETFs", detail: "Listed shares backed by audited inventories." },
          { label: "Futures", detail: "Margin contracts with roll across tenors." },
          { label: "Miners", detail: "Equity beta with operating and cost risk." },
          { label: "Allocated", detail: "Institutional programs with titled metal." },
        ],
      },
      {
        title: "Gold, the dollar, and reserves",
        paragraphs: [
          "Because reserves are largely dollar-denominated, U.S. monetary policy and USD strength influence global bullion. Emerging-market reserve diversification can gradually shift official flows—tracked in public multilateral reports.",
        ],
      },
      {
        title: "Research",
        paragraphs: [
          "Deepen inflation, geopolitical, and wealth-preservation reading in Varejo Investidor Research. Educational tone—no simulated live quotes.",
        ],
        disclaimer:
          "Gold and related derivatives are volatile and involve custody costs. Assess suitability, tax, and regulation.",
      },
    ],
  },

  petroleo: {
    heroTitle: "OIL | ENERGY AND GEOPOLITICS",
    heroSubtitle:
      "A strategic resource shaping inflation, trade, industry, and the balance of power among nations.",
    metaTitle: "Oil | energy and geopolitics | Varejo Investidor",
    metaDescription:
      "International oil: Brent, WTI, OPEC+, supply, inventories, logistics, and macro spillovers.",
    sections: [
      {
        eyebrow: "Overview",
        title: "Energy as a strategic variable",
        paragraphs: [
          "Oil remains central to transport, petrochemicals, and industrial supply chains. Benchmark Brent and WTI anchor physical and derivative markets; spreads between them reflect quality, logistics, and regional events.",
          "Public agencies publish periodic supply-demand balances that inform expectations without replacing exchange price formation.",
        ],
      },
      {
        title: "How the international market works",
        paragraphs: [
          "Production is sold through term contracts, spot deals, and financial instruments. Refineries match crude grades to product yields; crack spreads measure refinery margins.",
        ],
      },
      {
        title: "Producers, cartel, and refiners",
        paragraphs: [
          "OPEC and OPEC+ coordinate output among members; surprises in communiqués move futures curves. The United States, Saudi Arabia, Russia, Canada, and Brazil are prominent producers across cycles.",
        ],
        bullets: [
          "Spare capacity and upstream investment.",
          "Offshore, shale, and pre-salt cost curves.",
          "Refining hubs in Asia, the Americas, and Europe.",
          "Trading houses and NOCs as global intermediaries.",
        ],
      },
      {
        title: "Supply, demand, and inventories",
        paragraphs: [
          "Transport and industrial activity drive product demand; seasonality affects gasoline and heating distillates. Inventory reports in major economies often trigger volatility when they deviate from consensus.",
        ],
      },
      {
        title: "Geopolitics, routes, and sanctions",
        paragraphs: [
          "Chokepoints such as the Strait of Hormuz concentrate disruption risk. Sanctions reroute barrels and widen regional spreads. Conflict can add immediate risk premia.",
        ],
      },
      {
        title: "Indicators and public data",
        paragraphs: [
          "Commercial stocks, refinery utilization, and rig counts are widely monitored. Global growth forecasts contextualize demand. Energy components feed directly into consumer inflation baskets.",
        ],
      },
      {
        title: "Instruments and sector exposure",
        paragraphs: [
          "Brent and WTI futures enable hedging or speculation with margin. Energy ETFs may hold equities or contracts with distinct behavior from spot. Integrated and E&P equities embed breakeven costs and hedge books.",
        ],
      },
      {
        title: "Volatility and energy transition",
        paragraphs: [
          "Single-session moves can be extreme on geopolitical headlines. Long-term decarbonization trends may alter structural demand, requiring periodic thesis review.",
        ],
      },
      {
        eyebrow: "Value chain",
        title: "From wellhead to end consumer",
        paragraphs: [
          "Mapping the chain highlights bottlenecks that explain price spikes during logistical stress.",
        ],
        visualGrid: [
          { label: "Exploration", detail: "Licensing, drilling, and appraisal." },
          { label: "Production", detail: "Lifting, treating, and crude quality." },
          { label: "Transport", detail: "Pipelines, tankers, and storage." },
          { label: "Refining", detail: "Gasoline, diesel, jet, and petrochemicals." },
          { label: "Distribution", detail: "Terminals and wholesale networks." },
          { label: "Consumption", detail: "Transport, industry, and power." },
        ],
      },
      {
        title: "Research",
        paragraphs: [
          "Continue with energy scenarios, inflation linkages, and commodity education in Varejo Investidor Research. No fabricated live prices.",
        ],
        disclaimer:
          "Energy commodities are highly volatile; derivatives can amplify losses. Consider environmental regulation.",
      },
    ],
  },

  cripto: {
    heroTitle: "CRYPTOCURRENCIES | GLOBAL DIGITAL ECONOMY",
    heroSubtitle:
      "Emerging financial infrastructure built on decentralized networks, digital assets, and blockchain technology.",
    metaTitle: "Cryptocurrencies | global digital economy | Varejo Investidor",
    metaDescription:
      "Blockchain, Bitcoin, Ethereum, stablecoins, DeFi, custody, regulation, and digital-asset risks.",
    showCryptoBroker: true,
    sections: [
      {
        eyebrow: "Overview",
        title: "Digital assets on open networks",
        paragraphs: [
          "Cryptocurrencies are native tokens of distributed ledgers secured by cryptography rather than a single centralized issuer. Bitcoin introduced programmatic scarcity; Ethereum generalized execution via smart contracts.",
          "The stack includes exchanges, custodians, validators, developers, and DeFi protocols that recreate financial functions permissionlessly—with material technical and regulatory risk.",
        ],
      },
      {
        title: "How blockchain works",
        paragraphs: [
          "Transactions batch into blocks linked by cryptographic hashes. Consensus rules—proof-of-work, proof-of-stake, or variants—determine who may propose blocks. Full nodes enforce protocol rules.",
        ],
        bullets: [
          "Public-private key pairs control ownership.",
          "Fees compensate validators or miners.",
          "Forks may spawn competing chains.",
          "Layer-2 networks scale cost and throughput.",
        ],
      },
      {
        title: "Participants and infrastructure",
        paragraphs: [
          "Centralized exchanges aggregate liquidity and fiat on-ramps; DEXs trade via on-chain liquidity pools. Qualified custodians segregate assets; self-custody places recovery responsibility entirely on the user.",
        ],
        cards: [
          { title: "CEX", text: "Off-chain matching with KYC and banking rails." },
          { title: "DEX", text: "Non-custodial trading with smart-contract risk." },
          { title: "Wallets", text: "Hot, cold, and hardware devices; seed phrases are critical." },
          { title: "Institutional custody", text: "Insurance, audit, and policy controls for digital assets." },
        ],
      },
      {
        title: "Price and adoption drivers",
        paragraphs: [
          "Liquidity conditions, Bitcoin halving cycles, network upgrades, and regulated product access shape narratives. Stablecoin issuance and redemption move dollar liquidity on-chain.",
          "Regulatory clarity, bans, or reserve requirements shift institutional participation. Bridge hacks and exploits can destroy confidence abruptly.",
        ],
      },
      {
        title: "On-chain and macro context",
        paragraphs: [
          "Metrics such as active addresses, hash rate, staked supply, and DeFi TVL describe usage—not price forecasts. Correlation with traditional risk assets can rise during broad deleveraging.",
        ],
        bullets: [
          "Network fees and congestion.",
          "Token emissions and unlock schedules.",
          "Exchange inflow vs. cold-storage trends.",
          "Fiat monetary policy as backdrop.",
        ],
      },
      {
        title: "DeFi and tokenization",
        paragraphs: [
          "DeFi offers lending, trading, and yield via open protocols, often with automated liquidation. Tokenization experiments map real-world assets on-chain subject to evolving legal frameworks.",
        ],
      },
      {
        title: "Educational opportunity—and limits",
        paragraphs: [
          "Studying tokenomics, governance, and audits reduces information asymmetry but not risk. Long-horizon views require adoption conviction; short-term trading demands rigorous volatility control.",
        ],
      },
      {
        title: "Volatility, custody, and liquidity risk",
        paragraphs: [
          "Lost private keys are unrecoverable. Smart-contract bugs can drain pools. Leveraged crypto derivatives trigger margin calls. Illiquid tokens face manipulation and high slippage.",
        ],
        disclaimer:
          "Digital assets are not legal tender in most jurisdictions. Capital is not guaranteed. Use only officially configured partner integrations.",
      },
      {
        eyebrow: "Stack",
        title: "Layers of the digital economy",
        paragraphs: [
          "Separating layers clarifies distinct failure modes from hardware through fiat ramps.",
        ],
        visualGrid: [
          { label: "Layer 0", detail: "Hardware, power, and connectivity." },
          { label: "Layer 1", detail: "Base chains—Bitcoin, Ethereum, peers." },
          { label: "Layer 2", detail: "Rollups and scaling channels." },
          { label: "Protocols", detail: "DeFi, NFTs, and decentralized identity." },
          { label: "Applications", detail: "Wallets, front ends, aggregators." },
          { label: "Fiat ramps", detail: "On-ramps, off-ramps, stablecoins." },
        ],
      },
      {
        title: "Partner exchanges and Research",
        paragraphs: [
          "Onboarding cards rely on existing partner integrations with visible risk disclosures. Extend digital-security and macro education via Varejo Investidor Research.",
        ],
      },
    ],
  },
};
