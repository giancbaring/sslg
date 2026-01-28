
import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import EventCard from '../components/EventCard';

const upcomingEvents = [
  {
    title: 'Meeting with Principal',
    date: 'August 1, 2024',
    description: 'Discussion about the upcoming school festival.',
  },
  {
    title: 'School-wide Cleanup',
    date: 'August 15, 2024',
    description: 'A volunteer event to clean the school grounds.',
  },
  {
    title: 'SSLG Elections',
    date: 'September 1, 2024',
    description: 'Annual election for the new set of SSLG officers.',
  },
];

const pastEvents = [
  {
    title: 'Leadership Training',
    date: 'June 20, 2024',
    description: 'A training session for all SSLG officers.',
  },
  {
    title: 'Brigada Eskwela',
    date: 'May 15-20, 2024',
    description: 'A week-long event to prepare the school for the new academic year.',
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-8">Events</h2>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Past Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventsPage;
