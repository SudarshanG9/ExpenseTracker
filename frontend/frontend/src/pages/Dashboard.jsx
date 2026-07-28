import React, { useEffect, useState } from 'react';

// Import our components
import BalanceCard from '../components/dashboard/BalanceCard';
import AddFundsCard from '../components/dashboard/AddFundsCard';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import ExpenseTrendSection from '../components/dashboard/ExpenseTrendSection';
import RecentExpenses from '../components/dashboard/RecentExpenses';

import { expenseAPI, userAPI } from '../services/api'
const Dashboard = () => {

    //Setting up react state

    const [expenses, setExpenses] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    //Fetch data on component

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [expData, usrData] = await Promise.all([
                    expenseAPI.getAll(),
                    userAPI.getProfile()
                ]);
                setExpenses(expData);
                setUserProfile(usrData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    if (loading || !userProfile) return <div>Loading dashboard...</div>;
    // Calculate dynamic data based on fetched expenses
    const initialBalance = userProfile.initial_balance; // Now dynamically loaded!
    const totalExpenses = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
    const currentBalance = initialBalance - totalExpenses;

    const userData = {
        username: userProfile.name,
        currentBalance,
        initialBalance,
        totalExpenses
    };

    const handleAddFunds = () => {
        alert("Add funds modal will open here!");
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto text-gray-900 dark:text-white transition-colors duration-300">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold">Hello {userData.username},</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Take a look at your current balance <span role="img" aria-label="eyes">👀</span></p>
            </div>

            {/* ROW 1: 4 Metric Cards (evenly spaced) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <BalanceCard
                    title="Current Balance"
                    amount={userData.currentBalance}
                    icon="💰"
                    trend={{ value: 12.5, isPositive: true }}
                />
                <BalanceCard
                    title="Initial Balance"
                    amount={userData.initialBalance}
                    icon="🏦"
                />
                <BalanceCard
                    title="Total Expenses"
                    amount={userData.totalExpenses}
                    icon="📉"
                    trend={{ value: 8.2, isPositive: false }}
                />
                <AddFundsCard onAddFundsClick={handleAddFunds} />
            </div>

            {/* ROW 2: Charts and Lists (12-column grid for precise width control) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

                {/* Expense Trend (Takes up roughly 50% of the screen) */}
                <div className="xl:col-span-6 bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 transition-colors">
                    <ExpenseTrendSection expenses={expenses} />
                </div>

                {/* Category Analysis (Takes up roughly 25% of the screen) */}
                <div className="xl:col-span-3 bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 transition-colors">
                    <CategoryPieChart expenses={expenses} />
                </div>

                {/* Recent Expenses (Takes up roughly 25% of the screen) */}
                <div className="xl:col-span-3 bg-white dark:bg-[#151a23] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 transition-colors">
                    <RecentExpenses expenses={expenses} />
                </div>

            </div>

        </div>
    );
};

export default Dashboard;