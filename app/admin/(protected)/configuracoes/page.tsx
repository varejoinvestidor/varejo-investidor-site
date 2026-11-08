import { SettingsForm } from "../../../../src/publisher/admin/SettingsForm";
import { getSiteSettings } from "../../../../src/publisher/settings/actions";

export default async function AdminConfiguracoesPage() {
  const result = await getSiteSettings();
  if (!result.ok) return <p className="text-fall">{result.error}</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Configurações</h2>
      <SettingsForm settings={result.data} />
    </div>
  );
}
