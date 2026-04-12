import { cn } from "../lib/cn";
import { useLanguage } from "../context/LanguageContext";

const categories = [
  { id: "all",         emoji: "🛒", key: "cat.all" },
  { id: "crops",       emoji: "🌾", key: "cat.crops" },
  { id: "vegetables",  emoji: "🥬", key: "cat.vegetables" },
  { id: "fruits",      emoji: "🍎", key: "cat.fruits" },
  { id: "spices",      emoji: "🌶️", key: "cat.spices" },
  { id: "equipment",   emoji: "🚜", key: "cat.equipment" },
  { id: "household",   emoji: "🏠", key: "cat.household" },
  { id: "electronics", emoji: "📱", key: "cat.electronics" },
];

export default function CategoryChips({ selected = "all", onSelect, className }) {
  const { t } = useLanguage();

  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2 no-scrollbar", className)}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect?.(cat.id)}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-200",
            selected === cat.id
              ? "border-agri-green-500 bg-agri-green-600 text-white shadow-md shadow-agri-green-600/20"
              : "border-soil-dark-200 bg-white text-soil-dark-700 hover:bg-soil-dark-50 hover:border-soil-dark-300"
          )}
        >
          <span className="text-base">{cat.emoji}</span>
          {t(cat.key)}
        </button>
      ))}
    </div>
  );
}
