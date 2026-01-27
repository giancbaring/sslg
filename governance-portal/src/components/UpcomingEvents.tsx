
import React from 'react';
import { events } from '../data/events';
import type { Event } from '../data/events';

const UpcomingEvents: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {events.map((event: Event, index: number) => (
          <div key={event.id} className={index < events.length - 1 ? 'border-b pb-4' : ''}>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600 mt-1">Date: {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
