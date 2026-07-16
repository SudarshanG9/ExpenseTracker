import React, { useState } from 'react';

// Import our assembled building blocks
import SearchBar from '../components/expenses/SearchBar';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseModal from '../components/expenses/ExpenseModal';

/**
 * Expenses Page Component
 * 
 * The main interface for managing all transactions. It holds the master list 
 * of expenses, handles search filtering, and controls the "Add Expense" modal.
 */
const Expenses = () => {
    // =========================================================================
    // STATE MANAGEMENT
    // =========================================================================

    // 1. The Master Data List
    // In a real app, you would fetch this from FastAPI in a useEffect hook.
    const [expenses, setExpenses] = useState([
        { id: 1, name: 'Uber to Airport', amount: 45.50, category: 'Transport', date: '2026-07-06' },
        { id: 2, name: 'Whole Foods Market', amount: 120.00, category: 'Food', date: '2026-07-05' },
        { id: 3, name: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2026-07-04' },
        { id: 4, name: 'Electric Bill', amount: 85.00, category: 'Utilities', date: '2026-07-02' },
        { id: 5, name: 'Coffee Shop', amount: 5.50, category: 'Food', date: '2026-07-01' },
        { id: 6, name: 'Apartment Rent', amount: 1200.00, category: 'Housing', date: '2026-07-01' },
    ]);

    // 2. Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');

    // 3. Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);

    // =========================================================================
    // ACTIONS & LOGIC
    // =========================================================================

    // Handle adding a new expense
    const handleSaveExpense = (newExpenseData) => {
        // Give it a fake unique ID for now (FastAPI/Database would do this in reality)
        const newExpense = {
            ...newExpenseData,
            id: Date.now(),
        };

        // Add it to the top of our list
        setExpenses((prev) => [newExpense, ...prev]);

        // Close the modal
        setIsModalOpen(false);
    };

    // Handle deleting an expense
    const handleDeleteExpense = (expenseId) => {
        // Filter out the expense that matches the ID
        setExpenses((prev) => prev.filter(expense => expense.id !== expenseId));
    };

    // =========================================================================
    // DERIVED DATA
    // =========================================================================

    // We don't modify the original array when searching. 
    // We dynamically calculate a new array to pass to the table.
    const filteredExpenses = expenses.filter((expense) =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // =========================================================================
    // RENDER LAYOUT
    // =========================================================================
    return (
        <div className="max-w-7xl mx-auto space-y-6">

            {/* 1. Page Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">All Expenses</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track your transaction history.</p>
                </div>

                {/* Primary Action Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {/* Plus Icon */}
                    <svg className="w-5 h-5 mr-1.5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Expense
                </button>
            </div>

            {/* 2. Controls Area (Search Bar) */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                <SearchBar
                    searchTerm={searchQuery}
                    onSearchChange={setSearchQuery}
                    placeholder="Search by name or category..."
                />

                {/* You could add dropdown filters here later (e.g., filter by Date Range) */}
            </div>

            {/* 3. The Data Table */}
            <ExpenseTable
                expenses={filteredExpenses}
                onDeleteExpense={handleDeleteExpense}
            />

            {/* 4. The Modal (Hidden by default based on state) */}
            <ExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveExpense}
            />

        </div>
    );
};

export default Expenses;