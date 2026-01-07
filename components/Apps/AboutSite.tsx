'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Github } from 'lucide-react';

export default function AboutSite() {
    return (
        <div className="h-full bg-gradient-to-tr from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Details */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Computer Icon */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group relative"
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    }}
                >
                    <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Monitor className="w-10 h-10 text-white drop-shadow-md" />
                </motion.div>

                {/* Site Name */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 mb-2 tracking-tight">
                        Hritik Raj
                    </h2>
                    <p className="text-white/40 mb-8 text-sm font-medium tracking-wide uppercase">
                        macOS-inspired portfolio
                    </p>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-80 rounded-xl overflow-hidden backdrop-blur-md mb-8"
                    style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                >
                    <div className="px-5 py-3.5 flex justify-between items-center border-b border-white/5">
                        <span className="text-xs text-white/50 font-medium">Developer</span>
                        <span className="text-sm text-white/90 font-medium">Hritik Raj</span>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between items-center border-b border-white/5">
                        <span className="text-xs text-white/50 font-medium">Tech Stack</span>
                        <div className="flex gap-2">
                            <span className="text-xs font-medium text-blue-400">Next.js</span>
                            <span className="text-xs font-medium text-blue-400">TS</span>
                        </div>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between items-center border-b border-white/5">
                        <span className="text-xs text-white/50 font-medium">Styling</span>
                        <div className="flex gap-2">
                            <span className="text-xs font-medium text-orange-400">Tailwind</span>
                            <span className="text-xs font-medium text-purple-400">Motion</span>
                        </div>
                    </div>
                    <div className="px-5 py-3.5 flex justify-between items-center bg-white/[0.02]">
                        <span className="text-xs text-white/50 font-medium">Last Update</span>
                        <span className="text-xs text-white/70 font-mono">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </motion.div>

                {/* Action Button */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <a
                        href="https://github.com/Hritikraj8804/Hritikraj8804.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
                        style={{
                            background: '#1a1a1a',
                            border: '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <Github className="w-4 h-4 text-white/90 group-hover:text-white transition-colors" />
                        <span>View Source</span>
                    </a>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-white/20 text-xs mt-8 font-medium"
                >
                    © 2026 Hritik Raj
                </motion.p>
            </motion.div>
        </div>
    );
}
