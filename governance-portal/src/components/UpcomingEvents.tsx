import React from 'react';

const UpcomingEvents: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
      <ul>
        <li className="border-b py-2">Meeting with Principal - 2024-08-01</li>
        <li className="border-b py-2">School-wide Cleanup - 2024-08-15</li>
        <li className="py-2">SSLG Elections - 2024-09-01</li>
      </ul>
    </div>
  );
};

export default UpcomingEvents;
