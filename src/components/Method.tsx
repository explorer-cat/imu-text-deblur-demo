import { paper } from "@/content/paper";
import { Section } from "@/components/Section";

export function Method() {
  const { heading, image, caption, paragraphs } = paper.method;
  return (
    <Section id="method" title={heading}>
      {image && (
        <figure className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={caption ?? heading}
            className="mx-auto w-full rounded-xl border border-slate-200 bg-white shadow-sm"
          />
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-500">
              {caption}
            </figcaption>
          )}
        </figure>
      )}
      <div className="mx-auto max-w-3xl space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-pretty leading-relaxed text-slate-700">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
