
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import BindEmailPage from './pages/BindEmailPage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bind-email" element={<BindEmailPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
