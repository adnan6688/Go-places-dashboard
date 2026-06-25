import { useQuery } from '@tanstack/react-query';
import {
    CheckCircle2,
    MapPin,
    Route,
    CarFront,
    Users
} from 'lucide-react';
import { reportsSummary } from './reportApi';

const ReportStats = () => {

  const {data} = useQuery({
    queryKey : ['summary'],
    queryFn : reportsSummary
  })


  const stats = [
    {
      id: 1,
      label: 'Total Riders',
      value: data?.totalRiders,
      icon: <Users className="text-blue-500" size={20} />,
    },
    {
      id: 2,
      label: 'Total Drivers',
      value: data?.totalDrivers,
      icon: <CarFront className="text-indigo-500" size={20} />,
    },
    {
      id: 3,
      label: 'Completed Rides',
      value: data?.completedRides,
      icon: <CheckCircle2 className="text-green-500" size={20} />,
    },
    {
      id: 4,
      label: 'Total miles Driven',
      value: data?.totalMilesDriven,
      icon: <MapPin className="text-orange-500" size={20} />,
    },
    {
      id: 5,
      label: 'Total Trips',
      value: data?.totalTrips, // Example value
      icon: <Route className="text-purple-500" size={20} />,
    },
  ];

  return (
    <div className="w-full ">
      {/* Grid: Mobile 1 col, Tablet 2-3 col, Desktop 5 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col space-y-2">
              {/* Icon & Value Container */}
              <div className="flex justify-between items-start">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </span>
                <div className="p-2 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
              
              {/* Label */}
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportStats;