import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx conditional logic.
 * Usage: cn("base-class", condition && "active-class", className)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
