# Union EV website

The marketing site for Union Electric Vehicle Charging: managed EV charging for residential sites, workplaces, destinations and fleet depots. It is a single home page, a privacy notice, a thank-you page and a 404, with an enquiry form that emails the team.

## How it is built

- **SvelteKit, prerendered to static files.** `adapter-static` writes plain HTML and CSS to `build/`. Svelte ships no runtime to the browser (`csr = false` in `src/routes/+layout.ts`).
- **Two tiny inline scripts** (`src/lib/client/site.js` for the menu, FAQ and audience disclosures and the image fallback; `enquiry.js` for the form) are minified and inlined into the pages. Everything except the form's robot check reads and works without JavaScript.
- **Cloudflare Workers** hosts it (`wrangler.jsonc`). The Worker in `worker/` serves the built files, stamps the home page for the enquiry form, and handles `POST /api/enquiry`.
- **Enquiry emails** go through Brevo behind an `EmailProvider` interface (`worker/email/`), so another provider is one new file and one `case`.
- **Self-hosted everything:** Inter via `@fontsource-variable/inter`, and photos as responsive AVIF/WebP in `src/lib/images/`. There are no third-party requests, apart from Cloudflare Turnstile, which loads when someone starts the form.
- **CSS** follows CUBE CSS (see [CSS conventions](#css-conventions)). There is no CSS framework.

## Project layout

| Path                  | What is there                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/routes/`         | Pages (`+page.svelte`, `privacy/`, `thank-you/`, `+error.svelte`), the sitemap, and the e2e tests           |
| `src/lib/components/` | Svelte components, each with its own scoped block styles                                                    |
| `src/lib/content/`    | Site copy and data as TypeScript: `site.ts` (name, email, Turnstile key, claims), FAQs, audiences, partners |
| `src/lib/enquiry/`    | `schema.ts`: the form's fields, limits and validation, shared by the page and the Worker                    |
| `src/lib/client/`     | The browser scripts, plain JavaScript                                                                       |
| `src/styles/`         | Tokens and the global CSS layers                                                                            |
| `worker/`             | The Cloudflare Worker: enquiry API, page stamping, rate limits, email, Turnstile check                      |
| `static/`             | Copied as-is: favicon, OG image, `robots.txt`, web manifest, `_headers`                                     |
| `docs/`               | Plans and audits: [open points](docs/open-points.md) lists what is still to do before launch                |

## Getting started

Needs Node 22 or later.

```sh
npm install
npm run dev          # Vite dev server
npm run build        # prerender to build/
npm run preview      # serve build/ with Vite
npm run preview:cf   # serve build/ through the Worker, as in production (build first)
```

`npm run dev` and `npm run preview` do not run the Worker, so the form cannot be sent there. Use `npm run preview:cf` for that. It needs the Worker's secrets: copy `.dev.vars.example` to `.dev.vars` (ignored by git). The example holds Cloudflare's always-pass Turnstile test secret and a throwaway form secret; put a Brevo API key and a sender and recipient you can read in it to receive real emails.

Other scripts: `npm run check` (svelte-check), `npm run lint` (Prettier and ESLint), `npm run format`.

## The enquiry form

The form on the home page posts to `/api/enquiry`. The Worker validates it (with `schema.ts`, the only validator), then emails the team and, in most cases, a confirmation to the visitor.

- **With JavaScript**, Turnstile runs in the background and the form posts with fetch, showing errors in an accessible summary.
- **Without JavaScript**, the browser posts the form itself. Turnstile cannot run, so the Worker checks a signed timestamp instead. It stamps the home page with one as it serves it (`worker/formToken.ts`), and the post must come back between 15 seconds and 24 hours later. Those enquiries also need a clean honeypot field and no web links in the text fields, have stricter rate limits, and get no confirmation email. A post that needs another go gets the form back from the Worker with the visitor's answers kept.
- **Rate limits** (per IP, and per recipient for the confirmation) are Cloudflare Rate Limiting bindings in `wrangler.jsonc`.

Because the Worker serves `/`, the home page is not cached. See [docs/open-points.md](docs/open-points.md) for the remaining bot-protection work.

## Testing

```sh
npm run test       # installs Playwright's browsers, builds, previews and runs everything
```

The Playwright tests in `src/routes/` and `worker/` cover axe accessibility checks (WCAG 2.2 AA), keyboard use, the enquiry form (with Turnstile and the Worker stubbed), the pages with JavaScript off, and the Worker itself, which is called directly with email, Turnstile and rate limits stubbed. The tests run against `vite preview`, not the Worker.

## Deploying

```sh
npm run build
npm run deploy     # wrangler deploy
```

Before the first deploy, set the Worker's secrets with `npx wrangler secret put <NAME>`: `BREVO_API_KEY`, `TURNSTILE_SECRET` and `FORM_SECRET` (a long random string, for example from `openssl rand -hex 32`). The sender, recipient and email provider are plain variables in `wrangler.jsonc`, and the public Turnstile site key is in `src/lib/content/site.ts`. The site currently deploys as a noindex preview (`static/_headers`). [docs/open-points.md](docs/open-points.md) lists what to finish before launch.

## CSS conventions

The CSS follows [CUBE CSS](https://cube.fyi): Composition, Utility, Block, Exception. Global styles and the cascade do most of the work; blocks hold only what makes a component unique. The migration is described in [docs/cube-css-migration.md](docs/cube-css-migration.md).

### Where rules live

`src/styles/global.css` imports these in order, with single-class selectors and no `@layer`:

| File               | Holds                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens.css`       | Design tokens: colour roles (`--color-<role>`), type (`--text-*`, `--leading-*`) and space (`--space-*`) scales, radii, shadows                                     |
| `base.css`         | Reset and element defaults (headings, form controls, focus ring)                                                                                                    |
| `compositions.css` | Layout: `wrapper`, `region`, `flow`, `cluster`, `repel`, `switcher`, `grid`, `with-icon`                                                                            |
| `utilities.css`    | One job each (`text-sm`, `color-muted`, `bg-brand`, …) and the `theme-dark` context                                                                                 |
| `blocks/*.css`     | Blocks used by markup in more than one component: `button`, `card`, `check-list`, `section-head`                                                                    |
| Svelte `<style>`   | Component blocks. They load later and carry Svelte's hash class, so they win over the layers above; keep only decoration and layout that is unique to the component |

### Rules

- **Colours are roles, never swatches.** Use `--color-text-muted`, not a grey. A dark context reassigns roles (`.theme-dark`), so blocks need no dark variants. Keep `--color-brand` in sync with `theme-color` in `src/routes/+layout.svelte` and `theme_color` in `static/site.webmanifest`.
- **Type and space come from the scales.** No literal `font-size`, `line-height` or spacing in blocks.
- **Exceptions are data attributes**, not modifier classes: `data-variant="outline"`, `data-size="sm"`, `data-state="failed"`, `data-layout="thirds"`. State from JavaScript is an attribute too (`aria-expanded`, `hidden`).
- **Compositions are tuned with custom properties**: `--flow-space`, `--region-space`, `--wrapper-max`, `--cluster-gap`, `--gap`, `--grid-cols`. Custom properties inherit, so give every `.flow` its own `--flow-space`.
- **Order classes** block, composition, utility:
  ```html
  <div class="card flow text-center shadow-sm"></div>
  ```
- **Add a utility only once it is used three times.** Until then the declaration stays in the block. A block must not set a property that a utility on the same element controls, because the block would win.
