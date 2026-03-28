import { doc, serverTimestamp, setDoc } from "firebase/firestore";

/**
 * Ensures a `users/{uid}` document exists with email and timestamps.
 */
export async function upsertUserProfile(db, user) {
  if (!user?.uid) return;
  const ref = doc(db, "users", user.uid);
  await setDoc(
    ref,
    {
      email: user.email ?? null,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
