# Vruksha Kuteeram Landing Website

Ultra-premium landscaping landing page for Vruksha Kuteeram Landscape LLP, built with Next.js App Router, Tailwind CSS, Framer Motion, GSAP, Lenis, and extracted brochure/portfolio assets.

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
    logos/
    projects/
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
