import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export function Pizza({ name, ingredients, price, photoName }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const item = cart.find((p) => p.name === name);
  const quantity = item?.quantity || 0;

  const fallback = `https://placehold.co/300x300/fee2e2/ef4444?text=${encodeURIComponent(
    name,
  )}`;

  const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

  function handleAdd() {
    if (quantity < 10) {
      addToCart({ name, ingredients, price, photoName });
    } else {
      toast("Max 10 of this item", { icon: "⚠️" });
    }
  }

  function handleRemove() {
    if (quantity > 0) removeFromCart(name);
  }

  return (
    <article className="flex gap-3 p-3 bg-white rounded-2xl shadow-card">
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-ink line-clamp-1">
          {name}
        </h3>
        <p className="text-[13px] text-ink-soft mt-1 line-clamp-2 leading-snug">
          {ingredients}
        </p>
        <p className="mt-2 text-base font-bold text-ink">
          {formatNaira(price)}
        </p>
      </div>

      <div className="relative shrink-0">
        <img
          src={imgError ? fallback : photoName}
          alt={name}
          onError={() => setImgError(true)}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
        />

        {/* Quantity / add overlay */}
        <div className="absolute -bottom-2 -right-2">
          <AnimatePresence mode="wait" initial={false}>
            {quantity > 0 ? (
              <motion.div
                key="stepper"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1 bg-white rounded-full shadow-pop px-1 py-1 border border-gray-100"
              >
                <button
                  onClick={handleRemove}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-ink"
                  aria-label="Remove one"
                >
                  <HiMinus className="text-sm" />
                </button>
                <span className="min-w-[18px] text-center text-sm font-semibold text-ink">
                  {quantity}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-7 h-7 rounded-full bg-brand hover:bg-brand-deep flex items-center justify-center text-white"
                  aria-label="Add one"
                >
                  <HiPlus className="text-sm" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleAdd}
                className="w-9 h-9 rounded-full bg-white shadow-pop border border-gray-100 flex items-center justify-center text-brand"
                aria-label={`Add ${name}`}
              >
                <HiPlus className="text-lg" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
