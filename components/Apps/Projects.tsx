'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Project } from '@/lib/types';

const projects: Project[] = [
    {
        title: 'Web Desktop Portfolio',
        description: 'A macOS-inspired portfolio website with draggable windows, a functional terminal, and glassmorphism design.',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
        link: 'https://github.com/Hritikraj8804/Hritikraj8804.github.io',
        status: 'FEATURED',
    },
    {
        title: 'Project Two',
        description: 'A brief description of your second project. What it does and what technologies it uses.',
        tags: ['React', 'Node.js', 'MongoDB'],
        link: 'https://github.com/Hritikraj8804',
    },
    {
        title: 'Project Three',
        description: 'A brief description of your third project. Showcase your best work here.',
        tags: ['Python', 'FastAPI', 'PostgreSQL'],
        link: 'https://github.com/Hritikraj8804',
        status: 'NEW',
    },
    {
        title: 'Project Four',
        description: 'Another amazing project you have worked on. Keep adding your projects here.',
        tags: ['TypeScript', 'Vue.js', 'Supabase'],
        link: 'https://github.com/Hritikraj8804',
    },
];

export default function Projects() {
    return (
        <div className="h-full bg-[#0a0a0a] p-6 overflow-auto">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">My Projects</h2>
                <p className="text-sm text-white/60">
                    A collection of projects I&apos;ve worked on. Click the links to view on GitHub.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                        {/* Status Badge */}
                        {project.status && (
                            <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-medium ${project.status === 'FEATURED'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-green-500/20 text-green-400'
                                }`}>
                                {project.status === 'FEATURED' && <Star className="w-3 h-3 inline mr-1" />}
                                {project.status}
                            </div>
                        )}

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-white mb-2 pr-20">
                            {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/60 mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-xs rounded-md bg-white/10 text-white/70"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                <span>Source</span>
                            </a>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>Live Demo</span>
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
