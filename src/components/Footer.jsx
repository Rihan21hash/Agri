function Footer() {
  return (
    <footer className="border-t border-slate-200/90 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="font-display text-sm font-semibold text-slate-900">
            Distress Sale Flash Feed
          </p>
          <p className="mt-1 max-w-md text-sm text-slate-500">
            Connecting farmers and buyers for time-sensitive crop sales. Built
            for clarity, speed, and trust.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-slate-500">
          <span>© {new Date().getFullYear()} Distress Sale</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>Agricultural marketplace demo</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
