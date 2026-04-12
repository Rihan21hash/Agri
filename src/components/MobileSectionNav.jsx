import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store, PlusCircle, TrendingUp, FileText, Home } from "lucide-react";
import { cn } from "../lib/cn";

function MobileSectionNav() {
  const { currentUser } = useAuth();

  const links = [
    { to: "/", short: "Home", Icon: Home },
    { to: "/dashboard", short: "Browse", Icon: Store },
    ...(currentUser
      ? [{ to: "/post", short: "Sell", Icon: PlusCircle }]
      : []),
    { to: "/market-prices", short: "Prices", Icon: TrendingUp },
    { to: "/government-schemes", short: "Schemes", Icon: FileText },
  ];



  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md rounded-[2rem] border border-soil-dark-200/50 bg-cream-50/95 p-1.5 shadow-floating backdrop-blur-xl md:hidden"
      aria-label="Primary Mobile"
    >
      <div className="flex items-center justify-around">
        {links.map((item) => {
          const Icon = item.Icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              aria-label={item.short}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 rounded-2xl px-3 py-2 transition-all duration-300",
                  isActive
                    ? "bg-agri-green-600 text-white shadow-inner scale-105"
                    : "text-soil-dark-500 hover:text-soil-dark-900 hover:bg-soil-dark-100/50"
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2.5} />
              <span className="text-[9px] font-bold tracking-wide uppercase">{item.short}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileSectionNav;
