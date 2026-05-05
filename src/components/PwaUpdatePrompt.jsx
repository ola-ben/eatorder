import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import toast from "react-hot-toast";

// Watches for new service-worker versions. When one is ready, shows a toast
// with a "Refresh" action. The user controls when to apply the update so
// they're never reloaded mid-action.
export default function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, reg) {
      // Hourly check for a new version on deployed sites.
      if (reg) {
        setInterval(
          () => {
            reg.update().catch(() => {});
          },
          60 * 60 * 1000,
        );
      }
    },
  });

  useEffect(() => {
    if (!needRefresh) return;
    const id = toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>🚀 New version available</span>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await updateServiceWorker(true);
            }}
            className="bg-brand text-white text-xs font-semibold px-3 h-8 rounded-full hover:bg-brand-deep"
          >
            Refresh
          </button>
        </div>
      ),
      { duration: Infinity, position: "top-center" },
    );
    return () => toast.dismiss(id);
  }, [needRefresh, updateServiceWorker, setNeedRefresh]);

  return null;
}
