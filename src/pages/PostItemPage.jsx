import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { addItem } from "../services/itemsService";
import { uploadItemListingImage } from "../services/storageService";
import { formatFirebaseError } from "../utils/firebaseErrors";
import CropImageDetector from "../components/CropImageDetector";
import VoiceInput from "../components/VoiceInput";
import { PlusCircle, Image as ImageIcon, Info, IndianRupee, Clock, AlertCircle, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import { cn } from "../lib/cn";
import toast from "react-hot-toast";

const STEPS = [
  { id: 1, label: "Product Info", icon: Info },
  { id: 2, label: "Price & Urgency", icon: IndianRupee },
  { id: 3, label: "Image & Submit", icon: ImageIcon },
];

const schema = z.object({
  cropName: z.string().min(1, "Product/crop name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  notes: z.string().optional(),
  price: z.string().min(1, "Price is required").refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Enter a valid price"),
  expiryHours: z.string().min(1, "Urgency window is required").refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Use a positive number"),
  imageUrl: z.string().optional(),
});

function PostItemPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTimerRef = useRef(null);
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      cropName: location.state?.cropName || "",
      quantity: "",
      notes: "",
      price: "",
      expiryHours: "",
      imageUrl: "",
    },
  });

  const cropName = watch("cropName");

  useEffect(() => {
    return () => { if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current); };
  }, []);

  useEffect(() => {
    if (!imageFile) { setImagePreviewUrl(""); return; }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const nextStep = async () => {
    const fieldsToValidate = step === 1
      ? ["cropName", "quantity"]
      : step === 2
        ? ["price", "expiryHours"]
        : [];
    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    if (!currentUser) { toast.error("You must be logged in to post."); return; }

    setLoading(true);
    try {
      let finalImageUrl = "";
      if (imageFile) {
        finalImageUrl = await uploadItemListingImage(storage, imageFile);
      } else if (data.imageUrl?.trim()) {
        finalImageUrl = data.imageUrl.trim();
      }

      const description = [
        `Quantity: ${data.quantity.trim()}.`,
        `Urgent window: ${data.expiryHours} hour(s).`,
        data.notes?.trim() || null,
      ].filter(Boolean).join(" ");

      await addItem(db, {
        title: data.cropName.trim(),
        price: Number(data.price),
        description,
        imageUrl: finalImageUrl,
        sellerId: currentUser.uid,
        expiresAt: Date.now() + Number(data.expiryHours) * 60 * 60 * 1000,
      });

      toast.success("🌾 Listing posted successfully!");
      redirectTimerRef.current = setTimeout(() => navigate("/dashboard", { replace: true }), 1200);
    } catch (err) {
      toast.error(formatFirebaseError(err));
    } finally {
      setLoading(false);
    }
  };

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setImageFile(null); return; }
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file."); setImageFile(null); return;
    }
    setImageFile(file);
  };

  const inputClass = (name) => cn(
    "mt-2 w-full rounded-2xl border bg-white px-5 py-4 text-base font-medium text-soil-dark-900 shadow-sm transition-all placeholder:text-soil-dark-400 focus:outline-none focus:ring-2",
    errors[name]
      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
      : "border-soil-dark-200 focus:border-agri-green-500 focus:ring-agri-green-500/20"
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <motion.div
        className="bg-soil-dark-950 rounded-3xl p-8 sm:p-10 shadow-card text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 text-agri-green-500 opacity-20">
          <PlusCircle className="w-64 h-64" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-agri-green-400 mb-2">New Listing</p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Post Harvest Produce</h2>
        <p className="mt-4 text-base text-soil-dark-300 max-w-2xl">
          List your time-sensitive items. Our auto-detection finds the perfect image for your crop!
        </p>
      </motion.div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === s.id;
          const done = step > s.id;
          return (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => { if (done) setStep(s.id); }}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all",
                  active ? "bg-agri-green-600 text-white shadow-floating scale-110"
                    : done ? "bg-agri-green-100 text-agri-green-700"
                      : "bg-soil-dark-100 text-soil-dark-400"
                )}
              >
                {done ? <Check className="h-5 w-5" /> : s.id}
              </button>
              <span className={cn("hidden sm:block text-sm font-bold", active ? "text-agri-green-700" : "text-soil-dark-400")}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-0.5 rounded-full", done ? "bg-agri-green-400" : "bg-soil-dark-100")} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          {/* STEP 1 – Product Info */}
          {step === 1 && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-soil-dark-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3 mb-2 pb-4 border-b border-soil-dark-100">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-agri-green-100 text-agri-green-700">
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-soil-dark-950 font-display">Product Details</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cropName" className="block text-sm font-bold text-soil-dark-800">
                      What are you selling? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2 mt-2">
                      <input
                        {...register("cropName")}
                        id="cropName"
                        placeholder="e.g. Roma Tomatoes, Wheat..."
                        className={cn(inputClass("cropName"), "mt-0 flex-1")}
                      />
                      <VoiceInput onResult={(text) => setValue("cropName", (cropName + " " + text).trim())} />
                    </div>
                    {errors.cropName && <p className="mt-2 text-sm font-bold text-red-600">{errors.cropName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-bold text-soil-dark-800">
                      Quantity available <span className="text-red-500">*</span>
                    </label>
                    <input {...register("quantity")} id="quantity" placeholder="e.g. 50 crates, 120 kg" className={inputClass("quantity")} />
                    {errors.quantity && <p className="mt-2 text-sm font-bold text-red-600">{errors.quantity.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-bold text-soil-dark-800">
                      Extra Notes <span className="text-soil-dark-400 font-medium">(Optional)</span>
                    </label>
                    <textarea
                      {...register("notes")}
                      id="notes"
                      rows={3}
                      placeholder="Pickup location, grade, packaging..."
                      className={cn(inputClass("notes"), "resize-none")}
                    />
                  </div>
                </div>

                {/* Auto-detect image preview */}
                <CropImageDetector inputText={cropName} className="h-64 md:h-auto min-h-[16rem]" />
              </div>
            </motion.section>
          )}

          {/* STEP 2 – Price & Urgency */}
          {step === 2 && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-soil-dark-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3 mb-2 pb-4 border-b border-soil-dark-100">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-harvest-gold-100 text-harvest-gold-700">
                  <IndianRupee className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-soil-dark-950 font-display">Price & Deadline</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="price" className="block text-sm font-bold text-soil-dark-800">
                    Price in ₹ <span className="text-red-500">*</span>
                  </label>
                  <input {...register("price")} id="price" type="number" placeholder="0.00" min="0" step="0.01" className={inputClass("price")} />
                  {errors.price && <p className="mt-2 text-sm font-bold text-red-600">{errors.price.message}</p>}

                  {/* Smart suggestion */}
                  <div className="mt-3 rounded-xl bg-harvest-gold-50 border border-harvest-gold-200 p-3 text-sm">
                    <p className="font-bold text-harvest-gold-800">💡 Price tip</p>
                    <p className="text-harvest-gold-700 mt-1">
                      Similar items sell for ₹500–₹2,000 on our platform. Price competitively for faster sale!
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="expiryHours" className="block text-sm font-bold text-soil-dark-800">
                    Urgency Window (Hours) <span className="text-red-500">*</span>
                  </label>
                  <input {...register("expiryHours")} id="expiryHours" type="number" placeholder="e.g. 4" min="1" step="1" className={inputClass("expiryHours")} />
                  {errors.expiryHours && <p className="mt-2 text-sm font-bold text-red-600">{errors.expiryHours.message}</p>}

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[2, 6, 24].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setValue("expiryHours", String(h))}
                        className="rounded-xl border border-soil-dark-200 bg-soil-dark-50 py-2 text-sm font-bold text-soil-dark-700 hover:bg-agri-green-50 hover:border-agri-green-300 hover:text-agri-green-700 transition-colors"
                      >
                        <Clock className="inline h-3 w-3 mr-1" />{h}h
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* STEP 3 – Image & Submit */}
          {step === 3 && (
            <motion.section
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-soil-dark-100 bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3 mb-2 pb-4 border-b border-soil-dark-100">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-soil-dark-950 font-display">
                  Product Image <span className="text-soil-dark-400 font-medium text-base ml-2 bg-soil-dark-50 px-3 py-1 rounded-full">(Optional)</span>
                </h3>
              </div>

              <div className="rounded-xl bg-agri-green-50 border border-agri-green-200 p-4 text-sm text-agri-green-800">
                <p className="font-bold">✨ Auto-image detected!</p>
                <p className="mt-1">We found an image for "{cropName}". You can upload your own photo below, or we'll use the auto-detected one.</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <label htmlFor="post-image-file" className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-soil-dark-200 bg-soil-dark-50 px-6 py-10 transition-colors hover:border-agri-green-400 hover:bg-agri-green-50">
                    <ImageIcon className="h-8 w-8 text-soil-dark-400 group-hover:text-agri-green-600 mb-3" />
                    <span className="text-sm font-bold text-soil-dark-700">Click to upload photo</span>
                    <span className="text-xs text-soil-dark-400 mt-1">JPEG, PNG, WebP</span>
                    <input id="post-image-file" type="file" accept="image/*" onChange={onPickFile} className="hidden" />
                  </label>

                  <div className="relative flex items-center py-1">
                    <div className="flex-grow border-t border-soil-dark-200" />
                    <span className="mx-4 text-soil-dark-400 text-xs font-bold uppercase">Or paste URL</span>
                    <div className="flex-grow border-t border-soil-dark-200" />
                  </div>

                  <input {...register("imageUrl")} type="url" placeholder="https://..." className={inputClass("imageUrl")} />
                </div>

                <div className="flex items-center justify-center rounded-2xl border border-soil-dark-100 bg-cream-50 overflow-hidden h-64 lg:h-auto min-h-[16rem]">
                  {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <CropImageDetector inputText={cropName} className="h-full w-full" />
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="flex items-center gap-2 rounded-2xl border border-soil-dark-200 bg-white px-6 py-4 text-base font-bold text-soil-dark-700 transition-all hover:bg-soil-dark-50">
              <ChevronLeft className="h-5 w-5" /> Previous
            </button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="flex items-center gap-2 rounded-2xl bg-agri-green-600 px-8 py-4 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-agri-green-700">
              Next Step <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-2xl bg-agri-green-600 px-8 py-4 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-1 hover:bg-agri-green-700 disabled:bg-soil-dark-300 disabled:hover:translate-y-0">
              {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Posting...</> : <><Check className="h-5 w-5" /> List Harvest Now</>}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PostItemPage;
