import React from 'react';

/**
 * BalanceCard Component
 * 
 * A reusable UI card designed to display a single financial metric 
 * (like Current Balance, Total Spent, or Initial Balance).
 */
const BalanceCard = ({ title, amount, icon, trend }) => {
    // Utility to format numbers as currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">

            <div className="flex justify-between items-start">
                {/* Title */}
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>

                {/* Optional Icon (Passed as a string emoji or SVG element) */}
                {icon && (
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl">
                        {icon}
                    </div>
                )}
            </div>

            {/* Main Amount */}
            <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(amount)}
                </span>
            </div>

            {/* Optional Trend Indicator (e.g., "+5% from last month") */}
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span
                        className={`font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'
                            }`}
                    >
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                </div>
            )}

        </div>
    );
};

export default BalanceCard;