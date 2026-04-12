import { useState, useRef, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { cn } from "../lib/cn";

/**
 * Voice input button using Web Speech API.
 * Appends recognized speech to the parent's input.
 */
export default function VoiceInput({ onResult, className }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const supported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const toggle = useCallback(() => {
    if (!supported) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript || "";
      if (text && onResult) onResult(text);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [listening, onResult, supported]);

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? "Stop listening" : "Voice input"}
      className={cn(
        "flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200",
        listening
          ? "border-red-400 bg-red-50 text-red-600 animate-pulse shadow-md"
          : "border-soil-dark-200 bg-white text-soil-dark-500 hover:bg-agri-green-50 hover:text-agri-green-600 hover:border-agri-green-300",
        className
      )}
    >
      {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
    </button>
  );
}
