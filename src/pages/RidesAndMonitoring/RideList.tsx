import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router';
import { monitoringData, type TRide } from './monitoringApi';
import Pagination from '../../components/Pagination';
import { useDebounce } from '../../utils/debounce';

// --- Types & Mock Data ---
type RideStatus =
    | "in-progress"
    | "accepted"
    | "completed"
    | "scheduled"
    | "cancelled"
    | "no_driver_found"
    | "driver_arrived"

const RideList = () => {



    const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Active' | 'Completed'>('All');


    const [currentPage, setCurrentpage] = useState<number>(1)
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 500);



    const getStatusStyles = (status: RideStatus) => {

        const base =
            "px-3 py-1 rounded-full text-xs font-medium capitalize";


        switch (status) {

            case "in-progress":
            case "accepted":
                return `${base} bg-blue-50 text-blue-600`;


            case "completed":
                return `${base} bg-green-50 text-green-600`;
            case "driver_arrived":
                return `${base} bg-green-50 text-green-600`;


            case "scheduled":
                return `${base} bg-orange-50 text-orange-600`;




            case "cancelled":
            case "no_driver_found":
                return `${base} bg-red-50 text-red-600`;


            default:
                return `${base} bg-gray-50 text-gray-600`;
        }
    };

    const { data: ridsMonitoringData, isLoading } = useQuery({
        queryKey: ["monitoring_data", currentPage, activeTab, debounceSearch],
        queryFn: () => monitoringData(currentPage, activeTab.toLocaleLowerCase(), debounceSearch),
    });






    const monitorList = ridsMonitoringData?.rides || []
    const pagination = ridsMonitoringData?.pagination || {}



    const onPrev = () => {
        setCurrentpage(currentPage - 1)
    }
    const onNext = () => {
        setCurrentpage(currentPage + 1)
    }

    return (
        <div className=" text-slate-700">
            <div className=" bg-white rounded-xl shadow-sm border border-gray-200">

                {/* Responsive Tabs & Search Container */}
                <div className="p-4 space-y-4 border-b border-gray-100 bg-gray-50/30">
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Upcoming', 'Active', 'Completed', 'Cancelled'].map((tab: string) => (
                            <button
                                key={tab}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-1.5 cursor-pointer rounded-lg text-sm transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-white shadow-sm cursor-pointer border-gray-200 font-semibold text-blue-600'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {tab} {tab === 'All' && <span className="ml-1 opacity-50">({ridsMonitoringData?.rides?.length})</span>}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                        <input
                            type="text"

                            placeholder="Search rider, driver, or ID..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                            // value={searchQuery}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- Mobile View (Cards) --- */}
                <div className="md:hidden divide-y  divide-gray-300">
                    {ridsMonitoringData?.rides?.map((ride: TRide) => (
                        <div
                            key={ride._id}
                            className="p-4 space-y-4 border-b border-gray-100"
                        >

                            {/* Header */}
                            <div className="flex justify-between items-start gap-3">

                                <div className="min-w-0">

                                    <p className="text-[11px] font-bold text-gray-400 uppercase truncate">
                                        {ride.rider?.riderId}
                                    </p>

                                    <h3 className="font-semibold text-gray-900 truncate">
                                        {ride.rider?.name}
                                    </h3>

                                </div>


                                <span className={getStatusStyles(ride.status)}>
                                    {ride.status.replaceAll("_", " ")}
                                </span>

                            </div>



                            {/* Driver */}
                            <div className="text-sm text-gray-600">

                                <span className="text-gray-400">
                                    Driver:
                                </span>{" "}

                                <span className="font-medium">
                                    {ride.driver}
                                </span>

                            </div>

                            {/* Route */}
                            <div className="bg-gray-50 rounded-lg p-3 space-y-2">


                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>

                                    <p className="text-xs text-gray-700 truncate">
                                        {ride.route?.pickup}
                                    </p>

                                </div>


                                <div className="ml-0.75 h-3 border-l border-dashed border-gray-300"></div>



                                <div className="flex items-center gap-2">

                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>

                                    <p className="text-xs text-gray-500 truncate">
                                        {ride.route?.dropoff}
                                    </p>

                                </div>


                            </div>




                            {/* Type + Cost */}
                            <div className="flex justify-between items-center">


                                <span
                                    className={`
        text-xs 
        px-3 
        py-1 
        rounded-full 
        font-medium
        ${ride.rideType === "scheduled"
                                            ? "bg-blue-50 text-blue-600"
                                            : ride.rideType === "assist"
                                                ? "bg-purple-50 text-purple-600"
                                                : ride.rideType === "wheelchair"
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-gray-100 text-gray-600"
                                        }
    `}
                                >
                                    {ride.rideType}
                                </span>


                                <span className="font-bold text-lg text-gray-900">

                                    ${ride.cost.toFixed(2)}

                                </span>


                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-400">

                                {new Date(ride.dateTime).toLocaleString()}

                            </div>


                        </div>
                    ))}
                </div>

                {/* --- Desktop View (Table) --- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Ride ID</th>
                                <th className="px-6 py-4 font-medium">Rider</th>
                                <th className="px-6 py-4 font-medium">Driver</th>
                                <th className="px-6 py-4 font-medium">Route</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium text-right">Cost</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Date/Time</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {monitorList?.map((ride: TRide) => (
                                <tr key={ride._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{ride.rider?.riderId}</td>
                                    <td className="px-6 py-4">{ride?.rider?.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{ride.driver}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 max-w-55">

                                            <div
                                                className="flex items-center gap-2 text-xs text-gray-600 truncate"
                                                title={ride.route?.pickup}
                                            >
                                                <span className="text-green-500">📍</span>
                                                <span className="truncate">
                                                    {ride.route?.pickup || "Unknown pickup"}
                                                </span>
                                            </div>


                                            <div
                                                className="flex items-center gap-2 text-xs text-gray-400 truncate"
                                                title={ride.route?.dropoff}
                                            >
                                                <span className="text-red-500">🏁</span>
                                                <span className="truncate">
                                                    {ride.route?.dropoff || "Unknown dropoff"}
                                                </span>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`
        text-xs 
        px-3 
        py-1 
        rounded-full 
        font-medium
        ${ride.rideType === "standard"
                                                    ? "bg-blue-50 text-blue-600"
                                                    : ride.rideType === "assist"
                                                        ? "bg-purple-50 text-purple-600"
                                                        : ride.rideType === "wheelchair"
                                                            ? "bg-green-50 text-green-600"
                                                            : ride.rideType === "scheduled"
                                                                ? "bg-orange-50 text-orange-600"
                                                                : "bg-gray-100 text-gray-600"
                                                }
    `}
                                        >
                                            {ride.rideType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">${ride.cost}</td>
                                    <td className="px-6 py-4">
                                        <span className={getStatusStyles(ride.status)}>
                                            {ride.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap text-xs">{ride.dateTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/dashboard/ridesandmonitoring/monitorDetails/${ride?._id}`}
                                            className={`${ride?.status === "no_driver_found" || ride?.status === "cancelled"
                                                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                                                    : ""
                                                }`}
                                        >
                                            <button
                                                disabled={ride?.status === "no_driver_found"}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                                            >
                                                View Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {ridsMonitoringData?.rides?.length === 0 && (
                    <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                        <div className="text-4xl mb-2">🔎</div>
                        <p>No rides found matching your search or filters.</p>
                    </div>
                )}
            </div>
            <div>
                <Pagination onNext={onNext} onPrev={onPrev} totalPages={pagination?.totalPages} currentPage={currentPage}></Pagination>
            </div>
        </div>
    );
};

export default RideList;