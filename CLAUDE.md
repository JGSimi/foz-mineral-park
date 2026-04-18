# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Production site for **Foz Mineral Park LTDA** (CNPJ 56.199.013/0001-96) — a mineral museum / theme-park on Av. das Cataratas, Foz do Iguaçu, PR. This codebase was built to **replace** an earlier AI-generated site (diagnosed in `/Users/joaosimi/.claude/plans/security-audit-fozmineral-deep.md` and `/Users/joaosimi/.claude/plans/relatorio-cliente-fozmineral.md`) that had no working funnel, zero SEO indexing, and multiple LGPD/CDC violations.

Primary business goals embedded in the design:
- Be found on Google for tourism queries in Portuguese, Spanish and English.
- Convert visits into ticket purchases and qualified WhatsApp leads.
- Serve agencies and school groups via dedicated B2B flow.
- Honor LGPD, CDC, and WCAG 2.2 AA from day one.

## Commands

```bash
npm run dev      # Turbopack dev server on :3000
npm run build    # Production build (Turbopack); compiles + typechecks + prerenders
npm run start    # Serve the built output
npm run lint     # ESLint 9 flat config (eslint-config-next)
npx tsc --noEmit # TypeScript check without emitting
```

There is no test suite yet (intentional — MVP stage). Before adding tests, prefer Vitest + Playwright over Jest.

Deployment target is Vercel. The project runs entirely in Vercel free tier: hosting, Analytics, Speed Insights, and dynamic image generation. Email sending (Resend) and payment gateway are planned but optional at first deploy.

## Architecture

### High level

- **Next.js 16 App Router** with `src/` directory. All pages are Server Components by default; only `navbar.tsx`, `cookie-banner.tsx` and `contact-form.tsx` are `"use client"`.
- **Static-first rendering**: the production build turns 19 routes into static HTML at build time, including the 3 attraction detail pages via `generateStaticParams`. There is no database at runtime — content lives in `src/lib/site.ts`.
- **Tailwind CSS v4** with design tokens declared in `src/app/globals.css` using the `@theme inline` block. Custom palette (`amethyst-*`, `citrine-*`, `quartz-*`) is derived from gem colors and is the only source of truth for brand color — do not introduce `zinc`, `slate`, or ad-hoc hex values in components.
- **Typography**: `Fraunces` (display, serif with optical size) + `Inter` (body), loaded via `next/font/google` in the root layout and exposed as `--font-display` and `--font-body` CSS variables.

### Directory convention

```
src/
├── app/                        App Router routes (each folder = a route)
│   ├── layout.tsx              Root layout, fonts, metadata, JSON-LD, analytics
│   ├── page.tsx                Home (Hero + QuickFacts + Attractions + WhyVisit + Testimonials + VisitPlan + FinalCta)
│   ├── sitemap.ts              Dynamic XML sitemap (static + attraction routes)
│   ├── robots.ts               Dynamic robots.txt
│   ├── icon.tsx                Favicon generated via next/og
│   ├── apple-icon.tsx          Apple touch icon generated via next/og
│   ├── opengraph-image.tsx     Site-wide OG image generated via next/og
│   ├── not-found.tsx           Custom 404 (matches brand)
│   ├── atracoes/[slug]/        Dynamic attraction detail page
│   ├── contato/
│   │   ├── page.tsx
│   │   └── actions.ts          Server Action (Zod + honeypot + Resend fallback)
│   ├── ingressos/, sobre/, como-chegar/, faq/, politica-de-privacidade/, termos-de-uso/
│
├── components/                 Local UI primitives (no external design system)
│   ├── button.tsx              cva variants: primary/gold/outline/ghost/link/onDark
│   ├── slot.tsx                Minimal Radix-style Slot for `asChild` composition
│   ├── container.tsx           Size-aware container (sm|md|lg|xl)
│   ├── section-heading.tsx     Eyebrow + title + description, tone=light|dark
│   ├── navbar.tsx              Client: scroll-aware, mobile sheet
│   ├── footer.tsx              With inline Instagram/Facebook SVGs (Lucide removed brand icons)
│   ├── cookie-banner.tsx       Client: LGPD consent stored in localStorage (`fmp-consent-v1`)
│   ├── whatsapp-floating.tsx   Floating CTA with prefilled message
│   ├── logo.tsx                Inline SVG logo with amethyst gradient
│   ├── gem-illustration.tsx    SVG placeholder used as hero/cover art (accent=amethyst|citrine|quartz)
│   └── contact-form.tsx        Client form backed by actions.ts
│
└── lib/
    ├── site.ts                 **Single source of truth**: all copy, address, hours, attractions, contact, socials
    └── utils.ts                `cn()` helper (clsx + tailwind-merge)
```

