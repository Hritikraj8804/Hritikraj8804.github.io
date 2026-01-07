'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Apple, Search, Folder, User, Terminal, Mail, FileText, ExternalLink, Monitor, Github, Rss, X } from 'lucide-react';
import { useWindowManager } from '@/components/Window/WindowManagerContext';

// Apps
const apps = [
    { id: 'about', title: 'About Me', category: 'app', icon: User, component: 'about' },
    { id: 'projects', title: 'Projects', category: 'app', icon: Folder, component: 'projects' },
    { id: 'terminal', title: 'Terminal', category: 'app', icon: Terminal, component: 'terminal' },
    { id: 'contact', title: 'Contact', category: 'app', icon: Mail, component: 'contact' },
    { id: 'resume', title: 'Resume', category: 'app', icon: FileText, component: 'resume' },
];

// Projects (from your Projects.tsx)
const projects = [
    {
        id: 'web-desktop',
        title: 'Web Desktop Portfolio',
        category: 'projects',
        tags: ['Next.js', 'TypeScript', 'Tailwind'],
        link: 'https://github.com/Hritikraj8804/Hritikraj8804.github.io'
    },
    {
        id: 'project-two',
        title: 'Project Two',
        category: 'projects',
        tags: ['React', 'Node.js', 'MongoDB'],
        link: 'https://github.com/Hritikraj8804'
    },
    {
        id: 'project-three',
        title: 'Project Three',
        category: 'projects',
        tags: ['Python', 'FastAPI', 'PostgreSQL'],
        link: 'https://github.com/Hritikraj8804'
    },
    {
        id: 'project-four',
        title: 'Project Four',
        category: 'projects',
        tags: ['TypeScript', 'Vue.js', 'Supabase'],
        link: 'https://github.com/Hritikraj8804'
    },
];

type SearchItem = {
    id: string;
    title: string;
    category: string;
    icon?: React.ComponentType<{ className?: string }>;
    component?: string;
    tags?: string[];
    link?: string;
};

