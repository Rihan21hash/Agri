import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-semibold transition-colors sm:px-4";

function Navbar() {
  const { currentUser, authReady } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch {
      // ignore — could surface toast in production
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-earth-200/80 bg-cream-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <NavLink
            to="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="Distress Sale home"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 via-accent-600 to-earth-800 font-display text-lg font-bold text-white shadow-soft"
              aria-hidden
            >
              DS
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-lg font-semibold tracking-tight text-earth-950 sm:text-xl">
                Distress Sale
              </h1>
              <p className="hidden text-sm text-earth-600 sm:block">
                Farmers selling fresh produce — fast
              </p>
            </div>
          </NavLink>
        </div>

        <nav
          className="flex shrink-0 flex-wrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Main"
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              [
                linkBase,
                isActive
                  ? "bg-earth-900 text-white shadow-sm"
                  : "text-earth-700 hover:bg-earth-100 hover:text-earth-950",
              ].join(" ")
            }
          >
            Market
          </NavLink>

          {currentUser ? (
            <>
              <NavLink
                to="/post"
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive
                      ? "bg-earth-900 text-white shadow-sm"
                      : "text-earth-700 hover:bg-earth-100 hover:text-earth-950",
                  ].join(" ")
                }
              >
                Post
              </NavLink>
              <NavLink
                to="/my-items"
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive
                      ? "bg-earth-900 text-white shadow-sm"
                      : "text-earth-700 hover:bg-earth-100 hover:text-earth-950",
                  ].join(" ")
                }
              >
                My items
              </NavLink>
            </>
          ) : null}

          {!authReady ? (
            <span className="px-2 text-xs text-earth-400">…</span>
          ) : currentUser ? (
            <>
              <span className="hidden max-w-[180px] truncate rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-900 lg:inline-block">
                {currentUser.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className={`${linkBase} text-earth-700 hover:bg-red-50 hover:text-red-800`}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive
                      ? "bg-earth-900 text-white shadow-sm"
                      : "text-earth-700 hover:bg-earth-100 hover:text-earth-950",
                  ].join(" ")
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/auth"
                state={{ mode: "register" }}
                className={`${linkBase} bg-accent-600 text-white shadow-sm hover:bg-accent-700`}
              >
                Get started
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
