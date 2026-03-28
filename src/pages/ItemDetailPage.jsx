import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { markAsSold, subscribeItem } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";

const ONE_HOUR_MS = 60 * 60 * 1000;

function ItemDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [item, setItem] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) return undefined;
    setResolved(false);
    setItem(null);
    const unsub = subscribeItem(
      db,
      id,
      (data) => {
        setError(null);
        setItem(data);
        setResolved(true);
      },
      (err) => {
        setError(formatFirebaseError(err));
        setResolved(true);
      }
    );
    return unsub;
  }, [id]);

  const expiresAt = item?.expiresAt ?? 0;
  const isExpired = expiresAt ? Date.now() >= expiresAt : false;
  const isSold = item?.status === "sold";
  const urgent =
    !isSold && !isExpired && expiresAt && expiresAt - Date.now() <= ONE_HOUR_MS;

  const canMarkSold =
    Boolean(currentUser) && !isSold && !isExpired;

  const handleMarkSold = useCallback(async () => {
    if (!item?.id || !currentUser) return;
    setActionError(null);
    setActionLoading(true);
    try {
      await markAsSold(db, item.id);
    } catch (e) {
      setActionError(formatFirebaseError(e));
    } finally {
      setActionLoading(false);
    }
  }, [item?.id, currentUser]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-800" role="alert">
        {error}
      </div>
    );
  }

  if (!resolved) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-earth-200 border-t-accent-600" />
        <p className="text-sm text-earth-600">Loading listing…</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-xl border border-earth-200 bg-white px-6 py-12 text-center shadow-sm">
        <p className="font-medium text-earth-800">This listing could not be found.</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block text-sm font-semibold text-accent-800 hover:underline"
        >
          Return to marketplace
        </Link>
      </div>
    );
  }

  const imageSrc =
    item.imageUrl?.trim() ||
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=65";

  let statusLabel = "Available";
  if (isSold) statusLabel = "Sold";
  else if (isExpired && expiresAt) statusLabel = "Expired";

  return (
    <article className="overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-card">
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="relative aspect-[4/3] bg-earth-100 lg:aspect-auto lg:min-h-[420px]">
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover"
          />
          {urgent ? (
            <span className="absolute left-4 top-4 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
              Urgent
            </span>
          ) : null}
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-800">
            Listing
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-earth-950">
            {item.title}
          </h1>
          <p
            className={`mt-3 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold uppercase ${
              isSold
                ? "border-earth-200 bg-earth-100 text-earth-700"
                : isExpired
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-accent-200 bg-accent-50 text-accent-900"
            }`}
          >
            {statusLabel}
          </p>

          <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-earth-700">
            {item.description}
          </p>

          <dl className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-earth-100 pb-3">
              <dt className="text-earth-500">Price</dt>
              <dd className="font-semibold text-earth-950">
                {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-earth-100 pb-3">
              <dt className="text-earth-500">Seller id</dt>
              <dd className="max-w-[60%] truncate font-mono text-xs text-earth-800">
                {item.sellerId}
              </dd>
            </div>
            {expiresAt ? (
              <div className="flex justify-between gap-4">
                <dt className="text-earth-500">Time left</dt>
                <dd className="font-mono font-semibold text-earth-950">
                  <Timer expiresAt={expiresAt} />
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!canMarkSold || actionLoading}
              onClick={handleMarkSold}
              className="inline-flex min-w-[10rem] flex-1 items-center justify-center rounded-xl bg-earth-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-earth-800 disabled:cursor-not-allowed disabled:bg-earth-200 disabled:text-earth-500"
            >
              {actionLoading
                ? "Updating…"
                : !currentUser
                  ? "Login to respond"
                  : isSold
                    ? "Sold"
                    : isExpired
                      ? "Expired"
                      : "Mark interested"}
            </button>
            <Link
              to="/dashboard"
              className="inline-flex min-w-[8rem] flex-1 items-center justify-center rounded-xl border border-earth-200 bg-white px-6 py-3 text-sm font-semibold text-earth-800 transition hover:border-accent-300 hover:bg-accent-50"
            >
              Back to market
            </Link>
          </div>

          {actionError ? (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {actionError}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default ItemDetailPage;
