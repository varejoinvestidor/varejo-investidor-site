import { TagsManager } from "../../../../src/publisher/admin/TagsManager";
import { listTags } from "../../../../src/publisher/taxonomy/actions";

export default async function AdminTagsPage() {
  const result = await listTags();
  if (!result.ok) return <p className="text-fall">{result.error}</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Tags</h2>
      <TagsManager initial={result.data} />
    </div>
  );
}
