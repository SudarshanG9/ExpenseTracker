import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout = () => {
    // We renamed this from 'isSidebarOpen' to 'isSidebarCollapsed' 
    // because it no longer hides the sidebar, it just shrinks it.
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">

            {/* We now pass 'isCollapsed' instead of 'isOpen' */}
            <Sidebar isCollapsed={isSidebarCollapsed} />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Navbar still receives the same toggle function */}
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;