import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import AdminPanel from '../components/AdminPanel';
import Project from '../pages/Project'; 
import ProjectDetail from '../pages/DetailProject';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/projects" element={<ProjectDetail />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
        </Router>   
    )
}