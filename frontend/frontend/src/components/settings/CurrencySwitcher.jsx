import React, { useState, useEffect, useRef } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const CurrencySwitcher = () => {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currencies = [
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (selected) => {
        setCurrency(selected);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Default Currency</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select the currency for your expenses.</p>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-48 px-4 py-2 bg-gray-50 dark:bg-[#0b0e14] border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50 transition-colors"
                >
                    <span>{currency.symbol} - {currency.code}</span>
                    <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#0b0e14] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden z-10">
                        {currencies.map((c) => (
                            <button
                                key={c.code}
                                onClick={() => handleSelect(c)}
                                className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                    currency.code === c.code 
                                        ? 'text-purple-600 dark:text-purple-400 font-medium bg-purple-50 dark:bg-purple-500/10' 
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                {c.symbol} {c.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencySwitcher;
