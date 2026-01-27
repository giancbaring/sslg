
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const mockUser = {
    role: 'admin',
    username: 'testuser',
  };

  const mockStats = {
    activeProjects: 5,
    pendingApprovals: 2,
    totalFunds: 100000,
    nextEvent: '2024-08-01',
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard/*"
            element={<DashboardPage user={mockUser} stats={mockStats} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
