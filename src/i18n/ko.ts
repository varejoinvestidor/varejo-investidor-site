import { en } from "./en";

export const ko = {
  ...en,
  locale: "KO",
  nav: {
    ...en.nav,
    home: "홈",
    signals: "신호",
    education: "교육",
    services: "서비스",
    about: "소개",
    access: "Elite 참여",
  },
  tickerLabel: "글로벌 시장",
  hero: {
    ...en.hero,
    title: "글로벌 투자와 자산 형성에 필요한 모든 것을 한 곳에서.",
    text: "글로벌 금융시장을 이해하고 경제 분석을 배우며 자국의 경계를 넘어 자산을 구축하는 전략을 개발하세요.",
    primary: "개미 채널 참여",
    secondary: "서비스 보기",
  },
  freeChannel: {
    ...en.freeChannel,
    title: "무료 개미 채널",
    text: "경제 분석, 교육 콘텐츠, 글로벌 시장 업데이트를 WhatsApp에서 무료로 받아보세요.",
    button: "개미 채널 참여",
    eyebrow: "무료 입장",
  },
  brokers: {
    ...en.brokers,
    forex: { ...en.brokers.forex, button: "FXPro 계좌 개설", link: "https://direct.fxpro.group/en/partner/77014650?platform=web" },
  },
  disclaimer: {
    ...en.disclaimer,
    title: "교육 및 위험 고지",
    text: "Varejo Investidor의 콘텐츠는 교육 목적이며 투자 자문, 수익 보장 또는 개인별 추천이 아닙니다. 금융 시장에는 위험이 있으며 Forex, 암호화폐, 주식, 원자재 및 파생상품 거래에서는 손실이 발생할 수 있습니다.",
  },
  footer: "금융 교육, 글로벌 시장 분석, 리스크 관리, 장기 자산 형성을 위한 Varejo Investidor 생태계.",
};
