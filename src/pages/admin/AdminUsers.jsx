import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { adminApi } from "../../lib/adminApi";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.listUsers();
      setUsers(data.users ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setRole = async (id, role) => {
    try {
      await adminApi.setUserRole(id, role);
      toast.success(`Role updated to ${role}`);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Users</h1>
        <p className="text-sm text-ink-soft mt-1">
          Supabase auth users. Promote to admin or demote to customer.
        </p>
      </header>

      {error && (
        <div className="mb-4 bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-ink-soft text-sm">Loading users…</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-ink-soft text-sm">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-ink-soft text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Joined</th>
                  <th className="text-left p-4">Last sign-in</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-t border-gray-100"
                  >
                    <td className="p-4 font-medium text-ink">
                      {u.fullName || (
                        <span className="text-ink-soft italic">no name</span>
                      )}
                    </td>
                    <td className="p-4 text-ink-soft">{u.email}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${
                          u.role === "admin"
                            ? "bg-brand-soft text-brand"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-ink-soft text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-ink-soft text-xs">
                      {u.lastSignIn
                        ? new Date(u.lastSignIn).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-4 text-right">
                      {u.role === "admin" ? (
                        <button
                          onClick={() => setRole(u.id, "customer")}
                          className="text-xs font-semibold text-ink hover:underline"
                        >
                          Demote
                        </button>
                      ) : (
                        <button
                          onClick={() => setRole(u.id, "admin")}
                          className="text-xs font-semibold text-brand hover:underline"
                        >
                          Make admin
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
