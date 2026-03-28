const navItems = [
  { href: "#account", label: "Account", description: "Login & signup" },
  { href: "#post", label: "Post listing", description: "Farmer distress post" },
  { href: "#feed", label: "Flash feed", description: "Live buyer view" },
];

function Sidebar() {
  return (
    <aside
      className="hidden w-56 shrink-0 border-r border-slate-200/90 bg-white lg:flex lg:flex-col"
      aria-label="Section navigation"
    >
      <div className="sticky top-20 flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto px-3 py-8">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          On this page
        </p>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
          >
            <span className="block text-sm font-semibold text-slate-800 group-hover:text-slate-900">
              {item.label}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500 group-hover:text-slate-600">
              {item.description}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
