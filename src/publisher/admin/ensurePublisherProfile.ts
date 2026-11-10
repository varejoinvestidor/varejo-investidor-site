import { createPublisherServiceClient } from "../supabase/service";

/** Garante linha em `profiles` (ex.: usuário criado antes da migration). */
export async function ensurePublisherProfile(userId: string, email: string) {
  const admin = createPublisherServiceClient();
  if (!admin) return false;

  const { data: existing } = await admin
    .from("profiles")
    .select("id, role, email")
    .eq("id", userId)
    .maybeSingle();

  const ownerAdmin = email.toLowerCase() === "viniiipinvest@gmail.com";

  if (existing) {
    const patch: Record<string, string> = {};
    if (email && existing.email !== email) patch.email = email;
    if (ownerAdmin && existing.role !== "admin") patch.role = "admin";
    if (Object.keys(patch).length) {
      await admin.from("profiles").update(patch).eq("id", userId);
    }
    return true;
  }

  const { error } = await admin.from("profiles").upsert({
    id: userId,
    email,
    full_name: (email.split("@")[0] || "Editor").slice(0, 80),
    role: ownerAdmin ? "admin" : "author",
  });

  return !error;
}
