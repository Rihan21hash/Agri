import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Upload a listing image to Storage at items/{timestamp}-{safeFileName}
 * @returns {Promise<string>} download URL for Firestore `imageUrl`
 */
export async function uploadItemListingImage(storage, file) {
  if (!file || !(file instanceof File) || file.size === 0) {
    throw new Error("Please choose an image file.");
  }

  const safeOriginal =
    file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "image";
  const path = `items/${Date.now()}-${safeOriginal}`;
  const storageRef = ref(storage, path);

  const metadata = {
    contentType: file.type || "image/jpeg",
  };

  await uploadBytes(storageRef, file, metadata);
  return getDownloadURL(storageRef);
}
