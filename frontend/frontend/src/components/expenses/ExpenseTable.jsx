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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    // Helper to render colored category badges
    const getCategoryBadge = (category) => {
        const badges = {
            Transport: 'bg-orange-100 text-orange-800',
            Food: 'bg-emerald-100 text-emerald-800',
            Entertainment: 'bg-purple-100 text-purple-800',
            Utilities: 'bg-blue-100 text-blue-800',
            Housing: 'bg-indigo-100 text-indigo-800',
            Default: 'bg-gray-100 text-gray-800',
        };
        const badgeClass = badges[category] || badges.Default;

        return (
            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeClass}`}>
                {category}
            </span>
        );
    };

    // If the array is empty (e.g., after filtering), show a helpful empty state
    if (!expenses || expenses.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-gray-400 mb-2">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-sm font-medium text-gray-900">No expenses found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">

                    {/* Table Header */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            {/* Action column (Edit/Delete) */}
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-gray-50 transition-colors">

                                {/* Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(expense.date).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </td>

                                {/* Name / Description */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{expense.name}</div>
                                    {/* Optional: if there's a detailed note or receipt icon */}
                                    {expense.receiptUrl && (
                                        <div className="text-xs text-blue-500 flex items-center mt-1">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                            Receipt attached
                                        </div>
                                    )}
                                </td>

                                {/* Category */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getCategoryBadge(expense.category)}
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                                    {formatCurrency(expense.amount)}
                                </td>

                                {/* Actions (Delete Button) */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onDeleteExpense(expense.id)}
                                        className="text-red-600 hover:text-red-900 focus:outline-none transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTable;