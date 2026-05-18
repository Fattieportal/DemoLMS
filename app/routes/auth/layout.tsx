import { GraduationCap } from "lucide-react";
import { Link, Outlet, redirect } from "react-router";
import { APP_NAME } from "~/constant";
import { useAuthStore } from "~/stores/auth.store";

export async function clientLoader() {
  const { isAuthenticated } = useAuthStore.getState();
  if (isAuthenticated) throw redirect("/dashboard");
  return null;
}

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background grain">
      <div className="mx-auto max-w-md min-h-screen flex flex-col px-6 py-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-xl gradient-warm flex items-center justify-center shadow-soft">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            {APP_NAME}
          </span>
        </Link>
        <div className="flex-1 flex flex-col justify-center py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
