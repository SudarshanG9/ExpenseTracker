import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * OCRPreview Component
 *
 * Displays the extracted data from the OCR pipeline in editable fields.
 * Forces the user to verify the machine learning output before saving
 * it to the database.
 */
const OCRPreview = ({ extractedData, onSave, onDiscard }) => {
    const { currency } = useCurrency();
    // Local state to manage the edits before finalizing.
    // We initialize with the AI's extracted data, or fall back to empty strings.
    const [formData, setFormData] = useState({
        name: extractedData?.name || '',
        date: extractedData?.date || '',
        amount: extractedData?.amount || '',
        category: extractedData?.category || 'Other',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the verified data back to the parent component
        onSave({
            ...formData,
            amount: parseFloat(formData.amount) || 0,
        });
    };

    return (
        <div className="bg-[#eef2ff] dark:bg-[#151a23] rounded-xl border border-blue-100 dark:border-gray-800 p-6 flex flex-col md:flex-row gap-6 transition-colors duration-300">

            {/* Left Side: The Image Preview (Static) */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white dark:bg-[#0b0e14] rounded-lg border border-blue-100 dark:border-gray-800 p-4 transition-colors duration-300">
                {extractedData?.imageUrl ? (
                    <img
                        src={extractedData.imageUrl}
                        alt="Receipt Scan"
                        className="max-h-[400px] object-contain rounded border border-blue-100 dark:border-gray-800"
                    />
                ) : (
                    <div className="text-gray-600 flex flex-col items-center">
                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>No Image Provided</span>
                    </div>
                )}
            </div>

            {/* Right Side: Editable Form */}
            <div className="w-full md:w-1/2">
                <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verify Extracted Data</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Please review and correct any OCR errors before saving.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Merchant Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-white dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Total Amount ({currency.symbol})</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            step="0.01"
                            min="0"
                            className="w-full bg-white dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full bg-white dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white [color-scheme:dark] focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-white dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                        >
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Housing">Housing</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onDiscard}
                            className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all"
                        >
                            Confirm & Save
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default OCRPreview;