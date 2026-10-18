"use client";

import { useId, useMemo, useState } from "react";
import { CalculatorBlock } from "@/components/facts/CalculatorBlock";
import { calculate, currencies, formatMoney, formatRate, type CpqlInput, type Currency, type FieldKey } from "./cpql";

const empty: CpqlInput = { spend: "", leads: "", qualified: "", closed: "" };
/** Obviously illustrative round numbers, the same as the worked example on the page. */
const example: CpqlInput = { spend: "100000", leads: "400", qualified: "100", closed: "10" };

const fields: { key: FieldKey; label: string; hint: string; mode: "decimal" | "numeric"; optional?: boolean }[] = [
  { key: "spend", label: "Ad spend", hint: "Total spend for the period, before agency fees. Up to 2 decimal places.", mode: "decimal" },
  { key: "leads", label: "Total leads", hint: "Every form fill, call, message or enquiry the campaign produced.", mode: "numeric" },
  { key: "qualified", label: "Qualified leads", hint: "Leads that met your written qualification criteria.", mode: "numeric" },
  { key: "closed", label: "Closed deals", hint: "Optional. Deals won from these leads.", mode: "numeric", optional: true },
];

/** Client island for the Cost Per Qualified Lead Calculator; the maths lives in ./cpql (BigInt, half-up rounding). */
export function CpqlCalculator() {
  const uid = useId();
  const [values, setValues] = useState<CpqlInput>(empty);
  const [currency, setCurrency] = useState<Currency>("PKR");
  const r = useMemo(() => calculate(values), [values]);
  const idOf = (k: string) => `${uid}-${k}`;
  const errorList = Object.values(r.errors).filter(Boolean);
  const hasClosed = values.closed.trim() !== "";

  const inputs = (
    <form
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      onSubmit={(e) => e.preventDefault()}
      noValidate
      aria-label="Cost per qualified lead inputs"
    >
      <div className="fx-calc-field sm:col-span-2">
        <label htmlFor={idOf("currency")}>Currency</label>
        <select
          id={idOf("currency")}
          className="fx-calc-input"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          aria-describedby={idOf("currency-hint")}
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <p id={idOf("currency-hint")} className="fx-calc-hint">
          Display only. No exchange rates are applied.
        </p>
      </div>
      {fields.map((f) => {
        const err = r.errors[f.key];
        return (
          <div key={f.key} className="fx-calc-field">
            <label htmlFor={idOf(f.key)}>
              {f.label}
              {f.key === "spend" ? <span className="font-normal text-ink-3"> ({currency})</span> : null}
              {f.optional ? <span className="font-normal text-ink-3"> (optional)</span> : null}
            </label>
            <input
              id={idOf(f.key)}
              name={f.key}
              className="fx-calc-input"
              type="text"
              inputMode={f.mode}
              autoComplete="off"
              placeholder={f.key === "spend" ? "e.g. 100000" : f.optional ? "e.g. 10" : "e.g. 400"}
              value={values[f.key]}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              aria-invalid={err ? true : undefined}
              aria-describedby={`${idOf(f.key)}-hint${err ? ` ${idOf(f.key)}-err` : ""}`}
            />
            <p id={`${idOf(f.key)}-hint`} className="fx-calc-hint">
              {f.hint}
            </p>
            {err ? (
              <p id={`${idOf(f.key)}-err`} className="fx-calc-error">
                {err}
              </p>
            ) : null}
          </div>
        );
      })}
    </form>
  );

  const [spend, leads, qualified, closed] = (["spend", "leads", "qualified", "closed"] as const).map(idOf);

  return (
    <CalculatorBlock
      id="calculator"
      title="Calculate your cost per qualified lead"
      description={
        <p>
          Enter the numbers for one campaign or one period. Results update as you type; nothing is sent or stored. A result shows “—” when it
          cannot be calculated, for example when a divisor is zero or missing.
        </p>
      }
      inputs={inputs}
      actions={
        <>
          <button
            type="button"
            onClick={() => setValues(example)}
            className="inline-flex h-11 items-center rounded-full border border-line-strong bg-glass px-5 font-display text-[14px] font-semibold text-ink transition-colors hover:border-[color:var(--accent)]"
          >
            Load the example numbers
          </button>
          <button
            type="button"
            onClick={() => setValues(empty)}
            className="inline-flex h-11 items-center rounded-full px-4 font-display text-[14px] font-semibold text-ink-2 hover:text-ink"
          >
            Clear
          </button>
        </>
      }
      outputs={[
        {
          id: idOf("out-cpql"),
          label: "Cost per qualified lead (CPQL)",
          value: formatMoney(r.cpql, currency),
          htmlFor: `${spend} ${qualified}`,
          note: "Ad spend ÷ qualified leads",
          primary: true,
        },
        { id: idOf("out-cpl"), label: "Cost per lead (CPL)", value: formatMoney(r.cpl, currency), htmlFor: `${spend} ${leads}`, note: "Ad spend ÷ total leads" },
        {
          id: idOf("out-rate"),
          label: "Qualification rate",
          value: formatRate(r.qualificationRate),
          htmlFor: `${qualified} ${leads}`,
          note: "Qualified leads ÷ total leads",
        },
        {
          id: idOf("out-deal"),
          label: "Cost per closed deal",
          value: formatMoney(r.costPerDeal, currency),
          htmlFor: `${spend} ${closed}`,
          note: hasClosed ? "Ad spend ÷ closed deals" : "Add closed deals to calculate",
        },
        {
          id: idOf("out-l2c"),
          label: "Lead-to-close rate",
          value: formatRate(r.leadToClose),
          htmlFor: `${closed} ${leads}`,
          note: hasClosed ? "Closed deals ÷ total leads" : "Add closed deals to calculate",
        },
        {
          id: idOf("out-q2c"),
          label: "Qualified-to-close rate",
          value: formatRate(r.qualifiedToClose),
          htmlFor: `${closed} ${qualified}`,
          note: hasClosed ? "Closed deals ÷ qualified leads" : "Add closed deals to calculate",
        },
      ]}
      status={
        errorList.length ? (
          <p className="fx-calc-error !mt-0">
            {errorList.length === 1 ? "1 input needs attention" : `${errorList.length} inputs need attention`}: {errorList.join(" ")}
          </p>
        ) : null
      }
      formula={
        <>
          <p>
            <code>CPL = ad spend ÷ total leads</code>
          </p>
          <p>
            <code>CPQL = ad spend ÷ qualified leads</code>
          </p>
          <p>
            <code>Qualification rate = qualified leads ÷ total leads × 100</code>
          </p>
          <p>
            <code>Cost per closed deal = ad spend ÷ closed deals</code>
          </p>
          <p>
            <code>Lead-to-close rate = closed deals ÷ total leads × 100</code>
          </p>
          <p>
            Amounts are calculated in whole minor units (paisa, cents, fils or pence) and every result is rounded half up to 2 decimal places, so
            the figures match what you would get by hand. Qualified leads cannot exceed total leads, and closed deals cannot exceed qualified leads.
          </p>
        </>
      }
      disclaimer={
        <p>
          This calculator is a planning aid. It uses only the numbers you enter, applies no benchmarks and does not convert currencies. A useful
          CPQL depends on your own definition of a qualified lead, your average deal value and your sales capacity.
        </p>
      }
    />
  );
}
