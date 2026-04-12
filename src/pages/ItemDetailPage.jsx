import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Timer from "../components/Timer";
import UrgencyBadge from "../components/UrgencyBadge";
import OfferModal from "../components/OfferModal";
import BuyerSellerChat from "../components/BuyerSellerChat";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { subscribeItem } from "../services/itemsService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { detectProductImage } from "../data/cropImageMap";
import { Clock, IndianRupee, MapPin, Loader2, AlertCircle, Info, MessageCircle, HandCoins, Share2, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

const ONE_HOUR_MS = 60 * 60 * 1000;

function ItemDetailPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [item, setItem] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [error, setError] = useState(null);

  const [offerOpen, setOfferOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return undefined;
    setResolved(false);
    setItem(null);
    const unsub = subscribeItem(db, id,
      (data) => { setError(null); setItem(data); setResolved(true); },
      (err) => { setError(formatFirebaseError(err)); setResolved(true); }
    );
    return unsub;
  }, [id]);

  const expiresAt = item?.expiresAt ?? 0;
  const isExpired = expiresAt ? Date.now() >= expiresAt : false;
  const isSold = item?.status === "sold";
  const urgent = !isSold && !isExpired && expiresAt && expiresAt - Date.now() <= ONE_HOUR_MS;
  const urgencyLevel = isSold ? "sold" : isExpired && expiresAt ? "expired" : urgent ? "urgent" : expiresAt ? "soon" : "normal";



  const shareWhatsApp = () => {
    const text = `🌾 Check out this listing on AgriMarket!\n\n${item?.title}\n₹${item?.price}\n\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="rounded-3xl border border-soil-dark-200 bg-white px-6 py-24 text-center shadow-card flex flex-col items-center">
        <AlertCircle className="h-12 w-12 text-soil-dark-300 mb-4" />
        <p className="font-display text-xl font-bold text-soil-dark-900">This listing could not be found.</p>
        <Link to="/dashboard" className="mt-6 inline-flex items-center justify-center rounded-xl bg-agri-green-50 px-6 py-3 text-sm font-bold text-agri-green-700 transition hover:bg-agri-green-100">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const hasImage = Boolean(item.imageUrl?.trim());
  const imageSrc = hasImage ? item.imageUrl : detectProductImage(item.title).imageUrl;

  return (
    <motion.article
      className={`overflow-hidden rounded-3xl bg-white shadow-card relative ${isSold ? "opacity-80" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute top-6 left-6 z-10 flex gap-2">
        <Link to="/dashboard" className="rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-sm font-bold text-soil-dark-800 shadow-sm border border-soil-dark-100 hover:bg-white transition-colors">
          &larr; Back
        </Link>
      </div>

      <div className="grid overflow-hidden lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-full bg-cream-50 overflow-hidden">
          <img
            src={imageSrc}
            alt={item.title}
            className={`h-full w-full object-cover transition-transform duration-700 hover:scale-105 ${isSold ? "grayscale-[0.5]" : ""}`}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil-dark-950/60 to-transparent lg:bg-none" />
          <div className="absolute top-6 right-6">
            <UrgencyBadge level={urgencyLevel} />
          </div>
          <div className="absolute bottom-6 left-6 right-6 lg:hidden text-white drop-shadow-md">
            <h1 className="font-display text-4xl font-bold leading-tight mb-2">{item.title}</h1>
          </div>
        </div>

        {/* Details */}
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
                <div className="rounded-2xl bg-white p-5 border border-soil-dark-100 shadow-sm">
                  <dt className="text-xs font-bold uppercase tracking-widest text-soil-dark-500 mb-1">Asking Price</dt>
                  <dd className="font-display text-3xl font-bold text-agri-green-700 flex items-center">
                    <IndianRupee className="h-6 w-6 -mr-1" />
                    {typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                  </dd>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-soil-dark-100 shadow-sm">
                  <dt className="text-xs font-bold uppercase tracking-widest text-soil-dark-500 mb-1">Status</dt>
                  {expiresAt && !isSold && !isExpired ? (
                    <dd className={`font-mono text-xl font-bold flex items-center gap-2 ${urgent ? "text-harvest-gold-600 animate-pulse" : "text-soil-dark-900"}`}>
                      <Clock className="h-5 w-5" />
                      <Timer expiresAt={expiresAt} />
                    </dd>
                  ) : (
                    <dd className="font-bold text-lg text-soil-dark-900">
                      {isSold ? "Deal Closed" : isExpired ? "Expired" : "Always Open"}
                    </dd>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-10 flex flex-col gap-3">
            {/* Primary: Contact / Chat */}
            {!isSold && !isExpired && currentUser && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-agri-green-600 px-6 py-4 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-agri-green-700"
                >
                  <MessageCircle className="h-5 w-5" /> Chat with Seller
                </button>
                <button
                  type="button"
                  onClick={() => setOfferOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-harvest-gold-500 px-6 py-4 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-harvest-gold-600"
                >
                  <HandCoins className="h-5 w-5" /> Make Offer
                </button>
              </div>
            )}

            {!currentUser && (
              <Link
                to="/auth"
                className="flex items-center justify-center gap-2 rounded-2xl bg-agri-green-600 px-6 py-4 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-agri-green-700"
              >
                Login to Contact Seller
              </Link>
            )}

            {isSold && (
              <div className="rounded-2xl bg-soil-dark-100 px-6 py-4 text-center text-base font-bold text-soil-dark-500">
                This harvest has been sold
              </div>
            )}

            {/* Share buttons */}
            <div className="flex gap-2">
              <button
                onClick={shareWhatsApp}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-agri-green-200 bg-agri-green-50 px-4 py-3 text-sm font-bold text-agri-green-800 transition-colors hover:bg-agri-green-100"
              >
                <Share2 className="h-4 w-4" /> WhatsApp
              </button>
              <button
                onClick={copyLink}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-soil-dark-200 bg-white px-4 py-3 text-sm font-bold text-soil-dark-700 transition-colors hover:bg-soil-dark-50"
              >
                {copied ? <Check className="h-4 w-4 text-agri-green-600" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <p className="text-center text-xs font-bold text-soil-dark-400">
              {currentUser ? `Seller ID: ${item.sellerId}` : "Create an account to view seller details"}
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <OfferModal isOpen={offerOpen} onClose={() => setOfferOpen(false)} item={item} />
      <BuyerSellerChat isOpen={chatOpen} onClose={() => setChatOpen(false)} item={item} sellerId={item?.sellerId} />
    </motion.article>
  );
}

export default ItemDetailPage;
