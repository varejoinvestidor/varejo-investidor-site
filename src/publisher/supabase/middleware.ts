import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured, requireSupabaseAnonKey, requireSupabaseUrl } from "../env";

export async function refreshPublisherSession(request: NextRequest, response: NextResponse) {
  if (!isSupabaseConfigured()) return response;

  const supabase = createServerClient(requireSupabaseUrl(), requireSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}
