import { VideoQuickPublishForm } from "../../../../src/publisher/admin/VideoQuickPublishForm";

export default function AdminVideosPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="font-serif text-3xl text-paper">Vídeo</h2>
        <p className="mt-2 text-sm text-paper/55">Publique um Shorts ou vídeo 16:9 com título e subtítulo — vira artigo no hub.</p>
      </div>
      <VideoQuickPublishForm />
    </div>
  );
}
