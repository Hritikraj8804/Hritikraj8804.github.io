'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
    name: string;
    icon: LucideIcon;
    onClick: () => void;
}

export default function DesktopIcon({ name, icon: Icon, onClick }: DesktopIconProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            onDoubleClick={onClick}
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group w-24"
        >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all shadow-lg">
                <Icon className="w-7 h-7 text-white/90" />
            </div>
            <span className="text-xs text-white/80 text-center font-medium leading-tight drop-shadow-lg">
                {name}
            </span>
        </motion.button>
    );
}
