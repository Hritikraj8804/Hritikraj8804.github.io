import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectDetailsProps {
    project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    if (!project) return <div className="p-4">Project not found</div>;

    return (
        <div className="h-full bg-white text-black overflow-y-auto font-sans">
            {/* Header Section */}
            <div className="p-8 pb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {project.month} {project.year}
                </span>
            </div>

            {/* Main Content */}
            <div className="px-8 pb-8 max-w-3xl">
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {project.description}
                </p>

                <div className="prose prose-gray max-w-none">
                    {/* Placeholder content since we don't have detailed descriptions yet */}
                    <p>
                        A twist on the standard project implementation.
                    </p>
                    <p>
                        <strong>Premise:</strong> This project explores the intersection of design and functionality, creating a unique user experience.
                    </p>
                    <p>
                        <strong>Gameplay:</strong> Using modern web technologies, we've built a responsive and interactive application that demonstrates key concepts.
                    </p>
                </div>

                {/* Banner Image Placeholder (matching standard itch.io style embed in reference) */}
                <div className="mt-8 mb-8 bg-black rounded-lg overflow-hidden relative group">
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                        {/* Simulation of a game/project embed */}
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-400 mb-4">Click to view project</p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-[#ff424d] text-white font-bold py-2 px-6 rounded hover:bg-[#ff202e] transition-colors"
                            >
                                View Project
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Actions like Github Button */}
                <div className="flex justify-center mt-8">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium transition-colors shadow-sm"
                    >
                        <Github className="w-5 h-5" />
                        <span>{project.link.replace('https://github.com/', '')}</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
