<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10R_XxkhRrZFDxnsU6I0-F-VN6hWTkd0g

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build for GitHub Pages

1. Build the static site:
   `npm run build`
2. Deploy the contents of `dist/` to GitHub Pages.

Note: The Vite base path is set to `/Website/` for production builds. If your repo name differs, update `base` in `vite.config.ts`.
