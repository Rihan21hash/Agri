import { cn } from "../lib/cn";

export default function SkeletonCard({ className }) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl bg-white border border-soil-dark-100 shadow-card animate-pulse",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-soil-dark-100" />
      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-3/4 rounded-full bg-soil-dark-100" />
        <div className="h-3 w-full rounded-full bg-soil-dark-100" />
        <div className="h-3 w-2/3 rounded-full bg-soil-dark-100" />
        <div className="mt-2 flex justify-between">
          <div className="h-6 w-24 rounded-full bg-soil-dark-100" />
          <div className="h-6 w-20 rounded-full bg-soil-dark-100" />
        </div>
        <div className="mt-2 flex gap-2 border-t border-soil-dark-100 pt-3">
          <div className="h-10 flex-1 rounded-xl bg-soil-dark-100" />
          <div className="h-10 flex-1 rounded-xl bg-soil-dark-100" />
        </div>
      </div>
    </div>
  );
}
