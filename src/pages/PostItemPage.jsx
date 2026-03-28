import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { addItem } from "../services/itemsService";
import { uploadItemListingImage } from "../services/storageService";
import { formatFirebaseError } from "../utils/firebaseErrors";

function PostItemPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const redirectTimerRef = useRef(null);

  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expiryHours, setExpiryHours] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl("");
      return undefined;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [imageFile]);

  const resetForm = () => {
    setCropName("");
    setQuantity("");
    setPrice("");
    setExpiryHours("");
    setImageFile(null);
    setImageUrl("");
    setNotes("");
  };

  /** Returns { valid, title, description, priceNum, expiresAt } or { valid: false } */
  const validateForm = () => {
    const next = {};
    const title = cropName.trim();
    if (!title) next.cropName = "Title (crop / product) is required.";

    if (!quantity.trim()) next.quantity = "Quantity is required.";

    if (!price) next.price = "Price is required.";
    const priceNum = Number(price);
    if (price && (Number.isNaN(priceNum) || priceNum < 0)) {
      next.price = "Enter a valid non-negative price.";
    }

    if (!expiryHours) next.expiryHours = "Urgency window (hours) is required.";
    const hours = Number(expiryHours);
    if (expiryHours && (Number.isNaN(hours) || hours <= 0)) {
      next.expiryHours = "Use a positive number of hours.";
    }

    if (!imageFile && imageUrl.trim()) {
      try {
        // eslint-disable-next-line no-new
        new URL(imageUrl.trim());
      } catch {
        next.imageUrl = "Enter a valid image URL or upload a file.";
      }
    }

    setFieldErrors(next);
    if (Object.keys(next).length > 0) {
      return { valid: false };
    }

    const hoursFinal = Number(expiryHours);
    const description = [
      `Quantity: ${quantity.trim()}.`,
      `Urgent window: ${hoursFinal} hour(s).`,
      notes.trim() ? notes.trim() : null,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    if (!description) {
      next.description = "Description could not be built — check quantity and notes.";
      setFieldErrors(next);
      return { valid: false };
    }

    return {
      valid: true,
      title,
      description,
      priceNum,
      expiresAt: Date.now() + hoursFinal * 60 * 60 * 1000,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentUser) {
      setError("You must be logged in to post.");
      return;
    }

    const parsed = validateForm();
    if (!parsed.valid) {
      setError("Please fix the highlighted fields before posting.");
      return;
    }

    const { title, description, priceNum, expiresAt } = parsed;

    let postSucceeded = false;

    try {
      setLoading(true);

      let finalImageUrl = "";
      if (imageFile) {
        // eslint-disable-next-line no-console
        console.log("[PostItem] Uploading image...");
        finalImageUrl = await uploadItemListingImage(storage, imageFile);
      } else if (imageUrl.trim()) {
        finalImageUrl = imageUrl.trim();
      }

      // eslint-disable-next-line no-console
      console.log("[PostItem] Saving to Firestore...");
      await addItem(db, {
        title,
        price: priceNum,
        description,
        imageUrl: finalImageUrl,
        sellerId: currentUser.uid,
        expiresAt,
      });

      // eslint-disable-next-line no-console
      console.log("[PostItem] Post successful");

      postSucceeded = true;
      resetForm();
      setSuccess("Item posted successfully");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[PostItem]", err);
      setError(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }

    if (postSucceeded) {
      redirectTimerRef.current = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1200);
    }
  };

  const onPickFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageFile(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setFieldErrors((prev) => ({
        ...prev,
        imageFile: "Please choose an image file (JPEG, PNG, WebP, etc.).",
      }));
      setImageFile(null);
      return;
    }
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.imageFile;
      return next;
    });
    setImageFile(file);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-earth-950">
          Post a distress listing
        </h2>
        <p className="mt-2 text-sm text-earth-600">
          Listings are saved to Firestore and stay visible after refresh. Upload a product
          photo to Firebase Storage, or paste an image URL.
        </p>
      </div>

      <form
        className="space-y-6 rounded-2xl border border-earth-200 bg-white p-6 shadow-sm sm:p-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <FormInput
            id="post-crop"
            label="Crop / product"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            placeholder="e.g. Roma tomato"
            error={fieldErrors.cropName}
            required
          />
          <FormInput
            id="post-qty"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 120 kg"
            error={fieldErrors.quantity}
            required
          />
          <FormInput
            id="post-price"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 24"
            min="0"
            step="0.01"
            error={fieldErrors.price}
            required
          />
          <FormInput
            id="post-expiry"
            label="Urgency window (hours)"
            type="number"
            value={expiryHours}
            onChange={(e) => setExpiryHours(e.target.value)}
            placeholder="e.g. 4"
            min="1"
            step="1"
            error={fieldErrors.expiryHours}
            required
          />
        </div>

        <div className="rounded-xl border border-earth-200 bg-earth-50/50 p-4 sm:p-5">
          <p className="text-sm font-medium text-earth-800">Product image (optional)</p>
          <p className="mt-1 text-xs text-earth-500">
            Upload a file (stored at{" "}
            <code className="rounded bg-earth-100 px-1">
              items/&#123;timestamp&#125;-&#123;filename&#125;
            </code>
            ) or paste a direct image URL.
          </p>
          <label
            htmlFor="post-image-file"
            className="mt-4 flex cursor-pointer flex-col gap-2"
          >
            <span className="text-sm font-medium text-earth-800">Upload file</span>
            <input
              id="post-image-file"
              type="file"
              accept="image/*"
              onChange={onPickFile}
              className="text-sm text-earth-700 file:mr-3 file:rounded-lg file:border-0 file:bg-earth-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-earth-800"
            />
          </label>
          {fieldErrors.imageFile ? (
            <p className="mt-2 text-xs font-medium text-red-600" role="alert">
              {fieldErrors.imageFile}
            </p>
          ) : null}
          {imagePreviewUrl ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-earth-200 bg-white">
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="max-h-56 w-full object-contain"
              />
            </div>
          ) : null}
        </div>

        <FormInput
          id="post-image-url"
          label="Or paste image URL"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://… (optional if you uploaded a file)"
          error={fieldErrors.imageUrl}
          hint="Used only when no file is uploaded."
        />

        <div>
          <label
            htmlFor="post-notes"
            className="block text-sm font-medium text-earth-800"
          >
            Extra notes
            <textarea
              id="post-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Pickup location, grade, packaging…"
              className="mt-1.5 w-full rounded-xl border border-earth-200 bg-white px-4 py-2.5 text-sm text-earth-950 shadow-sm placeholder:text-earth-400 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500/25"
            />
          </label>
        </div>

        {error ? (
          <div
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {error}
          </div>
        ) : null}

        {success ? (
          <div
            className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-950"
            role="status"
          >
            {success} Redirecting to the market…
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-earth-900 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-earth-800 focus:outline-none focus:ring-2 focus:ring-earth-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-earth-300"
        >
          {loading ? "Posting…" : "Post Item"}
        </button>
      </form>
    </div>
  );
}

export default PostItemPage;
