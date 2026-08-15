import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxucO3JNKghPmForTELzXDAzchEYEEoUc",
  authDomain: "agri-5c4af.firebaseapp.com",
  projectId: "agri-5c4af",
  storageBucket: "agri-5c4af.appspot.com",
  messagingSenderId: "345686228122",
  appId: "1:345686228122:web:28c8a832fca7d0ffa53323",
  measurementId: "G-QV5WZTDEV8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const now = Date.now();

const stockItems = [
  {
    title: "Fresh Red Apples",
    quantity: "1 Wooden Crate (15 kg)",
    category: "fruits",
    price: 1200,
    description: "Quantity: 1 Wooden Crate (15 kg). Freshly picked crisp red apples packaged in a wooden crate ready for immediate pickup.",
    imageUrl: "/images/stock-images/apple-crate.jpg",
    sellerId: "stock_seller_01",
    status: "available",
    expiresAt: now + 48 * 60 * 60 * 1000,
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
    expiresAt: now + 24 * 60 * 60 * 1000,
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
    expiresAt: now + 72 * 60 * 60 * 1000,
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
    expiresAt: now + 36 * 60 * 60 * 1000,
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
    expiresAt: now + 60 * 60 * 60 * 1000,
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
    expiresAt: now + 120 * 60 * 60 * 1000,
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
    expiresAt: now + 18 * 60 * 60 * 1000,
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
    expiresAt: now + 96 * 60 * 60 * 1000,
  },
];

async function seed() {
  console.log("Seeding stock items into Firebase Firestore collection 'items'...");
  for (const item of stockItems) {
    const docRef = await addDoc(collection(db, "items"), {
      ...item,
      createdAt: serverTimestamp(),
    });
    console.log(`Added "${item.title}" (Qty: ${item.quantity}) -> Document ID: ${docRef.id}`);
  }
  console.log("SUCCESS: All 8 stock harvest items successfully added to Firebase Firestore!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Error seeding stock items:", err);
  process.exit(1);
});
