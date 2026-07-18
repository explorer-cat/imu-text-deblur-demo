interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  /** Subtle alternating background for visual rhythm. */
  tinted?: boolean;
}

export function Section({ id, title, children, tinted }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-14 sm:py-16 ${tinted ? "bg-slate-50" : ""}`}
    >
      <div className="mx-auto max-w-4xl px-5">
        {title && (
          <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
