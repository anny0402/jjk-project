'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from '../data/charactersData';
import Link from 'next/link';

// SorcererCard Component
const SorcererCard = ({ char, onClick }: { char: any, onClick: () => void }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <motion.div
            layoutId={`card-${char.id}`}
            onClick={onClick}
            whileHover={{ y: -10 }}
            className="group relative h-[450px] w-full cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-black transition-all hover:border-jjk-red hover:shadow-[0_0_30px_rgba(230,0,35,0.3)]"
        >
            {/* Image Container */}
            <div className="absolute inset-0 bg-[#1a1a1a]">
                <img
                    src={char.image}
                    alt={char.name}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${hasError ? 'hidden' : 'block'}`}
                    onError={() => setHasError(true)}
                />

                {/* Cursed Placeholder (Fallback) */}
                <div className={`cursed-placeholder ${hasError ? 'visible' : ''}`}>
                    <span className="relative z-10 text-center px-4 font-bold text-2xl font-serif text-jjk-purple drop-shadow-[0_0_10px_rgba(155,89,182,0.8)]">
                        {char.name}
                    </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>

            {/* Content Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <motion.h3
                    className="text-3xl font-bold font-serif text-white mb-2 uppercase drop-shadow-md group-hover:text-jjk-red transition-colors"
                >
                    {char.name}
                </motion.h3>
                <div className="h-0.5 w-12 bg-gray-700 group-hover:w-full group-hover:bg-jjk-red transition-all duration-500 mb-2" />
                <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">
                    Grade: Special / 1
                </p>
            </div>

            {/* Hover Reveal Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm border border-jjk-red px-6 py-2 rounded text-white font-bold tracking-widest uppercase text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    Click to Expand
                </div>
            </div>
        </motion.div>
    );
};

export default function CharacterArchive() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="py-24 px-6 md:px-12 bg-neutral-900 border-t border-neutral-800 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-jjk-purple rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-jjk-red rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl text-center mb-4 font-serif text-white ancient-title"
                >
                    Sorcerer Profiles
                </motion.h2>
                <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                    The strongest jujutsu sorcerers of the modern age. Explore their cursed techniques and domains.
                </p>

                {/* Responsive Grid System using Tailwind */}
                <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                    {characters.map((char) => (
                        <SorcererCard
                            key={char.id}
                            char={char}
                            onClick={() => setSelectedId(char.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
                        onClick={() => setSelectedId(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {(() => {
                            const char = characters.find(c => c.id === selectedId);
                            if (!char) return null;

                            return (
                                <motion.div
                                    layoutId={`card-${char.id}`}
                                    className="bg-[#121212] w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-800 relative shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                                    onClick={(e) => e.stopPropagation()}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white hover:rotate-90 transition-all bg-black/50 rounded-full p-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Left: Image Side */}
                                    <motion.div
                                        className="w-full md:w-5/12 relative min-h-[300px] md:h-auto bg-black"
                                        layoutId={`image-${char.id}`}
                                    >
                                        <img
                                            src={char.image}
                                            alt={char.name}
                                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex !important');
                                            }}
                                        />
                                        <div className="cursed-placeholder">
                                            <span className="relative z-10 text-center px-4 font-bold text-2xl font-serif text-jjk-purple">
                                                {char.name}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:bg-gradient-to-r" />
                                    </motion.div>

                                    {/* Right: Content Side */}
                                    <motion.div
                                        className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-[#121212] text-gray-200"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.4 }}
                                    >
                                        <motion.h2 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
                                            {char.name}
                                        </motion.h2>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            <span className="px-3 py-1 bg-jjk-red/10 border border-jjk-red text-jjk-red text-xs font-bold tracking-widest uppercase rounded">
                                                Special Grade
                                            </span>
                                            <span className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-400 text-xs font-bold tracking-widest uppercase rounded">
                                                Jujutsu High
                                            </span>
                                        </div>

                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-bold border-b border-gray-800 pb-2">History</h3>
                                                <p className="text-lg leading-relaxed text-gray-300 font-light">
                                                    {char.history}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-bold border-b border-gray-800 pb-2">Cursed Techniques</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {char.techniques.map((tech: string) => (
                                                        <span key={tech} className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-gray-300">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-gradient-to-br from-neutral-900 to-black p-6 rounded-xl border border-gray-800 relative overflow-hidden group">
                                                <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />
                                                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-jjk-purple blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />

                                                <h3 className="text-sm text-jjk-purple uppercase tracking-widest mb-1 font-bold relative z-10">Domain Expansion</h3>
                                                <p className="text-2xl font-serif text-white mb-2 relative z-10">{char.domain.name}</p>
                                                <p className="text-sm text-gray-400 italic relative z-10">"{char.domain.description}"</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
