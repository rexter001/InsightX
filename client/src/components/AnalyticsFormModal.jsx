import React, { useState, useEffect } from 'react';
import { LuX } from 'react-icons/lu';

const AnalyticsFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'SaaS',
        revenue: '',
        sales: '',
        users: '',
        growth: '',
        date: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                category: initialData.category || 'SaaS',
                revenue: initialData.revenue || '',
                sales: initialData.sales || '',
                users: initialData.users || '',
                growth: initialData.growth || '',
                date: initialData.date ? initialData.date.substring(0, 10) : ''
            });
        } else {
            setFormData({
                title: '',
                category: 'SaaS',
                revenue: '',
                sales: '',
                users: '',
                growth: '',
                date: ''
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {initialData ? 'Update Analytics Record' : 'Create New Analytics Record'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition">
                        <LuX size={20} />
                    </button>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            placeholder="e.g. Q3 SaaS Rollout"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                {['Marketing', 'Finance', 'SaaS', 'E-Commerce', 'Education', 'Healthcare'].map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Revenue ($)</label>
                            <input
                                type="number"
                                name="revenue"
                                required
                                value={formData.revenue}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="45000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Sales</label>
                            <input
                                type="number"
                                name="sales"
                                required
                                value={formData.sales}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="1200"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Active Users</label>
                            <input
                                type="number"
                                name="users"
                                required
                                value={formData.users}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="5000"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Growth (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="growth"
                                required
                                value={formData.growth}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="15.5"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg hover:shadow-indigo-500/20 transition"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnalyticsFormModal;