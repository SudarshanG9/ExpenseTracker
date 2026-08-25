import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

/**
 * OCRPreview Component
 *
 * Displays the extracted data from the OCR pipeline in two clear sections:
 * 1. AI-Extracted fields (merchant, amount) — pre-filled from LayoutLMv3.
 * 2. User-Required fields (category, date) — must be reviewed/set by the user.
 *
 * The CORD dataset does not provide date or category labels, so those
 * are always user-supplied. Date defaults to the upload date.
 */
const OCRPreview = ({ extractedData, onSave, onDiscard }) => {
    const { currency } = useCurrency();
    const [isSaving, setIsSaving] = useState(false);

    // Local state: AI fields are pre-filled, user fields have sensible defaults
    const [formData, setFormData] = useState({
        name: extractedData?.name || '',
        amount: extractedData?.amount || '',
        date: extractedData?.date || new Date().toISOString().split('T')[0],
        category: extractedData?.category || 'Other',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await onSave({
                ...formData,
                amount: parseFloat(formData.amount) || 0,
            });
        } finally {
            setIsSaving(false);
        }
    };

    const inputBase = "w-full rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 transition-colors";
    const inputAI = `${inputBase} bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-500/30 text-gray-900 dark:text-white focus:ring-purple-500/40`;
    const inputUser = `${inputBase} bg-white dark:bg-[#0b0e14] border-2 border-blue-300 dark:border-blue-500/40 text-gray-900 dark:text-white focus:ring-blue-500/40`;

    return (
        <div className="bg-[#eef2ff] dark:bg-[#151a23] rounded-xl border border-blue-100 dark:border-gray-800 p-6 transition-colors duration-300">

            {/* Top Section: Receipt Image + Extracted Summary */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Left: Receipt Image */}
                <div className="w-full lg:w-5/12 flex flex-col">
                    <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0b0e14] rounded-lg border border-blue-100 dark:border-gray-800 p-4 min-h-[300px] transition-colors duration-300">
                        {extractedData?.imageUrl ? (
                            <img
                                src={extractedData.imageUrl}
                                alt="Receipt Scan"
                                className="max-h-[380px] object-contain rounded"
                            />
                        ) : (
                            <div className="text-gray-400 flex flex-col items-center">
                                <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>No Image Provided</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Verification Form */}
                <div className="w-full lg:w-7/12">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Section 1: AI-Extracted Fields */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400 text-xs font-semibold border border-purple-200 dark:border-purple-500/25">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Extracted by AI
                                </span>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500">Editable — verify for accuracy</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Merchant Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Store name"
                                        className={inputAI}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Total Amount ({currency.symbol})</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                        step="0.01"
                                        min="0"
                                        placeholder="0.00"
                                        className={inputAI}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 dark:border-gray-700/50" />

                        {/* Section 2: User-Required Fields */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-500/25">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Complete the Details
                                </span>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500">Not detected by AI — please fill in</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Category — Prominent since user must choose */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                                        Category <span className="text-blue-500">*</span>
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={`${inputUser} cursor-pointer`}
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

                                {/* Date — Defaults to today (upload date) */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                                        Date <span className="text-[11px] text-gray-400 dark:text-gray-500 font-normal">(defaults to today)</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className={`${inputUser} [color-scheme:light] dark:[color-scheme:dark]`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700/50">
                            <button
                                type="button"
                                onClick={onDiscard}
                                disabled={isSaving}
                                className="px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-lg transition-all disabled:opacity-50"
                            >
                                ← Scan Another
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-60 flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Save to Expenses
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    );
};

export default OCRPreview;