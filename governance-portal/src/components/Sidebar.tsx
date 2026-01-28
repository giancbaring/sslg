import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">Navigation</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/officers" className="hover:text-gray-300">Officers</Link>
          </li>
          <li className="mb-4">
            <Link to="/documents" className="hover:text-gray-300">Documents</Link>
          </li>
          <li className="mb-4">
            <Link to="/events" className="hover:text-gray-300">Events</Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
