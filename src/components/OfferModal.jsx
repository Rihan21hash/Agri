import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, IndianRupee, Send, Share2, Copy, Check } from "lucide-react";
import { cn } from "../lib/cn";

const presets = [
  { pct: 50, label: "50%" },
  { pct: 60, label: "60%" },
  { pct: 70, label: "70%" },
  { pct: 80, label: "80%" },
];

export default function OfferModal({ isOpen, onClose, item }) {
  const [selectedPct, setSelectedPct] = useState(null);
  const [customAmt, setCustomAmt] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const price = typeof item.price === "number" ? item.price : 0;
  const offerAmount = selectedPct
    ? Math.round(price * (selectedPct / 100))
    : Number(customAmt) || 0;

  const handleSend = () => {
    if (offerAmount <= 0) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose?.();
    }, 2000);
  };

  const shareText = `🌾 Distress Sale Offer\n\nItem: ${item.title}\nAsking Price: ₹${price}\nMy Offer: ₹${offerAmount}\n\nCheck it out: ${window.location.origin}/item/${item.id}`;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(`${window.location.origin}/item/${item.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-soil-dark-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-8"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-soil-dark-400 hover:bg-soil-dark-100 hover:text-soil-dark-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-2xl font-bold text-soil-dark-950 mb-1">
              🤝 Make an Offer
            </h3>
            <p className="text-sm text-soil-dark-500 mb-6">
              {item.title} — Asking ₹{price.toLocaleString("en-IN")}
            </p>

            {/* Preset buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {presets.map((p) => (
                <button
                  key={p.pct}
                  type="button"
                  onClick={() => { setSelectedPct(p.pct); setCustomAmt(""); }}
                  className={cn(
                    "flex flex-col items-center rounded-xl border-2 px-2 py-3 text-center transition-all",
                    selectedPct === p.pct
                      ? "border-agri-green-500 bg-agri-green-50 text-agri-green-800"
                      : "border-soil-dark-100 text-soil-dark-700 hover:border-soil-dark-300"
                  )}
                >
                  <span className="text-xs font-bold uppercase">{p.label}</span>
                  <span className="mt-1 flex items-center text-lg font-bold">
                    <IndianRupee className="h-4 w-4" />
                    {Math.round(price * (p.pct / 100)).toLocaleString("en-IN")}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-soil-dark-700 mb-2">
                Or enter custom amount
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-soil-dark-400" />
                <input
                  type="number"
                  value={customAmt}
                  onChange={(e) => { setCustomAmt(e.target.value); setSelectedPct(null); }}
                  placeholder="0"
                  className="w-full rounded-xl border border-soil-dark-200 bg-white py-4 pl-12 pr-4 text-lg font-bold text-soil-dark-900 focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
                />
              </div>
            </div>

            {/* Offer summary */}
            {offerAmount > 0 && (
              <div className="mb-6 rounded-xl bg-agri-green-50 border border-agri-green-200 p-4 text-center">
                <p className="text-sm font-medium text-agri-green-700">Your offer</p>
                <p className="flex items-center justify-center text-3xl font-bold text-agri-green-800">
                  <IndianRupee className="h-7 w-7" />
                  {offerAmount.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-agri-green-600 mt-1">
                  {Math.round((offerAmount / price) * 100)}% of asking price — saves ₹{(price - offerAmount).toLocaleString("en-IN")}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSend}
                disabled={offerAmount <= 0 || sent}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold text-white transition-all",
                  sent
                    ? "bg-agri-green-600"
                    : offerAmount > 0
                      ? "bg-agri-green-600 hover:bg-agri-green-700 hover:-translate-y-0.5 shadow-floating"
                      : "bg-soil-dark-300 cursor-not-allowed"
                )}
              >
                {sent ? (
                  <><Check className="h-5 w-5" /> Offer Sent!</>
                ) : (
                  <><Send className="h-5 w-5" /> Send Offer</>
                )}
              </button>

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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
