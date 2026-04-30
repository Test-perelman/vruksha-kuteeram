# Vruksha Kuteeram Landing Website

Ultra-premium landscaping, irrigation, and vertical gardening landing page for Vruksha Kuteeram Landscape LLP, built with Next.js App Router, Tailwind CSS, Framer Motion, GSAP, Lenis, and project-specific visual assets.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
npm run lint
npm run build
npm run start
```

## Vercel Deployment

This project is configured as a standard Next.js App Router application for Vercel:

- Vercel should use the `Next.js` framework preset.
- Production branch should be `main`.
- Install command can stay as Vercel's default, or `npm ci`.
- Build command is `npm run build`.
- Start command is `npm run start`, which runs `next start` for local production checks.
- No static export upload, `out/` upload, `.htaccess`, or custom Node static server is required.
- Vercel will create preview deployments for pull requests and production deployments when `main` is updated.

Recommended Vercel setup:

1. Import the GitHub repository into Vercel.
2. Confirm the root directory is the repository root.
3. Leave the output directory unset so Vercel uses the framework default.
4. Add the custom domain in Vercel after the preview deployment is verified.
5. Point the GoDaddy DNS records to Vercel.
6. Remove or disable the old Hostinger deployment after the Vercel domain is live.

## Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Header.tsx
  Hero.tsx
  ServicesSection.tsx
  ProjectsSection.tsx
  ClientsMarquee.tsx
  AboutSection.tsx
  ContactSection.tsx
  Footer.tsx
  SmoothScroll.tsx
  ui/
    MagneticButton.tsx
    Reveal.tsx
lib/
  content.ts
public/
  brand-assets/
    generated/
    generated-projects/
    logos/
    projects/
    services/
docs/
  visual-qa/
```

## QA Snapshot

The latest local Lighthouse run is saved at `docs/visual-qa/lighthouse.json`.

Scores from the final production check:

- Performance: 93
- Accessibility: 100
- Best Practices: 96
- SEO: 100

## Content Source

Business copy and project/client facts are centralized in `lib/content.ts` and limited to the supplied portfolio/brochure content.
