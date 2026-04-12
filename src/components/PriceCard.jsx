import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, IndianRupee } from "lucide-react";
import { cn } from "../lib/cn";
import { detectProductImage } from "../data/cropImageMap";
import { mspData } from "../data/mockMarketPrices";

const trendIcons = {
  up: { Icon: TrendingUp, color: "text-agri-green-600", bg: "bg-agri-green-50" },
  down: { Icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
  stable: { Icon: Minus, color: "text-soil-dark-500", bg: "bg-soil-dark-50" },
};

export default function PriceCard({ data, className }) {
  const { commodity, variety, state, district, market, min, max, modal, trend, change, category } = data;
  const { Icon, color, bg } = trendIcons[trend] || trendIcons.stable;
  const { imageUrl } = detectProductImage(commodity);
  const msp = mspData[commodity];

  return (
    <div className={cn(
      "group flex flex-col overflow-hidden rounded-2xl border border-soil-dark-100 bg-white shadow-sm transition-all duration-300 hover:shadow-card",
      className
    )}>
      {/* Top — image + commodity */}
      <div className="flex items-center gap-4 p-4 border-b border-soil-dark-100">
        <img
          src={imageUrl}
          alt={commodity}
          className="h-14 w-14 rounded-xl object-cover border border-soil-dark-100"
          onError={(e) => { e.target.src = "https://picsum.photos/seed/crop/56/56"; }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg font-bold text-soil-dark-950 truncate">{commodity}</h4>
          <p className="text-xs text-soil-dark-500 truncate">{variety} · {market}</p>
          <p className="text-xs text-soil-dark-400">📍 {district}, {state}</p>
        </div>
        <div className={cn("flex flex-col items-center rounded-xl px-3 py-2", bg)}>
          <Icon className={cn("h-5 w-5", color)} />
          <span className={cn("text-xs font-bold", color)}>
            {change > 0 ? "+" : ""}{change}%
          </span>
        </div>
      </div>

      {/* Price row */}
      <div className="grid grid-cols-3 gap-1 p-4">
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-soil-dark-400">Min</p>
          <p className="flex items-center justify-center text-sm font-bold text-soil-dark-700">
            <IndianRupee className="h-3 w-3" />{min.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-center rounded-xl bg-agri-green-50 border border-agri-green-200 py-1">
          <p className="text-xs font-bold uppercase text-agri-green-600">Modal</p>
          <p className="flex items-center justify-center text-lg font-bold text-agri-green-800">
            <IndianRupee className="h-4 w-4" />{modal.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold uppercase text-soil-dark-400">Max</p>
          <p className="flex items-center justify-center text-sm font-bold text-soil-dark-700">
            <IndianRupee className="h-3 w-3" />{max.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* MSP banner */}
      {msp && (
        <div className="mx-4 mb-2 rounded-lg bg-harvest-gold-50 border border-harvest-gold-200 px-3 py-1.5 text-xs font-bold text-harvest-gold-800">
          🏛️ Govt MSP: ₹{msp.toLocaleString("en-IN")}/quintal
        </div>
      )}

      {/* CTA */}
      <div className="p-4 pt-2">
        <Link
          to="/post"
          state={{ cropName: commodity }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-soil-dark-50 px-4 py-2.5 text-sm font-bold text-soil-dark-700 transition-colors hover:bg-agri-green-50 hover:text-agri-green-700"
        >
          📋 List for Distress Sale
        </Link>
      </div>
    </div>
  );
}
