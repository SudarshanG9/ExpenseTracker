import React from 'react';

// Receive the toggle function as a prop from MainLayout
const Navbar = ({ toggleSidebar }) => {
    const mockUser = {
        name: "Alex Doe",
        avatarInitial: "A"
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">

            {/* Left side: Hamburger Button */}
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar} // Attach the parent's function to the click event
                    className="p-2 mr-4 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Toggle Sidebar"
                >
                    {/* Hamburger Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Right side: Actions and Profile (Unchanged) */}
            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                    <span className="text-sm font-medium text-gray-700">{mockUser.name}</span>
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                        {mockUser.avatarInitial}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;