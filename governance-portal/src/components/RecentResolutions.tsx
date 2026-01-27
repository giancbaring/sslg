
import React from 'react';

const mockResolutions = [
  { id: 'RES-001', title: 'Establish a new student committee for environmental awareness', status: 'Approved', date: '2024-07-15' },
  { id: 'RES-002', title: 'Allocate funds for the upcoming leadership seminar', status: 'Pending', date: '2024-07-12' },
  { id: 'RES-003', title: 'Revise the guidelines for student organization accreditation', status: 'Approved', date: '2024-07-10' },
  { id: 'RES-004', title: 'Proposal for a new SSLG website', status: 'In Review', date: '2024-07-08' },
  { id: 'RES-005', title: 'Community outreach program for the elderly', status: 'Rejected', date: '2024-07-05' },
];

const getStatusChip = (status: string) => {
  switch (status) {
    case 'Approved': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">{status}</span>;
    case 'Pending': return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">{status}</span>;
    case 'In Review': return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">{status}</span>;
    case 'Rejected': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">{status}</span>;
    default: return <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">{status}</span>;
  }
};

export const RecentResolutions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent SSLG Resolutions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockResolutions.map((res) => (
              <tr key={res.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusChip(res.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{res.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
