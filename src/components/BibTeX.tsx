"use client";

import { useState } from "react";
import { paper } from "@/content/paper";
import { Section } from "@/components/Section";
import { CopyIcon, CheckIcon } from "@/components/icons";

export function BibTeX() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(paper.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard may be unavailable (e.g. insecure context); ignore.
    }
  };

  return (
    <Section id="bibtex" title="BibTeX">
      <div className="relative mx-auto max-w-3xl">
        <button
          onClick={copy}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
          aria-label="Copy BibTeX to clipboard"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className="overflow-x-auto rounded-xl bg-slate-900 p-5 pr-20 text-left text-sm leading-relaxed text-slate-100">
          <code>{paper.bibtex}</code>
        </pre>
      </div>
    </Section>
  );
}
