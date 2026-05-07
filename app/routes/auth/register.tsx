import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "~/stores/auth.store";
import { validateRegister, isRegisterValid } from "~/validations/register.validation";
import type { RegisterErrors } from "~/validations/register.validation";
import type { Route } from "./+types/register";


export function meta({}: Route.MetaArgs) {
  return [
    { title: `LMS - Register` },
    { name: "description", content: "LMS App." },
  ];
}


const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<RegisterErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    const errors = validateRegister({
      display_name: displayName,
      email,
      password,
    });

    if (!isRegisterValid(errors)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    const success = await register(email, password, displayName);
    if (success) {
      navigate("/login");
    }
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

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            required
            placeholder="Full name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.display_name && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.display_name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-card border border-border focus:border-secondary focus:outline-none focus:ring-4 focus:ring-secondary/15 text-sm"
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-2xl bg-primary text-primary-foreground py-3.5 font-semibold mt-2 disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Create account"}
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