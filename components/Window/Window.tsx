'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { WindowState } from '@/lib/types';
import { useWindowManager } from './WindowManagerContext';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
}

export default function Window({ window: windowState, children }: WindowProps) {
    const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindow, activeWindowId } = useWindowManager();
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const windowRef = useRef<HTMLDivElement>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const resizeStartSize = useRef({ width: 0, height: 0 });
    const resizeStartPos = useRef({ x: 0, y: 0 });

    const isActive = activeWindowId === windowState.id;

    // Handle dragging
    const handleDragStart = (e: React.MouseEvent) => {
        if (windowState.isMaximized) return;
        e.preventDefault();
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - windowState.position.x,
            y: e.clientY - windowState.position.y,
        };
        focusWindow(windowState.id);
    };

    const handleDrag = (e: MouseEvent) => {
        if (!isDragging) return;
        const newX = Math.max(0, e.clientX - dragStartPos.current.x);
        const newY = Math.max(0, e.clientY - dragStartPos.current.y);
        updateWindow(windowState.id, { position: { x: newX, y: newY } });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    // Handle resizing
    const handleResizeStart = (e: React.MouseEvent) => {
        if (windowState.isMaximized) return;
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        resizeStartSize.current = { ...windowState.size };
        resizeStartPos.current = { x: e.clientX, y: e.clientY };
        focusWindow(windowState.id);
    };

    const handleResize = (e: MouseEvent) => {
        if (!isResizing) return;
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;
        const newWidth = Math.max(400, resizeStartSize.current.width + deltaX);
        const newHeight = Math.max(300, resizeStartSize.current.height + deltaY);
        updateWindow(windowState.id, { size: { width: newWidth, height: newHeight } });
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', handleDragEnd);
            return () => {
                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', handleDragEnd);
            };
        }
    }, [isDragging]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', handleResizeEnd);
            return () => {
                document.removeEventListener('mousemove', handleResize);
                document.removeEventListener('mouseup', handleResizeEnd);
            };
        }
    }, [isResizing]);

    if (windowState.isMinimized) return null;

    const windowStyle = windowState.isMaximized
        ? { left: 0, top: 0, width: '100%', height: 'calc(100vh - 70px)' }
        : {
            left: windowState.position.x,
            top: windowState.position.y,
            width: windowState.size.width,
            height: windowState.size.height,
        };

    return (
        <motion.div
            ref={windowRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed glass-strong rounded-xl overflow-hidden shadow-2xl ${isActive ? 'ring-1 ring-white/20' : ''
                }`}
            style={{
                ...windowStyle,
                zIndex: windowState.zIndex,
            }}
            onClick={() => focusWindow(windowState.id)}
        >
            {/* Window Header */}
            <div
                className="h-10 bg-[#1e1e1e] flex items-center px-3 cursor-move select-none"
                onMouseDown={handleDragStart}
            >
                {/* Traffic Light Controls */}
                <div className="flex gap-2 mr-4">
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
                        className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors flex items-center justify-center group"
                    >
                        <X className="w-2 h-2 text-[#4a0000] opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
                        className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors flex items-center justify-center group"
                    >
                        <Minus className="w-2 h-2 text-[#4a3000] opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); maximizeWindow(windowState.id); }}
                        className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors flex items-center justify-center group"
                    >
                        {windowState.isMaximized ? (
                            <Square className="w-1.5 h-1.5 text-[#004a00] opacity-0 group-hover:opacity-100" />
                        ) : (
                            <Maximize2 className="w-2 h-2 text-[#004a00] opacity-0 group-hover:opacity-100" />
                        )}
                    </button>
                </div>

                {/* Window Title */}
                <span className="text-sm text-white/80 font-medium flex-1 text-center pr-16">
                    {windowState.title}
                </span>
            </div>

            {/* Window Content */}
            <div className="h-[calc(100%-40px)] overflow-auto bg-[#0a0a0a]">
                {children}
            </div>

            {/* Resize Handle */}
            {!windowState.isMaximized && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                    onMouseDown={handleResizeStart}
                >
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-white/30" />
                </div>
            )}
        </motion.div>
    );
}
