import { MediaLibrary } from "../../../../src/publisher/admin/MediaLibrary";
import { listMedia } from "../../../../src/publisher/media/actions";

export default async function AdminMidiaPage() {
  const result = await listMedia();
  if (!result.ok) return <p className="text-fall">{result.error}</p>;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h2 className="font-serif text-3xl text-paper">Biblioteca de mídia</h2>
      <MediaLibrary items={result.data} />
    </div>
  );
}
