import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import FarmerForm from "./components/FarmerForm";
import BuyerFeed from "./components/BuyerFeed";
import AuthSection from "./components/AuthSection";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <section className="panel">
          <h2>Login / Signup</h2>
          <AuthSection currentUser={currentUser} />
        </section>
        <section className="panel">
          <h2>Farmer Post</h2>
          <FarmerForm currentUser={currentUser} />
        </section>
        <section className="panel">
          <h2>Buyer Flash Feed</h2>
          <BuyerFeed currentUser={currentUser} />
        </section>
      </main>
    </div>
  );
}

export default App;
