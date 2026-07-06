import React from 'react';

// Import our assembled sections
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import BalanceSection from '../components/dashboard/BalanceSection';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import ExpenseTrendSection from '../components/dashboard/ExpenseTrendSection';
import RecentExpenses from '../components/dashboard/RecentExpenses';

/**
 * Dashboard Page Component
 * 
 * The main landing page of the application. 
 * It acts as the "Smart Container" that will eventually fetch data from 
 * the FastAPI backend and distribute it down to the UI components.
 */
const Dashboard = () => {
    // =========================================================================
    // DUMMY BACKEND STATE
    // In the future, this is where you will write your `useEffect` hooks 
    // to fetch data from FastAPI and store it in React state using `useState`.
    // =========================================================================

    const mockUserData = {
        username: "Alex",
        currentBalance: 4250.50,
        initialBalance: 5000.00
    };

    // Dummy handler for the "Add Funds" button
    const handleAddFunds = () => {
        alert("In the future, this will open a modal to add income!");
    };

    // =========================================================================
    // RENDER LAYOUT
    // =========================================================================
    return (
        <div className="space-y-6 max-w-7xl mx-auto">

            {/* SECTION 1: Welcome Banner */}
            <WelcomeBanner username={mockUserData.username} />

            {/* SECTION 2: Top Grid (Balances on Left, Pie Chart on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Side: takes up 2 columns on large screens */}
                <div className="lg:col-span-2">
                    <BalanceSection
                        currentBalance={mockUserData.currentBalance}
                        initialBalance={mockUserData.initialBalance}
                        onAddFunds={handleAddFunds}
                    />
                </div>

                {/* Right Side: takes up 1 column on large screens */}
                <div className="lg:col-span-1">
                    <CategoryPieChart />
                </div>

            </div>

            {/* SECTION 3: Trend Chart */}
            <ExpenseTrendSection />

            {/* SECTION 4: Recent Expenses Table */}
            <RecentExpenses />

        </div>
    );
};

export default Dashboard;