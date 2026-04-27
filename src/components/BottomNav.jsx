import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineHome, HiHome } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi2";
import { HiOutlineUser, HiUser } from "react-icons/hi2";
import { useCart } from "../context/CartContext";

const tabs = [
  { to: "/", label: "Home", Icon: HiOutlineHome, ActiveIcon: HiHome, end: true },
  { to: "/restaurants", label: "Browse", Icon: FiSearch, ActiveIcon: FiSearch },
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
  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="max-w-md mx-auto grid grid-cols-4">
        {tabs.map(({ to, label, Icon, ActiveIcon, end }) => {
          const active =
            end ? pathname === to : pathname.startsWith(to) && to !== "/";
          const isHome = to === "/" && pathname === "/";
          const isActive = active || isHome;
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
                  {to === "/orders" && totalCount > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-brand text-white text-[10px] rounded-full flex items-center justify-center font-semibold">
                      {totalCount}
                    </span>
                  )}
                </span>
                <span
                  className={`text-[11px] font-medium ${
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
