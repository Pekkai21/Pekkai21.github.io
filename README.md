# Marginalia — Journal & Critical Reviews

An elegant, zero-tracking personal publication and review journal for writing about daily reflections, books, cinema, and philosophical inquiries.

Built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS**.

---

## Features

- **Four Editorial Formats**:
  - **Daily Life**: Setting, sensory atmosphere/weather, daily epiphanies, personal reflections.
  - **Book Reviews**: Author, publication year, page counts, star ratings (1.0–5.0), key quotes, spoiler-protected critiques.
  - **Cinema & Video**: Directors, runtimes, platform, sequence timestamps breakdown.
  - **Philosophy Inquiries**: Philosophical traditions, central propositions, dialectical triads (*Thesis $\to$ Antithesis $\to$ Synthesis*), literature citations, and philosophical lexicon.
- **Reading Suite**:
  - 4 Reading Themes: Archival Warm Paper, Sepia, Obsidian Dark, and Minimalist White.
  - Font switch between Editorial Serif and Clean Sans with adjustable sizing ($A^-$ / $A^+$).
  - Distraction-free focus mode and real-time reading progress bar.
- **Personal Marginalia**: Inscribe and save private notes and reactions for each dispatch directly in your browser.
- **Media Shelf**: Track books, films, and philosophical treatises across *Currently Exploring*, *In Queue*, and *Finished*.
- **Data Portability**: Full JSON backup and restore, plus Markdown export. 100% private and persistent in browser `localStorage`.

---

## Deploying to GitHub Pages

This project is completely static (no backend database required) and is configured to work out-of-the-box on GitHub Pages:

### Method 1: Automated Deployment via GitHub Actions (Recommended)

1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** $\to$ **Pages**.
3. Under **Build and deployment** $\to$ **Source**, choose **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site at `https://<your-username>.github.io/<repo-name>/`.

### Method 2: Manual / CLI Build

```bash
# Install dependencies
npm install

# Build static distribution
npm run build

# The output folder `dist/` is ready to be deployed to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
```

---

## Local Development

```bash
# Run local dev server (port 3000)
npm run dev

# Run type checker
npm run lint
```
