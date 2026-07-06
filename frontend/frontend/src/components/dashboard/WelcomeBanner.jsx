import React from 'react';

/**
 * WelcomeBanner Component
 * 
 * Displays a personalized greeting to the user along with the current date.
 * It serves as the friendly entry point at the top of the Dashboard.
 */
const WelcomeBanner = ({ username = "Guest" }) => {
    // We generate the current date when the component renders.
    // Using standard JavaScript Date object formatted nicely.
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">

            {/* Left side: Greeting Message */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome back, {username}! 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Here is what is happening with your finances today.
                </p>
            </div>

            {/* Right side: Current Date Badge */}
            <div className="mt-4 sm:mt-0 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                <span className="text-sm font-medium text-blue-800">
                    {today}
                </span>
            </div>

        </div>
    );
};

export default WelcomeBanner;