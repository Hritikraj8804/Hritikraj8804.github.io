'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Hritikraj8804' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/hritik-raj-8804hr/' },
];

const experience = [
    {
        role: 'Cloud & DevOps Enthusiast',
        company: 'Self-learning',
        url: '#',
    },
    {
        role: 'Open Source Contributor',
        company: 'Various Projects',
        url: 'https://github.com/Hritikraj8804',
    },
];

export default function About() {
    return (
        <div className="h-full bg-[#f5f5f5] text-gray-800 overflow-auto">
            <div className="flex min-h-full">
                {/* Left Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-52 bg-white border-r border-gray-200 p-6 flex flex-col"
                >
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 mb-3">
                            <Image
                                src="/images/x.jpg"
                                alt="Hritik Raj"
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Hritik Raj</h2>
                    </div>

                    {/* Socials */}
                    <div className="mb-6">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Socials
                        </h3>
                        <div className="space-y-2">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <social.icon className="w-4 h-4" />
                                    <span>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Contact
                        </h3>
                        <a
                            href="mailto:hritikraj8804@gmail.com"
                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                        </a>
                    </div>
                </motion.div>

                {/* Right Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 p-8"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div></div>
                        <span className="text-sm text-gray-500">Technology Enthusiast</span>
                    </div>

                    {/* Experience */}
                    <section className="mb-8">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Experience
                        </h3>
                        <div className="space-y-3">
                            {experience.map((exp, index) => (
                                <motion.div
                                    key={exp.role}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-gray-800">{exp.role}</span>
                                    <a
                                        href={exp.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                                    >
                                        {exp.company}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* About */}
                    <section>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            About
                        </h3>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4 text-gray-700 leading-relaxed"
                        >
                            <p>
                                Technology enthusiast with experience in <strong>cloud computing</strong> and{' '}
                                <strong>DevOps</strong>. Actively contributes to open-source communities and
                                participates in developer programs and initiatives.
                            </p>
                            <p>
                                Strong interest in learning, collaboration, and building practical, user-focused
                                tech solutions.
                            </p>
                            <p>
                                I enjoy exploring new technologies, automating workflows, and creating tools that
                                make development more efficient. Currently focused on expanding my skills in
                                container orchestration, CI/CD pipelines, and infrastructure as code.
                            </p>
                        </motion.div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
