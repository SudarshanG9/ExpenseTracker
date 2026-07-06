import React from 'react';
import { NavLink } from 'react-router-dom';

// Receive the boolean state as a prop from MainLayout
const Sidebar = ({ isCollapsed }) => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Expenses', path: '/expenses', icon: '💸' },
        { name: 'OCR Upload', path: '/ocr', icon: '📸' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
    ];

    return (
        <aside
            // Conditionally change width based on state: w-64 (256px) vs w-20 (80px)
            className={`${isCollapsed ? 'w-20' : 'w-64'
                } h-full bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out`}
        >

            {/* Header / Logo Area */}
            <div className="flex items-center justify-center h-16 border-b border-gray-200 shrink-0">
                {/* Only show the full logo text if it's NOT collapsed. Otherwise, show a small icon */}
                <span className="text-xl font-bold text-gray-800 whitespace-nowrap overflow-hidden">
                    {isCollapsed ? 'ET' : 'ExpenseTracker'}
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        // Add a title attribute so users can see the name on hover when collapsed
                        title={isCollapsed ? item.name : ""}
                        className={({ isActive }) =>
                            `flex items-center py-3 rounded-lg transition-colors duration-200 ${isCollapsed ? 'justify-center px-0' : 'px-4' // Center icons when collapsed
                            } ${isActive
                                ? 'bg-blue-50 text-blue-600 font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`
                        }
                    >
                        <span className={`text-xl ${isCollapsed ? 'mr-0' : 'mr-3'}`}>
                            {item.icon}
                        </span>

                        {/* If collapsed, do not render the text. We use an empty span to maintain valid JSX */}
                        {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

        </aside>
    );
};

export default Sidebar;