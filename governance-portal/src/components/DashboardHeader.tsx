
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  user: { role: string; username: string };
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.role} {user.username}!</h1>
        <p className="text-gray-600">Here is a summary of the SSLG's current status.</p>
      </div>
      <div className="flex items-center">
        <Link to="/profile" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2">
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
