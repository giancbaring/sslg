
import type { ReactElement } from 'react';
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactElement;
  color: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md text-white ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 bg-white bg-opacity-20 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};
