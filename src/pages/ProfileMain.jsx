import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineGift,
  HiOutlineMapPin,
  HiOutlineQuestionMarkCircle,
  HiOutlineTrash,
  HiOutlineArrowRightOnRectangle,
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function ProfileMain() {
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();
  const { cart } = useCart();
  const { count: favCount } = useFavorites();

  const fullName = user?.user_metadata?.full_name || "Guest user";
  const email = user?.email || "—";
  const tribeId = user?.id?.slice(0, 8).toUpperCase() || "NG12345";
  const orderCount = (
    JSON.parse(localStorage.getItem("orders")) || []
  ).length;
  const totalCartItems = cart.reduce((s, i) => s + i.quantity, 0);

  const logout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "Could not log out");
      return;
    }
    toast.success("Logged out");
    navigate("/");
  };

  const deleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure? This signs you out and clears local data. Account deletion requires support.",
      )
    ) return;
    await signOut();
    localStorage.removeItem("orders");
    localStorage.removeItem("addresses");
    localStorage.removeItem("favorites");
    toast.success("Signed out and local data cleared");
    navigate("/");
  };

  const menu = [
    {
      label: "Profile details",
      Icon: HiOutlineUser,
      action: () => navigate("/profile/details"),
    },
    {
      label: "Login & security",
      Icon: HiOutlineLockClosed,
      action: () => navigate("/profile/login-details"),
    },
    {
      label: "Addresses",
      Icon: HiOutlineMapPin,
      action: () => navigate("/profile/addresses"),
    },
    {
      label: "Referrals",
      Icon: HiOutlineGift,
      action: () => navigate("/profile/referrals"),
    },
    {
      label: "FAQs",
      Icon: HiOutlineQuestionMarkCircle,
      action: () => navigate("/profile/faqs"),
    },
  ];

  return (
    <div className="pb-8">
      {/* Avatar header */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-brand to-accent text-white flex items-center justify-center text-2xl font-bold shadow-card shrink-0">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-ink truncate">{fullName}</h2>
            <p className="text-sm text-ink-soft truncate">{email}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono bg-brand-soft text-brand px-2 py-0.5 rounded-full">
                {tribeId}
              </span>
              <span className="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                <FaStar className="text-yellow-500 text-[9px]" /> 4.9
              </span>
              {isAdmin && (
                <span className="text-[10px] font-semibold bg-ink text-white px-2 py-0.5 rounded-full">
                  ADMIN
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick stats */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="px-4 mb-6"
      >
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            Icon={HiOutlineShoppingBag}
            label="Orders"
            value={orderCount}
            onClick={() => navigate("/orders")}
          />
          <StatCard
            Icon={HiOutlineHeart}
            label="Saved"
            value={favCount}
            onClick={() => navigate("/favourites")}
          />
          <StatCard
            Icon={HiOutlineGift}
            label="In cart"
            value={totalCartItems}
            onClick={() => navigate("/cartpage")}
          />
        </div>
      </motion.section>

      {/* Admin entry (if applicable) */}
      {isAdmin && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 mb-4"
        >
          <button
            onClick={() => navigate("/admin")}
            className="w-full bg-linear-to-r from-brand to-accent text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-card hover:opacity-95 transition-opacity"
          >
            <div className="text-left">
              <p className="font-semibold">Admin panel</p>
              <p className="text-xs text-white/80">
                Manage orders, restaurants, users
              </p>
            </div>
            <HiOutlineChevronRight className="text-xl" />
          </button>
        </motion.section>
      )}

      {/* Menu list */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-4 mb-4"
      >
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {menu.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
                i < menu.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3 text-ink">
                <item.Icon className="text-xl text-ink-soft" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <HiOutlineChevronRight className="text-gray-400" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* Danger zone */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 mb-4"
      >
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <button
            onClick={deleteAccount}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-gray-50 border-b border-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3 text-ink">
              <HiOutlineTrash className="text-xl text-ink-soft" />
              <span className="text-sm font-medium">Delete account</span>
            </div>
            <HiOutlineChevronRight className="text-gray-400" />
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-brand-soft transition-colors"
          >
            <div className="flex items-center gap-3 text-brand">
              <HiOutlineArrowRightOnRectangle className="text-xl" />
              <span className="text-sm font-semibold">Log out</span>
            </div>
          </button>
        </div>
      </motion.section>

      <p className="text-center text-[11px] text-ink-soft">EatOrder v0.1.0</p>
    </div>
  );
}

function StatCard({ Icon, label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-card p-4 text-left hover:shadow-pop transition-shadow"
    >
      <Icon className="text-xl text-brand" />
      <p className="text-[11px] text-ink-soft uppercase tracking-wider mt-2">
        {label}
      </p>
      <p className="text-lg font-bold text-ink leading-none mt-1">{value}</p>
    </button>
  );
}
