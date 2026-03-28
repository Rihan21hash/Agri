/**
 * User-facing messages for common Firebase client errors.
 */
export function formatFirebaseError(error) {
  if (!error) return "Something went wrong.";
  const code = error.code;
  const hints = {
    "permission-denied":
      "Permission denied. In Firebase Console, deploy Firestore rules that allow reading `items` and writing with `sellerId` matching the signed-in user.",
    "storage/unauthorized":
      "Storage rejected the upload. Sign in and allow authenticated uploads in Storage rules.",
    "storage/unauthenticated": "Sign in before uploading images.",
    "storage/canceled": "Upload was canceled.",
    "failed-precondition": error.message || "Operation failed.",
  };
  if (code && hints[code]) return hints[code];
  return error.message || String(error);
}
