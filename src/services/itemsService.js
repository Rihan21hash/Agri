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
    quantity,
    category,
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
    quantity: quantity ? String(quantity).trim() : "",
    category: category ? String(category).trim() : "crops",
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

export const STOCK_ITEMS = [
  {
    title: "Fresh Red Apples",
    quantity: "1 Wooden Crate (15 kg)",
    category: "fruits",
    price: 1200,
    description: "Quantity: 1 Wooden Crate (15 kg). Freshly picked crisp red apples packaged in a wooden crate ready for immediate pickup.",
    imageUrl: "/images/stock-images/apple-crate.jpg",
    sellerId: "stock_seller_01",
    status: "available",
  },
  {
    title: "Farm Fresh Carrots",
    quantity: "1 Crate (12 kg)",
    category: "vegetables",
    price: 480,
    description: "Quantity: 1 Crate (12 kg). Organically grown fresh carrots with green leafy tops in a farm crate.",
    imageUrl: "/images/stock-images/carrot-crate.jpg",
    sellerId: "stock_seller_02",
    status: "available",
  },
  {
    title: "Farm Fresh Country Eggs",
    quantity: "1 Tray (30 Eggs)",
    category: "household",
    price: 180,
    description: "Quantity: 1 Tray (30 Eggs). Organic poultry farm brown eggs neatly arranged in a 30-egg tray.",
    imageUrl: "/images/stock-images/eggs.jpg",
    sellerId: "stock_seller_03",
    status: "available",
  },
  {
    title: "Juicy Nagpur Oranges",
    quantity: "1 Crate (18 kg)",
    category: "fruits",
    price: 950,
    description: "Quantity: 1 Crate (18 kg). Sweet and juicy orange harvest packed overflowing in a wooden crate.",
    imageUrl: "/images/stock-images/oranges-crate.jpg",
    sellerId: "stock_seller_04",
    status: "available",
  },
  {
    title: "Quality Russet Potatoes",
    quantity: "1 Crate (25 kg)",
    category: "vegetables",
    price: 650,
    description: "Quantity: 1 Crate (25 kg). Clean, high-grade farm potatoes packed in a rustic wooden crate.",
    imageUrl: "/images/stock-images/potato-crate.jpg",
    sellerId: "stock_seller_05",
    status: "available",
  },
  {
    title: "Premium Basmati Rice",
    quantity: "1 Jute Sack (50 kg)",
    category: "crops",
    price: 3200,
    description: "Quantity: 1 Jute Sack (50 kg). Long-grain aromatic basmati rice in a heavy-duty gunny sack.",
    imageUrl: "/images/stock-images/rice-bag.jpg",
    sellerId: "stock_seller_06",
    status: "available",
  },
  {
    title: "Fresh Farm Tomatoes",
    quantity: "1 Plastic Crate (20 kg)",
    category: "vegetables",
    price: 600,
    description: "Quantity: 1 Plastic Crate (20 kg). Bright red vine-ripened tomatoes in a standard black plastic harvest crate.",
    imageUrl: "/images/stock-images/tomato-crate.jpg",
    sellerId: "stock_seller_07",
    status: "available",
  },
  {
    title: "Golden Harvest Wheat",
    quantity: "1 Jute Sack (50 kg)",
    category: "crops",
    price: 1450,
    description: "Quantity: 1 Jute Sack (50 kg). Clean, sun-dried golden wheat grain in a traditional jute sack.",
    imageUrl: "/images/stock-images/wheat-bag.jpg",
    sellerId: "stock_seller_08",
    status: "available",
  },
];

export async function seedStockItems(db, currentUserId) {
  const now = Date.now();
  const durations = [48, 24, 72, 36, 60, 120, 18, 96];
  for (let i = 0; i < STOCK_ITEMS.length; i++) {
    const item = STOCK_ITEMS[i];
    await addDoc(collection(db, ITEMS_COLLECTION), {
      ...item,
      sellerId: currentUserId || item.sellerId,
      expiresAt: now + durations[i] * 60 * 60 * 1000,
      createdAt: serverTimestamp(),
    });
  }
}

