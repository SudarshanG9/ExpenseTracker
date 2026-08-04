import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const ThresholdForm = () => {
    const { currency } = useCurrency();
    const [monthlyGoal, setMonthlyGoal] = useState(2500);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Monthly Spending Goal</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set a target to keep your monthly expenses in check.</p>
            </div>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">{currency.symbol}</span>
                <input
                    type="number"
                    value={monthlyGoal}
                    onChange={(e) => setMonthlyGoal(e.target.value)}
                    className="w-32 pl-7 pr-3 py-2 bg-gray-50 dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
            </div>
        </div>
    );
};

export default ThresholdForm;