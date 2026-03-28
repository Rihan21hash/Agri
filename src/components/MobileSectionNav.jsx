import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function IconMarket({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function IconPlus({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

function IconUser({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function MobileSectionNav() {
  const { currentUser } = useAuth();

  const links = [
    {
      to: "/dashboard",
      short: "Market",
      label: "Marketplace",
      Icon: IconMarket,
    },
    ...(currentUser
      ? [
          {
            to: "/post",
            short: "Post",
            label: "Post listing",
            Icon: IconPlus,
          },
          {
            to: "/my-items",
            short: "Mine",
            label: "My items",
            Icon: IconUser,
          },
        ]
      : [
          {
            to: "/auth",
            short: "Account",
            label: "Login",
            Icon: IconUser,
          },
        ]),
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-earth-200/90 bg-cream-50/95 pb-safe backdrop-blur-md lg:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
        {links.map((item) => {
          const Icon = item.Icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={({ isActive }) =>
                [
                  "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-earth-600 transition-colors",
                  isActive
                    ? "bg-earth-900 text-white"
                    : "active:bg-earth-100 active:text-earth-950",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate text-[11px] font-medium">{item.short}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileSectionNav;
