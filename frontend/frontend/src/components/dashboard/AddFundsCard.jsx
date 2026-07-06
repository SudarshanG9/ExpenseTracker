import React from 'react';

/**
 * AddFundsCard Component
 * 
 * An interactive card that allows users to trigger an action to add money 
 * to their account. It uses a distinct visual style (dashed border) to 
 * differentiate it from static data cards.
 */
const AddFundsCard = ({ onAddFundsClick }) => {
    return (
        <div className="bg-blue-50/50 rounded-xl border-2 border-dashed border-blue-200 p-6 flex flex-col justify-center items-center text-center transition-colors hover:bg-blue-50">

            {/* Icon Area */}
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </div>

            {/* Text Context */}
            <h3 className="text-sm font-medium text-gray-700 mb-1">Need to add income?</h3>
            <p className="text-xs text-gray-500 mb-4">Record new deposits to update your balance.</p>

            {/* Action Button */}
            <button
                onClick={onAddFundsClick}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Add Funds
            </button>

        </div>
    );
};

export default AddFundsCard;