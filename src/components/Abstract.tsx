import { paper } from "@/content/paper";
import { Section } from "@/components/Section";

export function Abstract() {
  return (
    <Section id="abstract" title="Abstract">
      <p className="mx-auto max-w-3xl text-pretty text-lg leading-relaxed text-slate-700">
        {paper.abstract}
      </p>
    </Section>
  );
}
