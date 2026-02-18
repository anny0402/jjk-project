import ImmersiveHero from './components/ImmersiveHero';
import ScrollHistory from './components/ScrollHistory';
import CharacterArchive from './components/CharacterArchive';
import MangaReader from './components/MangaReader';
import GalleryEngine from './components/GalleryEngine';
import ContactHub from './components/ContactHub';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col">
      {/* 1. Immersive Hero */}
      <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-white">Loading Domain...</div>}>
        <ImmersiveHero />
      </Suspense>

      {/* 2. Scroll History */}
      <section id="history" className="w-full relative z-10 bg-black">
        <ScrollHistory />
      </section>

      {/* 3. Character Archive */}
      <section id="characters" className="w-full relative z-10 bg-gradient-to-b from-black to-neutral-900">
        <CharacterArchive />
      </section>

      {/* 4. Manga Reader */}
      <section id="manga" className="w-full relative z-10 bg-neutral-900">
        <MangaReader />
      </section>

      {/* 5. Gallery Engine */}
      <section id="gallery" className="w-full relative z-10 bg-black">
        <GalleryEngine />
      </section>

      {/* 6. Contact Hub */}
      <ContactHub />
    </main>
  );
}
