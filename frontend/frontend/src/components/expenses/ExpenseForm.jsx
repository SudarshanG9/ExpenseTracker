import React, { useState } from 'react';

/**
 * ExpenseForm Component
 * 
 * A reusable form to capture the details of a transaction.
 * It manages its own local state as the user types, and only sends 
 * the final data to the parent when the user clicks "Save".
 */
const ExpenseForm = ({ onSubmit, onCancel, initialData = null }) => {
    // 1. LOCAL STATE: We initialize the form fields.
    // If we are editing an existing expense (initialData), we use those values.
    // Otherwise, we start with empty fields and today's date.
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        amount: initialData?.amount || '',
        category: initialData?.category || 'Food',
        date: initialData?.date || new Date().toISOString().split('T')[0], // YYYY-MM-DD
        description: initialData?.description || '',
        receiptUrl: initialData?.receiptUrl || '',
    });

    // Handle changes to any input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the browser from refreshing the page

        // Pass the gathered data back to the parent component
        // We convert the amount to a number to ensure data consistency
        onSubmit({
            ...formData,
            amount: parseFloat(formData.amount),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Name and Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Uber to Airport"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                    <input
                        type="number"
                        name="amount"
                        required
                        min="0.01"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Row 2: Category and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Housing">Housing</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Row 3: Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                    name="description"
                    rows="2"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add any extra notes here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                ></textarea>
            </div>

            {/* Row 4: Receipt URL */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receipt URL (Optional)</label>
                <input
                    type="url"
                    name="receiptUrl"
                    value={formData.receiptUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Save Expense
                </button>
            </div>

        </form>
    );
};

export default ExpenseForm;