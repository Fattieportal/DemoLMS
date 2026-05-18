import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { APP_NAME } from "~/constant";
import { useAuthStore } from "~/stores/auth.store";
import {
  registerSchema,
  type RegisterFormValues,
} from "~/validations/auth.validation";
import { z } from "zod";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Register` },
    { name: "description", content: "LMS App." },
  ];
}

type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [values, setValues] = useState<RegisterFormValues>({
    display_name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const set =
    (field: keyof RegisterFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      const errors = z.treeifyError(result.error);
      setFieldErrors({
        display_name: errors.properties?.display_name?.errors?.[0],
        email: errors.properties?.email?.errors?.[0],
        password: errors.properties?.password?.errors?.[0],
      });
      return;
    }
    setFieldErrors({});
    clearError();
    try {
      await register(
        result.data.display_name,
        result.data.email,
        result.data.password,
      );
      navigate("/dashboard");
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Start learning
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create your free account in seconds
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            value={values.display_name}
            onChange={set("display_name")}
            placeholder="Full name"
            className="w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.display_name && (
            <p className="text-xs text-red-500 mt-1">
              {fieldErrors.display_name}
            </p>
          )}
        </div>
        <div>
          <input
            type="email"
            value={values.email}
            onChange={set("email")}
            placeholder="Email"
            className="w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            value={values.password}
            onChange={set("password")}
            placeholder="Password"
            className="w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>
        <button
          disabled={isLoading}
          className="w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold mt-2 disabled:opacity-60"
        >
          {isLoading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-secondary font-semibold">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
