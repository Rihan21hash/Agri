import { useCallback, useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getItems, markAsSold } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { sortItemsByUrgency } from "../utils/sortItems";

const FILTERS = [
  { id: "all", label: "All listings" },
  { id: "available", label: "Available" },
  { id: "sold", label: "Sold" },
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
      <div className="rounded-2xl border border-earth-200/60 bg-gradient-to-br from-accent-50 via-cream-50 to-earth-50 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-800">
          Field operations
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-earth-950 sm:text-3xl">
          Distress sale marketplace
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-earth-700 sm:text-base">
          Browse every listing in real time: available harvest, closed deals, and
          urgency sorted automatically. Sign in to post or mark interest when you are
          ready to buy.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-earth-800">Filter feed</p>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-accent-400 ${
                filter === f.id
                  ? "border-earth-900 bg-earth-900 text-white"
                  : "border-earth-200 bg-white text-earth-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {listError ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800 shadow-sm"
          role="alert"
        >
          {listError}
        </div>
      ) : null}

      {actionError ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {actionError}
        </div>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-earth-200 border-t-accent-600" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-earth-200 bg-white/60 px-6 py-14 text-center">
              <p className="text-sm font-medium text-earth-700">No items in this view.</p>
              <p className="mt-1 text-xs text-earth-500">
                Try another filter or check back when sellers post new harvest.
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
