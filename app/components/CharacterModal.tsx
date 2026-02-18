'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from '../data/charactersData';
import '../styles/characterModal.css';

const CharacterModal = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-5xl font-bold text-center mb-12 ancient-title text-jjk-red tracking-wider">
                Visual Records
            </h1>

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {characters.map((char) => (
                    <CharacterCard
                        key={char.id}
                        char={char}
                        isSelected={selectedId === char.id}
                        onClick={() => setSelectedId(char.id)}
                    />
                ))}
            </div>

            {/* Dynamic Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <>
                        <motion.div
                            layoutId="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
                        >
                            {(() => {
                                const char = characters.find((c) => c.id === selectedId);
                                if (!char) return null;

                                return (
                                    <motion.div
                                        layoutId={`card-container-${char.id}`}
                                        className="w-full max-w-4xl bg-[#121212] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 flex flex-col md:flex-row my-8"
                                        style={{
                                            //   boxShadow: `0 0 50px -12px ${char.glowColor}`
                                        }}
                                    >
                                        {/* Background Glow Effect */}
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-20"
                                            style={{
                                                background: `radial-gradient(circle at 50% 50%, ${char.glowColor}, transparent 70%)`
                                            }}
                                        />

                                        {/* Left: Character Image */}
                                        <div className="w-full md:w-2/5 h-[400px] md:h-auto relative bg-neutral-900 group">
                                            <motion.img
                                                layoutId={`image-${char.id}`}
                                                src={char.image}
                                                alt={char.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-10"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.setAttribute('style', 'display: flex !important');
                                                }}
                                            />
                                            <div className="cursed-placeholder"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:bg-gradient-to-r z-20 pointer-events-none" />
                                        </div>

                                        {/* Right: Character Details */}
                                        <div className="w-full md:w-3/5 p-8 relative z-10 text-gray-200 flex flex-col">
                                            {/* Close Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedId(null);
                                                }}
                                                className="absolute top-4 right-4 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300 z-50"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>

                                            <div className="mb-6">
                                                <motion.h2
                                                    layoutId={`title-${char.id}`}
                                                    className="text-5xl font-bold font-serif text-white mb-2 tracking-wide ancient-title"
                                                    style={{ textShadow: `0 0 20px ${char.glowColor}` }}
                                                >
                                                    {char.name}
                                                </motion.h2>
                                                <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs tracking-widest text-gray-400 uppercase">
                                                    JJK Archives
                                                </span>
                                            </div>

                                            <div className="space-y-8 flex-grow overflow-y-auto pr-2 story-scroll max-h-[60vh]">
                                                {/* History Section */}
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                        <span className="w-1 h-6 shrink-0" style={{ backgroundColor: char.domain.color }}></span>
                                                        Origin Story
                                                    </h3>
                                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base border-l-2 border-white/5 pl-4">
                                                        {char.history}
                                                    </p>
                                                </div>

                                                {/* Cursed Techniques */}
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                                        <span className="w-1 h-6 shrink-0" style={{ backgroundColor: char.domain.color }}></span>
                                                        Cursed Techniques
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {char.techniques.map((tech) => (
                                                            <span
                                                                key={tech}
                                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Domain Expansion */}
                                                <div
                                                    className="relative rounded-xl overflow-hidden p-6 border border-white/10 group"
                                                >
                                                    <div
                                                        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                                        style={{ backgroundColor: char.domain.color }}
                                                    />

                                                    <h3 className="text-xl font-serif font-bold text-white relative z-10 mb-1">
                                                        Domain Expansion:
                                                    </h3>
                                                    <div className="text-2xl font-bold text-white/90 relative z-10 mb-2 uppercase tracking-wide" style={{ color: char.domain.color }}>
                                                        {char.domain.name}
                                                    </div>
                                                    <p className="text-sm text-gray-300 relative z-10 italic">
                                                        "{char.domain.description}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })()}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const CharacterCard = ({ char, isSelected, onClick }: { char: any, isSelected: boolean, onClick: () => void }) => {
    const [hasError, setHasError] = useState(false);

    return (
        <motion.div
            layoutId={`card-container-${char.id}`}
            onClick={onClick}
            className="character-card relative h-[450px] group cursor-pointer overflow-hidden rounded-xl border border-neutral-800"
            whileHover={{ scale: 1.02 }}
            style={{
                '--pulse-color': char.glowColor,
                '--card-glow': char.glowColor,
                opacity: isSelected ? 0 : 1
            } as React.CSSProperties}
        >
            {/* Wrapper must NOT have both absolute and relative. Use absolute to fill. */}
            <div className="absolute inset-0 bg-[#2a2a2a]">
                <img
                    src={char.image}
                    alt={char.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10 ${hasError ? 'hidden' : 'block'}`}
                    onError={() => setHasError(true)}
                />

                {/* Fallback Placeholder */}
                <div className={`cursed-placeholder ${hasError ? 'visible' : ''}`}></div>
            </div>

            {/* Dark Overlay Gradient - Ensure z-index is above image (10) but below content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-20 pointer-events-none" />

            {/* Hover Reveal Content */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 pointer-events-none">
                <button className="view-btn uppercase tracking-widest text-sm pointer-events-auto bg-black/60 px-6 py-2 border border-white/20 backdrop-blur-sm rounded hover:bg-jjk-red hover:border-jjk-red transition-all">
                    Click to Expand
                </button>
            </div>

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <motion.h2
                    layoutId={`title-${char.id}`}
                    className="text-3xl font-bold font-serif text-white mb-2 uppercase drop-shadow-md"
                >
                    {char.name}
                </motion.h2>
                <p className="text-gray-400 text-sm font-semibold tracking-wide border-t border-gray-700 pt-2 inline-block">
                    Grade: Special / 1
                </p>
            </div>
        </motion.div>
    );
};

export default CharacterModal;