export default function TopMenuBar() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { windows, closeWindow, openWindow } = useWindowManager();

    // Combine all searchable items
    const allItems: SearchItem[] = [...apps, ...projects];

    // Filter results based on search query
    const filteredItems = searchQuery.trim()
        ? allItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
        )
        : [];

    // Group filtered items by category
    const groupedResults = {
        app: filteredItems.filter(item => item.category === 'app'),
        projects: filteredItems.filter(item => item.category === 'projects'),
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isSearchOpen) return;

            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setSearchQuery('');
                setSelectedIndex(0);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' && filteredItems.length > 0) {
                e.preventDefault();
                handleSelectItem(filteredItems[selectedIndex]);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, filteredItems, selectedIndex]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    const formatDateTime = (date: Date) => {
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        return `${day}, ${monthDay}, ${time}`;
    };

    const handleSelectItem = (item: SearchItem) => {
        if (item.component) {
            // It's an app - open window
            openWindow({
                title: item.title,
                component: item.component,
                position: { x: 150 + Math.random() * 100, y: 80 + Math.random() * 50 },
                size: { width: 700, height: 500 }
            });
        } else if (item.link) {
            // It's a project - open link
            window.open(item.link, '_blank');
        }
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    const handleCloseAllWindows = () => {
        windows.forEach(w => closeWindow(w.id));
        setIsMenuOpen(false);
    };

    const handleAboutThisSite = () => {
        setIsAboutOpen(true);
        setIsMenuOpen(false);
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const menuItems = [
        { label: 'About This Site', action: handleAboutThisSite },
        { label: 'Close All Windows', action: handleCloseAllWindows },
        { label: 'Tile Windows', action: () => setIsMenuOpen(false) },
        { divider: true },
        { label: 'Refresh', action: handleRefresh },
    ];

    // Get cumulative index for an item
    const getCumulativeIndex = (category: 'app' | 'projects', indexInCategory: number): number => {
        if (category === 'app') return indexInCategory;
        return groupedResults.app.length + indexInCategory;
    };

    return (
        <>
            {/* Menu Bar */}
            <div
                className="h-7 flex items-center justify-between text-white text-[13px] font-medium select-none relative z-[9999]"
                style={{
                    background: 'rgba(30, 30, 30, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    paddingLeft: '16px',
                    paddingRight: '16px'
                }}
            >
                {/* Left Side - Logo with Dropdown */}
                <div className="flex items-center gap-4 relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="hover:opacity-70 transition-opacity p-1"
                    >
                        <Apple className="w-4 h-4" />
                    </button>
                    <span className="font-semibold">Finder</span>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div
                            className="absolute top-8 left-0 w-52 py-2 rounded-lg shadow-2xl"
                            style={{
                                background: 'rgba(40, 40, 40, 0.98)',
                                backdropFilter: 'blur(30px)',
                                border: '1px solid rgba(255,255,255,0.15)'
                            }}
                        >
                            {menuItems.map((item, index) => (
                                item.divider ? (
                                    <div key={index} className="h-px bg-white/10 my-2 mx-3" />
                                ) : (
                                    <button
                                        key={index}
                                        onClick={item.action}
                                        className="w-full px-4 py-2 text-left text-[13px] text-white/90 hover:bg-blue-500 hover:text-white transition-colors rounded-md mx-1"
                                        style={{ width: 'calc(100% - 8px)' }}
                                    >
                                        {item.label}
                                    </button>
                                )
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side - Search and DateTime */}
                <div className="flex items-center gap-5">
                    <button
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search className="w-4 h-4 text-white/80" />
                    </button>
                    <span className="text-white/90">{formatDateTime(currentTime)}</span>
                </div>
            </div>

            {/* Spotlight Search Overlay */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 z-[10000] flex items-start justify-center"
                    style={{
                        background: 'rgba(0,0,0,0.4)',
                        paddingTop: '100px'
                    }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                        }
                    }}
                >
                    <div
                        className="w-[620px] rounded-xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'rgba(35, 35, 38, 0.98)',
                            backdropFilter: 'blur(50px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.6)'
                        }}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-4 px-5 py-4">
                            <Search className="w-6 h-6 text-white/40" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="flex-1 bg-transparent text-white text-xl font-light outline-none placeholder:text-white/30"
                            />
                        </div>

                        {/* Search Results - Only show when typing */}
                        {searchQuery.trim() && (
                            <div className="max-h-[420px] overflow-y-auto border-t border-white/10">
                                {filteredItems.length > 0 ? (
                                    <div className="py-1">
                                        {/* Apps Section */}
                                        {groupedResults.app.length > 0 && (
                                            <>
                                                {groupedResults.app.map((item, index) => {
                                                    const Icon = item.icon!;
                                                    const cumIndex = getCumulativeIndex('app', index);
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => handleSelectItem(item)}
                                                            className={`w-full flex items-center gap-4 px-5 py-2.5 transition-colors ${cumIndex === selectedIndex
                                                                ? 'bg-blue-500'
                                                                : 'hover:bg-white/5'
                                                                }`}
                                                        >
                                                            <div
                                                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                                                style={{ background: 'rgba(255,255,255,0.1)' }}
                                                            >
                                                                <Icon className="w-5 h-5 text-white" />
                                                            </div>
                                                            <div className="text-left">
                                                                <div className="text-white text-[14px]">
                                                                    {item.title}
                                                                </div>
                                                                <div className="text-white/50 text-[11px]">
                                                                    {item.category}
                                                                </div>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </>
                                        )}

                                        {/* Projects Section */}
                                        {groupedResults.projects.length > 0 && (
                                            <>
                                                {groupedResults.projects.map((item, index) => {
                                                    const cumIndex = getCumulativeIndex('projects', index);
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => handleSelectItem(item)}
                                                            className={`w-full flex items-center gap-4 px-5 py-2.5 transition-colors ${cumIndex === selectedIndex
                                                                ? 'bg-blue-500'
                                                                : 'hover:bg-white/5'
                                                                }`}
                                                        >
                                                            <div
                                                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                                                style={{ background: 'rgba(255,200,50,0.15)' }}
                                                            >
                                                                <Folder className="w-5 h-5 text-yellow-400" />
                                                            </div>
                                                            <div className="text-left flex-1">
                                                                <div className="text-white text-[14px]">
                                                                    {item.title}
                                                                </div>
                                                                <div className="text-white/50 text-[11px]">
                                                                    {item.category}
                                                                </div>
                                                            </div>
                                                            <ExternalLink className="w-4 h-4 text-white/30" />
                                                        </button>
                                                    );
                                                })}
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center text-white/40 text-sm">
                                        No results for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* About This Site Modal */}
            {isAboutOpen && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsAboutOpen(false);
                    }}
                >
                    <div
                        className="w-[420px] rounded-xl overflow-hidden shadow-2xl"
                        style={{
                            background: '#1a1a1a',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 25px 80px rgba(0,0,0,0.6)'
                        }}
                    >
                        {/* Window Header */}
                        <div
                            className="h-9 flex items-center px-4 relative group/header"
                            style={{
                                background: 'linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)',
                                borderBottom: '1px solid rgba(0,0,0,0.3)'
                            }}
                        >
                            {/* Traffic Lights */}
                            <div className="flex items-center gap-2" style={{ marginLeft: '4px' }}>
                                <button
                                    onClick={() => setIsAboutOpen(false)}
                                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
                                />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-white/80">
                                About This Site
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col items-center">
                            {/* Computer Icon */}
                            <div
                                className="w-16 h-16 mb-5 rounded-lg flex items-center justify-center"
                                style={{ background: '#3b82f6' }}
                            >
                                <Monitor className="w-8 h-8 text-white" />
                            </div>

                            {/* Site Name */}
                            <h2 className="text-2xl font-bold text-white mb-1">
                                hritik.dev
                            </h2>
                            <p className="text-white/50 mb-6 text-sm">
                                macOS-inspired portfolio experience
                            </p>

                            {/* Info Table */}
                            <div
                                className="w-full rounded-lg p-4 mb-6 text-[13px]"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-white/60">Developer</span>
                                    <span className="text-white">Hritik Raj</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-white/60">Built with</span>
                                    <span className="text-blue-400">Next.js + TypeScript</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-white/60">Extras</span>
                                    <span className="text-orange-400">Tailwind, Framer Motion</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-white/60">Updated</span>
                                    <span className="text-white">
                                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <a
                                href="https://github.com/Hritikraj8804/Hritikraj8804.github.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                                style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.15)' }}
                            >
                                <Github className="w-4 h-4" />
                                View Source
                            </a>

                            {/* Copyright */}
                            <p className="text-white/30 text-sm mt-4">
                                © 2026 Hritik Raj
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}