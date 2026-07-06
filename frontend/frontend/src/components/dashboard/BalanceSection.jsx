import React from 'react';

// Import the sub-components we just created
import BalanceCard from './BalanceCard';
import AddFundsCard from './AddFundsCard';

/**
 * BalanceSection Component
 * 
 * Groups the financial metric cards together in a responsive grid.
 * This represents the "Left" side of the Dashboard's Top Grid (Section 2).
 */
const BalanceSection = ({
    currentBalance = 4250.50,
    initialBalance = 5000.00,
    onAddFunds
}) => {
    return (
        // We use CSS Grid to layout the 3 cards. 
        // They stack on small screens (grid-cols-1) and sit side-by-side on larger screens (xl:grid-cols-3)
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* 1. Current Balance Card */}
            <BalanceCard
                title="Current Balance"
                amount={currentBalance}
                icon="💰"
                // Hardcoded dummy trend for UI visualization. You can make this dynamic later.
                trend={{ value: 15, isPositive: false }}
            />

            {/* 2. Initial Balance Card */}
            <BalanceCard
                title="Initial Balance"
                amount={initialBalance}
                icon="🏦"
            // Initial balance doesn't need a trend line, so we simply omit that prop
            />

            {/* 3. Add Funds CTA Card */}
            <AddFundsCard
                onAddFundsClick={onAddFunds}
            />

        </div>
    );
};

export default BalanceSection;