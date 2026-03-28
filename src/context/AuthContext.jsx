import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { upsertUserProfile } from "../services/usersService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ?? null);
      setAuthReady(true);
    });
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!currentUser?.uid) {
      setUserProfile(null);
      setProfileReady(true);
      return undefined;
    }

    setProfileReady(false);
    let cancelled = false;

    upsertUserProfile(db, currentUser).finally(() => {
      if (!cancelled) setProfileReady(true);
    });

    const unsubDoc = onSnapshot(
      doc(db, "users", currentUser.uid),
      (snap) => {
        if (!snap.exists()) {
          setUserProfile({ id: currentUser.uid, email: currentUser.email });
        } else {
          setUserProfile({ id: snap.id, ...snap.data() });
        }
      },
      () => {
        setUserProfile({ id: currentUser.uid, email: currentUser.email });
      }
    );

    return () => {
      cancelled = true;
      if (typeof unsubDoc === "function") {
        unsubDoc();
      }
    };
  }, [currentUser]);

  const value = useMemo(
    () => ({
      currentUser,
      authReady,
      userProfile,
      profileReady: authReady && profileReady,
    }),
    [currentUser, authReady, userProfile, profileReady]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
