import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineBuildingStorefront,
  HiOutlineUsers,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const navItems = [
  { to: "/admin", label: "Dashboard", Icon: HiOutlineSquares2X2, end: true },
  { to: "/admin/orders", label: "Orders", Icon: HiOutlineShoppingBag },
  {
    to: "/admin/reservations",
    label: "Bookings",
    Icon: HiOutlineCalendarDays,
  },
  {
    to: "/admin/restaurants",
    label: "Restaurants",
    Icon: HiOutlineBuildingStorefront,
  },
  { to: "/admin/users", label: "Users", Icon: HiOutlineUsers },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { fullName, user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-100 sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center text-base">
            🍽️
          </div>
          <div>
            <p className="font-extrabold text-ink leading-tight">
              Eat<span className="text-brand">Order</span>
            </p>
            <p className="text-[11px] text-ink-soft uppercase tracking-wider">
              Admin
            </p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-soft text-brand"
                    : "text-ink hover:bg-gray-100"
                }`
              }
            >
              <Icon className="text-xl" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-semibold text-ink truncate">
              {fullName || "Admin"}
            </p>
            <p className="text-[11px] text-ink-soft truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-ink hover:bg-gray-100"
          >
            <FiArrowLeft />
            Back to app
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-brand hover:bg-brand-soft"
          >
            <HiOutlineArrowLeftOnRectangle />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center text-sm">
            🍽️
          </div>
          <span className="font-bold text-ink">Admin</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-ink-soft flex items-center gap-1"
        >
          <FiArrowLeft /> App
        </button>
      </div>

      {/* Mobile bottom tab bar for admin */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-100 grid grid-cols-5">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2.5 gap-1 ${
                isActive ? "text-brand" : "text-gray-400"
              }`
            }
          >
            <Icon className="text-xl" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-14 md:pt-0 pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-4 md:p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
