import { cn } from "../lib/cn";

const levels = {
  urgent: {
    label: "URGENT",
    emoji: "🔴",
    bg: "bg-red-100 text-red-800 border-red-300",
    pulse: true,
  },
  soon: {
    label: "SOON",
    emoji: "🟡",
    bg: "bg-harvest-gold-100 text-harvest-gold-800 border-harvest-gold-300",
    pulse: true,
  },
  normal: {
    label: "NORMAL",
    emoji: "🟢",
    bg: "bg-agri-green-100 text-agri-green-800 border-agri-green-200",
    pulse: false,
  },
  sold: {
    label: "SOLD",
    emoji: "",
    bg: "bg-soil-dark-100 text-soil-dark-700 border-soil-dark-200",
    pulse: false,
  },
  expired: {
    label: "EXPIRED",
    emoji: "",
    bg: "bg-red-100 text-red-700 border-red-200",
    pulse: false,
  },
};

export default function UrgencyBadge({ level = "normal", className }) {
  const config = levels[level] || levels.normal;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md",
        config.bg,
        config.pulse && "animate-pulse",
        className
      )}
    >
      {config.emoji && <span>{config.emoji}</span>}
      {config.label}
    </span>
  );
}
