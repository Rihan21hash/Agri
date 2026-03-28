import Timer from "./Timer";

const ONE_HOUR_MS = 60 * 60 * 1000;

function ListingCard({ listing, onInterested, isAuthenticated }) {
  const expiresAt = listing.expiresAt ?? 0;
  const isExpired = Date.now() >= expiresAt;
  const isSold = listing.status === "sold";
  const urgent =
    !isSold && !isExpired && expiresAt - Date.now() <= ONE_HOUR_MS;

  let statusLabel = "Available";
  if (isSold) {
    statusLabel = "Sold";
  } else if (isExpired) {
    statusLabel = "Expired";
  }

  const canBeInterested = isAuthenticated && !isSold && !isExpired;
  const statusClass = statusLabel.toLowerCase();

  const statusStyles = {
    available:
      "border-accent-200 bg-accent-50 text-accent-800",
    expired: "border-red-200 bg-red-50 text-red-800",
    sold: "border-slate-200 bg-slate-100 text-slate-600",
  };

  const ringClass = urgent
    ? "ring-2 ring-amber-400/60 shadow-md"
    : "shadow-sm";

  return (
    <article
      className={`group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card ${ringClass} ${
        isSold ? "opacity-90" : ""
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-tight text-slate-900">
          {listing.cropName}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${statusStyles[statusClass] ?? statusStyles.available}`}
        >
          {statusLabel}
        </span>
      </div>

      <dl className="space-y-2 text-sm text-slate-600">
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Quantity</dt>
          <dd className="font-medium text-slate-900">{listing.quantity}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Price</dt>
          <dd className="font-medium text-slate-900">{listing.price}</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm">
        <span className="font-medium text-slate-500">Time left</span>
        <span className="font-mono text-sm tabular-nums font-semibold text-slate-900">
          <Timer expiresAt={listing.expiresAt} />
        </span>
      </div>

      <button
        type="button"
        onClick={() => onInterested(listing.id)}
        disabled={!canBeInterested}
        className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
      >
        {!isAuthenticated
          ? "Login to Interested"
          : isSold
            ? "Sold"
            : isExpired
              ? "Expired"
              : "Interested"}
      </button>
    </article>
  );
}

export default ListingCard;
