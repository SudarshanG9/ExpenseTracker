import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * CategoryPieChart Component
 * 
 * Displays a visual breakdown of expenses by category using a donut chart.
 * It includes a dropdown to filter the data by timeframe (Daily, Weekly, Monthly).
 */
const CategoryPieChart = ({ expenses = [] }) => {
    const [timeframe, setTimeframe] = useState('Monthly');
    const { formatCurrency } = useCurrency();

    // Aggregate expenses by category
    const categoryTotals = expenses.reduce((acc, expense) => {
        const cat = expense.category || 'Other';
        acc[cat] = (acc[cat] || 0) + (Number(expense.amount) || 0);
        return acc;
    }, {});

    // Convert to array format expected by chart
    const activeData = Object.keys(categoryTotals).map(key => ({
        name: key,
        value: categoryTotals[key]
    })).sort((a, b) => b.value - a.value); // Sort largest to smallest

    const total = activeData.reduce((sum, item) => sum + item.value, 0);

    // Vibrant colors for the pie slices
    const COLORS = ['#10B981', '#3B82F6', '#A855F7', '#F97316', '#EAB308', '#EF4444'];

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-[#1a1f2e] border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{payload[0].name}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">

            {/* Header section with Title and Dropdown */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Category Analysis</h3>

                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="bg-gray-50 dark:bg-[#1a1f2e] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg focus:ring-blue-500/50 focus:border-blue-500/50 p-1.5 outline-none cursor-pointer"
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
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(total)}</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">Total</span>
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
                                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(item.value)}</span>
                                    <span className="text-gray-500 dark:text-gray-400 w-12 text-right">({percentage}%)</span>
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