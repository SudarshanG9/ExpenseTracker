import React from 'react';

/**
 * ExpenseTable Component
 * 
 * Renders a comprehensive list of transactions.
 * Expects to receive an array of expense objects and a delete function as props.
 */
const ExpenseTable = ({ expenses, onDeleteExpense }) => {

    // Helper to format currency
    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    };

    // Helper to render colored category badges
    const getCategoryBadge = (category) => {
        const badges = {
            Transport: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
            Food: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
            Entertainment: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
            Utilities: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
            Housing: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
            Shopping: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
            Default: 'bg-gray-500/15 text-gray-400 border-gray-500/20',
        };
        const badgeClass = badges[category] || badges.Default;

        return (
            <span className={`px-2.5 py-1 inline-flex text-[11px] leading-5 font-semibold rounded-md border ${badgeClass}`}>
                {category}
            </span>
        );
    };

    // Helper to get payment method display
    const getPaymentMethod = (category) => {
        const methods = {
            Food: { icon: '📱', label: 'UPI' },
            Transport: { icon: '📱', label: 'UPI' },
            Entertainment: { icon: '💳', label: 'Credit Card' },
            Utilities: { icon: '🏦', label: 'Net Banking' },
            Shopping: { icon: '💳', label: 'Credit Card' },
            Housing: { icon: '🏦', label: 'Net Banking' },
        };
        return methods[category] || { icon: '💳', label: 'Card' };
    };

    // If the array is empty, show a helpful empty state
    if (!expenses || expenses.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="text-gray-600 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-300">No expenses found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">

                {/* Table Header */}
                <thead>
                    <tr className="border-b border-gray-800/60">
                        <th scope="col" className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th scope="col" className="px-5 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Payment Method
                        </th>
                        <th scope="col" className="px-5 py-3 text-right text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th scope="col" className="px-5 py-3 text-center text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                    {expenses.map((expense) => {
                        const payment = getPaymentMethod(expense.category);
                        return (
                            <tr key={expense.id} className="border-b border-gray-800/30 hover:bg-white/[0.02] transition-colors">

                                {/* Date */}
                                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                                    {new Date(expense.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </td>

                                {/* Name */}
                                <td className="px-5 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-white">{expense.name}</span>
                                </td>

                                {/* Category */}
                                <td className="px-5 py-4 whitespace-nowrap">
                                    {getCategoryBadge(expense.category)}
                                </td>

                                {/* Payment Method */}
                                <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <span>{payment.icon}</span>
                                        {payment.label}
                                    </span>
                                </td>

                                {/* Amount */}
                                <td className="px-5 py-4 whitespace-nowrap text-right">
                                    <span className="text-sm font-semibold text-emerald-400">
                                        {formatCurrency(expense.amount)}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-5 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">
                                        {/* Receipt icon */}
                                        <button className="p-1.5 text-gray-500 hover:text-gray-300 rounded-md hover:bg-white/5 transition-colors" title="View receipt">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </button>
                                        {/* Edit icon */}
                                        <button className="p-1.5 text-gray-500 hover:text-blue-400 rounded-md hover:bg-white/5 transition-colors" title="Edit">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        {/* Delete icon */}
                                        <button
                                            onClick={() => onDeleteExpense(expense.id)}
                                            className="p-1.5 text-gray-500 hover:text-red-400 rounded-md hover:bg-white/5 transition-colors"
                                            title="Delete"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;