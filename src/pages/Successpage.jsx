import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck, FiClock } from "react-icons/fi";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineShoppingBag,
  HiOutlineTruck,
} from "react-icons/hi2";
import TopNav from "../components/TopNav";

export default function Successpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatNaira = (n) => `₦${(n ?? 0).toLocaleString("en-NG")}`;

  if (!order) {
    return (
      <main className="min-h-screen bg-canvas flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-card p-8 max-w-sm text-center">
          <div className="text-6xl mb-3">🛒</div>
          <h2 className="text-xl font-bold text-ink mb-2">No order found</h2>
          <p className="text-sm text-ink-soft mb-5">
            We couldn't locate your order details.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-brand text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-deep transition-colors"
          >
            Back home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas">
      <TopNav />
      <div className="max-w-md mx-auto bg-white min-h-screen lg:min-h-0 lg:bg-transparent lg:max-w-2xl lg:px-6 lg:py-10">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-10 pb-8 lg:pt-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4"
          >
            <FiCheck className="text-4xl text-green-600" strokeWidth={3} />
          </motion.div>
          <h1 className="text-2xl lg:text-3xl font-bold text-ink mb-1">
            Thank you, {order.fullName?.split(" ")[0]}!
          </h1>
          <p className="text-sm text-ink-soft max-w-xs mx-auto">
            Your order has been received and is being prepared.
          </p>
        </motion.section>

        {/* Order ID + ETA card */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 lg:mx-0 mb-4 bg-linear-to-br from-brand to-accent text-white rounded-2xl p-5 shadow-card"
        >
          <p className="text-[11px] uppercase tracking-wider text-white/80">
            Order number
          </p>
          <p className="text-2xl font-bold mt-1 font-mono">{order.id}</p>
          <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2 text-sm">
            <FiClock />
            <span>
              {order.delivery === "delivery"
                ? "Arriving in 30–45 mins"
                : "Ready for pickup in 15–20 mins"}
            </span>
          </div>
        </motion.section>

        {/* Customer details */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-4 lg:mx-0 mb-4 bg-white rounded-2xl shadow-card p-5"
        >
          <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
            <HiOutlineUser className="text-brand text-lg" />
            Customer details
          </h3>
          <div className="space-y-2.5 text-sm">
            <Row icon={<HiOutlineUser />} text={order.fullName} />
            <Row icon={<HiOutlinePhone />} text={order.phone} />
            <Row icon={<HiOutlineEnvelope />} text={order.email} />
            {order.delivery === "delivery" ? (
              <Row icon={<HiOutlineMapPin />} text={order.address} />
            ) : (
              <Row icon={<HiOutlineTruck />} text="Pickup from store" />
            )}
          </div>
          {order.note && (
            <p className="mt-3 bg-gray-100 rounded-xl px-3 py-2.5 text-sm text-ink-soft">
              <span className="font-medium text-ink">Note: </span>
              {order.note}
            </p>
          )}
        </motion.section>

        {/* Items */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 lg:mx-0 mb-4 bg-white rounded-2xl shadow-card p-5"
        >
          <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
            <HiOutlineShoppingBag className="text-brand text-lg" />
            Order items
          </h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="relative shrink-0">
                  <img
                    src={item.photoName}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/100x100/fee2e2/ef4444?text=${encodeURIComponent(
                        item.name,
                      )}`;
                    }}
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {formatNaira(item.price)} each
                  </p>
                </div>
                <p className="font-semibold text-ink shrink-0">
                  {formatNaira(item.price * item.quantity)}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-baseline">
            <span className="font-semibold text-ink">Total</span>
            <span className="text-xl font-bold text-ink">
              {formatNaira(order.totalPrice)}
            </span>
          </div>
        </motion.section>

        {/* Actions */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 lg:px-0 pb-12 space-y-3"
        >
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-brand hover:bg-brand-deep text-white h-12 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlineShoppingBag className="text-lg" />
            View my orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-ink h-12 rounded-xl font-semibold transition-colors"
          >
            Continue shopping
          </button>
        </motion.section>
      </div>
    </main>
  );
}

function Row({ icon, text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-3 text-ink-soft">
      <span className="text-gray-400 shrink-0">{icon}</span>
      <span className="text-ink truncate">{text}</span>
    </div>
  );
}
