
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Banknote, FileText, Briefcase, Users, Settings, Calendar, Award } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { href: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { href: '/treasury', icon: <Banknote size={20} />, label: 'Treasury' },
    { href: '/minutes', icon: <FileText size={20} />, label: 'Minutes' },
    { href: '/projects', icon: <Briefcase size={20} />, label: 'Projects' },
    { href: '/resolutions', icon: <Award size={20} />, label: 'Resolutions' },
    { href: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { href: '/user-management', icon: <Users size={20} />, label: 'User Management', adminOnly: true },
    { href: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  // A simple role check for now, you might get this from context or props
  const userRole = 'Admin';

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-blue-800">
        SSLG Portal
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {navLinks.map((link) => {
            if (link.adminOnly && userRole !== 'Admin') {
              return null;
            }
            const isActive = location.pathname === link.href;
            return (
              <li key={link.href} className="mb-2">
                <Link
                  to={link.href}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`}>
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
