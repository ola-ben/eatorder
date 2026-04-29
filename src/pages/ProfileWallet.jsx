import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiPlus } from "react-icons/fi";
import {
  HiOutlineGift,
  HiOutlineSparkles,
  HiOutlineCreditCard,
} from "react-icons/hi2";
import toast from "react-hot-toast";

const wallet = {
  balance: 12500,
  points: 2450,
  cashback: 4250,
  tier: "Gold",
  nextTier: "Platinum",
  pointsToNext: 550,
};

export default function ProfileWallet() {
  const [showBalance, setShowBalance] = useState(false);

  const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

  const comingSoon = (label) => () =>
    toast(`${label} — coming soon`, { icon: "🚧" });

  const progressPercent =
    (wallet.points / (wallet.points + wallet.pointsToNext)) * 100;

  return (
    <div className="px-4 lg:px-0 pt-2 pb-8 space-y-4">
      {/* Balance card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-linear-to-br from-brand to-accent text-white rounded-2xl p-5 shadow-card"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/80">
              Wallet balance
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <h2 className="text-3xl font-bold">
                {showBalance ? formatNaira(wallet.balance) : "₦••••••"}
              </h2>
              <button
                onClick={() => setShowBalance((s) => !s)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Toggle balance visibility"
              >
                {showBalance ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-1 rounded-full">
            {wallet.tier} tier
          </span>
        </div>

        <div className="mt-5 pt-5 border-t border-white/20">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="opacity-80">Loyalty points</span>
            <span className="font-semibold">{wallet.points} pts</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-[11px] text-white/80 mt-1.5">
            {wallet.pointsToNext} points to {wallet.nextTier}
          </p>
        </div>

        <div className="absolute -right-8 -bottom-8 text-[140px] leading-none opacity-10 select-none">
          💳
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={comingSoon("Fund wallet")}
          className="bg-white rounded-2xl p-4 shadow-card text-left hover:shadow-pop transition-shadow"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand flex items-center justify-center mb-2">
            <FiPlus />
          </div>
          <p className="font-semibold text-ink text-sm">Fund wallet</p>
          <p className="text-xs text-ink-soft mt-0.5">Add money</p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={comingSoon("Redeem points")}
          className="bg-white rounded-2xl p-4 shadow-card text-left hover:shadow-pop transition-shadow"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
            <HiOutlineGift />
          </div>
          <p className="font-semibold text-ink text-sm">Redeem points</p>
          <p className="text-xs text-ink-soft mt-0.5">Spend rewards</p>
        </motion.button>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl shadow-card p-5"
      >
        <h3 className="text-xs uppercase tracking-wider text-ink-soft mb-3">
          Rewards summary
        </h3>
        <div className="space-y-3">
          <Row
            Icon={HiOutlineSparkles}
            label="Loyalty points"
            value={`${wallet.points} pts`}
            tint="text-amber-600 bg-amber-50"
          />
          <Row
            Icon={HiOutlineGift}
            label="Cashback earned"
            value={formatNaira(wallet.cashback)}
            tint="text-green-600 bg-green-50"
          />
          <Row
            Icon={HiOutlineCreditCard}
            label="Wallet balance"
            value={formatNaira(wallet.balance)}
            tint="text-brand bg-brand-soft"
          />
        </div>
      </motion.div>

      <p className="text-center text-[11px] text-ink-soft">
        Loyalty + cashback features are coming soon.
      </p>
    </div>
  );
}

function Row({ Icon, label, value, tint }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tint}`}>
          <Icon className="text-lg" />
        </div>
        <span className="text-sm text-ink">{label}</span>
      </div>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
