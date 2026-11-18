import { useLocation, useNavigate } from "react-router-dom";

// navigate(-1) walks the browser history. If the user opened this URL directly (a shared link),
// there is no previous in-app entry and -1 would leave the site, so fall back to a safe route.
// React Router gives the first entry in a session the key "default".
export function useGoBack(fallback: string): () => void {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    if (location.key !== "default") navigate(-1);
    else navigate(fallback, { replace: true });
  };
}
