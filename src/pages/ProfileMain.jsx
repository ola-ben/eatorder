import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { HiShoppingBag } from "react-icons/hi";
import { FaStar, FaNairaSign } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function ProfileMain() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const fullName = user.fullName || "Guest User";
  const email = user.email || "No email";
  const tribeId = "NG12345";

  const logout = () => {
    localStorage.removeItem("loggedIn");
    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("storage"));
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const menu = [
    {
      name: "Profile Details",
      icon: HiUser,
      action: () => navigate("/profile/details"),
    },
    {
      name: "Login Details",
      icon: HiLockClosed,
      action: () => navigate("/profile/login-details"),
    },
    {
      name: "Referrals",
      icon: HiGift,
      action: () => navigate("/profile/referrals"),
    },
    {
      name: "Addresses",
      icon: HiMapPin,
      action: () => navigate("/profile/addresses"),
    },
    {
      name: "FAQs",
      icon: HiQuestionMarkCircle,
      action: () => navigate("/profile/faqs"),
    },
    {
      name: "Delete Account",
      icon: HiTrash,
      action: () => {
        if (
          window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone.",
          )
        ) {
          localStorage.clear();
          window.dispatchEvent(new Event("authChanged"));
          window.dispatchEvent(new Event("storage"));
          toast.success("Account deleted successfully!");
          navigate("/");
        }
      },
    },
    {
      name: "Log Out",
      icon: HiArrowRightOnRectangle,
      action: logout,
    },
  ];

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  return (
    <>
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-6 pb-6 px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-4xl shadow-lg">
          <HiUser />
        </div>
        <h2 className="text-xl font-semibold mt-3">{fullName}</h2>
        <p className="text-gray-500 text-sm">{email}</p>
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
      <div className="px-4 pb-8">
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

      {/* App version */}
      <p className="text-center text-gray-400 text-xs pb-8">v1.0.15</p>
    </>
  );
}
