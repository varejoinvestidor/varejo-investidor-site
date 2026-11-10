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
};

export function WhatsAppPhoneSignal3D({
  contactName = "Varejo Investidor",
  signalId,
  asset,
  direction,
  entry,
  takeProfit,
  stopLoss,
  time = "21:53",
  className = "",
}: Props) {
  const dirUpper = direction.toUpperCase();
  const assetLine = `🔔 ${asset} ${dirUpper} ${entry}`;

  return (
    <div className={`wa-phone-scene ${className}`} aria-label="Notificação de sinal no WhatsApp">
      <div className="wa-phone-tilt">
        <div className="wa-phone-device">
          <div className="wa-phone-notch" aria-hidden />
          <div className="wa-phone-status">
            <span>21:53</span>
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
            <WaMessageBubble>
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
              <div className="wa-bubble-text">
                <p>Sinal: {signalId}</p>
                <p>{assetLine}</p>
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
          </div>
          <div className="wa-phone-input" aria-hidden>
            <span className="wa-input-pill">Mensagem</span>
          </div>
        </div>
        <div className="wa-notif-toast" aria-hidden>
          <span className="wa-notif-icon">VI</span>
          <div>
            <p className="wa-notif-title">WhatsApp</p>
            <p className="wa-notif-body">{contactName}: Sinal {signalId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaMessageBubble({ children }: { children: ReactNode }) {
  return (
    <div className="wa-bubble-wrap">
      <span className="wa-bubble-tail" aria-hidden />
      <div className="wa-bubble">{children}</div>
    </div>
  );
}
