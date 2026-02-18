'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/loader.css';

const TEXTS = [
    'Loading...',
    'लोड हो रहा है...',
    '読み込み中...'
];

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        // Text Interval
        const textInterval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % TEXTS.length);
        }, 800);

        // Fade out after 2.5 seconds (simulated load)
        const timer = setTimeout(() => {
            setIsLoading(false);
            clearInterval(textInterval);
        }, 3000);

        return () => {
            clearInterval(textInterval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -100,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
                >
                    {/* Infinite Void Animation */}
                    <div className="relative mb-12">
                        <div className="infinite-void-core"></div>
                        <div className="infinite-void-aura"></div>
                        <div className="infinite-void-aura"></div>
                        <div className="infinite-void-aura"></div>
                    </div>

                    {/* Dynamic Glitch Text */}
                    <motion.div
                        key={currentTextIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="loader-text text-xl md:text-2xl text-white font-bold tracking-[0.5em]"
                        data-text={TEXTS[currentTextIndex]}
                    >
                        {TEXTS[currentTextIndex]}
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-10 text-xs text-gray-500 tracking-widest uppercase font-serif"
                    >
                        Expanding Domain...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
