import { IoIosAdd } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function Pizza({ name, ingredients, price, photoName }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const [modalMessage, setModalMessage] = useState("");
  const [modalMessage2, setModalMessage2] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const item = cart.find((p) => p.name === name);
  const quantity = item?.quantity || 0;

  const fallbackImage = `https://placehold.co/600x400/4f2b00/white?text=${encodeURIComponent(name)}`;

  const showCustomModal = (message, itemMessage) => {
    setModalMessage(message);
    setModalMessage2(itemMessage);
    setShowModal(true);

    setTimeout(() => setShowModal(false), 2000);
  };

  function handleAdd() {
    if (quantity < 10) {
      addToCart({ name, ingredients, price, photoName });
      showCustomModal("Added to cart", `${name} has been added to your cart`);
    } else {
      showCustomModal(
        "Maximum limit reached",
        "You cannot add more than 10 items",
      );
    }
  }

  function handleRemove() {
    if (quantity > 0) {
      removeFromCart(name);
      showCustomModal(
        "Removed from cart",
        `${name} has been removed from your cart`,
      );
    }
  }

  return (
    <div className="shadow-sm rounded-b-[10px] mx-0.5 overflow-hidden lg:mx-2 relative">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden rounded-t-[15px] bg-gray-100">
        <img
          src={imgError ? fallbackImage : photoName}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-2">
        <p className="text-xl my-1.5 font-rubik text-[#1a0e00] md:text-2xl">
          {name}
        </p>

        <p className="leading-[1.5] mb-4 text-[14px] font-dmsans text-[#564d42] md:text-[16px] lg:text-[14px]">
          {ingredients}
        </p>

        <span className="flex items-center justify-between mb-2">
          <p className="text-ph text-xl font-rubik md:text-2xl">₦{price}.00</p>

          <div className="flex items-center">
            {quantity > 0 && (
              <>
                <button
                  onClick={handleRemove}
                  className="bg-red-500 p-2.5 text-white text-xl md:text-2xl rounded-xl hover:bg-red-600 duration-300"
                >
                  <HiMinusSmall />
                </button>

                <span className="mx-6 font-semibold">{quantity}</span>
              </>
            )}

            <button
              onClick={handleAdd}
              className={`${
                quantity >= 1
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-ph hover:bg-opacity-80"
              } p-2.5 rounded-xl text-xl md:text-2xl text-white duration-300`}
            >
              <IoIosAdd />
            </button>
          </div>
        </span>
      </div>

      {/* Animated Toast - Positioned at very top */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] pointer-events-none"
          >
            <div className="bg-white border-l-4 border-ph rounded-lg shadow-2xl px-6 py-3 min-w-[300px] max-w-md">
              <div className="flex items-center gap-3">
                <div
                  className={`text-2xl ${modalMessage.includes("Added") ? "text-green-500" : modalMessage.includes("Removed") ? "text-red-500" : "text-yellow-500"}`}
                >
                  {modalMessage.includes("Added")
                    ? "🛒"
                    : modalMessage.includes("Removed")
                      ? "🗑️"
                      : "⚠️"}
                </div>
                <div className="flex-1">
                  <p className="text-[#523410] font-rubik text-[14.5px] font-semibold">
                    {modalMessage}
                  </p>
                  <p className="text-[#523410] text-[13px] mt-0.5 opacity-80">
                    {modalMessage2}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-1 bg-ph rounded-full mt-2"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
