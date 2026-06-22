import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';
import MetricCard from '../components/MetricCard';
import { LuUsers, LuFolder, LuDollarSign, LuShoppingBag, LuTrendingUp, LuLoader } from 'react-icons/lu';

const AdminPanel = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/users')
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error('Error fetching admin statistics');
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <LuLoader className="animate-spin text-indigo-500" size={40} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
            <Sidebar />
            <div className="flex-1 overflow-auto h-screen">
                <Navbar title="Administrative Infrastructure" />
                <main className="p-8 space-y-8">
                    {/* Admin KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            title="System Operators"
                            value={stats?.totalUsers}
                            gradient="from-blue-500 to-blue-600"
                            icon={<LuUsers size={20} />}
                        />
                        <MetricCard
                            title="Global Records"
                            value={stats?.totalRecords}
                            gradient="from-teal-500 to-teal-600"
                            icon={<LuFolder size={20} />}
                        />
                        <MetricCard
                            title="Cumulative Revenue"
                            value={`$${stats?.totalRevenue.toLocaleString()}`}
                            gradient="from-indigo-500 to-indigo-600"
                            icon={<LuDollarSign size={20} />}
                        />
                        <MetricCard
                            title="Cumulative Sales Volume"
                            value={stats?.totalSales.toLocaleString()}
                            gradient="from-amber-500 to-amber-600"
                            icon={<LuShoppingBag size={20} />}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Database Category Spread */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:col-span-1">
                            <h3 className="text-base font-bold mb-4">Category Volume & Yield</h3>
                            <div className="space-y-4">
                                {stats?.categories.map((cat) => (
                                    <div key={cat._id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-sm">{cat._id}</p>
                                            <p className="text-xs text-slate-400">{cat.count} Datasets</p>
                                        </div>
                                        <span className="font-mono text-sm font-bold text-indigo-500">
                                            ${cat.totalRevenue.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Platform Users Base */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:col-span-2 overflow-hidden">
                            <h3 className="text-base font-bold mb-4">Identity & Access Control List</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-400 font-bold">
                                            <th className="pb-3">Name</th>
                                            <th className="pb-3">Email Address</th>
                                            <th className="pb-3">Access Level</th>
                                            <th className="pb-3">Date Registered</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                                                <td className="py-3 font-semibold">{u.name}</td>
                                                <td className="py-3 font-mono">{u.email}</td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${u.role === 'Admin'
                                                            ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                                                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                                                        }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;

