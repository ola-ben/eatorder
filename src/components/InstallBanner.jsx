import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiX, FiShare } from "react-icons/fi";

const DISMISS_KEY = "pwa-install-dismissed";
const DISMISS_DAYS = 7;

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true // iOS Safari legacy
  );
}

function isIOS() {
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
}

function wasRecentlyDismissed() {
  try {
    const ts = Number(localStorage.getItem(DISMISS_KEY));
    if (!ts) return false;
    const ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return ageDays < DISMISS_DAYS;
  } catch {
    return false;
  }
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone()) return; // already installed
    if (wasRecentlyDismissed()) return;

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS doesn't fire beforeinstallprompt — show a manual hint after a delay.
    if (isIOS()) {
      const t = setTimeout(() => setShowBanner(true), 4000);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onPrompt);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  // Hide banner once installed.
  useEffect(() => {
    const onInstalled = () => setShowBanner(false);
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setShowBanner(false);
  };

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "dismissed") dismiss();
      setDeferredPrompt(null);
      setShowBanner(false);
      return;
    }
    if (isIOS()) {
      setIosHint(true);
    }
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="mx-4 lg:mx-0 mb-4 bg-white border border-gray-100 rounded-2xl shadow-card p-4 flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand to-accent text-white flex items-center justify-center shrink-0 text-xl">
          🍽️
        </div>
        <div className="flex-1 min-w-0">
          {iosHint ? (
            <>
              <p className="font-semibold text-ink text-sm leading-tight">
                Install EatOrder
              </p>
              <p className="text-[12px] text-ink-soft mt-0.5 flex items-center gap-1">
                Tap <FiShare className="inline" /> then{" "}
                <strong>Add to Home Screen</strong>
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-ink text-sm leading-tight">
                Install EatOrder
              </p>
              <p className="text-[12px] text-ink-soft mt-0.5">
                Faster ordering, works offline, one tap from your home screen.
              </p>
            </>
          )}
        </div>
        {!iosHint && (
          <button
            onClick={install}
            className="bg-brand hover:bg-brand-deep text-white text-xs font-semibold px-3 h-9 rounded-full flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <FiDownload /> Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="w-8 h-8 rounded-full text-ink-soft hover:bg-gray-100 flex items-center justify-center shrink-0"
        >
          <FiX />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
