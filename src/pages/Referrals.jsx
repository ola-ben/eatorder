import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiArrowSmallLeft, HiGift, HiUser } from "react-icons/hi2";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Referrals() {
  const navigate = useNavigate();
  const [referralCode] = useState("FOOD2345");
  const [referralLink] = useState("https://deliciousfood.com/ref/FOOD2345");
  const [referrals, setReferrals] = useState([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      toast.error("Please login to view referrals");
      navigate("/logiformpage");
    }

    // Mock referral data
    setReferrals([
      {
        id: 1,
        name: "John Doe",
        date: "2024-01-15",
        status: "Active",
        reward: 500,
      },
      {
        id: 2,
        name: "Jane Smith",
        date: "2024-01-10",
        status: "Active",
        reward: 500,
      },
      {
        id: 3,
        name: "Mike Johnson",
        date: "2024-01-05",
        status: "Pending",
        reward: 0,
      },
    ]);
  }, [navigate]);

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const shareViaWhatsApp = () => {
    const message = `Join Delicious Food and get amazing discounts! Use my referral code: ${referralCode} or sign up at ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareViaFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      "_blank",
    );
  };

  const shareViaTwitter = () => {
    const tweet = `Get delicious food delivered with @DeliciousFood! Use my referral code ${referralCode} for discounts!`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`,
      "_blank",
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen font-montserrat">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header with Standout Back Button */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-700 hover:text-red-600 transition-all duration-300 shadow-sm"
            >
              <HiArrowSmallLeft className="text-xl" />
            </button>
            <h1 className="text-xl font-semibold">Referrals</h1>
          </div>
        </div>

        {/* Content with bottom padding */}
        <div className="p-6 pb-8">
          {/* Referral Stats */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
            <HiGift className="text-4xl mb-3" />
            <h2 className="text-2xl font-bold mb-1">₦2,500</h2>
            <p className="text-sm opacity-90 mb-4">Total referral earnings</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs opacity-90">Total Referrals</p>
              </div>
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-xs opacity-90">Active</p>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 shadow-sm">
            <label className="block text-gray-600 text-sm mb-2">
              Your Referral Code
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-lg">
                {referralCode}
              </div>
              <button
                onClick={() =>
                  copyToClipboard(referralCode, "Referral code copied!")
                }
                className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                <HiOutlineClipboardCopy size={20} />
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 shadow-sm">
            <label className="block text-gray-600 text-sm mb-2">
              Referral Link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm truncate">
                {referralLink}
              </div>
              <button
                onClick={() =>
                  copyToClipboard(referralLink, "Referral link copied!")
                }
                className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                <HiOutlineClipboardCopy size={20} />
              </button>
            </div>
          </div>

          {/* Share Options */}
          <h3 className="font-semibold mb-3">Share via</h3>
          <div className="flex gap-3 mb-6">
            <button
              onClick={shareViaWhatsApp}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-sm"
            >
              <FaWhatsapp size={20} />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={shareViaFacebook}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FaFacebook size={20} />
              <span>Facebook</span>
            </button>
            <button
              onClick={shareViaTwitter}
              className="flex-1 bg-blue-400 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-sm"
            >
              <FaTwitter size={20} />
              <span>Twitter</span>
            </button>
          </div>

          {/* Referral List */}
          <h3 className="font-semibold mb-3">Your Referrals</h3>
          <div className="space-y-3">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <HiUser className="text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-gray-500">{referral.date}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      referral.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {referral.status}
                  </span>
                </div>
                {referral.reward > 0 && (
                  <p className="text-sm text-gray-600">
                    Reward:{" "}
                    <span className="font-semibold text-green-600">
                      +₦{referral.reward}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Referral Info */}
          <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">How it works</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Share your referral code with friends</li>
              <li>• They get ₦500 off their first order</li>
              <li>• You get ₦500 when they place their first order</li>
              <li>• No limit on number of referrals</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}