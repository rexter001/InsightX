import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MetricCard from '../components/MetricCard';
import api from '../services/api';
import RevenueTrend from '../charts/RevenueTrend';
import MonthlySales from '../charts/MonthlySales';
import CategoryDistribution from '../charts/CategoryDistribution';
import UserGrowth from '../charts/UserGrowth';
import RevenueVsUsers from '../charts/RevenueVsUsers';
import { LuDollarSign, LuShoppingBag, LuUsers, LuTrendingUp, LuLoader, LuCalendar } from 'react-icons/lu';

const Dashboard = () => {
    const [analytics, setAnalytics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        startDate: '',
        endDate: ''
    });

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.startDate) params.startDate = filters.startDate;
            if (filters.endDate) params.endDate = filters.endDate;

            const { data } = await api.get('/analytics', { params });
            setAnalytics(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [filters]);

    const aggregateMetrics = () => {
        if (!analytics.length) return { revenue: 0, sales: 0, users: 0, growth: 0 };
        const totalRev = analytics.reduce((acc, curr) => acc + curr.revenue, 0);
        const totalSales = analytics.reduce((acc, curr) => acc + curr.sales, 0);
        const totalUsers = analytics.reduce((acc, curr) => acc + curr.users, 0);
        const avgGrowth = (analytics.reduce((acc, curr) => acc + curr.growth, 0) / analytics.length).toFixed(1);

        return { revenue: totalRev, sales: totalSales, users: totalUsers, growth: avgGrowth };
    };

    const getChartData = () => {
        return analytics.map(item => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: item.revenue,
            sales: item.sales,
            users: item.users,
            category: item.category
        }));
    };

    const getCategoryData = () => {
        const map = {};
        analytics.forEach(item => {
            map[item.category] = (map[item.category] || 0) + item.revenue;
        });
        return Object.keys(map).map(key => ({ name: key, value: map[key] }));
    };

    const metrics = aggregateMetrics();
    const chartData = getChartData();
    const categoryData = getCategoryData();

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
            <Sidebar />
            <div className="flex-1 overflow-auto h-screen">
                <Navbar title="Analytical Dashboard" />

                <main className="p-8 space-y-8">
                    {/* Real-time Filters */}
                    <section className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 text-slate-500">
                            <LuCalendar />
                            <span className="text-sm font-semibold">Filter Datasets:</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="" className="dark:bg-slate-900">All Categories</option>
                                {['Marketing', 'Finance', 'SaaS', 'E-Commerce', 'Education', 'Healthcare'].map(cat => (
                                    <option key={cat} value={cat} className="dark:bg-slate-900">{cat}</option>
                                ))}
                            </select>

                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm"
                                />
                                <span className="text-slate-400">to</span>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm"
                                />
                            </div>
                        </div>
                    </section>

                    {loading ? (
                        <div className="h-96 flex items-center justify-center">
                            <LuLoader className="animate-spin text-indigo-500" size={40} />
                        </div>
                    ) : (
                        <>
                            {/* KPIs */}
                            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                <MetricCard
                                    title="Total Revenue"
                                    value={`$${metrics.revenue.toLocaleString()}`}
                                    gradient="from-indigo-500 to-indigo-600"
                                    icon={<LuDollarSign size={20} />}
                                />
                                <MetricCard
                                    title="Total Volume Sales"
                                    value={metrics.sales.toLocaleString()}
                                    gradient="from-teal-400 to-teal-500"
                                    icon={<LuShoppingBag size={20} />}
                                />
                                <MetricCard
                                    title="Platform Users"
                                    value={metrics.users.toLocaleString()}
                                    gradient="from-pink-500 to-pink-600"
                                    icon={<LuUsers size={20} />}
                                />
                                <MetricCard
                                    title="Avg MoM Growth"
                                    value={`${metrics.growth}%`}
                                    change={metrics.growth}
                                    gradient="from-amber-400 to-amber-500"
                                    icon={<LuTrendingUp size={20} />}
                                />
                            </section>

                            {/* Data Visualization Matrix */}
                            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                                    <h4 className="text-base font-bold mb-4">Revenue Growth Trend</h4>
                                    <RevenueTrend data={chartData} />
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                                    <h4 className="text-base font-bold mb-4">Monthly Sales Pipeline</h4>
                                    <MonthlySales data={chartData} />
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                                    <h4 className="text-base font-bold mb-4">Category Resource Allocation</h4>
                                    <CategoryDistribution data={categoryData} />
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 xl:col-span-2">
                                    <h4 className="text-base font-bold mb-4">Aggregate User Onboarding Flow</h4>
                                    <UserGrowth data={chartData} />
                                </div>
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 xl:col-span-1">
                                    <h4 className="text-base font-bold mb-4">Product Yield vs Audience</h4>
                                    <RevenueVsUsers data={chartData} />
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;