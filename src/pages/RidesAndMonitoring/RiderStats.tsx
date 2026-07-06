import React from 'react';
import { Calendar, Navigation, CheckCircle2, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { monitoringStats } from './monitoringApi';

interface StatItem {
  label: string;
  value: number;
  icon: React.ElementType;
  colorClass: string;
}



const RiderStats: React.FC = () => {

  const { data } = useQuery({
    queryKey: ['stats_data'],
    queryFn: monitoringStats
  })


  const statsData: StatItem[] = [
    { label: 'Upcoming', value: data?.upcoming ?? 0, icon: Calendar, colorClass: 'text-orange-500' },
    { label: 'Active', value: data?.active ?? 0, icon: Navigation, colorClass: 'text-blue-500' },
    { label: 'Completed', value: data?.completed ?? 0, icon: CheckCircle2, colorClass: 'text-emerald-500' },
    { label: 'Canceled', value: data?.cancelled ?? 0, icon: XCircle, colorClass: 'text-red-500' },
  ];


  return (
    <div className="w-full  bg-gray-50">
      {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`w-6 h-6 ${stat.colorClass}`} />
              <span className="text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-gray-500 font-medium text-sm">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderStats;