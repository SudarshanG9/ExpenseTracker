import React, { useState } from 'react';
import ReceiptUploader from '../components/ocr/ReceiptUploader';
import OCRPreview from '../components/ocr/OCRPreview';

const OCR = () => {
    // Step state workflow: 'upload' | 'processing' | 'preview'
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
            /* 
            // --- REAL FASTAPI INTEGRATION ---
            const response = await fetch('http://localhost:8000/api/ocr', {
              method: 'POST',
              body: formData,
            });
      
            if (!response.ok) {
              throw new Error('Failed to process image via OCR endpoint');
            }
      
            const data = await response.json();
      
            setExtractedData({
              imageUrl: previewUrl,
              name: data.name || '',
              amount: data.amount || 0,
              date: data.date || new Date().toISOString().split('T')[0],
              category: data.category || 'Other',
            });
            setStep('preview');
            */

            // --- SIMULATED BACKEND RESPONSE (For UI Testing) ---
            setTimeout(() => {
                setExtractedData({
                    imageUrl: previewUrl,
                    name: 'Starbucks Coffee',
                    amount: 14.50,
                    date: new Date().toISOString().split('T')[0],
                    category: 'Food',
                });
                setStep('preview');
            }, 1800);

        } catch (err) {
            console.error('OCR Error:', err);
            setError('Failed to extract receipt data. Please try again or enter details manually.');
            setStep('upload');
        }
    };

    /**
     * Triggers when the user confirms the verified data in OCRPreview.
     */
    const handleSave = async (verifiedData) => {
        console.log('Sending verified expense to backend database:', verifiedData);

        try {
            /*
            // Save verified entry to your SQLite database
            await fetch('http://localhost:8000/api/expenses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(verifiedData),
            });
            */

            alert('Expense successfully saved!');

            // Reset flow for the next receipt
            setStep('upload');
            setExtractedData(null);
        } catch (err) {
            console.error('Failed to save expense:', err);
        }
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
        <div className="h-full text-white max-w-[1400px] mx-auto p-4 md:p-6">

            {/* Header Section */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Receipt Scanner</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Automate expense tracking by extracting structured data from receipts.
                    </p>
                </div>

                {/* Workflow Breadcrumb Indicator */}
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span className={`px-2.5 py-1 rounded-full ${step === 'upload' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-gray-800'}`}>
                        1. Upload
                    </span>
                    <span>&rarr;</span>
                    <span className={`px-2.5 py-1 rounded-full ${step === 'processing' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-gray-800'}`}>
                        2. Extract
                    </span>
                    <span>&rarr;</span>
                    <span className={`px-2.5 py-1 rounded-full ${step === 'preview' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'bg-gray-800'}`}>
                        3. Verify
                    </span>
                </div>
            </div>

            {/* Error Message Toast */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
            )}

            {/* State View 1: Image Upload */}
            {step === 'upload' && (
                <div className="max-w-2xl mx-auto mt-8">
                    <ReceiptUploader onImageSelect={handleImageSelect} />
                </div>
            )}

            {/* State View 2: Processing Skeleton Loading Indicator */}
            {step === 'processing' && (
                <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#151a23] rounded-xl border border-gray-800 p-8 text-center">
                    <div className="relative flex items-center justify-center mb-6">
                        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                        <div className="absolute w-8 h-8 border-4 border-indigo-500/20 border-b-indigo-500 rounded-full animate-spin reverse"></div>
                    </div>
                    <h2 className="text-lg font-semibold text-white">Running OCR Extraction...</h2>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm">
                        Parsing image text using pre-processing and bounding box layout analysis.
                    </p>
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

        </div>
    );
};

export default OCR;