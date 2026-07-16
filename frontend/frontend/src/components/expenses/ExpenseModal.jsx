import React from 'react';
import ExpenseForm from './ExpenseForm';

/**
 * ExpenseModal Component
 * 
 * A popup overlay (modal) that renders the ExpenseForm. 
 * It traps the user's focus until they either submit the form, click cancel, 
 * or click outside the modal box.
 */
const ExpenseModal = ({ isOpen, onClose, onSave }) => {

    // If the modal is not open, render nothing.
    // This is a standard React pattern to avoid mounting hidden DOM elements.
    if (!isOpen) return null;

    // Handle clicking the dark background overlay to close the modal
    const handleBackdropClick = (e) => {
        // Ensure they actually clicked the background, not the white modal itself
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        // 1. The dark background overlay (fixed to cover the entire screen)
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >

            {/* 2. The white modal container box */}
            <div
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >

                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">
                        Add New Expense
                    </h3>

                    {/* Subtle close (X) button in top right */}
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md p-1"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body: Inject the form we built in the previous step */}
                <div className="px-6 py-5">
                    <ExpenseForm
                        onSubmit={onSave}
                        onCancel={onClose}
                        // We pass null for initialData since this modal is currently only for adding new expenses
                        initialData={null}
                    />
                </div>

            </div>
        </div>
    );
};

export default ExpenseModal;