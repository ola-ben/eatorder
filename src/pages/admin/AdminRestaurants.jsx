import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { adminApi } from "../../lib/adminApi";

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.listRestaurants();
      setRestaurants(data.restaurants ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id) => {
    try {
      await adminApi.toggleRestaurantOpen(id);
      toast.success("Updated");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Restaurants</h1>
        <p className="text-sm text-ink-soft mt-1">
          Manage restaurants — toggle open/closed status. CRUD endpoints are
          stubbed in the backend; extend the controller when you add a{" "}
          <code className="bg-gray-100 px-1 rounded">restaurants</code> table.
        </p>
      </header>

      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div className="col-span-full p-8 text-center text-ink-soft text-sm bg-white rounded-2xl shadow-card">
            Loading…
          </div>
        ) : restaurants.length === 0 ? (
          <div className="col-span-full p-8 text-center text-ink-soft text-sm bg-white rounded-2xl shadow-card">
            No restaurants found.
          </div>
        ) : (
          restaurants.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl shadow-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-ink line-clamp-1">
                    {r.name}
                  </h3>
                  <p className="text-xs text-ink-soft font-mono mt-0.5">
                    {r.id}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-ink/5 px-2 py-0.5 rounded-full text-xs">
                  <FaStar className="text-yellow-500 text-[11px]" />
                  <span className="font-semibold">{r.rating}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    r.isOpen
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      r.isOpen ? "bg-green-500 animate-pulse" : "bg-gray-400"
                    }`}
                  />
                  {r.isOpen ? "Open" : "Closed"}
                </span>
                <button
                  onClick={() => toggle(r.id)}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  {r.isOpen ? "Close" : "Open"}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
