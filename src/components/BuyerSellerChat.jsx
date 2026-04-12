import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, ArrowLeft } from "lucide-react";
import { cn } from "../lib/cn";
import { useAuth } from "../context/AuthContext";

/**
 * Buyer-Seller Chat Panel
 * Opens as a slide-up panel from the item detail page.
 * Messages are stored locally (in-memory) — no backend persistence.
 */
export default function BuyerSellerChat({ isOpen, onClose, item, sellerId }) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      // Add initial system message if first time
      if (messages.length === 0 && item) {
        setMessages([{
          id: "sys-1",
          role: "system",
          content: `💬 Chat about "${item.title}" — ₹${typeof item.price === "number" ? item.price.toLocaleString("en-IN") : item.price}`,
          ts: Date.now(),
        }]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = {
      id: `msg-${Date.now()}`,
      role: "user",
      sender: currentUser?.email || "You",
      content: input.trim(),
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");

    // Simulate auto-reply from seller after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          role: "seller",
          sender: "Seller",
          content: getAutoReply(input.trim(), item),
          ts: Date.now(),
        },
      ]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-soil-dark-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-lg flex-col rounded-t-3xl bg-white shadow-2xl sm:inset-auto sm:bottom-4 sm:right-4 sm:left-auto sm:w-[400px] sm:rounded-2xl"
            style={{ height: "min(520px, 80vh)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-soil-dark-100 px-4 py-3">
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-soil-dark-400 hover:bg-soil-dark-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <MessageCircle className="h-5 w-5 text-agri-green-600" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-soil-dark-950 truncate">
                  Chat — {item?.title || "Product"}
                </h4>
                <p className="text-xs text-soil-dark-500">Seller • {sellerId?.slice(0, 8) || "..."}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-soil-dark-400 hover:bg-soil-dark-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-cream-50 p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    msg.role === "system" ? "justify-center" :
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "system" ? (
                    <div className="rounded-full bg-soil-dark-100 px-4 py-1.5 text-xs font-medium text-soil-dark-600">
                      {msg.content}
                    </div>
                  ) : (
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-agri-green-600 text-white rounded-br-sm"
                        : "bg-white text-soil-dark-800 shadow-sm border border-soil-dark-100 rounded-bl-sm"
                    )}>
                      <p className="text-xs font-bold mb-1 opacity-70">
                        {msg.role === "user" ? "You" : "Seller"}
                      </p>
                      {msg.content}
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-soil-dark-100 bg-white p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-soil-dark-200 bg-cream-50 px-4 py-2.5 text-sm text-soil-dark-900 focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-agri-green-600 text-white transition-all hover:bg-agri-green-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Simulated seller auto-replies */
function getAutoReply(userText, item) {
  const lower = userText.toLowerCase();
  const price = typeof item?.price === "number" ? item.price : 0;

  if (lower.match(/price|rate|cost|bhav|kitna|कितन/)) {
    return `The asking price is ₹${price.toLocaleString("en-IN")}. I can offer a small discount for bulk orders. What quantity are you interested in?`;
  }
  if (lower.match(/quantity|कितना|how much|kg|quintal|crate|ton/)) {
    return `I have the full quantity available as listed. For orders above 10 quintals, I can arrange transport too. When would you like pickup?`;
  }
  if (lower.match(/pickup|delivery|location|kahan|कहाँ|address/)) {
    return `Pickup is from my farm near the local market. I can share the exact location on WhatsApp. Would you like my number?`;
  }
  if (lower.match(/offer|discount|कम|negotiat/)) {
    return `I can consider a 5-10% discount for immediate pickup since this is a distress sale. Make me an offer through the app!`;
  }
  if (lower.match(/quality|fresh|condit|grade/)) {
    return `Fresh from the field, harvested this morning. Grade A quality. You can inspect before buying. No preservatives used.`;
  }
  if (lower.match(/hello|hi|namaste|नमस/)) {
    return `Namaste! 🙏 Thank you for your interest in my ${item?.title || "produce"}. How can I help you?`;
  }
  return `Thank you for your message! I'll get back to you shortly. Meanwhile, feel free to ask about price, quality, or pickup details. 🙏`;
}
