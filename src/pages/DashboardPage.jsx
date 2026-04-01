import { useCallback, useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getItems, markAsSold } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { sortItemsByUrgency } from "../utils/sortItems";
import { Leaf, AlertCircle, Loader2 } from "lucide-react";

const FILTERS = [
  { id: "all", label: "All Harvests" },
  { id: "available", label: "Available Now" },
  { id: "sold", label: "Recently Sold" },
];

function DashboardPage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [listError, setListError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [filter, setFilter] = useState("available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = getItems(
      db,
      (rows) => {
        setListError(null);
        setItems(rows);
        setLoading(false);
      },
      (err) => {
        setListError(err?.message || "Failed to load items.");
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    if (filter === "available") {
      return items.filter((i) => i.status === "available");
    }
    if (filter === "sold") {
      return items.filter((i) => i.status === "sold");
    }
    return items;
  }, [items, filter]);

  const sorted = useMemo(
    () => sortItemsByUrgency(filtered),
    [filtered]
  );

  const handleMarkSold = useCallback(
    async (id) => {
      if (!currentUser) return;
      setActionError(null);
      try {
        await markAsSold(db, id);
      } catch (error) {
        setActionError(formatFirebaseError(error));
      }
    },
    [currentUser]
  );

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div className="relative overflow-hidden rounded-3xl bg-soil-dark-950 p-8 shadow-card text-white sm:p-10 isolate">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-agri-green-500 opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-harvest-gold-500 opacity-20 blur-3xl" />
        
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-agri-green-400">
          <Leaf className="h-4 w-4" /> Live Network
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
          Direct Harvest Marketplace
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-soil-dark-300">
          Browse fresh, time-sensitive produce listed directly by local farmers. 
          Listings are automatically sorted by urgency so nothing goes to waste.
        </p>
      </div>

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
                  : "bg-transparent text-soil-dark-600 hover:bg-soil-dark-50 hover:text-soil-dark-950"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {listError ? (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800 shadow-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{listError}</p>
        </div>
      ) : null}

      {actionError ? (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800 shadow-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{actionError}</p>
        </div>
      ) : null}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-agri-green-600">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="text-sm font-bold tracking-widest uppercase">Loading Harvests...</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {sorted.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-soil-dark-200 bg-white/50 px-6 py-24 text-center">
              <Leaf className="h-12 w-12 text-soil-dark-300 mb-4" />
              <p className="font-display text-lg font-bold text-soil-dark-900">No harvests found</p>
              <p className="mt-2 text-sm text-soil-dark-500 max-w-sm">
                Check back soon or adjust your filters. New produce is listed frequently during the morning hours.
              </p>
            </div>
          ) : (
            sorted.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onMarkSold={handleMarkSold}
                isAuthenticated={Boolean(currentUser)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
