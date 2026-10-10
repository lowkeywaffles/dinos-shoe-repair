# Dino's Shoe Repair & Alterations: website demo

Demo website for Dino's Shoe Repair & Alterations, 17390 Preston Rd, Ste 257, Dallas, TX 75252 · (972) 239-7194.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Neon-sign language switch, pull-chain bulb light/dark switch, live open/closed status.
- Note: dinosshoerepair.com belongs to a different shop (NY/MA area).

## Needed before going live
- [ ] Owner's full name and the year the shop opened (listings say family-owned, 20+ years)
- [ ] Confirm hours (Mon–Fri 9–6, Sat 9–4)
- [ ] Photos of the shop, workbench and before/after repairs
- [ ] Typical prices (resole, heels, hems, zippers)
- [ ] Do they still do upholstery work?

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
