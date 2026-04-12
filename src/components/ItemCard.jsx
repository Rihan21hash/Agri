import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Timer from "./Timer";
import UrgencyBadge from "./UrgencyBadge";
import { cn } from "../lib/cn";
import { Clock, MapPin, IndianRupee, MessageCircle, HandCoins } from "lucide-react";
import { detectProductImage } from "../data/cropImageMap";

const ONE_HOUR_MS = 60 * 60 * 1000;

function ItemCard({ item, onMarkSold, isAuthenticated, compact, onChat, onOffer }) {
  const expiresAt = item.expiresAt ?? 0;
  const isExpired = expiresAt ? Date.now() >= expiresAt : false;
  const isSold = item.status === "sold";
  const urgent =
    !isSold && !isExpired && expiresAt && expiresAt - Date.now() <= ONE_HOUR_MS;

  const urgencyLevel = isSold ? "sold" : isExpired && expiresAt ? "expired" : urgent ? "urgent" : expiresAt ? "soon" : "normal";



  const ringClass = urgent
    ? "ring-2 ring-harvest-gold-500 shadow-floating"
    : "shadow-card hover:shadow-card-hover border border-soil-dark-100";

  // Use auto-detected image if no imageUrl provided
  const hasImage = Boolean(item.imageUrl?.trim());
  const imageSrc = hasImage
    ? item.imageUrl
    : detectProductImage(item.title).imageUrl;

  return (
    <motion.article
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 relative",
        ringClass,
        isSold && "opacity-75 grayscale-[0.3]"
      )}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      layout
    >
      <Link to={`/item/${item.id}`} className="relative block aspect-[4/3] overflow-hidden bg-cream-50">
        <img
          src={imageSrc}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-dark-950/60 via-transparent" />

        <div className="absolute top-4 right-4">
          <UrgencyBadge level={urgencyLevel} />
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
          className={cn(
            "text-sm leading-relaxed text-soil-dark-600 mb-4",
            compact ? "line-clamp-2" : "line-clamp-3"
          )}
        >
          {item.description}
        </p>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-agri-green-700 font-display text-2xl font-bold">
              <IndianRupee className="h-6 w-6 -mr-1" />
              {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
            </div>

            {expiresAt ? (
              <div className={cn("flex flex-col items-end", urgent ? "text-harvest-gold-600" : "text-soil-dark-500")}>
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

          {/* Quick action buttons */}
          <div className="flex gap-1.5 pt-2 border-t border-soil-dark-100">
            <Link
              to={`/item/${item.id}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-soil-dark-50 px-3 py-2.5 text-xs font-bold text-soil-dark-700 transition-colors hover:bg-soil-dark-100"
            >
              View
            </Link>
            {isAuthenticated && !isSold && !isExpired && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); onChat?.(item); }}
                  className="flex items-center justify-center gap-1 rounded-xl bg-agri-green-50 px-3 py-2.5 text-xs font-bold text-agri-green-700 transition-colors hover:bg-agri-green-100"
                  title="Chat with seller"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Chat
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); onOffer?.(item); }}
                  className="flex items-center justify-center gap-1 rounded-xl bg-harvest-gold-50 px-3 py-2.5 text-xs font-bold text-harvest-gold-700 transition-colors hover:bg-harvest-gold-100"
                  title="Make offer"
                >
                  <HandCoins className="h-3.5 w-3.5" /> Offer
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/auth"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-agri-green-600 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-agri-green-700"
              >
                Login to buy
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ItemCard;
