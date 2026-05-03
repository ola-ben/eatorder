import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import {
  FiX,
  FiCalendar,
  FiClock,
  FiUsers,
  FiUser,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { createReservation } from "../lib/reservationsApi";

const TIME_SLOTS = [
  "12:00", "12:30",
  "13:00", "13:30",
  "14:00", "14:30",
  "18:00", "18:30",
  "19:00", "19:30",
  "20:00", "20:30",
  "21:00",
];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export default function BookingModal({ open, onClose, restaurant, onBooked }) {
  const { user, loggedIn, fullName: authFullName } = useAuth();
  const queryClient = useQueryClient();

  const [date, setDate] = useState(tomorrowISO());
  const [time, setTime] = useState("19:00");
  const [partySize, setPartySize] = useState(2);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill / reset every time the modal opens, so booking starts fresh.
  useEffect(() => {
    if (!open) return;
    setDate(tomorrowISO());
    setTime("19:00");
    setPartySize(2);
    setFullName(authFullName || localStorage.getItem("fullName") || "");
    setEmail(user?.email || localStorage.getItem("email") || "");
    setPhone(localStorage.getItem("phone") || "");
    setNote("");
    setSubmitting(false);
  }, [open, user, authFullName]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      toast.error("Please sign in to book a table");
      return;
    }
    if (!fullName || !phone) {
      toast.error("Name and phone are required");
      return;
    }

    setSubmitting(true);
    const { data, error } = await createReservation({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      fullName,
      phone,
      email,
      reservedDate: date,
      reservedTime: time,
      partySize: Number(partySize),
      note,
    });

    if (error) {
      setSubmitting(false);
      toast.error(error.message || "Could not place reservation");
      return;
    }

    // Save contact info for next time
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("phone", phone);
    if (email) localStorage.setItem("email", email);

    // Invalidate cached reservations so /bookings + profile show the new one.
    queryClient.invalidateQueries({ queryKey: ["reservations"] });

    toast.success(`Booked! ${data.id} · ${date} at ${time}`);
    setSubmitting(false);
    onBooked?.(data);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet (mobile bottom-up, desktop centered) */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed z-50 inset-x-0 bottom-0 lg:inset-0 lg:m-auto lg:h-fit lg:max-w-lg bg-white rounded-t-3xl lg:rounded-3xl overflow-hidden shadow-pop"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-brand to-accent text-white px-5 py-4 flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/80">
                  Book a table
                </p>
                <h2 className="text-lg font-bold leading-tight mt-0.5">
                  {restaurant?.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-5 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date" icon={<FiCalendar />}>
                  <input
                    type="date"
                    value={date}
                    min={todayISO()}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-11 text-sm text-ink outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </Field>

                <Field label="Time" icon={<FiClock />}>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-11 text-sm text-ink outline-none focus:ring-2 focus:ring-brand/30 appearance-none"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Party size" icon={<FiUsers />}>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                    className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-11 text-sm text-ink outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[1, 2, 3, 4, 6, 8].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPartySize(n)}
                      className={`px-3 h-7 rounded-full text-xs font-medium border transition-colors ${
                        Number(partySize) === n
                          ? "bg-brand text-white border-brand"
                          : "bg-white text-ink border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {n} {n === 1 ? "guest" : "guests"}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Full name" icon={<FiUser />}>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-11 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </Field>

              <Field label="Phone" icon={<FiPhone />}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08012345678"
                  required
                  className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-11 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </Field>

              <Field label="Email (optional)" icon={<FiMail />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-100 rounded-xl pl-10 pr-3 h-11 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </Field>

              <div>
                <label className="block text-xs font-medium text-ink-soft mb-1.5">
                  Special request (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="High chair, allergies, occasion…"
                  className="w-full bg-gray-100 rounded-xl p-3 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand hover:bg-brand-deep disabled:opacity-70 text-white h-12 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  `Confirm booking · ${partySize} ${
                    Number(partySize) === 1 ? "guest" : "guests"
                  }`
                )}
              </motion.button>

              <p className="text-center text-[11px] text-ink-soft">
                You'll get a confirmation once the restaurant accepts your
                booking.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-soft mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-[14px] text-gray-400 z-10">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}
