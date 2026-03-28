import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

function AuthSection({ currentUser }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
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

  return (
    <div className="auth-wrap">
      {currentUser ? (
        <div className="auth-info">
          <p className="auth-welcome">
            Logged in as <strong>{currentUser.email}</strong>
          </p>
          <p className="auth-note">You can now post listings and mark items as interested.</p>
          <button
            type="button"
            className="interested-btn"
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        </div>
      ) : (
        <>
          <div className="auth-toggle">
            <button
              type="button"
              className={`auth-toggle-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
              disabled={loading}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-toggle-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => setMode("signup")}
              disabled={loading}
            >
              Signup
            </button>
          </div>

          <form className="form" onSubmit={onSubmit}>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Login"}
            </button>

            {message ? <p className={`auth-message ${isError ? "danger" : ""}`}>{message}</p> : null}
          </form>
        </>
      )}
    </div>
  );
}

export default AuthSection;

