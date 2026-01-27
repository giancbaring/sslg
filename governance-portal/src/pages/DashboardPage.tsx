
import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader.tsx';
import { KpiCard } from '../components/KpiCard.tsx';
import { RecentResolutions } from '../components/RecentResolutions.tsx';
import { QuickActions } from '../components/QuickActions.tsx';
import { DollarSign, Briefcase, FileText, Calendar } from 'lucide-react';

interface DashboardPageProps {
  user: {
    role: string;
    username: string;
  };
  stats: {
    activeProjects: number;
    pendingApprovals: number;
    totalFunds: number;
    nextEvent: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, stats }) => {
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
