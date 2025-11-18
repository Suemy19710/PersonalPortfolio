import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import AdminPanel from '../components/AdminPanel';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>   
    )
}