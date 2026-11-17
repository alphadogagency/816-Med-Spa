# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current assignment — November 17, 2026

- Assignment: `2026-11-17/816-medspa/allee-team-update`.
- Target: `https://www.816medspa.com/about-us/meet-the-team/` in this repository.
- Authorized result: add Allee Hill, Licensed Esthetician, with the supplied full
  three-paragraph bio and original headshot; remove Hailey's current staff entry;
  commit/push the scoped update and publish through `npm run deploy`.
- Source: Ashley Bosserman's November 16 “New Esthetician” email. The coordinator's
  private source bundle is `daily-2026-11-16/816-medspa-allee/`: `source-email.txt`
  is approved copy; `IMG_7570 (2).HEIC` is the actual supplied headshot. Preserve
  originals outside this website repository; the signature logo is not a headshot.
- Preserve all other staff, historical testimonial quotations, design, forms and
  integrations. Previous privacy/accessibility work is complete. Automatic
  deployment repair, calendar changes and stakeholder messages are excluded.
- Standards: ADA Design and Build Standard v1.1 and Web Launch Checklist reviewed
  2026-10-19 (maintained references in `AGENTS.md`). Apply content accuracy, image
  optimization/alt text, affected layout/accessibility and link checks only.
- Initial checkpoint: local/remote `main` matched `c9731a5` and checkout was clean.
  Source bio and original photo are accessible. Current staff entry found only on
  the team page; other Hailey mentions are historical testimonials and stay intact.
- Portability: installation receipt and shared registry checked. This project is
  not registered in the shared workflow; no cross-provider readiness is claimed.
  Shared-library registration is outside this scoped staff change.
- Completion criteria: exact three-paragraph bio, correct supplied portrait,
  unchanged other staff, no Hailey staff card, successful build/check, responsive
  browser review where available, and live page/image verification after deploy.
- Implementation checkpoint: Allee replaces Hailey in the existing staff layout;
  all three source paragraphs match verbatim. The other three staff entries and
  historical testimonials are byte-for-byte unchanged. The portrait was rotated
  from EXIF orientation, cropped to 4:5, resized to 960×1200, and exported as a
  49,994-byte WebP with no EXIF metadata; alt text is the supplied “Allee Hill”.
- Checks: `npm run astro check` passed (46 files, no errors/warnings/hints),
  `npm run build` passed (106 pages), and `git diff --check` passed. Preview page
  and image are served at `http://127.0.0.1:4341/about-us/meet-the-team/`.
  All 86 unique internal page destinations in the rendered page returned HTTP 200;
  the booking destination remains `https://816medspa.janeapp.com/`. The served
  portrait bytes match the prepared asset. These are scoped checks, not a launch audit.
- Browser access recovered after opening this chat. Coordinator owns responsive
  preview and live browser review; this chat remains the sole code editor.
- Coordinator's built-in-browser review passed at 1440×1000, 1024×900, and
  390×844: upright/correct portrait crop, readable full bio, correct title, and no
  Hailey staff entry. Evidence is in the private coordinator record under
  `daily-2026-11-17/816-medspa/{desktop-preview,tablet-preview,mobile-photo-preview,mobile-bio-preview}.jpg`.
  At 390px, an existing offscreen reveal/backplate creates 399px document width;
  the coordinator reproduced the same result on the pre-edit live page. Allee's
  settled content fits. Leave this unrelated existing behavior unchanged.
- Publication: website commit `5626e4f` pushed to `main`; `npm run deploy`
  successfully published Cloudflare Pages deployment `8f6f46bc` at
  `https://8f6f46bc.816-med-spa.pages.dev` on November 17, 2026.
- Live HTTP verification passed at the production team URL: all three bio
  paragraphs, Licensed Esthetician title, factual image alt, other staff present,
  no Hailey staff entry, and exact optimized portrait bytes.
- Coordinator's final live IAB check passed: Sydney, Allee, Jessica and Ashley
  headings present; Hailey absent; portrait loaded at 960×1200; all three Allee bio
  paragraphs rendered, including the final paragraph at settled opacity 1. Live
  evidence: private coordinator `daily-2026-11-17/816-medspa/live-desktop.jpg`.
  Viewport overrides reset. No physical-device or whole-site compliance claim.
- Status: complete, deployed and live-verified. No Calendar or external stakeholder
  messages sent by this project chat. The publication
  above is the website change; any later documentation-only checkpoint does not
  change deployed assets.

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
