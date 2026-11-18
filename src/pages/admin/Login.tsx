import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { DEMO_CREDENTIALS, useAuth } from "../../context/AuthContext";
import { isRedirectState } from "../../utils/routing";

export default function Login() {
  const { user, login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Where did ProtectedRoute bounce them from? Fall back to the dashboard if they came directly.
  const from = isRedirectState(location.state) ? location.state.from : undefined;
  const destination = from ? `${from.pathname}${from.search}` : "/admin";

  // Already signed in? Skip the form. (All hooks are above this early return.)
  if (user) return <Navigate to={destination} replace />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login(email, password)) navigate(destination, { replace: true }); // programmatic redirect after success
    else setError("Email or password is incorrect.");
  };

  const handleDemo = () => { loginDemo(); navigate(destination, { replace: true }); };

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="font-display text-3xl font-extrabold">Sign in</h1>
      <p className="mt-1 text-sm text-slate-400">
        {from ? <>Sign in to continue to <code className="text-sky-300">{from.pathname}</code>.</> : "Access the admin dashboard."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setError(null); }}
          type="email" placeholder="Email" aria-label="Email" autoComplete="username" className="field" />
        <input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); setError(null); }}
          type="password" placeholder="Password" aria-label="Password" autoComplete="current-password" className="field" />
        {error !== null && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        <button type="submit" disabled={!email || !password}
          className="focus-ring w-full rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40">
          Sign in
        </button>
        <button type="button" onClick={handleDemo}
          className="focus-ring w-full rounded-lg border border-slate-700 px-4 py-2 font-medium hover:bg-slate-800">
          Continue with demo account
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-500">Demo: {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}</p>
    </main>
  );
}
