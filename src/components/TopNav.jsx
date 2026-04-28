import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingBag, FiHeart } from "react-icons/fi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../context/FavoritesContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/restaurants", label: "Browse" },
  { to: "/orders", label: "Orders" },
];

export default function TopNav() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { loggedIn } = useAuth();
  const { count: favCount } = useFavorites();
  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);

  const address =
    typeof window !== "undefined"
      ? localStorage.getItem("address") || "Iwo Road, Ibadan"
      : "Iwo Road, Ibadan";

  return (
    <header className="hidden lg:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-extrabold text-xl"
        >
          <span className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center text-base">
            🍽️
          </span>
          <span className="text-ink">
            Eat<span className="text-brand">Order</span>
          </span>
        </button>

        {/* Location pill */}
        <button
          onClick={() => navigate("/profile/addresses")}
          className="hidden xl:flex items-center gap-2 max-w-[260px] text-left bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-3 h-10"
        >
          <HiOutlineMapPin className="text-brand text-lg shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] text-gray-400 leading-none">Deliver to</p>
            <p className="text-xs font-semibold text-ink truncate">{address}</p>
          </div>
        </button>

        {/* Search */}
        <button
          onClick={() => navigate("/restaurants")}
          className="flex-1 max-w-xl flex items-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-4 h-10 text-left"
        >
          <FiSearch className="text-gray-500" />
          <span className="text-sm text-gray-500">
            Search restaurants or dishes...
          </span>
        </button>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `px-3 h-10 rounded-full text-sm font-semibold flex items-center transition-colors ${
                  isActive
                    ? "text-brand bg-brand-soft"
                    : "text-ink hover:bg-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Favourites + cart + account */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/favourites")}
            className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-ink"
            aria-label="Favourites"
          >
            <FiHeart />
            {favCount > 0 && (
              <motion.span
                key={favCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] rounded-full flex items-center justify-center font-bold"
              >
                {favCount}
              </motion.span>
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/cartpage")}
            className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-ink"
            aria-label="Cart"
          >
            <FiShoppingBag />
            {totalCount > 0 && (
              <motion.span
                key={totalCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] rounded-full flex items-center justify-center font-bold"
              >
                {totalCount}
              </motion.span>
            )}
          </motion.button>
          <button
            onClick={() => navigate(loggedIn ? "/profile" : "/logiformpage")}
            className="bg-brand text-white text-sm font-semibold px-4 h-10 rounded-full hover:bg-brand-deep transition-colors"
          >
            {loggedIn ? "Account" : "Sign in"}
          </button>
        </div>
      </div>
    </header>
  );
}
