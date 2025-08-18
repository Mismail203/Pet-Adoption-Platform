import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin/App'; //define admin panel here

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<Admin />} /> {/* Route admin here */}
      </Routes>
    </Router>
  );
}
