import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";

function FarmerForm() {
  const { currentUser } = useAuth();
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expiryHours, setExpiryHours] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", isError: false });

  const resetForm = () => {
    setCropName("");
    setQuantity("");
    setPrice("");
    setExpiryHours("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ text: "", isError: false });

    if (!currentUser) {
      setFeedback({
        text: "You must be logged in to post a listing.",
        isError: true,
      });
      return;
    }

    if (!cropName || !quantity || !price || !expiryHours) {
      return;
    }

    const hours = Number(expiryHours);
    if (Number.isNaN(hours) || hours <= 0) {
      setFeedback({
        text: "Expiry must be a positive number of hours.",
        isError: true,
      });
      return;
    }

    const priceNum = Number(price);
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setFeedback({
        text: "Price must be a valid non-negative number.",
        isError: true,
      });
      return;
    }

    setLoading(true);
    try {
      const expiresAt = Date.now() + hours * 60 * 60 * 1000;

      await addDoc(collection(db, "listings"), {
        cropName: cropName.trim(),
        quantity: quantity.trim(),
        price: priceNum,
        expiresAt,
        status: "available",
        createdAt: serverTimestamp(),
        postedByUid: currentUser.uid,
        postedByEmail: currentUser.email ?? null,
      });

      resetForm();
      setFeedback({ text: "Listing posted successfully.", isError: false });
    } catch (error) {
      setFeedback({
        text: error?.message || "Could not post listing.",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label htmlFor="farmer-crop" className={labelClass}>
          Crop Name
          <input
            id="farmer-crop"
            type="text"
            value={cropName}
            onChange={(event) => setCropName(event.target.value)}
            placeholder="e.g. Tomato"
            required
            className={inputClass}
          />
        </label>

        <label htmlFor="farmer-qty" className={labelClass}>
          Quantity
          <input
            id="farmer-qty"
            type="text"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            placeholder="e.g. 100 kg"
            required
            className={inputClass}
          />
        </label>

        <label htmlFor="farmer-price" className={labelClass}>
          Price
          <input
            id="farmer-price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="e.g. 20"
            min="0"
            step="0.01"
            required
            className={inputClass}
          />
        </label>

        <label htmlFor="farmer-expiry" className={labelClass}>
          Expiry (hours)
          <input
            id="farmer-expiry"
            type="number"
            value={expiryHours}
            onChange={(event) => setExpiryHours(event.target.value)}
            placeholder="e.g. 2"
            min="1"
            step="1"
            required
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !currentUser}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        {loading ? "Posting..." : !currentUser ? "Login to Post" : "Post Listing"}
      </button>
      {!currentUser ? (
        <p
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          Login to post distress listings.
        </p>
      ) : null}
      {feedback.text ? (
        <p
          className={`rounded-xl border px-4 py-3 text-sm ${
            feedback.isError
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-accent-200 bg-accent-50 text-accent-900"
          }`}
          role={feedback.isError ? "alert" : "status"}
        >
          {feedback.text}
        </p>
      ) : null}
    </form>
  );
}

export default FarmerForm;
