import React from 'react';

/**
 * TimeFilter Component
 * 
 * A set of toggle buttons allowing the user to switch the timeframe 
 * context (Daily, Weekly, Monthly) for the dashboard charts.
 */
const TimeFilter = ({ activeFilter = 'Monthly', onFilterChange }) => {
    const options = ['Daily', 'Weekly', 'Monthly'];

    return (
        <div className="flex bg-gray-100 rounded-lg p-1">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onFilterChange(option)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${activeFilter === option
                            ? 'bg-white text-gray-800 shadow-sm' // Active state styling
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50' // Inactive state styling
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default TimeFilter;