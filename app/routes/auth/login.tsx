import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { APP_NAME } from "~/constant";
import { useAuthStore } from "~/stores/auth.store";
import { validateLogin, isLoginValid } from "~/validations/login.validation";
import type { Route } from "./+types/login";


export function meta({}: Route.MetaArgs) {
  return [
    { title: `LMS - Login` },
    { name: "description", content: "LMS App." },
  ];
}


const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    clearError();

    const errors = validateLogin({ email, password });
    if (!isLoginValid(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to continue learning
        </p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <Link
          to="/auth/reset"
          className="block text-right text-xs font-semibold text-secondary"
        >
          Forgot password?
        </Link>

        {error && (
          <p className="text-xs text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold mt-2 disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New to {APP_NAME}?{" "}
        <Link to="/register" className="text-secondary font-semibold">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;