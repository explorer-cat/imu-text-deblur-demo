# Research Project Page

A demo/landing page for a research paper — the kind of page you'd host at
`<lab>.github.io/<paper>-site` (title, authors, abstract, method, qualitative
results with before/after sliders, and a copy-able BibTeX). Built with
**Next.js (App Router) + Tailwind CSS**.

## Quick start

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## Editing content — the one file that matters

All page content lives in **`src/content/paper.ts`**. Edit that single file to
fill in your paper — the layout, styling, and components read from it. Setting a
field to `""` or `[]` hides the corresponding UI (e.g. an empty `links` array
removes the button row; empty `results` removes the Results section).

| Section    | Field in `paper.ts`      |
|------------|--------------------------|
| Title/venue| `title`, `venue`         |
| Authors    | `authors`, `affiliations`, `authorNotes` |
| Buttons    | `links` (Paper / arXiv / Code / Video / Dataset) |
| Teaser     | `teaserImage` **or** `teaserVideo`, `teaserCaption` |
| Abstract   | `abstract`               |
| Method     | `method` (figure + paragraphs) |
| Results    | `results.comparisons` (sliders), `results.videos` |
| Citation   | `bibtex`                 |

## Adding your own images / videos

Drop files under `public/` and reference them by path from `paper.ts`:

```
public/
  assets/            # figures (teaser, method diagram, before/after)
  results/           # your result images & mp4 videos
```

e.g. `before: "/results/scene1_input.png"`, `src: "/results/demo.mp4"`.
The placeholders in `public/assets/*.svg` are safe to delete once replaced.

## Structure

```
src/
  content/paper.ts     # ← edit this
  app/
    layout.tsx         # metadata (reads title/abstract from paper.ts)
    page.tsx           # section order
  components/          # Hero, Abstract, Method, Results, CompareSlider, BibTeX, ...
```

## Deploying as a static site (e.g. GitHub Pages)

The page is fully static. To export a static bundle, add to `next.config.ts`:

```ts
const nextConfig = { output: "export", images: { unoptimized: true } };
```

then `npm run build` produces an `out/` folder you can host anywhere. (If
deploying under a subpath like `user.github.io/repo`, also set `basePath` and
`assetPrefix` to `"/repo"`.)
