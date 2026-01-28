import React from 'react';

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="space-y-4">
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload Document
        </button>
        <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create Event
        </button>
        <button className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Add News
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
