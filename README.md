# Stridewall — Website

Marketing site for Stridewall, an AI consultancy for German SMEs.
Built to the spec in [BRIEF.md](./BRIEF.md).

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

Hosted on Vercel; every push to `main` redeploys. Domain `stridewall.com` is
registered at Squarespace (registrar only) — DNS points A `@` → Vercel and
CNAME `www` → Vercel; `www` 301s to the apex (see `vercel.json`).
