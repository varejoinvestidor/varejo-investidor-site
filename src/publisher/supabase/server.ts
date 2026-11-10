import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ensurePublisherProfile, isPublisherOwnerEmail } from "../admin/ensurePublisherProfile";
import { createPublisherServiceClient } from "./service";
import { isSupabaseConfigured, requireSupabaseAnonKey, requireSupabaseUrl } from "../env";
import type { PublisherProfile } from "../types";

export function createPublisherServerClient() {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = cookies();

  return createServerClient(requireSupabaseUrl(), requireSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component — cookies set in middleware / route handlers
        }
      },
    },
  });
}

export async function getPublisherSession() {
  const supabase = createPublisherServerClient();
  if (!supabase) return { supabase: null, user: null, profile: null };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, profile: null };

  let { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (user.email) {
    const needsProfileSync =
      !profile || (isPublisherOwnerEmail(user.email) && profile.role !== "admin");

    if (needsProfileSync) {
      await ensurePublisherProfile(user.id, user.email);
      const service = createPublisherServiceClient();
      if (service) {
        const { data: repaired } = await service
          .from("profiles")
          .select("id, email, full_name, role, avatar_url")
          .eq("id", user.id)
          .maybeSingle();
        profile = repaired;
      }
      if (!profile) {
        const retry = await supabase
          .from("profiles")
          .select("id, email, full_name, role, avatar_url")
          .eq("id", user.id)
          .maybeSingle();
        profile = retry.data;
      }
    }
  }

  return {
    supabase,
    user,
    profile: (profile as PublisherProfile | null) ?? null,
  };
}

export async function getDashboardCounts(): Promise<{
  published: number;
  draft: number;
  review: number;
  scheduled: number;
  views: number;
} | null> {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return null;

  const statuses = ["published", "draft", "review", "scheduled"] as const;
  const counts = { published: 0, draft: 0, review: 0, scheduled: 0, views: 0 };

  await Promise.all(
    statuses.map(async (status) => {
      const { count } = await supabase
        .from("articles")
        .select("id", { count: "exact", head: true })
        .eq("status", status);
      counts[status] = count ?? 0;
    }),
  );

  const { data: viewRows } = await supabase.from("articles").select("view_count");
  counts.views = (viewRows ?? []).reduce((sum, row) => sum + (row.view_count ?? 0), 0);

  return counts;
}
