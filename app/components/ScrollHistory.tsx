'use client';

import { motion } from 'framer-motion';

const events = [
    { year: "1000", era: "Heian Era", text: "The Golden Age of Jujutsu. Ryomen Sukuna reigns supreme." },
    { year: "1600", era: "Edo Period", text: "The rise of the Three Great Families: Gojo, Kamo, and Zenin." },
    { year: "2018", era: "Modern Era", text: "Yuji Itadori consumes Sukuna's finger. The King of Curses awakens." },
    { year: "2018", era: "Shibuya Incident", text: "Seal of Gojo Satoru. Curses flood Shibuya." },
];

export default function ScrollHistory() {
    return (
        <div className="relative w-full max-w-4xl mx-auto py-20 px-8 text-white">
            <h2 className="text-4xl md:text-6xl text-center mb-16 font-serif">Chronicles of Curses</h2>

            <div className="border-l-2 border-slate-700 ml-4 md:ml-1/2 relative">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-16 ml-8 relative group"
                    >
                        <div className="absolute -left-[41px] top-1 w-5 h-5 bg-black border-2 border-jjk-red rounded-full group-hover:bg-jjk-red group-hover:scale-125 transition-transform duration-300" />
                        <motion.div
                            className="bg-black/80 p-6 rounded-lg glass-panel hover:bg-black transition-colors duration-300"
                            whileHover={{ x: 10, scale: 1.02 }}
                        >
                            <span className="text-jjk-red font-bold block mb-1">{event.year} // {event.era}</span>
                            <p className="text-lg leading-relaxed">{event.text}</p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
