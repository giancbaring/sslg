
import React from 'react';
import { events } from '../data/events';
import type { Event } from '../data/events';

const EventsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {events.map((event: Event) => (
          <div key={event.id} className="border-b pb-4">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 mt-2">Date: {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
