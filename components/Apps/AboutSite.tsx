'use client';

import React from 'react';
import { Monitor, Github } from 'lucide-react';

export default function AboutSite() {
    return (
        <div className="h-full bg-[#1a1a1a] flex flex-col items-center justify-center p-8">
            {/* Computer Icon */}
            <div
                className="w-16 h-16 mb-5 rounded-lg flex items-center justify-center"
                style={{ background: '#3b82f6' }}
            >
                <Monitor className="w-8 h-8 text-white" />
            </div>

            {/* Site Name */}
            <h2 className="text-2xl font-bold text-white mb-1">
                Hritik Raj
            </h2>
            <p className="text-white/50 mb-6 text-sm">
                macOS-inspired portfolio experience
            </p>

            {/* Info Table */}
            <div
                className="w-full max-w-xs rounded-lg p-4 mb-6 text-[13px]"
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">Developer</span>
                    <span className="text-white">Hritik Raj</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">Built with</span>
                    <span className="text-blue-400">Next.js + TypeScript</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">Extras</span>
                    <span className="text-orange-400">Tailwind, Framer Motion</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-white/60">Updated</span>
                    <span className="text-white">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <a
                href="https://github.com/Hritikraj8804/Hritikraj8804.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.15)' }}
            >
                <Github className="w-4 h-4" />
                View Source
            </a>

            {/* Copyright */}
            <p className="text-white/30 text-sm mt-4">
                © 2026 Hritik Raj
            </p>
        </div>
    );
}
