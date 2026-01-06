'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Github,
    Linkedin,
    User,
    Mail,
    Calendar
} from 'lucide-react';

const socials = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/Hritikraj8804' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/hritik-raj-8804hr/' },
];

export default function About() {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#e9ecef', color: '#333', overflow: 'hidden', fontFamily: 'sans-serif' }}>

            {/* Top Status Bar - Matching First Reference */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#495057' }}>
                    <User style={{ width: '18px', height: '18px', color: '#5e35b1' }} />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>About Hritik</span>
                </div>
                <span style={{ fontSize: '13px', color: '#6c757d' }}>DevOps Enthusiast</span>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Left Sidebar - Styled like Ref 1 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        width: '220px',
                        backgroundColor: '#f1f3f5',
                        borderRight: '1px solid #dee2e6',
                        display: 'flex',
                        flexDirection: 'column',
                        flexShrink: 0,
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
                        <div style={{ width: '110px', height: '110px', borderRadius: '50%', overflow: 'hidden', marginBottom: '16px', border: '4px solid white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                            <Image
                                src="/images/x.jpg"
                                alt="Hritik Raj"
                                width={110}
                                height={110}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', textAlign: 'center' }}>Hritik Raj</h2>
                    </div>

                    {/* Socials Section */}
                    <div style={{ padding: '0 24px' }}>
                        <h3 style={{ fontSize: '11px', fontWeight: 700, color: '#adb5bd', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '15px' }}>
                            Socials
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#495057', textDecoration: 'none' }}
                                >
                                    <social.icon style={{ width: '16px', height: '16px', color: '#868e96' }} />
                                    <span>{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ flex: 1, overflowY: 'auto', backgroundColor: 'white', margin: '15px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                >
                    <div style={{ padding: '40px' }}>
                        {/* Section Header */}
                        <section>
                            <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#adb5bd', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', borderBottom: '1px solid #f1f3f5', paddingBottom: '8px' }}>
                                About
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '15px', color: '#495057', lineHeight: 1.7 }}>
                                <p style={{ margin: 0 }}>
                                    I&apos;m an introvert who has missed more opportunities than I like to admit.
                                    I&apos;m the person who still attends class even when no one else shows up…
                                    and somehow ends up scoring less than the people who never attended.
                                </p>

                                <p style={{ margin: 0 }}>
                                    I get FOMO easily I start many things, get excited for a few days,
                                    then drop some of them halfway. I chose <strong style={{ color: '#212529' }}>DevOps</strong> because I enjoy systems,
                                    automation, and tools and honestly, because I don&apos;t really enjoy
                                    traditional coding.
                                </p>

                                <p style={{ margin: 0 }}>
                                    I&apos;ve taught people subjects… and still ended up with backlogs myself.
                                    I&apos;ve sat through hundreds of meetings in silence. I&apos;ve laughed at
                                    people at times and life came full circle, and now some of them laugh at me.
                                </p>

                                <p style={{ margin: 0 }}>
                                    I&apos;m still unemployed, still figuring things out, still unsure about
                                    effort vs ambition. I&apos;ve never opened an AWS account because I&apos;m
                                    scared I&apos;ll mess up and get charged heavily and because I know myself
                                    well enough to admit it.
                                </p>

                                <p style={{ margin: 0 }}>
                                    But here I am still learning, still showing up, still trying to understand
                                    my pace, my strengths, my flaws, and my path.
                                </p>

                                <p style={{ margin: 0 }}>
                                    I believe in taking small steps, building consistency, and embracing failure
                                    as part of the journey. Every day I try to learn something new whether it&apos;s Docker, Kubernetes, Linux, or just understanding how things work under the hood.
                                </p>

                                <p style={{ margin: 0 }}>
                                    My goal is simple: to become good enough at what I do to be useful, to contribute
                                    to teams and projects that matter, and to someday look back and feel proud of
                                    how far I&apos;ve come.
                                </p>

                                <p style={{ margin: 0, color: '#adb5bd', fontStyle: 'italic', paddingTop: '8px' }}>
                                    Not perfect. Not polished. Just honest.
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}