import { motion, AnimatePresence } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoriteHeart({
  restaurant,
  className = "",
  size = "md",
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(restaurant.id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(restaurant);
    toast(
      active ? `Removed ${restaurant.name}` : `Saved ${restaurant.name}`,
      {
        icon: active ? "💔" : "❤️",
        id: `fav-${restaurant.id}`,
      },
    );
  };

  const sizeClasses = {
    sm: "w-7 h-7 text-base",
    md: "w-8 h-8 text-base",
    lg: "w-10 h-10 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      onClick={handleClick}
      aria-label={active ? "Remove from favourites" : "Save to favourites"}
      aria-pressed={active}
      className={`relative ${sizeClasses[size]} rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-card ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {active ? (
          <motion.span
            key="filled"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 30 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="text-brand"
          >
            <FaHeart />
          </motion.span>
        ) : (
          <motion.span
            key="empty"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.15 }}
            className="text-ink-soft"
          >
            <FiHeart />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Pop ring on activation */}
      <AnimatePresence>
        {active && (
          <motion.span
            key="ring"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-brand/30 -z-10"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
