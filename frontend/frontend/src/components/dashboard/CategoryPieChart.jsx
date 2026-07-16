import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * CategoryPieChart Component
 * 
 * Displays a visual breakdown of expenses by category using a donut chart.
 * It includes a dropdown to filter the data by timeframe (Daily, Weekly, Monthly).
 */
const CategoryPieChart = () => {
    // 1. STATE LIVES HERE: To control the active timeframe filter
    const [timeframe, setTimeframe] = useState('Monthly');

    // 2. DUMMY DATA
    const dummyData = {
        Daily: [
            { name: 'Food & Dining', value: 250 },
            { name: 'Transport', value: 150 },
            { name: 'Coffee', value: 50 },
        ],
        Weekly: [
            { name: 'Food & Dining', value: 1500 },
            { name: 'Transport', value: 600 },
            { name: 'Shopping', value: 1200 },
            { name: 'Entertainment', value: 400 },
        ],
        Monthly: [
            { name: 'Food & Dining', value: 2450 },
            { name: 'Transport', value: 1520 },
            { name: 'Shopping', value: 1280 },
            { name: 'Entertainment', value: 980 },
            { name: 'Utilities', value: 720 },
            { name: 'Others', value: 489 },
        ]
    };

    const activeData = dummyData[timeframe];
    const total = activeData.reduce((sum, item) => sum + item.value, 0);

    // Vibrant colors for the pie slices
    const COLORS = ['#10B981', '#3B82F6', '#A855F7', '#F97316', '#EAB308', '#EF4444'];

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1f2e] border border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-xs text-gray-400">{payload[0].name}</p>
                    <p className="text-sm font-semibold text-white">₹{payload[0].value.toLocaleString('en-IN')}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">

            {/* Header section with Title and Dropdown */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-white">Category Analysis</h3>

                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="bg-[#1a1f2e] border border-gray-700 text-gray-300 text-xs rounded-lg focus:ring-blue-500/50 focus:border-blue-500/50 p-1.5 outline-none cursor-pointer"
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>

            {/* Chart + Legend Layout */}
            <div className="flex-1 flex flex-col items-center">
                {/* Donut Chart with center label */}
                <div className="relative w-full" style={{ height: '180px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={activeData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {activeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-lg font-bold text-white">₹{total.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-gray-500">Total</span>
                    </div>
                </div>

                {/* Legend List */}
                <div className="w-full mt-3 space-y-2">
                    {activeData.map((item, index) => {
                        const percentage = ((item.value / total) * 100).toFixed(1);
                        return (
                            <div key={item.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-gray-300">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-medium">₹{item.value.toLocaleString('en-IN')}</span>
                                    <span className="text-gray-500 w-12 text-right">({percentage}%)</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default CategoryPieChart;