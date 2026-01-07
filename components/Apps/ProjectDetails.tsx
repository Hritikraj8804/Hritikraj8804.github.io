import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Layers, Code, ArrowUpRight, Star, Eye, GitFork } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectDetailsProps {
    project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    if (!project) return <div className="h-full flex items-center justify-center text-gray-400">Project not found</div>;

    return (
        <div className="h-full bg-[#0a0a0a] text-white overflow-y-auto scroll-smooth">

            {/* Hero Section - Minimal & Clean */}
            <div className="relative min-h-[320px] flex items-end overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pb-12 pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* Status Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                {project.status || 'Completed'}
                            </span>
                            <span className="text-zinc-500 text-sm font-medium">
                                {project.month} {project.year}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                            {project.title}
                        </h1>

                        {/* Short Description */}
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="border-y border-zinc-800/50 bg-zinc-900/30 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-zinc-400">
                            <Star size={16} className="text-yellow-500" />
                            <span className="text-sm font-medium">Featured</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                            <Eye size={16} />
                            <span className="text-sm font-medium">1.2k views</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                            <GitFork size={16} />
                            <span className="text-sm font-medium">Open Source</span>
                        </div>
                    </div>

                    {/* Tech Tags Inline */}
                    <div className="flex items-center gap-2">
                        {project.tags?.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-full border border-zinc-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Project Preview */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 relative group">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10">
                                            <ArrowUpRight size={28} className="text-white" />
                                        </div>
                                        <p className="text-zinc-400 text-sm">Preview not available</p>
                                    </div>
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                                >
                                    <span className="px-6 py-3 bg-white text-black font-semibold rounded-full transform scale-90 group-hover:scale-100 transition-transform">
                                        View Live Demo
                                    </span>
                                </a>
                            </div>
                        </motion.section>

                        {/* About Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-1 h-6 bg-violet-500 rounded-full" />
                                About This Project
                            </h2>
                            <div className="prose prose-invert prose-zinc max-w-none">
                                <p className="text-zinc-400 leading-relaxed text-lg">
                                    {project.description}
                                </p>
                                <p className="text-zinc-400 leading-relaxed">
                                    This project was built to solve real-world problems while exploring modern development practices.
                                    It showcases clean architecture, responsive design, and attention to user experience.
                                </p>
                            </div>
                        </motion.section>

                        {/* Key Features */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-1 h-6 bg-cyan-500 rounded-full" />
                                Key Features
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Modern UI/UX Design', 'Responsive Layout', 'Performance Optimized', 'Clean Codebase'].map((feature, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 flex items-start gap-3"
                                    >
                                        <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-violet-400 text-sm font-bold">{i + 1}</span>
                                        </div>
                                        <span className="text-zinc-300 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">

                        {/* Action Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 space-y-4 sticky top-8"
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-white text-black px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all shadow-lg shadow-white/5 hover:shadow-white/10"
                            >
                                <ExternalLink size={18} />
                                Visit Project
                            </a>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-zinc-800 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors border border-zinc-700"
                            >
                                <Github size={18} />
                                View Source
                            </a>
                        </motion.div>

                        {/* Project Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 space-y-6"
                        >
                            {/* Tech Stack */}
                            {project.tags && project.tags.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Layers size={14} />
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg border border-zinc-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="h-px bg-zinc-800" />

                            {/* Timeline */}
                            <div>
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Calendar size={14} />
                                    Timeline
                                </h3>
                                <p className="text-zinc-300 font-medium">{project.month} {project.year}</p>
                            </div>

                            <div className="h-px bg-zinc-800" />

                            {/* Role */}
                            <div>
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Code size={14} />
                                    Role
                                </h3>
                                <p className="text-zinc-300 font-medium">Full Stack Developer</p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Bottom Spacer */}
            <div className="h-24" />
        </div>
    );
}

