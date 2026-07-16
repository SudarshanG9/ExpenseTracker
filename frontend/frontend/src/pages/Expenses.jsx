import React, { useState } from 'react';

// Import our components
import SearchBar from '../components/expenses/SearchBar';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseForm from '../components/expenses/ExpenseForm';

const Expenses = () => {
    // 1. The Master Data List
    const [expenses, setExpenses] = useState([
        { id: 1, name: 'Starbucks Coffee', amount: 350.00, category: 'Food', date: '2026-05-21' },
        { id: 2, name: 'Uber Ride', amount: 210.75, category: 'Transport', date: '2026-05-21' },
        { id: 3, name: 'Amazon Purchase', amount: 1299.00, category: 'Entertainment', date: '2026-05-20' },
        { id: 4, name: 'Netflix Subscription', amount: 649.00, category: 'Entertainment', date: '2026-05-20' },
        { id: 5, name: 'Electricity Bill', amount: 850.00, category: 'Utilities', date: '2026-05-19' },
    ]);

    // 2. Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');

    // 3. Actions
    const handleSaveExpense = (newExpenseData) => {
        const newExpense = {
            ...newExpenseData,
            id: Date.now(),
        };
        setExpenses((prev) => [newExpense, ...prev]);
    };

    const handleDeleteExpense = (expenseId) => {
        setExpenses((prev) => prev.filter(expense => expense.id !== expenseId));
    };

    // 4. Derived Data
    const filteredExpenses = expenses.filter((expense) =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full text-white max-w-[1600px] mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Expenses</h1>
                <p className="text-sm text-gray-400">Track, manage and analyze your expenses.</p>
            </div>

            {/* Main Layout: Flexbox to put Table on left, Form on right */}
            <div className="flex flex-col xl:flex-row gap-6">

                {/* LEFT SIDE: Controls & Table */}
                <div className="flex-1 space-y-4 overflow-hidden">

                    {/* Controls Bar */}
                    <div className="flex flex-wrap items-center gap-3 bg-[#151a23] p-3 rounded-xl border border-gray-800">
                        <SearchBar
                            searchTerm={searchQuery}
                            onSearchChange={setSearchQuery}
                            placeholder="Search by name, category..."
                        />
                    </div>

                    {/* Table Container */}
                    <div className="bg-[#151a23] rounded-xl border border-gray-800 p-1 overflow-x-auto">
                        <ExpenseTable
                            expenses={filteredExpenses}
                            onDeleteExpense={handleDeleteExpense}
                        />
                    </div>

                </div>

                {/* RIGHT SIDE: Persistent Add Expense Panel */}
                <div className="w-full xl:w-[400px] bg-[#151a23] rounded-xl border border-gray-800 p-6 h-fit shrink-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">Add Expense</h2>
                    </div>

                    <ExpenseForm
                        onSubmit={handleSaveExpense}
                        onCancel={() => console.log('Cancel clicked')}
                    />
                </div>

            </div>
        </div>
    );
};

export default Expenses;