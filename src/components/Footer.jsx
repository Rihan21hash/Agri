function Footer() {
  return (
    <footer className="border-t border-earth-200/90 bg-cream-50">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="font-display text-sm font-semibold text-earth-950">
            Distress Sale
          </p>
          <p className="mt-1 max-w-md text-sm text-earth-600">
            Connecting growers and buyers for time-sensitive harvest sales — built
            for clarity, speed, and trust.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-earth-500">
          <span>© {new Date().getFullYear()} Distress Sale</span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>Agricultural marketplace</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
