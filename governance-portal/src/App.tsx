
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OfficersPage from './pages/OfficersPage';
import DocumentsPage from './pages/DocumentsPage';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  // For now, let's assume the user is always authenticated.
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route 
          path="/officers" 
          element={isAuthenticated ? <OfficersPage /> : <Navigate to="/login" />}
        />
        <Route 
          path="/documents" 
          element={isAuthenticated ? <DocumentsPage /> : <Navigate to="/login" />}
        />
        <Route 
          path="/events" 
          element={isAuthenticated ? <EventsPage /> : <Navigate to="/login" />}
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route 
          path="*" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
