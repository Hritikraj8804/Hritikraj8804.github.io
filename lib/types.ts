// TypeScript types for the web desktop portfolio

export interface WindowState {
    id: string;
    title: string;
    component: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    props?: any;
}

export interface WindowManagerContextType {
    windows: WindowState[];
    activeWindowId: string | null;
    openWindow: (config: Omit<WindowState, 'id' | 'zIndex' | 'isMinimized' | 'isMaximized'>) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindow: (id: string, updates: Partial<WindowState>) => void;
}

export interface AppIcon {
    id: string;
    name: string;
    icon: string;
    component: string;
}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    source?: string;
    year: number;
    month: string;
    status?: 'NEW' | 'FEATURED';
    slug?: string;  // Maps to /public/projects/{slug}.md
}

export interface RecentActivity {
    type: 'PROJ' | 'BLOG' | 'NEW';
    title: string;
    date: string;
    link?: string;
}
