import { cn } from "../lib/cn";
import { ExternalLink, FileText, MessageCircle } from "lucide-react";

export default function SchemeCard({ scheme, onAskBot, className }) {
  return (
    <div className={cn(
      "group flex flex-col overflow-hidden rounded-2xl border border-soil-dark-100 bg-white shadow-sm transition-all duration-300 hover:shadow-card",
      className
    )}>
      {/* Header */}
      <div className="flex items-start gap-3 p-5 pb-3">
        <span className="text-3xl shrink-0">{scheme.icon}</span>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-lg font-bold text-soil-dark-950 leading-snug">
            {scheme.name}
          </h4>
          <span className={cn(
            "mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider",
            scheme.category === "central"
              ? "bg-blue-100 text-blue-800"
              : "bg-orange-100 text-orange-800"
          )}>
            {scheme.category === "central" ? "Central Govt" : scheme.state || "State Govt"}
          </span>
        </div>
      </div>

      {/* Benefit */}
      <div className="px-5 pb-3">
        <div className="rounded-xl bg-agri-green-50 border border-agri-green-200 p-3">
          <p className="text-xs font-bold uppercase text-agri-green-600 mb-1">Benefit</p>
          <p className="text-sm font-bold text-agri-green-900">{scheme.benefit}</p>
        </div>
      </div>

      {/* Quick info */}
      <div className="flex items-center gap-4 px-5 pb-3 text-xs text-soil-dark-500">
        <span className="flex items-center gap-1">
          <FileText className="h-3 w-3" /> {scheme.documents?.length || 0} docs needed
        </span>
        <span>📅 {scheme.deadline}</span>
      </div>

      {/* Eligibility */}
      <div className="px-5 pb-4">
        <p className="text-xs text-soil-dark-600">
          <span className="font-bold">✅ Eligibility:</span> {scheme.eligibility}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2 border-t border-soil-dark-100 p-4">
        <a
          href={scheme.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-agri-green-600 px-3 py-2.5 text-sm font-bold text-white transition-all hover:bg-agri-green-700 hover:-translate-y-0.5"
        >
          <ExternalLink className="h-4 w-4" /> Apply Now
        </a>
        <button
          type="button"
          onClick={() => onAskBot?.(scheme)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-soil-dark-200 bg-white px-3 py-2.5 text-sm font-bold text-soil-dark-700 transition-colors hover:bg-soil-dark-50"
        >
          <MessageCircle className="h-4 w-4" /> Ask Kisan Mitra
        </button>
      </div>
    </div>
  );
}
