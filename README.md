# SuiMesh Static Preview Site

> 🎨 **This is the SuiMesh design file.**
> 
> The next generation Internet is a multi-agent cooperative Internet.

This repository is a static HTML/CSS preview site for SuiMesh. It does not require
Next.js, Node.js, or a build step to preview or deploy.

## Included

- Static HTML pages: `index.html`, `build.html`, `discover.html`,
  `developers.html`, `ecosystem.html`, `protocol.html`, `docs.html`,
  and `terms.html`
- Image and logo assets under `assets/` and `public/`
- GitHub Pages deployment workflow in `.github/workflows/deploy.yml`
- Responsive layout for desktop, tablet, and mobile

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
cd repo-inspect-world-online
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173`.

## Deployment

The site is deployed to Vercel as a static production site.

- Production alias: https://repo-inspect-world-online.vercel.app
- Latest deployment inspect URL:
  https://vercel.com/sui-mesh/repo-inspect-world-online/715bz9WPfkiKNYU2scvnc1neG976

The project is linked to Vercel as `repo-inspect-world-online`. The HTML files
and asset folders should remain at the repository root unless the Vercel
configuration is updated.

## Future Backend Work

You can add backend code later without changing the static preview flow. A safe
path is to keep this static site at the repository root and add backend code in
a separate folder such as `api/`, `server/`, or `backend/`, then update the
deployment workflow when the backend target is chosen.
