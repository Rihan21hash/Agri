import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ItemCard from "../components/ItemCard";
import SkeletonCard from "../components/SkeletonCard";
import CategoryChips from "../components/CategoryChips";
import OfferModal from "../components/OfferModal";
import BuyerSellerChat from "../components/BuyerSellerChat";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getItems, markAsSold } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { sortItemsByUrgency } from "../utils/sortItems";
import { Leaf, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const FILTERS = [
  { id: "all", label: "All Harvests" },
  { id: "available", label: "Available Now" },
  { id: "sold", label: "Recently Sold" },
];

function DashboardPage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [listError, setListError] = useState(null);
  const [filter, setFilter] = useState("available");
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [offerItem, setOfferItem] = useState(null);
  const [chatItem, setChatItem] = useState(null);

  useEffect(() => {
    const unsub = getItems(
      db,
      (rows) => { setListError(null); setItems(rows); setLoading(false); },
      (err) => { setListError(err?.message || "Failed to load items."); setLoading(false); }
    );
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    let list = items;
    if (filter === "available") list = list.filter((i) => i.status === "available");
    if (filter === "sold") list = list.filter((i) => i.status === "sold");
    return list;
  }, [items, filter]);

  const sorted = useMemo(() => sortItemsByUrgency(filtered), [filtered]);

  const handleMarkSold = useCallback(
    async (id) => {
      if (!currentUser) return;
      try {
        await markAsSold(db, id);
        toast.success("Marked as sold!");
      } catch (error) {
        toast.error(formatFirebaseError(error));
      }
    },
    [currentUser]
  );

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {/* Hero banner */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-soil-dark-950 p-8 shadow-card text-white sm:p-10 isolate"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-agri-green-500 opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-harvest-gold-500 opacity-20 blur-3xl" />
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-agri-green-400">
          <Leaf className="h-4 w-4" /> Live Network
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Direct Harvest Marketplace
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-soil-dark-300">
          Browse fresh, time-sensitive produce listed directly by local farmers.
        </p>
      </motion.div>

      {/* Category chips */}
      <CategoryChips selected={category} onSelect={setCategory} />

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-soil-dark-500 uppercase tracking-widest">Filter</p>
        <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-soil-dark-100 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                filter === f.id
                  ? "bg-agri-green-600 text-white shadow-md shadow-agri-green-600/20"
                  : "bg-transparent text-soil-dark-600 hover:bg-soil-dark-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {listError && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{listError}</p>
        </div>
      )}

      {/* Cards grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {sorted.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-soil-dark-200 bg-white/50 px-6 py-24 text-center">
              <Leaf className="h-12 w-12 text-soil-dark-300 mb-4" />
              <p className="font-display text-lg font-bold text-soil-dark-900">No harvests found</p>
              <p className="mt-2 text-sm text-soil-dark-500 max-w-sm">
                Check back soon or adjust your filters.
              </p>
            </div>
          ) : (
            sorted.map((item) => (
              <motion.div
                key={item.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <ItemCard
                  item={item}
                  onMarkSold={handleMarkSold}
                  isAuthenticated={Boolean(currentUser)}
                  onChat={(it) => setChatItem(it)}
                  onOffer={(it) => setOfferItem(it)}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {/* Modals */}
      <OfferModal
        isOpen={Boolean(offerItem)}
        onClose={() => setOfferItem(null)}
        item={offerItem}
      />
      <BuyerSellerChat
        isOpen={Boolean(chatItem)}
        onClose={() => setChatItem(null)}
        item={chatItem}
        sellerId={chatItem?.sellerId}
      />
    </div>
  );
}

export default DashboardPage;
