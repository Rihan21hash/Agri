import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function FarmerForm({ currentUser }) {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expiryHours, setExpiryHours] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setCropName("");
    setQuantity("");
    setPrice("");
    setExpiryHours("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cropName || !quantity || !price || !expiryHours) {
      return;
    }

    const hours = Number(expiryHours);
    if (Number.isNaN(hours) || hours <= 0) {
      return;
    }

    setLoading(true);
    try {
      const expiresAt = Date.now() + hours * 60 * 60 * 1000;

      await addDoc(collection(db, "listings"), {
        cropName: cropName.trim(),
        quantity: quantity.trim(),
        price: Number(price),
        expiresAt,
        status: "available",
        createdAt: serverTimestamp(),
      });

      resetForm();
    } catch (error) {
      console.error("Error adding listing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Crop Name
        <input
          type="text"
          value={cropName}
          onChange={(event) => setCropName(event.target.value)}
          placeholder="e.g. Tomato"
          required
        />
      </label>

      <label>
        Quantity
        <input
          type="text"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          placeholder="e.g. 100 kg"
          required
        />
      </label>

      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="e.g. 20"
          min="0"
          step="0.01"
          required
        />
      </label>

      <label>
        Expiry (hours)
        <input
          type="number"
          value={expiryHours}
          onChange={(event) => setExpiryHours(event.target.value)}
          placeholder="e.g. 2"
          min="1"
          step="1"
          required
        />
      </label>

      <button type="submit" disabled={loading || !currentUser}>
        {loading ? "Posting..." : !currentUser ? "Login to Post" : "Post Listing"}
      </button>
      {!currentUser ? <p className="auth-message danger">Login to post distress listings.</p> : null}
    </form>
  );
}

export default FarmerForm;
