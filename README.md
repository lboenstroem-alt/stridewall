# Stridewall — Website

Marketing site for Stridewall, an AI consultancy for German SMEs.

## Stack

- [Astro](https://astro.build) — static output, zero client-side JavaScript
- Tailwind CSS 4
- Self-hosted fonts (Cormorant Garamond + IBM Plex Sans, woff2, latin + latin-ext) — no CDN calls of any kind
- German default at `/`, English under `/en/`
- No analytics, no cookies, no cookie banner

## Editing content

All copy lives in Markdown under `src/content/` — pages in
`src/content/pages/{de,en}/`, the four method steps in
`src/content/steps/{de,en}/`. Components never contain copy.

Open TODOs are marked `TODO:` in the content files (Impressum, Datenschutz,
booking link). Search for `TODO` before considering the site final.

## Commands

```sh
npm install
npm run dev      # dev server on :4321
npm run build    # regenerates OG images, builds to dist/
npm run preview
```

## Deployment

Hosted on GitHub Pages. Every push to `main` runs
[.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the
site and publishes `dist/`.

The domain `stridewall.com` is registered at Squarespace, which acts as
registrar and DNS host only. Its DNS points `@` at the four GitHub Pages A
records and `www` at `lboenstroem-alt.github.io`; GitHub redirects `www` to the
apex and issues the TLS certificate. `public/CNAME` is what tells GitHub Pages
which domain to serve — deleting it would drop the custom domain on the next
deploy.
