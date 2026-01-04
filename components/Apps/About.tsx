'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Code, Briefcase, GraduationCap } from 'lucide-react';

const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Figma'] },
];

export default function About() {
    return (
        <div className="h-full bg-[#0a0a0a] p-6 overflow-auto">
            {/* Profile Section */}
            <div className="flex items-start gap-6 mb-8">
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                >
                    HR
                </motion.div>

                {/* Info */}
                <div className="flex-1">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-white mb-1"
                    >
                        Hritik Raj
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 mb-3"
                    >
                        Full Stack Developer
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 text-sm text-white/50"
                    >
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            India
                        </span>
                        <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            Open to Work
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Bio */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
            >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    About
                </h3>
                <p className="text-white/70 leading-relaxed">
                    I&apos;m a passionate developer who loves building beautiful and functional
                    web applications. I specialize in React, Next.js, and TypeScript, with a
                    focus on creating intuitive user experiences.
                </p>
                <p className="text-white/70 leading-relaxed mt-3">
                    When I&apos;m not coding, you can find me exploring new technologies,
                    contributing to open source, and learning about the latest in web development.
                </p>
            </motion.div>

            {/* Skills */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Skills
                </h3>
                <div className="space-y-4">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <h4 className="text-sm font-medium text-white/50 mb-2">
                                {skillGroup.category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-sm rounded-lg bg-white/10 text-white/80 hover:bg-white/15 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
