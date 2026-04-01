import { Leaf } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-soil-dark-200/50 bg-soil-dark-950 text-soil-dark-300">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-agri-green-900 border border-agri-green-800 text-agri-green-400">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-base font-bold text-white tracking-wide">
              AgriMarket
            </p>
            <p className="mt-1 max-w-sm text-sm text-soil-dark-400">
              Connecting growers & buyers for fast harvest sales.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          <span className="text-soil-dark-500">© {new Date().getFullYear()} AgriMarket Inc.</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-soil-dark-700 sm:block" aria-hidden />
          <span className="text-agri-green-500">Built for Farmers</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
