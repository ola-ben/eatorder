import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiArrowRight } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const statusStyle = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: "⏳" },
  Processing: { bg: "bg-blue-50", text: "text-blue-700", icon: "⚙️" },
  Delivered: { bg: "bg-green-50", text: "text-green-700", icon: "✅" },
  Cancelled: { bg: "bg-gray-100", text: "text-gray-600", icon: "❌" },
};

export default function ProfileOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    saved.sort((a, b) => new Date(b.date) - new Date(a.date));
    setOrders(saved.slice(0, 3));
  }, []);

  const formatNaira = (n) => `₦${(n ?? 0).toLocaleString("en-NG")}`;

  if (orders.length === 0) {
    return (
      <div className="px-4 pt-8 pb-12 text-center">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-6xl mb-3"
        >
          🛍️
        </motion.div>
        <h3 className="font-bold text-ink mb-1">No orders yet</h3>
        <p className="text-sm text-ink-soft mb-5 max-w-xs mx-auto">
          Place your first order and it'll show up here.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-brand hover:bg-brand-deep text-white px-6 py-2.5 rounded-full font-semibold transition-colors"
        >
          Start ordering
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-0 pt-2 pb-8">
      <div className="flex items-end justify-between mb-3">
        <h3 className="font-bold text-ink">Recent orders</h3>
        <button
          onClick={() => navigate("/orders")}
          className="text-sm font-semibold text-brand flex items-center gap-1 hover:underline"
        >
          View all <FiArrowRight />
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order, i) => {
          const status = statusStyle[order.status] || statusStyle.Pending;
          return (
            <motion.button
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate("/orders")}
              className="w-full text-left bg-white rounded-2xl shadow-card p-4 hover:shadow-pop transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-ink-soft">
                    {order.id}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-soft">
                    <FiClock className="text-gray-400" />
                    {order.date}
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
                >
                  {status.icon} {order.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <HiOutlineShoppingBag className="text-base" />
                  <span>
                    {order.items?.length || 0} item
                    {(order.items?.length || 0) === 1 ? "" : "s"}
                  </span>
                </div>
                <p className="font-bold text-ink">
                  {formatNaira(order.totalPrice)}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
