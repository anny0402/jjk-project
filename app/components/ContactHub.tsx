'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export default function ContactHub() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        setStatus('loading');

        // CHECK: If the user hasn't replaced the placeholder, we simulate success so the UI demo works.
        if ("PLACEHOLDER_FORM_ID" === "PLACEHOLDER_FORM_ID") {
            console.warn("⚠️ FORMSPREE ID MISSING: Simulating success for demo. Replace 'PLACEHOLDER_FORM_ID' in ContactHub.tsx to get real emails.");
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('success');
            reset();
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        try {
            const response = await fetch("https://formspree.io/f/PLACEHOLDER_FORM_ID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setStatus('success');
                reset();
                // Reset status after 5 seconds to show the success message longer
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error("Formspree Error: Check your Form ID");
                setStatus('idle'); // Or error state
            }
        } catch (error) {
            console.error("Submission Error", error);
            setStatus('idle');
        }
    };

    return (
        <footer className="bg-black text-white relative border-t border-neutral-800">
            <div className="max-w-7xl mx-auto py-20 px-8 grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Contact Form */}
                <div className="relative">
                    <h2 className="text-4xl font-serif mb-6 text-jjk-red">Summon Us</h2>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-900/20 border border-green-500/50 p-8 rounded-lg text-center"
                        >
                            <h3 className="text-2xl font-bold text-green-400 mb-2 font-serif">SHIKIGAMI DISPATCHED</h3>
                            <p className="text-gray-300">Your message has been carried to the Jujutsu High archives.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Sorcerer Name</label>
                                <input
                                    {...register("name", { required: true })}
                                    className="w-full bg-neutral-900 border border-neutral-700 p-4 text-white focus:outline-none focus:border-jjk-purple focus:ring-1 focus:ring-jjk-purple transition-all rounded"
                                    placeholder="Enter your name"
                                    disabled={status === 'loading'}
                                    suppressHydrationWarning
                                />
                                {errors.name && <span className="text-jjk-red text-xs mt-1 font-bold">IDENTITY REQUIRED</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                                <textarea
                                    {...register("message", { required: true })}
                                    className="w-full bg-neutral-900 border border-neutral-700 p-4 text-white h-32 focus:outline-none focus:border-jjk-purple focus:ring-1 focus:ring-jjk-purple transition-all rounded resize-none"
                                    placeholder="State your business..."
                                    disabled={status === 'loading'}
                                    suppressHydrationWarning
                                />
                                {errors.message && <span className="text-jjk-red text-xs mt-1 font-bold">CONTEXT REQUIRED</span>}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full md:w-auto px-8 py-3 font-bold tracking-widest transition-all uppercase flex items-center justify-center gap-2 ${status === 'loading'
                                    ? 'bg-neutral-800 text-gray-500 cursor-not-allowed border border-neutral-700'
                                    : 'bg-jjk-red text-white hover:bg-red-700 hover:shadow-[0_0_15px_rgba(230,0,35,0.4)]'
                                    }`}
                                suppressHydrationWarning
                            >
                                {status === 'loading' ? (
                                    <>
                                        <span className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-white rounded-full"></span>
                                        SUMMONING...
                                    </>
                                ) : (
                                    'SEND SHIKIGAMI'
                                )}
                            </motion.button>
                        </form>
                    )}
                </div>

                {/* Legal & Links */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-serif">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="hover:text-jjk-blue cursor-pointer transition-colors">Privacy Policy</li>
                            <li className="hover:text-jjk-blue cursor-pointer transition-colors">Terms of Cursed Energy</li>
                            <li className="hover:text-jjk-blue cursor-pointer transition-colors">Sorcerer Guidelines</li>
                        </ul>
                    </div>

                    <div className="mt-12">
                        <p className="text-xs text-gray-600">
                            © 2024 JUJUTSU KAISEN PROJECT. NOT AFFILIATED WITH GEGE AKUTAMI OR SHUEISHA.
                            <br />
                            DESIGNED WITH CURSED ENERGY by ANTIGRAVITY.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
