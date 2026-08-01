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
        // Use standard Intl.NumberFormat based on currency code
        return new Intl.NumberFormat('en-IN', {
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
