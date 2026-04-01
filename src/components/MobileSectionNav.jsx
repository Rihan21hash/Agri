import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Store, PlusCircle, User, LogIn } from "lucide-react";

function MobileSectionNav() {
  const { currentUser } = useAuth();

  const links = [
    {
      to: "/dashboard",
      short: "Market",
      label: "Marketplace",
      Icon: Store,
    },
    ...(currentUser
      ? [
          {
            to: "/post",
            short: "Post",
            label: "Post listing",
            Icon: PlusCircle,
          },
          {
            to: "/my-items",
            short: "Mine",
            label: "My items",
            Icon: User,
          },
        ]
      : [
          {
            to: "/auth",
            short: "Login",
            label: "Login",
            Icon: LogIn,
          },
        ]),
  ];

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-sm rounded-[2rem] border border-soil-dark-200/50 bg-cream-50/95 p-2 shadow-floating backdrop-blur-xl md:hidden"
      aria-label="Primary Mobile"
    >
      <div className="flex items-center justify-around">
        {links.map((item) => {
          const Icon = item.Icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all duration-300",
                  isActive
                    ? "bg-agri-green-600 text-white shadow-inner scale-105"
                    : "text-soil-dark-500 hover:text-soil-dark-900 hover:bg-soil-dark-100/50",
                ].join(" ")
              }
            >
              <Icon className="h-6 w-6 shrink-0" strokeWidth={2.5} />
              <span className="text-[10px] font-bold tracking-wide uppercase">{item.short}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileSectionNav;
