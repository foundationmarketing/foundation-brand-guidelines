# Foundation Brand Guidelines

Redesign of foundation-brand-guidelines.vercel.app. The content and section order follow the live site. The look (sidebar, colors, Avenir headings, beige panels, coral eyebrows) comes from the Hub direction on the Foundation Brand Guidelines design canvas.

No build step:

- `index.html`: the whole page: sidebar, then Overview, Logo system, Typography, Color, Illustration, and the two "Make something" how-tos. Decks follows the AM guide (Make a Foundation deck in Claude) and links the [design system](https://claude.ai/artifact/8oGumRQ2PymHyrathpec2e) and [test deck](https://claude.ai/artifact/WeokbQNnVPuFunSs1M4sGX). Article images follows the design workflow agent for Labs image tasks (brief, Labs design system, Figma, ClickUp review).
- `styles.css`: colors, type and components
- `app.js`: highlights the sidebar link for the section in view, switches the example prompt tabs and runs the Copy buttons
- `assets/`: logos, illustration SVGs and typography examples, all taken from the live site (the large SVG previews were converted to WebP)

## Run locally

```bash
python3 -m http.server 4321
```

## Live site

https://foundationmarketing.github.io/foundation-brand-guidelines/

Hosted on GitHub Pages from the `main` branch (root folder). Every push to `main` republishes the site in a minute or two. `.nojekyll` makes Pages serve the files as they are.

When you change `styles.css` or `app.js`, bump the `?v=` number on its link in `index.html` so browsers fetch the new file instead of a cached one.

## Still to resolve

- Keep the Decks section in step with the AM guide when the guide changes (steps, example prompts, troubleshooting).
- The typography examples still show the old "Foundation Marketing / digital marketing" messaging.
