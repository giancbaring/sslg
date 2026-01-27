
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import OfficersPage from './pages/OfficersPage';
import DocumentsPage from './pages/DocumentsPage';
import EventsPage from './pages/EventsPage';

const MainDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ role: 'Admin', username: 'loading...' });
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingApprovals: 0,
    totalFunds: 0,
    nextEvent: 'N/A',
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        const data = await response.json();
        setUser({ role: data.user.role, username: data.user.firstName });
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Authentication Error',
          text: 'Please log in to access the dashboard.',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    // handle logout
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Routes>
            <Route path="/" element={<DashboardPage user={user} stats={stats} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/officers" element={<OfficersPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
