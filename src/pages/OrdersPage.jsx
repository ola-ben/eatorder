import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiClock,
  FiChevronDown,
  FiStar,
  FiRefreshCw,
} from "react-icons/fi";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineTruck,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";

const STATUS_FILTERS = ["all", "processing", "delivered", "pending"];

const statusStyle = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: "⏳" },
  Processing: { bg: "bg-blue-50", text: "text-blue-700", icon: "⚙️" },
  Delivered: { bg: "bg-green-50", text: "text-green-700", icon: "✅" },
  Cancelled: { bg: "bg-gray-100", text: "text-gray-600", icon: "❌" },
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { loggedIn, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!authLoading && !loggedIn) {
      toast.error("Please login to view your orders");
      navigate("/logiformpage");
      return;
    }
    const t = setTimeout(() => {
      const saved = JSON.parse(localStorage.getItem("orders")) || [];
      saved.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(saved);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, [authLoading, loggedIn, navigate]);

  const formatNaira = (n) => `₦${(n ?? 0).toLocaleString("en-NG")}`;

  const filtered = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter(
      (o) => o.status?.toLowerCase() === filter.toLowerCase(),
    );
  }, [orders, filter]);

  const stats = useMemo(
    () => ({
      total: orders.length,
      delivered: orders.filter((o) => o.status === "Delivered").length,
      active: orders.filter((o) => o.status === "Processing").length,
    }),
    [orders],
  );

  const toggle = (id) => setExpandedId((cur) => (cur === id ? null : id));

  const handleReorder = (order, e) => {
    e.stopPropagation();
    if (!order?.items?.length) {
      toast.error("This order has no items to reorder");
      return;
    }
    let total = 0;
    order.items.forEach((item) => {
      const qty = item.quantity || 1;
      for (let i = 0; i < qty; i++) {
        addToCart({
          name: item.name,
          price: item.price,
          photoName: item.photoName,
          ingredients: item.ingredients || "",
        });
        total++;
      }
    });
    toast.success(`${total} item${total === 1 ? "" : "s"} added to cart 🛒`);
    setTimeout(() => navigate("/cartpage"), 600);
  };

  const handleRate = (e) => {
    e.stopPropagation();
    toast("Rating feature coming soon ⭐", { icon: "✨" });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-canvas flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-brand border-t-transparent rounded-full"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-canvas pb-safe-nav lg:pb-12">
      <TopNav />
      <div className="max-w-md mx-auto bg-white min-h-screen lg:min-h-0 lg:bg-transparent lg:max-w-4xl lg:px-6 lg:py-8">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-ink">My orders</h1>
          </div>
        </div>

        {/* Desktop heading */}
        <div className="hidden lg:block mb-6">
          <h1 className="text-3xl font-bold text-ink">My orders</h1>
          <p className="text-sm text-ink-soft mt-1">
            {orders.length === 0
              ? "No orders yet"
              : `${orders.length} order${orders.length === 1 ? "" : "s"} placed`}
          </p>
        </div>

        {orders.length === 0 ? (
          <EmptyState onClick={() => navigate("/")} />
        ) : (
          <>
            {/* Stats */}
            <div className="px-4 lg:px-0 pt-4 lg:pt-0 pb-2">
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Total" value={stats.total} />
                <StatCard label="Delivered" value={stats.delivered} />
                <StatCard label="Active" value={stats.active} />
              </div>
            </div>

            {/* Filters */}
            <div className="px-4 lg:px-0 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-4 h-9 rounded-full text-sm font-medium whitespace-nowrap border capitalize transition-colors ${
                    filter === s
                      ? "bg-brand text-white border-brand shadow-card"
                      : "bg-white text-ink border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Orders list */}
            <div className="px-4 lg:px-0 pt-3 pb-8 space-y-3">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-card p-8 text-center">
                  <p className="text-ink-soft text-sm mb-3">
                    No {filter} orders yet
                  </p>
                  <button
                    onClick={() => setFilter("all")}
                    className="text-brand text-sm font-semibold hover:underline"
                  >
                    View all orders
                  </button>
                </div>
              ) : (
                filtered.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    expanded={expandedId === order.id}
                    onToggle={() => toggle(order.id)}
                    onReorder={(e) => handleReorder(order, e)}
                    onRate={handleRate}
                    formatNaira={formatNaira}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-3 text-center">
      <p className="text-xl font-bold text-ink">{value}</p>
      <p className="text-[11px] text-ink-soft uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

function EmptyState({ onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center px-6 py-20"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl mb-4"
      >
        🛍️
      </motion.div>
      <h3 className="text-xl font-bold text-ink mb-1">No orders yet</h3>
      <p className="text-sm text-ink-soft mb-6 max-w-xs">
        When you place your first order, it'll show up here.
      </p>
      <button
        onClick={onClick}
        className="bg-brand hover:bg-brand-deep text-white px-6 py-3 rounded-full font-semibold shadow-card transition-colors"
      >
        Start ordering
      </button>
    </motion.div>
  );
}

function OrderCard({ order, expanded, onToggle, onReorder, onRate, formatNaira }) {
  const status = statusStyle[order.status] || statusStyle.Pending;

  return (
    <motion.article
      layout
      className="bg-white rounded-2xl shadow-card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-ink-soft">{order.id}</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-ink-soft">
              <FiClock className="text-gray-400" />
              {order.date}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
            >
              {status.icon} {order.status}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              className="text-gray-400"
            >
              <FiChevronDown />
            </motion.span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {order.items?.slice(0, 4).map((item, i) => (
              <img
                key={i}
                src={item.photoName}
                alt=""
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm -ml-2 first:ml-0"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/40x40/fee2e2/ef4444?text=•";
                }}
              />
            ))}
            {order.items?.length > 4 && (
              <span className="text-xs text-ink-soft -ml-1">
                +{order.items.length - 4}
              </span>
            )}
          </div>
          <p className="font-bold text-ink">{formatNaira(order.totalPrice)}</p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-gray-100 bg-gray-50 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Customer block */}
              <div className="bg-white rounded-xl p-4">
                <h4 className="text-xs uppercase tracking-wider text-ink-soft mb-3">
                  Delivery info
                </h4>
                <div className="space-y-2 text-sm">
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
                  <p className="mt-3 bg-gray-100 rounded-lg px-3 py-2 text-sm text-ink-soft">
                    <span className="font-medium text-ink">Note: </span>
                    {order.note}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="bg-white rounded-xl p-4">
                <h4 className="text-xs uppercase tracking-wider text-ink-soft mb-3">
                  Items
                </h4>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={item.photoName}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/100x100/fee2e2/ef4444?text=${encodeURIComponent(
                              item.name,
                            )}`;
                          }}
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-brand text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ink line-clamp-1 text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-ink-soft">
                          {formatNaira(item.price)} each
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-ink shrink-0">
                        {formatNaira(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-ink">Total</span>
                  <span className="text-lg font-bold text-ink">
                    {formatNaira(order.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onReorder}
                  className="h-11 bg-brand hover:bg-brand-deep text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <FiRefreshCw className="text-base" />
                  Reorder
                </button>
                <button
                  onClick={onRate}
                  className="h-11 bg-white border border-gray-200 hover:border-gray-300 text-ink rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <FiStar className="text-base" />
                  Rate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Row({ icon, text }) {
  if (!text) return null;
  return (
    <div className="flex items-center gap-2.5 text-ink-soft">
      <span className="text-gray-400 shrink-0">{icon}</span>
      <span className="text-ink truncate">{text}</span>
    </div>
  );
}
