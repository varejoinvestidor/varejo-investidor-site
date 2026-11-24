"use client";

import { FormEvent, useState } from "react";
import type { PartnerCategory, PartnersCopy } from "../../partners/copy";

type Props = {
  id: string;
  category: PartnerCategory;
  copy: PartnersCopy;
  locale: string;
  extra?: Array<"city" | "experience" | "structure" | "investment" | "proposal" | "specialty" | "history" | "links" | "presentation">;
};

export function PartnerForm({ id, category, copy, locale, extra = [] }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error" | "pending">("idle");
  const [message, setMessage] = useState("");
  const f = copy.form;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("company_site") ?? "")) return;
    if (!form.get("consent")) {
      setStatus("error");
      setMessage(f.required);
      return;
    }
    setStatus("sending");
    setMessage("");
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/partners/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, category, locale }),
      });
      const data = (await res.json()) as { error?: string; pending?: boolean };
      if (res.status === 503) {
        setStatus("pending");
        setMessage(data.error || f.pending);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || f.error);
        return;
      }
      setStatus("ok");
      setMessage(f.success);
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage(f.error);
    }
  }

  const field = "mt-1 w-full border border-white/15 bg-black/40 px-3 py-3 text-sm text-paper outline-none focus:border-gold/50";

  return (
    <form id={id} onSubmit={onSubmit} className="mt-8 grid gap-4 border border-white/10 bg-black/20 p-5 md:p-6">
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.name}
          <input name="name" required className={field} />
        </label>
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.email}
          <input name="email" type="email" required className={field} />
        </label>
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.country}
          <input name="country" required className={field} />
        </label>
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.language}
          <input name="language" required defaultValue={locale} className={field} />
        </label>
        {extra.includes("city") ? (
          <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
            {f.city}
            <input name="city" required className={field} />
          </label>
        ) : null}
        {extra.includes("specialty") ? (
          <label className="text-xs uppercase tracking-[0.16em] text-paper/55 md:col-span-2">
            {f.specialty}
            <input name="specialty" required className={field} />
          </label>
        ) : null}
      </div>
      {extra.includes("experience") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.experience}
          <textarea name="experience" required rows={3} className={field} />
        </label>
      ) : null}
      {extra.includes("history") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.history}
          <textarea name="history" required rows={3} className={field} />
        </label>
      ) : null}
      {extra.includes("structure") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.structure}
          <textarea name="structure" required rows={3} className={field} />
        </label>
      ) : null}
      {extra.includes("investment") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.investment}
          <input name="investment" className={field} />
        </label>
      ) : null}
      {extra.includes("proposal") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.proposal}
          <textarea name="proposal" required rows={4} className={field} />
        </label>
      ) : null}
      {extra.includes("links") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.links}
          <textarea name="links" rows={2} className={field} />
        </label>
      ) : null}
      {extra.includes("presentation") ? (
        <label className="text-xs uppercase tracking-[0.16em] text-paper/55">
          {f.presentation}
          <textarea name="presentation" required rows={4} className={field} />
        </label>
      ) : null}
      <label className="flex items-start gap-3 text-sm leading-6 text-paper/70">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>{f.consent}</span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full border border-gold bg-gold px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-ink disabled:opacity-60 md:w-auto"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>
      {message ? (
        <p className={`text-sm ${status === "ok" ? "text-rise" : "text-fall"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
