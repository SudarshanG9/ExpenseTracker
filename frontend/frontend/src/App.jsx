import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages (These will be built in subsequent steps)
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import OCR from './pages/OCR';
import Settings from './pages/Settings';

/**
 * App Component
 * 
 * The root component of the application responsible for routing.
 * It uses React Router to define the navigable paths and maps them to specific Page components.
 * All main application routes are nested inside MainLayout to ensure the Sidebar and Navbar persist.
 */
const App = () => {
  return (
    <Router>
      <Routes>
        {/* The MainLayout wraps all our core pages to provide persistent navigation */}
        <Route path="/" element={<MainLayout />}>
          {/* Automatically redirect the root path to the Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Application Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="ocr" element={<OCR />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;