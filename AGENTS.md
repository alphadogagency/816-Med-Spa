# Deployment

- The live site uses Cloudflare Pages project `816-med-spa`.
- After an authorized production update is committed and pushed to `main`, run
  `npm run deploy` and verify the changed live URL. The GitHub repository transfer
  broke automatic deployment; pushing to GitHub alone does not publish the site.
- Deployment uses the existing Wrangler login. Never commit or print credentials.
- See `docs/deployment.md` for the account, authentication, and publishing workflow.

## Deferred follow-up

- On October 21, 2026, Bryan asked to leave automatic GitHub-to-Cloudflare
  deployment repair for a future visit. Bring this up when he returns for another
  website edit; do not treat today's accessibility-page discussion as approval to
  work on automatic deployment. Continue using the direct-deploy workflow meanwhile.
