'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Blog() {
    return (
        <div className="h-full w-full bg-[#1e1e1e] text-gray-200 font-mono p-6 overflow-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
            >
                <div className="mb-8 border-b border-gray-700 pb-4">
                    <h1 className="text-3xl font-bold text-white mb-2">My Blog</h1>
                    <p className="text-gray-400">Thoughts, tutorials, and insights.</p>
                </div>

                <div className="space-y-8">
                    {/* Placeholder Post 1 */}
                    <div className="p-4 rounded-lg bg-[#252526] border border-gray-800 hover:border-blue-500/30 transition-colors cursor-pointer">
                        <span className="text-xs text-blue-400 mb-2 block">Coming Soon</span>
                        <h2 className="text-xl font-bold text-white mb-2">Welcome to my new portfolio</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            I'm currently rebuilding my portfolio with a macOS-inspired interface using Next.js and Tailwind CSS. Stay tuned for a deep dive into how I built this!
                        </p>
                    </div>

                    {/* Placeholder Post 2 */}
                    <div className="p-4 rounded-lg bg-[#252526] border border-gray-800 hover:border-blue-500/30 transition-colors cursor-pointer">
                        <span className="text-xs text-green-400 mb-2 block">Coming Soon</span>
                        <h2 className="text-xl font-bold text-white mb-2">Why I love TypeScript</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            TypeScript has saved me from countless bugs. Here are my top 5 tips for writing cleaner, type-safe code in 2026.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
