import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store, PlusCircle, User, LogIn, Sprout } from "lucide-react";

const publicLinks = [
  {
    to: "/dashboard",
    label: "Marketplace",
    description: "Live harvest listings",
    Icon: Store,
  },
];

const authLinks = [
  {
    to: "/post",
    label: "Post harvest",
    description: "New direct listing",
    Icon: PlusCircle,
  },
  {
    to: "/my-items",
    label: "My items",
    description: "Your active & sold items",
    Icon: User,
  },
];

function Sidebar() {
  const { currentUser } = useAuth();
  const items = [...publicLinks, ...(currentUser ? authLinks : [])];

  return (
    <aside
      className="hidden w-64 shrink-0 border-r border-soil-dark-200/50 bg-cream-50/50 lg:flex lg:flex-col"
      aria-label="Dashboard navigation"
    >
      <div className="sticky top-20 flex max-h-[calc(100vh-5rem)] flex-col gap-2 overflow-y-auto px-4 py-8">
        <p className="px-3 pb-2 text-xs font-bold uppercase tracking-widest text-soil-dark-400">
          Menu
        </p>
        {items.map((item) => {
          const Icon = item.Icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "group flex items-start gap-4 rounded-2xl px-4 py-3 transition-all duration-300",
                  isActive
                    ? "bg-agri-green-50 text-agri-green-900 shadow-sm border border-agri-green-200/50"
                    : "hover:bg-soil-dark-100/50 text-soil-dark-700 hover:text-soil-dark-950",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-5 w-5 shrink-0 mt-0.5 transition-colors ${
                      isActive ? "text-agri-green-600" : "text-soil-dark-400 group-hover:text-soil-dark-600"
                    }`}
                  />
                  <div>
                    <span className="block text-sm font-bold">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium opacity-70">
                      {item.description}
                    </span>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}

        {!currentUser && (
          <div className="mt-6 px-2">
            <div className="rounded-2xl bg-harvest-gold-50 p-4 border border-harvest-gold-200/50 shadow-sm relative overflow-hidden">
              <Sprout className="absolute -right-2 -bottom-2 h-16 w-16 text-harvest-gold-200/30 rotate-12" />
              <h4 className="text-sm font-bold text-harvest-gold-900 mb-1 relative z-10">Sell your harvest</h4>
              <p className="text-xs text-harvest-gold-800 mb-4 relative z-10">Join the network to post directly to buyers.</p>
              <NavLink
                to="/auth"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-harvest-gold-500 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-harvest-gold-600 relative z-10"
              >
                <LogIn className="h-4 w-4" /> Sign In
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
