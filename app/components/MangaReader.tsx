'use client';

import { useStore } from '../lib/store';
import mangaData from '../data/mangaContent.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SafeImage from './SafeImage';
import { Search, BookOpen } from 'lucide-react';

export default function MangaReader() {
    const { currentLanguage, setLanguage } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArc, setSelectedArc] = useState('All');
    const [displayCount, setDisplayCount] = useState(4);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Convert language type for UI display
    const langConfig = {
        en: { label: 'English', icon: '🇺🇸', font: 'font-sans' },
        hi: { label: 'हिंदी', icon: '🇮🇳', font: 'font-hindi' },
        jp: { label: '日本語', icon: '🇯🇵', font: 'font-sans' },
    };

    const arcs = ['All', 'Volume 0', 'Volume 1', 'Shibuya', 'Culling Game', 'Shinjuku'];

    const filteredManga = mangaData.filter(chapter => {
        const matchesSearch =
            chapter.chapters.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chapter.title[currentLanguage].toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedArc === 'All') return matchesSearch;
        // Basic mapping for demo purposes
        if (selectedArc === 'Volume 0' && chapter.vol === 0) return matchesSearch;
        if (selectedArc === 'Volume 1' && chapter.vol === 1) return matchesSearch;
        if (selectedArc === 'Shibuya' && chapter.vol === "10-16") return matchesSearch;
        if (selectedArc === 'Culling Game' && chapter.vol === "18-25") return matchesSearch;
        if (selectedArc === 'Shinjuku' && chapter.vol === "26-30") return matchesSearch;
        return false;
    });

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-4xl font-serif text-jjk-red text-glow">Cursed Archives</h2>

                    <div className="flex gap-4">
                        {(['en', 'hi', 'jp'] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                suppressHydrationWarning
                                className={`px-4 py-2 rounded-full border border-gray-700 transition-all font-bold ${currentLanguage === lang
                                    ? 'bg-jjk-purple text-white shadow-[0_0_10px_#9b59b6]'
                                    : 'bg-black text-gray-400 hover:text-white'
                                    } ${lang === 'hi' ? 'font-hindi' : 'font-sans'}`}
                            >
                                {langConfig[lang].icon} {langConfig[lang].label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="mb-12 space-y-4">
                    <div className="flex gap-4 bg-black p-4 rounded-xl border border-neutral-800 focus-within:border-jjk-red transition-colors">
                        <Search className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by Chapter (e.g., 236) or Title..."
                            className="bg-transparent w-full focus:outline-none text-white placeholder-gray-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            suppressHydrationWarning
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-jjk-red">
                        {arcs.map(arc => (
                            <button
                                key={arc}
                                onClick={() => setSelectedArc(arc)}
                                suppressHydrationWarning
                                className={`px-4 py-1 rounded-full text-sm whitespace-nowrap border ${selectedArc === arc
                                    ? 'bg-jjk-red border-jjk-red text-white'
                                    : 'bg-black border-neutral-800 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {arc}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {filteredManga.slice(0, displayCount).map((chapter) => (
                            <motion.div
                                key={chapter.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden glass-panel group hover:border-jjk-purple transition-colors"
                            >

                                <div className="relative h-64 overflow-hidden mb-4 rounded-lg bg-neutral-800">
                                    <SafeImage
                                        src={chapter.image}
                                        alt={chapter.title[currentLanguage]}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-110 transform transition-transform"
                                        fallbackText={`VOL ${chapter.vol}`}
                                    />
                                    <div className="absolute top-2 left-2 flex gap-2 z-20">
                                        <span className="text-jjk-red font-mono text-xs tracking-widest bg-black/80 px-2 py-1 rounded border border-jjk-red">
                                            CH. {chapter.chapters}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
                                </div>
                                <div className="p-6 pt-0 relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-gray-500 text-xs uppercase tracking-widest">
                                            VOL. {chapter.vol}
                                        </span>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.h3
                                            key={`title-${currentLanguage}-${chapter.id}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={`text-2xl font-bold mb-4 text-white group-hover:text-jjk-purple transition-colors ${langConfig[currentLanguage].font}`}
                                        >
                                            {chapter.title[currentLanguage]}
                                        </motion.h3>
                                    </AnimatePresence>

                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={`content-${currentLanguage}-${chapter.id}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={`text-gray-400 leading-relaxed text-sm overflow-hidden transition-all duration-500 ${expandedId === chapter.id ? 'h-auto' : 'h-20'} ${langConfig[currentLanguage].font}`}
                                        >
                                            {chapter.desc[currentLanguage]}
                                        </motion.p>
                                    </AnimatePresence>

                                    <div className="mt-6 flex justify-between items-center">
                                        <button
                                            onClick={() => setExpandedId(expandedId === chapter.id ? null : chapter.id)}
                                            suppressHydrationWarning
                                            className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2 group-hover:gap-3 transition-all"
                                        >
                                            {expandedId === chapter.id ? 'CLOSE DOMAIN' : 'EXPAND DOMAIN'} →
                                        </button>

                                        <a
                                            href="https://mangaplus.shueisha.co.jp/titles/100034"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-neutral-800 hover:bg-jjk-blue text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 transition-colors"
                                        >
                                            <BookOpen size={14} /> READ OFFICIAL
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredManga.length > displayCount && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setDisplayCount(prev => prev + 4)}
                            className="px-8 py-3 border border-jjk-red text-jjk-red hover:bg-jjk-red hover:text-white transition-all uppercase tracking-widest font-bold"
                            suppressHydrationWarning
                        >
                            Load More Curses
                        </button>
                    </div>
                )}

                {filteredManga.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="text-xl">No Curses Found With That Name</p>
                        <p className="text-sm mt-2">Try searching for "Sukuna" or "236"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
