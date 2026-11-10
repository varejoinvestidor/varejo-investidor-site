"use client";

import { useState } from "react";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
};

export function PasswordField({ id, name, label, autoComplete = "current-password", required }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/60">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          className="w-full rounded border border-line/20 bg-[#0a0a0a] py-3 pl-4 pr-12 text-paper outline-none ring-gold/40 focus:ring-2"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-2 text-paper/50 transition hover:text-gold"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        >
          {visible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10 10 0 0120 12c.6.7 1.1 1.5 1.5 2.3M6.7 6.7A9.96 9.96 0 004 12c1.3 2.7 3.6 5 6.8 6.3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
