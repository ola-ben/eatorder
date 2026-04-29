import { createClient } from "@supabase/supabase-js";
import { config } from "../config/env.js";

// Service-role client — bypasses Row Level Security.
// NEVER expose this to the browser. Server-side only.
export const supabaseAdmin = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

// Anon-key client — used to verify user JWTs sent from the browser.
export const supabaseAuth = createClient(
  config.supabase.url,
  config.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
