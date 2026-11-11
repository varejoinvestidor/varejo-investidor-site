import { AdminAuthorsPanel } from "../../../../src/publisher/admin/AdminAuthorsPanel";
import { CategoriesManager } from "../../../../src/publisher/admin/CategoriesManager";
import {
  requireTaxonomyAdminPage,
  roleMayEditSiteSettings,
} from "../../../../src/publisher/admin/requireAdminPage";
import { SettingsForm } from "../../../../src/publisher/admin/SettingsForm";
import { TagsManager } from "../../../../src/publisher/admin/TagsManager";
import { getSiteSettings } from "../../../../src/publisher/settings/actions";
import { getPublisherSession } from "../../../../src/publisher/supabase/server";
import { listCategories, listTags } from "../../../../src/publisher/taxonomy/actions";
import Link from "next/link";
import { ADMIN_CONFIG_TAXONOMY_NAV } from "../../../../src/publisher/admin/nav";

export default async function AdminConfiguracoesPage() {
  const profile = await requireTaxonomyAdminPage();
  const [settingsResult, categoriesRes, tagsRes, session] = await Promise.all([
    getSiteSettings(),
    listCategories(),
    listTags(),
    getPublisherSession(),
  ]);

  if (!settingsResult.ok) return <p className="text-fall">{settingsResult.error}</p>;

  let authors: { id: string; email: string | null; full_name: string | null; role: string }[] = [];
  if (session.supabase) {
    const { data, error } = await session.supabase
      .from("profiles")
      .select("id, email, full_name, role")
      .in("role", ["author", "editor", "admin"])
      .order("full_name");
    if (!error && data) authors = data;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 scroll-mt-24">
      <header>
        <h2 className="font-serif text-3xl text-paper">Configurações</h2>
        <p className="mt-2 max-w-2xl text-sm text-paper/55">
          Fuso horário do publisher, categorias, tags e autores. Atalhos abaixo levam às seções nesta página.
        </p>
        <nav className="mt-4 flex flex-wrap gap-2" aria-label="Seções de configuração">
          {ADMIN_CONFIG_TAXONOMY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border border-line/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-paper/65 transition hover:border-gold/35 hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {roleMayEditSiteSettings(profile.role) ? (
        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-paper/45">Geral</h3>
          <SettingsForm settings={settingsResult.data} />
        </section>
      ) : null}

      <section id="categorias" className="scroll-mt-28 space-y-4">
        <h3 className="font-serif text-2xl text-paper">Categorias</h3>
        {categoriesRes.ok ? <CategoriesManager initial={categoriesRes.data} /> : <p className="text-fall">{categoriesRes.error}</p>}
      </section>

      <section id="tags" className="scroll-mt-28 space-y-4">
        <h3 className="font-serif text-2xl text-paper">Tags</h3>
        {tagsRes.ok ? <TagsManager initial={tagsRes.data} /> : <p className="text-fall">{tagsRes.error}</p>}
      </section>

      <section id="autores" className="scroll-mt-28 space-y-4">
        <h3 className="font-serif text-2xl text-paper">Autores</h3>
        <p className="text-sm text-paper/50">
          Perfis com papel author, editor ou admin. Gestão de usuários em{" "}
          <Link href="/admin/usuarios" className="text-gold hover:underline">
            Usuários
          </Link>
          .
        </p>
        <AdminAuthorsPanel authors={authors} />
      </section>
    </div>
  );
}
