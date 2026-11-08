import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, requireSupabaseAnonKey, requireSupabaseUrl } from "../env";

export function createPublisherPublicClient() {
  if (!isSupabaseConfigured()) return null;

  return createClient(requireSupabaseUrl(), requireSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
