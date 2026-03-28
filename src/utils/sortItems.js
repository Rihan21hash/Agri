/**
 * Sort items by soonest expiry first, then by newest createdAt.
 */
export function sortItemsByUrgency(items) {
  return [...items].sort((a, b) => {
    const expiryA = a.expiresAt ?? Number.MAX_SAFE_INTEGER;
    const expiryB = b.expiresAt ?? Number.MAX_SAFE_INTEGER;

    if (expiryA !== expiryB) {
      return expiryA - expiryB;
    }

    const createdA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const createdB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;

    return createdB - createdA;
  });
}
