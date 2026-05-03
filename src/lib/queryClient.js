import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// Stale-while-revalidate by default. Showing cached data instantly is what
// makes the app feel snappy even when the Render backend is cold-starting.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 5 min — within that window, queries
      // resolve from cache without hitting the network.
      staleTime: 5 * 60 * 1000,
      // Garbage-collect cached data after 24h of being unused.
      gcTime: 24 * 60 * 60 * 1000,
      // When the user comes back to the tab, silently revalidate.
      refetchOnWindowFocus: true,
      // Don't refetch on every component re-mount if data is still fresh.
      refetchOnMount: false,
      // Be patient with the Render free tier — it can take 30s+ to wake up.
      retry: (failureCount, error) => {
        // Don't retry on auth/permission errors.
        if (error?.status === 401 || error?.status === 403) return false;
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Persist the cache to localStorage so it survives page reloads.
// This is the secret to "no cold-start glitch" — even after a refresh,
// users see their last data immediately while the network catches up.
export const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
  key: "eatorder-query-cache",
  // Throttle writes so a flood of state updates doesn't hammer storage.
  throttleTime: 1000,
});
