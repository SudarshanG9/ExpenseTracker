import React from 'react';
import { useCurrency } from '../../../context/CurrencyContext';

/**
 * RecentExpenses Component
 * 
 * Displays a lightweight list of the 5 most recent transactions.
 * Designed as a card-list layout matching the reference design.
 */
const RecentExpenses = ({ expenses = [] }) => {
    // Sort by date descending and take top 5
    const recentTransactions = [...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const { formatCurrency } = useCurrency();

    // Helper to get category icon + color
    const getCategoryStyle = (category) => {
        const styles = {
            'Food & Dining': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: '🍽️' },
            'Transport': { bg: 'bg-blue-500/15', text: 'text-blue-400', icon: '🚗' },
            'Shopping': { bg: 'bg-purple-500/15', text: 'text-purple-400', icon: '🛒' },
            'Entertainment': { bg: 'bg-orange-500/15', text: 'text-orange-400', icon: '🎬' },
            'Utilities': { bg: 'bg-yellow-500/15', text: 'text-yellow-400', icon: '⚡' },
        };
        return styles[category] || { bg: 'bg-gray-500/15', text: 'text-gray-400', icon: '📦' };
    };

    return (
        <div className="h-full flex flex-col">

            {/* Header Area */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Expenses</h2>
                <button className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    View All
                </button>
            </div>

            {/* Transaction List */}
            <div className="flex-1 space-y-1">
                {recentTransactions.map((transaction) => {
                    const style = getCategoryStyle(transaction.category);
                    return (
                        <div
                            key={transaction.id}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
                        >
                            {/* Category Icon */}
                            <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center text-sm shrink-0`}>
                                {style.icon}
                            </div>

                            {/* Title + Category */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{transaction.title}</p>
                                <p className={`text-[11px] ${style.text}`}>{transaction.category}</p>
                            </div>

                            {/* Date + Amount */}
                            <div className="text-right shrink-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(transaction.amount)}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                    {new Date(transaction.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default RecentExpenses;