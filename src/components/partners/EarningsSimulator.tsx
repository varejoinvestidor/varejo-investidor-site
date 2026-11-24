"use client";

import { useMemo, useState } from "react";
import type { CommercialCopy } from "../../partners/commercial";

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function splitSale(gross: number, affiliateRate: number, leaderRate: number, model: "A" | "B") {
  const affiliate = gross * (affiliateRate / 100);
  if (model === "A") {
    const balance = gross - affiliate;
    const leader = balance * (leaderRate / 100);
    return { affiliate, leader, house: balance - leader, overflow: false };
  }
  const leader = gross * (leaderRate / 100);
  const rawHouse = gross - affiliate - leader;
  return { affiliate, leader, house: Math.max(0, rawHouse), overflow: rawHouse < 0 };
}

export function EarningsSimulator({ copy }: { copy: CommercialCopy }) {
  const [product, setProduct] = useState(0);
  const [price, setPrice] = useState(1000);
  const [quantity, setQuantity] = useState(1);
  const [affiliateRate, setAffiliateRate] = useState(40);
  const [leaderRate, setLeaderRate] = useState(40);
  const [model, setModel] = useState<"A" | "B">("A");

  const result = useMemo(() => {
    const gross = Math.max(0, price) * Math.max(0, quantity);
    const split = splitSale(gross, affiliateRate, leaderRate, model);
    return { gross, ...split };
  }, [price, quantity, affiliateRate, leaderRate, model]);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <form className="grid gap-4 border border-white/10 p-5" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1 text-xs uppercase tracking-[0.14em] text-paper/55">
          {copy.product}
          <select value={product} onChange={(event) => setProduct(Number(event.target.value))} className="border border-white/15 bg-transparent px-3 py-3 text-sm normal-case tracking-normal text-paper">
            {copy.products.map((item, index) => (
              <option key={item} value={index}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <NumberField label={copy.price} value={price} min={0} step={50} onChange={setPrice} prefix="R$" />
        <NumberField label={copy.quantity} value={quantity} min={0} step={1} onChange={setQuantity} />
        <NumberField label={copy.affiliateRate} value={affiliateRate} min={0} max={100} step={1} onChange={setAffiliateRate} suffix="%" />
        <NumberField label={copy.leaderRate} value={leaderRate} min={0} max={100} step={1} onChange={setLeaderRate} suffix="%" />
        <fieldset className="grid gap-2">
          <legend className="text-xs uppercase tracking-[0.14em] text-paper/55">{copy.model}</legend>
          <label className="flex gap-2 text-sm text-paper/80">
            <input type="radio" name="model" checked={model === "A"} onChange={() => setModel("A")} />
            {copy.modelA}
          </label>
          <label className="flex gap-2 text-sm text-paper/80">
            <input type="radio" name="model" checked={model === "B"} onChange={() => setModel("B")} />
            {copy.modelB}
          </label>
        </fieldset>
        <p className="text-xs leading-6 text-paper/50">{model === "A" ? copy.modelAHelp : copy.modelBHelp}</p>
      </form>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-gold">{copy.products[product]}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <Result label={copy.gross} value={money(result.gross)} />
          <Result label={copy.affiliateOut} value={money(result.affiliate)} />
          <Result label={copy.leaderOut} value={money(result.leader)} />
          <Result label={copy.houseOut} value={money(result.house)} />
          <Result label={copy.monthly} value={money(result.gross)} />
          <Result label={copy.annual} value={money(result.gross * 12)} />
        </dl>
        {result.overflow ? <p className="mt-4 text-sm text-gold">{copy.overflow}</p> : null}
        <div className="mt-6 border border-white/10 p-4">
          <p className="text-sm font-bold text-paper">{copy.exampleTitle}</p>
          <p className="mt-2 text-sm leading-7 text-paper/65">{copy.exampleText}</p>
        </div>
        <p className="mt-4 text-xs leading-6 text-paper/45">{copy.disclaimer}</p>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max?: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="grid gap-1 text-xs uppercase tracking-[0.14em] text-paper/55">
      {label}
      <span className="flex items-center gap-2 border border-white/15 px-3">
        {prefix ? <span className="text-sm normal-case text-paper/50">{prefix}</span> : null}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full bg-transparent py-3 text-sm normal-case tracking-normal text-paper outline-none"
        />
        {suffix ? <span className="text-sm text-paper/50">{suffix}</span> : null}
      </span>
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 px-4 py-4">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-paper/45">{label}</dt>
      <dd className="mt-2 font-serif text-2xl text-paper">{value}</dd>
    </div>
  );
}
