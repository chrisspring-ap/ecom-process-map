# Ecom Process Map

Standalone local copy of the client onboarding → recurring revenue process roadmap. No Lovable dependency — this runs entirely on your machine.

## Run it

1. Open this folder in VS Code.
2. Open a terminal in VS Code (Terminal → New Terminal).
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open the URL it prints (usually http://localhost:5173).

## Structure

- `src/data/roadmap.ts` — all phase/milestone/subitem/owner/automation-level data. This is the single source of truth; edit it directly to update the board.
- `src/lib/roadmap-meta.ts` — owner colors/initials and automation-level helpers.
- `src/routes/Index.tsx` — the main roadmap overview page with the owner filter.
- `src/routes/MilestoneDetail.tsx` — the per-milestone detail/tasks page.
- `src/styles.css` — Tailwind v4 theme and color tokens (including per-owner colors).

## Current data includes

- 7 owner roles: Account Manager, New Build Team, Creative Team, Additional Services Team, Sales, Senior Team, and Feed Team (added from your latest sheet edit — used for "Feedonomics Or Shoptimised Set Up").
- Updated automation levels: "Campaigns spending" and "Check ROAS" are now Semi Automated across the 2 day / 7 day / 3 week check milestones.
- "Campaign optimisations as required (3 week)" no longer has the placeholder "ADD MORE DETAIL" subitem, matching the current sheet.

## Deploying it somewhere

This is a plain Vite app — `npm run build` produces a `dist/` folder you can host anywhere (Vercel, Netlify, GitHub Pages, S3, etc.) with no Lovable account or credits required.
