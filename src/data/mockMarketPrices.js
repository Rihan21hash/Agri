/**
 * Mock mandi (agricultural market) price data.
 * Used when REACT_APP_DATAGOVIN_KEY is not set.
 * 35+ entries covering major crops across Indian states.
 */

const mockMarketPrices = [
  // ── Vegetables ──────────────────────────────────────────
  { commodity: "Tomato", variety: "Local", state: "Maharashtra", district: "Pune", market: "Pune (Gultekdi)", min: 800, max: 1400, modal: 1100, trend: "up", change: 5.2, category: "vegetables", date: "2026-04-12" },
  { commodity: "Onion", variety: "Nashik Red", state: "Maharashtra", district: "Nashik", market: "Nashik (Pimpalgaon)", min: 1200, max: 2000, modal: 1600, trend: "up", change: 8.1, category: "vegetables", date: "2026-04-12" },
  { commodity: "Potato", variety: "Jyoti", state: "Uttar Pradesh", district: "Agra", market: "Agra (Sanjay Place)", min: 600, max: 900, modal: 750, trend: "down", change: -3.4, category: "vegetables", date: "2026-04-12" },
  { commodity: "Garlic", variety: "Desi", state: "Madhya Pradesh", district: "Mandsaur", market: "Mandsaur", min: 4000, max: 6500, modal: 5200, trend: "up", change: 2.1, category: "vegetables", date: "2026-04-12" },
  { commodity: "Ginger", variety: "Green", state: "Karnataka", district: "Hassan", market: "Hassan", min: 3500, max: 5000, modal: 4200, trend: "stable", change: 0.3, category: "vegetables", date: "2026-04-12" },
  { commodity: "Cauliflower", variety: "Local", state: "Punjab", district: "Ludhiana", market: "Ludhiana", min: 500, max: 800, modal: 650, trend: "down", change: -6.2, category: "vegetables", date: "2026-04-12" },
  { commodity: "Cabbage", variety: "Green", state: "Haryana", district: "Karnal", market: "Karnal", min: 300, max: 500, modal: 400, trend: "down", change: -4.5, category: "vegetables", date: "2026-04-12" },
  { commodity: "Carrot", variety: "Ooty", state: "Tamil Nadu", district: "Nilgiris", market: "Ooty", min: 2000, max: 3000, modal: 2500, trend: "stable", change: 0.8, category: "vegetables", date: "2026-04-12" },
  { commodity: "Brinjal", variety: "Round", state: "Andhra Pradesh", district: "Kurnool", market: "Kurnool", min: 600, max: 1000, modal: 800, trend: "up", change: 3.7, category: "vegetables", date: "2026-04-12" },
  { commodity: "Capsicum", variety: "Green", state: "Karnataka", district: "Bangalore", market: "Bangalore (Yeshwantpur)", min: 1500, max: 2500, modal: 2000, trend: "up", change: 4.1, category: "vegetables", date: "2026-04-12" },

  // ── Cereals ─────────────────────────────────────────────
  { commodity: "Wheat", variety: "Lok-1", state: "Madhya Pradesh", district: "Indore", market: "Indore (Mandi)", min: 2100, max: 2400, modal: 2275, trend: "stable", change: 0.5, category: "cereals", date: "2026-04-12" },
  { commodity: "Rice", variety: "BPT-5204", state: "Andhra Pradesh", district: "Guntur", market: "Guntur", min: 1800, max: 2200, modal: 2000, trend: "stable", change: 0.2, category: "cereals", date: "2026-04-12" },
  { commodity: "Rice", variety: "Sona Masuri", state: "Telangana", district: "Nizamabad", market: "Nizamabad", min: 2200, max: 2800, modal: 2500, trend: "up", change: 1.8, category: "cereals", date: "2026-04-12" },
  { commodity: "Maize", variety: "Yellow", state: "Bihar", district: "Patna", market: "Patna", min: 1600, max: 2000, modal: 1800, trend: "down", change: -2.3, category: "cereals", date: "2026-04-12" },
  { commodity: "Bajra", variety: "Local", state: "Rajasthan", district: "Jodhpur", market: "Jodhpur", min: 1900, max: 2300, modal: 2100, trend: "stable", change: 0.7, category: "cereals", date: "2026-04-12" },
  { commodity: "Jowar", variety: "Maldandi", state: "Maharashtra", district: "Solapur", market: "Solapur", min: 2800, max: 3400, modal: 3100, trend: "up", change: 3.2, category: "cereals", date: "2026-04-12" },
  { commodity: "Ragi", variety: "Local", state: "Karnataka", district: "Tumkur", market: "Tumkur", min: 3200, max: 3800, modal: 3500, trend: "stable", change: 0.4, category: "cereals", date: "2026-04-12" },

  // ── Pulses ──────────────────────────────────────────────
  { commodity: "Chana (Gram)", variety: "Desi", state: "Madhya Pradesh", district: "Ujjain", market: "Ujjain", min: 4800, max: 5600, modal: 5200, trend: "down", change: -1.5, category: "pulses", date: "2026-04-12" },
  { commodity: "Moong Dal", variety: "Green", state: "Rajasthan", district: "Sikar", market: "Sikar", min: 6500, max: 7800, modal: 7200, trend: "up", change: 2.8, category: "pulses", date: "2026-04-12" },
  { commodity: "Tur Dal", variety: "Local", state: "Maharashtra", district: "Latur", market: "Latur", min: 7000, max: 8500, modal: 7800, trend: "up", change: 5.6, category: "pulses", date: "2026-04-12" },
  { commodity: "Urad Dal", variety: "Black", state: "Madhya Pradesh", district: "Indore", market: "Indore", min: 5500, max: 6800, modal: 6200, trend: "stable", change: 0.9, category: "pulses", date: "2026-04-12" },
  { commodity: "Masoor Dal", variety: "Local", state: "Uttar Pradesh", district: "Varanasi", market: "Varanasi", min: 5000, max: 6200, modal: 5600, trend: "up", change: 1.4, category: "pulses", date: "2026-04-12" },

  // ── Fruits ──────────────────────────────────────────────
  { commodity: "Banana", variety: "Cavendish", state: "Tamil Nadu", district: "Trichy", market: "Trichy", min: 800, max: 1200, modal: 1000, trend: "stable", change: 0.4, category: "fruits", date: "2026-04-12" },
  { commodity: "Mango", variety: "Alphonso", state: "Maharashtra", district: "Ratnagiri", market: "Ratnagiri", min: 5000, max: 12000, modal: 8000, trend: "up", change: 12.3, category: "fruits", date: "2026-04-12" },
  { commodity: "Apple", variety: "Royal Delicious", state: "Himachal Pradesh", district: "Shimla", market: "Shimla (Dhalli)", min: 4000, max: 7000, modal: 5500, trend: "stable", change: 0.1, category: "fruits", date: "2026-04-12" },
  { commodity: "Grapes", variety: "Thompson", state: "Maharashtra", district: "Nashik", market: "Nashik", min: 3000, max: 5000, modal: 4000, trend: "down", change: -3.1, category: "fruits", date: "2026-04-12" },
  { commodity: "Pomegranate", variety: "Bhagwa", state: "Maharashtra", district: "Solapur", market: "Solapur", min: 6000, max: 10000, modal: 8000, trend: "up", change: 4.5, category: "fruits", date: "2026-04-12" },
  { commodity: "Watermelon", variety: "Sugar Baby", state: "Karnataka", district: "Chitradurga", market: "Chitradurga", min: 400, max: 800, modal: 600, trend: "down", change: -8.2, category: "fruits", date: "2026-04-12" },

  // ── Spices ──────────────────────────────────────────────
  { commodity: "Chili", variety: "Teja", state: "Andhra Pradesh", district: "Guntur", market: "Guntur", min: 12000, max: 18000, modal: 15000, trend: "up", change: 6.3, category: "spices", date: "2026-04-12" },
  { commodity: "Turmeric", variety: "Finger", state: "Telangana", district: "Nizamabad", market: "Nizamabad", min: 8000, max: 12000, modal: 10000, trend: "up", change: 4.7, category: "spices", date: "2026-04-12" },
  { commodity: "Coriander", variety: "Eagle", state: "Rajasthan", district: "Kota", market: "Kota", min: 6000, max: 8000, modal: 7000, trend: "stable", change: 0.3, category: "spices", date: "2026-04-12" },
  { commodity: "Cumin", variety: "Local", state: "Gujarat", district: "Unjha", market: "Unjha", min: 30000, max: 42000, modal: 36000, trend: "up", change: 7.8, category: "spices", date: "2026-04-12" },

  // ── Oilseeds ────────────────────────────────────────────
  { commodity: "Soybean", variety: "Yellow", state: "Madhya Pradesh", district: "Indore", market: "Indore", min: 4000, max: 5000, modal: 4500, trend: "down", change: -2.1, category: "oilseeds", date: "2026-04-12" },
  { commodity: "Groundnut", variety: "Bold", state: "Gujarat", district: "Junagadh", market: "Junagadh", min: 5000, max: 6500, modal: 5800, trend: "stable", change: 0.6, category: "oilseeds", date: "2026-04-12" },
  { commodity: "Mustard", variety: "Yellow", state: "Rajasthan", district: "Alwar", market: "Alwar", min: 4500, max: 5500, modal: 5000, trend: "up", change: 1.9, category: "oilseeds", date: "2026-04-12" },
  { commodity: "Sunflower", variety: "Local", state: "Karnataka", district: "Bellary", market: "Bellary", min: 5500, max: 7000, modal: 6200, trend: "up", change: 3.4, category: "oilseeds", date: "2026-04-12" },
  { commodity: "Coconut", variety: "Whole", state: "Karnataka", district: "Tumkur", market: "Tiptur", min: 8000, max: 12000, modal: 10000, trend: "stable", change: 0.2, category: "oilseeds", date: "2026-04-12" },

  // ── Cash Crops ──────────────────────────────────────────
  { commodity: "Cotton", variety: "MCU-5", state: "Gujarat", district: "Rajkot", market: "Rajkot", min: 5800, max: 7200, modal: 6500, trend: "down", change: -1.3, category: "oilseeds", date: "2026-04-12" },
  { commodity: "Sugarcane", variety: "Co-62175", state: "Uttar Pradesh", district: "Muzaffarnagar", market: "Muzaffarnagar", min: 350, max: 400, modal: 380, trend: "stable", change: 0.0, category: "cereals", date: "2026-04-12" },
];

