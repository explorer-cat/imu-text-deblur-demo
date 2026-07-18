import { paper } from "@/content/paper";
import { Section } from "@/components/Section";
import { CompareSlider } from "@/components/CompareSlider";

function MetricsTable({ t }: { t?: import("@/content/paper").ResultsTable }) {
  if (!t) return null;
  return (
    <figure className="mx-auto mb-12 max-w-2xl">
      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-900 text-slate-100">
              {t.headers.map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-semibold ${i === 0 ? "text-left" : "text-right"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row, ri) => {
              const hl = ri === t.highlightRow;
              return (
                <tr
                  key={ri}
                  className={`border-t border-slate-200 ${
                    hl ? "bg-indigo-50 font-semibold text-indigo-900" : "text-slate-700"
                  }`}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-2.5 tabular-nums ${ci === 0 ? "text-left" : "text-right"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {t.caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-500">
          {t.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Results() {
  const { heading, intro, table, ocrTable, figures, comparisons, videos } = paper.results;
  const figs = figures ?? [];
  if (!table && !ocrTable && figs.length === 0 && comparisons.length === 0 && videos.length === 0)
    return null;

  return (
    <Section id="results" title={heading} tinted>
      {intro && (
        <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">{intro}</p>
      )}

      <MetricsTable t={table} />

      {figs.map((figure) => (
        <figure key={figure.src} className="mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={figure.src}
            alt={figure.caption}
            className="mx-auto w-full rounded-xl border border-slate-200 bg-white shadow-sm"
          />
          <figcaption className="mt-3 text-center text-sm text-slate-500">
            {figure.caption}
          </figcaption>
        </figure>
      ))}

      <MetricsTable t={ocrTable} />

      {comparisons.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2">
          {comparisons.map((c) => (
            <CompareSlider key={c.label} item={c} />
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {videos.map((v) => (
            <figure key={v.label}>
              <video
                className="w-full rounded-xl border border-slate-200 shadow-sm"
                src={v.src}
                poster={v.poster}
                controls
                loop
                muted
                playsInline
              />
              <figcaption className="mt-3 text-center text-sm text-slate-600">
                {v.label}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </Section>
  );
}
