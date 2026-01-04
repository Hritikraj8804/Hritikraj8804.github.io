'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, FolderOpen, User, Mail, FileText } from 'lucide-react';
import DesktopIcon from './DesktopIcon';
import { useWindowManager } from '../Window/WindowManagerContext';

const desktopApps = [
    { id: 'terminal', name: 'Terminal', icon: Terminal, component: 'terminal' },
    { id: 'projects', name: 'Projects', icon: FolderOpen, component: 'projects' },
    { id: 'about', name: 'About Me', icon: User, component: 'about' },
    { id: 'contact', name: 'Contact', icon: Mail, component: 'contact' },
    { id: 'resume', name: 'Resume', icon: FileText, component: 'resume' },
];

const defaultWindowConfigs: Record<string, { width: number; height: number; x: number; y: number }> = {
    terminal: { width: 700, height: 450, x: 100, y: 80 },
    projects: { width: 800, height: 500, x: 150, y: 100 },
    about: { width: 600, height: 450, x: 200, y: 120 },
    contact: { width: 500, height: 400, x: 250, y: 140 },
    resume: { width: 700, height: 500, x: 180, y: 100 },
};

export default function Desktop() {
    const { openWindow } = useWindowManager();

    const handleOpenApp = (app: typeof desktopApps[0]) => {
        const config = defaultWindowConfigs[app.component] || { width: 600, height: 400, x: 100, y: 100 };
        openWindow({
            title: app.name,
            component: app.component,
            position: { x: config.x, y: config.y },
            size: { width: config.width, height: config.height },
        });
    };

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Wallpaper */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]"
                style={{
                    backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(20, 20, 20, 1) 0%, transparent 100%)
          `,
                }}
            />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Desktop Icons */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-8 left-8 flex flex-col gap-2"
            >
                {desktopApps.map((app, index) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <DesktopIcon
                            name={app.name}
                            icon={app.icon}
                            onClick={() => handleOpenApp(app)}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
