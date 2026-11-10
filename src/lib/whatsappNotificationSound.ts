/** Tom curto estilo notificação (Web Audio — sem arquivo externo). */
export function playWhatsAppNotification() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    oscillator.frequency.setValueAtTime(1046.5, now);
    oscillator.frequency.setValueAtTime(784, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    oscillator.start(now);
    oscillator.stop(now + 0.34);
    void ctx.close();
  } catch {
    /* autoplay policy ou AudioContext indisponível */
  }
}
