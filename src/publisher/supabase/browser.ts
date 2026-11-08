"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, requireSupabaseAnonKey, requireSupabaseUrl } from "../env";

export function createPublisherBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(requireSupabaseUrl(), requireSupabaseAnonKey());
}
