
import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import OfficerCard from '../components/OfficerCard';

const officers = [
  {
    name: 'Juan Dela Cruz',
    position: 'President',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Maria Clara',
    position: 'Vice President',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jose Rizal',
    position: 'Secretary',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Andres Bonifacio',
    position: 'Treasurer',
    imageUrl: 'https://via.placeholder.com/150',
  },
    {
    name: 'Gabriela Silang',
    position: 'Auditor',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Apolinario Mabini',
    position: 'Public Information Officer',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Melchora Aquino',
    position: 'Protocol Officer',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const OfficersPage: React.FC = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-8">SSLG Officers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officers.map((officer, index) => (
              <OfficerCard key={index} {...officer} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OfficersPage;
