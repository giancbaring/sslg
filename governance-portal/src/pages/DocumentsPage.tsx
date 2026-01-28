
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import DocumentList from '../components/DocumentList';

const resolutions = [
  { name: 'Resolution #2024-01: Environmental Protection', date: '2024-01-15', url: '#' },
  { name: 'Resolution #2024-02: Student Health and Wellness', date: '2024-02-20', url: '#' },
  { name: 'Resolution #2024-03: School Event Funding', date: '2024-03-25', url: '#' },
];

const meetingMinutes = [
  { name: 'Minutes of the Meeting - January 2024', date: '2024-01-10', url: '#' },
  { name: 'Minutes of the Meeting - February 2024', date: '2024-02-15', url: '#' },
  { name: 'Minutes of the Meeting - March 2024', date: '2024-03-20', url: '#' },
];

const financialReports = [
  { name: 'Financial Report - Q1 2024', date: '2024-04-05', url: '#' },
  { name: 'Financial Report - Q2 2024', date: '2024-07-05', url: '#' },
];

const DocumentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('resolutions');

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-8">Documents</h2>

          <div className="mb-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('resolutions')}
                className={`${activeTab === 'resolutions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Resolutions
              </button>
              <button
                onClick={() => setActiveTab('meetingMinutes')}
                className={`${activeTab === 'meetingMinutes' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Meeting Minutes
              </button>
              <button
                onClick={() => setActiveTab('financialReports')}
                className={`${activeTab === 'financialReports' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Financial Reports
              </button>
            </nav>
          </div>

          <div className="space-y-8">
            {activeTab === 'resolutions' && <DocumentList title="Resolutions" documents={resolutions} />}
            {activeTab === 'meetingMinutes' && <DocumentList title="Meeting Minutes" documents={meetingMinutes} />}
            {activeTab === 'financialReports' && <DocumentList title="Financial Reports" documents={financialReports} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentsPage;
