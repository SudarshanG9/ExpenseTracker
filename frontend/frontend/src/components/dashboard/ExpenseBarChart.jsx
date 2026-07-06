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
    // We keep this inside the component for now as requested.
    // In a real app, this data would be passed down as a prop from the backend.
    const dummyData = {
        Daily: [
            { label: 'Mon', amount: 45 },
            { label: 'Tue', amount: 120 },
            { label: 'Wed', amount: 30 },
            { label: 'Thu', amount: 80 },
            { label: 'Fri', amount: 150 },
            { label: 'Sat', amount: 200 },
            { label: 'Sun', amount: 90 },
        ],
        Weekly: [
            { label: 'Week 1', amount: 450 },
            { label: 'Week 2', amount: 320 },
            { label: 'Week 3', amount: 500 },
            { label: 'Week 4', amount: 280 },
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

    // Select the correct array of data based on the timeframe prop.
    // Fallback to Monthly if an invalid timeframe is passed.
    const activeData = dummyData[timeframe] || dummyData.Monthly;

    // Formatter function for the tooltip to display currency nicely
    const formatCurrency = (value) => `$${value}`;

    return (
        <div className="w-full h-[300px] mt-4">
            {/* ResponsiveContainer ensures the chart fills its parent div perfectly */}
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={activeData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    {/* Background grid lines (horizontal only for a cleaner look) */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

                    {/* X-Axis: Shows the labels (e.g., Mon, Tue, Jan, Feb) */}
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                    />

                    {/* Y-Axis: Shows the numbers */}
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `$${value}`}
                    />

                    {/* Tooltip: The popup that appears when hovering over a bar */}
                    <Tooltip
                        formatter={formatCurrency}
                        cursor={{ fill: '#F3F4F6' }} // Light gray background on hover
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />

                    {/* The actual bars representing the 'amount' data key */}
                    <Bar
                        dataKey="amount"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]} // Rounds the top corners of the bars
                        barSize={32} // Max width of the bars
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseBarChart;