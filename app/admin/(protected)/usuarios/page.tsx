import { UsersManager } from "../../../../src/publisher/admin/UsersManager";
import { listProfiles } from "../../../../src/publisher/settings/actions";

export default async function AdminUsuariosPage() {
  const result = await listProfiles();
  if (!result.ok) return <p className="text-fall">{result.error}</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Usuários</h2>
      <p className="text-sm text-paper/55">Convide por e-mail ou crie usuário com senha provisória. Alterações exigem senha de administrador.</p>
      <UsersManager rows={result.data as Parameters<typeof UsersManager>[0]["rows"]} />
    </div>
  );
}
