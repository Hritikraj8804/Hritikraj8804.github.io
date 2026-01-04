'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
    type: 'input' | 'output';
    content: string;
}

const COMMANDS: Record<string, string | string[]> = {
    help: [
        'Available commands:',
        '  help     - Show this help message',
        '  about    - Learn about me',
        '  skills   - View my technical skills',
        '  projects - List my projects',
        '  contact  - Get my contact info',
        '  socials  - View my social links',
        '  clear    - Clear the terminal',
        '',
        'Type a command and press Enter.',
    ],
    about: [
        '┌─────────────────────────────────────┐',
        '│          About Me                   │',
        '└─────────────────────────────────────┘',
        '',
        '👋 Hi! I\'m Hritik Raj',
        '',
        'I\'m a passionate developer who loves building',
        'beautiful and functional web applications.',
        '',
        'I specialize in React, Next.js, and TypeScript,',
        'with a focus on creating intuitive user experiences.',
        '',
        'When I\'m not coding, you can find me exploring',
        'new technologies and contributing to open source.',
    ],
    skills: [
        '┌─────────────────────────────────────┐',
        '│          Technical Skills           │',
        '└─────────────────────────────────────┘',
        '',
        '▸ Languages:',
        '  JavaScript, TypeScript, Python, Java',
        '',
        '▸ Frontend:',
        '  React, Next.js, Tailwind CSS, Framer Motion',
        '',
        '▸ Backend:',
        '  Node.js, Express, PostgreSQL, MongoDB',
        '',
        '▸ Tools:',
        '  Git, Docker, VS Code, Figma',
    ],
    projects: [
        '┌─────────────────────────────────────┐',
        '│          My Projects                │',
        '└─────────────────────────────────────┘',
        '',
        '1. Web Desktop Portfolio',
        '   ➜ A macOS-style portfolio website',
        '   ➜ Tech: Next.js, Tailwind, Framer Motion',
        '',
        '2. Project Two',
        '   ➜ Description of project two',
        '   ➜ Tech: React, Node.js, MongoDB',
        '',
        '3. Project Three',
        '   ➜ Description of project three',
        '   ➜ Tech: Python, FastAPI, PostgreSQL',
        '',
        'Type "open projects" to see the full Projects app.',
    ],
    contact: [
        '┌─────────────────────────────────────┐',
        '│          Contact Me                 │',
        '└─────────────────────────────────────┘',
        '',
        '📧 Email: hritikraj8804@gmail.com',
        '📍 Location: India',
        '',
        'Feel free to reach out for collaborations',
        'or just to say hello!',
    ],
    socials: [
        '┌─────────────────────────────────────┐',
        '│          Social Links               │',
        '└─────────────────────────────────────┘',
        '',
        '🔗 GitHub:   github.com/Hritikraj8804',
        '🔗 LinkedIn: linkedin.com/in/hritikraj',
        '🔗 Twitter:  twitter.com/hritikraj',
        '',
    ],
};

export default function Terminal() {
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: 'Welcome to Hritik\'s Terminal v1.0.0' },
        { type: 'output', content: 'Type "help" for a list of commands.' },
        { type: 'output', content: '' },
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const executeCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        // Add command to history
        if (trimmedCmd) {
            setCommandHistory(prev => [...prev, trimmedCmd]);
            setHistoryIndex(-1);
        }

        // Add input line
        setLines(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);

        if (trimmedCmd === '') {
            return;
        }

        if (trimmedCmd === 'clear') {
            setLines([]);
            return;
        }

        const output = COMMANDS[trimmedCmd];
        if (output) {
            const outputLines = Array.isArray(output) ? output : [output];
            setLines(prev => [
                ...prev,
                ...outputLines.map(line => ({ type: 'output' as const, content: line })),
                { type: 'output', content: '' },
            ]);
        } else {
            setLines(prev => [
                ...prev,
                { type: 'output', content: `Command not found: ${trimmedCmd}` },
                { type: 'output', content: 'Type "help" for available commands.' },
                { type: 'output', content: '' },
            ]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(currentInput);
        setCurrentInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setCurrentInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setCurrentInput(commandHistory[newIndex]);
                }
            }
        }
    };

    return (
        <div
            ref={terminalRef}
            className="h-full bg-[#0a0a0a] p-4 font-mono text-sm overflow-auto"
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Output */}
            <div className="space-y-1">
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className={line.type === 'input' ? 'text-[#00d9ff]' : 'text-[#00ff00]'}
                    >
                        {line.content}
                    </div>
                ))}
            </div>

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center mt-1">
                <span className="text-[#00d9ff] mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[#00ff00] outline-none caret-[#00ff00]"
                    autoComplete="off"
                    spellCheck="false"
                />
                <span className="w-2 h-4 bg-[#00ff00] cursor-blink" />
            </form>
        </div>
    );
}
