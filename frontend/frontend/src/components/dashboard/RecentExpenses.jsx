import React from 'react';

/**
 * RecentExpenses Component
 * 
 * Displays a lightweight table of the 5 most recent transactions.
 * Designed to fit within the dashboard layout without overwhelming the user.
 */
const RecentExpenses = () => {
    // DUMMY DATA: Hardcoded recent transactions for the UI.
    // In a real app, this would be passed down as a prop (e.g., `expenses`).
    const recentTransactions = [
        { id: 1, name: 'Uber to Airport', amount: 45.50, category: 'Transport', date: '2026-07-06' },
        { id: 2, name: 'Whole Foods Market', amount: 120.00, category: 'Food', date: '2026-07-05' },
        { id: 3, name: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2026-07-04' },
        { id: 4, name: 'Electric Bill', amount: 85.00, category: 'Utilities', date: '2026-07-02' },
        { id: 5, name: 'Coffee Shop', amount: 5.50, category: 'Food', date: '2026-07-01' },
    ];

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Helper function to map categories to specific colored badges
    const getCategoryBadge = (category) => {
        const badges = {
            Transport: 'bg-orange-100 text-orange-800',
            Food: 'bg-emerald-100 text-emerald-800',
            Entertainment: 'bg-purple-100 text-purple-800',
            Utilities: 'bg-blue-100 text-blue-800',
            Default: 'bg-gray-100 text-gray-800',
        };
        const badgeClass = badges[category] || badges.Default;

        return (
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${badgeClass}`}>
                {category}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Header Area */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Recent Expenses</h2>
                {/* A link that would ideally navigate to the full expenses page */}
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    View All →
                </button>
            </div>

            {/* Table Container - overflow-x-auto allows horizontal scrolling on smaller desktop windows */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    {/* Table Header */}
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-3 font-medium">Transaction Name</th>
                            <th className="px-6 py-3 font-medium">Category</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium text-right">Amount</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {recentTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors">

                                {/* Name */}
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {transaction.name}
                                </td>

                                {/* Category Badge */}
                                <td className="px-6 py-4">
                                    {getCategoryBadge(transaction.category)}
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 text-gray-500">
                                    {/* Format the raw date string into a nicer format like "Jul 06, 2026" */}
                                    {new Date(transaction.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                                    {formatCurrency(transaction.amount)}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default RecentExpenses;