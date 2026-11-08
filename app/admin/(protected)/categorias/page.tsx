import { CategoriesManager } from "../../../../src/publisher/admin/CategoriesManager";
import { listCategories } from "../../../../src/publisher/taxonomy/actions";

export default async function AdminCategoriasPage() {
  const result = await listCategories();
  if (!result.ok) return <p className="text-fall">{result.error}</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Categorias</h2>
      <CategoriesManager initial={result.data} />
    </div>
  );
}
