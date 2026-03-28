import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const publicLinks = [
  {
    to: "/dashboard",
    label: "Marketplace",
    description: "Live listings & urgency",
  },
];

const authLinks = [
  {
    to: "/post",
    label: "Post harvest",
    description: "New distress listing",
  },
  {
    to: "/my-items",
    label: "My items",
    description: "Your listings & sold",
  },
];

function Sidebar() {
  const { currentUser } = useAuth();
  const items = [...publicLinks, ...(currentUser ? authLinks : [])];

  return (
    <aside
      className="hidden w-56 shrink-0 border-r border-earth-200/90 bg-cream-50 lg:flex lg:flex-col"
      aria-label="Dashboard navigation"
    >
      <div className="sticky top-20 flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto px-3 py-8">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-earth-400">
          Navigate
        </p>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "group rounded-xl px-3 py-2.5 transition-colors",
                isActive
                  ? "bg-earth-900 text-white shadow-sm"
                  : "hover:bg-earth-100/80",
              ].join(" ")
            }
          >
            <span
              className={`block text-sm font-semibold ${
                "text-inherit"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`mt-0.5 block text-xs ${
                "opacity-80"
              }`}
            >
              {item.description}
            </span>
          </NavLink>
        ))}
        {!currentUser ? (
          <NavLink
            to="/auth"
            className="mt-4 rounded-xl border border-dashed border-accent-300 bg-accent-50/50 px-3 py-3 text-center text-sm font-semibold text-accent-900 transition hover:bg-accent-100"
          >
            Sign in to post
          </NavLink>
        ) : null}
      </div>
    </aside>
  );
}

export default Sidebar;
