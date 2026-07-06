import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * CategoryPieChart Component
 * 
 * Displays a visual breakdown of expenses by category using a donut chart.
 * It includes a dropdown to filter the data by timeframe (Daily, Weekly, Monthly).
 */
const CategoryPieChart = () => {
    // 1. STATE LIVES HERE: To control the active timeframe filter
    const [timeframe, setTimeframe] = useState('Monthly');

    // 2. DUMMY DATA: Hardcoded datasets for the UI. 
    // Later, these will be replaced by data fetched from your FastAPI backend.
    const dummyData = {
        Daily: [
            { name: 'Food', value: 25 },
            { name: 'Transport', value: 15 },
            { name: 'Coffee', value: 5 },
        ],
        Weekly: [
            { name: 'Food', value: 150 },
            { name: 'Transport', value: 60 },
            { name: 'Groceries', value: 120 },
            { name: 'Entertainment', value: 40 },
        ],
        Monthly: [
            { name: 'Housing', value: 1200 },
            { name: 'Food', value: 400 },
            { name: 'Transport', value: 150 },
            { name: 'Utilities', value: 200 },
            { name: 'Entertainment', value: 100 },
        ]
    };

    // Select the active dataset based on the current state
    const activeData = dummyData[timeframe];

    // Colors for the pie slices
    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">

            {/* Header section with Title and Dropdown */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Expenses by Category</h3>

                {/* Dropdown changes the 'timeframe' state when clicked */}
                <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </div>

            {/* Chart Section */}
            <div className="flex-1 w-full min-h-[250px]">
                {/* ResponsiveContainer ensures the chart shrinks and grows with the flexbox */}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={activeData}
                            cx="50%" // Center X
                            cy="50%" // Center Y
                            innerRadius={60} // Creates the "Donut" hole
                            outerRadius={80} // Outer size
                            paddingAngle={5} // Space between slices
                            dataKey="value" // Which property holds the number
                        >
                            {/* Map through data to assign a specific color to each slice */}
                            {activeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        {/* Built-in Tooltip shows values when hovering over slices */}
                        <Tooltip
                            formatter={(value) => `$${value}`} // Formats the tooltip number as currency
                        />

                        {/* Built-in Legend shows the color key below the chart */}
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default CategoryPieChart;