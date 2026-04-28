import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiHeart, FiChevronDown } from "react-icons/fi";
import {
  GiNoodles,
  GiMeat,
  GiDrinkMe,
  GiChickenOven,
  GiCupcake,
} from "react-icons/gi";
import { LuPizza, LuSandwich } from "react-icons/lu";
import { useFavorites } from "../context/FavoritesContext";

const categories = [
  { id: "all", label: "All", Icon: GiNoodles },
  { id: "rice", label: "Rice", Icon: GiNoodles },
  { id: "chicken", label: "Chicken", Icon: GiChickenOven },
  { id: "pizza", label: "Pizza", Icon: LuPizza },
  { id: "burgers", label: "Burgers", Icon: LuSandwich },
  { id: "grills", label: "Grills", Icon: GiMeat },
  { id: "drinks", label: "Drinks", Icon: GiDrinkMe },
  { id: "desserts", label: "Desserts", Icon: GiCupcake },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeHero() {
  const navigate = useNavigate();
  const { count: favCount } = useFavorites();
  const [activeCat, setActiveCat] = useState("all");
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("fullName")?.split(" ")[0] || "");
  }, []);

  const greeting = useMemo(getGreeting, []);
  const address =
    typeof window !== "undefined"
      ? localStorage.getItem("address") || "Iwo Road, Ibadan"
      : "Iwo Road, Ibadan";

  return (
    <header className="bg-white">
      {/* Mobile-only top app bar (TopNav handles this on desktop) */}
      <div className="lg:hidden px-4 pt-5 pb-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/profile/addresses")}
          className="flex items-center gap-2 max-w-[70%] text-left"
        >
          <div className="w-9 h-9 rounded-full bg-brand-soft flex items-center justify-center text-brand">
            📍
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400 leading-tight">
              Deliver to
            </p>
            <p className="text-sm font-semibold text-ink truncate flex items-center gap-1">
              {address}
              <FiChevronDown className="text-gray-400" />
            </p>
          </div>
        </button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/favourites")}
          className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink"
          aria-label="My favourites"
        >
          <FiHeart className="text-lg" />
          {favCount > 0 && (
            <motion.span
              key={favCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] rounded-full flex items-center justify-center font-bold"
            >
              {favCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Greeting */}
      <div className="px-4 lg:px-0 pb-3 lg:pb-5 lg:pt-2">
        <h1 className="text-2xl lg:text-4xl font-bold text-ink leading-tight">
          {greeting}
          {name ? `, ${name}` : ""} 👋
        </h1>
        <p className="text-sm lg:text-base text-ink-soft mt-0.5 lg:mt-2">
          What would you like to eat today?
        </p>
      </div>

      {/* Mobile-only search (TopNav has search on desktop) */}
      <div className="lg:hidden px-4 pb-4">
        <button
          onClick={() => navigate("/restaurants")}
          className="w-full flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors rounded-2xl px-4 h-12 text-left"
        >
          <FiSearch className="text-lg text-gray-500" />
          <span className="text-sm text-gray-500">
            Search restaurants or dishes...
          </span>
        </button>
      </div>

      {/* Categories + promo split on desktop */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:items-start">
        {/* Category chips */}
        <div className="lg:col-span-7 lg:order-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 lg:px-0 pb-2 lg:pb-0 lg:flex-wrap">
            {categories.map(({ id, label, Icon }) => {
              const active = activeCat === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveCat(id)}
                  className={`flex items-center gap-2 px-4 h-10 lg:h-11 rounded-full text-sm font-medium whitespace-nowrap border transition-all ${
                    active
                      ? "bg-brand text-white border-brand shadow-card"
                      : "bg-white text-ink border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon className="text-base" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Promo banner */}
        <div className="px-4 lg:px-0 pt-2 lg:pt-0 pb-4 lg:pb-0 lg:col-span-5 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-linear-to-r from-brand to-accent text-white p-5 lg:p-7 shadow-card"
          >
            <div className="relative z-10 max-w-[60%] lg:max-w-[70%]">
              <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                Today's Deal
              </p>
              <h3 className="text-xl lg:text-2xl font-bold mt-1 leading-snug">
                Free delivery on orders over ₦7,000
              </h3>
              <button
                onClick={() => navigate("/restaurants")}
                className="mt-3 inline-flex items-center gap-1 bg-white text-brand text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                Order now →
              </button>
            </div>
            <div className="absolute -right-6 -bottom-6 text-[120px] lg:text-[160px] leading-none opacity-20 select-none">
              🍱
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
