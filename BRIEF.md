# Stridewall — Website Build Brief

Drop this file in the repo root as `BRIEF.md` and point Claude Code at it.
Everything below is a decision already made, not an option to explore.

---

## 1. What this is

A small marketing site for **Stridewall**, an AI consultancy working with German
small and medium enterprises. Five pages. German first, English second. No blog,
no case-study library, no team grid with stock photos. The site's only job is to
make a Geschäftsführer or Vorstand comfortable enough to book a 30-minute call.

**Audience:** decision-makers at German Mittelstand firms and small listed
companies — CFOs, Vorstände, Geschäftsführer. Aged 40–60. Conservative buyers.
They are not impressed by gradients, glassmorphism, or the word "revolutionise".

**What convinces them:** specific numbers, a clear method, and evidence that we
understand German legal reality better than a generic agency does.

---

## 2. Positioning — get this right or the rest doesn't matter

**Do not** position as "we help you automate away headcount." Every instinct
will pull that way because it is the blunt version of the value. It is also the
version that makes employees stop answering questions honestly, and honest
answers are the raw material of the whole business.

**Position as:** organisations are already using AI, without rules and without
method. We find out how work actually happens, make it faster, and make it
defensible.

**The opening argument, drawn from real fieldwork:**

> In our first engagement, nine out of ten employees were already using AI at
> work. Six of them could not say which company data they were allowed to enter.
> Average self-rated skill: 2.3 out of 5. Nobody above 3.

That is the hook. It is true, it is specific, and every German company reading
it recognises itself.

**The proof point:**

> One department head had already cut a daily three-to-four-hour analysis to one
> or two hours, on his own initiative. Roughly thirteen hours a week recovered by
> one person, before we changed anything.

**IMPORTANT — client confidentiality.** Do not name the client anywhere on the
site. They are a listed company; naming them without written permission creates
both a commercial and a capital-markets problem. Refer to them as "a listed
German real-estate group" until they sign a written reference approval.

---

## 3. Voice

Plain, declarative, unhurried. Short sentences. No exclamation marks. No
"unlock", "supercharge", "game-changing", "journey", "empower". No em-dash
soup. Write as if a sceptical CFO is reading and looking for a reason to stop.

German copy must read as German, not as translated English. If a sentence needs
a relative clause to be correct German, use one.

---

## 4. Sitemap

| Route | German | Purpose |
|---|---|---|
| `/` | Startseite | Problem → method → proof → CTA |
| `/vorgehen` | Vorgehen | The four steps, expanded |
| `/ki-verordnung` | KI-Verordnung | AI Act obligations for deployers |
| `/ueber-uns` | Über uns | Who we are, honestly |
| `/kontakt` | Kontakt | Email + booking link |
| `/impressum` | Impressum | **Legally required** |
| `/datenschutz` | Datenschutz | **Legally required** |

English mirrors at `/en/...`. German is the default at the root.

### `/` Startseite
1. Hero — one sentence on what we do, one line of sub-copy, one CTA button.
2. The gap — the 9-of-10 / 6-of-9 / 2.3-of-5 statistics as three plain stat
   blocks. No animation, no count-up effect.
3. What we do — the four steps as a numbered row, one sentence each.
4. Proof — the thirteen-hours-a-week block, anonymised.
5. Why now — two sentences on Article 4 of the EU AI Act, linking to
   `/ki-verordnung`.
6. CTA — book a call.

### `/vorgehen`
The four steps at ~150 words each. No dates or week numbers anywhere —
timelines depend on whether the client has a works council, and we do not want
to be held to a number we cannot control.

1. **Einrichtung** — tenant, SSO, access. The invitation email carries a
   one-page data rulebook plus first scheduled tasks that save time immediately.
2. **Vor Ort** — we sit with every department, map real workflows, mark
   automation candidates.
3. **Prompt-Bibliothek** — every recurring task becomes a tested, reusable
   prompt. This is what moves a team off 2.3 out of 5.
4. **Automatisierungs-Review** — candidates presented with effort, payback and
   sequencing. The client decides what gets built.

### `/ki-verordnung`
The differentiated page and the main SEO asset. Cover, in plain German:
- Article 4 obliges *deployers* — not just vendors — to support AI literacy
  among staff. In force since February 2025.
- Article 50 transparency duties apply from 2 August 2026.
- The high-risk regime for Annex III systems (recruitment, promotion,
  termination) was deferred to 2 December 2027.
