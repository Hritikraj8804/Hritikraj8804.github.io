'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, Link as LinkIcon, Github, ArrowUpRight, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Project } from '@/lib/types';
import { motion } from 'framer-motion';

interface ProjectDetailsProps {
    project: Project;
}

const CodeBlock = ({ className, children, ...rest }: any) => {
    const [copied, setCopied] = useState(false);
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!match) {
        return (
            <code className={className} {...rest}>
                {children}
            </code>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden my-12 border border-gray-200 bg-gray-50 shadow-sm relative group text-left">
            <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono uppercase tracking-wider font-semibold">
                        {match[1]}
                    </span>
                    <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                        title="Copy code"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>
            </div>
            <div className="text-sm">
                <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, padding: '1.5rem', borderRadius: 0, fontSize: '0.9rem', lineHeight: '1.6' }}
                    {...rest}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

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
            <div className="h-full flex items-center justify-center text-gray-500 bg-white">
                Project not found
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center bg-white">
                <div className="flex items-center gap-3 text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-white overflow-y-auto font-sans selection:bg-sky-100 selection:text-sky-900 text-black">
            <div className="min-h-full px-12 md:px-20 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-8 text-center"
                >
                    {/* Header */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                            <span className="bg-gray-100 text-black px-4 py-1.5 rounded-full font-bold text-xs tracking-wide border border-gray-200">
                                {project.year}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                {project.month}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-900 leading-relaxed max-w-3xl mx-auto font-normal">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 pt-4">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="bg-sky-50 border border-sky-200 text-sky-700 px-4 py-1.5 rounded-full text-sm uppercase tracking-wide font-bold hover:bg-sky-100 hover:border-sky-300 transition-colors cursor-default"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-center gap-5 pt-8">
                            {project.source && (
                                <a
                                    href={project.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 text-black hover:text-gray-700 transition-colors font-bold border-2 border-gray-200 px-8 py-3 rounded-full hover:border-black hover:bg-white text-base"
                                >
                                    <Github size={20} className="text-black group-hover:scale-110 transition-transform" />
                                    <span>Source</span>
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 bg-black text-white hover:bg-gray-800 transition-colors px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200 text-base"
                                >
                                    <span>Visit Project</span>
                                    <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100 my-16" />

                    {/* Markdown Content */}
                    <article className="prose prose-xl prose-headings:text-black prose-p:text-gray-900 prose-p:leading-loose prose-li:text-gray-900 prose-strong:text-black prose-a:text-sky-600 prose-blockquote:text-gray-900 prose-th:text-black prose-td:text-gray-900
                    text-left mx-auto max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:mb-8 prose-li:mb-4
                    prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-gray-100 prose-img:my-12
                    ">
                        {markdown ? (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code: CodeBlock
                                }}
                            >
                                {markdown}
                            </ReactMarkdown>
                        ) : (
                            <div className="text-center py-20 text-gray-500 font-medium text-lg">
                                Loading detailed view...
                            </div>
                        )}
                    </article>

                    {/* Footer */}
                    <div className="pt-20 pb-10 text-center">
                        <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">Designed for {project.title}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
