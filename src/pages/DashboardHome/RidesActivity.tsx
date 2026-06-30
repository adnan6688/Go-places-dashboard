
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { recentActivity, type TActivity } from '../../api/auth.api';

// Types for our data
interface Ride {
  id: string;
  passenger: string;
  route: string;
  status: 'in-progress' | 'completed' | 'canceled';
  driver: string;
}



const RidesActivity: React.FC = () => {
  const activeRides: Ride[] = [
    { id: '1', passenger: 'Sarah Johnson', route: '123 Main St → City Hospital', status: 'in-progress', driver: 'James Wilson' },
    { id: '2', passenger: 'David Thompson', route: '321 Elm St → Physical Therapy Center', status: 'in-progress', driver: 'Linda Martinez' },
  ];




  const { data: acitivityData } = useQuery({
    queryKey: ['dashboard_activity'],
    queryFn: recentActivity,
    retry: false
  })

  return (
    <div className="">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Active Rides */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6">
          <h2 className="text-[17px] sm:text-xl font-bold text-gray-800 mb-6">Active Rides</h2>
          <div className="space-y-4">
            {activeRides.map((ride) => (
              <div key={ride.id} className="bg-slate-50 rounded-xl p-2 sm:p-5 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-lg">{ride.passenger}</h3>
                    <p className="text-gray-500 text-[12px] sm:text-sm mt-1">{ride.route}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] sm:text-xs font-medium mb-2">
                      {ride.status}
                    </span>
                    <span className="text-gray-400 text-[12px] sm:text-sm">{ride.driver}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity */}



        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6">
          <h2 className="text-[17px] sm:text-xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h2>

          <div className="space-y-2 sm:space-y-4">
            {acitivityData?.map((activity: TActivity) => (
              <div
                key={activity._id}
                className="flex items-center gap-4 bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition"
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg ${activity.targetType === "DRIVER"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                    }`}
                >
                  {activity.actor?.fullName?.charAt(0) ||
                    activity.actor?.fullName?.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-[14px] sm:text-[18px] text-gray-800">
                    {activity.title}
                  </h3>

                  <p className="text-gray-500 text-[12px] sm:text-sm">
                    {activity.description}
                  </p>

                  <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RidesActivity;