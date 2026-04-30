import { motion } from "framer-motion";

// Lightweight Suspense fallback used while a lazy route chunk loads.
export default function PageLoader() {
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
