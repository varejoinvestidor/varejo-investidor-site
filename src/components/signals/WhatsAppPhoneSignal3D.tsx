"use client";

import type { ReactNode } from "react";

type Props = {
  contactName?: string;
  signalId: string;
  asset: string;
  direction: string;
  entry: string;
  takeProfit: string;
  stopLoss: string;
  time?: string;
  className?: string;
  /** Índice (US500) ou par Forex — afeta o cartão de trade no topo da bolha. */
  variant?: "forex" | "index";
  /** 0 idle · 1 notificação · 2 mensagem · 3 análise (controlado pelo demo). */
  phase?: number;
};

export function WhatsAppPhoneSignal3D({
  contactName = "Varejo Investidor",
  signalId,
  asset,
  direction,
  entry,
  takeProfit,
  stopLoss,
  time = "21:31",
  className = "",
  variant = "forex",
  phase = 3,
}: Props) {
  const dirUpper = direction.toUpperCase();
  const isSell = dirUpper.includes("VENDA") || dirUpper.includes("SELL");
  const assetLine = asset.match(/(COMPRA|VENDA|BUY|SELL)/i)
    ? `🔔 ${asset.replace(/\s[\d.]+$/, "").trim()} ${entry}`
    : `🔔 ${asset} ${dirUpper} ${entry}`;
  const showToast = phase >= 1;
  const showMessage = phase >= 2;
  const toastClass = phase === 1 ? "wa-notif-toast wa-notif-toast--pop" : "wa-notif-toast";

  return (
    <div className={`wa-phone-scene ${className}`} aria-label="Notificação de sinal no WhatsApp">
      <div className="wa-phone-tilt">
        <div className="wa-phone-device">
          <div className="wa-phone-notch" aria-hidden />
          <div className="wa-phone-status">
            <span>{time}</span>
            <span className="wa-phone-status-icons" aria-hidden>
              ◉ ◉ ▮
            </span>
          </div>
          <div className="wa-phone-header">
            <button type="button" className="wa-phone-back" aria-hidden>
              ‹
            </button>
            <div className="wa-phone-avatar">VI</div>
            <div className="wa-phone-contact">
              <p className="wa-phone-contact-name">{contactName}</p>
              <p className="wa-phone-contact-sub">online</p>
            </div>
          </div>
          <div className="wa-phone-chat">
            {showMessage ? (
              <WaMessageBubble>
                {variant === "index" ? (
                  <Us500TradeCard entry={entry} takeProfit={takeProfit} stopLoss={stopLoss} isSell={isSell} />
                ) : (
                  <div className="wa-bubble-chart" aria-hidden>
                    <p className="wa-chart-title">
                      {asset} {dirUpper.toLowerCase()} 1
                    </p>
                    <p className="wa-chart-sub">Gold vs US Dollar</p>
                    <p className="wa-chart-prices">
                      <span>{entry}</span>
                      <span className="wa-chart-arrow">→</span>
                      <span>{takeProfit}</span>
                    </p>
                  </div>
                )}
                <div className="wa-bubble-text">
                  <p>Sinal: {signalId}</p>
                  <p>{assetLine || `🔔 ${asset} ${dirUpper}`}</p>
                  <p>🎯 Take Profit: {takeProfit}</p>
                  <p>🚫 Stop Loss: {stopLoss}</p>
                </div>
                <p className="wa-bubble-meta">
                  {time}
                  <span className="wa-ticks" aria-hidden>
                    ✓✓
                  </span>
                </p>
              </WaMessageBubble>
            ) : (
              <p className="wa-chat-placeholder">Aguardando sinal…</p>
            )}
          </div>
          <div className="wa-phone-input" aria-hidden>
            <span className="wa-input-pill">Mensagem</span>
          </div>
        </div>
        {showToast ? (
          <div className={toastClass} aria-hidden>
            <span className="wa-notif-icon">VI</span>
            <div>
              <p className="wa-notif-title">WhatsApp</p>
              <p className="wa-notif-body">
                {contactName}: Sinal {signalId}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Us500TradeCard({
  entry,
  takeProfit,
  stopLoss,
  isSell,
}: {
  entry: string;
  takeProfit: string;
  stopLoss: string;
  isSell: boolean;
}) {
  return (
    <div className="wa-bubble-chart wa-bubble-chart--index" aria-hidden>
      <p className="wa-chart-title">
        US500 <span className={isSell ? "wa-chart-sell" : "wa-chart-buy"}>{isSell ? "sell 10" : "buy 10"}</span>
      </p>
      <p className="wa-chart-sub">US SPX 500 Cash Index · #25670079</p>
      <p className="wa-chart-prices">
        <span>{entry}</span>
        <span className="wa-chart-arrow">→</span>
        <span>{(Number(entry) + (isSell ? 0.47 : -0.3)).toFixed(2)}</span>
      </p>
      <p className="wa-chart-delta">{isSell ? "-4.70" : "+3.20"}</p>
      <div className="wa-mini-chart">
        <span className="wa-mini-chart-bar wa-mini-chart-bar--teal" style={{ height: "42%" }} />
        <span className="wa-mini-chart-bar wa-mini-chart-bar--red" style={{ height: "68%" }} />
        <span className="wa-mini-chart-bar wa-mini-chart-bar--teal" style={{ height: "55%" }} />
        <span className="wa-mini-chart-bar wa-mini-chart-bar--red" style={{ height: "72%" }} />
        <span className="wa-mini-chart-line wa-mini-chart-line--red" />
        <span className="wa-mini-chart-line wa-mini-chart-line--blue" />
      </div>
      <p className="wa-chart-levels">
        <span className="wa-chart-sl">SL {stopLoss}</span>
        <span className="wa-chart-dot"> · </span>
        <span className="wa-chart-tp">TP {takeProfit}</span>
      </p>
    </div>
  );
}

function WaMessageBubble({ children }: { children: ReactNode }) {
  return (
    <div className="wa-bubble-wrap wa-bubble-wrap--in">
      <span className="wa-bubble-tail" aria-hidden />
      <div className="wa-bubble">{children}</div>
    </div>
  );
}
