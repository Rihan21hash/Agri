import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxucO3JNKghPmForTELzXDAzchEYEEoUc",
  authDomain: "agri-5c4af.firebaseapp.com",
  projectId: "agri-5c4af",
  storageBucket: "agri-5c4af.firebasestorage.app",
  messagingSenderId: "345686228122",
  appId: "1:345686228122:web:28c8a832fca7d0ffa53323",
  measurementId: "G-QV5WZTDEV8"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);