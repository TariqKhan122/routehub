export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const formatCurrency = (n: number): string => money.format(n);

export const initials = (name: string): string =>
  name.split(" ").map((p) => p.charAt(0)).slice(0, 2).join("").toUpperCase();
