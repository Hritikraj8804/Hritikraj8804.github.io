'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, Link as LinkIcon, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';

interface ProjectDetailsProps {
    project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const [markdown, setMarkdown] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (project?.slug) {
            setIsLoading(true);
            fetch(`/projects/${project.slug}.md`)
                .then(res => res.ok ? res.text() : null)
                .then(content => {
                    let cleanContent = content;
                    if (content) {
                        cleanContent = content.replace(/^---[\s\S]*?---\n*/m, '');
                        cleanContent = cleanContent.replace(/^\+\+\+[\s\S]*?\+\+\+\n*/m, '');
                    }
                    setMarkdown(cleanContent);
                    setIsLoading(false);
                })
                .catch(() => {
                    setMarkdown(null);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [project?.slug]);

    if (!project) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400 bg-white">
                Project not found
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center bg-white">
                <div className="flex items-center gap-3 text-gray-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-white overflow-y-auto text-gray-800 font-sans">
            {/* Header Section */}
            <div className="bg-gray-50 border-b border-gray-200 py-10 px-8">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium text-xs uppercase tracking-wider">
                                {project.year}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {project.month}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 pt-4">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium border border-gray-300 px-4 py-2 rounded-lg hover:border-blue-400 hover:bg-blue-50"
                                >
                                    <Github size={18} />
                                    <span>View Source</span>
                                </a>
                            )}
                            <a
                                href={project.link} // fallback if separate demo link isn't in generic project type yet, or use link for both
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-gray-900 text-white hover:bg-black transition-colors px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow"
                            >
                                <LinkIcon size={18} />
                                <span>Visit Project</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Markdown Content */}
            <article className="max-w-3xl mx-auto px-8 py-12 prose prose-lg prose-gray
                
                // Headings
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h1:text-3xl prose-h1:mb-8
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4

                // Text
                prose-p:text-gray-700 prose-p:leading-8 prose-p:my-6
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700
                
                // Links
                prose-a:text-blue-600 prose-a:no-underline prose-a:border-b prose-a:border-blue-200 hover:prose-a:border-blue-600 hover:prose-a:text-blue-700 transition-colors

                // Lists
                prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                
                // Code
                prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0

                // Images
                prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-100 prose-img:my-8

                // Tables
                prose-table:border prose-table:border-gray-200 prose-table:rounded-lg prose-table:overflow-hidden
                prose-th:bg-gray-50 prose-th:p-4 prose-th:text-gray-900
                prose-td:p-4 prose-td:border-t prose-td:border-gray-100
            ">
                {markdown ? (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Custom code block renderer with syntax highlighting
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <div className="rounded-xl overflow-hidden shadow-sm my-8 border border-gray-200">
                                        <div className="bg-[#1e1e1e] px-4 py-2 flex items-center gap-2 border-b border-gray-700/50">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                            </div>
                                            <span className="text-xs text-gray-400 font-mono ml-2 uppercase">
                                                {match[1]}
                                            </span>
                                        </div>
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{ margin: 0, borderRadius: 0 }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            // Custom components for custom shortcodes from Hugo (e.g. {{< youtube >}})
                            // Since we're raw rendering, we might see text like {{< youtube ... >}}
                            // We can't easily parse Hugo shortcodes in client-side react-markdown without a custom plugin
                            // But we can try to style them if they appear as text, or just accept that strict Hugo shortcodes won't render.
                            // However, standard MD images will render fine.
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        Content loading or not available...
                    </div>
                )}
            </article>

            {/* Footer */}
            <div className="border-t border-gray-200 py-10 text-center text-gray-400 text-sm">
                Thanks for viewing {project.title}!
            </div>
        </div>
    );
}
