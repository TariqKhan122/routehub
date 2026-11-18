import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Reusable guard. Wrap any element: signed-out visitors are sent to /login, and the page
// they wanted travels in router state so Login can send them back after signing in.
export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // `replace` swaps the history entry, so Back doesn't return to the page that bounced them.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
