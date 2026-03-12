import { useNavigate } from "react-router-dom";
import { useState } from "react";
// hi2 exports
import {
  HiUser,
  HiLockClosed,
  HiGift,
  HiMapPin,
  HiQuestionMarkCircle,
  HiTrash,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
// hi exports
import {
  HiPlus,
  HiShoppingBag,
  HiEye,
  HiEyeOff,
  HiCash,
  HiCreditCard,
} from "react-icons/hi";
import { FaStar, FaNairaSign } from "react-icons/fa6"; // Using Fa6 for Naira sign
import { BiWallet } from "react-icons/bi"; // Alternative wallet icon

export default function Profile() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile, orders, wallet

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const fullName = user.fullName || "Guest User";
  const email = user.email || "No email";
  const tribeId = "NG12345"; // Nigerian-style ID

  // Mock data - replace with actual data from your backend
  const loyaltyData = {
    points: 2450,
    cashback: 12500, // in Naira
    tier: "Gold",
    nextTier: "Platinum",
    pointsToNext: 550,
  };

  const recentOrders = [
    {
      id: "#NG001",
      date: "2024-01-15",
      items: 3,
      amount: 12599,
      status: "Delivered",
    },
    {
      id: "#NG002",
      date: "2024-01-10",
      items: 2,
      amount: 8999,
      status: "Processing",
    },
    {
      id: "#NG003",
      date: "2024-01-05",
      items: 5,
      amount: 25499,
      status: "Delivered",
    },
  ];

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  const menu = [
    {
      name: "Profile Details",
      icon: HiUser,
      action: () => alert("Profile details coming soon"),
    },
    {
      name: "Login Details",
      icon: HiLockClosed,
      action: () => alert("Login details coming soon"),
    },
    {
      name: "Referrals",
      icon: HiGift,
      action: () => alert("Referrals coming soon"),
    },
    {
      name: "Addresses",
      icon: HiMapPin,
      action: () => alert("Addresses coming soon"),
    },
    {
      name: "FAQs",
      icon: HiQuestionMarkCircle,
      action: () => alert("FAQs coming soon"),
    },
    {
      name: "Delete Account",
      icon: HiTrash,
      action: () => {
        localStorage.clear();
        navigate("/");
      },
    },
    {
      name: "Log Out",
      icon: HiArrowRightOnRectangle,
      action: logout,
    },
  ];

  // Format currency in Naira
  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  return (
    <section className="bg-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with Tabs */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex justify-around pt-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-3 px-4 font-medium text-sm transition-all ${
                activeTab === "profile"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-3 px-4 font-medium text-sm transition-all ${
                activeTab === "orders"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("wallet")}
              className={`pb-3 px-4 font-medium text-sm transition-all ${
                activeTab === "wallet"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500"
              }`}
            >
              Wallet
            </button>
          </div>
        </div>

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <>
            {/* Profile Header */}
            <div className="flex flex-col items-center pt-6 pb-6 px-4">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-4xl shadow-lg">
                <HiUser />
              </div>

              {/* Name */}
              <h2 className="text-xl font-semibold mt-3">{fullName}</h2>
              <p className="text-gray-500 text-sm">{email}</p>

              {/* Badges */}
              <div className="flex gap-3 mt-4">
                <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium border border-red-100">
                  ID: {tribeId}
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium border border-green-100">
                  <FaStar className="text-yellow-400" />
                  4.9
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-3 gap-3 px-4 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl text-center">
                <HiShoppingBag className="text-red-500 text-xl mx-auto mb-1" />
                <span className="text-xs text-gray-600">Orders</span>
                <span className="block font-bold text-gray-800">24</span>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl text-center">
                <FaNairaSign className="text-red-500 text-xl mx-auto mb-1" />
                <span className="text-xs text-gray-600">Cashback</span>
                <span className="block font-bold text-gray-800">
                  {formatNaira(12500)}
                </span>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-xl text-center">
                <HiGift className="text-red-500 text-xl mx-auto mb-1" />
                <span className="text-xs text-gray-600">Referrals</span>
                <span className="block font-bold text-gray-800">12</span>
              </div>
            </div>

            {/* Menu */}
            <div className="px-4">
              {menu.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="flex items-center justify-between w-full py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-gray-700">
                      <Icon className="text-xl text-gray-500" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-gray-400 text-xl">›</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <button className="text-red-500 text-sm font-medium flex items-center gap-1">
                <HiPlus /> Add Order
              </button>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">
                      {order.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{order.date}</span>
                    <span>{order.items} items</span>
                    <span className="font-semibold">
                      {formatNaira(order.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 border border-red-500 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-colors">
              View All Orders
            </button>
          </div>
        )}

        {/* Wallet Tab Content */}
        {activeTab === "wallet" && (
          <div className="p-4">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm opacity-90">Wallet Balance</p>
                  <div className="flex items-center gap-2">
                    <h2 className="text-3xl font-bold">
                      {showBalance
                        ? formatNaira(loyaltyData.cashback)
                        : "₦••••"}
                    </h2>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      {showBalance ? (
                        <HiEyeOff size={20} />
                      ) : (
                        <HiEye size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {loyaltyData.tier} Tier
                </div>
              </div>

              {/* Points Progress */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Loyalty Points</span>
                  <span className="font-semibold">
                    {loyaltyData.points} pts
                  </span>
                </div>
                <div className="bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(loyaltyData.points / (loyaltyData.points + loyaltyData.pointsToNext)) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-2 opacity-90">
                  {loyaltyData.pointsToNext} points to reach{" "}
                  {loyaltyData.nextTier}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="bg-red-50 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-red-100 transition-colors">
                <HiCash className="text-red-500 text-2xl" />
                <span className="text-sm font-medium text-gray-700">
                  Fund Wallet
                </span>
              </button>
              <button className="bg-red-50 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-red-100 transition-colors">
                <HiGift className="text-red-500 text-2xl" />
                <span className="text-sm font-medium text-gray-700">
                  Redeem
                </span>
              </button>
            </div>

            {/* Transaction History */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Recent Transactions
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <HiPlus className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Cashback Credited</p>
                      <p className="text-xs text-gray-500">Order #NG001</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-semibold">
                    +{formatNaira(1250)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <HiShoppingBag className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Order Payment</p>
                      <p className="text-xs text-gray-500">Order #NG002</p>
                    </div>
                  </div>
                  <span className="text-red-600 font-semibold">
                    -{formatNaira(8999)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* App version - only show in profile tab */}
        {activeTab === "profile" && (
          <p className="text-center text-gray-400 text-xs mt-8 pb-6">v1.0.15</p>
        )}
      </div>
    </section>
  );
}
