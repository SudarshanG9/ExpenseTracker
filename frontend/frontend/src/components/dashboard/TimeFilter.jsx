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
        <div className="flex bg-gray-100 dark:bg-[#1a1f2e] rounded-lg p-1">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onFilterChange(option)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${activeFilter === option
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default TimeFilter;