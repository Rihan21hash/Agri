import { useEffect, useState } from "react";
import { detectProductImage } from "../data/cropImageMap";
import { cn } from "../lib/cn";

/**
 * Shows a live image preview based on detected keyword from user input.
 * Used in the PostItemPage wizard.
 */
export default function CropImageDetector({ inputText, className }) {
  const [result, setResult] = useState({ keyword: null, imageUrl: "" });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { keyword, imageUrl } = detectProductImage(inputText);
    setResult({ keyword, imageUrl });
    setLoaded(false);
  }, [inputText]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-soil-dark-100 bg-cream-50", className)}>
      {result.imageUrl && (
        <img
          src={result.imageUrl}
          alt={result.keyword || "Product preview"}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=300&fit=crop";
          }}
        />
      )}
      {/* Keyword tag */}
      {result.keyword && (
        <div className="absolute bottom-3 left-3 rounded-full bg-agri-green-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          🎯 Detected: {result.keyword}
        </div>
      )}
      {!result.keyword && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-soil-dark-400 p-4">
          <span className="text-3xl mb-2">📷</span>
          <p className="text-sm font-medium text-center">Type a product name to see auto-preview</p>
        </div>
      )}
    </div>
  );
}
