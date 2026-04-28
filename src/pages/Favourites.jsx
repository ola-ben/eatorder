import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiArrowLeft, FiClock, FiTrash2 } from "react-icons/fi";
import { TbMotorbike } from "react-icons/tb";
import toast from "react-hot-toast";
import { useFavorites } from "../context/FavoritesContext";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";
import FavoriteHeart from "../components/FavoriteHeart";

const fallbackImage =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop";
const placeholders = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552566624-52f8b3ae5fd5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Favourites() {
  const navigate = useNavigate();
  const { favorites, clearFavorites, count } = useFavorites();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClear = () => {
    if (count === 0) return;
    clearFavorites();
    toast("All favourites cleared", { icon: "🧹" });
  };

  return (
    <main className="min-h-screen bg-canvas pb-safe-nav lg:pb-12">
      <TopNav />
      <div className="max-w-md mx-auto bg-white min-h-screen lg:min-h-0 lg:bg-transparent lg:max-w-7xl lg:px-6 lg:py-8">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-ink flex-1">My favourites</h1>
            {count > 0 && (
              <button
                onClick={handleClear}
                className="text-sm font-semibold text-brand flex items-center gap-1"
              >
                <FiTrash2 className="text-base" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden lg:flex items-end justify-between mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-ink">My favourites</h1>
            <p className="text-sm text-ink-soft mt-1">
              {count === 0
                ? "Tap the heart on any restaurant to save it here"
                : `${count} ${count === 1 ? "restaurant" : "restaurants"} saved`}
            </p>
          </div>
          {count > 0 && (
            <button
              onClick={handleClear}
              className="text-sm font-semibold text-brand flex items-center gap-1 hover:underline"
            >
              <FiTrash2 className="text-base" /> Clear all
            </button>
          )}
        </motion.div>

        {/* List / empty state */}
        {count === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center text-center px-6 py-20 lg:py-28"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              💔
            </motion.div>
            <h3 className="text-xl lg:text-2xl font-bold text-ink mb-1">
              No favourites yet
            </h3>
            <p className="text-ink-soft text-sm mb-6 max-w-xs">
              Tap the heart on any restaurant to save it here for later.
            </p>
            <button
              onClick={() => navigate("/restaurants")}
              className="bg-brand text-white px-6 py-3 rounded-full font-semibold shadow-card hover:bg-brand-deep transition-colors"
            >
              Browse restaurants
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 lg:px-0 pt-4 pb-8 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-5"
          >
            <AnimatePresence>
              {favorites.map((r) => (
                <FavoriteCard
                  key={r.id}
                  restaurant={r}
                  onClick={() => navigate(`/restaurant/${r.id}`)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <BottomNav />
    </main>
  );
}

function FavoriteCard({ restaurant, onClick }) {
  const img =
    restaurant.imageIndex !== undefined
      ? placeholders[restaurant.imageIndex % placeholders.length]
      : restaurant.image || fallbackImage;
  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer w-full text-left bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-pop transition-shadow relative"
    >
      <div className="relative h-40 lg:h-44 w-full overflow-hidden">
        <img
          src={img}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {restaurant.promo && (
          <div className="absolute top-3 left-3 bg-white text-[11px] font-semibold text-brand px-2 py-1 rounded-full shadow-sm">
            {restaurant.promo}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <FavoriteHeart restaurant={restaurant} />
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-ink text-base line-clamp-1">
            {restaurant.name}
          </h3>
          {restaurant.rating && (
            <div className="flex items-center gap-1 bg-ink/5 px-2 py-0.5 rounded-full text-xs">
              <FaStar className="text-yellow-500 text-[11px]" />
              <span className="font-semibold text-ink">{restaurant.rating}</span>
            </div>
          )}
        </div>
        {restaurant.cuisine && (
          <p className="text-[13px] text-ink-soft line-clamp-1 mt-0.5">
            {restaurant.cuisine}
          </p>
        )}
        <div className="mt-2 flex items-center gap-3 text-[12px] text-ink-soft">
          {restaurant.deliveryTime && (
            <span className="flex items-center gap-1">
              <FiClock className="text-gray-400" /> {restaurant.deliveryTime} min
            </span>
          )}
          {restaurant.deliveryFee && (
            <span className="flex items-center gap-1">
              <TbMotorbike className="text-gray-400" /> ₦{restaurant.deliveryFee}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
