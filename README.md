<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DH09X1LNdRCPT_veOgpSGvir0PABtm36

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
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
# Sporacle
