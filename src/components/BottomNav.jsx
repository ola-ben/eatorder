import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiHome,
  HiOutlineShoppingBag,
  HiShoppingBag,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi2";
import { FiSearch, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

const tabs = [
  { to: "/", label: "Home", Icon: HiOutlineHome, ActiveIcon: HiHome, end: true },
  { to: "/restaurants", label: "Browse", Icon: FiSearch, ActiveIcon: FiSearch },
  {
    to: "/favourites",
    label: "Saved",
    Icon: FiHeart,
    ActiveIcon: FaHeart,
  },
  {
    to: "/orders",
    label: "Orders",
    Icon: HiOutlineShoppingBag,
    ActiveIcon: HiShoppingBag,
  },
  { to: "/profile", label: "Account", Icon: HiOutlineUser, ActiveIcon: HiUser },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { cart } = useCart();
  const { count: favCount } = useFavorites();
  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="max-w-md mx-auto grid grid-cols-5">
        {tabs.map(({ to, label, Icon, ActiveIcon, end }) => {
          const active =
            end ? pathname === to : pathname.startsWith(to) && to !== "/";
          const isHome = to === "/" && pathname === "/";
          const isActive = active || isHome;
          const badge =
            to === "/orders" && totalCount > 0
              ? totalCount
              : to === "/favourites" && favCount > 0
                ? favCount
                : null;
          return (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className="flex flex-col items-center justify-center gap-1 py-2.5 relative"
              >
                <span className="relative">
                  {isActive ? (
                    <ActiveIcon className="text-2xl text-brand" />
                  ) : (
                    <Icon className="text-2xl text-gray-400" />
                  )}
                  {badge !== null && (
                    <motion.span
                      key={badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-brand text-white text-[10px] rounded-full flex items-center justify-center font-semibold"
                    >
                      {badge}
                    </motion.span>
                  )}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-brand" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="bottomnav-indicator"
                    className="absolute -top-px h-1 w-8 bg-brand rounded-full"
                  />
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
