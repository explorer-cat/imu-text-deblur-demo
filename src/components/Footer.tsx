import { paper } from "@/content/paper";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-4xl px-5 text-center text-sm text-slate-500">
        {paper.acknowledgements && (
          <p className="mx-auto mb-4 max-w-2xl leading-relaxed">
            {paper.acknowledgements}
          </p>
        )}
        <p>
          Project page template · built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-2 hover:text-indigo-600"
          >
            Next.js
          </a>{" "}
          &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