- Works council co-determination under § 87 Abs. 1 Nr. 6 BetrVG is triggered by
  a system's objective suitability for monitoring, regardless of intent.

**Add a visible disclaimer:** this is general information, not legal advice, and
does not substitute for a Rechtsanwalt. Keep the whole page descriptive rather
than advisory — describe what the law requires, never tell a reader what to do
in their specific case.

### `/ueber-uns`
We are new and small. Say so. A young firm that names its first engagement
honestly reads better than one implying a decade of history. No invented client
logos, no "trusted by" strip.

### `/kontakt`
Email address and a booking link. **No contact form.** A form means a third-party
processor, a DPA, and an extra entry in the privacy policy for no benefit at
this size.

---

## 5. Non-negotiables — German law

These are not preferences. A German business site without them is an
Abmahnung waiting to happen, and we sell compliance.

- **Impressum** under § 5 DDG (replaced § 5 TMG in 2024). Must be reachable from
  every page in no more than two clicks, and labelled "Impressum" — not "Legal"
  or "Imprint". Needs: full company name and legal form, address (no PO box),
  email, phone, authorised representative, register court and number, VAT ID if
  held.
- **Datenschutzerklärung** — separate page, also linked from every page.
- **No Google Fonts from Google's CDN.** Self-host every font file. Loading them
  from Google transmits visitor IPs to the US and is an active target for
  Abmahnungen in Germany.
- **No Google Analytics, no Google Maps embed, no YouTube embed** in the first
  version.
- **No tracking at all initially** — which means **no cookie banner**. For a
  firm selling data compliance, a site with no cookie banner is a statement.
  If analytics are ever added, use a self-hosted or EU-hosted, cookieless tool.
- **No external CDN calls** of any kind. Everything self-hosted.

---

## 6. Stack

- **Astro** — static output, near-zero JavaScript, ideal for a marketing site.
- **Tailwind CSS**.
- **Content in Markdown** under `src/content/` so copy can be edited without
  touching components.
- **i18n:** `de` default at root, `en` under `/en`. Do not auto-redirect by
  browser language; let the user choose.
- **Fonts:** self-hosted woff2, subset to latin + latin-ext (German umlauts).
  A serif for headlines and a clean grotesque for body reads more established
  than an all-sans startup look.
- **No React, no component library, no animation library.** If a dependency is
  not needed to render text and images, it does not go in.

**Design direction:** restrained. One accent colour, generous whitespace, real
typographic hierarchy. Reference points are law firms and Swiss editorial
design, not SaaS landing pages. It should look like it costs money and takes
its subject seriously.

**Accessibility:** semantic HTML, visible focus states, AA contrast minimum.

---

## 7. Build order

1. Scaffold Astro + Tailwind, self-hosted fonts, base layout, header, footer.
2. Impressum and Datenschutz pages with placeholder content marked `TODO:`
   so nothing ships accidentally empty.
3. German homepage.
4. `/vorgehen` and `/ki-verordnung`.
5. `/ueber-uns` and `/kontakt`.
6. English mirrors.
7. Meta tags, Open Graph image, sitemap.xml, robots.txt.
8. Lighthouse pass — target 100 on performance and accessibility. A static site
   with no JavaScript should reach it easily.

---

## 8. Deployment and DNS

The domain is registered at **Squarespace**. That is only a registrar
relationship — the site does **not** have to be hosted there, and cannot be,
since Squarespace will not host hand-built code.

1. Push the repo to GitHub.
2. Connect it to Cloudflare Pages, Netlify or Vercel. Every push to `main`
   redeploys.
3. In the host, add `stridewall.com` and `www.stridewall.com` as custom domains.
   The host will show the exact DNS values to use.
4. In Squarespace: domains dashboard → the domain → **DNS** → **DNS settings**.
   Keep Squarespace nameservers. Delete the "Squarespace Defaults" records, then
   add the host's records — typically an **A record** on `@` pointing to an IP,
   and a **CNAME** on `www` pointing to the host's hostname.
5. Wait for propagation. Squarespace says 24–48 hours; in practice it is usually
   under an hour.
6. Confirm HTTPS is issued by the host and that `www` redirects to the apex,
   or the reverse — pick one and be consistent.

**Hosting note:** all three of those hosts are US companies. For a static site
with no forms and no analytics, no personal data is processed beyond server
logs, so this is defensible. If a client ever asks, a German host such as
Hetzner serving the same static files is a small credibility win and a simple
migration.