### The `site.ts` pattern

`src/lib/site.ts` is the editorial kernel. Every page reads from it — copy, contact details, attractions, opening hours, keywords. When the client needs to update a phone number, a price, or an attraction name, this is the only file to touch. **Do not hard-code brand copy in components or pages.** When adding a new section that needs editable content, extend `site.ts` first.

The three attractions are the canonical list. Adding a new one requires:
1. Pushing an entry to `site.attractions` (slug, name, tagline, short, long, badge, duration, accent).
2. Adding an accent key to `gem-illustration.tsx` palettes if the accent is new.
3. Static generation in `atracoes/[slug]/page.tsx` picks it up automatically via `generateStaticParams`.

### Server Actions

`src/app/contato/actions.ts` handles the contact form with Zod validation, a honeypot field, and a Resend fallback. If `RESEND_API_KEY` is absent it logs the message server-side and still returns success — this lets local and preview deploys work without secrets. Production must set `RESEND_API_KEY` and optionally `CONTACT_EMAIL` in Vercel environment variables.

### Security headers

`next.config.ts` sets CSP + HSTS (preload) + X-Content-Type-Options + X-Frame-Options: DENY + Referrer-Policy + Permissions-Policy + COOP/CORP on every response. When introducing third-party scripts (payment widgets, map providers, analytics beyond Vercel), extend the CSP `script-src`, `connect-src`, `img-src` and `frame-src` lists in `next.config.ts` — never relax the policy globally. The current CSP uses `'unsafe-inline'` in `script-src` because Next.js inlines RSC payloads; when moving to a nonce-based CSP, generate the nonce in middleware and wire it through both `next.config.ts` and `<Script>` tags.

### SEO

- Metadata cascade: root `layout.tsx` sets default title template + OG + canonical + robots; each route overrides only what it needs.
- JSON-LD is emitted from the root layout (`TouristAttraction` + `LocalBusiness` graph) and from `/faq/page.tsx` (`FAQPage`). Attraction detail pages deliberately do not re-emit the full graph to avoid duplication — they inherit via the canonical home.
- Sitemap and robots are handled by the typed `MetadataRoute` conventions in `app/sitemap.ts` and `app/robots.ts`. There is no static `public/robots.txt` — the Next.js route wins.

### Accessibility

- `<html lang="pt-BR">` is set in the root layout — never change to `en`.
- The root layout includes a `Pular para o conteúdo` skip link and a `#conteudo` landmark on `<main>`.
- `prefers-reduced-motion` is honored globally in `globals.css`.
- `Permissions-Policy` intentionally disables camera/microphone and only enables geolocation/payment on same origin.

## Conventions when editing

- Keep pages server-rendered unless you truly need client state. If you do, mark only the leaf component with `"use client"` and keep the route wrapper server.
- Prefer `<Link>` from `next/link` for in-site navigation; `<a>` only for external or `mailto:` / `tel:` / `https://wa.me/...`.
- Use the `Button` component with `asChild` when wrapping a link: `<Button asChild><Link href="...">...</Link></Button>`.
- Copy is in Portuguese (pt-BR). Keep the tone warm, concrete, honest — this is a counter-reaction to the previous AI-generated site's generic "fascinante mundo, jornada única" vocabulary.
- When adding images, prefer `next/image` and local assets in `public/`. Do not hot-link from external CDNs (the previous site's fatal pattern was serving everything from `files.manuscdn.com` — we explicitly moved away from that).
- No tracking pixels, fingerprinting, or third-party analytics beyond Vercel Analytics (which is cookie-less by default). Anything else requires an update to the cookie banner and Privacy Policy.

## Known follow-ups (not blockers)

- Integrate real payment (Mercado Pago Checkout Pro or Stripe-BR) to replace the "comprar" → contact-form placeholder.
- Add pt-BR/es/en routing via App Router `app/[locale]/…` once copy is translated.
- Replace `gem-illustration.tsx` SVGs with real photography once the client provides it (keep SVG fallback for placeholders).
- Add Playwright smoke tests for the critical user flow (home → ingressos → form submit → success toast).
- Submit sitemap to Google Search Console and Bing Webmaster after the custom domain is active.
