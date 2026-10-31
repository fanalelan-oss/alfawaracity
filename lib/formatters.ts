/**
 * Deterministic number and currency formatter that guarantees identical
 * string output on both server (Node.js) and client (any browser/locale),
 * completely preventing React hydration mismatch errors.
 */
export function formatNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPriceYER(amount: number): string {
  return `${formatNumber(amount)} ريال يمني`;
}

export function formatPriceSAR(amount: number): string {
  return `${formatNumber(amount)} ريال سعودي`;
}
