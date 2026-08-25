import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency');
        return savedCurrency ? JSON.parse(savedCurrency) : { symbol: '₹', code: 'INR' };
    });

    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currency));
    }, [currency]);

    const formatCurrency = (amount) => {
        // Map currency codes to appropriate locales for correct number grouping
        const localeMap = {
            'INR': 'en-IN',
            'USD': 'en-US',
            'EUR': 'de-DE',
            'GBP': 'en-GB',
            'JPY': 'ja-JP',
        };
        const locale = localeMap[currency.code] || 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency.code,
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);
