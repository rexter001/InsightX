import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LuSun, LuMoon } from 'react-icons/lu';

const Navbar = ({ title }) => {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                    {darkMode ? <LuSun size={18} /> : <LuMoon size={18} />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;