import type { Locale } from "../i18n";

export function LocaleFlagIcon({ locale, className }: { locale: Locale; className?: string }) {
  const common = className ?? "h-3 w-4 shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.14)]";

  if (locale === "pt") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#159447" />
        <path d="M8 1.6 14 6 8 10.4 2 6Z" fill="#f2c230" />
        <circle cx="8" cy="6" r="2.25" fill="#183a8f" />
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#f7f3eb" />
        {[0, 2, 4, 6, 8, 10].map((y) => (
          <rect key={y} y={y} width="16" height="1" fill="#b92735" />
        ))}
        <rect width="7" height="6" fill="#1f3f82" />
      </svg>
    );
  }

  if (locale === "es") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#c4212e" />
        <rect y="3" width="16" height="6" fill="#f1c232" />
      </svg>
    );
  }

  if (locale === "fr") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="5.33" height="12" fill="#1f3f82" />
        <rect x="5.33" width="5.34" height="12" fill="#f7f3eb" />
        <rect x="10.67" width="5.33" height="12" fill="#c8232c" />
      </svg>
    );
  }

  if (locale === "it") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="5.33" height="12" fill="#009246" />
        <rect x="5.33" width="5.34" height="12" fill="#f7f3eb" />
        <rect x="10.67" width="5.33" height="12" fill="#ce2b37" />
      </svg>
    );
  }

  if (locale === "de") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="4" fill="#111" />
        <rect y="4" width="16" height="4" fill="#dd0000" />
        <rect y="8" width="16" height="4" fill="#ffce00" />
      </svg>
    );
  }

  if (locale === "fa") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="4" fill="#239f40" />
        <rect y="4" width="16" height="4" fill="#f7f3eb" />
        <rect y="8" width="16" height="4" fill="#da0000" />
        <circle cx="8" cy="6" r="1.05" fill="#da0000" />
      </svg>
    );
  }

  if (locale === "hi") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="4" fill="#ff9933" />
        <rect y="4" width="16" height="4" fill="#f7f3eb" />
        <rect y="8" width="16" height="4" fill="#138808" />
        <circle cx="8" cy="6" r="1.3" fill="none" stroke="#1a3c8f" strokeWidth="0.55" />
      </svg>
    );
  }

  if (locale === "ar") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#0f6f42" />
        <path d="M4.4 6.2a2 2 0 1 0 0-.4 1.45 1.45 0 1 1 0 .4Z" fill="#f7f3eb" />
        <rect x="6.8" y="5.75" width="5.3" height="0.55" fill="#f7f3eb" />
      </svg>
    );
  }

  if (locale === "id") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="6" fill="#ce1126" />
        <rect y="6" width="16" height="6" fill="#f7f3eb" />
      </svg>
    );
  }

  if (locale === "vi") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#da251d" />
        <path d="M8 2.05 8.9 4.85h2.95L9.45 6.55l.92 2.8L8 7.62 5.63 9.35l.92-2.8-2.4-1.7H7.1Z" fill="#ffdd00" />
      </svg>
    );
  }

  if (locale === "th") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#a51931" />
        <rect y="2" width="16" height="8" fill="#f7f3eb" />
        <rect y="4" width="16" height="4" fill="#2d2a7f" />
      </svg>
    );
  }

  if (locale === "ru") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="4" fill="#f7f3eb" />
        <rect y="4" width="16" height="4" fill="#244aa5" />
        <rect y="8" width="16" height="4" fill="#d52b1e" />
      </svg>
    );
  }

  if (locale === "ur") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#0f6f42" />
        <rect width="3.2" height="12" fill="#f7f3eb" />
        <path d="M9.2 6.1a2.4 2.4 0 1 1 0-.2 1.65 1.65 0 1 0 0 .2Z" fill="#f7f3eb" />
        <path d="M10.9 4.55 11.3 5.55h1.05l-.85.62.33 1-.93-.58-.9.58.32-1-.84-.62h1.04Z" fill="#f7f3eb" />
      </svg>
    );
  }

  if (locale === "bn") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#006a4e" />
        <circle cx="7" cy="6" r="3" fill="#f42a41" />
      </svg>
    );
  }

  if (locale === "ja") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#f7f3eb" />
        <circle cx="8" cy="6" r="3" fill="#bc002d" />
      </svg>
    );
  }

  if (locale === "ko") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="12" fill="#f7f3eb" />
        <circle cx="8" cy="6" r="2.7" fill="#cd2e3a" />
        <path d="M5.65 7.55a2.7 2.7 0 0 0 4.7-1.1 1.35 1.35 0 0 1-2.7 0 1.35 1.35 0 0 0-2 1.1Z" fill="#0047a0" />
      </svg>
    );
  }

  if (locale === "zh") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="6" fill="#ef3340" />
        <rect y="6" width="16" height="6" fill="#f7f3eb" />
        <path d="M4.4 3.8a2.05 2.05 0 1 0 0 4.4 2.45 2.45 0 1 1 0-4.4Z" fill="#f7f3eb" />
        <circle cx="7.4" cy="2.4" r="0.45" fill="#f7f3eb" />
        <circle cx="9" cy="3.2" r="0.45" fill="#f7f3eb" />
        <circle cx="9" cy="5" r="0.45" fill="#f7f3eb" />
        <circle cx="7.4" cy="5.8" r="0.45" fill="#f7f3eb" />
        <circle cx="8.1" cy="4.1" r="0.45" fill="#f7f3eb" />
      </svg>
    );
  }

  if (locale === "pl") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="6" fill="#f7f3eb" />
        <rect y="6" width="16" height="6" fill="#dc143c" />
      </svg>
    );
  }

  if (locale === "tl") {
    return (
      <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
        <rect width="16" height="6" fill="#0038a8" />
        <rect y="6" width="16" height="6" fill="#ce1126" />
        <path d="M0 0 7.2 6 0 12Z" fill="#f7f3eb" />
        <circle cx="2.25" cy="6" r="0.78" fill="#fcd116" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 12" className={common} aria-hidden="true">
      <rect width="16" height="12" fill="#c8232c" />
      <path d="M7.2 6a2.45 2.45 0 1 0 0 .1 1.72 1.72 0 1 1 0-.1Z" fill="#f7f3eb" />
      <path d="M9.2 6 10.8 5.5 9.8 6.9V5.1l1 1.4Z" fill="#f7f3eb" />
    </svg>
  );
}
