
import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const ProfilePage: React.FC = () => {
  const user = {
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@example.com',
    role: 'SSLG President',
    imageUrl: 'https://via.placeholder.com/150',
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-8">My Profile</h2>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex items-center space-x-8">
              <img src={user.imageUrl} alt={user.name} className="w-32 h-32 rounded-full" />
              <div>
                <h3 className="text-2xl font-bold">{user.name}</h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-blue-600 font-semibold mt-2">{user.role}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
