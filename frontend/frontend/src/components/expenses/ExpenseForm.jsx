import React, { useState } from 'react';

/**
 * ExpenseForm Component
 * 
 * A reusable form to capture the details of a transaction.
 * It manages its own local state as the user types, and only sends 
 * the final data to the parent when the user clicks "Save".
 */
const ExpenseForm = ({ onSubmit, onCancel, initialData = null }) => {
    // 1. LOCAL STATE
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        amount: initialData?.amount || '',
        category: initialData?.category || 'Food',
        date: initialData?.date || new Date().toISOString().split('T')[0],
        description: initialData?.description || '',
        receipt_url: initialData?.receipt_url || '',
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
        e.preventDefault();
        onSubmit({
            ...formData,
            amount: parseFloat(formData.amount),
        });
    };

    // Shared input styles
    const inputStyles = "w-full px-3 py-2.5 bg-[#1a1f2e] border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1: Name and Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter expense title"
                        className={inputStyles}
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Amount</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                        <input
                            type="number"
                            name="amount"
                            required
                            min="0.01"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            className={`${inputStyles} pl-7`}
                        />
                    </div>
                </div>
            </div>

            {/* Row 2: Category and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`${inputStyles} cursor-pointer`}
                    >
                        <option value="Food">Food & Dining</option>
                        <option value="Transport">Transport</option>
                        <option value="Housing">Housing</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className={inputStyles}
                    />
                </div>
            </div>

            {/* Row 3: Payment Method */}
            <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Payment Method</label>
                <select
                    name="paymentMethod"
                    className={`${inputStyles} cursor-pointer`}
                >
                    <option value="upi">UPI</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="net_banking">Net Banking</option>
                    <option value="cash">Cash</option>
                </select>
            </div>

            {/* Row 4: Description */}
            <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Description (Optional)</label>
                <textarea
                    name="description"
                    rows="2"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className={`${inputStyles} resize-none`}
                ></textarea>
            </div>

            {/* Row 5: Receipt URL */}
            <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Receipt URL (Optional)</label>
                <input
                    type="url"
                    name="receipt_url"
                    value={formData.receipt_url}
                    onChange={handleChange}
                    placeholder="Enter receipt URL"
                    className={inputStyles}
                />
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800/60 mt-6">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-transparent border border-gray-700/50 rounded-lg hover:bg-white/5 focus:outline-none transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                >
                    Save Expense
                </button>
            </div>

        </form>
    );
};

export default ExpenseForm;