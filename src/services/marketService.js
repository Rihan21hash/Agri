const BASE_URL = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";
const API_KEY = import.meta.env.VITE_DATAGOVIN_API_KEY;

export const fetchMarketPrices = async ({ state = "", commodity = "", date = "" } = {}) => {
  const params = new URLSearchParams({
    "api-key": API_KEY,
    format: "json",
    limit: 100,
    offset: 0,
    ...(state     && { "filters[State]": state }),
    ...(commodity && { "filters[Commodity]": commodity }),
    ...(date      && { "filters[Arrival_Date]": date }),
  });

  try {
    const res = await fetch(`${BASE_URL}?${params}`);
    if (!res.ok) throw new Error("Failed to fetch market prices");
    const data = await res.json();
    return data.records || [];
  } catch (error) {
    console.error("Market price fetch error:", error);
    return [];
  }
};