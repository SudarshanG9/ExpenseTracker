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
                className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Previous period"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Dynamic Date Label */}
            <span className="text-sm font-medium text-gray-300 min-w-[100px] text-center">
                {currentLabel}
            </span>

            {/* Next Button (>) */}
            <button
                onClick={onNextClick}
                className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Next period"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

        </div>
    );
};

export default DateNavigator;