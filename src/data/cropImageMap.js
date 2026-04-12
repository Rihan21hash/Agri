/**
 * 100+ keyword → stock image URL mappings for auto-detection
 * when a user types a crop/product name in the listing form.
 *
 * Uses picsum.photos as a reliable CDN with seed-based deterministic images.
 * Each keyword gets a unique, consistent image via the seed parameter.
 */

const IMG = (seed) => `https://picsum.photos/seed/${seed}/400/300`;

const cropImageMap = {
  // ── Vegetables ──────────────────────────────────────────
  potato:       "https://images.unsplash.com/photo-1518977676601-b53f82ber6?w=400&h=300&fit=crop",
  tomato:       "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=300&fit=crop",
  onion:        "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop",
  garlic:       "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=400&h=300&fit=crop",
  ginger:       "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop",
  carrot:       "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop",
  radish:       IMG("radish-farm"),
  beetroot:     IMG("beetroot-fresh"),
  spinach:      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
  cabbage:      IMG("cabbage-green"),
  cauliflower:  IMG("cauliflower-white"),
  broccoli:     "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop",
  lettuce:      IMG("lettuce-fresh"),
  peas:         "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=300&fit=crop",
  beans:        IMG("green-beans"),
  chickpeas:    IMG("chickpeas-bowl"),
  lentils:      IMG("lentils-dal"),
  soybeans:     IMG("soybeans-field"),
  capsicum:     IMG("capsicum-bell"),
  okra:         IMG("okra-ladyfinger"),
  eggplant:     IMG("eggplant-brinjal"),
  pumpkin:      IMG("pumpkin-farm"),
  cucumber:     IMG("cucumber-fresh"),
  bitter_gourd: IMG("bitter-gourd"),
  bottle_gourd: IMG("bottle-gourd"),
  drumstick:    IMG("drumstick-moringa"),

  // ── Grains & Cereals ───────────────────────────────────
  wheat:        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
  rice:         "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop",
  corn:         "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
  maize:        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
  barley:       IMG("barley-grain"),
  millet:       IMG("millet-bajra"),
  sorghum:      IMG("sorghum-jowar"),
  bajra:        IMG("bajra-millet"),
  jowar:        IMG("jowar-sorghum"),
  ragi:         IMG("ragi-finger-millet"),

  // ── Cash Crops ──────────────────────────────────────────
  sugarcane:    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
  cotton:       "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?w=400&h=300&fit=crop",
  jute:         IMG("jute-fiber"),
  tobacco:      IMG("tobacco-leaf"),
  tea:          IMG("tea-plantation"),
  coffee:       IMG("coffee-beans"),

  // ── Oilseeds ────────────────────────────────────────────
  sunflower:    "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=300&fit=crop",
  mustard:      IMG("mustard-yellow"),
  groundnut:    IMG("groundnut-peanut"),
  coconut:      "https://images.unsplash.com/photo-1550828520-4cb496926fc9?w=400&h=300&fit=crop",
  sesame:       IMG("sesame-seeds"),
  castor:       IMG("castor-plant"),

  // ── Fruits ──────────────────────────────────────────────
  banana:       "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
  mango:        "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
  papaya:       IMG("papaya-tropical"),
  guava:        IMG("guava-fruit"),
  watermelon:   "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&h=300&fit=crop",
  muskmelon:    IMG("muskmelon-cantaloupe"),
  grapes:       "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop",
  pomegranate:  IMG("pomegranate-red"),
  orange:       "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop",
  lemon:        "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&h=300&fit=crop",
  lime:         IMG("lime-citrus"),
  apple:        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop",
  pear:         IMG("pear-fruit"),
  peach:        IMG("peach-ripe"),
  plum:         IMG("plum-purple"),
  strawberry:   "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop",
  blueberry:    IMG("blueberry-fresh"),
  pineapple:    "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop",
  jackfruit:    IMG("jackfruit-tropical"),
  fig:          IMG("fig-anjeer"),
  dates:        IMG("dates-khajoor"),
  sapota:       IMG("sapota-chikoo"),
  custard_apple: IMG("custard-apple"),
  litchi:       IMG("litchi-lychee"),

  // ── Spices ──────────────────────────────────────────────
  chili:        "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400&h=300&fit=crop",
  turmeric:     "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=300&fit=crop",
  coriander:    IMG("coriander-dhania"),
  cumin:        IMG("cumin-jeera"),
  fennel:       IMG("fennel-saunf"),
  cardamom:     IMG("cardamom-elaichi"),
  cloves:       IMG("cloves-laung"),
  pepper:       IMG("black-pepper"),
  saffron:      IMG("saffron-kesar"),
  vanilla:      IMG("vanilla-pod"),
  cinnamon:     IMG("cinnamon-dalchini"),
  nutmeg:       IMG("nutmeg-jaiphal"),

  // ── Household / Electronics / Equipment ─────────────────
  furniture:    IMG("furniture-wood"),
  sofa:         IMG("sofa-couch"),
  chair:        IMG("chair-wooden"),
  table:        IMG("table-dining"),
  bed:          IMG("bed-frame"),
  wardrobe:     IMG("wardrobe-closet"),
  refrigerator: IMG("refrigerator-fridge"),
  washing_machine: IMG("washing-machine"),
  television:   IMG("television-tv"),
  laptop:       IMG("laptop-computer"),
  mobile:       IMG("mobile-phone"),
  camera:       IMG("camera-dslr"),
  bicycle:      IMG("bicycle-cycle"),
  motorcycle:   IMG("motorcycle-bike"),
  car:          IMG("car-sedan"),
  scooter:      IMG("scooter-vehicle"),
  tractor:      IMG("tractor-farm"),
  plow:         IMG("plow-field"),
  seeds:        IMG("seeds-planting"),
  fertilizer:   IMG("fertilizer-bag"),
  pesticide:    IMG("pesticide-spray"),
  tools:        IMG("farm-tools"),
  sickle:       IMG("sickle-harvest"),
  harvester:    IMG("harvester-combine"),
  irrigation_pump: IMG("irrigation-pump"),
  solar_panel:  IMG("solar-panel"),
  generator:    IMG("generator-power"),
  inverter:     IMG("inverter-battery"),
  books:        IMG("books-stack"),
  clothes:      IMG("clothes-wear"),
  shoes:        IMG("shoes-pair"),
  bags:         IMG("bags-luggage"),
  jewelry:      IMG("jewelry-gold"),
  watch:        IMG("watch-wrist"),
  fan:          IMG("fan-ceiling"),
  ac:           IMG("air-conditioner"),
  cooler:       IMG("cooler-desert"),
  mixer:        IMG("mixer-grinder"),
  grinder:      IMG("grinder-kitchen"),
  pressure_cooker: IMG("pressure-cooker"),
  utensils:     IMG("utensils-kitchen"),
  tent:         IMG("tent-camping"),
  timber:       IMG("timber-wood"),
  bricks:       IMG("bricks-red"),
  cement:       IMG("cement-bag"),
  pipes:        IMG("pipes-pvc"),
  cables:       IMG("cables-wire"),
  drum:         IMG("drum-container"),
  tank:         IMG("water-tank"),
  tarpaulin:    IMG("tarpaulin-cover"),
  net:          IMG("net-fishing"),
  rope:         IMG("rope-jute"),
};

/** Default fallback image */
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop";

/**
 * Detect a matching product keyword from user input text
 * and return the corresponding stock image URL.
 *
 * @param {string} inputText - The text the user typed
 * @returns {{ keyword: string|null, imageUrl: string }}
 */
export function detectProductImage(inputText) {
  if (!inputText) return { keyword: null, imageUrl: DEFAULT_IMAGE };

  const lower = inputText.toLowerCase().replace(/[_-]/g, " ");

  // Try exact word match first, then substring
  for (const key of Object.keys(cropImageMap)) {
    const searchKey = key.replace(/_/g, " ");
    // Word boundary match
    const regex = new RegExp(`\\b${searchKey}\\b`, "i");
    if (regex.test(lower)) {
      return { keyword: key, imageUrl: cropImageMap[key] };
    }
  }

  // Fallback: substring match
  for (const key of Object.keys(cropImageMap)) {
    const searchKey = key.replace(/_/g, " ");
    if (lower.includes(searchKey)) {
      return { keyword: key, imageUrl: cropImageMap[key] };
    }
  }

  return { keyword: null, imageUrl: DEFAULT_IMAGE };
}

export default cropImageMap;
