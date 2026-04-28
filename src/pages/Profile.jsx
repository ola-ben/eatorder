import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

import ProfileMain from "./ProfileMain";
import ProfileOrders from "./ProfileOrders";
import ProfileWallet from "./ProfileWallet";

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
    <section className="bg-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with Back Icon and Tabs */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex items-center px-4 pt-4">
            {/* Back Icon - Far Left with Background */}
            <button
              onClick={() => navigate("/")}
              className="bg-gray-100 hover:bg-gray-200 p-2 mb-2 rounded-full text-gray-700 hover:text-red-600 transition-all duration-300 shadow-sm"
            >
              <HiArrowSmallLeft className="text-xl" />
            </button>

            {/* Tabs - Centered with flex-1 */}
            <div className="flex-1 flex justify-center gap-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-3 pt-2 px-2 font-medium text-sm transition-all ${
                  activeTab === "profile"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`pb-3 pt-2 px-2 font-medium text-sm transition-all ${
                  activeTab === "orders"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("wallet")}
                className={`pb-3 pt-2 px-2 font-medium text-sm transition-all ${
                  activeTab === "wallet"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
              >
                Wallet
              </button>
            </div>

            {/* Empty div for spacing balance */}
            <div className="w-10"></div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && <ProfileMain />}
        {activeTab === "orders" && <ProfileOrders />}
        {activeTab === "wallet" && <ProfileWallet />}
      </div>
    </section>
  );
}
