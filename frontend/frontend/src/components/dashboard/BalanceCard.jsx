import React from 'react';

/**
 * BalanceCard Component
 * 
 * A reusable UI card designed to display a single financial metric 
 * (like Current Balance, Total Spent, or Initial Balance).
 */
const BalanceCard = ({ title, amount, icon, trend }) => {
    // Utility to format numbers as currency (₹ to match reference)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(value);
    };

    return (
        <div className="bg-[#151a23] rounded-xl border border-gray-800/60 p-5 flex flex-col justify-between relative overflow-hidden group hover:border-gray-700/60 transition-colors">

            {/* Decorative sparkline wave */}
            <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-50 transition-opacity">
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                    <path d="M0 20 Q10 5, 20 15 T40 10 T60 15" stroke="#3B82F6" strokeWidth="2" fill="none" />
                    <path d="M0 25 Q10 10, 20 20 T40 15 T60 20" stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.4" />
                </svg>
            </div>

            <div className="flex justify-between items-start">
                {/* Title */}
                <h3 className="text-sm font-medium text-gray-400">{title}</h3>

                {/* Optional Icon */}
                {icon && (
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-xl">
                        {icon}
                    </div>
                )}
            </div>

            {/* Main Amount */}
            <div className="mt-3">
                <span className="text-2xl font-bold text-white">
                    {formatCurrency(amount)}
                </span>
            </div>

            {/* Optional Trend Indicator */}
            {trend && (
                <div className="mt-3 flex items-center text-sm">
                    <span
                        className={`font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}
                    >
                        {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                    </span>
                    <span className="text-gray-500 ml-2 text-xs">from last month</span>
                </div>
            )}

        </div>
    );
};

export default BalanceCard;