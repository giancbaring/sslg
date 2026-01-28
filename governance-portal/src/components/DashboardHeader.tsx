import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SSLG Governance Portal</h1>
      <div className="flex items-center">
        <p className="mr-4">Welcome, User!</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
