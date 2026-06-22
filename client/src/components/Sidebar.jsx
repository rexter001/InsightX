import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LuLayoutDashboard, LuListTodo, LuShieldAlert, LuLogOut, LuTrendingUp } from 'react-icons/lu';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LuLayoutDashboard size={20} /> },
        { name: 'Management', path: '/management', icon: <LuListTodo size={20} /> },
    ];

    if (user?.role === 'Admin') {
        navItems.push({ name: 'Admin Panel', path: '/admin', icon: <LuShieldAlert size={20} /> });
    }

    return (
        <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-screen sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-gradient-to-tr from-indigo-500 to-violet-500 text-white rounded-lg">
                        <LuTrendingUp size={22} />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                        InsightX
                    </span>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-violet-400 to-indigo-400 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[130px]">{user?.name}</h4>
                        <p className="text-xs text-slate-500 truncate max-w-[130px]">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition"
                >
                    <LuLogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;