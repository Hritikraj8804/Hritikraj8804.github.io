'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowManagerProvider, useWindowManager } from '@/components/Window/WindowManagerContext';
import Window from '@/components/Window/Window';
import Desktop from '@/components/Desktop/Desktop';
import TopMenuBar from '@/components/Desktop/TopMenuBar';
import Terminal from '@/components/Apps/Terminal';
import Projects from '@/components/Apps/Projects';
import About from '@/components/Apps/About';
import Contact from '@/components/Apps/Contact';
import Resume from '@/components/Apps/Resume';
import AboutSite from '@/components/Apps/AboutSite';
import Blog from '@/components/Apps/Blog';
import ProjectDetails from '@/components/Apps/ProjectDetails';

const appComponents: Record<string, React.ComponentType<any>> = {
  terminal: Terminal,
  projects: Projects,
  about: About,
  contact: Contact,
  resume: Resume,
  aboutsite: AboutSite,
  blog: Blog,
  'project-details': ProjectDetails,
};

function WindowManager() {
  const { windows } = useWindowManager();

  return (
    <AnimatePresence>
      {windows.map((windowState) => {
        const AppComponent = appComponents[windowState.component];
        if (!AppComponent) return null;

        return (
          <Window key={windowState.id} window={windowState}>
            <AppComponent {...(windowState.props || {})} />
          </Window>
        );
      })}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <WindowManagerProvider>
      <main className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a] flex flex-col">
        {/* Top Menu Bar */}
        <TopMenuBar />

        {/* Desktop Background & Icons */}
        <div className="flex-1 relative">
          <Desktop />
        </div>

        {/* Windows */}
        <WindowManager />
      </main>
    </WindowManagerProvider>
  );
}
