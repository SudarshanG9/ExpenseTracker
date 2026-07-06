import React from 'react';

/**
 * DateNavigator Component
 * 
 * Provides left/right arrow buttons to navigate backward and forward in time.
 * Displays a dynamic text label in the center (e.g., "July 2026" or "Week 2, July").
 */
const DateNavigator = ({ currentLabel = "July 2026", onPrevClick, onNextClick }) => {
    return (
        <div className="flex items-center space-x-2">

            {/* Previous Button (<) */}
            <button
                onClick={onPrevClick}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Previous period"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Dynamic Date Label */}
            {/* min-w-[120px] ensures the arrows don't jump around when the text changes length */}
            <span className="text-sm font-semibold text-gray-700 min-w-[120px] text-center">
                {currentLabel}
            </span>

            {/* Next Button (>) */}
            <button
                onClick={onNextClick}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-label="Next period"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

        </div>
    );
};

export default DateNavigator;