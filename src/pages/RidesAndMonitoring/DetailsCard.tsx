import { CalendarDays, Car, ExternalLink, MapPin, Phone, Star, User, type LucideIcon } from 'lucide-react';
import { getAddressFromLatLng, type TDetailsData } from './monitoringApi';
import { useEffect, useState } from 'react';




const UniqueDetailsCard = (data: TDetailsData) => {


    const [pickup, setPicup] = useState<string>("")
    const [dropoff,setDropOff] = useState<string>("")

    useEffect(() => {

        const fetchAddress = async () => {

            const lat = data?.route?.pickupLocation?.coordinates?.lat;
            const lng = data?.route?.pickupLocation?.coordinates?.lng;


            const lat2 = data?.route?.dropoffLocation?.coordinates?.lat ;
            const lng2 = data?.route?.dropoffLocation?.coordinates?.lng;

            if (!lat || !lng || !lat2 || !lng2) {
                return;
            }

            const address = await getAddressFromLatLng(lat, lng);
            setPicup(address as string)
            const add2 = await getAddressFromLatLng(lat2,lng2)
            setDropOff(add2 as string)
        };
        fetchAddress();

    }, [data , pickup,dropoff ]);




    return (
        <div className="">
            <div className="my-4 space-y-8">

                {/* Header Section */}
                <div className="border-b border-gray-200 pb-5">
                    <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
                        Ride Monitoring <span className="text-gray-400">/ ID: #RM38120</span>
                    </h2>
                    <p className="text-gray-600 mt-2">Detailed overview of current driver and rider information.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/*  Driver details*/}
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden relative group">
                        {/* Background Accent (Subtle) */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors duration-300"></div>

                        <div className="p-4 sm:p-8 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    {/* Driver Image or Initial Placeholder */}
                                    <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                                        {data?.driver?.fullName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 mb-2">
                                            <Car size={14} /> Active Driver
                                        </span>
                                        <h4 className="text-[18px] sm:text-xl font-extrabold text-gray-900"> {data?.driver?.fullName} </h4>
                                        <div className="flex items-center text-yellow-500 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < Math.floor(data?.driver?.rating || 0) ? "currentColor" : "none"}
                                                    className={
                                                        i < Math.floor(data?.driver?.rating || 0)
                                                            ? ""
                                                            : "text-gray-300"
                                                    }
                                                />
                                            ))}

                                            <span className="ml-2 text-sm text-gray-600 font-semibold">
                                                {data?.driver?.rating ?? 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Visual Accent - Car Silhouette (Unique) */}
                                <svg className="w-16 h-16 text-blue-100 absolute top-8 right-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1H9L8 4zm.5 1h7l.5 1h-8l.5-1zm-.5 2h9v3H8V7z" />
                                    <circle cx="9" cy="18" r="2" strokeWidth={1} />
                                    <circle cx="15" cy="18" r="2" strokeWidth={1} />
                                </svg>
                            </div>

                            <div className="space-y-5 bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <DetailItem icon={Car} label="Vehicle" value={data?.driver?.vehicle?.model as string} subValue={data?.driver?.vehicle?.licensePlate} />
                                <DetailItem icon={Phone} label="Contact" value={data?.driver?.phone as string} isLink />
                                <DetailItem icon={MapPin} label="Current Location" value="Near Gulshan-1 Circle" />
                                <div className="flex justify-between border-b border-gray-200 pb-3">
                                    <span className="text-gray-500 text-sm font-medium">License Status</span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Verified</span>
                                </div>



                            </div>


                        </div>
                    </div>

                    {/*  Rider Details */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden relative group">

                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-100 transition-colors duration-300"></div>

                        <div className="p-4 sm:p-8 relative">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">

                                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-3xl font-bold border-4 border-indigo-50">
                                        <User size={40} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 mb-2">
                                            Rider
                                        </span>
                                        <h4 className="text-[20px] sm:text-xl font-extrabold text-gray-900">{data?.rider?.fullName} </h4>
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                                            <CalendarDays size={14} className="text-gray-400" /> Member since: {new Date(data?.rider?.memberSince as string).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                {/* Visual Accent - Map/Location Icon (Unique) */}
                                <svg className="w-16 h-16 text-indigo-100 absolute top-8 right-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.089-1.79L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A2 2 0 0021 17.618V8.382a2 2 0 00-1.089-1.79L15 4m0 13V4m0 0L9 2" />
                                </svg>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-5 bg-gray-50 rounded-xl p-6 border border-gray-100 col-span-1">
                                    <DetailItem label="Total Trips" value={`${data?.rider?.totalTrips} trips`} />
                                    <DetailItem icon={Phone} label="Contact" value={data?.rider?.phone as string} isLink />
                                </div>

                                {/* Pickup Point with unique visual */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center">
                                    <div className="p-3 bg-white rounded-full border border-gray-200 mb-3 shadow-sm">
                                        <MapPin size={24} className="text-red-500" />
                                    </div>
                                    <span className="text-gray-500 text-sm font-medium mb-1">Pickup Point</span>
                                    <p className="text-gray-900 font-bold text-base leading-snug">{data?.route?.pickupLocation?.address} </p>
                                    <button className="text-indigo-600 text-xs font-medium flex items-center gap-1 mt-2 hover:underline">
                                        View on Map <ExternalLink size={12} />
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>


                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden relative group mt-6">

                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16"></div>

                        <div className="p-4 sm:p-8 relative">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                        Route Details
                                    </span>
                                    <h3 className="text-xl font-extrabold text-gray-900 mt-2">
                                        Ride Journey
                                    </h3>
                                </div>

                                <div className="bg-green-50 px-4 py-2 rounded-xl text-center">
                                    <p className="text-xs text-gray-500">Distance</p>
                                    <p className="font-bold text-green-700">
                                        {data?.route?.distanceMiles} Miles
                                    </p>
                                </div>
                            </div>


                            {/* Timeline */}
                            <div className="relative">

                                {/* Line */}
                                <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gray-200"></div>


                                {/* Pickup */}
                                <div className="relative flex gap-4 mb-6">

                                    <div className="z-10 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <MapPin size={20} className="text-green-600" />
                                    </div>

                                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 font-medium">
                                            Pickup Location
                                        </p>

                                        <h4 className="font-bold text-gray-900 mt-1">
                                            {data?.route?.pickupLocation?.address}
                                        </h4>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {pickup}

                                        </p>
                                    </div>
                                </div>



                                {/* Stops */}
                                {
                                    data?.route?.stops?.map((stop: any, index: number) => (
                                        <div
                                            key={index}
                                            className="relative flex gap-4 mb-6"
                                        >

                                            <div className="z-10 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                <MapPin size={20} className="text-yellow-600" />
                                            </div>


                                            <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-4">

                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs text-gray-500 font-medium">
                                                        Stop {index + 1}
                                                    </p>

                                                    {
                                                        stop?.extraUnitCharged && (
                                                            <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full">
                                                                Extra Charge
                                                            </span>
                                                        )
                                                    }
                                                </div>


                                                <h4 className="font-bold text-gray-900 mt-1">
                                                    {stop?.address}
                                                </h4>

                                                <p className="text-xs text-gray-500 mt-1">
                                                    Lat: {stop?.coordinates?.lat},
                                                    Lng: {stop?.coordinates?.lng}
                                                </p>

                                            </div>

                                        </div>
                                    ))
                                }



                                {/* Dropoff */}
                                <div className="relative flex gap-4">

                                    <div className="z-10 w-10 h-10 rounded-full bg-red-100 flex justify-center items-center">
                                        <MapPin size={20} className="text-red-600" />
                                    </div>


                                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-4">

                                        <p className="text-xs text-gray-500 font-medium">
                                            Dropoff Location
                                        </p>

                                        <h4 className="font-bold text-gray-900 mt-1">
                                            {data?.route?.dropoffLocation?.address}
                                        </h4>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {dropoff}
                                        </p>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};


interface DetailItemProps {
    icon?: LucideIcon;
    label: string;
    value: string | number;
    subValue?: string;
    isLink?: boolean;
}

// Reusable Component for Detail Items
const DetailItem = ({ icon: Icon, label, value, subValue, isLink }: DetailItemProps) => (
    <div className="flex justify-between items-start border-b border-gray-200 pb-3 last:border-0 last:pb-0">
        <div className="flex items-center gap-2.5">
            {Icon && <Icon size={18} className="text-gray-400 mt-0.5" />}
            <div>
                <span className="text-gray-500 text-sm font-medium">{label}</span>
                {subValue && <p className="text-xs text-gray-400 -mt-0.5">{subValue}</p>}
            </div>
        </div>
        <span className={`${isLink ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-950'} font-semibold text-sm text-right`}>
            {value}
        </span>
    </div>
);

export default UniqueDetailsCard;