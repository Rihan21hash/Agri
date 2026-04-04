import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { addItem } from "../services/itemsService";
import { uploadItemListingImage } from "../services/storageService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import { PlusCircle, Image as ImageIcon, Info, IndianRupee, Clock, AlertCircle } from "lucide-react";

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
        finalImageUrl = await uploadItemListingImage(storage, imageFile);
      } else if (imageUrl.trim()) {
        finalImageUrl = imageUrl.trim();
      }

      await addItem(db, {
        title,
        price: priceNum,
        description,
        imageUrl: finalImageUrl,
        sellerId: currentUser.uid,
        expiresAt,
      });

      postSucceeded = true;
      resetForm();
      setSuccess("Post successful!");
    } catch (err) {
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
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="bg-soil-dark-950 rounded-3xl p-8 sm:p-10 shadow-card text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 text-agri-green-500 opacity-20">
           <PlusCircle className="w-64 h-64" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-agri-green-400 mb-2">New Listing</p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl text-white">
          Post Harvest Produce
        </h2>
        <p className="mt-4 text-base leading-relaxed text-soil-dark-300 max-w-2xl">
          List your time-sensitive items clearly. Items approach expiration quickly in our live market, so ensure your pricing and availability window are accurate.
        </p>
      </div>

      <form
        className="space-y-8"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Section 1: Basic Info */}
        <section className="rounded-3xl border border-soil-dark-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-soil-dark-100">
             <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-agri-green-100 text-agri-green-700">
                <Info className="h-5 w-5" />
             </div>
             <h3 className="text-xl font-bold text-soil-dark-950 font-display">Product Details</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormInput
              id="post-crop"
              label="What are you selling?"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="e.g. Roma Tomatoes, Sweet Corn"
              error={fieldErrors.cropName}
              required
            />
            <FormInput
              id="post-qty"
              label="Quantity available"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 50 crates, 120 kg"
              error={fieldErrors.quantity}
              required
            />
            <div className="md:col-span-2">
              <label
                htmlFor="post-notes"
                className="block text-sm font-bold text-soil-dark-800"
              >
                Extra Notes <span className="text-soil-dark-400 font-medium">(Optional)</span>
                <textarea
                  id="post-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Notes on pickup location, grade, or packaging..."
                  className="mt-2 w-full rounded-2xl border border-soil-dark-200 bg-white px-5 py-4 text-base font-medium text-soil-dark-900 shadow-sm transition-all duration-200 placeholder:text-soil-dark-400 focus:border-agri-green-500 focus:outline-none focus:ring-2 focus:ring-agri-green-500/20"
                />
              </label>
            </div>
          </div>
        </section>

        {/* Section 2: Pricing & Urgency */}
        <section className="rounded-3xl border border-soil-dark-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-soil-dark-100">
             <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-harvest-gold-100 text-harvest-gold-700">
                <IndianRupee className="h-5 w-5" />
             </div>
             <h3 className="text-xl font-bold text-soil-dark-950 font-display">Price & Deadline</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormInput
              id="post-price"
              label="Price in ₹ (Total or per unit? Clarify in notes)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              error={fieldErrors.price}
              required
            />
            <FormInput
              id="post-expiry"
              label="Urgency Window (Hours)"
              type="number"
              value={expiryHours}
              onChange={(e) => setExpiryHours(e.target.value)}
              placeholder="e.g. 4 hours until it spoils"
              min="1"
              step="1"
              error={fieldErrors.expiryHours}
              required
            />
          </div>
        </section>

        {/* Section 3: Imagery */}
        <section className="rounded-3xl border border-soil-dark-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-soil-dark-100">
             <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <ImageIcon className="h-5 w-5" />
             </div>
             <h3 className="text-xl font-bold text-soil-dark-950 font-display">Product Image <span className="text-soil-dark-400 font-medium text-base ml-2 bg-soil-dark-50 px-3 py-1 rounded-full">(Optional)</span></h3>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4">
               <div>
                  <p className="text-sm font-bold text-soil-dark-800">Upload a Photo</p>
                  <p className="text-xs text-soil-dark-500 mt-1">Take a quick picture from your phone.</p>
               </div>
               <label
                htmlFor="post-image-file"
                className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-soil-dark-200 bg-soil-dark-50 px-6 py-10 transition-colors hover:border-agri-green-400 hover:bg-agri-green-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm mb-3 text-soil-dark-400 group-hover:text-agri-green-600 transition-colors">
                   <ImageIcon className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-soil-dark-700">Click to upload file</span>
                <input
                  id="post-image-file"
                  type="file"
                  accept="image/*"
                  onChange={onPickFile}
                  className="hidden"
                />
              </label>

              {fieldErrors.imageFile ? (
                <p className="mt-2 text-sm font-bold text-red-600" role="alert">
                  {fieldErrors.imageFile}
                </p>
              ) : null}

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-soil-dark-200"></div>
                <span className="flex-shrink-0 mx-4 text-soil-dark-400 text-xs font-bold uppercase tracking-widest">Or</span>
                <div className="flex-grow border-t border-soil-dark-200"></div>
              </div>

              <FormInput
                id="post-image-url"
                label="Paste Image URL"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                error={fieldErrors.imageUrl}
              />
            </div>

            <div className="flex items-center justify-center rounded-2xl border border-soil-dark-100 bg-cream-50 overflow-hidden h-64 lg:h-auto min-h-[16rem]">
              {imagePreviewUrl ? (
                 <img
                    src={imagePreviewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                 />
              ) : imageUrl ? (
                 <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                       e.target.src = "/images/placeholder_crop_1775016486419.png"
                    }}
                 />
              ) : (
                 <div className="text-center p-6 text-soil-dark-400 flex flex-col items-center">
                    <ImageIcon className="h-10 w-10 mb-2 opacity-30" />
                    <p className="text-sm font-medium">Image Preview</p>
                 </div>
              )}
            </div>
          </div>
        </section>

        {error ? (
          <div
            className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800 shadow-sm"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {success ? (
          <div
            className="flex items-center gap-3 rounded-2xl border border-agri-green-200 bg-agri-green-50 p-5 text-sm font-medium text-agri-green-800 shadow-sm"
            role="status"
          >
            <Clock className="h-5 w-5 shrink-0 animate-pulse" />
            <p>{success} Redirecting...</p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-agri-green-600 px-8 py-5 text-lg font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-agri-green-700 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-agri-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-soil-dark-300 disabled:hover:translate-y-0 disabled:shadow-none"
        >
          {loading ? "Posting to Market..." : "List Harvest Now"}
        </button>
      </form>
    </div>
  );
}

export default PostItemPage;
