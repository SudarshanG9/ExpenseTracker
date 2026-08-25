import React, { useState } from 'react';
import ReceiptUploader from '../components/ocr/ReceiptUploader';
import OCRPreview from '../components/ocr/OCRPreview';
import apiClient from '../services/api';
import { expenseAPI } from '../services/api';

const OCR = () => {
    // Step state workflow: 'upload' | 'processing' | 'preview' | 'success'
    const [step, setStep] = useState('upload');
    const [extractedData, setExtractedData] = useState(null);
    const [error, setError] = useState(null);

    /**
     * Handles image selection from ReceiptUploader.
     * Receives both the raw File object (for backend upload) 
     * and the Object URL (for immediate image preview).
     */
    const handleImageSelect = async (file, previewUrl) => {
        setStep('processing');
        setError(null);

        // Prepare multipart form data for FastAPI endpoint
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await apiClient.post("/api/receipts/extract", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            const result = response.data;
            
            if (result.status === "success") {
                setExtractedData({
                    imageUrl: previewUrl,
                    name: result.data.merchant || '',
                    amount: parseFloat(result.data.amount) || 0,
                    // CORD dataset does not include date labels — default to today
                    date: new Date().toISOString().split('T')[0],
                    // CORD dataset does not include category labels — user must select
                    category: 'Other',
                });
                setStep('preview');
            } else {
                throw new Error(result.detail || 'Failed to extract receipt data');
            }
        } catch (err) {
            console.error('OCR Error:', err);
            setError('Failed to extract receipt data. Please try again or enter details manually.');
            setStep('upload');
        }
    };

    /**
     * Triggers when the user confirms the verified data in OCRPreview.
     * Saves the expense to the database via the expenses API.
     */
    const handleSave = async (verifiedData) => {
        // Save verified entry to the database via the expenses API
        await expenseAPI.create({
            title: verifiedData.name,
            amount: verifiedData.amount,
            category: verifiedData.category,
            date: verifiedData.date,
            description: 'Added via OCR receipt scan',
        });

        // Show success state briefly, then reset
        setStep('success');
        setTimeout(() => {
            setStep('upload');
            setExtractedData(null);
        }, 2500);
    };

    /**
     * Resets the flow if the user discards the scan.
     */
    const handleDiscard = () => {
        setStep('upload');
        setExtractedData(null);
        setError(null);
    };

    return (
        <div className="h-full text-gray-900 dark:text-white max-w-[1400px] mx-auto p-4 md:p-6 transition-colors duration-300">

            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Receipt Scanner</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Upload a receipt to auto-extract merchant and amount. You'll assign the category before saving.
                    </p>
                </div>

                {/* Workflow Breadcrumb Indicator */}
                <div className="flex items-center gap-2 text-xs font-medium">
                    {[
                        { key: 'upload', label: '1. Upload', icon: '📤' },
                        { key: 'processing', label: '2. Extract', icon: '⚙️' },
                        { key: 'preview', label: '3. Verify', icon: '✏️' },
                    ].map((item, i) => (
                        <React.Fragment key={item.key}>
                            {i > 0 && <span className="text-gray-300 dark:text-gray-600">→</span>}
                            <span className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                                step === item.key
                                    ? 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                            }`}>
                                <span>{item.icon}</span>
                                {item.label}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Error Message Toast */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg text-red-600 dark:text-red-400 text-sm flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                    <button onClick={() => setError(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg">&times;</button>
                </div>
            )}

            {/* State View 1: Image Upload */}
            {step === 'upload' && (
                <div className="max-w-2xl mx-auto mt-8">
                    <ReceiptUploader onImageSelect={handleImageSelect} />
                </div>
            )}

            {/* State View 2: Processing Loading Indicator */}
            {step === 'processing' && (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#eef2ff] dark:bg-[#151a23] rounded-xl border border-blue-100 dark:border-gray-800 p-8 text-center transition-colors">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                        <div className="absolute w-8 h-8 border-4 border-purple-200 dark:border-purple-500/20 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Running OCR Extraction...</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                        Detecting text with PaddleOCR and classifying fields with LayoutLMv3.
                    </p>
                    <div className="flex gap-1 mt-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}

            {/* State View 3: Editable Human-in-the-Loop Verification */}
            {step === 'preview' && (
                <OCRPreview
                    extractedData={extractedData}
                    onSave={handleSave}
                    onDiscard={handleDiscard}
                />
            )}

            {/* State View 4: Success Confirmation */}
            {step === 'success' && (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#eef2ff] dark:bg-[#151a23] rounded-xl border border-blue-100 dark:border-gray-800 p-8 text-center transition-colors">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Expense Saved!</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                        The scanned receipt has been added to your expenses. You can view it on the Expenses page.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">Returning to scanner...</p>
                </div>
            )}

        </div>
    );
};

export default OCR;