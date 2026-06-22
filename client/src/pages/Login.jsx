import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { LuMail, LuLock, LuTrendingUp } from 'react-icons/lu';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data);
            toast.success(`Welcome back, ${data.name}!`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl w-full max-w-md shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-gradient-to-tr from-indigo-500 to-violet-500 text-white rounded-2xl mb-4">
                        <LuTrendingUp size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Sign in to InsightX</h2>
                    <p className="text-slate-400 text-sm mt-1">Access your operational dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email address</label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-3.5 text-slate-500"><LuMail size={18} /></span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-3.5 text-slate-500"><LuLock size={18} /></span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-500/10"
                    >
                        {loading ? 'Verifying...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;