import React from 'react';

/**
 * AddFundsCard Component
 * 
 * An interactive card that allows users to trigger an action to add money 
 * to their account.
 */
const AddFundsCard = ({ onAddFundsClick }) => {
    return (
        <div className="bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800/60 p-5 flex items-center gap-4 group shadow-sm hover:shadow transition-all">

            {/* Large Plus Icon */}
            <div className="w-12 h-12 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:bg-blue-500/25 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </div>

            {/* Text + Button */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Add Funds</h3>
                <p className="text-xs text-gray-500 mt-0.5">Increase your balance</p>
                <button
                    onClick={onAddFundsClick}
                    className="mt-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    Add Now
                </button>
            </div>

        </div>
    );
};

export default AddFundsCard;