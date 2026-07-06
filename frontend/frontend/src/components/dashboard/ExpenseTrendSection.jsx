import React, { useState } from 'react';

// Import the sub-components we just built
import TimeFilter from './TimeFilter';
import DateNavigator from './DateNavigator';
import ExpenseBarChart from './ExpenseBarChart';

/**
 * ExpenseTrendSection Component
 * 
 * The main container for the trend chart. It manages the state for the 
 * selected timeframe and passes that state down to the controls and the chart.
 */
const ExpenseTrendSection = () => {
    // 1. STATE LIVES HERE: The lowest common ancestor of the controls and the chart.
    const [timeframe, setTimeframe] = useState('Monthly');

    // This state would track how far back the user has navigated (e.g., -1 for last month).
    // For the UI dummy version, we will just use it to change the label text.
    const [offset, setOffset] = useState(0);

    // A helper function to generate a dummy label based on the state.
    // In a real app, you would use a date library like `date-fns` to calculate the real dates.
    const getDynamicLabel = () => {
        if (timeframe === 'Monthly') return '2026';
        if (timeframe === 'Weekly') return 'July 2026';
        if (timeframe === 'Daily') return 'Week 2, July';
        return '';
    };

    // Handlers for the DateNavigator buttons
    const handlePrevClick = () => {
        setOffset((prev) => prev - 1);
        console.log("Navigated backward. Offset:", offset - 1);
    };

    const handleNextClick = () => {
        if (offset < 0) {
            setOffset((prev) => prev + 1);
            console.log("Navigated forward. Offset:", offset + 1);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

            {/* Top Header Row: Title and Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">

                {/* Section Title */}
                <h2 className="text-lg font-bold text-gray-800">Expense Trends</h2>

                {/* Controls Container */}
                <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center gap-4">

                    {/* Left/Right Date Navigation */}
                    <DateNavigator
                        currentLabel={getDynamicLabel()}
                        onPrevClick={handlePrevClick}
                        onNextClick={handleNextClick}
                    />

                    {/* Daily/Weekly/Monthly Toggle Pill */}
                    <TimeFilter
                        activeFilter={timeframe}
                        onFilterChange={setTimeframe}
                    />

                </div>
            </div>

            {/* The Visual Chart */}
            {/* We pass the timeframe state down so the chart knows which dataset to render */}
            <ExpenseBarChart timeframe={timeframe} />

        </div>
    );
};

export default ExpenseTrendSection;