import React from 'react';

const MetricCard = ({ title, value, change, icon, gradient }) => {
    const isPositive = parseFloat(change) >= 0;

    return (
        <div className={`p-6 rounded-2xl glass shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md`}>
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-4 -translate-y-4 opacity-10 bg-gradient-to-bl from-white to-transparent rounded-full" />
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
                    {change !== undefined && (
                        <span className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${isPositive
                                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                                : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                            }`}>
                            {isPositive ? '+' : ''}{change}%
                        </span>
                    )}
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${gradient} text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;