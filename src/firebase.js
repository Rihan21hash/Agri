import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

/**
 * === FIREBASE CONFIG (add your project in `.env`) ===
 *
 * REACT_APP_FIREBASE_API_KEY
 * REACT_APP_FIREBASE_AUTH_DOMAIN
 * REACT_APP_FIREBASE_PROJECT_ID
 * REACT_APP_FIREBASE_STORAGE_BUCKET   ← required for image uploads
 * REACT_APP_FIREBASE_MESSAGING_SENDER_ID
 * REACT_APP_FIREBASE_APP_ID
 * REACT_APP_FIREBASE_MEASUREMENT_ID   (optional)
 *
 * Without valid apiKey + projectId, the dev fallback below is used (development only).
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

function buildConfig() {
  const hasEnv = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
  if (hasEnv) {
    return firebaseConfig;
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn(
      "[firebase] REACT_APP_FIREBASE_* env vars missing; using bundled dev config. Set .env for production."
    );
  }

  return {
    apiKey: "AIzaSyAxucO3JNKghPmForTELzXDAzchEYEEoUc",
    authDomain: "agri-5c4af.firebaseapp.com",
    projectId: "agri-5c4af",
    storageBucket: "agri-5c4af.appspot.com", 
    messagingSenderId: "345686228122",
    appId: "1:345686228122:web:28c8a832fca7d0ffa53323",
    measurementId: "G-QV5WZTDEV8",
  };
}

const app = initializeApp(buildConfig());

/** Firestore — single source of truth for marketplace items */
export const db = getFirestore(app);

/** Firebase Auth */
export const auth = getAuth(app);

/** Cloud Storage — product images under `items/` */
export const storage = getStorage(app);
