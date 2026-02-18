'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '../data/galleryData.json';
import { characters } from '../data/charactersData';
import SafeImage from './SafeImage';

export default function GalleryEngine() {
    const [selectedChar, setSelectedChar] = useState<any | null>(null);

    const handleImageClick = (characterId: string) => {
        const foundChar = characters.find(c => c.id === characterId);
        if (foundChar) {
            setSelectedChar(foundChar);
        } else {
            console.warn(`Character ID not found: ${characterId}`);
            // Optional: Show a "Corrupted Data" toast or similar
        }
    };

    return (
        <div className="py-20 px-8 bg-black text-white max-w-7xl mx-auto min-h-screen">
            <h2 className="text-4xl md:text-6xl text-center mb-12 font-serif text-glow">Visual Records</h2>

            <div className="columns-1 md:columns-3 gap-6 space-y-6">
                {galleryData.map((img, i) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        onClick={() => handleImageClick(img.characterId)}
                        className={`relative overflow-hidden rounded-xl break-inside-avoid group cursor-pointer ${img.height} bg-neutral-900 border border-neutral-800 hover:border-jjk-purple transition-colors`}
                    >
                        <div className="absolute inset-0 bg-[#1a1a1a]">
                            <SafeImage
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 z-10 relative"
                                fallbackText="VISUAL RECORD LOST"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20 pointer-events-none" />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 backdrop-blur-sm">
                            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <p className="text-jjk-purple font-bold tracking-widest text-sm mb-2">ACCESS RECORD</p>
                                <p className="text-white font-serif text-xl border-b border-jjk-purple inline-block pb-1">{img.alt}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Character Detail Modal */}
            <AnimatePresence>
                {selectedChar && (
                    <motion.div
                        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg"
                        onClick={() => setSelectedChar(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            layoutId={`gallery-card-${selectedChar.id}`}
                            className="bg-[#121212] w-full max-w-4xl rounded-2xl overflow-hidden border border-jjk-purple relative shadow-[0_0_50px_rgba(155,89,182,0.2)] flex flex-col md:flex-row max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedChar(null)}
                                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white hover:rotate-90 transition-all bg-black/50 rounded-full p-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Left: Image */}
                            <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-black border-b md:border-b-0 md:border-r border-neutral-800">
                                <SafeImage
                                    src={selectedChar.image}
                                    alt={selectedChar.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                                    fallbackText="DATA CORRUPTED"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />

                                <div className="absolute bottom-4 left-4 z-10">
                                    <h3 className="text-3xl font-serif text-white text-glow-purple">{selectedChar.name}</h3>
                                    <p className="text-jjk-purple text-xs tracking-widest uppercase font-bold">Classified Record</p>
                                </div>
                            </div>

                            {/* Right: Data */}
                            <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                                            <span className="w-2 h-2 bg-jjk-purple rounded-full animate-pulse"></span>
                                            Subject History
                                        </h4>
                                        <p className="text-gray-300 leading-relaxed text-sm">
                                            {selectedChar.history}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Cursed Techniques</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedChar.techniques.map((tech: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-jjk-purple/10 border border-jjk-purple/30 rounded text-xs text-jjk-purple font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-800">
                                        <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-1">Domain Expansion</h4>
                                        <p className="text-white font-serif text-lg">{selectedChar.domain.name}</p>
                                        <p className="text-gray-500 text-xs italic mt-1">"{selectedChar.domain.description}"</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
