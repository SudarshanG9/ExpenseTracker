import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import the Layout
import MainLayout from './components/layout/MainLayout';

// Import the Pages
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';

import OCR from './pages/OCR'

import Settings from './pages/Settings'

// Temporary placeholder pages for the links we haven't built yet
/*const OCR = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mb-4">📸</div>
        <h2 className="text-xl font-bold text-white mb-2">OCR Scanner</h2>
        <p className="text-sm text-gray-500">Scan receipts and auto-extract expenses. Coming soon.</p>
    </div>
);
const Settings = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-3xl mb-4">⚙️</div>
    <h2 className="text-xl font-bold text-white mb-2">Settings</h2>
    <p className="text-sm text-gray-500">Manage your account and preferences. Coming soon.</p>
  </div>
);*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout acts as the parent wrapper for all these routes */}
        <Route element={<MainLayout />}>

          {/* Automatically redirect the root URL (/) to the Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* The actual page routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/ocr" element={<OCR />} />
          <Route path="/settings" element={<Settings />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;