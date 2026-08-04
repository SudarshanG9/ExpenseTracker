import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
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
const ExpenseBarChart = ({ timeframe = 'Monthly', expenses = [] }) => {
    const { currency, formatCurrency } = useCurrency();

    // Simple dynamic aggregation based on the raw date strings (YYYY-MM-DD).
    let activeData = [];

    if (timeframe === 'Monthly') {
        const monthlyTotals = expenses.reduce((acc, exp) => {
            const month = exp.date ? exp.date.substring(0, 7) : 'Unknown'; // e.g. 2026-05
            acc[month] = (acc[month] || 0) + (Number(exp.amount) || 0);
            return acc;
        }, {});

        activeData = Object.keys(monthlyTotals).sort().map(month => ({
            label: month,
            amount: monthlyTotals[month]
        }));
    } else {
        // Fallback for Daily/Weekly: Just group by exact Date for now
        const dailyTotals = expenses.reduce((acc, exp) => {
            const day = exp.date || 'Unknown';
            acc[day] = (acc[day] || 0) + (Number(exp.amount) || 0);
            return acc;
        }, {});

        activeData = Object.keys(dailyTotals).sort().map(day => ({
            label: day,
            amount: dailyTotals[day]
        }));
    }


    // Custom tooltip styled for dark theme
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-[#1a1f2e] border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 shadow-xl">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(payload[0].value)}</p>
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
                        tickFormatter={(value) => `${currency.symbol}${value}`}
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