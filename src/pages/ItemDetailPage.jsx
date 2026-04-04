import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { markAsSold, subscribeItem } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { Clock, IndianRupee, MapPin, Loader2, AlertCircle, Phone, Info } from "lucide-react";

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
      <div className="flex items-center gap-3 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm font-medium text-red-800 shadow-sm" role="alert">
         <AlertCircle className="h-6 w-6 shrink-0" />
         <p>{error}</p>
      </div>
    );
  }

  if (!resolved) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-agri-green-600">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-sm font-bold tracking-widest uppercase">Loading listing…</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="rounded-3xl border border-soil-dark-200 bg-white px-6 py-24 text-center shadow-card flex flex-col items-center justify-center">
        <AlertCircle className="h-12 w-12 text-soil-dark-300 mb-4" />
        <p className="font-display text-xl font-bold text-soil-dark-900">This harvest listing could not be found.</p>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-agri-green-50 px-6 py-3 text-sm font-bold text-agri-green-700 transition hover:bg-agri-green-100"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const imageSrc =
    item.imageUrl?.trim() ||
    "/images/placeholder_crop_1775016486419.png";

  let statusLabel = "Available Now";
  let badgeStyles = "bg-agri-green-100 text-agri-green-800 border-agri-green-200";

  if (isSold) {
    statusLabel = "Sold Out";
    badgeStyles = "bg-soil-dark-100 text-soil-dark-700 border-soil-dark-200";
  } else if (isExpired && expiresAt) {
    statusLabel = "Expired";
    badgeStyles = "bg-red-100 text-red-800 border-red-200";
  } else if (urgent) {
    statusLabel = "Expiring Soon";
    badgeStyles = "bg-harvest-gold-100 text-harvest-gold-800 border-harvest-gold-300 animate-pulse";
  }

  return (
    <article className={`overflow-hidden rounded-3xl bg-white shadow-card relative ${isSold ? 'opacity-80' : ''}`}>
      <div className="absolute top-6 left-6 z-10 flex gap-2">
         <Link to="/dashboard" className="rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-sm font-bold text-soil-dark-800 shadow-sm border border-soil-dark-100 hover:bg-white transition-colors">
            &larr; Back
         </Link>
      </div>

      <div className="grid overflow-hidden lg:grid-cols-2">
        
        {/* Left Side: Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-full bg-cream-50 overflow-hidden">
          <img
            src={imageSrc}
            alt={item.title}
            className={`h-full w-full object-cover transition-transform duration-700 hover:scale-105 ${isSold ? 'grayscale-[0.5]' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil-dark-950/60 to-transparent lg:bg-none" />
          
          <div className="absolute top-6 right-6">
             <span
               className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-opacity-95 shadow-floating ${badgeStyles}`}
             >
               {statusLabel}
             </span>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 lg:hidden text-white drop-shadow-md">
             <h1 className="font-display text-4xl font-bold leading-tight mb-2">
                {item.title}
             </h1>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
          
          <div>
            <div className="hidden lg:block mb-8">
               <div className="flex items-center gap-2 text-sm font-bold text-soil-dark-500 uppercase tracking-widest mb-2">
                  <MapPin className="h-4 w-4" /> Local Harvest
               </div>
               <h1 className="font-display text-4xl xl:text-5xl font-bold text-soil-dark-950 leading-tight">
                 {item.title}
               </h1>
            </div>

            <div className="space-y-6">
              
              <div className="rounded-2xl bg-soil-dark-50 p-6 border border-soil-dark-100">
                 <h3 className="text-xs font-bold uppercase tracking-widest text-soil-dark-500 mb-4 flex items-center gap-2">
                    <Info className="h-4 w-4" /> Description
                 </h3>
                 <p className="whitespace-pre-wrap text-base font-medium leading-relaxed text-soil-dark-800">
                   {item.description}
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="rounded-2xl bg-white p-5 border border-soil-dark-100 shadow-sm flex flex-col justify-center">
                    <dt className="text-xs font-bold uppercase tracking-widest text-soil-dark-500 mb-1">Asking Price</dt>
                    <dd className="font-display text-3xl font-bold text-agri-green-700 flex items-center">
                       <IndianRupee className="h-6 w-6 -mr-1" />
                       {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                    </dd>
                 </div>
                 
                 <div className="rounded-2xl bg-white p-5 border border-soil-dark-100 shadow-sm flex flex-col justify-center">
                    <dt className="text-xs font-bold uppercase tracking-widest text-soil-dark-500 mb-1">Status</dt>
                    {expiresAt && !isSold && !isExpired ? (
                      <dd className={`font-mono text-xl font-bold flex items-center gap-2 ${urgent ? 'text-harvest-gold-600 animate-pulse' : 'text-soil-dark-900'}`}>
                        <Clock className="h-5 w-5" />
                        <Timer expiresAt={expiresAt} />
                      </dd>
                    ) : (
                      <dd className="font-bold text-lg text-soil-dark-900 flex items-center gap-2">
                         {isSold ? 'Deal Closed' : isExpired ? 'Expired' : 'Always Open'}
                      </dd>
                    )}
                 </div>
              </div>

            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <button
               type="button"
               disabled={!canMarkSold || actionLoading}
               onClick={handleMarkSold}
               className={`group relative flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-5 text-lg font-bold text-white shadow-floating transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                 !canMarkSold
                   ? "bg-soil-dark-300 cursor-not-allowed shadow-none"
                   : "bg-agri-green-600 hover:bg-agri-green-700 hover:-translate-y-1 hover:shadow-card-hover focus:ring-agri-green-500"
               }`}
             >
               {actionLoading ? (
                 <Loader2 className="h-6 w-6 animate-spin" />
               ) : !currentUser ? (
                 "Login to Buy"
               ) : isSold ? (
                 "Harvest Sold"
               ) : isExpired ? (
                 "Listing Expired"
               ) : (
                 <>
                   <Phone className="h-6 w-6 transition-transform group-hover:scale-110" />
                   I'm Interested - Contact Seller
                 </>
               )}
            </button>
            <p className="text-center text-xs font-bold text-soil-dark-400">
               {currentUser ? `Seller ID: ${item.sellerId}` : 'Create an account to view seller details and coordinate pickup.'}
            </p>

            {actionError ? (
              <div className="rounded-xl bg-red-50 p-4 border border-red-200 mt-2">
                 <p className="text-sm font-bold text-red-600 flex items-center gap-2" role="alert">
                   <AlertCircle className="h-5 w-5" />
                   {actionError}
                 </p>
              </div>
            ) : null}
          </div>

        </div>
      </div>
    </article>
  );
}

export default ItemDetailPage;
