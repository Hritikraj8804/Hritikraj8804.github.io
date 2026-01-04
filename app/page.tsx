'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { WindowManagerProvider, useWindowManager } from '@/components/Window/WindowManagerContext';
import Window from '@/components/Window/Window';
import Desktop from '@/components/Desktop/Desktop';
import Taskbar from '@/components/Desktop/Taskbar';
import Terminal from '@/components/Apps/Terminal';
import Projects from '@/components/Apps/Projects';
import About from '@/components/Apps/About';
import Contact from '@/components/Apps/Contact';
import Resume from '@/components/Apps/Resume';

const appComponents: Record<string, React.ComponentType> = {
  terminal: Terminal,
  projects: Projects,
  about: About,
  contact: Contact,
  resume: Resume,
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
            <AppComponent />
          </Window>
        );
      })}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <WindowManagerProvider>
      <main className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a]">
        {/* Desktop Background & Icons */}
        <Desktop />

        {/* Windows */}
        <WindowManager />

        {/* Taskbar */}
        <Taskbar />
      </main>
    </WindowManagerProvider>
  );
}
