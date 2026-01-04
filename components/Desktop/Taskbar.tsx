'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, FolderOpen, User, Mail, Github, Linkedin } from 'lucide-react';
import { useWindowManager } from '../Window/WindowManagerContext';

export default function Taskbar() {
    const { windows, focusWindow } = useWindowManager();
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const getIconForComponent = (component: string) => {
        switch (component) {
            case 'terminal': return Terminal;
            case 'projects': return FolderOpen;
            case 'about': return User;
            case 'contact': return Mail;
            default: return FolderOpen;
        }
    };

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]"
        >
            <div className="glass rounded-2xl px-2 py-2 flex items-center gap-1 shadow-2xl border border-white/10">
                {/* App Icons in Dock */}
                {windows.map((window) => {
                    const Icon = getIconForComponent(window.component);
                    return (
                        <motion.button
                            key={window.id}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => focusWindow(window.id)}
                            className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${window.isMinimized
                                    ? 'bg-white/5'
                                    : 'bg-gradient-to-br from-white/20 to-white/10'
                                }`}
                        >
                            <Icon className="w-6 h-6 text-white/90" />
                            {/* Active Indicator */}
                            {!window.isMinimized && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                            )}
                        </motion.button>
                    );
                })}

                {/* Divider */}
                {windows.length > 0 && (
                    <div className="w-px h-8 bg-white/20 mx-2" />
                )}

                {/* Quick Links */}
                <motion.a
                    href="https://github.com/Hritikraj8804"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all"
                >
                    <Github className="w-6 h-6 text-white/90" />
                </motion.a>
                <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all"
                >
                    <Linkedin className="w-6 h-6 text-white/90" />
                </motion.a>

                {/* Time */}
                <div className="px-4 text-white/80 text-sm font-medium">
                    {time}
                </div>
            </div>
        </motion.div>
    );
}
