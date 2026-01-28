
import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import KpiCard from '../components/KpiCard';
import QuickActions from '../components/QuickActions';
import UpcomingEvents from '../components/UpcomingEvents';
import RecentResolutions from '../components/RecentResolutions';
import { FaUsers, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <KpiCard title="Total Officers" value="15" icon={<FaUsers size={32} />} />
            <KpiCard title="Resolutions Passed" value="25" icon={<FaFileAlt size={32} />} />
            <KpiCard title="Upcoming Events" value="3" icon={<FaCalendarAlt size={32} />} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
            <div className="lg:col-span-2">
              <UpcomingEvents />
              <RecentResolutions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
