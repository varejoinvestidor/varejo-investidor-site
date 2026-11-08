import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, requireSupabaseUrl } from "../env";

export function createPublisherServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isSupabaseConfigured() || !serviceKey) return null;

  return createClient(requireSupabaseUrl(), serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
