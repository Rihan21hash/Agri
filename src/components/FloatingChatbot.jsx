import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

/**
 * Kisan Mitra — Farmer AI Chatbot
 * Uses Ollama locally (http://localhost:11434) by default.
 * Falls back to smart mock responses when Ollama is unavailable.
 */

const SYSTEM_PROMPT = `You are Kisan Mitra, a helpful agricultural assistant for Indian farmers.
You help farmers with:
- Current crop market prices and where to sell
- Government schemes and subsidies (PM-KISAN, Fasal Bima, KCC, Soil Health Cards, MSP etc.)
- Best farming practices, pest control, fertilizer advice
- Weather-based crop recommendations
- How to use this Distress Sale App to sell crops quickly
- Urgency-based pricing strategy for distress sales

Always respond in the same language the farmer uses.
Keep answers simple, practical, and under 150 words.
Use bullet points and emojis for easy reading on mobile.
If asked about prices, give realistic Indian market price ranges in ₹.
Always be encouraging and supportive to farmers.`;

const WELCOME_MSG = {
  role: "assistant",
  content: "नमस्ते! 🌾 मैं किसान मित्र हूं।\n\nHello! I'm Kisan Mitra, your farming assistant. Ask me about:\n• 💰 Crop prices & markets\n• 🏛️ Government schemes\n• 🌱 Farming advice\n• 📦 How to sell on this app\n\nकुछ भी पूछें!",
};

const QUICK_PROMPTS = [
  "💰 Today's crop prices",
  "🌱 Best crop this season",
  "🏛️ PM-KISAN details",
  "🐛 Pest control tips",
  "📦 How to list my crop",
];

// Smart mock responses keyed by topic keywords
const MOCK_RESPONSES = {
  price: "📊 **आज के अनुमानित भाव (₹/क्विंटल):**\n\n• 🍅 Tomato: ₹800–₹1,400\n• 🥔 Potato: ₹600–₹900\n• 🌾 Wheat: ₹2,100–₹2,400 (MSP: ₹2,275)\n• 🧅 Onion: ₹1,200–₹2,000\n• 🌽 Maize: ₹1,600–₹2,000\n\n💡 **Tip:** Check the 📊 Mandi Prices section for live rates!",
  season: "🌱 **इस सीज़न के लिए सर्वश्रेष्ठ फसलें:**\n\n**Kharif (June-Oct):**\n• 🌾 Rice, Maize, Bajra\n• 🥜 Groundnut, Soybean\n• 🌶️ Chili, Cotton\n\n**Rabi (Oct-March):**\n• 🌾 Wheat, Barley\n• 🟡 Mustard, Chickpea\n• 🥬 Vegetables\n\n💡 Check soil health card for best fit!",
  kisan: "🏛️ **PM-KISAN सम्मान निधि:**\n\n• ₹6,000/वर्ष — 3 किस्तों में\n• सभी भूमिधारक किसान परिवार पात्र\n• पंजीकरण: pmkisan.gov.in\n• हेल्पलाइन: 155261\n\n📋 **आवश्यक दस्तावेज़:**\n• आधार कार्ड\n• भूमि रिकॉर्ड\n• बैंक खाता\n\n👉 अभी आवेदन करें! Go to 🏛️ Govt Schemes section.",
  pest: "🐛 **कीट नियंत्रण के उपाय:**\n\n1. **नीम का तेल** — 5ml/लीटर पानी में मिलाकर स्प्रे करें\n2. **ट्राइकोडर्मा** — मिट्टी में मिलाएं (जैविक)\n3. **पीले चिपचिपे ट्रैप** — सफ़ेद मक्खी के लिए\n4. **फसल चक्र** — हर सीज़न फसल बदलें\n5. **स्वस्थ बीज** — प्रमाणित बीज का उपयोग करें\n\n⚠️ कीटनाशक कम से कम उपयोग करें। जैविक तरीके पहले आज़माएं! 🌿",
  sell: "📦 **इस ऐप पर फसल कैसे बेचें:**\n\n1. ➕ **'Sell Now'** बटन दबाएं\n2. 📝 फसल का नाम टाइप करें — फोटो ऑटो दिखेगा!\n3. 💰 भाव और मात्रा डालें\n4. ⏰ तत्कालता विंडो सेट करें\n5. ✅ सबमिट करें — लिस्टिंग तुरंत लाइव!\n\n💡 **Tips for faster sale:**\n• कम भाव = जल्दी बिक्री\n• अच्छी फोटो जोड़ें\n• सही मात्रा बताएं\n\nखरीदार सीधे आपसे संपर्क करेंगे! 🤝",
  scheme: "🏛️ **प्रमुख सरकारी योजनाएं:**\n\n1. **PM-KISAN** — ₹6,000/year\n2. **फसल बीमा (PMFBY)** — 2% प्रीमियम पर फसल बीमा\n3. **किसान क्रेडिट कार्ड** — 4% पर ₹3 लाख\n4. **सोलर पंप योजना** — 70% सब्सिडी\n5. **ई-नाम** — ऑनलाइन मंडी\n\n👉 पूरी जानकारी के लिए 🏛️ Govt Schemes पेज देखें!",
  default: "🌾 मैं किसान मित्र हूं! मैं इनमें मदद कर सकता हूं:\n\n• 💰 फसल भाव जानना\n• 🏛️ सरकारी योजनाएं\n• 🌱 खेती की सलाह\n• 🐛 कीट नियंत्रण\n• 📦 ऐप पर बेचने का तरीका\n\nकृपया अपना सवाल पूछें! 😊",
};

