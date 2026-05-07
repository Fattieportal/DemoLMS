import { ArrowLeft, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { APP_NAME } from "~/constant";
import useMainStore from "~/stores/main.store";

const Header = () => {
  const showBack = useMainStore((x) => x.showBack);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="flex items-center justify-between px-5 h-14">
        <div className="w-10">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-full bg-surface flex items-center justify-center hover:bg-muted transition"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        <Link to="/" className="flex items-center gap-1.5">
          <span className="h-7 w-7 rounded-lg gradient-warm flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {APP_NAME}
          </span>
        </Link>
        <Link
          to="/profile"
          className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm shadow-soft"
        >
          AM
        </Link>
      </div>
    </header>
  );
};

export default Header;
