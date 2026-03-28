import { Link } from "react-router-dom";
import Timer from "./Timer";

const ONE_HOUR_MS = 60 * 60 * 1000;

function ItemCard({ item, onMarkSold, isAuthenticated, compact }) {
  const expiresAt = item.expiresAt ?? 0;
  const isExpired = expiresAt ? Date.now() >= expiresAt : false;
  const isSold = item.status === "sold";
  const urgent =
    !isSold && !isExpired && expiresAt && expiresAt - Date.now() <= ONE_HOUR_MS;

  let statusLabel = "Available";
  if (isSold) {
    statusLabel = "Sold";
  } else if (isExpired && expiresAt) {
    statusLabel = "Expired";
  }

  const canMarkSold = isAuthenticated && !isSold && !isExpired;
  const statusKey = statusLabel.toLowerCase();

  const statusStyles = {
    available: "border-accent-200 bg-accent-50 text-accent-900",
    expired: "border-red-200 bg-red-50 text-red-800",
    sold: "border-earth-200 bg-earth-100 text-earth-700",
  };

  const ringClass = urgent
    ? "ring-2 ring-amber-400/60 shadow-md"
    : "shadow-sm";

  const imageSrc =
    item.imageUrl?.trim() ||
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=60";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-earth-200/90 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-earth-300 hover:shadow-card ${ringClass} ${
        isSold ? "opacity-90" : ""
      }`}
    >
      <Link to={`/item/${item.id}`} className="relative block aspect-[4/3] overflow-hidden bg-earth-100">
        <img
          src={imageSrc}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <span
          className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${statusStyles[statusKey] ?? statusStyles.available}`}
        >
          {statusLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link to={`/item/${item.id}`}>
            <h3 className="font-display text-lg font-semibold leading-tight text-earth-950 hover:text-accent-800">
              {item.title}
            </h3>
          </Link>
        </div>

        <p
          className={`${compact ? "line-clamp-2" : "line-clamp-3"} text-sm leading-relaxed text-earth-600`}
        >
          {item.description}
        </p>

        <dl className="mt-4 space-y-2 text-sm text-earth-600">
          <div className="flex justify-between gap-2">
            <dt className="text-earth-500">Price</dt>
            <dd className="font-semibold text-earth-950">
              {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
            </dd>
          </div>
        </dl>

        {expiresAt ? (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-earth-50 px-3 py-2 text-sm">
            <span className="font-medium text-earth-500">Time left</span>
            <span className="font-mono text-sm tabular-nums font-semibold text-earth-950">
              <Timer expiresAt={expiresAt} />
            </span>
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-earth-50 px-3 py-2 text-sm text-earth-500">
            Open listing — no fixed deadline
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/item/${item.id}`}
            className="inline-flex flex-1 min-w-[8rem] items-center justify-center rounded-xl border border-earth-200 bg-white px-4 py-2.5 text-sm font-semibold text-earth-800 transition hover:border-accent-300 hover:bg-accent-50"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={() => onMarkSold?.(item.id)}
            disabled={!canMarkSold}
            className="inline-flex flex-1 min-w-[8rem] items-center justify-center rounded-xl bg-earth-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-earth-800 focus:outline-none focus:ring-2 focus:ring-earth-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-earth-200 disabled:text-earth-500"
          >
            {!isAuthenticated
              ? "Login to respond"
              : isSold
                ? "Sold"
                : isExpired
                  ? "Expired"
                  : "Mark interested"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
