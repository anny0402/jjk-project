'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'History', href: '#history' },
        { name: 'Sorcerers', href: '#characters' },
        { name: 'Archives', href: '#manga' },
        { name: 'Visuals', href: '#gallery' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 py-4 md:py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="relative z-50 text-2xl font-bold font-serif tracking-widest text-white mix-blend-difference">
                    JUJUTSU<span className="text-jjk-red">KAISEN</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 bg-black/50 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative z-50 text-white p-2"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-0 h-screen bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {links.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-3xl font-serif font-bold text-white hover:text-jjk-red transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
