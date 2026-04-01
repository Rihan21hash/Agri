import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Store, PlusCircle, Leaf } from "lucide-react";

const linkBase =
  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";

function Navbar() {
  const { currentUser, authReady } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch {
      // ignore
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-soil-dark-200/50 bg-cream-50/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <NavLink
            to="/"
            className="group flex min-w-0 items-center gap-3 transition-transform hover:scale-[1.02]"
            aria-label="Distress Sale home"
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-green-400 to-agri-green-700 shadow-floating text-white"
              aria-hidden
            >
              <Leaf className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold tracking-tight text-soil-dark-950 sm:text-2xl group-hover:text-agri-green-800 transition-colors">
                AgriMarket
              </h1>
              <p className="hidden text-xs font-medium text-soil-dark-500 sm:block">
                Direct harvest, faster sales
              </p>
            </div>
          </NavLink>
        </div>

        <nav
          className="hidden md:flex shrink-0 flex-wrap items-center justify-end gap-2"
          aria-label="Main"
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              [
                linkBase,
                isActive
                  ? "bg-agri-green-100 text-agri-green-900 shadow-sm"
                  : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950",
              ].join(" ")
            }
          >
            <Store className="h-4 w-4" /> Market
          </NavLink>

          {currentUser ? (
            <>
              <NavLink
                to="/post"
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive
                      ? "bg-agri-green-600 text-white shadow-floating"
                      : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950",
                  ].join(" ")
                }
              >
                <PlusCircle className="h-4 w-4" /> Post Harvest
              </NavLink>
              <NavLink
                to="/my-items"
                className={({ isActive }) =>
                  [
                    linkBase,
                    isActive
                      ? "bg-agri-green-100 text-agri-green-900 shadow-sm"
                      : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950",
                  ].join(" ")
                }
              >
                <User className="h-4 w-4" /> My Items
              </NavLink>
            </>
          ) : null}

          <div className="ml-2 pl-2 border-l border-soil-dark-200 flex items-center gap-2">
            {!authReady ? (
              <span className="px-2 text-xs text-soil-dark-400 animate-pulse">Loading...</span>
            ) : currentUser ? (
              <>
                <span className="hidden max-w-[180px] truncate rounded-full border border-agri-green-200 bg-agri-green-50 px-3 py-1.5 text-xs font-semibold text-agri-green-900 lg:inline-flex items-center gap-1">
                  <User className="h-3 w-3" /> {currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${linkBase} text-soil-dark-600 hover:bg-red-50 hover:text-red-700`}
                >
                  <LogOut className="h-4 w-4" /> Log out
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
                        ? "bg-soil-dark-100 text-soil-dark-900"
                        : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950",
                    ].join(" ")
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth"
                  state={{ mode: "register" }}
                  className={`${linkBase} bg-harvest-gold-500 text-white shadow-card hover:bg-harvest-gold-600 hover:shadow-card-hover`}
                >
                  Join Network
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

