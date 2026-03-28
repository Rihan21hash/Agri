/**
 * Stable slug for section IDs / aria (panel title → heading id).
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
