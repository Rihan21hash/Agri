import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PageSpinner() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-earth-200 border-t-accent-600"
        aria-hidden
      />
      <p className="text-sm text-earth-600">Loading…</p>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { currentUser, authReady } = useAuth();
  const location = useLocation();

  if (!authReady) {
    return <PageSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
