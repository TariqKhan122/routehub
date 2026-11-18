import type { RedirectState } from "../types";

// Router `state` is typed `unknown`, so narrow it before trusting it.
export function isRedirectState(value: unknown): value is RedirectState {
  return (
    typeof value === "object" && value !== null && "from" in value &&
    typeof value.from === "object" && value.from !== null && "pathname" in value.from &&
    typeof value.from.pathname === "string"
  );
}
