import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiShoppingBag, FiTruck, FiUser } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function Checkoutpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useCart();
  const [isPlacing, setIsPlacing] = useState(false);

  const cartItems = location.state?.cart || cart;
  const subtotal =
    location.state?.totalPrice ||
    cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const [delivery, setDelivery] = useState("pickup");
  const [fullName, setFullName] = useState(
    () => localStorage.getItem("fullName") || "",
  );
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "");
  const [address, setAddress] = useState(
    () => localStorage.getItem("address") || "",
  );
  const [note, setNote] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
  }, [fullName]);
  useEffect(() => {
    localStorage.setItem("phone", phone);
  }, [phone]);
  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);
  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const deliveryFee =
    delivery === "delivery" && subtotal <= 7000 ? 1500 : 0;
  const total = subtotal + deliveryFee;
  const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}`;

  const placeOrder = () => {
    if (!fullName || !phone || !email) {
      toast.error("Please fill all required fields");
      return;
    }
    if (delivery === "delivery" && !address) {
      toast.error("Please enter your delivery address");
      return;
    }
    setIsPlacing(true);
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      const order = {
        id: orderId,
        fullName,
        phone,
        email,
        delivery,
        address: delivery === "delivery" ? address : "Pickup from store",
        note,
        items: cartItems.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          photoName: i.photoName,
        })),
        totalPrice: total,
        date: new Date().toLocaleDateString(),
        status: "Processing",
      };
      const existing = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem("orders", JSON.stringify([order, ...existing]));
      clearCart();
      toast.success(`Order #${orderId} placed!`);
      navigate("/successpage", { state: { order } });
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-canvas">
      <div className="max-w-md mx-auto bg-white min-h-screen relative pb-32">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="px-4 h-14 flex items-center gap-3">
            <button
              onClick={() => navigate("/cartpage")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-ink">Checkout</h1>
          </div>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Delivery option */}
          <Section title="Delivery method" icon={<FiTruck />}>
            <div className="grid grid-cols-2 gap-2">
              <OptionCard
                active={delivery === "pickup"}
                onClick={() => setDelivery("pickup")}
                title="Pickup"
                subtitle="Free"
                emoji="🏬"
              />
              <OptionCard
                active={delivery === "delivery"}
                onClick={() => setDelivery("delivery")}
                title="Delivery"
                subtitle={subtotal > 7000 ? "Free" : "₦1,500"}
                emoji="🛵"
              />
            </div>
          </Section>

          {/* Customer info */}
          <Section title="Your details" icon={<FiUser />}>
            <div className="space-y-3">
              <Field
                label="Full name"
                value={fullName}
                onChange={setFullName}
                placeholder="John Doe"
              />
              <Field
                label="Phone"
                value={phone}
                onChange={setPhone}
                placeholder="08012345678"
                type="tel"
              />
              <Field
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                type="email"
              />
            </div>
          </Section>

          {/* Address */}
          <AnimatePresence>
            {delivery === "delivery" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Section title="Delivery address" icon={<HiOutlineMapPin />}>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    placeholder="Apartment, street, area"
                    className="w-full bg-gray-100 rounded-xl p-3 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </Section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note */}
          <Section title="Note for restaurant" icon={<span>📝</span>}>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Extra sauce, no onions, etc."
              className="w-full bg-gray-100 rounded-xl p-3 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
            />
          </Section>

          {/* Order summary */}
          <Section title="Order summary" icon={<FiShoppingBag />}>
            <div className="space-y-2 text-sm">
              {cartItems.slice(0, 3).map((it) => (
                <div key={it.name} className="flex justify-between">
                  <span className="text-ink-soft">
                    <span className="text-ink-soft">{it.quantity}× </span>
                    {it.name}
                  </span>
                  <span className="text-ink">
                    {formatNaira(it.price * it.quantity)}
                  </span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <p className="text-xs text-ink-soft">
                  +{cartItems.length - 3} more items
                </p>
              )}
              <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                <Row
                  label={`Subtotal (${totalItems})`}
                  value={formatNaira(subtotal)}
                />
                <Row
                  label="Delivery"
                  value={deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}
                  highlight={deliveryFee === 0}
                />
                <div className="flex justify-between items-baseline pt-2">
                  <span className="font-bold text-ink">Total</span>
                  <span className="text-xl font-bold text-ink">
                    {formatNaira(total)}
                  </span>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Sticky place order */}
        <div className="fixed bottom-4 inset-x-0 z-30 px-4">
          <button
            onClick={placeOrder}
            disabled={isPlacing}
            className="max-w-md mx-auto w-full bg-brand text-white rounded-2xl shadow-pop h-14 flex items-center justify-between px-5 disabled:opacity-70"
          >
            <span className="font-semibold">
              {isPlacing ? "Placing order…" : "Place order"}
            </span>
            <span className="font-bold">{formatNaira(total)}</span>
          </button>
        </div>
      </div>
    </main>
  );
}

function Section({ title, icon, children }) {
  return (
    <section className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-brand">{icon}</span>
        <h3 className="font-semibold text-ink">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function OptionCard({ active, onClick, title, subtitle, emoji }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-colors text-left ${
        active
          ? "border-brand bg-brand-soft"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="text-2xl">{emoji}</div>
      <p className={`mt-1 font-semibold ${active ? "text-brand" : "text-ink"}`}>
        {title}
      </p>
      <p className="text-xs text-ink-soft">{subtitle}</p>
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-soft mb-1">
        {label} <span className="text-brand">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-100 rounded-xl px-3 h-11 text-sm text-ink placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between text-ink-soft">
      <span>{label}</span>
      <span className={highlight ? "text-green-600 font-medium" : "text-ink"}>
        {value}
      </span>
    </div>
  );
}
