import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink, Phone, FileText, CheckCircle2 } from "lucide-react";
import governmentSchemes from "../data/governmentSchemes";
import SchemeCard from "../components/SchemeCard";

const TABS = [
  { id: "all", label: "All" },
  { id: "central", label: "Central Govt" },
  { id: "state", label: "State Govt" },
  { id: "subsidy", label: "Subsidies" },
  { id: "insurance", label: "Insurance" },
  { id: "loan", label: "Loans" },
];

export default function GovernmentSchemesPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  const filtered = useMemo(() => {
    let items = governmentSchemes;
    if (tab === "central") items = items.filter((s) => s.category === "central");
    else if (tab === "state") items = items.filter((s) => s.category === "state");
    else if (tab !== "all") items = items.filter((s) => s.tags?.includes(tab));

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.benefit.toLowerCase().includes(q) ||
          s.eligibility?.toLowerCase().includes(q) ||
          (s.state || "").toLowerCase().includes(q)
      );
    }
    return items;
  }, [tab, search]);

  const openChatbot = (scheme) => {
    if (window.__kisanMitraAsk) {
      window.__kisanMitraAsk(`Tell me about ${scheme.name} scheme — eligibility, benefits, and how to apply.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-soil-dark-900 to-soil-dark-950 p-8 text-white shadow-card sm:p-10">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-harvest-gold-500 opacity-10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-agri-green-500 opacity-10 blur-3xl" />
        <div className="relative z-10">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-harvest-gold-400 mb-3">
            <FileText className="h-5 w-5" /> Farmer Benefits
          </p>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            🏛️ Sarkari Yojana — Government Schemes
          </h1>
          <p className="mt-3 max-w-2xl text-base text-soil-dark-300 leading-relaxed">
            Benefits you deserve. Find central and state government schemes for subsidies, loans, insurance, and more.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-soil-dark-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schemes... (e.g. PM-KISAN, crop insurance, solar pump)"
          className="w-full rounded-2xl border border-soil-dark-200 bg-white py-4 pl-12 pr-4 text-base font-medium text-soil-dark-900 shadow-sm focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-all ${
              tab === t.id
                ? "border-agri-green-500 bg-agri-green-600 text-white shadow-md"
                : "border-soil-dark-200 bg-white text-soil-dark-700 hover:bg-soil-dark-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm font-bold text-soil-dark-500">
        {filtered.length} scheme{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-soil-dark-200 bg-white/50 py-20 text-center">
          <span className="text-4xl mb-4">🏛️</span>
          <p className="font-display text-lg font-bold text-soil-dark-900">No schemes found</p>
          <p className="mt-2 text-sm text-soil-dark-500">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {filtered.map((scheme) => (
            <motion.div
              key={scheme.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              onClick={() => setDetail(scheme)}
              className="cursor-pointer"
            >
              <SchemeCard scheme={scheme} onAskBot={openChatbot} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {detail && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-soil-dark-950/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetail(null)}
            />
            <motion.div
              className="fixed inset-4 z-50 mx-auto max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-h-[80vh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-soil-dark-100 bg-white/95 backdrop-blur-md p-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{detail.icon}</span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-soil-dark-950">{detail.name}</h2>
                    <span className={`text-xs font-bold uppercase ${
                      detail.category === "central" ? "text-blue-600" : "text-orange-600"
                    }`}>
                      {detail.category === "central" ? "Central Government" : detail.state || "State Government"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDetail(null)}
                  className="rounded-full p-2 text-soil-dark-400 hover:bg-soil-dark-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6 p-6">
                {/* Benefit */}
                <div className="rounded-2xl bg-agri-green-50 border border-agri-green-200 p-5">
                  <p className="text-sm font-bold uppercase text-agri-green-600 mb-2">💰 Benefit</p>
                  <p className="text-lg font-bold text-agri-green-900">{detail.benefit}</p>
                </div>

                {/* Description */}
                {detail.description && (
                  <div>
                    <h4 className="font-bold text-soil-dark-900 mb-2">About this scheme</h4>
                    <p className="text-sm text-soil-dark-600 leading-relaxed">{detail.description}</p>
                  </div>
                )}

                {/* Eligibility */}
                <div>
                  <h4 className="font-bold text-soil-dark-900 mb-2">✅ Eligibility</h4>
                  <p className="text-sm text-soil-dark-600">{detail.eligibility}</p>
                </div>

                {/* Documents */}
                {detail.documents?.length > 0 && (
                  <div>
                    <h4 className="font-bold text-soil-dark-900 mb-3">📋 Required Documents</h4>
                    <div className="space-y-2">
                      {detail.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-xl border border-soil-dark-100 bg-soil-dark-50 px-4 py-3 text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-agri-green-600" />
                          <span className="font-medium text-soil-dark-800">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Steps */}
                {detail.steps?.length > 0 && (
                  <div>
                    <h4 className="font-bold text-soil-dark-900 mb-3">📝 How to Apply (Step by Step)</h4>
                    <div className="space-y-3">
                      {detail.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-agri-green-600 text-xs font-bold text-white">
                            {i + 1}
                          </div>
                          <p className="text-sm font-medium text-soil-dark-700 mt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Helpline & Apply */}
                <div className="flex flex-col gap-3 border-t border-soil-dark-100 pt-6">
                  <a
                    href={detail.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-agri-green-600 px-6 py-4 text-base font-bold text-white transition-all hover:bg-agri-green-700 hover:-translate-y-0.5 shadow-floating"
                  >
                    <ExternalLink className="h-5 w-5" /> Apply Online
                  </a>
                  {detail.helpline && (
                    <div className="flex items-center justify-center gap-2 rounded-2xl border border-soil-dark-200 bg-white px-6 py-3 text-sm font-bold text-soil-dark-700">
                      <Phone className="h-4 w-4 text-agri-green-600" />
                      Helpline: {detail.helpline}
                    </div>
                  )}
                  <button
                    onClick={() => { openChatbot(detail); setDetail(null); }}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-harvest-gold-300 bg-harvest-gold-50 px-6 py-3 text-sm font-bold text-harvest-gold-800 transition-colors hover:bg-harvest-gold-100"
                  >
                    🌾 Ask Kisan Mitra about this scheme
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
