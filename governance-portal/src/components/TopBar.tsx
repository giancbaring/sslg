
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogOut } from 'lucide-react';

interface TopBarProps {
  user: { role: string; username: string };
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ user, onLogout }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        {/* You can add a school logo here */}
        <img src="/vite.svg" alt="School Logo" className="h-8 w-8 mr-4" />
        <span className="text-gray-600 font-semibold hidden md:block">{currentDate}</span>
      </div>
      <div className="relative">
        <button 
          className="flex items-center text-left p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div>
            <p className="font-semibold text-sm text-gray-800">{user.username}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <ChevronDown size={20} className="ml-2 text-gray-600" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <User size={16} className="mr-2" />
              Profile
            </Link>
            <button
              onClick={onLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
