# naturesbounty.lib.unb.ca

UNB Libraries' presentation of Dr. C. Mary Young's *Nature's Bounty: Four Centuries of
Plant Exploration in New Brunswick* — a small, static Nuxt 4 site with no backend, API, or
database.

## Getting started

Copy `.env` values as needed first — `NUXT_PORT` and `NUXT_SITE_URI` drive the dev server's
host/port, public URL, and Vite HMR websocket (defaults to `localhost:3000` if unset).

### Run with Docker

Requires only [Docker](https://www.docker.com) — the container brings its own Node and pnpm.

```bash
docker compose up
```

This bind-mounts `app/`, `public/`, `nuxt.config.ts`, `package.json`, and `pnpm-lock.yaml`
into the container and runs `pnpm dev` inside it, exposing `NUXT_PORT` (3098 by default) and
its HMR websocket on `NUXT_PORT * 10` (30980). Once you have pnpm on the host,
`pnpm container:start` is the same command.

### Run locally

Requires [Node.js](https://nodejs.org) `^20.19 || >=22.12` (Vite 7's floor — the Docker
images use Node 26) and [pnpm](https://pnpm.io) 11.10.0.

```bash
pnpm install
pnpm dev
```

pnpm is most easily installed through Corepack, which picks up the version pinned by
`packageManager` in `package.json`:

```bash
corepack enable pnpm
```

If the Node.js your system provides is older than the range above, install a current
release with a version manager such as [fnm](https://github.com/Schniz/fnm),
[nvm](https://github.com/nvm-sh/nvm), [Volta](https://volta.sh), or
[mise](https://mise.jdx.dev) rather than replacing the system package.

### Configuration

Settings are defined in `nuxt.config.ts`. `NUXT_PORT` and `NUXT_SITE_URI` are read from
`.env` for local development; in production they're set directly as container environment
variables in the `Dockerfile`.

## Development

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build (SSR output) |
| `pnpm generate` | Static site generation — this is what the production Docker image uses |
| `pnpm preview` | Preview a production build locally |
| `pnpm lint` / `pnpm lint:fix` | ESLint (`@antfu/eslint-config`) over the whole repo |

Husky git hooks enforce code quality on commit: `pre-commit` runs `lint-staged` (ESLint
`--fix` on staged files), `commit-msg` runs `commitlint` against Conventional Commits,
restricted to the types in `commitlint.config.ts` (`feat`, `fix`, `perf`, `refactor`,
`test`, `ops`, `docs`).

There is no test setup configured in this repo.

### Structure

- `app/pages/*.vue` — file-based routes: `index.vue`, `foreword.vue`, `gallery.vue`,
  `biography.vue`, `credits.vue`. Each sets its own title via `useHead({ title: '...' })`;
  the global title template is set in `nuxt.config.ts`.
- `app/layouts/default.vue` — the single shell (banner/logo, nav, `<slot />`).
- `app/assets/css/main.css` — Tailwind CSS v4 theme tokens (`@theme`) and global element
  styling (headings, links, lists), consumed as utility classes (e.g. `bg-page`,
  `text-link`, `font-heading`). No `tailwind.config.js` — v4 uses CSS-based config.
- `app/pages/gallery.vue` — a plain array of `{ file, caption }` entries backing a grid of
  thumbnails, each linking to its full-size image under `public/images/gallery/`.
- `app/components/GalleryLightbox.vue` — replaces the production site's jQuery colorbox
  with a native `<dialog>`, which supplies the modal overlay, `Esc` to close, focus
  trapping and top-layer stacking without a dependency. Matches colorbox's behaviour:
  one gallery group across all images, caption plus `{current} of {total}` counter,
  prev/next (also bound to the arrow keys, with neighbours preloaded), and close on
  overlay click. Displays the `display/` derivative and adds a "Download full size" link
  to the original, renamed after the caption. The thumbnail anchors keep their
  real `href`, so the grid still resolves to the full-size images without JavaScript.
- `public/files/` — source documents (`natures-bounty.pdf`, `natures-bounty.epub`),
  referenced by absolute path (e.g. `/files/natures-bounty.pdf`). Unlike
  `educationhistory.lib.unb.ca`, there is no HTML edition of the book.
- `public/images/gallery/` — full-size plant illustration scans (1800x2700, ~1MB each),
  linked for download. Two committed derivative sets sit beside them, since the production
  image is static nginx with no runtime image server: `thumbs/` for the grid, and
  `display/` (1400px tall, ~150KB) for the lightbox. Regenerate `display/` after adding a
  scan with:

  ```bash
  cd public/images/gallery
  for f in *.jpg; do convert "$f" -resize x1400 -strip -interlace Plane -quality 85 "display/$f"; done
  ```

## Deployment

`.github/workflows/deployment-workflow.yaml` calls the shared pipeline in
[`unb-libraries/github-workflows`](https://github.com/unb-libraries/github-workflows): build
the image, push it to GHCR, then `kubectl set image` on the Kubernetes deployment. A push to
`dev` deploys to the `dev` namespace as `dev-naturesbounty.lib.unb.ca`; the `prod` branch
still holds the Drupal build and deploys prod on its own workflow.

The `Dockerfile` runs `pnpm generate` in a throw-away stage and serves the result from
[`ghcr.io/unb-libraries/nuxt-ssg`](https://github.com/unb-libraries/docker-nuxt-ssg), which
carries the nginx configuration for a generated Nuxt site. `scripts/verify-generate.mjs`
fails the build if any route was not prerendered — this site has no content collection, so
that script lists the routes directly and needs editing when a page is added.

Because the site is generated statically, any change to pages or content requires a
rebuild to take effect in production — there is no server-side rendering at runtime.

## Entry points

- `/` — home page: embedded PDF and download links.
- `/foreword` — foreword by Dr. James Goltz.
- `/gallery` — grid of plant illustration thumbnails; opens a `<dialog>` lightbox with
  prev/next and a full-size download, and falls back to a direct image link without JS.
- `/biography` — biography of C. Mary Young.
- `/credits` — credits page.
- `/files/natures-bounty.pdf`, `/files/natures-bounty.epub` — the book's source documents.
