import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

// Gates a route: must be logged in AND have role === 'admin'.
export default function RequireAdmin({ children }) {
  const { loggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-brand border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <Navigate
        to="/logiformpage"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center px-6">
        <div className="max-w-md text-center bg-white rounded-2xl shadow-card p-8">
          <div className="text-6xl mb-3">🔒</div>
          <h1 className="text-xl font-bold text-ink mb-2">
            Admin access only
          </h1>
          <p className="text-sm text-ink-soft mb-6">
            Your account doesn't have admin privileges. Ask an existing admin
            to promote you, or set{" "}
            <code className="bg-gray-100 px-1 rounded">role: "admin"</code> in
            your Supabase user metadata.
          </p>
          <a
            href="/"
            className="inline-block bg-brand text-white px-5 py-2.5 rounded-full font-semibold hover:bg-brand-deep transition-colors"
          >
            Back to app
          </a>
        </div>
      </div>
    );
  }

  return children;
}
