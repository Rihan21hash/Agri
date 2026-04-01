import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import { Leaf, ArrowLeft } from "lucide-react";

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
    <div className="flex min-h-screen flex-col bg-cream-50 font-sans">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        
        {/* Left Side: Form */}
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-[45%] xl:w-[40%] bg-white relative z-10 shadow-2xl">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-soil-dark-400 hover:text-soil-dark-900 transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-agri-green-400 to-agri-green-600 shadow-floating text-white mb-6">
              <Leaf className="h-6 w-6" />
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-soil-dark-950">
              {mode === "register" ? "Join the Network" : "Welcome Back"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-soil-dark-500 font-medium">
              {mode === "register"
                ? "Connect directly with local buyers and sell your distress harvest fast."
                : "Sign in to post new listings and check on your active deals."}
            </p>

            <div className="mt-8">
              <div className="flex rounded-2xl bg-soil-dark-50 p-1 mb-8 border border-soil-dark-100">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setMessage("");
                  }}
                  disabled={loading}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-300 ${
                    mode === "login"
                      ? "bg-white text-soil-dark-900 shadow-sm"
                      : "text-soil-dark-500 hover:text-soil-dark-900"
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setMessage("");
                  }}
                  disabled={loading}
                  className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-300 ${
                    mode === "register"
                      ? "bg-white text-soil-dark-900 shadow-sm"
                      : "text-soil-dark-500 hover:text-soil-dark-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form className="space-y-6" onSubmit={onSubmit} noValidate>
                <FormInput
                  id="auth-email"
                  label="Email Address"
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

                {message ? (
                  <p
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                      isError
                        ? "border-red-200 bg-red-50 text-red-800"
                        : "border-agri-green-200 bg-agri-green-50 text-agri-green-800"
                    }`}
                    role={isError ? "alert" : "status"}
                  >
                    {message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-2xl bg-harvest-gold-500 px-4 py-4 text-base font-bold text-white shadow-floating transition-all hover:-translate-y-0.5 hover:bg-harvest-gold-600 focus:outline-none focus:ring-2 focus:ring-harvest-gold-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading
                    ? "Wait..."
                    : mode === "register"
                      ? "Create Account"
                      : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Image/Graphic */}
        <div className="relative hidden w-0 flex-1 lg:block bg-soil-dark-900 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
            src="/images/hero_farm_bg_1775016466746.png"
            alt="Farm backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil-dark-950/80 via-soil-dark-900/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
             <h3 className="font-display text-4xl font-bold mb-2 shadow-sm drop-shadow-md">Built for the Field</h3>
             <p className="text-lg opacity-90 max-w-lg font-medium shadow-sm drop-shadow-md">
               Join thousands of growers connecting directly with local buyers. Cut out the middleman and sell produce fast.
             </p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default AuthPage;
