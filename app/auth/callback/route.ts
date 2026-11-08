import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, requireSupabaseAnonKey, requireSupabaseUrl } from "../../../src/publisher/env";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/admin";

  if (!isSupabaseConfigured() || !code) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const cookieStore = cookies();
  const supabase = createServerClient(requireSupabaseUrl(), requireSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(new URL(next, request.url));
}
