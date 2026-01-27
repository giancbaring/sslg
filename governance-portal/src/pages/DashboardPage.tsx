
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Sidebar } from '../components/Sidebar.tsx';
import { TopBar } from '../components/TopBar.tsx';
import { DashboardHeader } from '../components/DashboardHeader.tsx';
import { KpiCard } from '../components/KpiCard.tsx';
import { RecentResolutions } from '../components/RecentResolutions.tsx';
import { QuickActions } from '../components/QuickActions.tsx';
import { DollarSign, Briefcase, FileText, Calendar } from 'lucide-react';

const DashboardPage: React.FC = () => {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to sign out.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign out!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Here you would typically call a logout API endpoint
        // and then navigate to the login page.
        console.log('Logging out...');
        navigate('/login');
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <DashboardHeader user={user} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <KpiCard title="Active Projects" value={stats.activeProjects} icon={<Briefcase size={24} className="text-white" />} color="bg-blue-500" />
            <KpiCard title="Pending Approvals" value={stats.pendingApprovals} icon={<FileText size={24} className="text-white" />} color="bg-yellow-500" />
            <KpiCard title="Total Funds" value={`$${stats.totalFunds.toLocaleString()}`} icon={<DollarSign size={24} className="text-white" />} color="bg-green-500" />
            <KpiCard title="Next Event" value={stats.nextEvent} icon={<Calendar size={24} className="text-white" />} color="bg-indigo-500" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentResolutions />
            </div>
            <div>
              <QuickActions role={user.role} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
