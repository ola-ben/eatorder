import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Use 'prompt' so we can show the user a friendly toast when an update
      // is ready, rather than auto-reloading mid-action.
      registerType: "prompt",
      includeAssets: ["icon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "EatOrder — Food delivery, fast",
        short_name: "EatOrder",
        description:
          "Order delicious food or book a table at any restaurant in Ibadan.",
        theme_color: "#ef4444",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        categories: ["food", "lifestyle", "shopping"],
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache built assets (HTML/JS/CSS/images) so cold loads work offline.
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,woff2}"],
        // Network-first for API + Supabase calls (always try fresh, fall back
        // to cache only if offline). Cache-first for fonts/images.
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === "https://fonts.googleapis.com" ||
              url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === "https://images.unsplash.com",
            handler: "CacheFirst",
            options: {
              cacheName: "restaurant-images",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/api/") ||
              url.hostname.endsWith(".supabase.co") ||
              url.hostname.endsWith(".onrender.com"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api",
              networkTimeoutSeconds: 8,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
      },
      devOptions: {
        // Disabled in dev — service workers + Vite HMR don't always play nice.
        enabled: false,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
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
          if (id.includes("@tanstack")) return "query";
        },
      },
    },
  },
});
