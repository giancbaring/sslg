
import React, { useEffect, useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { KpiCard } from '../components/KpiCard';
import { RecentResolutions } from '../components/RecentResolutions';
import { QuickActions } from '../components/QuickActions';
import { DollarSign, Briefcase, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<{ role: string; username: string } | null>(null);
  const [stats, setStats] = useState<{ activeProjects: number; pendingApprovals: number; totalFunds: number; nextEvent: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      }
    };

    fetchStats();
  }, [navigate]);

  if (!user || !stats) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
    </>
  );
};

export default DashboardPage;
