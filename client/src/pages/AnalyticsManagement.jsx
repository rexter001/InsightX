import React, { useEffect, useState, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import api from '../services/api';
import AnalyticsFormModal from '../components/AnalyticsFormModal';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { LuPlus, LuPencil, LuTrash2, LuDownload, LuSearch, LuChevronDown } from 'react-icons/lu';

const AnalyticsManagement = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: response } = await api.get('/analytics', {
                params: { search, category, sortBy, sortOrder }
            });
            setData(response);
        } catch (error) {
            toast.error('Could not sync analytics pipeline');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [search, category, sortBy, sortOrder]);

    const handleCreateOrUpdate = async (formData) => {
        try {
            if (selectedRecord) {
                await api.put(`/analytics/${selectedRecord._id}`, formData);
                toast.success('Record successfully updated.');
            } else {
                await api.post('/analytics', formData);
                toast.success('New record established.');
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Transaction error encountered');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this analytics entry?')) {
            try {
                await api.delete(`/analytics/${id}`);
                toast.success('Record removed.');
                fetchData();
            } catch (err) {
                toast.error('Unable to delete target record.');
            }
        }
    };

    const exportCSV = () => {
        if (!data.length) return toast.error('No exportable dataset active.');
        const headers = ['Title,Category,Revenue,Sales,Users,Growth(%),Date\n'];
        const rows = data.map(r =>
            `"${r.title}","${r.category}",${r.revenue},${r.sales},${r.users},${r.growth},"${r.date.substring(0, 10)}"`
        );
        const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `InsightX_Export_${Date.now()}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
            <Sidebar />
            <div className="flex-1 overflow-auto h-screen">
                <Navbar title="Core Analytics Management" />
                <main className="p-8 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-xs">
                            <span className="absolute left-3.5 top-3.5 text-slate-400"><LuSearch size={16} /></span>
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search resources..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-end">
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                            >
                                <option value="">All Categories</option>
                                {['Marketing', 'Finance', 'SaaS', 'E-Commerce', 'Education', 'Healthcare'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                            >
                                <option value="">Sort By</option>
                                <option value="revenue">Revenue</option>
                                <option value="sales">Sales</option>
                                <option value="growth">Growth</option>
                                <option value="date">Date</option>
                            </select>

                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"
                            >
                                <LuChevronDown className={`transform transition ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                            </button>

                            <button
                                onClick={exportCSV}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                            >
                                <LuDownload size={16} /> Export
                            </button>

                            <button
                                onClick={() => { setSelectedRecord(null); setIsModalOpen(true); }}
                                className="flex items-center gap-2 px-4 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-indigo-500/20 transition"
                            >
                                <LuPlus size={16} /> Add Record
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-bold text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                                        <th className="p-4">Resource Info</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Revenue</th>
                                        <th className="p-4">Sales Vol.</th>
                                        <th className="p-4">Growth</th>
                                        <th className="p-4">Date Added</th>
                                        {user?.role === 'Admin' && <th className="p-4 text-right">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                    {data.map(item => (
                                        <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                            <td className="p-4 font-semibold text-slate-800 dark:text-white">{item.title}</td>
                                            <td className="p-4"><span className="px-2.5 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-medium">{item.category}</span></td>
                                            <td className="p-4 font-mono font-bold">${item.revenue.toLocaleString()}</td>
                                            <td className="p-4 font-mono">{item.sales.toLocaleString()}</td>
                                            <td className={`p-4 font-mono font-bold ${item.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{item.growth}%</td>
                                            <td className="p-4 text-slate-500">{new Date(item.date).toLocaleDateString()}</td>
                                            {user?.role === 'Admin' && (
                                                <td className="p-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => { setSelectedRecord(item); setIsModalOpen(true); }}
                                                        className="p-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition inline-flex"
                                                    >
                                                        <LuPencil size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition inline-flex"
                                                    >
                                                        <LuTrash2 size={16} />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {!data.length && (
                            <div className="p-12 text-center text-slate-400">
                                No matching analytics datasets located.
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <AnalyticsFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateOrUpdate}
                initialData={selectedRecord}
            />
        </div>
    );
};

export default AnalyticsManagement;