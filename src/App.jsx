import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingChatbot from "./components/FloatingChatbot";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PostItemPage from "./pages/PostItemPage";
import MyItemsPage from "./pages/MyItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import MarketPricesPage from "./pages/MarketPricesPage";
import GovernmentSchemesPage from "./pages/GovernmentSchemesPage";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route
                    path="/post"
                    element={
                      <ProtectedRoute>
                        <PostItemPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-items"
                    element={
                      <ProtectedRoute>
                        <MyItemsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/item/:id" element={<ItemDetailPage />} />
                  <Route path="/market-prices" element={<MarketPricesPage />} />
                  <Route path="/government-schemes" element={<GovernmentSchemesPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>

            {/* Global overlays */}
            <FloatingChatbot />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  borderRadius: "16px",
                  padding: "14px 20px",
                  fontWeight: 600,
                  fontSize: "14px",
                },
                success: {
                  iconTheme: { primary: "#22c55e", secondary: "#fff" },
                },
              }}
            />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
