import { IoIosAdd } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineTrash,
} from "react-icons/hi2";
import { FaNairaSign } from "react-icons/fa6";

export function Pizza({ name, ingredients, price, photoName }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const item = cart.find((p) => p.name === name);
  const quantity = item?.quantity || 0;

  const fallbackImage = `https://placehold.co/600x400/4f2b00/white?text=${encodeURIComponent(name)}`;

  const showToast = (type, itemName) => {
    let title = "";
    let message = "";
    let icon = null;

    switch (type) {
      case "add":
        title = "Added to cart";
        message = `${itemName} has been added`;
        icon = <HiOutlineShoppingBag className="text-green-500 text-xl" />;
        break;
      case "remove":
        title = "Removed from cart";
        message = `${itemName} has been removed`;
        icon = <HiOutlineTrash className="text-red-500 text-xl" />;
        break;
      case "max":
        title = "Maximum limit reached";
        message = "You cannot add more than 10 items";
        icon = (
          <HiOutlineExclamationCircle className="text-yellow-500 text-xl" />
        );
        break;
      default:
        break;
    }

    setToast({
      show: true,
      type,
      title,
      message,
      icon,
    });

    setTimeout(() => setToast({ show: false, type: "", message: "" }), 2000);
  };

  function handleAdd() {
    if (quantity < 10) {
      addToCart({ name, ingredients, price, photoName });
      showToast("add", name);
    } else {
      showToast("max", name);
    }
  }

  function handleRemove() {
    if (quantity > 0) {
      removeFromCart(name);
      showToast("remove", name);
    }
  }

  return (
    <>
      {/* Pizza Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white rounded-2xl shadow-lg overflow-hidden relative group cursor-pointer border border-gray-100 hover:border-red-200 transition-all duration-300"
      >
        {/* Image Container with Gradient Overlay */}
        <div className="relative overflow-hidden h-52 md:h-64">
          <motion.img
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            src={imgError ? fallbackImage : photoName}
            alt={name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Popular Tag - You can make this dynamic based on sales */}
          {quantity > 5 && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              🔥 Popular
            </motion.div>
          )}

          {/* Quantity Badge (when item is in cart) */}
          <AnimatePresence>
            {quantity > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-3 left-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg"
              >
                {quantity}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          {/* Name and Price Row */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-rubik">
              {name}
            </h3>
            <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full">
              <FaNairaSign className="text-red-500 text-sm" />
              <span className="text-red-600 font-bold text-lg">{price}</span>
            </div>
          </div>

          {/* Ingredients */}
          <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 font-dmsans">
            {ingredients}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-2">
            {/* Quantity Controls - Animated */}
            <AnimatePresence mode="wait">
              {quantity > 0 ? (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2 bg-gray-100 rounded-xl p-1"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRemove}
                    className="bg-white text-red-500 p-2 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <HiMinusSmall className="text-lg" />
                  </motion.button>

                  <motion.span
                    key={quantity}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="font-bold text-gray-700 w-8 text-center"
                  >
                    {quantity}
                  </motion.span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAdd}
                    disabled={quantity >= 10}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      quantity >= 10
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <IoIosAdd className="text-lg" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <HiOutlineShoppingBag className="text-lg" />
                  <span className="font-medium">Add to Cart</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Price per item (only shown when multiple quantities) */}
            {quantity > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500"
              >
                <span className="font-medium">₦{price}</span> each
              </motion.div>
            )}
          </div>

          {/* Item Total (when multiple) */}
          {quantity > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center"
            >
              <span className="text-sm text-gray-600">Item total:</span>
              <span className="text-red-600 font-bold">
                ₦{price * quantity}
              </span>
            </motion.div>
          )}
        </div>

        {/* Animated Border on Hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600"
        />
      </motion.div>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[99999] pointer-events-none"
          >
            <div className="bg-white border-l-4 border-ph rounded-xl shadow-2xl px-5 py-3 min-w-[320px] max-w-md backdrop-blur-sm bg-opacity-95">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    toast.type === "add"
                      ? "bg-green-100"
                      : toast.type === "remove"
                        ? "bg-red-100"
                        : "bg-yellow-100"
                  }`}
                >
                  {toast.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold text-sm">
                    {toast.title}
                  </p>
                  <p className="text-gray-600 text-xs mt-0.5">
                    {toast.message}
                  </p>
                </div>

                {/* Success Check for Add */}
                {toast.type === "add" && (
                  <HiOutlineCheckCircle className="text-green-500 text-xl" />
                )}
              </div>

              {/* Progress Bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 2, ease: "linear" }}
                className={`h-1 rounded-full mt-2 ${
                  toast.type === "add"
                    ? "bg-green-500"
                    : toast.type === "remove"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
