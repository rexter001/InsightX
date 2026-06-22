import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RevenueVsUsers = ({ data }) => {
    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="revenue" barSize={20} fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                    <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={3} dot={{ r: 3 }} name="Users" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueVsUsers;