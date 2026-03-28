import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, authReady } = useAuth();
  const initialMode = location.state?.mode === "register" ? "register" : "login";

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (location.state?.mode === "register") {
      setMode("register");
    }
  }, [location.state]);

  useEffect(() => {
    if (authReady && currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [authReady, currentUser, navigate]);

  const validate = () => {
    const next = {};
    const trimmed = email.trim();
    if (!trimmed) next.email = "Email is required.";
    if (!password) next.password = "Password is required.";
    if (password && password.length < 6) {
      next.password = "Use at least 6 characters.";
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    if (!validate()) return;

    setLoading(true);
    try {
      const trimmedEmail = email.trim();
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
      }
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setMessage(error?.message || "Authentication failed.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-cream-50 to-earth-50">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-earth-200 bg-white p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold text-earth-950">
            {mode === "register" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-earth-600">
            {mode === "register"
              ? "Join growers and buyers on the distress sale market."
              : "Sign in to post listings and respond to harvest alerts."}
          </p>

          <div className="mt-8 inline-flex w-full rounded-xl border border-earth-200 bg-earth-50/80 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
              disabled={loading}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-earth-950 shadow-sm"
                  : "text-earth-600 hover:text-earth-950"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setMessage("");
              }}
              disabled={loading}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-earth-950 shadow-sm"
                  : "text-earth-600 hover:text-earth-950"
              }`}
            >
              Register
            </button>
          </div>

          <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
            <FormInput
              id="auth-email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              error={fieldErrors.email}
              required
            />
            <FormInput
              id="auth-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
              error={fieldErrors.password}
              hint={mode === "register" ? "At least 6 characters." : undefined}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-accent-600 to-earth-800 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait…"
                : mode === "register"
                  ? "Create account"
                  : "Sign in"}
            </button>

            {message ? (
              <p
                className={`rounded-xl border px-4 py-3 text-sm ${
                  isError
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-earth-200 bg-earth-50 text-earth-800"
                }`}
                role={isError ? "alert" : "status"}
              >
                {message}
              </p>
            ) : null}
          </form>

          <p className="mt-8 text-center text-sm text-earth-600">
            <Link to="/" className="font-semibold text-accent-800 hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AuthPage;
