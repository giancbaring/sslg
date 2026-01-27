
import React from 'react';
import { PlusCircle, Upload, Edit } from 'lucide-react';

interface QuickActionsProps {
  role: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ role }) => {
  const actions = [
    { label: 'Log Expense', icon: <Edit size={24} />, roles: ['Admin', 'Treasurer'] },
    { label: 'Upload Minutes', icon: <Upload size={24} />, roles: ['Admin', 'Secretary'] },
    { label: 'New Proposal', icon: <PlusCircle size={24} />, roles: ['Admin', 'President', 'Vice President'] },
  ];

  const userActions = actions.filter(action => action.roles.includes(role));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {userActions.map((action, index) => (
          <button 
            key={index} 
            className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="mr-4 text-blue-600">{action.icon}</div>
            <span className="font-semibold text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
