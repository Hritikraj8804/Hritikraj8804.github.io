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
                    <Folder className="w-5 h-7 text-yellow-500 fill-yellow-500" />
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
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
                                {year}
                            </h2>
                            <div className="h-[2px] w-full bg-[#6db3f2]/30" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                                    whileHover={{ y: -2, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)" }}
                                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group text-left w-full h-[140px]"
                                >
                                    {/* Icon & Month Column */}
                                    <div className="flex-shrink-0 flex flex-col items-center gap-3 w-16">
                                        {/* Simple Blue Folder Icon */}
                                        <div className="w-14 h-11 bg-[#5aa5ea] rounded-md relative shadow-sm">
                                            <div className="absolute top-0 right-0 w-5 h-5 bg-white/20 rounded-bl-md" />
                                        </div>

                                        {/* Month Pill */}
                                        <span className="bg-[#f0f0f2] text-[#6e6e73] text-[11px] font-medium px-2.5 py-1 rounded-full w-full text-center">
                                            {project.month}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-[#1d1d1f] text-base leading-tight mb-1 truncate pr-2">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className="text-[13px] text-[#86868b] leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
