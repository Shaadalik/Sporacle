# Sporacle AI — Private‑Labeled App

This repo contains the Sporacle AI web app. It retains all features (chatbot, animations, tabs, trends, insights) while showing zero third‑party branding.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `SPORACLE_AI_KEY` in [.env.local](.env.local) to your backend AI key
3. Run the app:
   `npm run dev`

## Animations

- This app uses `framer-motion` for subtle UI polish:
   - Page transitions between tabs
   - Button hover/tap interactions
   - Metric tiles fade/slide-in on scroll
   - Sporcbot FAB float and chat modal slide-up

Customize durations/easing by editing variants in:
- `components/Layout.tsx` (page transitions)
- `components/Button.tsx` (hover/tap)
- `components/MetricTile.tsx` (entrance)
- `components/Sporcbot.tsx` (FAB + modal)


