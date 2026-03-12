import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiEye, HiEyeOff, HiCash, HiGift, HiPlus } from "react-icons/hi";
import { HiShoppingBag } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function ProfileWallet() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);

  const loyaltyData = {
    points: 2450,
    cashback: 12500,
    tier: "Gold",
    nextTier: "Platinum",
    pointsToNext: 550,
  };

  const formatNaira = (amount) => {
    return `₦${amount.toLocaleString("en-NG")}`;
  };

  const handleFundWallet = () => {
    toast.success("🚧 Fund Wallet feature is coming soon!", {
      icon: "🏗️",
      duration: 3000,
      style: {
        background: "#FEF3C7",
        color: "#92400E",
        border: "1px solid #F59E0B",
      },
    });
  };

  const handleRedeem = () => {
    toast.success("🚧 Redeem feature is coming soon!", {
      icon: "🏗️",
      duration: 3000,
      style: {
        background: "#FEF3C7",
        color: "#92400E",
        border: "1px solid #F59E0B",
      },
    });
  };

  return (
    <div className="p-4 pb-8">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm opacity-90">Wallet Balance</p>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold">
                {showBalance ? formatNaira(loyaltyData.cashback) : "₦••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                {showBalance ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-sm border border-white/30">
            {loyaltyData.tier} Tier
          </div>
        </div>

        {/* Points Progress */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Loyalty Points</span>
            <span className="font-semibold">{loyaltyData.points} pts</span>
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
            {loyaltyData.pointsToNext} points to reach {loyaltyData.nextTier}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={handleFundWallet}
          className="bg-red-50 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
        >
          <HiCash className="text-red-500 text-2xl" />
          <span className="text-sm font-medium text-gray-700">Fund Wallet</span>
        </button>
        <button
          onClick={handleRedeem}
          className="bg-red-50 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
        >
          <HiGift className="text-red-500 text-2xl" />
          <span className="text-sm font-medium text-gray-700">Redeem</span>
        </button>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
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

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
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
  );
}
