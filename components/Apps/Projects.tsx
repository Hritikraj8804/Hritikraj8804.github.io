'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Folder, Loader2 } from 'lucide-react';
import { Project } from '@/lib/types';
import { useWindowManager } from '../Window/WindowManagerContext';

export default function Projects() {
    const { openWindow } = useWindowManager();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch projects from static JSON
    useEffect(() => {
        fetch('/projects.json')
            .then(res => res.json())
            .then(data => {
                setProjects(data.projects || []);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load projects:', err);
                setError('Failed to load projects');
                setIsLoading(false);
            });
    }, []);

    // Group projects by year
    const projectsByYear = projects.reduce((acc, project) => {
        if (!acc[project.year]) {
            acc[project.year] = [];
        }
        acc[project.year].push(project);
        return acc;
    }, {} as Record<number, Project[]>);

    const years = Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);

    if (isLoading) {
        return (
            <div className="h-full bg-[#f5f5f7] flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading projects...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full bg-[#f5f5f7] flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="h-full bg-[#f5f5f7] text-black overflow-y-auto">
            {/* Text Header (Sticky) */}
            <div className="sticky top-0 z-20 bg-[#f5f5f7]/90 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-24 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Folder className="w-5 h-7 text-yellow-500 fill-yellow-500" />
                        <h1 className="text-sm font-semibold text-gray-700">Projects</h1>
                    </div>
                    <span className="text-xs text-gray-500">{projects.length} projects</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-24 py-10">
                {projects.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No projects found</p>
                        <p className="text-sm mt-2">Add .md files to /public/projects/ to get started</p>
                    </div>
                ) : (
                    years.map((year, yearIndex) => (
                        <motion.div
                            key={year}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: yearIndex * 0.1 }}
                            className="mb-14"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-[#1d1d1f] mb-2">
                                    {year}
                                </h2>
                                <div className="h-[2px] w-full bg-[#6db3f2]/30" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projectsByYear[year].map((project) => (
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
                                        className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group text-left w-full h-[120px]"
                                    >
                                        {/* Icon & Month Column */}
                                        <div className="flex-shrink-0 flex flex-col items-center gap-2 w-16">
                                            {/* Simple Blue Folder Icon */}
                                            <div className="w-14 h-11 bg-[#5aa5ea] rounded-md relative shadow-sm">
                                                <div className="absolute top-0 right-0 w-5 h-5 bg-white/20 rounded-bl-md" />
                                            </div>

                                            {/* Month Pill */}
                                            <span className="bg-[#f0f0f2] text-[#6e6e73] text-[11px] font-medium px-2.5 py-1 rounded">
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
                                            <p className="text-[13px] text-[#86868b] leading-relaxed">
                                                {project.description.length > 35
                                                    ? `${project.description.substring(0, 35)}...`
                                                    : project.description}
                                            </p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
