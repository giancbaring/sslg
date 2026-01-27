
import React from 'react';

interface DashboardHeaderProps {
  user: { role: string; username: string };
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.role} {user.username}!</h1>
      <p className="text-gray-600">Here is a summary of the SSLG's current status.</p>
    </div>
  );
};
