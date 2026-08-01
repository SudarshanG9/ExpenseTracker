import React, { useState, useEffect } from 'react';

// Import our components
import SearchBar from '../components/expenses/SearchBar';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { expenseAPI } from '../services/api';

const Expenses = () => {
    // 1. The Master Data List
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadExpenses = async () => {
            try {
                const data = await expenseAPI.getAll();
                // Sort newest first
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setExpenses(data);
            } catch (err) {
                console.error("Failed to load expenses:", err);
            } finally {
                setLoading(false);
            }
        };
        loadExpenses();
    }, []);

    // 2. Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');

    // 3. Actions
    const handleSaveExpense = async (newExpenseData) => {
        try {
            const created = await expenseAPI.create(newExpenseData);
            setExpenses((prev) => [created, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (err) {
            console.error("Failed to save expense:", err);
            alert("Failed to save expense. Please check your inputs.");
        }
    };

    const handleDeleteExpense = async (expenseId) => {
        try {
            await expenseAPI.delete(expenseId);
            setExpenses((prev) => prev.filter(expense => expense.id !== expenseId));
        } catch (err) {
            console.error("Failed to delete expense:", err);
        }
    };

    // 4. Derived Data
    const filteredExpenses = expenses.filter((expense) =>
        (expense.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (expense.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full text-gray-900 dark:text-white max-w-[1600px] mx-auto transition-colors duration-300">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Expenses</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Track, manage and analyze your expenses.</p>
            </div>

            {/* Main Layout: Flexbox to put Table on left, Form on right */}
            <div className="flex flex-col xl:flex-row gap-6">

                {/* LEFT SIDE: Controls & Table */}
                <div className="flex-1 space-y-4 overflow-hidden">

                    {/* Controls Bar */}
                    <div className="flex flex-wrap items-center gap-3 bg-[#eef2ff] dark:bg-[#151a23] p-3 rounded-xl border border-blue-100 dark:border-gray-800 transition-colors duration-300">
                        <SearchBar
                            searchTerm={searchQuery}
                            onSearchChange={setSearchQuery}
                            placeholder="Search by name, category..."
                        />
                    </div>

                    {/* Table Container */}
                    <div className="bg-[#eef2ff] dark:bg-[#151a23] rounded-xl border border-blue-100 dark:border-gray-800 p-1 overflow-x-auto transition-colors duration-300">
                        <ExpenseTable
                            expenses={filteredExpenses}
                            onDeleteExpense={handleDeleteExpense}
                        />
                    </div>

                </div>

                {/* RIGHT SIDE: Persistent Add Expense Panel */}
                <div className="w-full xl:w-[400px] bg-[#eef2ff] dark:bg-[#151a23] rounded-xl border border-blue-100 dark:border-gray-800 p-6 h-fit shrink-0 transition-colors duration-300">
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