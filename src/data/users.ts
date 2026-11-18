import type { ActivityItem, Role, Status, User } from "../types";

export const ROLES: Role[] = ["admin", "editor", "viewer"];
export const STATUSES: Status[] = ["active", "pending", "suspended"];

const EVENTS = ["Placed an order", "Updated profile", "Signed in", "Reset password", "Exported a report", "Invited a teammate"];

const activityFor = (i: number): ActivityItem[] =>
  [0, 1, 2, 3].map((k) => ({
    id: `${i}-${k}`,
    text: EVENTS[(i + k * 2) % EVENTS.length],
    date: `2026-11-${String(15 - k * 3).padStart(2, "0")}`,
  }));

// name, email, role, status, joined, orders, spend
const RAW: [string, string, Role, Status, string, number, number][] = [
  ["Alex Morgan", "alex.morgan@acme.io", "admin", "active", "2024-01-12", 42, 5230],
  ["Priya Nair", "priya.nair@acme.io", "editor", "active", "2024-03-02", 18, 1840],
  ["Sam Okafor", "sam.okafor@acme.io", "viewer", "pending", "2026-10-28", 0, 0],
  ["Lena Fischer", "lena.fischer@acme.io", "admin", "active", "2023-11-20", 63, 9120],
  ["Diego Ramos", "diego.ramos@acme.io", "viewer", "active", "2025-02-14", 27, 2760],
  ["Mei Tanaka", "mei.tanaka@acme.io", "editor", "suspended", "2024-08-09", 9, 640],
  ["Omar Haddad", "omar.haddad@acme.io", "viewer", "active", "2025-06-30", 14, 1190],
  ["Chloe Dubois", "chloe.dubois@acme.io", "editor", "active", "2024-05-18", 31, 3475],
  ["Noah Williams", "noah.williams@acme.io", "viewer", "pending", "2026-11-05", 0, 0],
  ["Fatima Zahra", "fatima.zahra@acme.io", "viewer", "active", "2025-09-21", 22, 2085],
  ["Ivan Petrov", "ivan.petrov@acme.io", "admin", "suspended", "2023-07-04", 51, 7410],
  ["Grace Lee", "grace.lee@acme.io", "editor", "active", "2026-01-15", 12, 1325],
];

export const USERS: User[] = RAW.map(([name, email, role, status, joined, orders, spend], i) => ({
  id: `u${101 + i}`,
  name, email, role, status, joined, orders, spend,
  lastActive: `2026-11-${String(16 - (i % 12)).padStart(2, "0")}`,
  activity: activityFor(i),
}));

export const findUser = (id: string): User | undefined => USERS.find((u) => u.id === id);
