'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import characterData from '../../data/characters.json';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CharacterPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const character = characterData.find(c => c.id === id);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (character) {
            setIsLoaded(true);
        }
    }, [character]);

    if (!character) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-4xl font-serif text-jjk-red animate-pulse">CHARACTER NOT FOUND // CURSED SPIRIT DETECTED</h1>
                <button onClick={() => router.back()} className="mt-4 px-6 py-2 border border-gray-600 hover:bg-white hover:text-black transition-colors">
                    RETURN
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black z-0 pointer-events-none" />

            {/* Navigation */}
            <nav className="absolute top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                    <span className="font-serif tracking-widest text-sm">BACK to ARCHIVES</span>
                </Link>
            </nav>

            <div className="relative z-10 flex flex-col lg:flex-row h-full">
                {/* Character Image / Left Panel */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 bg-neutral-900 flex items-end justify-center overflow-hidden"
                >
                    {/* Placeholder for character image */}
                    <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                    {/* In production, use <Image src={character.image} fill className="object-cover" /> */}
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />

                    <div className="p-8 lg:p-16 relative z-10 w-full">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-6xl lg:text-9xl font-bold font-serif leading-none tracking-tighter"
                        >
                            {character.name.split(' ')[0]}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jjk-red to-purple-600">
                                {character.name.split(' ')[1]}
                            </span>
                        </motion.h1>
                        <p className="mt-4 text-xl text-gray-400 tracking-[0.2em] uppercase">{character.title}</p>
                    </div>
                </motion.div>

                {/* Info Content / Right Panel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="w-full lg:w-1/2 min-h-screen p-8 lg:p-24 flex flex-col justify-center"
                >
                    <div className="space-y-12 max-w-2xl">
                        {/* Domain Expansion */}
                        <div className="border-l-4 border-jjk-purple pl-6 py-2">
                            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-bold">Domain Expansion</h3>
                            <p className="text-3xl font-serif text-white">{character.domain}</p>
                        </div>

                        {/* Cursed Technique */}
                        <div className="border-l-4 border-jjk-blue pl-6 py-2">
                            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-bold">Cursed Technique</h3>
                            <p className="text-2xl font-serif text-gray-200">{character.technique}</p>
                        </div>

                        {/* Lore */}
                        <div>
                            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-bold">About the Sorcerer</h3>
                            <p className="text-lg text-gray-300 leading-relaxed font-sans">
                                {character.lore}
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div>
                            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-6 font-bold">Battle Records</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="aspect-square bg-neutral-800 rounded-lg animate-pulse hover:bg-neutral-700 transition-colors cursor-pointer" />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
