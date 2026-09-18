# SnapStreak Recovery

A personal, offline-first React + Vite + TypeScript app that helps you prepare
Snapchat Streak recovery requests in seconds instead of retyping the same
details every time.

## What it does

1. Save your info once (username, email, phone, chat type) on the **My
   Information** page.
2. Turn it into one or more **Templates**.
3. Next time you lose a streak, open **Quick Recovery**, type only the
   friend's username, and the app builds the full request from your default
   template.
4. Review it on the **Preview** screen, copy the data with one tap, and open
   Snapchat's official support page to paste it in.
5. Every request is saved to **History** with a status you control (Pending /
   Submitted / Recovered / Failed) and can be searched, filtered, reused, or
   deleted.

## What it deliberately does NOT do

- It never asks for or stores your Snapchat password, session tokens, or
  cookies.
- It never logs in to Snapchat on your behalf.
- It never tries to bypass CAPTCHA or any of Snapchat's protections.
- It never scrapes or auto-submits to Snapchat — you always review and paste
  the data yourself on Snapchat's own support page.

All data (profile, templates, request history, settings) is stored only in
your browser's `localStorage`, on your own device. A "Delete all my data"
button in Settings wipes everything, with a confirmation step first.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- lucide-react icons
- Arabic (RTL) / English (LTR) with a language switcher
- Light / Dark / System theme
- Installable as a PWA (manifest + service worker) on iPhone and desktop

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  components/   Reusable UI: nav, template cards/forms, dialogs, switchers
  pages/        Dashboard, Recovery, Preview, Templates, History,
                MyInformation, Settings, Privacy
  context/      Language, Theme, Toast, and AppData (profile/templates/
                requests/settings) providers
  services/     storage.ts — the localStorage persistence layer
  i18n/         Arabic/English strings
  types/        Shared TypeScript types
  utils/        Form validation helpers
public/
  manifest.json, sw.js, icons — PWA assets
```

## Deploying

`npm run build` produces a static `dist/` folder — deploy it to any static
host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.). No backend is
required.
