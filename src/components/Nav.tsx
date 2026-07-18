import { paper } from "@/content/paper";

const items = [
  { id: "abstract", label: "Abstract" },
  { id: "method", label: "Method" },
  { id: "results", label: "Results" },
  { id: "bibtex", label: "BibTeX" },
];

export function Nav() {
  const shownItems = paper.results.comparisons.length === 0 && paper.results.videos.length === 0
    ? items.filter((i) => i.id !== "results")
    : items;

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="truncate text-sm font-semibold text-slate-900">
          {paper.title.split(":")[0]}
        </a>
        <div className="hidden gap-5 text-sm text-slate-600 sm:flex">
          {shownItems.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="transition hover:text-indigo-600"
            >
              {i.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
