import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LanguageToggle from "./LanguageToggle";
import { LogOut, User, Store, PlusCircle, Leaf, Sun, Moon, TrendingUp, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";

const linkBase =
  "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";

function Navbar() {
  const { currentUser, authReady } = useAuth();
  const { highContrast, toggleHighContrast } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        {/* Logo */}
        <div className="flex min-w-0 items-center gap-3">
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
            <div className="min-w-0 hidden sm:block">
              <h1 className="font-display text-xl font-bold tracking-tight text-soil-dark-950 group-hover:text-agri-green-800 transition-colors lg:text-2xl">
                AgriMarket
              </h1>
              <p className="hidden text-xs font-medium text-soil-dark-500 lg:block">
                Direct harvest, faster sales
              </p>
            </div>
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex shrink-0 items-center gap-1" aria-label="Main">
          <NavLink to="/dashboard" className={({ isActive }) => cn(linkBase, isActive ? "bg-agri-green-100 text-agri-green-900 shadow-sm" : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950")}>
            <Store className="h-4 w-4" /> Market
          </NavLink>
          <NavLink to="/market-prices" className={({ isActive }) => cn(linkBase, isActive ? "bg-agri-green-100 text-agri-green-900 shadow-sm" : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950")}>
            <TrendingUp className="h-4 w-4" /> Prices
          </NavLink>
          <NavLink to="/government-schemes" className={({ isActive }) => cn(linkBase, isActive ? "bg-agri-green-100 text-agri-green-900 shadow-sm" : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950")}>
            <FileText className="h-4 w-4" /> Schemes
          </NavLink>

          {currentUser && (
            <>
              <NavLink to="/post" className={({ isActive }) => cn(linkBase, isActive ? "bg-agri-green-600 text-white shadow-floating" : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950")}>
                <PlusCircle className="h-4 w-4" /> Post
              </NavLink>
              <NavLink to="/my-items" className={({ isActive }) => cn(linkBase, isActive ? "bg-agri-green-100 text-agri-green-900 shadow-sm" : "text-soil-dark-600 hover:bg-soil-dark-100 hover:text-soil-dark-950")}>
                <User className="h-4 w-4" /> My Items
              </NavLink>
            </>
          )}

          <div className="ml-1 flex items-center gap-1.5 border-l border-soil-dark-200 pl-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={toggleHighContrast}
              title="Toggle high contrast"
              className={cn(linkBase, "px-2.5", highContrast ? "bg-soil-dark-950 text-harvest-gold-400" : "text-soil-dark-500 hover:bg-soil-dark-100")}
            >
              {highContrast ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {!authReady ? (
              <span className="px-2 text-xs text-soil-dark-400 animate-pulse">Loading...</span>
            ) : currentUser ? (
              <>
                <span className="hidden max-w-[140px] truncate rounded-full border border-agri-green-200 bg-agri-green-50 px-3 py-1.5 text-xs font-semibold text-agri-green-900 lg:inline-flex items-center gap-1">
                  <User className="h-3 w-3" /> {currentUser.email}
                </span>
                <button type="button" onClick={handleLogout} className={`${linkBase} text-soil-dark-600 hover:bg-red-50 hover:text-red-700`}>
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/auth" className={({ isActive }) => cn(linkBase, isActive ? "bg-soil-dark-100 text-soil-dark-900" : "text-soil-dark-600 hover:bg-soil-dark-100")}>
                  Login
                </NavLink>
                <NavLink to="/auth" state={{ mode: "register" }} className={`${linkBase} bg-harvest-gold-500 text-white shadow-card hover:bg-harvest-gold-600`}>
                  Join
                </NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile: controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleHighContrast}
            className={cn("rounded-xl p-2.5", highContrast ? "bg-soil-dark-950 text-harvest-gold-400" : "text-soil-dark-500")}
          >
            {highContrast ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2.5 text-soil-dark-700 hover:bg-soil-dark-100"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="border-t border-soil-dark-100 bg-white px-4 py-4 md:hidden space-y-2">
          <NavLink to="/dashboard" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-soil-dark-700 hover:bg-soil-dark-50">
            🛒 Market
          </NavLink>
          <NavLink to="/market-prices" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-soil-dark-700 hover:bg-soil-dark-50">
            📊 Mandi Prices
          </NavLink>
          <NavLink to="/government-schemes" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-soil-dark-700 hover:bg-soil-dark-50">
            🏛️ Govt Schemes
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/post" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-agri-green-700 bg-agri-green-50">
                ➕ Post Harvest
              </NavLink>
              <NavLink to="/my-items" onClick={() => setMobileOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-soil-dark-700 hover:bg-soil-dark-50">
                👤 My Items
              </NavLink>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left rounded-xl px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                🚪 Log out
              </button>
            </>
          ) : (
            <NavLink to="/auth" onClick={() => setMobileOpen(false)} className="block rounded-xl bg-harvest-gold-500 px-4 py-3 text-sm font-bold text-white text-center">
              Login / Sign Up
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
