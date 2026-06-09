# SuiMesh Static Preview Site

> 🎨 **This is the SuiMesh design file.**
> 
> The next generation Internet is a multi-agent cooperative Internet.

This repository is a static HTML/CSS preview site for SuiMesh. It does not require
Next.js, Node.js, or a build step to preview or deploy.

## Included

- Static HTML pages: `index.html`, `build.html`, `discover.html`,
  `developers.html`, `ecosystem.html`, and `protocol.html`
- Image and logo assets under `assets/` and `public/`
- GitHub Pages deployment workflow in `.github/workflows/deploy.yml`
- Responsive layout for desktop, tablet, and mobile

## Placeholder Behavior

The original reference does not provide real destinations, so all links currently point to `#` as placeholders.

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
cd repo-inspect-world-online
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173`.

## Deployment

The site is ready for GitHub Pages as static files. The workflow uploads the
repository root, so the HTML files and asset folders must remain at the top
level unless the workflow is updated.

## Future Backend Work

You can add backend code later without changing the static preview flow. A safe
path is to keep this static site at the repository root and add backend code in
a separate folder such as `api/`, `server/`, or `backend/`, then update the
deployment workflow when the backend target is chosen.
