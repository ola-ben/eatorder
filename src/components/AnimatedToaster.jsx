import { motion, AnimatePresence } from "framer-motion";
import { useToaster, resolveValue } from "react-hot-toast";

export default function AnimatedToaster() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div
      onMouseEnter={startPause}
      onMouseLeave={endPause}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none"
    >
      <AnimatePresence initial={false}>
        {toasts
          .filter((t) => t.visible)
          .map((t) => {
            const accent =
              t.type === "success"
                ? "bg-green-500"
                : t.type === "error"
                  ? "bg-red-500"
                  : "bg-brand";
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="pointer-events-auto bg-white rounded-2xl shadow-pop overflow-hidden border border-gray-100 max-w-sm"
                {...t.ariaProps}
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  {t.icon ? (
                    <span className="text-xl shrink-0">{t.icon}</span>
                  ) : null}
                  <div className="text-sm text-ink font-medium leading-snug">
                    {resolveValue(t.message, t)}
                  </div>
                </div>
                {/* Progress bar */}
                {t.duration !== Infinity && (
                  <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{
                      duration: (t.duration ?? 3000) / 1000,
                      ease: "linear",
                    }}
                    className={`h-0.5 origin-left ${accent}`}
                  />
                )}
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