function getMockResponse(text) {
  const lower = text.toLowerCase();
  if (lower.match(/price|bhav|भाव|rate|mandi|मंडी|daam|दाम/)) return MOCK_RESPONSES.price;
  if (lower.match(/season|crop|फसल|best|sowing|बुवाई|kharif|rabi/)) return MOCK_RESPONSES.season;
  if (lower.match(/pm.?kisan|पीएम|pm-kisan|6000|किसान सम्मान/)) return MOCK_RESPONSES.kisan;
  if (lower.match(/pest|कीट|keetnashak|spray|insect|disease|bimari|bug/)) return MOCK_RESPONSES.pest;
  if (lower.match(/sell|list|बेच|post|app|ऐप|how to|कैसे/)) return MOCK_RESPONSES.sell;
  if (lower.match(/scheme|yojana|योजना|government|सरकार|subsidy|loan|ऋण/)) return MOCK_RESPONSES.scheme;
  return MOCK_RESPONSES.default;
}

async function callOllama(messages) {
  try {
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        stream: false,
      }),
    });
    if (!res.ok) throw new Error("Ollama unavailable");
    const data = await res.json();
    return data.message?.content || null;
  } catch {
    return null;
  }
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(async (text) => {
    const msg = text || input;
    if (!msg.trim() || isLoading) return;

    const userMsg = { role: "user", content: msg.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    try {
      // Try Ollama first
      const ollamaReply = await callOllama(newMsgs);
      if (ollamaReply) {
        setMessages((prev) => [...prev, { role: "assistant", content: ollamaReply }]);
      } else {
        // Fallback to mock
        await new Promise((resolve) => setTimeout(resolve, 800));
        setMessages((prev) => [...prev, { role: "assistant", content: getMockResponse(msg) }]);
      }
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "माफ़ कीजिए, कनेक्शन में समस्या है। कृपया फिर कोशिश करें! 🙏\n\nSorry, connectivity issue. Please try again!"
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages, isLoading]);

  // Allow pre-filling a question (used by SchemeCard's "Ask Kisan Mitra")
  const askAbout = useCallback((text) => {
    setIsOpen(true);
    setTimeout(() => sendMessage(text), 300);
  }, [sendMessage]);

  // Expose globally so other components can trigger it
  useEffect(() => {
    window.__kisanMitraAsk = askAbout;
    return () => { delete window.__kisanMitraAsk; };
  }, [askAbout]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className={cn(
          "fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-2xl transition-colors md:bottom-8 md:h-16 md:w-16",
          isOpen ? "bg-soil-dark-800 text-white" : "bg-agri-green-600 text-white"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={!isOpen ? {
          boxShadow: [
            "0 0 0 0 rgba(34,197,94,0.5)",
            "0 0 0 16px rgba(34,197,94,0)",
            "0 0 0 0 rgba(34,197,94,0)",
          ],
        } : {}}
        transition={!isOpen ? { repeat: Infinity, duration: 2.5 } : {}}
        aria-label={isOpen ? "Close chat" : "Open Kisan Mitra chat"}
        style={{ zIndex: 60 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : "🌾"}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-40 right-4 z-50 flex w-[380px] flex-col overflow-hidden rounded-2xl border border-agri-green-200 bg-white shadow-2xl md:bottom-28 max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:rounded-none"
            style={{ height: "min(560px, calc(100vh - 180px))", zIndex: 55 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-agri-green-600 to-agri-green-700 px-4 py-3 text-white">
              <span className="text-2xl">🌾</span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold">Kisan Mitra</h3>
                <p className="text-xs text-agri-green-100">🟢 Online — Ask me anything!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors sm:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-cream-50 p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-agri-green-600 text-white rounded-br-sm"
                        : "bg-white text-soil-dark-800 shadow-sm border border-soil-dark-100 rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl bg-white px-4 py-3 shadow-sm border border-soil-dark-100">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-2 w-2 rounded-full bg-agri-green-500"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick Prompts */}
            <div className="flex gap-2 overflow-x-auto border-t border-soil-dark-100 bg-white px-3 py-2 no-scrollbar">
              {QUICK_PROMPTS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  disabled={isLoading}
                  className="flex-shrink-0 rounded-full border border-agri-green-200 bg-agri-green-50 px-3 py-1.5 text-xs font-bold text-agri-green-700 transition-colors hover:bg-agri-green-100 disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex gap-2 border-t border-soil-dark-100 bg-white p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="अपना सवाल पूछें / Ask anything..."
                className="flex-1 rounded-xl border border-soil-dark-200 bg-cream-50 px-4 py-2.5 text-sm text-soil-dark-900 placeholder:text-soil-dark-400 focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-agri-green-600 text-white transition-all hover:bg-agri-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
