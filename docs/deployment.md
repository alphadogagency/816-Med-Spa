# Production deployment

The live site is hosted on **Cloudflare Pages**, project `816-med-spa`, in the
agency's Cloudflare account (`ea6886430ff777f0b690f6805628cecd`). The production
branch is `main`, the build command is `npm run build`, and the asset directory
is `dist`.

## Publish from this checkout

After committing and pushing the intended changes to `main`, run:

```sh
npm run deploy
```

This builds the site and directly uploads the assets to the existing production
Pages project. The deployment records the current Git commit. The deploy script
requires a clean `main` branch and explicitly selects the agency account.

Wrangler uses the existing local Cloudflare login. On a new computer, authenticate
with `npx wrangler login` using an account with access to this Pages project.
For an unattended environment, Wrangler also accepts `CLOUDFLARE_API_TOKEN` from
the process environment; it requires Cloudflare Pages Edit access to this account.
Keep credentials out of tracked files and terminal output.

After publishing, verify the changed page at `https://www.816medspa.com/`.
A successful Git push alone does not establish that the live site has updated.

## Repository transfer

On October 21, 2026, the repository was confirmed at
`https://github.com/alphadogagency/816-Med-Spa`, while Cloudflare's Git integration
still recorded `bryguy-404/816-Med-Spa`. The privacy-policy commit did not trigger
a build. Direct publication with Wrangler is the current deployment workflow;
the old automatic Git connection has not been repaired by this setup.

The direct upload uses the existing Pages project and preserves its domains.
Cloudflare documents this workflow for Git-integrated projects:
https://developers.cloudflare.com/pages/get-started/direct-upload/
