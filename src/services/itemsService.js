import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const ITEMS_COLLECTION = "items";

function sortByCreatedAtDesc(rows) {
  return [...rows].sort((a, b) => {
    const ma = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const mb = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return mb - ma;
  });
}

/**
 * Real-time listener for all items in `items` (no server orderBy — avoids index /
 * missing-field issues; sort client-side so every document is included).
 * @returns {import('firebase/firestore').Unsubscribe}
 */
export function getItems(db, onNext, onError) {
  return onSnapshot(
    collection(db, ITEMS_COLLECTION),
    (snapshot) => {
      const rows = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      onNext(sortByCreatedAtDesc(rows));
    },
    (err) => {
      if (typeof onError === "function") onError(err);
    }
  );
}

/**
 * Subscribe to a single item document.
 * @returns {import('firebase/firestore').Unsubscribe}
 */
export function subscribeItem(db, itemId, onNext, onError) {
  return onSnapshot(
    doc(db, ITEMS_COLLECTION, itemId),
    (snap) => {
      if (!snap.exists()) {
        onNext(null);
        return;
      }
      onNext({ id: snap.id, ...snap.data() });
    },
    (err) => {
      if (typeof onError === "function") onError(err);
    }
  );
}

/**
 * Persist a new marketplace item in Firestore (after image URL is known).
 * @param {import('firebase/firestore').Firestore} db
 * @param {object} payload
 * @param {string} payload.title
 * @param {number} payload.price
 * @param {string} payload.description
 * @param {string} payload.imageUrl
 * @param {string} payload.sellerId
 * @param {number} [payload.expiresAt] optional urgency timestamp (ms)
 */
export async function addItem(db, payload) {
  const {
    title,
    price,
    description,
    imageUrl,
    sellerId,
    expiresAt,
  } = payload;

  if (!sellerId) {
    throw new Error("Seller id is required.");
  }

  return addDoc(collection(db, ITEMS_COLLECTION), {
    title: String(title).trim(),
    price: Number(price),
    description: String(description).trim(),
    imageUrl: String(imageUrl ?? "").trim(),
    sellerId,
    status: "available",
    createdAt: serverTimestamp(),
    ...(expiresAt != null ? { expiresAt } : {}),
  });
}

/**
 * Mark an item as sold (e.g. buyer expressed interest / deal closed).
 */
export async function markAsSold(db, itemId) {
  return updateDoc(doc(db, ITEMS_COLLECTION, itemId), {
    status: "sold",
  });
}
