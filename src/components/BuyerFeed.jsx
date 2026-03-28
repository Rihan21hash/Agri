import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { sortListingsByUrgency } from "../utils/sortListings";
import ListingCard from "./ListingCard";

function BuyerFeed() {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState([]);
  const [listError, setListError] = useState(null);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setListError(null);
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setListings(data);
      },
      (error) => {
        setListError(error?.message || "Failed to load listings.");
      }
    );

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  const sortedListings = useMemo(
    () => sortListingsByUrgency(listings),
    [listings]
  );

  const markInterested = useCallback(
    async (id) => {
      if (!currentUser) return;
      setActionError(null);
      try {
        await updateDoc(doc(db, "listings", id), { status: "sold" });
      } catch (error) {
        setActionError(error?.message || "Could not update listing.");
      }
    },
    [currentUser]
  );

  if (listError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-800 shadow-sm">
        <p role="alert">{listError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {actionError ? (
        <div
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {actionError}
        </div>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sortedListings.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-12 text-center">
            <p className="text-sm font-medium text-slate-600">No listings yet.</p>
            <p className="mt-1 text-xs text-slate-400">
              New distress posts will appear here in real time.
            </p>
          </div>
        ) : (
          sortedListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onInterested={markInterested}
              isAuthenticated={Boolean(currentUser)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BuyerFeed;
