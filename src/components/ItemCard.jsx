import { Link } from "react-router-dom";
import Timer from "./Timer";
import { Clock, MapPin, DollarSign, Store } from "lucide-react";

const ONE_HOUR_MS = 60 * 60 * 1000;

function ItemCard({ item, onMarkSold, isAuthenticated, compact }) {
  const expiresAt = item.expiresAt ?? 0;
  const isExpired = expiresAt ? Date.now() >= expiresAt : false;
  const isSold = item.status === "sold";
  const urgent =
    !isSold && !isExpired && expiresAt && expiresAt - Date.now() <= ONE_HOUR_MS;

  let statusLabel = "Available";
  let badgeStyles = "bg-agri-green-100 text-agri-green-800 border-agri-green-200";

  if (isSold) {
    statusLabel = "Sold";
    badgeStyles = "bg-soil-dark-100 text-soil-dark-700 border-soil-dark-200";
  } else if (isExpired && expiresAt) {
    statusLabel = "Expired";
    badgeStyles = "bg-red-100 text-red-800 border-red-200";
  } else if (urgent) {
    statusLabel = "Expiring Soon";
    badgeStyles = "bg-harvest-gold-100 text-harvest-gold-800 border-harvest-gold-300 animate-pulse";
  }

  const canMarkSold = isAuthenticated && !isSold && !isExpired;

  const ringClass = urgent
    ? "ring-2 ring-harvest-gold-500 shadow-floating"
    : "shadow-card hover:shadow-card-hover border border-soil-dark-100";

  const imageSrc =
    item.imageUrl?.trim() ||
    "/images/placeholder_crop_1775016486419.png";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 relative ${ringClass} ${
        isSold ? "opacity-75 grayscale-[0.3]" : ""
      }`}
    >
      <Link to={`/item/${item.id}`} className="relative block aspect-[4/3] overflow-hidden bg-cream-50">
        <img
          src={imageSrc}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay for text readability at the bottom of the image if ever we wanted text there */}
        <div className="absolute inset-0 bg-gradient-to-t from-soil-dark-950/60 via-transparent" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-opacity-90 ${badgeStyles}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
           <h3 className="font-display text-2xl font-bold leading-tight drop-shadow-md line-clamp-1">
             {item.title}
           </h3>
           <p className="flex items-center gap-1 text-sm font-medium opacity-90 mt-1">
             <MapPin className="h-4 w-4" /> Local Harvest
           </p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p
          className={`${compact ? "line-clamp-2" : "line-clamp-3"} text-sm leading-relaxed text-soil-dark-600 mb-4`}
        >
          {item.description}
        </p>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-agri-green-700 font-display text-2xl font-bold">
               <DollarSign className="h-6 w-6 -mr-1" />
               {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
            </div>
            
            {expiresAt ? (
              <div className={`flex flex-col items-end ${urgent ? 'text-harvest-gold-600' : 'text-soil-dark-500'}`}>
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Time left</span>
                <span className="flex items-center gap-1 font-mono text-base font-bold tabular-nums">
                  <Clock className="h-4 w-4" />
                  <Timer expiresAt={expiresAt} />
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-end text-soil-dark-500">
                <span className="text-xs font-bold uppercase tracking-wider">Listing</span>
                <span className="text-sm font-bold">Always Open</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-soil-dark-100">
            <Link
              to={`/item/${item.id}`}
              className="inline-flex flex-1 min-w-[8rem] items-center justify-center gap-2 rounded-xl bg-soil-dark-50 px-4 py-3 text-sm font-bold text-soil-dark-700 transition-colors hover:bg-soil-dark-100"
            >
               View Details
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onMarkSold?.(item.id);
              }}
              disabled={!canMarkSold}
              className={`inline-flex flex-1 min-w-[8rem] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                !isAuthenticated
                  ? 'bg-soil-dark-200 text-soil-dark-500 cursor-not-allowed'
                  : isSold || isExpired
                    ? 'bg-soil-dark-200 text-soil-dark-500 cursor-not-allowed'
                    : 'bg-agri-green-600 hover:bg-agri-green-700 shadow-floating hover:-translate-y-0.5 focus:ring-agri-green-500'
              }`}
            >
              {!isAuthenticated
                ? "Login to buy"
                : isSold
                  ? "Sold Out"
                  : isExpired
                    ? "Expired"
                    : "I'm Interested"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
