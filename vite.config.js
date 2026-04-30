import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split heavy dependencies into separate cacheable chunks.
        // The browser caches each vendor chunk independently, so when your app
        // code changes, users don't re-download framer-motion, supabase, etc.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Core React only — narrowly matched so we don't pull every
          // package with "react" in its name into this chunk.
          if (
            /[\\/]node_modules[\\/](react|react-dom|scheduler|use-sync-external-store)[\\/]/.test(
              id,
            )
          ) {
            return "react";
          }
          if (id.includes("react-router")) return "router";
          if (id.includes("framer-motion") || id.includes("motion-")) {
            return "motion";
          }
          if (id.includes("@supabase")) return "supabase";
          if (id.includes("react-icons")) return "icons";
          if (id.includes("react-hot-toast")) return "toast";
          // Everything else falls into the default vendor chunk.
        },
      },
    },
  },
});
