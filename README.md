# Jujutsu Kaisen Immersive Web Platform

This is a Next.js project featuring an immersive web experience based on the Jujutsu Kaisen anime/manga universe. It includes 3D hero sections, interactive history timelines, character archives, a tri-lingual manga reader (EN/HI/JP), and a gallery engine.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4, Custom CSS Animations
- **Animations**: Framer Motion, Three.js (@react-three/fiber, @react-three/drei)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Forms**: React Hook Form

## Project Structure

```
c:/Users/Anny/jjk
├── app/
│   ├── components/       # Core UI components
│   │   ├── ImmersiveHero.tsx
│   │   ├── ScrollHistory.tsx
│   │   ├── CharacterArchive.tsx
│   │   ├── MangaReader.tsx
│   │   ├── GalleryEngine.tsx
│   │   └── ContactHub.tsx
│   ├── lib/              # Utilities and Stores
│   │   └── store.ts      # Zustand Store
│   ├── data/             # Static Data
│   │   └── mangaContent.json
│   ├── globals.css       # Global styles & JJK theme variables
│   ├── layout.tsx        # Root layout with Fonts
│   └── page.tsx          # Main Entry Page
├── public/               # Static Assets
└── ...config files
```

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open Browser**:
    Visit [http://localhost:3000](http://localhost:3000).

## Hosting on Vercel (100% Uptime)

Follow these steps to deploy your JJK Immersive Platform to Vercel for free hosting with high availability:

1.  **Push to GitHub**:
    -   Initialize a git repository if you haven't already: `git init`.
    -   Add all files: `git add .`.
    -   Commit: `git commit -m "Initial commit"`.
    -   Create a new repository on GitHub and push your code.

2.  **Connect to Vercel**:
    -   Go to [Vercel.com](https://vercel.com) and sign up/log in.
    -   Click **"Add New..."** -> **"Project"**.
    -   Select your GitHub repository (`jjk-immersive` or similar).

3.  **Configure Project**:
    -   **Framework Preset**: Next.js (should be auto-detected).
    -   **Root Directory**: `./` (default).
    -   **Build Command**: `next build` (default).
    -   **Output Directory**: `.next` (default).
    -   **Environment Variables**: None required for this base setup.

4.  **Deploy**:
    -   Click **"Deploy"**.
    -   Wait for the build to complete (usually < 1 minute).
    -   Your site will be live at `https://your-project-name.vercel.app`.

5.  **Custom Domain (Optional)**:
    -   Go to **Settings** -> **Domains** in your Vercel dashboard to add a custom domain if you have one.

## Features

-   **Immersive Hero**: 3D particle effects representing Cursed Energy using Three.js.
-   **Scroll History**: Vertical timeline with scroll-triggered animations.
-   **Character Archive**: Expandable cards with detailed sorcerer info.
-   **Manga Reader**: Switch between English, Hindi, and Japanese instantly.
-   **Gallery**: Masonry layout for high-res images.
-   **Contact Hub**: Form validation and legal footer.

User: Jujutsu Sorcerer Anny
OS: Windows
Time: 2026-02-17
