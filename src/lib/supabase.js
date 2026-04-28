import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. " +
      "Auth will be disabled. Add them in Vercel → Settings → Environment Variables and redeploy.",
  );
}

const notConfiguredError = {
  name: "ConfigError",
  message:
    "Auth isn't set up on this deployment. Please contact support or try again later.",
};

const stubResult = { data: null, error: notConfiguredError };

const stubClient = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    signUp: async () => stubResult,
    signInWithPassword: async () => stubResult,
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => stubResult,
  },
};

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : stubClient;

export const supabaseConfigured = isConfigured;
