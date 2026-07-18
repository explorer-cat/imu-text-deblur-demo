import { paper } from "@/content/paper";
import { Icon } from "@/components/icons";

function Sup({ marks }: { marks: (number | string)[] }) {
  if (marks.length === 0) return null;
  return <sup className="text-indigo-600">{marks.join(",")}</sup>;
}

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-4xl px-5 pt-16 pb-12 text-center sm:pt-20">
        {paper.venue && (
          <span className="mb-5 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            {paper.venue}
          </span>
        )}

        <h1 className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {paper.title}
        </h1>

        {/* Authors */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-lg text-slate-800">
          {paper.authors.map((a, i) => (
            <span key={i}>
              {a.url ? (
                <a
                  href={a.url}
                  className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-indigo-600 hover:decoration-indigo-400"
                >
                  {a.name}
                </a>
              ) : (
                <span className="font-medium">{a.name}</span>
              )}
              <Sup marks={[...(a.affiliations ?? []), ...(a.notes ?? [])]} />
            </span>
          ))}
        </div>

        {/* Affiliations */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-slate-600">
          {paper.affiliations.map((aff) => (
            <span key={aff.id} className="text-base">
              <sup className="text-indigo-600">{aff.id}</sup>
              {aff.name}
            </span>
          ))}
        </div>

        {/* Author notes */}
        {paper.authorNotes.length > 0 && (
          <div className="mt-2 text-sm text-slate-500">
            {paper.authorNotes.join("   ·   ")}
          </div>
        )}

        {/* Links */}
        {paper.links.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {paper.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600 hover:shadow-md"
              >
                <Icon name={l.icon} />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
