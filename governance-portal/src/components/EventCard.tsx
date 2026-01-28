import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{date}</p>
      <p>{description}</p>
    </div>
  );
};

export default EventCard;
