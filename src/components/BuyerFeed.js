import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import ListingCard from "./ListingCard";

function BuyerFeed({ currentUser }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setListings(data);
      },
      (error) => {
        console.error("Error fetching listings:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const sortedListings = useMemo(() => {
    return [...listings].sort((a, b) => {
      const expiryA = a.expiresAt || Number.MAX_SAFE_INTEGER;
      const expiryB = b.expiresAt || Number.MAX_SAFE_INTEGER;

      if (expiryA !== expiryB) {
        return expiryA - expiryB;
      }

      const createdA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const createdB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;

      return createdB - createdA;
    });
  }, [listings]);

  const markInterested = async (id) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, "listings", id), { status: "sold" });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="cards-grid">
      {sortedListings.length === 0 ? (
        <p className="empty">No listings yet.</p>
      ) : (
        sortedListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onInterested={markInterested}
            isAuthenticated={!!currentUser}
          />
        ))
      )}
    </div>
  );
}

export default BuyerFeed;
