import React, { useState, useEffect, useRef } from 'react';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'system';
    });
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close theme dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsThemeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Theme DOM Manipulation
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Interface Theme</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select or customize your UI theme.</p>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                    className="flex items-center justify-between w-36 px-4 py-2 bg-gray-50 dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white capitalize focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-colors"
                >
                    {theme}
                    <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isThemeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isThemeOpen && (
                    <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden z-10">
                        {['light', 'dark', 'system'].map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTheme(t); setIsThemeOpen(false); }}
                                className={`block w-full text-left px-4 py-2.5 text-sm capitalize transition-colors ${theme === t ? 'text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-500/10' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            >
                                {t} Mode
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeSwitcher;