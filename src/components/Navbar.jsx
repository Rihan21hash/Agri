import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-emerald-700 font-display text-lg font-bold text-white shadow-soft"
            aria-hidden
          >
            DS
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Distress Sale Flash Feed
            </h1>
            <p className="hidden text-sm text-slate-500 sm:block">
              Urgent crop listings for quick buyer response
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {currentUser ? (
            <span className="hidden max-w-[200px] truncate rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-800 sm:inline-block">
              {currentUser.email}
            </span>
          ) : null}
          <nav className="flex items-center" aria-label="Main">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                [
                  "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                ].join(" ")
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
