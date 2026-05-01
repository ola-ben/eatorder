import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUsers,
  FiX,
  FiPhone,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { listMyReservations, cancelMyReservation } from "../lib/reservationsApi";
import BottomNav from "../components/BottomNav";
import TopNav from "../components/TopNav";

const STATUS_FILTERS = ["all", "pending", "confirmed", "completed", "cancelled"];

const statusStyle = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: "⏳" },
  Confirmed: { bg: "bg-green-50", text: "text-green-700", icon: "✅" },
  Cancelled: { bg: "bg-gray-100", text: "text-gray-600", icon: "❌" },
  Completed: { bg: "bg-blue-50", text: "text-blue-700", icon: "🍽️" },
};

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(t) {
  if (!t) return "";
  return t.slice(0, 5);
}

export default function Bookings() {
  const navigate = useNavigate();
  const { loggedIn, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!loggedIn) {
      toast.error("Please login to view your bookings");
      navigate("/logiformpage");
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error } = await listMyReservations();
      if (cancelled) return;
      if (error) {
        toast.error(error.message || "Couldn't load your bookings");
        setBookings([]);
      } else {
        setBookings(data ?? []);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [authLoading, loggedIn, navigate]);

  const filtered = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter(
      (b) => b.status?.toLowerCase() === filter.toLowerCase(),
    );
  }, [bookings, filter]);

  const stats = useMemo(
    () => ({
      total: bookings.length,
      upcoming: bookings.filter(
        (b) =>
          (b.status === "Pending" || b.status === "Confirmed") &&
          new Date(b.reservedDate) >= new Date(new Date().setHours(0, 0, 0, 0)),
      ).length,
      past: bookings.filter((b) => b.status === "Completed").length,
    }),
    [bookings],
  );

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    const { data, error } = await cancelMyReservation(id);
    if (error) {
      toast.error(error.message || "Could not cancel");
      return;
    }
    setBookings((prev) => prev.map((b) => (b.id === id ? data : b)));
    toast.success("Booking cancelled");
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
            <h1 className="text-lg font-bold text-ink">My bookings</h1>
          </div>
        </div>

        {/* Desktop heading */}
        <div className="hidden lg:block mb-6">
          <h1 className="text-3xl font-bold text-ink">My bookings</h1>
          <p className="text-sm text-ink-soft mt-1">
            {bookings.length === 0
              ? "No bookings yet"
              : `${bookings.length} booking${bookings.length === 1 ? "" : "s"} placed`}
          </p>
        </div>

        {bookings.length === 0 ? (
          <EmptyState onClick={() => navigate("/restaurants")} />
        ) : (
          <>
            {/* Stats */}
            <div className="px-4 lg:px-0 pt-4 lg:pt-0 pb-2">
              <div className="grid grid-cols-3 gap-3">
                <StatCard label="Total" value={stats.total} />
                <StatCard label="Upcoming" value={stats.upcoming} />
                <StatCard label="Past" value={stats.past} />
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

            {/* List */}
            <div className="px-4 lg:px-0 pt-3 pb-8 space-y-3">
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-card p-8 text-center"
                  >
                    <p className="text-ink-soft text-sm mb-3">
                      No {filter} bookings
                    </p>
                    <button
                      onClick={() => setFilter("all")}
                      className="text-brand text-sm font-semibold hover:underline"
                    >
                      View all bookings
                    </button>
                  </motion.div>
                ) : (
                  filtered.map((b, i) => (
                    <BookingCard
                      key={b.id}
                      booking={b}
                      index={i}
                      onCancel={() => handleCancel(b.id)}
                      onOpenRestaurant={() =>
                        navigate(`/restaurant/${b.restaurantId}`)
                      }
                    />
                  ))
                )}
              </AnimatePresence>
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
        📅
      </motion.div>
      <h3 className="text-xl font-bold text-ink mb-1">No bookings yet</h3>
      <p className="text-sm text-ink-soft mb-6 max-w-xs">
        Book a table at any restaurant and it'll show up here.
      </p>
      <button
        onClick={onClick}
        className="bg-brand hover:bg-brand-deep text-white px-6 py-3 rounded-full font-semibold shadow-card transition-colors"
      >
        Browse restaurants
      </button>
    </motion.div>
  );
}

function BookingCard({ booking, index, onCancel, onOpenRestaurant }) {
  const status = statusStyle[booking.status] || statusStyle.Pending;
  const canCancel =
    booking.status === "Pending" || booking.status === "Confirmed";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="bg-white rounded-2xl shadow-card p-4"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <button
          onClick={onOpenRestaurant}
          className="text-left min-w-0"
        >
          <p className="font-semibold text-ink line-clamp-1 hover:text-brand transition-colors">
            {booking.restaurantName}
          </p>
          <p className="font-mono text-[11px] text-ink-soft mt-0.5">
            {booking.id}
          </p>
        </button>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text} shrink-0`}
        >
          {status.icon} {booking.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-soft">
        <span className="flex items-center gap-1.5">
          <FiCalendar className="text-gray-400" />
          {formatDate(booking.reservedDate)}
        </span>
        <span className="flex items-center gap-1.5">
          <FiClock className="text-gray-400" />
          {formatTime(booking.reservedTime)}
        </span>
        <span className="flex items-center gap-1.5">
          <FiUsers className="text-gray-400" />
          {booking.partySize} {booking.partySize === 1 ? "guest" : "guests"}
        </span>
        {booking.phone && (
          <span className="flex items-center gap-1.5">
            <FiPhone className="text-gray-400" />
            {booking.phone}
          </span>
        )}
      </div>

      {booking.note && (
        <p className="mt-3 bg-gray-100 rounded-lg px-3 py-2 text-xs text-ink-soft">
          <span className="font-medium text-ink">Note: </span>
          {booking.note}
        </p>
      )}

      {canCancel && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-brand flex items-center gap-1 hover:underline"
          >
            <FiX /> Cancel booking
          </button>
        </div>
      )}
    </motion.article>
  );
}
