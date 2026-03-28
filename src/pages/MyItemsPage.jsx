import { useCallback, useEffect, useMemo, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getItems, markAsSold } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { sortItemsByUrgency } from "../utils/sortItems";

function MyItemsPage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = getItems(
      db,
      (rows) => {
        setError(null);
        setItems(rows);
        setLoading(false);
      },
      (err) => {
        setError(formatFirebaseError(err));
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  const mine = useMemo(() => {
    if (!currentUser?.uid) return [];
    return items.filter((i) => i.sellerId === currentUser.uid);
  }, [items, currentUser?.uid]);

  const sorted = useMemo(() => sortItemsByUrgency(mine), [mine]);

  const available = sorted.filter((i) => i.status === "available");
  const sold = sorted.filter((i) => i.status === "sold");

  const handleMarkSold = useCallback(
    async (id) => {
      if (!currentUser) return;
      setActionError(null);
      try {
        await markAsSold(db, id);
      } catch (e) {
        setActionError(formatFirebaseError(e));
      }
    },
    [currentUser]
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl font-semibold text-earth-950">
          Your listings
        </h2>
        <p className="mt-2 text-sm text-earth-600">
          Everything you have posted stays here after logout — pulled from Firestore in
          real time.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      ) : null}
      {actionError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {actionError}
        </div>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-earth-200 border-t-accent-600" />
        </div>
      ) : null}

      {!loading ? (
        <>
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-500">
          Available ({available.length})
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {available.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-earth-200 bg-white/70 px-6 py-10 text-center text-sm text-earth-600">
              No active listings. Post from the Post page when you have harvest to move.
            </div>
          ) : (
            available.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onMarkSold={handleMarkSold}
                isAuthenticated={Boolean(currentUser)}
                compact
              />
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-500">
          Sold ({sold.length})
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sold.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-earth-200 bg-white/70 px-6 py-10 text-center text-sm text-earth-600">
              Sold items appear here once buyers mark interest or you close a deal.
            </div>
          ) : (
            sold.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onMarkSold={handleMarkSold}
                isAuthenticated={Boolean(currentUser)}
                compact
              />
            ))
          )}
        </div>
      </section>
        </>
      ) : null}
    </div>
  );
}

export default MyItemsPage;
