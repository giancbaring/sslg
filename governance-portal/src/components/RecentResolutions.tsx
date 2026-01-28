import React from 'react';

const RecentResolutions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Recent Resolutions</h3>
      <ul>
        <li className="border-b py-2">Resolution #2024-01: Environmental Protection</li>
        <li className="border-b py-2">Resolution #2024-02: Student Health and Wellness</li>
        <li className="py-2">Resolution #2024-03: School Event Funding</li>
      </ul>
    </div>
  );
};

export default RecentResolutions;
