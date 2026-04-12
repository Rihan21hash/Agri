import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function FABSellButton() {
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  return (
    <motion.div
      className="fixed bottom-24 right-4 z-40 md:bottom-8 md:right-8"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Link
        to={currentUser ? "/post" : "/auth"}
        className="group flex h-14 items-center gap-2 rounded-full bg-harvest-gold-500 pl-4 pr-5 text-sm font-bold text-white shadow-floating transition-all duration-300 hover:-translate-y-1 hover:bg-harvest-gold-600 hover:shadow-card-hover md:h-16 md:pl-5 md:pr-6 md:text-base"
      >
        <Plus className="h-5 w-5 transition-transform group-hover:rotate-90 md:h-6 md:w-6" />
        <span className="hidden sm:inline">{t("general.sellNow")}</span>
        <span className="sm:hidden">+</span>
      </Link>
    </motion.div>
  );
}
