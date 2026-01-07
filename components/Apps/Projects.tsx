import React from 'react';
import { motion } from 'framer-motion';
import { Folder, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/types';
import { useWindowManager } from '../Window/WindowManagerContext';

const projects: Project[] = [
    {
        title: 'MacPuppet',
        description: 'A VTuber software for Mac using ARKit face tracking.',
        tags: ['Swift', 'ARKit'],
        link: 'https://github.com/Hritikraj8804',
        year: 2023,
        month: 'Sep',
        status: 'FEATURED',
    },
    {
        title: 'Lucky Knight',
        description: 'GMTK Game Jam 2023 Entry: Play as "Luck" and manipulate probability.',
        tags: ['Unity', 'C#'],
        link: 'https://github.com/Hritikraj8804',
        year: 2023,
        month: 'Jul',
    },
    {
        title: 'GMTK Game Entry',
        description: 'Theme was roll of a dice and I built a game where you shoot dice.',
        tags: ['Unity', 'C#'],
        link: 'https://github.com/Hritikraj8804',
        year: 2022,
        month: 'May',
    },
    {
        title: 'Unity NFT Market',
        description: 'Prototype of how NFTs can be used to create a marketplace for games.',
        tags: ['Unity', 'Blockchain'],
        link: 'https://github.com/Hritikraj8804',
        year: 2022,
        month: 'Apr',
    },
    {
        title: 'Desonity',
        description: 'A comprehensive Unity SDK for the DeSo Blockchain, enabling login and transactions.',
        tags: ['Unity', 'C#', 'DeSo'],
        link: 'https://github.com/Hritikraj8804',
        year: 2022,
        month: 'Mar',
    },
    {
        title: 'Cordify',
        description: 'A bridge between Web2 social platforms and the DeSo blockchain.',
        tags: ['React', 'Node.js'],
        link: 'https://github.com/Hritikraj8804',
        year: 2021,
        month: 'Dec',
    },
    {
        title: 'Animedoro Timer',
        description: 'A simple pomodoro timer for anime lovers, built in Vanilla JS.',
        tags: ['JavaScript', 'HTML/CSS'],
        link: 'https://github.com/Hritikraj8804',
        year: 2021,
        month: 'Aug',
    },
];

export default function Projects() {
    const { openWindow } = useWindowManager();
    // Group projects by year
    const projectsByYear = projects.reduce((acc, project) => {
        if (!acc[project.year]) {
            acc[project.year] = [];
        }
        acc[project.year].push(project);
        return acc;
    }, {} as Record<number, Project[]>);

    const years = Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);

    return (
        <div className="h-full bg-[#f5f5f7] text-black overflow-y-auto">
            {/* Text Header (Sticky) */}
            <div className="sticky top-0 z-20 bg-[#f5f5f7]/90 backdrop-blur-md px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <h1 className="text-sm font-semibold text-gray-700">Projects</h1>
                </div>
                <span className="text-xs text-gray-500">{projects.length} projects</span>
            </div>

            <div className="p-8">
                {years.map((year, yearIndex) => (
                    <motion.div
                        key={year}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: yearIndex * 0.1 }}
                        className="mb-10"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                            {year}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projectsByYear[year].map((project, index) => (
                                <motion.button
                                    key={project.title}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openWindow({
                                            component: 'project-details',
                                            title: project.title,
                                            size: { width: 800, height: 600 },
                                            position: { x: 150, y: 100 },
                                            props: { project }
                                        })
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-start gap-4 group text-left w-full"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                                        <div className="w-12 h-10 bg-blue-500 rounded-md flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-4 h-4 bg-white/20 rounded-bl-md" />
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 rounded-full">
                                            {project.month}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className="text-[10px] text-gray-400">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
