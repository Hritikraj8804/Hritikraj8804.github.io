'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { WindowState, WindowManagerContextType } from '@/lib/types';

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function useWindowManager() {
    const context = useContext(WindowManagerContext);
    if (!context) {
        throw new Error('useWindowManager must be used within a WindowManagerProvider');
    }
    return context;
}

let windowIdCounter = 0;
let zIndexCounter = 100;

interface WindowManagerProviderProps {
    children: ReactNode;
}

export function WindowManagerProvider({ children }: WindowManagerProviderProps) {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

    const openWindow = useCallback((config: Omit<WindowState, 'id' | 'zIndex' | 'isMinimized' | 'isMaximized'>) => {
        // Check if window with same component is already open
        // For project-details, we also check if the title matches (assuming title is unique per project)
        const isProjectDetail = config.component === 'project-details';
        const existingWindow = windows.find(w => {
            if (isProjectDetail) {
                return w.component === config.component && w.title === config.title;
            }
            return w.component === config.component;
        });

        if (existingWindow) {
            // Focus the existing window instead
            focusWindow(existingWindow.id);
            return;
        }

        const id = `window-${++windowIdCounter}`;
        // Ensure new window is always on top
        const zIndex = ++zIndexCounter;

        // Calculate staggered position
        let position = config.position;
        if (config.component !== 'aboutsite' && position) {
            const offset = windows.length * 30;
            position = {
                x: position.x + offset,
                y: position.y + offset
            };
        }

        const newWindow: WindowState = {
            ...config,
            id,
            zIndex,
            position: position || { x: 100, y: 100 },
            isMinimized: false,
            isMaximized: false,
        };

        setWindows(prev => [...prev, newWindow]);
        setActiveWindowId(id);
    }, [windows]);

    const closeWindow = useCallback((id: string) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        setActiveWindowId(prev => prev === id ? null : prev);
    }, []);

    const minimizeWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, isMinimized: true } : w
        ));
        setActiveWindowId(prev => prev === id ? null : prev);
    }, []);

    const maximizeWindow = useCallback((id: string) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
        ));
    }, []);

    const focusWindow = useCallback((id: string) => {
        const newZIndex = ++zIndexCounter;
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w
        ));
        setActiveWindowId(id);
    }, []);

    const updateWindow = useCallback((id: string, updates: Partial<WindowState>) => {
        setWindows(prev => prev.map(w =>
            w.id === id ? { ...w, ...updates } : w
        ));
    }, []);

    const value: WindowManagerContextType = {
        windows,
        activeWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindow,
    };

    return (
        <WindowManagerContext.Provider value={value}>
            {children}
        </WindowManagerContext.Provider>
    );
}
