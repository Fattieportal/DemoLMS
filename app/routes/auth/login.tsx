import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { APP_NAME } from "~/constant";
import { useAuthStore } from "~/stores/auth.store";
import {
  loginSchema,
  type LoginFormValues,
} from "~/validations/auth.validation";
import type { Route } from "./+types/login";
import { z } from "zod";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Login` },
    { name: "description", content: "LMS App." },
  ];
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [values, setValues] = useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<LoginFormValues>>({});

  const set =
    (field: keyof LoginFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      setFieldErrors({
        username: errors.properties?.username?.errors?.[0],
        password: errors.properties?.password?.errors?.[0],
      });
      return;
    }
    setFieldErrors({});
    clearError();
    try {
      await login(result.data.username, result.data.password);
      navigate("/dashboard");
    } catch {}
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

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Email
          </label>
          <input
            type="text"
            value={values.username}
            onChange={set("username")}
            placeholder="you@email.app"
            className="mt-1.5 w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.username && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.username}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={values.password}
            onChange={set("password")}
            placeholder="••••••••"
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
        <button
          disabled={isLoading}
          className="w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold mt-2 disabled:opacity-60"
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New to {APP_NAME}?{" "}
        <Link to="/auth/register" className="text-secondary font-semibold">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
