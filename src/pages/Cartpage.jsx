import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Cartpage() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = subtotal > 7000 || subtotal === 0 ? 0 : 1500;
  const total = subtotal + deliveryFee;

  const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

  const handleRemove = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.name);
      toast(`${item.name} removed`, { icon: "🗑️" });
    } else {
      removeFromCart(item.name);
    }
  };

  const handleClear = () => {
    if (cart.length === 0) return;
    clearCart();
    toast("Cart cleared", { icon: "🧹" });
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      navigate("/checkoutpage", { state: { cart, totalPrice: subtotal } });
    }, 600);
  };

  return (
    <main className="min-h-screen bg-canvas">
      <div className="max-w-md mx-auto bg-white min-h-screen relative pb-32">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-ink flex-1">Your cart</h1>
            {cart.length > 0 && (
              <button
                onClick={handleClear}
                className="text-sm font-semibold text-brand flex items-center gap-1"
              >
                <FiTrash2 className="text-base" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center px-6 py-20">
            <div className="text-7xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-ink mb-1">
              Your cart is empty
            </h3>
            <p className="text-ink-soft text-sm mb-6 max-w-xs">
              Add some delicious meals from your favourite restaurants to get
              started.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-brand text-white px-6 py-3 rounded-full font-semibold shadow-card"
            >
              Start ordering
            </button>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="px-4 pt-4 pb-2 space-y-3">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.article
                    key={item.name}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 p-3 bg-white rounded-2xl shadow-card"
                  >
                    <img
                      src={item.photoName}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/200x200/fee2e2/ef4444?text=${encodeURIComponent(
                          item.name,
                        )}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[12px] text-ink-soft mt-0.5">
                        {formatNaira(item.price)} each
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                          <button
                            onClick={() => handleRemove(item)}
                            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-ink shadow-sm"
                          >
                            <FiMinus />
                          </button>
                          <span className="min-w-[20px] text-center text-sm font-semibold text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white shadow-sm"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <p className="font-bold text-ink">
                          {formatNaira(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="px-4 pt-4">
              <div className="bg-canvas rounded-2xl p-4 border border-gray-100">
                <h3 className="font-semibold text-ink mb-3">Order summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-ink-soft">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-ink">{formatNaira(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink-soft">
                    <span>Delivery fee</span>
                    <span
                      className={
                        deliveryFee === 0 ? "text-green-600 font-medium" : ""
                      }
                    >
                      {deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between items-baseline">
                    <span className="font-bold text-ink">Total</span>
                    <span className="text-xl font-bold text-ink">
                      {formatNaira(total)}
                    </span>
                  </div>
                </div>
                {subtotal > 0 && subtotal < 7000 && (
                  <p className="mt-3 text-[12px] text-ink-soft bg-accent-soft text-accent rounded-lg px-3 py-2">
                    Add {formatNaira(7000 - subtotal)} more for free delivery 🎉
                  </p>
                )}
              </div>
            </div>

            {/* Sticky Checkout */}
            <div className="fixed bottom-4 inset-x-0 z-30 px-4">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="max-w-md mx-auto w-full bg-brand text-white rounded-2xl shadow-pop h-14 flex items-center justify-between px-5 disabled:opacity-70"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <span className="bg-white/20 w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    {totalItems}
                  </span>
                  {isCheckingOut ? "Processing…" : "Checkout"}
                </span>
                <span className="font-bold">{formatNaira(total)}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
