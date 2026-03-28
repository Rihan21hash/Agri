import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

function AuthSection() {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) return;

    setLoading(true);
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, trimmedEmail, password);
        setMessage("Account created. You are logged in.");
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, password);
        setMessage("Logged in successfully.");
      }
    } catch (error) {
      setMessage(error?.message || "Authentication failed.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setMessage("");
    setIsError(false);
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      setMessage(error?.message || "Sign out failed.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div className="space-y-6">
      {currentUser ? (
        <div className="rounded-xl border border-accent-100 bg-accent-50/50 p-5">
          <p className="text-sm text-slate-700">
            Logged in as{" "}
            <strong className="font-semibold text-slate-900">
              {currentUser.email}
            </strong>
          </p>
          <p className="mt-2 text-sm text-slate-600">
            You can now post listings and mark items as interested.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            Sign out
          </button>
          {message ? (
            <p
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                isError
                  ? "border-red-200 bg-red-50 text-red-800"
                  : "border-accent-200 bg-white text-accent-900"
              }`}
              role={isError ? "alert" : "status"}
            >
              {message}
            </p>
          ) : null}
        </div>
      ) : (
        <>
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50/80 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              disabled={loading}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              disabled={loading}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Signup
            </button>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <label htmlFor="auth-email" className={labelClass}>
              Email
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={inputClass}
              />
            </label>

            <label htmlFor="auth-password" className={labelClass}>
              Password
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete={
                  mode === "signup" ? "new-password" : "current-password"
                }
                required
                className={inputClass}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-accent-600 to-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-accent-600/25 transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                  ? "Create Account"
                  : "Login"}
            </button>

            {message ? (
              <p
                className={`rounded-xl border px-4 py-3 text-sm ${
                  isError
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-slate-200 bg-slate-50 text-slate-800"
                }`}
                role={isError ? "alert" : "status"}
              >
                {message}
              </p>
            ) : null}
          </form>
        </>
      )}
    </div>
  );
}

export default AuthSection;
