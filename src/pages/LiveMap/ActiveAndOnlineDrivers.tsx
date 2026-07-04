import React from 'react';
import { Navigation, Car, Clock, User, CarIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { liveMapApi } from './mapApiData';
import SmallLoading from '../../Loading/SmallLoading';

// --- Types ---
type Trip = {
  rideId: string;
  riderName: string;
  destination: string;
  driverName: string;
  driverImage: string;
  startedAt: string;
  status: "pending" | "accepted" | "picked" | "started" | "completed" | "cancelled";
};

type Driver = {
  activeRideId: string | null;
  driverId: string;
  lat: number;
  lng: number;
  name: string;
  profilePhoto: string | null;
  status: "free" | "busy" | "offline" | string;
  vehicleCategory: string;
};



const ActiveAndOnlineDrivers: React.FC = () => {



  const { data, isLoading: onlinedriverLoading } = useQuery({
    queryKey: ['live_map_data'],
    queryFn: liveMapApi
  })



  const driversOline = data?.onlineDrivers || []
  const activeTripsdata = data?.activeTrips || []

  
  console.log(activeTripsdata)

  return (
    <div className=" ">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Active Trips Section */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Navigation className="text-emerald-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-800">Active Trips</h2>
          </div>

          <div className="space-y-4">
            {activeTripsdata?.map((trip: Trip) => {
              return (
                <div
                  key={trip.rideId}
                  className="flex items-start justify-between p-4 rounded-2xl border border-slate-100 bg-white shadow transition-all"
                >
                  {/* LEFT ICON */}
                  <div className="shrink-0 w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Navigation className="text-emerald-500 w-5 h-5 rotate-45" />
                  </div>

                  {/* MAIN CONTENT */}
                  <div className="flex-1 ml-4">
                    {/* ROUTE */}
                    <h3 className="font-semibold text-slate-800 leading-snug">
                      {trip.riderName}
                      <span className="mx-2 text-slate-400">→</span>
                      <span className="text-slate-600 font-medium">
                        {trip.destination}
                      </span>
                    </h3>

                    {/* DRIVER INFO */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                        {trip.driverImage ? (
                          <img
                            src={trip.driverImage}
                            alt="driver"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>

                      <p className="text-sm text-slate-500">
                        Driver:{" "}
                        <span className="font-medium text-slate-700">
                          {trip.driverName}
                        </span>
                      </p>
                    </div>

                    {/* STATUS + TIME */}
                    <div className="flex items-center justify-between mt-3">
                      {/* STATUS BADGE */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                        <CarIcon className="w-3.5 h-3.5" />
                        {trip.status}
                      </span>

                      {/* TIME */}
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          Started{" "}
                          {new Date(trip.startedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Online Drivers Section */}
        <section className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Car className="text-blue-500 w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-800">Online Drivers</h2>
          </div>

          <div className="space-y-4">
            {onlinedriverLoading ? (

              <div className="p-6 text-center text-slate-500">
                <SmallLoading message='Loading Drivers....'></SmallLoading>
              </div>
            ) : driversOline?.length > 0 ? (
              // ✅ Data List
              driversOline.map((driver: Driver) => {
                const isBusy = !!driver.activeRideId;

                return (
                  <div
                    key={driver.driverId}
                    className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white  shadow transition-all"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        {driver?.profilePhoto ? (
                          <img
                            src={driver.profilePhoto}
                            alt="driver"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="text-slate-400 w-5 h-5" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {driver.name}
                        </h3>

                        <p className="text-xs text-slate-500 flex items-center gap-2">
                          <CarIcon /> {driver.vehicleCategory}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE STATUS */}
                    <div className="text-right">
                      {isBusy ? (
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600 border border-red-100">
                            🔴 Ride active now
                          </span>

                          <span className="text-[11px] text-slate-400">
                            Driver is currently on trip
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                            🟢 Available
                          </span>

                          <span className="text-[11px] text-slate-400">
                            Ready for new ride
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              // ❌ Empty State
              <div className="p-6 text-center text-slate-400">
                No drivers found
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ActiveAndOnlineDrivers;