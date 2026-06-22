import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CategoryDistribution = ({ data }) => {
    const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'];

    return (
        <div className="w-full h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryDistribution;