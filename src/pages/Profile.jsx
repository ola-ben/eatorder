import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";

import ProfileMain from "./ProfileMain";
import ProfileOrders from "./ProfileOrders";
import ProfileWallet from "./ProfileWallet";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "orders", label: "Orders" },
  { id: "wallet", label: "Wallet" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { loggedIn, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!loading && !loggedIn) {
      toast.error("Please login to view your profile");
      navigate("/logiformpage");
    }
    window.scrollTo(0, 0);
  }, [loading, loggedIn, navigate]);

  return (
    <main className="min-h-screen bg-canvas pb-safe-nav lg:pb-12">
      <TopNav />
      <div className="max-w-md mx-auto bg-white min-h-screen lg:min-h-0 lg:bg-transparent lg:max-w-3xl lg:px-6 lg:py-8">
        {/* Mobile sticky header */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-ink">Account</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 px-4 pt-1">
            {tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative pb-3 pt-1 text-sm font-semibold transition-colors ${
                    active ? "text-brand" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t.label}
                  {active && (
                    <motion.span
                      layoutId="profile-tab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-brand rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop heading + tabs */}
        <div className="hidden lg:block mb-4">
          <h1 className="text-3xl font-bold text-ink mb-4">Account</h1>
          <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-card border border-gray-100 max-w-sm">
            {tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active ? "text-white" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="profile-tab-desktop"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-brand"
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "profile" && <ProfileMain />}
          {activeTab === "orders" && <ProfileOrders />}
          {activeTab === "wallet" && <ProfileWallet />}
        </motion.div>
      </div>
      <BottomNav />
    </main>
  );
}
