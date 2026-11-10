"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ARTICLE_BANNERS_MIGRATION_FILES,
  ELITE_MIGRATION_FILES,
  FULL_PUBLISHER_MIGRATION_FILES,
  runSqlMigrationFiles,
} from "./runSqlMigrations";
import { postgresConnectionHint } from "./postgresConnection";
import { getPublisherSession } from "../supabase/server";

async function requireSchemaInstaller() {
  const { supabase, profile } = await getPublisherSession();
  if (!supabase || !profile) return { error: "Sessão inválida." as const };
  if (profile.role !== "admin" && profile.role !== "editor") {
    return { error: "Sem permissão." as const };
  }
  return { supabase, profile };
}

async function waitForEliteTables(supabase: SupabaseClient) {
  let lastError: string | null = null;
  for (let attempt = 0; attempt < 6; attempt++) {
    const check = await supabase.from("elite_operations").select("id").limit(1);
    if (!check.error) return { ok: true as const };
    lastError = check.error.message;
    if (attempt < 5) {
      await new Promise((resolve) => setTimeout(resolve, attempt < 2 ? 2000 : 10000));
    }
  }
  return {
    ok: false as const,
    error:
      lastError ??
      "Tabelas não visíveis na API. Aguarde 1 minuto e recarregue, ou cole o SQL no Supabase SQL Editor.",
  };
}

function revalidatePublisherPaths() {
  revalidatePath("/admin/relatorio-elite");
  revalidatePath("/admin/relatorio-elite/desempenho");
  revalidatePath("/relatorio-elite");
  revalidatePath("/admin/artigos");
}

export async function installEliteSchemaFromAdmin() {
  const ctx = await requireSchemaInstaller();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };

  const migrated = await runSqlMigrationFiles(ELITE_MIGRATION_FILES);
  if (!migrated.ok) return { ok: false as const, error: migrated.error };

  const ready = await waitForEliteTables(ctx.supabase);
  if (!ready.ok) {
    return {
      ok: false as const,
      error: `${ready.error} — ${postgresConnectionHint()}`,
    };
  }

  revalidatePublisherPaths();
  return { ok: true as const };
}

export async function installArticleBannersSchemaFromAdminShared() {
  const ctx = await requireSchemaInstaller();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };
  if (ctx.profile.role !== "admin") {
    return { ok: false as const, error: "Somente administradores podem instalar a coluna de banners." };
  }

  const migrated = await runSqlMigrationFiles(ARTICLE_BANNERS_MIGRATION_FILES);
  if (!migrated.ok) return { ok: false as const, error: migrated.error };

  revalidatePath("/admin/artigos");
  return { ok: true as const };
}

/** Publisher completo + Elite + banners (idempotente). Requer POSTGRES na Vercel. */
export async function installFullSupabaseSchemaFromAdmin() {
  const ctx = await requireSchemaInstaller();
  if ("error" in ctx) return { ok: false as const, error: ctx.error };
  if (ctx.profile.role !== "admin") {
    return { ok: false as const, error: "Somente administradores podem rodar a instalação completa." };
  }

  const migrated = await runSqlMigrationFiles(FULL_PUBLISHER_MIGRATION_FILES);
  if (!migrated.ok) return { ok: false as const, error: migrated.error };

  const ready = await waitForEliteTables(ctx.supabase);
  if (!ready.ok) {
    return {
      ok: false as const,
      error: `${ready.error} — ${postgresConnectionHint()}`,
    };
  }

  revalidatePublisherPaths();
  return { ok: true as const };
}
