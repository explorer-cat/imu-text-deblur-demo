import { paper } from "@/content/paper";

export function Teaser() {
  const { teaserVideo, teaserImage, teaserCaption } = paper;
  if (!teaserVideo && !teaserImage) return null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <figure>
        {teaserVideo ? (
          <video
            className="w-full rounded-2xl border border-slate-200 shadow-md"
            src={teaserVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={teaserImage}
            alt={teaserCaption ?? "Teaser"}
            className="w-full rounded-2xl border border-slate-200 shadow-md"
          />
        )}
        {teaserCaption && (
          <figcaption className="mt-4 text-center text-slate-600">
            {teaserCaption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
