'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion } from 'framer-motion';

function Particles(props: any) {
    const ref = useRef<any>(null);
    // Generate particles in a sphere. Size must be divisible by 3 (x,y,z).
    // 5001 / 3 = 1667 points.
    const sphere = useMemo(() => {
        const data = new Float32Array(5001);
        return random.inSphere(data, { radius: 1.5 });
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#9b59b6" // JJK Purple
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function ImmersiveHero() {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Particles />
                </Canvas>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 font-serif tracking-widest"
                >
                    JUJUTSU KAISEN
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-4 text-xl md:text-2xl text-jjk-red tracking-[0.5em] font-sans"
                >
                    CURSED ENERGY AWAITS
                </motion.p>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-8 h-[1px] w-64 mx-auto bg-jjk-purple shadow-[0_0_10px_#9b59b6]"
                />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-sm tracking-widest"
            >
                SCROLL TO ENTER
            </motion.div>
        </section>
    );
}
