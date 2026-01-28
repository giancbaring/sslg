import React from 'react';

interface OfficerCardProps {
  name: string;
  position: string;
  imageUrl: string;
}

const OfficerCard: React.FC<OfficerCardProps> = ({ name, position, imageUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-500">{position}</p>
    </div>
  );
};

export default OfficerCard;
