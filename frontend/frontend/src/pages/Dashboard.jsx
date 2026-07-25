import React from 'react';

// Import our components
import BalanceCard from '../components/dashboard/BalanceCard';
import AddFundsCard from '../components/dashboard/AddFundsCard';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import ExpenseTrendSection from '../components/dashboard/ExpenseTrendSection';
import RecentExpenses from '../components/dashboard/RecentExpenses';

const Dashboard = () => {
    // Restore our mock data
    const mockUserData = {
        username: "Sudarshan",
        currentBalance: 42560.50,
        initialBalance: 50000.00,
        totalExpenses: 7439.50
    };

    const handleAddFunds = () => {
        alert("Add funds modal will open here!");
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto text-gray-900 dark:text-white transition-colors duration-300">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold">Hello {mockUserData.username},</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Take a look at your current balance <span role="img" aria-label="eyes">👀</span></p>
            </div>

            {/* ROW 1: 4 Metric Cards (evenly spaced) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <BalanceCard
                    title="Current Balance"
                    amount={mockUserData.currentBalance}
                    icon="💰"
                    trend={{ value: 12.5, isPositive: true }}
                />
                <BalanceCard
                    title="Initial Balance"
                    amount={mockUserData.initialBalance}
                    icon="🏦"
                />
                <BalanceCard
                    title="Total Expenses (May)"
                    amount={mockUserData.totalExpenses}
                    icon="📉"
                    trend={{ value: 8.2, isPositive: false }}
                />
                <AddFundsCard onAddFundsClick={handleAddFunds} />
            </div>

            {/* ROW 2: Charts and Lists (12-column grid for precise width control) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

                {/* Expense Trend (Takes up roughly 50% of the screen) */}
                <div className="xl:col-span-6 bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 transition-colors">
                    <ExpenseTrendSection />
                </div>

                {/* Category Analysis (Takes up roughly 25% of the screen) */}
                <div className="xl:col-span-3 bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 transition-colors">
                    <CategoryPieChart />
                </div>

                {/* Recent Expenses (Takes up roughly 25% of the screen) */}
                <div className="xl:col-span-3 bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 transition-colors">
                    <RecentExpenses />
                </div>

            </div>

        </div>
    );
};

export default Dashboard;