# Deployment

- The live site uses Cloudflare Pages project `816-med-spa`.
- After an authorized production update is committed and pushed to `main`, run
  `npm run deploy` and verify the changed live URL. The GitHub repository transfer
  broke automatic deployment; pushing to GitHub alone does not publish the site.
- Deployment uses the existing Wrangler login. Never commit or print credentials.
- See `docs/deployment.md` for the account, authentication, and publishing workflow.

## Scoped agency edits

- Preserve the approved design and apply the relevant requirements from the
  [shared standards guide](/Users/bryanarambula/.codex/skills/website-task-execution/references/agency-standards.md),
  [ADA Design and Build Standard v1.1](/Users/bryanarambula/.codex/skills/website-task-execution/references/ada-design-standards.md),
  and [ADA Web Launch Checklist, reviewed 2026-10-19](/Users/bryanarambula/.codex/skills/website-task-execution/references/ada-website-guidelines.md).
  A scoped edit is not a whole-site launch audit.
- Use the built-in browser first for desktop, intermediate, and phone checks.
  Disclose unavailable capabilities and coordinate any necessary Chrome takeover.
- The current assignment and verification record are maintained in `CLAUDE.md`.

## Deferred follow-up

- On October 21, 2026, Bryan asked to leave automatic GitHub-to-Cloudflare
  deployment repair for a future visit. Bring this up when he returns for another
  website edit; do not treat today's accessibility-page discussion as approval to
  work on automatic deployment. Continue using the direct-deploy workflow meanwhile.
