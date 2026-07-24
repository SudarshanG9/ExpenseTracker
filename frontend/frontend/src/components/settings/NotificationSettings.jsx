import React from 'react';

const NotificationSettings = () => {
    const handleStaticAlert = () => {
        console.log("Alerts toggle clicked.");
        alert("Alert notification module pending. This feature is temporarily static.");
    };

    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Spending Alerts</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive notifications when you approach your monthly limit.</p>
            </div>
            <button
                type="button"
                onClick={handleStaticAlert}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out bg-gray-300 dark:bg-gray-700 opacity-60"
            >
                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
            </button>
        </div>
    );
};

export default NotificationSettings;