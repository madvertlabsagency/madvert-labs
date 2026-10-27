/**
 * Cost per qualified lead maths. Pure, decimal-safe and framework-free so it can be unit tested
 * with plain Node. Money is held as integer minor units (BigInt, 2 decimal places) and rates as
 * integer hundredths of a percent, so displayed values never show floating-point drift. Every
 * division rounds half-up to 2 decimal places. A figure that would divide by zero is `null` ("n/a").
 */

// BigInt literals need ES2020; the project targets ES2017, so constants are built once here.
const ZERO = BigInt(0);
const TWO = BigInt(2);
const HUNDRED = BigInt(100);
const TEN_K = BigInt(10000);

export type Currency = "PKR" | "USD" | "AED" | "GBP";

export const currencies: { code: Currency; label: string; prefix: string }[] = [
  { code: "PKR", label: "PKR (Pakistani rupee)", prefix: "PKR " },
  { code: "USD", label: "USD (US dollar)", prefix: "$" },
  { code: "AED", label: "AED (UAE dirham)", prefix: "AED " },
  { code: "GBP", label: "GBP (British pound)", prefix: "£" },
];

export type CpqlInput = {
  spend: string;
  leads: string;
  qualified: string;
  /** Optional; empty string means "not provided". */
  closed: string;
};

export type FieldKey = keyof CpqlInput;

type Parsed<T> = { ok: true; value: T | null } | { ok: false; error: string };

const clean = (s: string) => s.replace(/[\s,]/g, "");

/** "150,000.5" -> 15000050n (minor units). Empty -> null. Rejects negatives and more than 2 decimals. */
export function parseMoney(raw: string): Parsed<bigint> {
  const s = clean(raw);
  if (!s) return { ok: true, value: null };
  const m = /^(\d+)(?:\.(\d*))?$/.exec(s);
  if (!m) return { ok: false, error: "Enter a positive amount using digits only, for example 150000 or 1250.50." };
  const frac = m[2] ?? "";
  if (frac.length > 2) return { ok: false, error: "Use at most 2 decimal places." };
  if (m[1].length > 15) return { ok: false, error: "That amount is too large." };
  return { ok: true, value: BigInt(m[1]) * HUNDRED + BigInt((frac + "00").slice(0, 2)) };
}

/** Whole, non-negative counts only. Empty -> null. */
export function parseCount(raw: string): Parsed<bigint> {
  const s = clean(raw);
  if (!s) return { ok: true, value: null };
  if (!/^\d+$/.test(s)) return { ok: false, error: "Enter a whole number, for example 120." };
  if (s.length > 12) return { ok: false, error: "That number is too large." };
  return { ok: true, value: BigInt(s) };
}

/** Round-half-up integer division for non-negative a and positive b. */
export function divRound(a: bigint, b: bigint): bigint {
  return (TWO * a + b) / (TWO * b);
}

const group = (digits: string) => digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** 1234550n minor units -> "12,345.50". */
export function formatMinor(minor: bigint): string {
  const neg = minor < ZERO;
  const abs = neg ? -minor : minor;
  const units = abs / HUNDRED;
  const cents = (abs % HUNDRED).toString().padStart(2, "0");
  return `${neg ? "-" : ""}${group(units.toString())}.${cents}`;
}

export function formatMoney(minor: bigint | null, currency: Currency): string {
  if (minor === null) return "n/a";
  const c = currencies.find((x) => x.code === currency) ?? currencies[0];
  return `${c.prefix}${formatMinor(minor)}`;
}

/** Hundredths of a percent -> "33.33%". */
export function formatRate(bp: bigint | null): string {
  if (bp === null) return "n/a";
  return `${formatMinor(bp)}%`;
}

export type CpqlResult = {
  /** Cost per lead, minor units. */
  cpl: bigint | null;
  /** Cost per qualified lead, minor units. */
  cpql: bigint | null;
  /** Qualified ÷ leads, hundredths of a percent. */
  qualificationRate: bigint | null;
  /** Spend ÷ closed deals, minor units. */
  costPerDeal: bigint | null;
  /** Closed ÷ leads, hundredths of a percent. */
  leadToClose: bigint | null;
  /** Closed ÷ qualified, hundredths of a percent. */
  qualifiedToClose: bigint | null;
  errors: Partial<Record<FieldKey, string>>;
};

export function calculate(input: CpqlInput): CpqlResult {
  const errors: Partial<Record<FieldKey, string>> = {};
  const spendP = parseMoney(input.spend);
  const leadsP = parseCount(input.leads);
  const qualP = parseCount(input.qualified);
  const closedP = parseCount(input.closed);
  if (!spendP.ok) errors.spend = spendP.error;
  if (!leadsP.ok) errors.leads = leadsP.error;
  if (!qualP.ok) errors.qualified = qualP.error;
  if (!closedP.ok) errors.closed = closedP.error;

  const spend = spendP.ok ? spendP.value : null;
  const leads = leadsP.ok ? leadsP.value : null;
  let qualified = qualP.ok ? qualP.value : null;
  let closed = closedP.ok ? closedP.value : null;

  if (leads !== null && qualified !== null && qualified > leads) {
    errors.qualified = "Qualified leads cannot be more than total leads.";
    qualified = null;
  }
  if (closed !== null && qualified !== null && closed > qualified) {
    errors.closed = "Closed deals cannot be more than qualified leads.";
    closed = null;
  } else if (closed !== null && qualified === null && leads !== null && closed > leads) {
    errors.closed = "Closed deals cannot be more than total leads.";
    closed = null;
  }

  const per = (money: bigint | null, n: bigint | null) => (money !== null && n !== null && n > ZERO ? divRound(money, n) : null);
  const rate = (part: bigint | null, whole: bigint | null) =>
    part !== null && whole !== null && whole > ZERO ? divRound(part * TEN_K, whole) : null;

  return {
    cpl: per(spend, leads),
    cpql: per(spend, qualified),
    qualificationRate: rate(qualified, leads),
    costPerDeal: per(spend, closed),
    leadToClose: rate(closed, leads),
    qualifiedToClose: rate(closed, qualified),
    errors,
  };
}
