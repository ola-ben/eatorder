import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { adminApi } from "../../lib/adminApi";
import { AdminTableRowSkeleton } from "../../components/skeletons/Skeleton";

const STATUSES = ["all", "Pending", "Confirmed", "Completed", "Cancelled"];

const statusStyle = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-green-50 text-green-700 border-green-200",
  Completed: "bg-blue-50 text-blue-700 border-blue-200",
  Cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(t) {
  return t ? t.slice(0, 5) : "";
}

export default function AdminReservations() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["admin", "reservations", filter],
    queryFn: () =>
      adminApi.listReservations(filter === "all" ? undefined : filter),
  });

  const reservations = data?.reservations ?? [];

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateReservationStatus(id, status);
      toast.success(`Reservation ${id} → ${status}`);
      queryClient.invalidateQueries({ queryKey: ["admin", "reservations"] });
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-ink flex items-center gap-2">
          Reservations
          {isFetching && !isPending && (
            <span className="text-xs text-ink-soft font-medium animate-pulse">
              updating…
            </span>
          )}
        </h1>
        <p className="text-sm text-ink-soft mt-1">
          Review table bookings and update their status.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 h-9 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
              filter === s
                ? "bg-brand text-white border-brand"
                : "bg-white text-ink border-gray-200 hover:border-gray-300"
            }`}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error.message || String(error)}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {isPending ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left p-4">Booking</th>
                  <th className="text-left p-4">Restaurant</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Date · Time</th>
                  <th className="text-left p-4">Guests</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }).map((_, i) => (
                  <AdminTableRowSkeleton key={i} cols={7} />
                ))}
              </tbody>
            </table>
          </div>
        ) : reservations.length === 0 ? (
          <div className="p-8 text-center text-ink-soft text-sm">
            No reservations found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left p-4">Booking</th>
                  <th className="text-left p-4">Restaurant</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Date · Time</th>
                  <th className="text-left p-4">Guests</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {reservations.map((r) => (
                    <motion.tr
                      key={r.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-gray-100"
                    >
                      <td className="p-4 font-mono text-xs">{r.id}</td>
                      <td className="p-4 font-medium text-ink line-clamp-1">
                        {r.restaurantName}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-ink">{r.customer}</p>
                        <p className="text-xs text-ink-soft">{r.phone}</p>
                      </td>
                      <td className="p-4 text-ink-soft text-xs">
                        {formatDate(r.date)}
                        <br />
                        <span className="text-ink">{formatTime(r.time)}</span>
                      </td>
                      <td className="p-4 text-ink">{r.partySize}</td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${
                            statusStyle[r.status] ||
                            "bg-gray-50 border-gray-200"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-brand"
                        >
                          {["Pending", "Confirmed", "Completed", "Cancelled"].map(
                            (s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ),
                          )}
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
