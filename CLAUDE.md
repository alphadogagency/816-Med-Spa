# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing website for **816 Med Spa** (aesthetic med spa, Kansas City). Static Astro site deployed to Cloudflare Pages. Requires Node >= 22.12.0.

## Commands

```sh
npm run dev              # dev server at localhost:4321
npm run build            # production build to ./dist/
npm run preview          # preview the build locally
npm run astro check      # type-check .astro files (uses @astrojs/check)
npm run deploy          # build and publish main to the existing Cloudflare Pages project
```

There is no test suite or linter configured. `astro check` is the closest thing to a verification step.

The repository moved to `alphadogagency/816-Med-Spa`, but Cloudflare's old Git connection no longer triggers builds. After committing and pushing an authorized production update to `main`, run `npm run deploy` and verify the changed live URL. This uses the existing Wrangler login; no credentials belong in the repository. See `docs/deployment.md`.

## Architecture

- **Astro 6 + Tailwind CSS v4 + MDX**, built as static marketing pages in `dist` and uploaded to Cloudflare Pages.
- **Pages** are file-based routes in `src/pages/` (`index.astro`, `contact-us.astro`, `about-us/meet-the-doctor.astro`).
- **`BaseLayout.astro`** wraps every page: sets all SEO/OG/Twitter meta from `title`/`description`/`canonical` props, loads Google Fonts, imports global CSS, and contains the global **scroll-reveal** IntersectionObserver script.
- **Page composition pattern**: a page imports `SiteHeader`, a series of `*Section.astro` components, `SiteFooter`, and `QuizTab`, then arranges them inside `BaseLayout`. Each section is self-contained — its content data (e.g. the services/conditions array, testimonials) is defined as a local const in the component's frontmatter, not fetched or centralized.

## Conventions that matter

- **Tailwind v4 theme tokens are defined in two places that MUST stay in sync**: `src/styles/global.css` (`@theme` block — the source consumed at build time) and `src/lib/theme.config.ts` (a TS mirror). Both files carry comments saying "keep in lockstep." `global.css` is authoritative — it's what actually renders. When changing colors/fonts/radius, update `global.css` first, then mirror the change into `theme.config.ts`. The active fonts are **Cormorant Garamond** (display) and **Montserrat** (body).
- **Custom color tokens** (use these, not raw hex): `sage`, `lavender`, `cream`, `bone`, `parchment`, `ink`, `espresso`, `gold`. **Font utility classes**: `font-display`, `font-body`, `font-serif-italic`, `font-sans-wide`, `font-dm-sans`, `font-script`. Headings get the display serif (italic, weight 300) automatically via the base layer.
- **Scroll-reveal animations**: add `data-reveal` (or `data-reveal="fade-left"` / `"fade-right"`) to any element to fade/slide it in on scroll. Stagger with inline `style="--reveal-delay: 120ms"`. The observer logic lives in `BaseLayout.astro` and respects `prefers-reduced-motion`.
- **Interactive components** (e.g. `SiteHeader`) put behavior in an Astro `<script>` tag using `data-*` attributes as hooks (`data-site-header`, `data-mobile-menu`, etc.), not framework state. The header is scroll-aware: transparent/light over the hero, switches to a solid white/dark state on scroll via `setHeaderAtTop()` toggling classes.
- **External booking link**: appointments go to `https://816medspa.janeapp.com/` (JaneApp). It appears as the "Request An Appointment" CTA in the header (and elsewhere) — reuse this URL rather than inventing one.
- **Images**: local assets in `public/images/` (condition SVG icons under `public/images/conditions/`); some section imagery is pulled from Unsplash via a small `unsplash(id)` helper in the component frontmatter.

## Section navigation

The single-page homepage uses anchor IDs (`#about`, `#services`, `#conditions`, `#treatments`, `#gallery`) referenced by the header nav. Note `#conditions` is labeled "Concerns" in the nav. Some nav targets (Services/Treatments/Gallery) are placeholders without corresponding sections yet.