/** MSP (Minimum Support Price) for major crops 2025-26  */
export const mspData = {
  "Wheat": 2275,
  "Rice": 2320,
  "Maize": 2090,
  "Bajra": 2625,
  "Jowar": 3371,
  "Ragi": 4290,
  "Chana (Gram)": 5440,
  "Tur Dal": 7550,
  "Moong Dal": 8682,
  "Urad Dal": 6950,
  "Masoor Dal": 6425,
  "Soybean": 4892,
  "Groundnut": 6377,
  "Mustard": 5650,
  "Sunflower": 6760,
  "Cotton": 7121,
  "Sugarcane": 340,
};

/** Indian states list for filter dropdown */
export const indianStates = [
  "Andhra Pradesh", "Bihar", "Gujarat", "Haryana", "Himachal Pradesh",
  "Karnataka", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh",
];

/** Price categories */
export const priceCategories = [
  { id: "all", label: "All", labelHi: "सभी" },
  { id: "cereals", label: "Cereals", labelHi: "अनाज" },
  { id: "pulses", label: "Pulses", labelHi: "दालें" },
  { id: "vegetables", label: "Vegetables", labelHi: "सब्ज़ियां" },
  { id: "fruits", label: "Fruits", labelHi: "फल" },
  { id: "spices", label: "Spices", labelHi: "मसाले" },
  { id: "oilseeds", label: "Oilseeds", labelHi: "तिलहन" },
];

export default mockMarketPrices;
