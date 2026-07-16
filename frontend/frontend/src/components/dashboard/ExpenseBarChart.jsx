import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

/**
 * ExpenseBarChart Component
 * 
 * Displays a bar chart representing expenses over time. 
 * It dynamically switches its dataset based on the `timeframe` prop 
 * (Daily, Weekly, or Monthly).
 */
const ExpenseBarChart = ({ timeframe = 'Monthly' }) => {
    // DUMMY DATA: Hardcoded datasets to visualize the UI.
    const dummyData = {
        Daily: [
            { label: 'Mon', amount: 450 },
            { label: 'Tue', amount: 1200 },
            { label: 'Wed', amount: 300 },
            { label: 'Thu', amount: 800 },
            { label: 'Fri', amount: 1850 },
            { label: 'Sat', amount: 600 },
            { label: 'Sun', amount: 900 },
        ],
        Weekly: [
            { label: 'Week 1', amount: 4500 },
            { label: 'Week 2', amount: 3200 },
            { label: 'Week 3', amount: 5000 },
            { label: 'Week 4', amount: 2800 },
        ],
        Monthly: [
            { label: 'Jan', amount: 1200 },
            { label: 'Feb', amount: 1500 },
            { label: 'Mar', amount: 1100 },
            { label: 'Apr', amount: 1800 },
            { label: 'May', amount: 1300 },
            { label: 'Jun', amount: 1600 },
        ]
    };

    const activeData = dummyData[timeframe] || dummyData.Monthly;

    const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

    // Custom tooltip styled for dark theme
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-white">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[280px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={activeData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                    {/* Dark grid lines */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e2433" />

                    {/* X-Axis */}
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        dy={10}
                    />

                    {/* Y-Axis */}
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 11 }}
                        tickFormatter={(value) => `₹${value}`}
                    />

                    {/* Tooltip */}
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    />

                    {/* Bars with gradient blue */}
                    <Bar
                        dataKey="amount"
                        fill="#3B82F6"
                        radius={[6, 6, 0, 0]}
                        barSize={28}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseBarChart;