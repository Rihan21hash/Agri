import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Search, Filter } from "lucide-react";
import mockMarketPrices, { indianStates, priceCategories } from "../data/mockMarketPrices";
import PriceCard from "../components/PriceCard";

export default function MarketPricesPage() {
  const [stateFilter, setStateFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let items = mockMarketPrices;
    if (stateFilter !== "all") items = items.filter((p) => p.state === stateFilter);
    if (catFilter !== "all") items = items.filter((p) => p.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.commodity.toLowerCase().includes(q) ||
          p.market.toLowerCase().includes(q) ||
          p.variety.toLowerCase().includes(q)
      );
    }
    return items;
  }, [stateFilter, catFilter, search]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-agri-green-700 to-agri-green-900 p-8 text-white shadow-card sm:p-10">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-harvest-gold-500 opacity-10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-agri-green-400 opacity-10 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-agri-green-200 mb-3">
            <TrendingUp className="h-5 w-5" />
            Live Market Data
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">📊 Today's Mandi Prices</h1>
          <p className="mt-3 max-w-2xl text-base text-agri-green-100 leading-relaxed">
            Check the latest wholesale prices from mandis across India. All prices are in ₹/quintal.
          </p>
          <p className="mt-2 text-sm text-agri-green-300">
            Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-soil-dark-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crops, markets..."
            className="w-full rounded-xl border border-soil-dark-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-soil-dark-900 shadow-sm transition-colors focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
          />
        </div>

        {/* State dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soil-dark-400" />
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="appearance-none rounded-xl border border-soil-dark-200 bg-white py-3 pl-10 pr-10 text-sm font-bold text-soil-dark-700 shadow-sm focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
          >
            <option value="all">All States</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {priceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCatFilter(cat.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold whitespace-nowrap transition-all ${
              catFilter === cat.id
                ? "border-agri-green-500 bg-agri-green-600 text-white shadow-md"
                : "border-soil-dark-200 bg-white text-soil-dark-700 hover:bg-soil-dark-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm font-bold text-soil-dark-500">
        Showing {filtered.length} {filtered.length === 1 ? "result" : "results"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-soil-dark-200 bg-white/50 py-20 text-center">
          <span className="text-4xl mb-4">📊</span>
          <p className="font-display text-lg font-bold text-soil-dark-900">No prices found</p>
          <p className="mt-2 text-sm text-soil-dark-500">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {filtered.map((item, i) => (
            <motion.div
              key={`${item.commodity}-${item.market}-${i}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <PriceCard data={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
