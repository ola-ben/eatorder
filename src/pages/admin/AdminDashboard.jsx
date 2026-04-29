import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2";
import { adminApi } from "../../lib/adminApi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 240 } },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: "—",
    revenue: "—",
    users: "—",
    restaurants: "—",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.allSettled([
      adminApi.listOrders(),
      adminApi.listUsers(),
      adminApi.listRestaurants(),
    ]).then(([orders, users, restaurants]) => {
      if (!mounted) return;
      const ordersData = orders.status === "fulfilled" ? orders.value : null;
      const usersData = users.status === "fulfilled" ? users.value : null;
      const restaurantsData =
        restaurants.status === "fulfilled" ? restaurants.value : null;

      const totalRevenue =
        ordersData?.orders?.reduce((sum, o) => sum + (o.total || 0), 0) ?? 0;

      setStats({
        orders: ordersData?.total ?? "—",
        revenue: totalRevenue ? `₦${totalRevenue.toLocaleString("en-NG")}` : "—",
        users: usersData?.total ?? "—",
        restaurants: restaurantsData?.total ?? "—",
      });

      const firstError = [orders, users, restaurants].find(
        (r) => r.status === "rejected",
      );
      if (firstError) {
        setError(firstError.reason?.message || "Could not reach the API.");
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const cards = [
    {
      label: "Orders",
      value: stats.orders,
      Icon: HiOutlineShoppingBag,
      tint: "bg-brand-soft text-brand",
    },
    {
      label: "Revenue",
      value: stats.revenue,
      Icon: HiOutlineCurrencyDollar,
      tint: "bg-green-50 text-green-600",
    },
    {
      label: "Users",
      value: stats.users,
      Icon: HiOutlineUsers,
      tint: "bg-blue-50 text-blue-600",
    },
    {
      label: "Restaurants",
      value: stats.restaurants,
      Icon: HiOutlineBuildingStorefront,
      tint: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-ink-soft mt-1">
          Overview of orders, users, and restaurants.
        </p>
      </header>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          <strong>Heads up:</strong> {error} Make sure the backend is running on{" "}
          <code className="bg-white px-1 rounded">localhost:4000</code>.
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {cards.map(({ label, value, Icon, tint }) => (
          <motion.div
            key={label}
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-soft">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${tint}`}
              >
                <Icon className="text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <section className="mt-8 bg-white rounded-2xl shadow-card p-6">
        <h2 className="font-semibold text-ink mb-2">Welcome to the admin panel</h2>
        <p className="text-sm text-ink-soft leading-relaxed">
          This dashboard pulls data from your{" "}
          <code className="bg-gray-100 px-1 rounded">backend/</code> Express
          API. The orders, users, and restaurants endpoints are scaffolded with
          mock data — replace the controllers with real Supabase queries when
          you're ready.
        </p>
      </section>
    </div>
  );
}
