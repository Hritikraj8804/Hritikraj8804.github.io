'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';

const experience = [
    {
        title: 'Full Stack Developer',
        company: 'Company Name',
        period: '2023 - Present',
        description: 'Building modern web applications with React and Node.js.',
    },
    {
        title: 'Frontend Developer',
        company: 'Previous Company',
        period: '2022 - 2023',
        description: 'Developed responsive UI components and improved performance.',
    },
];

const education = [
    {
        degree: 'Bachelor of Technology',
        institution: 'University Name',
        period: '2019 - 2023',
        description: 'Computer Science and Engineering',
    },
];

const certifications = [
    'AWS Cloud Practitioner',
    'Meta Frontend Developer',
    'Google Cloud Fundamentals',
];

export default function Resume() {
    return (
        <div className="h-full bg-[#0a0a0a] p-6 overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Hritik Raj</h2>
                    <p className="text-white/60">Full Stack Developer</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </motion.button>
            </div>

            {/* Experience */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    Experience
                </h3>
                <div className="space-y-4">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={exp.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="relative pl-6 border-l-2 border-white/10"
                        >
                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-500" />
                            <h4 className="text-white font-medium">{exp.title}</h4>
                            <p className="text-white/60 text-sm">{exp.company}</p>
                            <p className="text-white/40 text-xs flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                            </p>
                            <p className="text-white/50 text-sm mt-2">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Education */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-400" />
                    Education
                </h3>
                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + 0.1 * index }}
                            className="relative pl-6 border-l-2 border-white/10"
                        >
                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-green-500" />
                            <h4 className="text-white font-medium">{edu.degree}</h4>
                            <p className="text-white/60 text-sm">{edu.institution}</p>
                            <p className="text-white/40 text-xs flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3" />
                                {edu.period}
                            </p>
                            <p className="text-white/50 text-sm mt-2">{edu.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Certifications */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                        <span
                            key={cert}
                            className="px-3 py-1.5 text-sm rounded-lg bg-white/10 text-white/80"
                        >
                            {cert}
                        </span>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
